import { URL } from 'url';
import api from '../api.js';
const places = {
    search: searchPlaces,
    details: placeDetails,
};
export default {
    places,
};
const searchFields = 'place_id,formatted_address,name,rating,opening_hours,geometry,types';
async function searchPlaces(query) {
    return google(`/findplacefromtext/json?fields=${searchFields}&input=${query}&inputtype=textquery`);
}
async function placeDetails(placeId) {
    return google(`/details/json?place_id=${placeId}`);
}
function google(path) {
    const url = new URL(`https://maps.googleapis.com/maps/api/place${path}`);
    url.searchParams.append('key', process.env.GCP_KEY ?? '');
    return api(url);
}
//# sourceMappingURL=google.js.map