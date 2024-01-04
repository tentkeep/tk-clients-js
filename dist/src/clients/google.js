import api, { ApiStatusError } from '../api.js';
const raw = {
    places: {
        search: (query) => {
            if (!process.env.CLIENTS_GCP_KEY)
                throw new Error('Missing API Key');
            return api('https://places.googleapis.com/v1/places:searchText', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.CLIENTS_GCP_KEY,
                    'X-Goog-FieldMask': 'places.id,places.name,places.addressComponents,places.displayName,places.formattedAddress,places.location,places.primaryType',
                },
                body: {
                    textQuery: query,
                },
            });
        },
        details: (placeId) => google(`/details/json?place_id=${placeId}`),
    },
};
async function search(query) {
    return (await raw.places.search(query)).places.map(mapPlaceTextSearch);
}
async function placeDetails(placeId) {
    return mapPlace((await raw.places.details(placeId)).result);
}
const contentClient = {
    search,
    summarize: (sourceId) => {
        return placeDetails(sourceId).then((place) => {
            place.items = [];
            return place;
        });
    },
};
export default {
    ...contentClient,
    raw,
    placeDetails,
};
function google(path) {
    const url = new URL(`https://maps.googleapis.com/maps/api/place${path}`);
    url.searchParams.append('key', process.env.CLIENTS_GCP_KEY ?? '');
    return api(url);
}
function mapPlace(place) {
    if (!place.place_id || !place.name) {
        throw new ApiStatusError(412, 'Missing sourceId or title');
    }
    function findComponent(type) {
        return (place.address_components?.find((c) => c.types.includes(type))
            ?.short_name ?? '');
    }
    return {
        sourceId: place.place_id,
        title: place.name,
        url: place.website,
        detail: {
            address: place.formatted_address,
            streetNumber: findComponent('street_number'),
            street: findComponent('route'),
            city: findComponent('locality'),
            county: findComponent('administrative_area_level_2'),
            province: findComponent('administrative_area_level_1'),
            country: findComponent('country'),
            postalCode: findComponent('postal_code'),
            phone: place.international_phone_number,
            latitude: place.geometry?.location?.lat,
            longitude: place.geometry?.location?.lng,
        },
    };
}
function mapPlaceTextSearch(place) {
    if (!place.id || !place.displayName?.text) {
        throw new ApiStatusError(412, 'Missing sourceId or title');
    }
    function findComponent(type) {
        return (place.addressComponents?.find((c) => c.types.includes(type))?.longText ??
            '');
    }
    return {
        sourceId: place.id,
        title: place.displayName?.text,
        url: place.websiteUri,
        detail: {
            address: place.formattedAddress,
            streetNumber: findComponent('street_number'),
            street: findComponent('route'),
            city: findComponent('locality'),
            county: findComponent('administrative_area_level_2'),
            province: findComponent('administrative_area_level_1'),
            country: findComponent('country'),
            postalCode: findComponent('postal_code'),
            phone: place.internationalPhoneNumber,
            latitude: place.location?.latitude,
            longitude: place.location?.longitude,
        },
    };
}
//# sourceMappingURL=google.js.map