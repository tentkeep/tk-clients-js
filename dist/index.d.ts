import { Place as _Place } from './src/clients/google.js';
import { PageSummary as _PageSummary } from './src/clients/page.js';
import { ProductItem as _ProductItem } from './src/clients/shopify.js';
import { DataDomain, GalleryEntryTypes, Gallery as _Gallery, GalleryEntry as _GalleryEntry, GalleryEntryItem as _GalleryEntryItem, GalleryEntrySeed as _GalleryEntrySeed } from './src/clients/tentkeep.js';
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
                    candidates: import("./src/clients/google.js").GooglePlace[];
                }>;
                details: (placeId: string) => Promise<{
                    result: import("./src/clients/google.js").GooglePlace;
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
            headers: any;
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
    shopify: {
        raw: {
            products: (url: string, limit?: number) => Promise<{
                products: import("./src/clients/shopify.js").ShopifyProduct[];
            }>;
            collections: (url: string) => Promise<any>;
            collectionProducts: (url: string, collectionHandle: string) => Promise<any>;
        };
        productsSummary: (url: string, limit?: number) => Promise<_ProductItem[]>;
    };
    spotify: {
        searchArtists: (query: any) => any;
        searchPlaylists: (query: any) => any;
        searchPodcasts: (query: any) => any;
        userPlaylists: (userId: any) => any;
        playlist: (playlistId: any) => any;
        playlistTracks: (playlistId: any) => any;
    };
    tentkeep: (dataDomain: DataDomain) => {
        exchangeAccessCode: (code: any) => Promise<any>;
        getPageInfo: (url: string) => Promise<any>;
        getPageSummary: (url: string) => Promise<any>;
        getPlaces: (query: string) => Promise<_Place[]>;
        getPlaceDetail: (sourceId: string) => Promise<_Place>;
        getPodcastSummary: (feedUrl: string) => Promise<any>;
        getShopifyProductsSummary: (url: string, limit?: number) => Promise<_ProductItem[]>;
        searchYoutubeChannels: (query: string) => Promise<any>;
        getGalleries: () => Promise<_Gallery[]>;
        getGallery: (galleryId: number) => Promise<_Gallery>;
        getRecentlyAddedGalleryEntryItems: () => Promise<any>;
        getGalleriesForUser: (token: string) => Promise<any>;
        getGalleryImageUrl: (galleryId: number) => string;
        getGalleryEntries: (galleryId: number) => Promise<any>;
        getGalleryUserRole: (token: string, galleryId: number) => Promise<any>;
        saveGallery: (token: string, gallery: _Gallery) => Promise<any>;
        saveGalleryImage: (token: string, galleryId: number, image: any) => Promise<any>;
        saveGalleryEntry: (token: string, galleryId: number, seed: _GalleryEntrySeed) => Promise<any>;
        saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
        searchEtsyShops: (query: string) => Promise<any>;
        searchMusicArtists: (query: string) => Promise<any>;
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
export declare type ProductItem = _ProductItem;
export { DataDomain as TKDataDomain };
export { GalleryEntryTypes };
export declare type Gallery = _Gallery;
export declare type GalleryEntry = _GalleryEntry;
export declare type GalleryEntryItem = _GalleryEntryItem;
export declare type GalleryEntrySeed = _GalleryEntrySeed;
