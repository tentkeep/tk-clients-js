/// <reference types="google.maps" />
declare const _default: {
    places: {
        search: typeof searchPlaces;
        details: typeof placeDetails;
    };
};
export default _default;
declare type PlaceCandidates = {
    candidates: google.maps.places.PlaceResult[];
};
declare type PlaceDetail = {
    result: google.maps.places.PlaceResult;
};
declare function searchPlaces(query: string): Promise<PlaceCandidates>;
declare function placeDetails(placeId: string): Promise<PlaceDetail>;
