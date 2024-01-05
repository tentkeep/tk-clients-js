import { GalleryEntryPlace } from '@tentkeep/tentkeep';
declare function placeDetails(placeId: string): Promise<GalleryEntryPlace>;
declare const _default: {
    raw: {
        places: {
            searchOld: (query: string) => Promise<OldGooglePlace>;
            search: (query: string) => Promise<PlaceTextSearchResponse>;
            details: (placeId: string) => Promise<{
                result: OldGooglePlace;
            }>;
        };
    };
    placeDetails: typeof placeDetails;
    search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
    summarize: (sourceId: string, options?: undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
};
export default _default;
type GooglePlaceTypes = 'street_number' | 'route' | 'locality' | 'administrative_area_level_1' | 'administrative_area_level_2' | 'administrative_area_level_3' | 'country' | 'postal_code' | 'political';
type PlaceTextSearchResponse = {
    places?: GooglePlace[];
};
export type GooglePlace = {
    name: string;
    id: string;
    types?: string[];
    nationalPhoneNumber?: string;
    internationalPhoneNumber?: string;
    formattedAddress?: string;
    addressComponents?: {
        longText: string;
        shortText: string;
        types: string[];
        languageCode: string;
    }[];
    plusCode?: {
        globalCode?: string;
        compoundCode?: string;
    };
    location?: {
        latitude?: number;
        longitude?: number;
    };
    viewport?: {
        low: {
            latitude: number;
            longitude: number;
        };
        high: {
            latitude: number;
            longitude: number;
        };
    };
    rating?: number;
    googleMapsUri?: string;
    websiteUri?: string;
    regularOpeningHours?: {
        openNow: boolean;
        periods: {
            open: {
                day: number;
                hour: number;
                minute: number;
            };
            close: {
                day: number;
                hour: number;
                minute: number;
            };
        }[];
        weekdayDescriptions?: string[];
    };
    utcOffsetMinutes?: number;
    adrFormatAddress?: string;
    businessStatus?: string;
    userRatingCount?: number;
    iconMaskBaseUri?: string;
    iconBackgroundColor?: string;
    displayName?: {
        text: string;
        languageCode: string;
    };
    primaryTypeDisplayName?: {
        text: string;
        languageCode: string;
    };
    currentOpeningHours?: {
        openNow: boolean;
        periods: {
            open: {
                day: number;
                hour: number;
                minute: number;
                date: {
                    year: number;
                    month: number;
                    day: number;
                };
            };
            close: {
                day: number;
                hour: number;
                minute: number;
                date: {
                    year: number;
                    month: number;
                    day: number;
                };
            };
        }[];
        weekdayDescriptions: string[];
    };
    primaryType?: string;
    shortFormattedAddress?: string;
    reviews?: {
        name: string;
        relativePublishTimeDescription: string;
        rating: 5;
        text: {
            text: string;
            languageCode: string;
        };
        originalText: {
            text: string;
            languageCode: string;
        };
        authorAttribution: {
            displayName: string;
            uri: string;
            photoUri: string;
        };
        publishTime: Date;
    }[];
    photos?: {
        name: string;
        widthPx: number;
        heightPx: number;
        authorAttributions: [
            {
                displayName: string;
                uri: string;
                photoUri: string;
            }
        ];
    }[];
    accessibilityOptions?: {
        wheelchairAccessibleParking: boolean;
    };
};
type OldGooglePlace = {
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
