import { GalleryEntryPlace } from '../../index.js';
declare function searchPlaces(query: string): Promise<GalleryEntryPlace[]>;
declare function placeDetails(placeId: string): Promise<GalleryEntryPlace>;
declare const _default: {
    raw: {
        places: {
            search: (query: string) => Promise<PlaceCandidates>;
            details: (placeId: string) => Promise<{
                result: GooglePlace;
            }>;
        };
    };
    searchPlaces: typeof searchPlaces;
    placeDetails: typeof placeDetails;
};
export default _default;
declare type GooglePlaceTypes = 'street_number' | 'route' | 'locality' | 'administrative_area_level_1' | 'administrative_area_level_2' | 'administrative_area_level_3' | 'country' | 'postal_code' | 'political';
declare type PlaceCandidates = {
    candidates: GooglePlace[];
};
export declare type GooglePlace = {
    address_components: {
        long_name: string;
        short_name: string;
        types: GooglePlaceTypes[];
    }[];
    place_id: string;
    name: string;
    website?: string;
    formatted_address: string;
    international_phone_number?: string;
    geometry?: {
        location?: {
            lat: number;
            lng: number;
        };
    };
};
