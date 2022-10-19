import { Item } from '../../index.js';
declare function searchPlaces(query: string): Promise<Place[]>;
declare function placeDetails(placeId: string): Promise<Place>;
export declare type Place = Item & {
    address?: string;
    phone?: string;
    latitude?: number;
    longitude?: number;
};
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
declare type PlaceCandidates = {
    candidates: GooglePlace[];
};
export declare type GooglePlace = {
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
