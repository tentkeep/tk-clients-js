/// <reference types="google.maps" />
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node/http.js" />
/// <reference types="node_modules/got/dist/source/core/timed-out.js" />
import { Place as _Place } from './src/clients/google.js';
import { PageSummary as _PageSummary } from './src/clients/page.js';
export declare const clients: {
    etsy: {
        favorites: (userId: any) => Promise<any>;
        listing: (listingId: any) => Promise<any>;
        listingImages: (listingId: any) => Promise<any>;
        userShops: (userId: any) => Promise<any>;
        searchShops: (name: any) => Promise<any>;
        getShop: (shopId: any) => Promise<any>;
        getShopWithListings: (shopId: any) => Promise<any>;
        shopListings: (shopId: any, page?: number) => Promise<any>;
        allShopListings: (shopId: any) => Promise<any>;
        shopSummary: (shopId: any) => Promise<{
            sourceId: any;
            title: any;
            description: any;
            image: any;
            url: any;
            userId: any;
            items: any;
        }>;
    };
    google: {
        raw: {
            places: {
                search: (query: string) => Promise<{
                    candidates: google.maps.places.PlaceResult[];
                }>;
                details: (placeId: string) => Promise<{
                    result: google.maps.places.PlaceResult;
                }>;
            };
        };
        searchPlaces: (query: string) => Promise<_Place[]>;
        placeDetails: (placeId: string) => Promise<_Place>;
    };
    itunes: {
        podcasts: (query: any) => Promise<any>;
    };
    musickit: {
        searchArtists: (term: any) => Promise<any>;
        getArtist: (artistId: any) => Promise<any>;
        getArtistAlbums: (artistId: any) => Promise<any>;
        getAlbum: (albumId: any) => Promise<any>;
        getAlbums: (albumIds: any) => Promise<any>;
        artistSummary: (artistId: any) => Promise<{
            sourceId: any;
            title: any;
            image: any;
            items: any;
        }>;
    };
    page: {
        info: (url: string) => Promise<{
            allowsIFrame: boolean;
            headers: import("http").IncomingHttpHeaders;
            features: string[];
        }>;
        summary: (url: string) => Promise<_PageSummary>;
    };
    rss: {
        feed: (feedUrl: any) => Promise<any>;
        podcastSummary: (feedUrl: any) => Promise<{
            sourceId: string;
            title: any;
            description: any;
            image: any;
            url: any;
            items: any;
        }>;
    };
    spotify: {
        searchArtists: (query: any) => any;
        searchPlaylists: (query: any) => any;
        userPlaylists: (userId: any) => any;
        playlist: (playlistId: any) => any;
        playlistTracks: (playlistId: any) => any;
    };
    wordpress: {
        host: (_host: any) => {
            summary(): Promise<{
                sourceId: string;
                title: any;
                url: any;
                items: any;
            }>;
        };
    };
    youtube: {
        channelSummary: ({ username, channelId }: {
            username: any;
            channelId: any;
        }) => Promise<{
            sourceId: any;
            title: any;
            image: any;
            publishedAt: any;
            uploadsPlaylistId: any;
            items: any;
            imageWidth: any;
            imageHeight: any;
            playlists: any;
        }>;
        channelForUser: (username: any) => Promise<any>;
        playlistsForChannel: (channelId: any) => Promise<any>;
        playlist: (playlistId: any, opts?: {}) => Promise<any>;
        videosForPlaylist: (playlistId: any, opts?: {}) => Promise<{
            videos: any;
            nextPageToken: any;
        }>;
        activities: import("./src/clients/youtube.js").YoutubeResourceAPI;
        channels: import("./src/clients/youtube.js").YoutubeResourceAPI;
        comments: import("./src/clients/youtube.js").YoutubeResourceAPI;
        playlists: import("./src/clients/youtube.js").YoutubeResourceAPI;
        playlistItems: import("./src/clients/youtube.js").YoutubeResourceAPI;
        search: import("./src/clients/youtube.js").YoutubeResourceAPI;
        videos: import("./src/clients/youtube.js").YoutubeResourceAPI;
        videoCategories: import("./src/clients/youtube.js").YoutubeResourceAPI;
    };
};
export default clients;
export declare type Item = {
    sourceId: string;
    title: string;
    description?: string;
    image?: string;
    url?: string;
    date?: Date;
};
export declare type Summary = Item & {
    userId?: string;
    items: Item[];
};
export declare type Place = _Place;
export declare type PageSummary = _PageSummary;
