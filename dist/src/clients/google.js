import { URL } from 'url';
import api, { ApiStatusError } from '../api.js';
const raw = {
    places: {
        search: (query) => google(`/findplacefromtext/json?fields=${searchFields}&input=${query}&inputtype=textquery`),
        details: (placeId) => google(`/details/json?place_id=${placeId}`),
    },
};
async function searchPlaces(query) {
    return (await raw.places.search(query)).candidates.map(mapPlace);
}
async function placeDetails(placeId) {
    return mapPlace((await raw.places.details(placeId)).result);
}
export default {
    raw,
    searchPlaces,
    placeDetails,
};
const searchFields = 'place_id,formatted_address,name,rating,opening_hours,geometry,types';
function google(path) {
    const url = new URL(`https://maps.googleapis.com/maps/api/place${path}`);
    url.searchParams.append('key', process.env.CLIENTS_GCP_KEY ?? '');
    return api(url);
}
function mapPlace(place) {
    if (!place.place_id || !place.name) {
        throw new ApiStatusError(412, 'Missing sourceId or title');
    }
    return {
        sourceId: place.place_id,
        title: place.name,
        url: place.website,
        address: place.formatted_address,
        phone: place.international_phone_number,
        latitude: place.geometry?.location?.lat,
        longitude: place.geometry?.location?.lng,
    };
}
//# sourceMappingURL=google.js.map