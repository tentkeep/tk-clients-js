import { GalleryEntryPlace } from '@tentkeep/tentkeep';
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
    placeDetails: typeof placeDetails;
    search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
    summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
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
