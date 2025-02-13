export * as Discourse from './src/clients/discourse.js';
export declare const clients: {
    discourse: (host: string) => {
        Groups: {
            join: (groupId: number, actingUsername: string) => Promise<undefined>;
            leave: (groupId: number, actingUsername: string) => Promise<undefined>;
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
            get: (id: number, actingUsername: string) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
            find: (topicId: number, ids: number[], actingUsername: string) => Promise<import("./src/clients/discourse.js").DiscoursePost[]>;
        };
        addGroupMembers: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        addGroupOwners: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        createGroup: (group: import("./src/clients/discourse.js").Group) => Promise<{
            basic_group: import("./src/clients/discourse.js").Group;
        }>;
        createInvite: (invite: import("./src/clients/discourse.js").InviteRequest, fromUsername: string) => Promise<import("./src/clients/discourse.js").InviteResponse>;
        getTopic: (topic: string | number, options: {
            actingUsername: string;
            external_id?: boolean | undefined;
            latestPosts?: boolean | undefined;
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
        privateMessage: (fromUsername: string, toUsername: string, subject: string, message: string, options?: {
            external_id?: string | undefined;
        } | undefined) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
        getPrivateMessages: (username: string, options?: {
            page?: number | undefined;
        } | undefined) => Promise<{
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
        removeGroupMembers: (groupId: number, usernames: string[], actingUser: string) => Promise<import("./src/clients/discourse.js").AddGroupMembersResponse>;
        removeGroupOwnerRole: (groupId: number, usernames: string[], actingUser: string) => Promise<any>;
        replyToTopic: (topicId: number, message: string) => Promise<import("./src/clients/discourse.js").DiscoursePost>;
        runDataQuery: (queryId: number, input: Record<string, any>, options?: {
            jsonKeys?: string[] | undefined;
        } | undefined) => Promise<{
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
        searchPodcasts: (query: any, options?: {
            limit: number;
        } | undefined) => Promise<{
            shows: {
                href: string;
                limit: number;
                next: string;
                offset: number;
                previous: null;
                total: number;
                items: {
                    copyrights: [];
                    description: string;
                    html_description: string;
                    explicit: false;
                    external_urls: {
                        spotify: string;
                    };
                    href: string;
                    id: string;
                    images: {
                        height: number;
                        url: string;
                        width: number;
                    }[];
                    is_externally_hosted: false;
                    languages: string[];
                    media_type: "audio";
                    name: string;
                    publisher: string;
                    type: "show";
                    uri: string;
                    total_episodes: number;
                }[];
            };
        }>;
        userPlaylists: (userId: any) => any;
        playlist: (playlistId: any) => any;
        playlistTracks: (playlistId: any) => any;
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
            readonly type?: import("@tentkeep/tentkeep").EntityType.Entry | undefined;
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
