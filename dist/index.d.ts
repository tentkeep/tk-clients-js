export declare const clients: {
    discourse: (host: string) => {
        privateMessage: (fromUsername: string, toUsername: string, subject: string, message: string) => Promise<any>;
        search: (query: string) => Promise<import("./src/clients/discourse.js").SearchResponse>;
        users: (userId: number) => Promise<any>;
    };
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
        searchPlaces: (query: string) => Promise<import("tentkeep").GalleryEntryPlace[]>;
        placeDetails: (placeId: string) => Promise<import("tentkeep").GalleryEntryPlace>;
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
        info: (url: string) => Promise<import("tentkeep").PageInfo>;
        summary: (url: string) => Promise<import("tentkeep").PageSummary>;
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
        productsSummary: (url: string, limit?: number) => Promise<import("tentkeep").GalleryEntry & {
            items?: import("tentkeep").GalleryEntryItemProduct[] | undefined;
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
    tentkeep: (dataDomain: import("tentkeep").TKDataDomain, config?: import("tentkeep/dist/src/tentkeep.js").TKConfig | undefined) => {
        authSignIn: (strategy: string, redirect: string, options: import("tentkeep").AuthOptions) => void | Promise<import("tentkeep").Token>;
        authExchangeAccessCode: (code: any) => Promise<any>;
        authRefreshTokens: (refreshToken: string) => Promise<import("tentkeep").Token>;
        getPageInfo: (url: string) => Promise<import("tentkeep").PageInfo>;
        getPageSummary: (url: string) => Promise<import("tentkeep").PageSummary>;
        getPlaces: (query: string) => Promise<import("tentkeep").GalleryEntryPlace[]>;
        getPlaceDetail: (sourceId: string) => Promise<import("tentkeep").GalleryEntryPlace>;
        getPodcastSummary: (feedUrl: string) => Promise<any>;
        getShopifyProductsSummary: (url: string, limit?: number | undefined) => Promise<import("tentkeep").GalleryEntrySummary>;
        getWordpressPostsSummary: (url: string, limit?: number | undefined) => Promise<import("tentkeep").GalleryEntrySummary>;
        searchYoutubeChannels: (query: string, limit?: number | undefined) => Promise<any>;
        getGalleries: () => Promise<import("tentkeep").Gallery[]>;
        searchGalleries: (query: string) => Promise<import("tentkeep").SearchResults<import("tentkeep").Gallery>>;
        getGalleriesNearby: (location: import("tentkeep").Location, options: {
            miles: number;
            limit: number;
        }) => Promise<import("tentkeep").GalleryPlace[]>;
        getGallery: (galleryId: number) => Promise<import("tentkeep").Gallery>;
        getRecentGalleryEntryItems: (genericType?: import("tentkeep").GalleryEntryGenericTypes | undefined) => Promise<import("tentkeep").GalleryEntryItem[]>;
        getTrendingGalleryEntryItemTopics: (limit?: number | undefined) => Promise<string[]>;
        getGalleriesForUser: (token: string) => Promise<import("tentkeep").UserGallery[]>;
        getGalleryImageUrl: (galleryId: number) => string;
        getGalleryEntries: (galleryId: number, itemLimit?: number | undefined) => Promise<import("tentkeep").GalleryEntrySummary[]>;
        getGalleryUserRole: (token: string, galleryId: number) => Promise<any>;
        joinGallery: (token: string, galleryId: number) => Promise<import("tentkeep").GalleryUser>;
        saveGallery: (token: string, gallery: import("tentkeep").Gallery & {
            title: string;
        }) => Promise<import("tentkeep").Gallery>;
        saveGalleryImage: (token: string, galleryId: number, image: any) => Promise<any>;
        updateGallery: (token: string, gallery: import("tentkeep").Gallery & {
            id: number;
        }) => Promise<import("tentkeep").Gallery>;
        saveGalleryEntry: (token: string, galleryId: number, seed: import("tentkeep").GalleryEntrySeed) => Promise<import("tentkeep").GalleryEntry>;
        linkGalleries: (token: string, parentGalleryId: number, childGalleryIds: number[]) => Promise<{
            galleryEntry: import("tentkeep").GalleryEntry;
            galleryEntryItems: import("tentkeep").GalleryEntryItem[];
        }>;
        saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
        searchEtsyShops: (query: string) => Promise<any>;
        searchMusicArtists: (query: string) => Promise<any>;
    };
    wordpress: {
        host: (_host: string) => {
            isWordpress(): Promise<boolean>;
            summary(limit?: number): Promise<import("tentkeep").GalleryEntrySummary>;
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
        }) => Promise<import("tentkeep").GalleryEntry & {
            items: import("tentkeep").GalleryEntryItem[];
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
        canEdit: (galleryUser: import("tentkeep").GalleryUser) => import("tentkeep/dist/src/types/tentkeep-types.js").GalleryUserRoles | undefined;
    };
};
