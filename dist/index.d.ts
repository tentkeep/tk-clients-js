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
        user: <T extends string | number>(user: T) => Promise<T extends number ? import("./src/clients/discourse.js").DiscourseUser : import("./src/clients/discourse.js").DiscourseUserPlus>;
    };
    etsy: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        listing: (listingId: any) => Promise<any>;
        listingImages: (listingId: any) => Promise<any>;
        searchShops: (name: any) => Promise<{
            count: number;
            results: {
                shop_id: number;
                shop_name: string;
                user_id: number;
                create_date: number;
                created_timestamp: number;
                title?: string | undefined;
                announcement?: string | undefined;
                currency_code: string;
                is_vacation: boolean;
                vacation_message?: string | undefined;
                sale_message?: string | undefined;
                digital_sale_message?: string | undefined;
                update_date: number;
                updated_timestamp: number;
                listing_active_count: number;
                digital_listing_count: number;
                login_name: string;
                accepts_custom_requests: boolean;
                vacation_autoreply?: string | undefined;
                url: string;
                image_url_760x100?: string | undefined;
                num_favorers: number;
                languages: string[];
                icon_url_fullxfull?: string | undefined;
                is_using_structured_policies: boolean;
                has_onboarded_structured_policies: boolean;
                include_dispute_form_link: boolean;
                is_direct_checkout_onboarded: boolean;
                is_etsy_payments_onboarded: boolean;
                is_opted_in_to_buyer_promise: boolean;
                is_calculated_eligible: boolean;
                is_shop_us_based: boolean;
                transaction_sold_count: number;
                shipping_from_country_iso?: string | undefined;
                shop_location_country_iso?: string | undefined;
                policy_welcome?: string | undefined;
                policy_payment?: string | undefined;
                policy_shipping?: string | undefined;
                policy_refunds?: string | undefined;
                policy_additional?: string | undefined;
                policy_seller_info?: string | undefined;
                policy_update_date: number;
                policy_has_private_receipt_info: boolean;
                has_unstructured_policies: boolean;
                policy_privacy?: string | undefined;
                review_average?: string | undefined;
                review_count?: string | undefined;
            }[];
        }>;
        getShop: (shopId: any) => Promise<any>;
        getShopWithListings: (shopId: any) => Promise<any>;
        shopListings: (shopId: any, page?: number) => Promise<any>;
        allShopListings: (shopId: any) => Promise<any>;
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
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
    };
    itunes: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        podcasts: (query: any) => Promise<{
            resultCount: number;
            results: [{
                wrapperType: "track";
                kind: "podcast";
                collectionId: number;
                trackId: number;
                artistName: string;
                collectionName: string;
                trackName: string;
                collectionCensoredName: string;
                trackCensoredName: string;
                collectionViewUrl: string;
                feedUrl: string;
                trackViewUrl: string;
                artworkUrl30: string;
                artworkUrl60: string;
                artworkUrl100: string;
                collectionPrice: number;
                trackPrice: number;
                collectionHdPrice: number;
                releaseDate: string;
                collectionExplicitness: "notExplicit";
                trackExplicitness: "cleaned";
                trackCount: number;
                trackTimeMillis: number;
                country: string;
                currency: string;
                primaryGenreName: string;
                contentAdvisoryRating: "Clean";
                artworkUrl600: string;
                genreIds: string[];
                genres: string[];
            }];
        }>;
    };
    musickit: import("./src/clients/tentkeep-client.js").TentkeepClient;
    page: {
        info: (url: string) => Promise<import("@tentkeep/tentkeep").PageInfo>;
        summary: (url: string) => Promise<import("@tentkeep/tentkeep").PageSummary>;
    };
    rss: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        feed: (feedUrl: any) => Promise<any>;
    };
    shopify: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        raw: {
            products: (url: string, limit?: number) => Promise<{
                products: import("./src/clients/shopify.js").ShopifyProduct[];
            }>;
            collections: (url: string) => Promise<any>;
            collectionProducts: (url: string, collectionHandle: string) => Promise<any>;
        };
    };
    spotify: {
        searchArtists: (query: any) => any;
        searchPlaylists: (query: any) => any;
        searchPodcasts: (query: any) => any;
        userPlaylists: (userId: any) => any;
        playlist: (playlistId: any) => any;
        playlistTracks: (playlistId: any) => any;
    };
    tentkeep: (dataDomain: import("@tentkeep/tentkeep").TKDataDomain, key: string, config?: import("@tentkeep/tentkeep/dist/src/tentkeep.js").TKConfig | undefined) => {
        setApiKey: (key: string) => void;
        auth: {
            authSignIn: (strategy: string, redirect: string, options: import("@tentkeep/tentkeep").AuthOptions) => void | Promise<import("@tentkeep/tentkeep").Token>;
            authExchangeAccessCode: (code: string) => Promise<import("@tentkeep/tentkeep").TokenUser>;
            authRefreshTokens: (refreshToken: string) => Promise<import("@tentkeep/tentkeep").TokenUser>;
            signOut: (token: string) => Promise<any>;
        };
        images: {
            saveImages: (token: string, entityType: "galleries" | "stores", entityId: number, entityImages: import("@tentkeep/tentkeep").EntityImageUpload[], attributes: Record<string, any>) => Promise<{
                images: import("@tentkeep/tentkeep").EntityImage[];
            }>;
            proxy: (imageUrl: string) => Promise<any>;
        };
        proxy: {
            searchEntryType: (entryType: import("@tentkeep/tentkeep").GalleryEntryTypes, query: string) => Promise<any>;
            getSummaryForEntry: (entryType: import("@tentkeep/tentkeep").GalleryEntryTypes, sourceId: string) => Promise<any>;
            getPageInfo: (url: string) => Promise<import("@tentkeep/tentkeep").PageInfo>;
            getPageSummary: (url: string) => Promise<import("@tentkeep/tentkeep").PageSummary>;
            getPlaces: (query: string) => Promise<import("@tentkeep/tentkeep").GalleryEntryPlace[]>;
            getPlaceDetail: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntryPlace>;
            getPodcastSummary: (feedUrl: string) => Promise<any>;
            getShopifyProductsSummary: (url: string, limit?: number | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
            getWordpressPostsSummary: (url: string, limit?: number | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
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
            getStore: (token: string, storeId: number) => Promise<import("@tentkeep/tentkeep").Store>;
            registerStore: (token: string, galleryId: number, storeId: number) => Promise<{
                url: string;
            }>;
            getStoreStatus: (token: string, storeId: number) => Promise<{
                status: string;
            }>;
            getStoreOrders: (token: string, storeId: number) => Promise<{
                orders: import("@tentkeep/tentkeep").Order[];
            }>;
            getStoreUsers: (token: string, storeId: number) => Promise<{
                users: import("@tentkeep/tentkeep").StoreUser[];
            }>;
            updateStoreUsers: (token: string, storeId: number, users: {
                userId: number;
                storeId: number;
                scopes: "Store.Admin"[];
            }[]) => Promise<{
                users: import("@tentkeep/tentkeep").StoreUser[];
            }>;
            createProductScheme: (token: string, storeId: number, productScheme: import("@tentkeep/tentkeep").ProductScheme) => Promise<any>;
            getProductBundleForProduct: (token: string, productId: number) => Promise<import("@tentkeep/tentkeep").ProductBundle>;
            getProductBundles: (token: string, storeId: number) => Promise<{
                bundles: import("@tentkeep/tentkeep").ProductBundle[];
            }>;
            archiveProductScheme: (token: string, storeId: number, productSchemeId: number) => Promise<void>;
            createBucket: (token: string, storeId: number, bucket: import("@tentkeep/tentkeep").Bucket) => Promise<{
                locations: import("@tentkeep/tentkeep").PlaceDetail[];
                buckets: import("@tentkeep/tentkeep").Bucket[];
            }>;
            createBucketProducts: (token: string, bucketId: number, bucketProducts: import("@tentkeep/tentkeep").BucketProduct[]) => Promise<{
                bucketProducts: import("@tentkeep/tentkeep").BucketProduct[];
            }>;
            getStoreBuckets: (token: string, storeId: number) => Promise<{
                buckets: import("@tentkeep/tentkeep").Bucket[];
            }>;
            getBucketQuantities: (token: string | undefined, storeId: number) => Promise<import("@tentkeep/tentkeep").BucketQuantitiesResponse>;
            getBucketProducts: (token: string, bucketId: number) => Promise<{
                bucketProducts: import("@tentkeep/tentkeep").BucketProduct[];
            }>;
            checkout: (token: string | undefined, orders: {
                orders: number[];
            }) => Promise<import("@tentkeep/tentkeep").CheckoutSession>;
            getCheckoutRedirectUrl: () => string;
            getOrdersBundles: (token: string) => Promise<{
                ordersBundles: import("@tentkeep/tentkeep").OrdersBundle[];
            }>;
            getOrdersBundle: (token: string, ordersBundleId: number) => Promise<{
                ordersBundle: import("@tentkeep/tentkeep").OrdersBundle;
            }>;
            getOrdersBundlesDrafting: (token: string) => Promise<{
                ordersBundles: import("@tentkeep/tentkeep").OrdersBundle[];
            }>;
            getLatestOpenOrdersBundle: (token: string) => Promise<{
                ordersBundle: import("@tentkeep/tentkeep").OrdersBundle;
            }>;
            saveOrders: (token: string | undefined, orders: import("@tentkeep/tentkeep").Order[]) => Promise<{
                orders: import("@tentkeep/tentkeep").Order[];
            }>;
            saveOrdersBundle: (token: string | undefined, ordersBundle: import("@tentkeep/tentkeep").OrdersBundle) => Promise<{
                ordersBundle: import("@tentkeep/tentkeep").OrdersBundle;
            }>;
            startGroupOrdersBundle: (token: string, ordersBundleId: number) => Promise<{
                ordersBundle: import("@tentkeep/tentkeep").OrdersBundle;
            }>;
            getProductSplitClaims: (token: string, ordersBundleId: number) => Promise<{
                productSplitClaims: import("@tentkeep/tentkeep").ProductSplitClaim[];
            }>;
            saveProductSplitClaims: (token: string, ordersBundleId: number, productSplitClaims: import("@tentkeep/tentkeep").ProductSplitClaim[]) => Promise<{
                productSplitClaims: import("@tentkeep/tentkeep").ProductSplitClaim[];
            }>;
            deleteProductSplitClaims: (token: string, ordersBundle: import("@tentkeep/tentkeep").OrdersBundle, productSplit: import("@tentkeep/tentkeep").AnyProductSplit, splitId: string) => Promise<boolean>;
        };
        onUnauthorized: (callback: () => void) => void;
        search: (query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        searchUsers: (token: string, query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        getUser: (token: string, username: string) => Promise<{
            user: import("@tentkeep/tentkeep").User;
        }>;
        getGroup: (token: string, groupName: string) => Promise<{
            group: import("@tentkeep/tentkeep").Group;
        }>;
        updateGroup: (token: string, groupId: number, changes: {
            members?: string[] | undefined;
            owners?: string[] | undefined;
            remove?: string[] | undefined;
        }) => Promise<any>;
        getGalleries: (options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").TKResponse | import("@tentkeep/tentkeep").Gallery>;
        searchGalleries: (query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        searchGalleryEntryItems: (query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        getGalleriesNearby: (location: import("@tentkeep/tentkeep").Location, options: {
            miles: number;
            limit: number;
        }) => Promise<import("@tentkeep/tentkeep").GalleryPlace[]>;
        getGalleriesForGalleryEntries: (galleryEntryIds: number[]) => Promise<import("@tentkeep/tentkeep").TKResponse>;
        getGallery: (galleryId: number) => Promise<import("@tentkeep/tentkeep").Gallery>;
        getGalleryEntryItem: (galleryEntryItemId: number) => Promise<import("@tentkeep/tentkeep").GalleryEntryItem>;
        getRecentGalleryEntryItems: (genericType?: import("@tentkeep/tentkeep").GalleryEntryGenericTypes | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntryItem[]>;
        getTrendingGalleryEntryItemTopics: (limit?: number | undefined) => Promise<string[]>;
        getGalleriesForUser: (token: string) => Promise<import("@tentkeep/tentkeep").UserGallery[]>;
        getGalleryUsers: (token: string, galleryId: number) => Promise<import("@tentkeep/tentkeep").GalleryUsersSummary>;
        getGalleryImageUrl: (galleryId: number) => string;
        getGalleryEntries: (galleryId: number, itemLimit?: number | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary[]>;
        deleteGalleryEntry: (token: string, galleryId: number, galleryEntryId: number) => Promise<any>;
        getGalleryUserRole: (token: string, galleryId: number) => Promise<any>;
        followGallery: (token: string, galleryId: number) => Promise<{
            galleryUsers: import("@tentkeep/tentkeep").GalleryUser[];
        }>;
        unfollowGallery: (token: string, galleryId: number) => Promise<{
            galleryUsers: import("@tentkeep/tentkeep").GalleryUser[];
        }>;
        joinGallery: (token: string, galleryId: number) => Promise<import("@tentkeep/tentkeep").GalleryUser>;
        saveGallery: (token: string, gallery: import("@tentkeep/tentkeep").Entity & {
            id?: number | undefined;
            title?: string | undefined;
            description?: string | undefined;
            createdBy?: number | undefined;
            url?: string | undefined;
            images?: import("@tentkeep/tentkeep").EntityImage[] | undefined;
            attributes?: import("@tentkeep/tentkeep").GalleryAttribute[] | undefined;
        } & {
            title: string;
        }) => Promise<import("@tentkeep/tentkeep").Gallery>;
        updateGallery: (token: string, gallery: import("@tentkeep/tentkeep").Entity & {
            id?: number | undefined;
            title?: string | undefined;
            description?: string | undefined;
            createdBy?: number | undefined;
            url?: string | undefined;
            images?: import("@tentkeep/tentkeep").EntityImage[] | undefined;
            attributes?: import("@tentkeep/tentkeep").GalleryAttribute[] | undefined;
        } & {
            id: number;
        }) => Promise<import("@tentkeep/tentkeep").Gallery>;
        addGalleryAdmin: (token: string, galleryId: number, users: ({
            id: number;
        } | {
            username: string;
        })[]) => Promise<import("@tentkeep/tentkeep").GalleryUsersSummary>;
        saveGalleryEntry: (token: string, galleryId: number, seed: import("@tentkeep/tentkeep").GalleryEntrySeed) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        linkGalleries: (token: string, parentGalleryId: number, childGalleryIds: number[]) => Promise<{
            galleryEntry: import("@tentkeep/tentkeep").GalleryEntry;
            galleryEntryItems: import("@tentkeep/tentkeep").GalleryEntryItem[];
        }>;
        saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
        findOrCreateStoreForGallery: (token: string, galleryId: number) => Promise<any>;
    };
    wordpress: import("./src/clients/tentkeep-client.js").TentkeepClient & {
        host: (_host: string) => {
            isWordpress(): Promise<boolean>;
            summary(limit?: number): Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
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
        summarize: (channelId: string) => Promise<import("@tentkeep/tentkeep").Entity & {
            id?: number | undefined;
            galleryId?: number | undefined;
            createdBy?: number | undefined;
            entryType?: import("@tentkeep/tentkeep").GalleryEntryTypes | undefined;
            genericType?: import("@tentkeep/tentkeep").GalleryEntryGenericTypes | undefined;
            sourceId?: string | undefined;
            title?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            url?: string | undefined;
            detail?: any;
        } & {
            items: import("@tentkeep/tentkeep").GalleryEntryItem[];
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
        canEdit: (galleryUser: import("@tentkeep/tentkeep").GalleryUser) => import("@tentkeep/tentkeep").GalleryUserRoles | undefined;
    };
};
