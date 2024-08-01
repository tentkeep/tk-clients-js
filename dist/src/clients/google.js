import { GalleryEntryTypes, } from '@tentkeep/tentkeep';
import api, { ApiStatusError } from '../api.js';
const searchFields = 'place_id,formatted_address,name,rating,opening_hours,geometry,types';
const raw = {
    places: {
        searchOld: (query) => google(`/findplacefromtext/json?fields=${searchFields}&input=${query}&inputtype=textquery`),
        search: (query, options) => {
            if (!process.env.CLIENTS_GCP_KEY)
                throw new Error('Missing API Key');
            const basicFields = 'places.id,places.name,places.addressComponents,places.displayName,places.formattedAddress,places.location,places.primaryType';
            const advancedFields = 'places.internationalPhoneNumber,places.nationalPhoneNumber,places.regularOpeningHours,places.websiteUri';
            return api('https://places.googleapis.com/v1/places:searchText', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.CLIENTS_GCP_KEY,
                    'X-Goog-FieldMask': `${basicFields},${advancedFields}`,
                },
                body: {
                    textQuery: query,
                    maxResultCount: options?.limit ?? 20,
                },
            });
        },
        details: (placeId) => google(`/details/json?place_id=${placeId}`),
    },
};
async function search(query, options) {
    const result = await raw.places.search(query, options);
    return result.places?.map(mapPlaceTextSearch) ?? [];
}
async function placeDetails(placeId) {
    const response = await raw.places.details(placeId);
    if (!response.result) {
        console.error('Google client error', response);
        throw new Error('Google client error: ' + JSON.stringify(response));
    }
    return mapPlace(response.result);
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
    const streetNumber = findComponent('street_number');
    const streetName = findComponent('route');
    const detail = {
        sourceId: place.place_id,
        addressLine1: [streetNumber, streetName].filter((c) => c).join(' '),
        addressLine2: findComponent('subpremise'),
        city: findComponent('locality'),
        county: findComponent('administrative_area_level_2'),
        province: findComponent('administrative_area_level_1'),
        country: findComponent('country'),
        postalCode: findComponent('postal_code'),
        phone: place.international_phone_number,
        latitude: place.geometry?.location?.lat,
        longitude: place.geometry?.location?.lng,
    };
    return {
        sourceId: place.place_id,
        entryType: GalleryEntryTypes.GooglePlace,
        genericType: 'place',
        title: place.name,
        url: place.website,
        detail,
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
    const streetNumber = findComponent('street_number');
    const streetName = findComponent('route');
    const detail = {
        sourceId: place.id,
        addressLine1: [streetNumber, streetName].filter((c) => c).join(' '),
        addressLine2: findComponent('subpremise'),
        city: findComponent('locality'),
        county: findComponent('administrative_area_level_2'),
        province: findComponent('administrative_area_level_1'),
        country: findComponent('country'),
        postalCode: findComponent('postal_code'),
        phone: place.internationalPhoneNumber,
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
        hours: place.regularOpeningHours?.periods?.map((period) => {
            return {
                open: {
                    day: period.open?.day,
                    hours: period.open?.hour,
                    minutes: period.open?.minute,
                    time: period.open
                        ? `${period.open?.hour}:${period.open.minute < 10 ? '0' : ''}${period.open?.minute}`
                        : undefined,
                },
                close: {
                    day: period.close?.day,
                    hours: period.close?.hour,
                    minutes: period.close?.minute,
                    time: period.close
                        ? `${period.close.hour}:${period.close.minute < 10 ? '0' : ''}${period.close.minute}`
                        : undefined,
                },
            };
        }),
    };
    return {
        sourceId: place.id,
        entryType: GalleryEntryTypes.GooglePlace,
        genericType: 'place',
        title: place.displayName?.text,
        url: place.websiteUri,
        detail,
    };
}
//# sourceMappingURL=google.js.map