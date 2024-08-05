export * as Discourse from './src/clients/discourse.js';
export declare const clients: {
    discourse: (host: string) => {
        Groups: {
            join: (groupId: number, actingUsername: string) => Promise<undefined>;
        };
        Posts: {
            create: (actingUsername: string, payload: {
                title: string;
                raw: string;
                target_recipients: string;
                archetype?: "private_message" | undefined;
                external_id?: string | undefined;
            } | {
                raw: string;
                topic_id: number;
                title?: string | undefined;
                target_recipients?: string | undefined;
                archetype?: "private_message" | undefined;
                external_id?: string | undefined;
            }) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
        };
        addGroupMembers: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        addGroupOwners: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        createGroup: (group: import("./src/clients/discourse.js").Group) => Promise<{
            basic_group: import("./src/clients/discourse.js").Group;
        }>;
        createInvite: (invite: import("./src/clients/discourse.js").InviteRequest, fromUsername: string) => Promise<import("./src/clients/discourse.js").InviteResponse>;
        getPost: (id: number) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
        getTopic: (topic: string | number, options: {
            actingUsername: string;
            external_id?: true | undefined;
        }) => Promise<import("./src/clients/discourse.js").DiscourseTopic>;
        group: (groupName: string) => Promise<{
            group: import("./src/clients/discourse.js").Group;
        }>;
        groupMembers: (groupName: string) => Promise<import("./src/clients/discourse.js").GroupMembers>;
        groupPrivateMessages: (username: string, groupName: string) => Promise<{
            users: import("./src/clients/discourse.js").DiscourseUserMini[];
            primary_groups: any[];
            flair_groups: any[];
            topic_list: {
                can_create_topic: boolean;
                per_page: number;
                top_tags: any[];
                topics: Partial<import("./src/clients/discourse.js").DiscourseTopic>[];
            };
        }>;
        privateMessage: (fromUsername: string, toUsername: string, subject: string, message: string) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
        removeGroupMembers: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        removeGroupOwnerRole: (groupId: number, usernames: string[], actingUser: string) => Promise<any>;
        replyToTopic: (topicId: number, message: string) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
        runDataQuery: (queryId: number, input: Record<string, any>) => Promise<{
            data: Record<string, any>[];
        }>;
        search: (query: string) => Promise<import("./src/clients/discourse.js").SearchResponse>;
        user: <T extends string | number>(user: T, actingUsername: string) => Promise<T extends number ? import("./src/clients/discourse.js").DiscourseUser : import("./src/clients/discourse.js").DiscourseUserPlus<"self">>;
        userEmails: (username: string) => Promise<import("./src/clients/discourse.js").DiscourseUserEmails>;
    };
    etsy: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
        summarize: (sourceId: string, options?: undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        listing: (listingId: any) => Promise<any>;
        listingImages: (listingId: any) => Promise<{
            count: number;
            results: {
                listing_id: number;
                listing_image_id: number;
                hex_code: string;
                red: number;
                green: number;
                blue: number;
                hue: number;
                saturation: number;
                brightness: number;
                is_black_and_white: boolean;
                creation_tsz: number;
                created_timestamp: number;
                rank: number;
                url_75x75: string;
                url_170x135: string;
                url_570xN: string;
                url_fullxfull: string;
                full_height: number;
                full_width: number;
                alt_text?: string | undefined;
            }[];
        }>;
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
        getShop: (shopId: any) => Promise<{
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
        }>;
        shopListings: (shopId: any, offset?: number) => Promise<{
            count: number;
            results: {
                listing_id: number;
                user_id: number;
                shop_id: number;
                title: string;
                description: string;
                state: string;
                creation_timestamp: number;
                created_timestamp: number;
                ending_timestamp: number;
                original_creation_timestamp: number;
                last_modified_timestamp: number;
                updated_timestamp: number;
                state_timestamp: number;
                quantity: number;
                shop_section_id?: string | undefined;
                featured_rank: number;
                url: string;
                num_favorers: number;
                non_taxable: boolean;
                is_taxable: boolean;
                is_customizable: boolean;
                is_personalizable: boolean;
                personalization_is_required: boolean;
                personalization_char_count_max?: string | undefined;
                personalization_instructions?: string | undefined;
                listing_type: string;
                tags: string[];
                materials: string[];
                shipping_profile_id: number;
                return_policy_id?: string | undefined;
                processing_min: number;
                processing_max: number;
                who_made: string;
                when_made: string;
                is_supply: boolean;
                item_weight?: string | undefined;
                item_weight_unit?: string | undefined;
                item_length?: string | undefined;
                item_width?: string | undefined;
                item_height?: string | undefined;
                item_dimensions_unit?: string | undefined;
                is_private: boolean;
                style: string[];
                file_data: string;
                has_variations: boolean;
                should_auto_renew: boolean;
                language: string;
                price: {
                    amount: number;
                    divisor: number;
                    currency_code: string;
                };
                taxonomy_id: number;
                production_partners: string[];
                skus: string[];
                views: number;
                images?: {
                    listing_id: number;
                    listing_image_id: number;
                    hex_code: string;
                    red: number;
                    green: number;
                    blue: number;
                    hue: number;
                    saturation: number;
                    brightness: number;
                    is_black_and_white: boolean;
                    creation_tsz: number;
                    created_timestamp: number;
                    rank: number;
                    url_75x75: string;
                    url_170x135: string;
                    url_570xN: string;
                    url_fullxfull: string;
                    full_height: number;
                    full_width: number;
                    alt_text?: string | undefined;
                }[] | undefined;
            }[];
        }>;
        allShopListings: (shopId: any) => Promise<{
            listing_id: number;
            user_id: number;
            shop_id: number;
            title: string;
            description: string;
            state: string;
            creation_timestamp: number;
            created_timestamp: number;
            ending_timestamp: number;
            original_creation_timestamp: number;
            last_modified_timestamp: number;
            updated_timestamp: number;
            state_timestamp: number;
            quantity: number;
            shop_section_id?: string | undefined;
            featured_rank: number;
            url: string;
            num_favorers: number;
            non_taxable: boolean;
            is_taxable: boolean;
            is_customizable: boolean;
            is_personalizable: boolean;
            personalization_is_required: boolean;
            personalization_char_count_max?: string | undefined;
            personalization_instructions?: string | undefined;
            listing_type: string;
            tags: string[];
            materials: string[];
            shipping_profile_id: number;
            return_policy_id?: string | undefined;
            processing_min: number;
            processing_max: number;
            who_made: string;
            when_made: string;
            is_supply: boolean;
            item_weight?: string | undefined;
            item_weight_unit?: string | undefined;
            item_length?: string | undefined;
            item_width?: string | undefined;
            item_height?: string | undefined;
            item_dimensions_unit?: string | undefined;
            is_private: boolean;
            style: string[];
            file_data: string;
            has_variations: boolean;
            should_auto_renew: boolean;
            language: string;
            price: {
                amount: number;
                divisor: number;
                currency_code: string;
            };
            taxonomy_id: number;
            production_partners: string[];
            skus: string[];
            views: number;
            images?: {
                listing_id: number;
                listing_image_id: number;
                hex_code: string;
                red: number;
                green: number;
                blue: number;
                hue: number;
                saturation: number;
                brightness: number;
                is_black_and_white: boolean;
                creation_tsz: number;
                created_timestamp: number;
                rank: number;
                url_75x75: string;
                url_170x135: string;
                url_570xN: string;
                url_fullxfull: string;
                full_height: number;
                full_width: number;
                alt_text?: string | undefined;
            }[] | undefined;
        }[]>;
        getListingsWith: (listingIds: number[], includes: ("Shipping" | "Images" | "Shop" | "User" | "Translations" | "Inventory" | "Videos")[]) => Promise<{
            count: number;
            results: {
                listing_id: number;
                user_id: number;
                shop_id: number;
                title: string;
                description: string;
                state: string;
                creation_timestamp: number;
                created_timestamp: number;
                ending_timestamp: number;
                original_creation_timestamp: number;
                last_modified_timestamp: number;
                updated_timestamp: number;
                state_timestamp: number;
                quantity: number;
                shop_section_id?: string | undefined;
                featured_rank: number;
                url: string;
                num_favorers: number;
                non_taxable: boolean;
                is_taxable: boolean;
                is_customizable: boolean;
                is_personalizable: boolean;
                personalization_is_required: boolean;
                personalization_char_count_max?: string | undefined;
                personalization_instructions?: string | undefined;
                listing_type: string;
                tags: string[];
                materials: string[];
                shipping_profile_id: number;
                return_policy_id?: string | undefined;
                processing_min: number;
                processing_max: number;
                who_made: string;
                when_made: string;
                is_supply: boolean;
                item_weight?: string | undefined;
                item_weight_unit?: string | undefined;
                item_length?: string | undefined;
                item_width?: string | undefined;
                item_height?: string | undefined;
                item_dimensions_unit?: string | undefined;
                is_private: boolean;
                style: string[];
                file_data: string;
                has_variations: boolean;
                should_auto_renew: boolean;
                language: string;
                price: {
                    amount: number;
                    divisor: number;
                    currency_code: string;
                };
                taxonomy_id: number;
                production_partners: string[];
                skus: string[];
                views: number;
                images?: {
                    listing_id: number;
                    listing_image_id: number;
                    hex_code: string;
                    red: number;
                    green: number;
                    blue: number;
                    hue: number;
                    saturation: number;
                    brightness: number;
                    is_black_and_white: boolean;
                    creation_tsz: number;
                    created_timestamp: number;
                    rank: number;
                    url_75x75: string;
                    url_170x135: string;
                    url_570xN: string;
                    url_fullxfull: string;
                    full_height: number;
                    full_width: number;
                    alt_text?: string | undefined;
                }[] | undefined;
            }[];
        }>;
    };
    google: {
        raw: {
            places: {
                searchOld: (query: string) => Promise<{
                    address_components: {
                        long_name: string;
                        short_name: string;
                        types: ("street_number" | "subpremise" | "route" | "locality" | "administrative_area_level_1" | "administrative_area_level_2" | "administrative_area_level_3" | "country" | "postal_code" | "political")[];
                    }[];
                    place_id: string;
                    name: string;
                    website?: string | undefined;
                    formatted_address: string;
                    international_phone_number?: string | undefined;
                    geometry?: {
                        location?: {
                            lat: number;
                            lng: number;
                        } | undefined;
                    } | undefined;
                }>;
                search: (query: string, options?: {
                    limit: number;
                } | undefined) => Promise<{
                    places?: import("./src/clients/google.js").GooglePlace[] | undefined;
                }>;
                details: (placeId: string) => Promise<{
                    result: {
                        address_components: {
                            long_name: string;
                            short_name: string;
                            types: ("street_number" | "subpremise" | "route" | "locality" | "administrative_area_level_1" | "administrative_area_level_2" | "administrative_area_level_3" | "country" | "postal_code" | "political")[];
                        }[];
                        place_id: string;
                        name: string;
                        website?: string | undefined;
                        formatted_address: string;
                        international_phone_number?: string | undefined;
                        geometry?: {
                            location?: {
                                lat: number;
                                lng: number;
                            } | undefined;
                        } | undefined;
                    };
                }>;
            };
        };
        placeDetails: (placeId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntryPlace>;
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
        summarize: (sourceId: string, options?: undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
    };
    itunes: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
        summarize: (sourceId: string, options?: undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
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
    musickit: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
        summarize: (sourceId: string, options?: undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        searchArtists: (term: string) => Promise<{
            results: {
                artists: {
                    href: string;
                    next: string;
                    data: [{
                        id: string;
                        type: string;
                        href: string;
                        attributes: {
                            name: string;
                            genreNames: string[];
                            artwork: {
                                width: number;
                                height: number;
                                url: string;
                                bgColor: string;
                                textColor1: string;
                                textColor2: string;
                                textColor3: string;
                                textColor4: string;
                            };
                            url: string;
                        };
                        relationships: {
                            albums: {
                                href: string;
                                data: [{
                                    id: string;
                                    type: string;
                                    href: string;
                                    attributes: {
                                        copyright: string;
                                        genreNames: string[];
                                        releaseDate: string;
                                        upc: string;
                                        isMasteredForItunes: false;
                                        artwork: {
                                            width: number;
                                            height: number;
                                            url: string;
                                            bgColor: string;
                                            textColor1: string;
                                            textColor2: string;
                                            textColor3: string;
                                            textColor4: string;
                                        };
                                        url: string;
                                        playParams: {
                                            id: string;
                                            kind: string;
                                        };
                                        recordLabel: string;
                                        isCompilation: false;
                                        trackCount: number;
                                        isSingle: false;
                                        name: string;
                                        artistName: string;
                                        isComplete: true;
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
            meta: {
                results: {
                    order: [string];
                    rawOrder: [string];
                };
            };
        }>;
        getArtist: (artistId: any) => Promise<any>;
        getArtistAlbums: (artistId: any) => Promise<any>;
        getAlbum: (albumId: any) => Promise<any>;
        getAlbums: (albumIds: any) => Promise<any>;
    };
    page: {
        info: (url: string, options?: {
            timeout?: number | undefined;
        } | undefined) => Promise<import("@tentkeep/tentkeep").PageInfo>;
        summary: (url: string, options?: {
            timeout?: number | undefined;
        } | undefined) => Promise<import("@tentkeep/tentkeep").PageSummary>;
    };
    rss: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
        summarize: (sourceId: string, options?: undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        feed: (feedUrl: any) => Promise<{
            title: string;
            description: string;
            link: string;
            image: {
                url: string;
                title: string;
                link: string;
            };
            generator: string;
            lastBuildDate: string;
            'atom:link': {
                $href: string;
                $rel: string;
                $type: string;
            };
            author: string;
            copyright: string;
            language: string;
            'anchor:support': string;
            'anchor:station': string;
            'itunes:author': string;
            'itunes:summary': string;
            'itunes:type': string;
            'itunes:owner': {
                'itunes:name': string;
                'itunes:email': string;
            };
            'itunes:explicit': string;
            'itunes:category': {
                $text: string;
            };
            'itunes:image': {
                $href: string;
            };
            item: [{
                title: string;
                description: string;
                link: string;
                guid: {
                    _: string;
                };
                'dc:creator': string;
                pubDate: string;
                enclosure: {
                    $url: string;
                    $length: string;
                    $type: string;
                };
                'itunes:summary': string;
                'itunes:explicit': string;
                'itunes:duration': string;
                'itunes:image': {
                    $href: string;
                };
                'itunes:season': string;
                'itunes:episode': string;
                'itunes:episodeType': string;
            }];
        }>;
    };
    shopify: {
        search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
        summarize: (sourceId: string, options?: {
            limit: number;
        } | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        raw: {
            products: (url: string, limit?: number, page?: number) => Promise<{
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
    tentkeep: (config: import("@tentkeep/tentkeep/dist/src/tentkeep.js").TKConfig) => {
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
            search: (entryType: import("@tentkeep/tentkeep").GalleryEntryTypes, query: string) => Promise<{
                galleryEntries: import("@tentkeep/tentkeep").GalleryEntry[];
            }>;
            summarize: (entryType: import("@tentkeep/tentkeep").GalleryEntryTypes, sourceId: string) => Promise<{
                galleryEntrySummary: import("@tentkeep/tentkeep").GalleryEntrySummary;
            }>;
            getPageInfo: (url: string) => Promise<import("@tentkeep/tentkeep").PageInfo>;
            getPageSummary: (url: string) => Promise<import("@tentkeep/tentkeep").PageSummary>;
            getPlaces: (query: string) => Promise<import("@tentkeep/tentkeep").GalleryEntryPlace[]>;
            getPlaceDetail: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntryPlace>;
            getShopifyItemsForCollection: (storeUrl: string, collectionHandle: string) => Promise<import("@tentkeep/tentkeep").EntitiesBundle<"galleryEntryItems">>;
        };
        session: {
            getEnv: () => Promise<any>;
            getMapKitToken: () => Promise<any>;
            getMapKitKey: () => Promise<{
                data: string;
            }>;
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
            getStoreOrders: (token: string, storeId: number, userId?: number | undefined) => Promise<{
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
            getMembershipOptions: (token: string) => Promise<{
                items: import("@tentkeep/tentkeep").GalleryEntryItemProduct[];
            }>;
            checkoutMembership: (token: string, variantId: string) => Promise<import("@tentkeep/tentkeep").CheckoutSession>;
            getCheckoutRedirectUrl: () => string;
            getSubscriptions: (token: string) => Promise<{
                items: import("@tentkeep/tentkeep").GalleryEntryItem[];
            }>;
            deleteSubscription: (token: string, subscriptionId: string) => Promise<any>;
        };
        onUnauthorized: (callback: () => void) => void;
        findEntities: (entity: string, token?: string | undefined, query?: any) => Promise<Partial<import("@tentkeep/tentkeep").AllEntitiesBundle>>;
        getEntity: (entity: string, token: string | undefined, id: string | number) => Promise<Partial<import("@tentkeep/tentkeep").AllEntityBundle>>;
        saveEntities: (entity: string, token: string, payload: Partial<import("@tentkeep/tentkeep").AllEntitiesBundle> | Partial<import("@tentkeep/tentkeep").AllEntityBundle>) => Promise<Partial<import("@tentkeep/tentkeep").AllEntitiesBundle>>;
        doAction: (entity: string, token: string, action: string, payload: any) => Promise<any>;
        deleteEntity: (entity: string, token: string, id: string | number) => Promise<{
            success: boolean;
        }>;
        Content: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"content">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"content">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").PageContent>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"contents">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"content">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"contents">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"contents">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Customers: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"customer">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"customer">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<{
                storeId: number;
            }>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"customers">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"customer">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"customers">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"customers">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Discounts: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"discount">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"discount">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").Discount>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"discounts">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"discount">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"discounts">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"discounts">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Galleries: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"gallery">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"gallery">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").Gallery>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"galleries">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"gallery">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"galleries">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"galleries">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Groups: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"group">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"group">>;
            find: (token: string, query: {
                query?: string | undefined;
                me?: boolean | undefined;
            }) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"groups">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"group">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"groups">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"groups">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        GroupOrders: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"groupOrder" | "userProfile">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"groupOrder" | "userProfile">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").GroupOrder>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"groupOrders">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"groupOrder" | "userProfile">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"groupOrders">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"groupOrders">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Messages: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"message">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"message">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").ThreadMessage>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"messages">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"message">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"messages">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"messages">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Orders: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"order" | "galleryOrder">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"order" | "galleryOrder">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").Order | import("@tentkeep/tentkeep").GalleryOrder>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"galleryOrders" | "orders">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"order" | "galleryOrder">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"galleryOrders" | "orders">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"galleryOrders" | "orders">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        ProductBundles: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"productBundle">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productBundle">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").ProductBundle>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productBundles">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"productBundle">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"productBundles">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productBundles">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        ProductSplits: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"productSplit">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplit">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").AnyProductSplit>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplits">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"productSplit">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplits">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplits">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        ProductSplitClaims: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"productSplitClaim">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplitClaim">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").ProductSplitClaim>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplitClaims">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"productSplitClaim">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplitClaims">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"productSplitClaims">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Threads: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"thread">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"thread">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").Thread>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"threads">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"thread">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"threads">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"threads">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Transactions: {
            create: (token: string, payload: Partial<import("@tentkeep/tentkeep").EntityBundle<"transaction">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"transaction" | "checkoutSession">>;
            find: (token: string, query: import("@tentkeep/tentkeep").SearchQuery<import("@tentkeep/tentkeep").Transaction>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"transactions">>;
            get: (token: string, id: string | number) => Promise<import("@tentkeep/tentkeep").EntityBundle<"transaction">>;
            save: (token: string, payload: Partial<import("@tentkeep/tentkeep").MixedEntityBundle<"transactions">>) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"transactions">>;
            do: (token: string, action: string, payload: any) => Promise<any>;
            delete: (token: string, id: string | number) => Promise<{
                success: boolean;
            }>;
        };
        Actions: {
            do: <T_1 extends import("@tentkeep/tentkeep").ActionPayload>(token: string, payload: T_1) => Promise<import("@tentkeep/tentkeep").ActionReturn<T_1>>;
        };
        getComposition: (token: string | undefined, compositionId: number) => Promise<{
            composition: import("@tentkeep/tentkeep/dist/src/composition/composition-types.js").Composition;
        }>;
        saveComposition: (token: string, composition: import("@tentkeep/tentkeep/dist/src/composition/composition-types.js").Composition) => Promise<{
            composition: import("@tentkeep/tentkeep/dist/src/composition/composition-types.js").Composition;
        }>;
        search: (query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        searchUsers: (token: string, query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        getUser: (token: string, username: string) => Promise<{
            user: import("@tentkeep/tentkeep").User;
        }>;
        getCart: (token: string) => Promise<import("@tentkeep/tentkeep").MixedEntityBundle<"galleryOrders" | "orders">>;
        getShareableLink: (token: string, request: import("@tentkeep/tentkeep/dist/src/types/request-types.js").ShareRequest) => Promise<any>;
        sendMessageToSupport: (token: string, message: string) => Promise<any>;
        updateGroup: (token: string, groupId: number, changes: {
            members?: string[] | undefined;
            owners?: string[] | undefined;
            remove?: string[] | undefined;
            removeOwners?: string[] | undefined;
        }) => Promise<any>;
        getGalleries: (options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").Gallery | import("@tentkeep/tentkeep").TKResponse>;
        searchGalleries: (query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        searchGalleryEntryItems: (query: string, options?: import("@tentkeep/tentkeep").SearchOptions | undefined) => Promise<import("@tentkeep/tentkeep").SearchResponse>;
        getGalleriesNearby: (location: import("@tentkeep/tentkeep").LocationSearch, options: {
            miles: number;
            limit: number;
        }) => Promise<import("@tentkeep/tentkeep").GalleryPlace[]>;
        getGalleriesForGalleryEntries: (galleryEntryIds: number[]) => Promise<import("@tentkeep/tentkeep").TKResponse>;
        getGallery: (galleryId: number) => Promise<import("@tentkeep/tentkeep").Gallery>;
        getGalleryEntryItem: (galleryEntryItemId: number) => Promise<import("@tentkeep/tentkeep").GalleryEntryItem>;
        getRecentGalleryEntryItems: (genericType?: import("@tentkeep/tentkeep").GalleryEntryGenericTypes | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntryItem[]>;
        getTrendingGalleryEntryItemTopics: (limit?: number | undefined) => Promise<string[]>;
        getMyScopes: (token: string) => Promise<{
            scopes: string[];
        }>;
        getUserLocations: (token: string) => Promise<{
            locations: import("@tentkeep/tentkeep").Location[];
        }>;
        saveUserLocation: (token: string, location: import("@tentkeep/tentkeep").Location) => Promise<{
            location: import("@tentkeep/tentkeep").Location;
        }>;
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
        saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
        saveGallery: (token: string, gallery: import("@tentkeep/tentkeep").Entity & {
            id?: number | undefined;
            title?: string | undefined;
            description?: string | undefined;
            createdBy?: number | undefined;
            url?: string | undefined;
            images?: import("@tentkeep/tentkeep").EntityImage[] | undefined;
            compositionId?: number | undefined;
            attributes?: import("@tentkeep/tentkeep").GalleryAttribute[] | undefined;
            meta?: Record<string, any> | undefined;
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
            compositionId?: number | undefined;
            attributes?: import("@tentkeep/tentkeep").GalleryAttribute[] | undefined;
            meta?: Record<string, any> | undefined;
        } & {
            id: number;
        }) => Promise<import("@tentkeep/tentkeep").Gallery>;
        deleteGallery: (token: string, galleryId: number) => Promise<any>;
        addGalleryAdmin: (token: string, galleryId: number, users: ({
            id: number;
        } | {
            username: string;
        })[]) => Promise<import("@tentkeep/tentkeep").GalleryUsersSummary>;
        saveGalleryEntry: (token: string, galleryId: number, entryType: import("@tentkeep/tentkeep").GalleryEntryTypes, sourceIdOrEntry: string | import("@tentkeep/tentkeep").GalleryEntry) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
        linkGalleries: (token: string, parentGalleryId: number, childGalleryIds: number[]) => Promise<{
            galleryEntry: import("@tentkeep/tentkeep").GalleryEntry;
            galleryEntryItems: import("@tentkeep/tentkeep").GalleryEntryItem[];
        }>;
        findOrCreateStoreForGallery: (token: string, galleryId: number) => Promise<any>;
    };
    wordpress: import("./src/clients/tentkeep-client.js").TentkeepClient<undefined> & {
        host: (_host: string) => {
            isWordpress(): Promise<boolean>;
            hasProducts(): Promise<boolean>;
            summary(limit?: number): Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
            blockTypes: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            blocks: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            blockRevisions: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            renderedBlocks: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            blockDirectoryItems: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            categories: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            comments: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            media: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            pages: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            pageRevisions: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            posts: import("./src/clients/wordpress.js").WordpressResourceAPI<{
                _embedded?: {
                    'wp:featuredmedia'?: {
                        id: number;
                        date?: Date | undefined;
                        slug?: string | undefined;
                        type?: string | undefined;
                        link?: string | undefined;
                        title?: {
                            rendered?: string | undefined;
                        } | undefined;
                        author?: number | undefined;
                        jetpack_sharing_enabled?: boolean | undefined;
                        jetpack_shortlink?: string | undefined;
                        caption?: {
                            rendered?: string | undefined;
                        } | undefined;
                        alt_text?: string | undefined;
                        media_type?: string | undefined;
                        mime_type?: string | undefined;
                        media_details?: {
                            width?: number | undefined;
                            height?: number | undefined;
                            file?: string | undefined;
                            sizes?: {
                                woocommerce_thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                woocommerce_gallery_thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                woocommerce_single?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                medium?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                medium_large?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                large?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                shop_catalog?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                shop_single?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                shop_thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                full?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                            } | undefined;
                            image_meta?: {
                                aperture?: string | undefined;
                                credit?: string | undefined;
                                camera?: string | undefined;
                                caption?: string | undefined;
                                created_timestamp?: string | undefined;
                                copyright?: string | undefined;
                                focal_length?: string | undefined;
                                iso?: string | undefined;
                                shutter_speed?: string | undefined;
                                title?: string | undefined;
                                orientation?: string | undefined;
                                keywords?: string[] | undefined;
                            } | undefined;
                        } | undefined;
                        source_url?: string | undefined;
                        _links?: {
                            self?: [{
                                href?: string | undefined;
                            }] | undefined;
                            collection?: [{
                                href?: string | undefined;
                            }] | undefined;
                            about?: [{
                                href?: string | undefined;
                            }] | undefined;
                            author?: [{
                                embeddable?: boolean | undefined;
                                href?: string | undefined;
                            }] | undefined;
                            replies?: [{
                                embeddable?: boolean | undefined;
                                href?: string | undefined;
                            }] | undefined;
                        } | undefined;
                    }[] | undefined;
                } | undefined;
            } & {
                id: number;
                date?: Date | undefined;
                date_gmt?: Date | undefined;
                guid?: {
                    rendered?: string | undefined;
                } | undefined;
                modified?: Date | undefined;
                modified_gmt?: Date | undefined;
                slug?: string | undefined;
                status?: string | undefined;
                type?: string | undefined;
                link?: string | undefined;
                title?: {
                    rendered?: string | undefined;
                } | undefined;
                content?: {
                    rendered?: string | undefined;
                    protected?: boolean | undefined;
                } | undefined;
                excerpt?: {
                    rendered?: string | undefined;
                    protected?: boolean | undefined;
                } | undefined;
                yoast_head?: string | undefined;
                yoast_head_json?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    robots?: {
                        index?: "index" | undefined;
                        follow?: "follow" | undefined;
                        'max-snippet'?: "max-snippet?:-1" | undefined;
                        'max-image-preview'?: "max-image-preview?:large" | undefined;
                        'max-video-preview'?: "max-video-preview?:-1" | undefined;
                    } | undefined;
                    canonical?: string | undefined;
                    og_locale?: string | undefined;
                    og_type?: string | undefined;
                    og_title?: string | undefined;
                    og_description?: string | undefined;
                    og_url?: string | undefined;
                    og_site_name?: string | undefined;
                    article_publisher?: string | undefined;
                    article_published_time?: Date | undefined;
                    article_modified_time?: Date | undefined;
                    og_image?: [{
                        width?: number | undefined;
                        height?: number | undefined;
                        url?: string | undefined;
                        type?: string | undefined;
                    }] | undefined;
                    author?: string | undefined;
                    twitter_card?: string | undefined;
                    twitter_creator?: string | undefined;
                    twitter_site?: string | undefined;
                    twitter_misc?: Record<string, string> | undefined;
                } | undefined;
            } & {
                author?: number | undefined;
                featured_media?: number | undefined;
                comment_status?: string | undefined;
                ping_status?: string | undefined;
                sticky?: boolean | undefined;
                template?: string | undefined;
                format?: string | undefined;
                meta?: {
                    _mo_disable_npp?: "" | undefined;
                    'disable-jtr'?: false | undefined;
                    _genesis_hide_title?: false | undefined;
                    _genesis_hide_breadcrumbs?: false | undefined;
                    _genesis_hide_singular_image?: false | undefined;
                    _genesis_hide_footer_widgets?: false | undefined;
                    _genesis_custom_body_class?: "" | undefined;
                    _genesis_custom_post_class?: "" | undefined;
                    _genesis_layout?: "" | undefined;
                } | undefined;
                categories?: number[] | undefined;
                tags?: any[] | undefined;
                acf?: any[] | undefined;
                featured_image_urls?: {
                    full?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    thumbnail?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    medium?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    medium_large?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    large?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    '1536x1536'?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    '2048x2048'?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                    'featured-thumb'?: [url?: string | undefined, height?: number | undefined, width?: number | undefined, unknown_field?: boolean | undefined] | undefined;
                } | undefined;
                post_excerpt_stackable?: string | undefined;
                category_list?: string | undefined;
                author_info?: {
                    name?: string | undefined;
                    url?: string | undefined;
                } | undefined;
                comments_num?: string | undefined;
            }>;
            postRevisions: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            postStatuses: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            postTypes: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            product: import("./src/clients/wordpress.js").WordpressResourceAPI<{
                _embedded?: {
                    'wp:featuredmedia'?: {
                        id: number;
                        date?: Date | undefined;
                        slug?: string | undefined;
                        type?: string | undefined;
                        link?: string | undefined;
                        title?: {
                            rendered?: string | undefined;
                        } | undefined;
                        author?: number | undefined;
                        jetpack_sharing_enabled?: boolean | undefined;
                        jetpack_shortlink?: string | undefined;
                        caption?: {
                            rendered?: string | undefined;
                        } | undefined;
                        alt_text?: string | undefined;
                        media_type?: string | undefined;
                        mime_type?: string | undefined;
                        media_details?: {
                            width?: number | undefined;
                            height?: number | undefined;
                            file?: string | undefined;
                            sizes?: {
                                woocommerce_thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                woocommerce_gallery_thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                woocommerce_single?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                medium?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                medium_large?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                large?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                shop_catalog?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                shop_single?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                shop_thumbnail?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                                full?: {
                                    file: string;
                                    width: number;
                                    height: number;
                                    uncropped: boolean;
                                    mime_type: string;
                                    source_url: string;
                                } | undefined;
                            } | undefined;
                            image_meta?: {
                                aperture?: string | undefined;
                                credit?: string | undefined;
                                camera?: string | undefined;
                                caption?: string | undefined;
                                created_timestamp?: string | undefined;
                                copyright?: string | undefined;
                                focal_length?: string | undefined;
                                iso?: string | undefined;
                                shutter_speed?: string | undefined;
                                title?: string | undefined;
                                orientation?: string | undefined;
                                keywords?: string[] | undefined;
                            } | undefined;
                        } | undefined;
                        source_url?: string | undefined;
                        _links?: {
                            self?: [{
                                href?: string | undefined;
                            }] | undefined;
                            collection?: [{
                                href?: string | undefined;
                            }] | undefined;
                            about?: [{
                                href?: string | undefined;
                            }] | undefined;
                            author?: [{
                                embeddable?: boolean | undefined;
                                href?: string | undefined;
                            }] | undefined;
                            replies?: [{
                                embeddable?: boolean | undefined;
                                href?: string | undefined;
                            }] | undefined;
                        } | undefined;
                    }[] | undefined;
                } | undefined;
            } & {
                id: number;
                date?: Date | undefined;
                date_gmt?: Date | undefined;
                guid?: {
                    rendered?: string | undefined;
                } | undefined;
                modified?: Date | undefined;
                modified_gmt?: Date | undefined;
                slug?: string | undefined;
                status?: string | undefined;
                type?: string | undefined;
                link?: string | undefined;
                title?: {
                    rendered?: string | undefined;
                } | undefined;
                content?: {
                    rendered?: string | undefined;
                    protected?: boolean | undefined;
                } | undefined;
                excerpt?: {
                    rendered?: string | undefined;
                    protected?: boolean | undefined;
                } | undefined;
                yoast_head?: string | undefined;
                yoast_head_json?: {
                    title?: string | undefined;
                    description?: string | undefined;
                    robots?: {
                        index?: "index" | undefined;
                        follow?: "follow" | undefined;
                        'max-snippet'?: "max-snippet?:-1" | undefined;
                        'max-image-preview'?: "max-image-preview?:large" | undefined;
                        'max-video-preview'?: "max-video-preview?:-1" | undefined;
                    } | undefined;
                    canonical?: string | undefined;
                    og_locale?: string | undefined;
                    og_type?: string | undefined;
                    og_title?: string | undefined;
                    og_description?: string | undefined;
                    og_url?: string | undefined;
                    og_site_name?: string | undefined;
                    article_publisher?: string | undefined;
                    article_published_time?: Date | undefined;
                    article_modified_time?: Date | undefined;
                    og_image?: [{
                        width?: number | undefined;
                        height?: number | undefined;
                        url?: string | undefined;
                        type?: string | undefined;
                    }] | undefined;
                    author?: string | undefined;
                    twitter_card?: string | undefined;
                    twitter_creator?: string | undefined;
                    twitter_site?: string | undefined;
                    twitter_misc?: Record<string, string> | undefined;
                } | undefined;
            } & {
                featured_media: number;
                template: string;
                meta: {
                    jetpack_post_was_ever_published: boolean;
                    jetpack_publicize_message: string;
                    jetpack_is_tweetstorm: boolean;
                    jetpack_publicize_feature_enabled: boolean;
                    jetpack_social_post_already_shared: boolean;
                    jetpack_social_options: {
                        image_generator_settings: {
                            template: string;
                            enabled: boolean;
                        };
                    };
                };
                product_cat: [number];
                product_tag: [number];
                jetpack_publicize_connections: [];
                jetpack_sharing_enabled: boolean;
                _links: {
                    self: [{
                        href: string;
                    }];
                    collection: [{
                        href: string;
                    }];
                    about: [{
                        href: string;
                    }];
                    'wp:featuredmedia': [{
                        embeddable: boolean;
                        href: string;
                    }];
                    'wp:attachment': [{
                        href: string;
                    }];
                    'wp:term': {
                        taxonomy: string;
                        embeddable: boolean;
                        href: string;
                    }[];
                    curies: {
                        name: string;
                        href: string;
                        templated: boolean;
                    }[];
                };
            }>;
            searchResults: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            settings: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            tags: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            taxonomies: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            themes: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            users: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
            plugins: import("./src/clients/wordpress.js").WordpressResourceAPI<Record<string, any>>;
        };
        commerce: {
            summarize: (siteUrl: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
        };
    };
    youtube: {
        searchYouTube: import("./src/clients/youtube.js").YoutubeResourceAPI;
        search: (query: string) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
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
