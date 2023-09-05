import { GalleryEntry, GalleryEntrySummary } from '@tentkeep/tentkeep';
declare const _default: {
    search: (query: string, options?: Record<string, any> | undefined) => Promise<GalleryEntry[]>;
    summarize: (sourceId: string) => Promise<GalleryEntrySummary>;
    listing: (listingId: any) => Promise<any>;
    listingImages: (listingId: any) => Promise<EtsyListingImagesResponse>;
    searchShops: (name: any) => Promise<ShopSearchResult>;
    getShop: (shopId: any) => Promise<EtsyShop>;
    shopListings: (shopId: any, offset?: number) => Promise<ShopListings>;
    allShopListings: (shopId: any) => Promise<ShopListings>;
};
export default _default;
declare type ShopSearchResult = {
    count: number;
    results: EtsyShop[];
};
declare type EtsyShop = {
    shop_id: number;
    shop_name: string;
    user_id: number;
    create_date: number;
    created_timestamp: number;
    title?: string;
    announcement?: string;
    currency_code: string;
    is_vacation: boolean;
    vacation_message?: string;
    sale_message?: string;
    digital_sale_message?: string;
    update_date: number;
    updated_timestamp: number;
    listing_active_count: number;
    digital_listing_count: number;
    login_name: string;
    accepts_custom_requests: boolean;
    vacation_autoreply?: string;
    url: string;
    image_url_760x100?: string;
    num_favorers: number;
    languages: string[];
    icon_url_fullxfull?: string;
    is_using_structured_policies: boolean;
    has_onboarded_structured_policies: boolean;
    include_dispute_form_link: boolean;
    is_direct_checkout_onboarded: boolean;
    is_etsy_payments_onboarded: boolean;
    is_opted_in_to_buyer_promise: boolean;
    is_calculated_eligible: boolean;
    is_shop_us_based: boolean;
    transaction_sold_count: number;
    shipping_from_country_iso?: string;
    shop_location_country_iso?: string;
    policy_welcome?: string;
    policy_payment?: string;
    policy_shipping?: string;
    policy_refunds?: string;
    policy_additional?: string;
    policy_seller_info?: string;
    policy_update_date: number;
    policy_has_private_receipt_info: boolean;
    has_unstructured_policies: boolean;
    policy_privacy?: string;
    review_average?: string;
    review_count?: string;
};
declare type ShopListings = {
    count: number;
    results: [
        {
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
            shop_section_id?: string;
            featured_rank: number;
            url: string;
            num_favorers: number;
            non_taxable: boolean;
            is_taxable: boolean;
            is_customizable: boolean;
            is_personalizable: boolean;
            personalization_is_required: boolean;
            personalization_char_count_max?: string;
            personalization_instructions?: string;
            listing_type: string;
            tags: string[];
            materials: string[];
            shipping_profile_id: number;
            return_policy_id?: string;
            processing_min: number;
            processing_max: number;
            who_made: string;
            when_made: string;
            is_supply: boolean;
            item_weight?: string;
            item_weight_unit?: string;
            item_length?: string;
            item_width?: string;
            item_height?: string;
            item_dimensions_unit?: string;
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
        }
    ];
};
declare type EtsyListingImagesResponse = {
    count: number;
    results: [
        {
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
            alt_text?: string;
        }
    ];
};
