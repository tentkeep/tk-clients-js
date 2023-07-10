export declare const clients: {
    discourse: (host: string) => {
        addGroupMembers: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        addGroupOwners: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        createGroup: (group: import("./src/clients/discourse.js").Group) => Promise<{
            basic_group: import("./src/clients/discourse.js").Group;
        }>;
        group: (groupName: string) => Promise<{
            group: import("./src/clients/discourse.js").Group;
        }>;
        groupMembers: (groupName: string) => Promise<import("./src/clients/discourse.js").GroupMembers>;
        privateMessage: (fromUsername: string, toUsername: string, subject: string, message: string) => Promise<import("./src/clients/discourse.js").NewPostResponse>;
        removeGroupMembers: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        replyToTopic: (topicId: number, message: string) => Promise<import("./src/clients/discourse.js").NewPostResponse>;
        search: (query: string) => Promise<import("./src/clients/discourse.js").SearchResponse>;
        user: <T extends string | number>(user: T) => Promise<import("./src/clients/discourse.js").DiscourseUser>;
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
            items: import("tentkeep").GalleryEntryItemProduct[];
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
    tentkeep: (dataDomain: import("tentkeep").TKDataDomain, key: string, config?: import("tentkeep/dist/src/tentkeep.js").TKConfig | undefined) => {
        setApiKey: (key: string) => void;
        auth: {
            authSignIn: (strategy: string, redirect: string, options: import("tentkeep").AuthOptions) => void | Promise<import("tentkeep").Token>;
            authExchangeAccessCode: (code: string) => Promise<import("tentkeep").TokenUser>;
            authRefreshTokens: (refreshToken: string) => Promise<import("tentkeep").TokenUser>;
            signOut: (token: string) => Promise<any>;
        };
        images: {
            saveImages: (token: string, entityType: "galleries" | "stores", entityId: number, entityImages: import("tentkeep").EntityImageUpload[], attributes: Record<string, any>) => Promise<{
                images: import("tentkeep").EntityImage[];
            }>;
            proxy: (imageUrl: string) => Promise<any>;
        };
        proxy: {
            getPageInfo: (url: string) => Promise<import("tentkeep").PageInfo>;
            getPageSummary: (url: string) => Promise<import("tentkeep").PageSummary>;
            getPlaces: (query: string) => Promise<import("tentkeep").GalleryEntryPlace[]>;
            getPlaceDetail: (sourceId: string) => Promise<import("tentkeep").GalleryEntryPlace>;
            getPodcastSummary: (feedUrl: string) => Promise<any>;
            getShopifyProductsSummary: (url: string, limit?: number | undefined) => Promise<import("tentkeep").GalleryEntrySummary>;
            getWordpressPostsSummary: (url: string, limit?: number | undefined) => Promise<import("tentkeep").GalleryEntrySummary>;
            searchYoutubeChannels: (query: string, limit?: number | undefined) => Promise<any>;
            searchEtsyShops: (query: string) => Promise<any>;
            searchMusicArtists: (query: string) => Promise<any>;
        };
        session: {
            getEnv: () => Promise<any>;
            getMapKitToken: () => Promise<any>;
            getSessionToken: (key: string) => Promise<any>;
        };
        shop: {
            createProductScheme: (token: string, storeId: number, productScheme: import("tentkeep").ProductScheme) => Promise<any>;
            createBucket: (token: string, storeId: number, bucket: import("tentkeep").Bucket) => Promise<{
                locations: import("tentkeep").PlaceDetail[];
                buckets: import("tentkeep").Bucket[];
            }>;
            createBucketProducts: (token: string, bucketId: number, bucketProducts: import("tentkeep").BucketProduct[]) => Promise<{
                bucketProducts: import("tentkeep").BucketProduct[];
            }>;
            getStore: (token: string, storeId: number) => Promise<import("tentkeep").Store>;
            registerStore: (token: string, galleryId: number, storeId: number) => Promise<{
                url: string;
            }>;
            getStoreStatus: (token: string, storeId: number) => Promise<{
                status: string;
            }>;
            getStoreBuckets: (token: string, storeId: number) => Promise<{
                buckets: import("tentkeep").Bucket[];
            }>;
            getStoreOrders: (token: string, storeId: number) => Promise<{
                orders: import("tentkeep").Order[];
            }>;
            getProductBundleForProduct: (token: string, productId: number) => Promise<import("tentkeep").ProductBundle>;
            getProductBundles: (token: string, storeId: number) => Promise<{
                bundles: import("tentkeep").ProductBundle[];
            }>;
            getBucketQuantities: (token: string | undefined, storeId: number) => Promise<import("tentkeep").BucketQuantitiesResponse>;
            getBucketProducts: (token: string, bucketId: number) => Promise<{
                bucketProducts: import("tentkeep").BucketProduct[];
            }>;
            checkout: (token: string | undefined, orders: {
                orders: number[];
            }) => Promise<import("tentkeep").CheckoutSession>;
            getCheckoutRedirectUrl: () => string;
            getOrdersBundles: (token: string) => Promise<{
                ordersBundles: import("tentkeep").OrdersBundle[];
            }>;
            getOrdersBundlesDrafting: (token: string) => Promise<{
                ordersBundles: import("tentkeep").OrdersBundle[];
            }>;
            getLatestOpenOrdersBundle: (token: string) => Promise<{
                ordersBundle: import("tentkeep").OrdersBundle;
            }>;
            saveOrders: (token: string | undefined, orders: import("tentkeep").Order[]) => Promise<{
                orders: import("tentkeep").Order[];
            }>;
            getOrdersBundle: (token: string, ordersBundleId: number) => Promise<{
                ordersBundle: import("tentkeep").OrdersBundle;
            }>;
            saveOrdersBundle: (token: string | undefined, ordersBundle: import("tentkeep").OrdersBundle) => Promise<{
                ordersBundle: import("tentkeep").OrdersBundle;
            }>;
            startGroupOrdersBundle: (token: string, ordersBundleId: number) => Promise<{
                ordersBundle: import("tentkeep").OrdersBundle;
            }>;
        };
        onUnauthorized: (callback: () => void) => void;
        search: (query: string, options?: import("tentkeep").SearchOptions | undefined) => Promise<import("tentkeep").SearchResponse>;
        searchUsers: (token: string, query: string, options?: import("tentkeep").SearchOptions | undefined) => Promise<import("tentkeep").SearchResponse>;
        getGroup: (token: string, groupName: string) => Promise<{
            group: import("tentkeep").Group;
        }>;
        updateGroup: (token: string, groupId: number, changes: {
            members?: string[] | undefined;
            owners?: string[] | undefined;
            remove?: string[] | undefined;
        }) => Promise<any>;
        getGalleries: (options?: import("tentkeep").SearchOptions | undefined) => Promise<import("tentkeep").TKResponse | import("tentkeep").Gallery>;
        searchGalleries: (query: string, options?: import("tentkeep").SearchOptions | undefined) => Promise<import("tentkeep").SearchResponse>;
        searchGalleryEntryItems: (query: string, options?: import("tentkeep").SearchOptions | undefined) => Promise<import("tentkeep").SearchResponse>;
        getGalleriesNearby: (location: import("tentkeep").Location, options: {
            miles: number;
            limit: number;
        }) => Promise<import("tentkeep").GalleryPlace[]>;
        getGalleriesForGalleryEntries: (galleryEntryIds: number[]) => Promise<import("tentkeep").TKResponse>;
        getGallery: (galleryId: number) => Promise<import("tentkeep").Gallery>;
        getGalleryEntryItem: (galleryEntryItemId: number) => Promise<import("tentkeep").GalleryEntryItem>;
        getRecentGalleryEntryItems: (genericType?: import("tentkeep").GalleryEntryGenericTypes | undefined) => Promise<import("tentkeep").GalleryEntryItem[]>;
        getTrendingGalleryEntryItemTopics: (limit?: number | undefined) => Promise<string[]>;
        getGalleriesForUser: (token: string) => Promise<import("tentkeep").UserGallery[]>;
        getGalleryUsers: (token: string, galleryId: number) => Promise<import("tentkeep").GalleryUsersSummary>;
        getGalleryImageUrl: (galleryId: number) => string;
        getGalleryEntries: (galleryId: number, itemLimit?: number | undefined) => Promise<import("tentkeep").GalleryEntrySummary[]>;
        getGalleryUserRole: (token: string, galleryId: number) => Promise<any>;
        followGallery: (token: string, galleryId: number) => Promise<{
            galleryUsers: import("tentkeep").GalleryUser[];
        }>;
        unfollowGallery: (token: string, galleryId: number) => Promise<{
            galleryUsers: import("tentkeep").GalleryUser[];
        }>;
        joinGallery: (token: string, galleryId: number) => Promise<import("tentkeep").GalleryUser>;
        saveGallery: (token: string, gallery: import("tentkeep").Gallery & {
            title: string;
        }) => Promise<import("tentkeep").Gallery>;
        updateGallery: (token: string, gallery: import("tentkeep").Gallery & {
            id: number;
        }) => Promise<import("tentkeep").Gallery>;
        addGalleryAdmin: (token: string, galleryId: number, users: ({
            id: number;
        } | {
            username: string;
        })[]) => Promise<import("tentkeep").GalleryUsersSummary>;
        saveGalleryEntry: (token: string, galleryId: number, seed: import("tentkeep").GalleryEntrySeed) => Promise<import("tentkeep").GalleryEntry>;
        linkGalleries: (token: string, parentGalleryId: number, childGalleryIds: number[]) => Promise<{
            galleryEntry: import("tentkeep").GalleryEntry;
            galleryEntryItems: import("tentkeep").GalleryEntryItem[];
        }>;
        saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
        findOrCreateStoreForGallery: (token: string, galleryId: number) => Promise<any>;
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
        canEdit: (galleryUser: import("tentkeep").GalleryUser) => import("tentkeep").GalleryUserRoles | undefined;
    };
};
