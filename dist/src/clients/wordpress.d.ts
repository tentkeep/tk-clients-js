import { GalleryEntrySummary } from '@tentkeep/tentkeep';
import { TentkeepClient } from './tentkeep-client.js';
export type WordpressOptions = {
    per_page?: number;
    page?: number;
    include?: string;
    _embed?: string;
};
export type WordpressResourceAPI<T = Record<string, any>> = (options: WordpressOptions) => Promise<T[]>;
export interface WordpressResources {
    blockTypes: WordpressResourceAPI;
    blocks: WordpressResourceAPI;
    blockRevisions: WordpressResourceAPI;
    renderedBlocks: WordpressResourceAPI;
    blockDirectoryItems: WordpressResourceAPI;
    categories: WordpressResourceAPI;
    comments: WordpressResourceAPI;
    media: WordpressResourceAPI;
    pages: WordpressResourceAPI;
    pageRevisions: WordpressResourceAPI;
    posts: WordpressResourceAPI<WordpressPost>;
    postRevisions: WordpressResourceAPI;
    postStatuses: WordpressResourceAPI;
    postTypes: WordpressResourceAPI;
    product: WordpressResourceAPI<WordpressProduct>;
    searchResults: WordpressResourceAPI;
    settings: WordpressResourceAPI;
    tags: WordpressResourceAPI;
    taxonomies: WordpressResourceAPI;
    themes: WordpressResourceAPI;
    users: WordpressResourceAPI;
    plugins: WordpressResourceAPI;
}
declare const host: (_host: string) => {
    isWordpress(): Promise<boolean>;
    hasProducts(): Promise<boolean>;
    summary(limit?: number): Promise<GalleryEntrySummary>;
    blockTypes: WordpressResourceAPI;
    blocks: WordpressResourceAPI;
    blockRevisions: WordpressResourceAPI;
    renderedBlocks: WordpressResourceAPI;
    blockDirectoryItems: WordpressResourceAPI;
    categories: WordpressResourceAPI;
    comments: WordpressResourceAPI;
    media: WordpressResourceAPI;
    pages: WordpressResourceAPI;
    pageRevisions: WordpressResourceAPI;
    posts: WordpressResourceAPI<WordpressPost>;
    postRevisions: WordpressResourceAPI;
    postStatuses: WordpressResourceAPI;
    postTypes: WordpressResourceAPI;
    product: WordpressResourceAPI<WordpressProduct>;
    searchResults: WordpressResourceAPI;
    settings: WordpressResourceAPI;
    tags: WordpressResourceAPI;
    taxonomies: WordpressResourceAPI;
    themes: WordpressResourceAPI;
    users: WordpressResourceAPI;
    plugins: WordpressResourceAPI;
};
declare const commerce: {
    summarize: (siteUrl: string) => Promise<GalleryEntrySummary>;
};
declare const _default: TentkeepClient<undefined> & {
    host: typeof host;
    commerce: typeof commerce;
};
export default _default;
type WordpressBase = WordpressEmbed & {
    id: number;
    date?: Date;
    date_gmt?: Date;
    guid?: {
        rendered?: string;
    };
    modified?: Date;
    modified_gmt?: Date;
    slug?: string;
    status?: string;
    type?: string;
    link?: string;
    title?: {
        rendered?: string;
    };
    content?: {
        rendered?: string;
        protected?: boolean;
    };
    excerpt?: {
        rendered?: string;
        protected?: boolean;
    };
    yoast_head?: string;
    yoast_head_json?: Yoast;
};
type WordpressPost = WordpressBase & {
    author?: number;
    featured_media?: number;
    comment_status?: string;
    ping_status?: string;
    sticky?: boolean;
    template?: string;
    format?: string;
    meta?: {
        _mo_disable_npp?: '';
        'disable-jtr'?: false;
        _genesis_hide_title?: false;
        _genesis_hide_breadcrumbs?: false;
        _genesis_hide_singular_image?: false;
        _genesis_hide_footer_widgets?: false;
        _genesis_custom_body_class?: '';
        _genesis_custom_post_class?: '';
        _genesis_layout?: '';
    };
    categories?: number[];
    tags?: any[];
    acf?: any[];
    featured_image_urls?: {
        full?: WordpressFeaturedImage;
        thumbnail?: WordpressFeaturedImage;
        medium?: WordpressFeaturedImage;
        medium_large?: WordpressFeaturedImage;
        large?: WordpressFeaturedImage;
        '1536x1536'?: WordpressFeaturedImage;
        '2048x2048'?: WordpressFeaturedImage;
        'featured-thumb'?: WordpressFeaturedImage;
    };
    post_excerpt_stackable?: string;
    category_list?: string;
    author_info?: {
        name?: string;
        url?: string;
    };
    comments_num?: string;
};
type WordpressFeaturedImage = [
    url?: string,
    height?: number,
    width?: number,
    unknown_field?: boolean
];
type MediaDetailSize = {
    file: string;
    width: number;
    height: number;
    uncropped: boolean;
    mime_type: string;
    source_url: string;
};
type WordpressMedia = {
    id: number;
    date?: Date;
    slug?: string;
    type?: string;
    link?: string;
    title?: {
        rendered?: string;
    };
    author?: number;
    jetpack_sharing_enabled?: boolean;
    jetpack_shortlink?: string;
    caption?: {
        rendered?: string;
    };
    alt_text?: string;
    media_type?: string;
    mime_type?: string;
    media_details?: {
        width?: number;
        height?: number;
        file?: string;
        sizes?: {
            woocommerce_thumbnail?: MediaDetailSize;
            woocommerce_gallery_thumbnail?: MediaDetailSize;
            woocommerce_single?: MediaDetailSize;
            thumbnail?: MediaDetailSize;
            medium?: MediaDetailSize;
            medium_large?: MediaDetailSize;
            large?: MediaDetailSize;
            shop_catalog?: MediaDetailSize;
            shop_single?: MediaDetailSize;
            shop_thumbnail?: MediaDetailSize;
            full?: MediaDetailSize;
        };
        image_meta?: {
            aperture?: string;
            credit?: string;
            camera?: string;
            caption?: string;
            created_timestamp?: string;
            copyright?: string;
            focal_length?: string;
            iso?: string;
            shutter_speed?: string;
            title?: string;
            orientation?: string;
            keywords?: string[];
        };
    };
    source_url?: string;
    _links?: {
        self?: [{
            href?: string;
        }];
        collection?: [{
            href?: string;
        }];
        about?: [{
            href?: string;
        }];
        author?: [{
            embeddable?: boolean;
            href?: string;
        }];
        replies?: [{
            embeddable?: boolean;
            href?: string;
        }];
    };
};
type WordpressEmbed = {
    _embedded?: {
        'wp:featuredmedia'?: WordpressMedia[];
    };
};
type Yoast = {
    title?: string;
    description?: string;
    robots?: {
        index?: 'index';
        follow?: 'follow';
        'max-snippet'?: 'max-snippet?:-1';
        'max-image-preview'?: 'max-image-preview?:large';
        'max-video-preview'?: 'max-video-preview?:-1';
    };
    canonical?: string;
    og_locale?: string;
    og_type?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_site_name?: string;
    article_publisher?: string;
    article_published_time?: Date;
    article_modified_time?: Date;
    og_image?: [
        {
            width?: number;
            height?: number;
            url?: string;
            type?: string;
        }
    ];
    author?: string;
    twitter_card?: string;
    twitter_creator?: string;
    twitter_site?: string;
    twitter_misc?: Record<string, string>;
};
type WordpressProduct = WordpressBase & {
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
};
