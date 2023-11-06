import { GalleryEntry } from '@tentkeep/tentkeep';
export type ShopifyProduct = {
    id: number;
    title: string;
    handle: string;
    body_html: string;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    vendor: string;
    product_type: string;
    tags: string[];
    variants: {
        id: number;
        title: string;
        option1: string | null;
        option2: string | null;
        option3: string | null;
        sku: string;
        requires_shipping: boolean;
        taxable: boolean;
        featured_image: string | null;
        available: boolean;
        price: string;
        grams: number;
        compare_at_price: any;
        position: number;
        product_id: number;
        created_at: Date;
        updated_at: Date;
    }[];
    images: [
        {
            id: number;
            created_at: Date;
            position: number;
            updated_at: Date;
            product_id: number;
            variant_ids: number[];
            src: string;
            width: number;
            height: number;
        }
    ];
    options: {
        name: string;
        position: number;
        values: string[];
    }[];
};
declare const _default: {
    search: (query: string, options?: Record<string, any> | undefined) => Promise<GalleryEntry[]>;
    summarize: (sourceId: string, options?: {
        limit: number;
    } | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
    raw: {
        products: (url: string, limit?: number, page?: number) => Promise<{
            products: ShopifyProduct[];
        }>;
        collections: (url: string) => Promise<any>;
        collectionProducts: (url: string, collectionHandle: string) => Promise<any>;
    };
};
export default _default;
