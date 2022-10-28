import { PageSummary, PageInfo } from './src/clients/page.js';
import { ProductItem } from './src/clients/shopify.js';
import { DataDomain, GalleryEntryTypes, Gallery, GalleryEntry, GalleryEntrySummary, GalleryEntryPlace, GalleryEntryItem, GalleryEntrySeed, GalleryUser, GalleryEntryGenericTypes } from './src/clients/tentkeep.js';
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
        searchPlaces: (query: string) => Promise<GalleryEntryPlace[]>;
        placeDetails: (placeId: string) => Promise<GalleryEntryPlace>;
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
        info: (url: string) => Promise<PageInfo>;
        summary: (url: string) => Promise<PageSummary>;
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
        productsSummary: (url: string, limit?: number) => Promise<GalleryEntry & {
            items?: ProductItem[] | undefined;
        }>;
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
        authSignIn: (strategy: string) => void;
        authExchangeAccessCode: (code: any) => Promise<any>;
        getPageInfo: (url: string) => Promise<PageInfo>;
        getPageSummary: (url: string) => Promise<PageSummary>;
        getPlaces: (query: string) => Promise<GalleryEntryPlace[]>;
        getPlaceDetail: (sourceId: string) => Promise<GalleryEntryPlace>;
        getPodcastSummary: (feedUrl: string) => Promise<any>;
        getShopifyProductsSummary: (url: string, limit?: number) => Promise<ProductItem[]>;
        getWordpressPostsSummary: (url: string, limit?: number) => Promise<GalleryEntrySummary>;
        searchYoutubeChannels: (query: string, limit?: number) => Promise<any>;
        getGalleries: () => Promise<Gallery[]>;
        getGallery: (galleryId: number) => Promise<Gallery>;
        getRecentGalleryEntryItems: (genericType?: GalleryEntryGenericTypes | undefined) => Promise<GalleryEntryItem[]>;
        getTrendingGalleryEntryItemTopics: (limit?: number) => Promise<string[]>;
        getGalleriesForUser: (token: string) => Promise<any>;
        getGalleryImageUrl: (galleryId: number) => string;
        getGalleryEntries: (galleryId: number) => Promise<any>;
        getGalleryUserRole: (token: string, galleryId: number) => Promise<any>;
        saveGallery: (token: string, gallery: Gallery & {
            title: string;
        }) => Promise<Gallery>;
        saveGalleryImage: (token: string, galleryId: number, image: any) => Promise<any>;
        saveGalleryEntry: (token: string, galleryId: number, seed: GalleryEntrySeed) => Promise<GalleryEntry>;
        saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
        searchEtsyShops: (query: string) => Promise<any>;
        searchMusicArtists: (query: string) => Promise<any>;
    };
    wordpress: {
        host: (_host: string) => {
            isWordpress(): Promise<boolean>;
            summary(limit?: number): Promise<GalleryEntrySummary>;
            blockTypes: import("./src/clients/wordpress.js").WordpressResourceAPI;
            blocks: import("./src/clients/wordpress.js").WordpressResourceAPI;
            blockRevisions: import("./src/clients/wordpress.js").WordpressResourceAPI;
            renderedBlocks: import("./src/clients/wordpress.js").WordpressResourceAPI;
            blockDirectoryItems: import("./src/clients/wordpress.js").WordpressResourceAPI;
            categories: import("./src/clients/wordpress.js").WordpressResourceAPI;
            comments: import("./src/clients/wordpress.js").WordpressResourceAPI;
            media: import("./src/clients/wordpress.js").WordpressResourceAPI;
            pages: import("./src/clients/wordpress.js").WordpressResourceAPI;
            pageRevisions: import("./src/clients/wordpress.js").WordpressResourceAPI;
            posts: import("./src/clients/wordpress.js").WordpressResourceAPI;
            postRevisions: import("./src/clients/wordpress.js").WordpressResourceAPI;
            postStatuses: import("./src/clients/wordpress.js").WordpressResourceAPI;
            postTypes: import("./src/clients/wordpress.js").WordpressResourceAPI;
            searchResults: import("./src/clients/wordpress.js").WordpressResourceAPI;
            settings: import("./src/clients/wordpress.js").WordpressResourceAPI;
            tags: import("./src/clients/wordpress.js").WordpressResourceAPI;
            taxonomies: import("./src/clients/wordpress.js").WordpressResourceAPI;
            themes: import("./src/clients/wordpress.js").WordpressResourceAPI;
            users: import("./src/clients/wordpress.js").WordpressResourceAPI;
            plugins: import("./src/clients/wordpress.js").WordpressResourceAPI;
        };
    };
    youtube: {
        channelSummary: ({ username, channelId, }: {
            username: any;
            channelId: any;
        }) => Promise<GalleryEntry & {
            items: GalleryEntryItem[];
        } & {
            publishedAt: Date;
            uploadsPlaylistId: any;
            imageWidth: string;
            imageHeight: string;
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
export declare const logic: {
    tentkeep: {
        canEdit: (galleryUser: GalleryUser) => import("./src/clients/tentkeep.js").GalleryUserRoles | undefined;
    };
};
export { PageSummary, PageInfo };
export { ProductItem };
export { DataDomain as TKDataDomain };
export { Gallery, GalleryEntry, GalleryEntrySummary, GalleryEntryPlace, GalleryEntryItem, GalleryEntrySeed, GalleryEntryTypes, GalleryEntryGenericTypes, GalleryUser, };
