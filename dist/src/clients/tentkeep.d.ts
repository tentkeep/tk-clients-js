import { Place, ProductItem } from '../../index.js';
export declare type Gallery = {
    id?: number;
    title: string;
    created_by?: number;
    tiny_image?: string;
};
export declare type GalleryEntry = {
    id?: number;
    gallery_id: number;
    created_by?: number;
    entry_type: 'etsy' | 'music' | 'podcast' | 'wordpress' | 'youtube';
    generic_type: 'shop' | 'music' | 'podcast' | 'page' | 'video';
    source_id: string;
    title: string;
    description?: string;
    image?: string;
    url: string;
    detail?: any;
};
export declare type GalleryEntryItem = {
    id?: number;
    gallery_entry_id: number;
    created_by?: number;
    entry_type: 'etsy' | 'music' | 'podcast' | 'wordpress' | 'youtube';
    generic_type: 'shop' | 'music' | 'podcast' | 'page' | 'video';
    source_id: string;
    title: string;
    description?: string;
    image?: string;
    url: string;
    detail?: any;
    date?: Date;
    tokens?: string[];
};
export declare type GalleryEntrySeedEtsy = {
    entryType: 'etsy';
    details: {
        shopId: any;
    };
};
export declare type GalleryEntrySeedMusic = {
    entryType: 'music';
    details: {
        artistId: string;
    };
};
export declare type GalleryEntrySeedPodcast = {
    entryType: 'podcast';
    details: {
        feedUrl: string;
    };
};
export declare type GalleryEntrySeedWordpress = {
    entryType: 'wordpress';
    details: {
        url: string;
    };
};
export declare type GalleryEntrySeedYoutube = {
    entryType: 'youtube';
    details: {
        username?: string;
        channelId?: string;
    };
};
export declare type GalleryEntrySeed = GalleryEntrySeedEtsy | GalleryEntrySeedMusic | GalleryEntrySeedPodcast | GalleryEntrySeedWordpress | GalleryEntrySeedYoutube;
export declare enum DataDomain {
    Christian = 1,
    Bootroots = 2
}
declare const _default: (dataDomain: DataDomain) => {
    exchangeAccessCode: (code: any) => Promise<any>;
    getPageInfo: (url: string) => Promise<any>;
    getPageSummary: (url: string) => Promise<any>;
    getPlaces: (query: string) => Promise<Place[]>;
    getPlaceDetail: (sourceId: string) => Promise<Place>;
    getPodcastSummary: (feedUrl: string) => Promise<any>;
    getShopifyProductsSummary: (url: string, limit?: number) => Promise<ProductItem[]>;
    getGalleries: () => Promise<Gallery[]>;
    getGallery: (galleryId: number) => Promise<Gallery>;
    getRecentlyAddedGalleryEntryItems: () => Promise<any>;
    getGalleriesForUser: (token: string) => Promise<any>;
    getGalleryImageUrl: (galleryId: number) => string;
    getGalleryEntries: (galleryId: number) => Promise<any>;
    getGalleryUserRole: (token: string, galleryId: number) => Promise<any>;
    saveGallery: (token: string, gallery: Gallery) => Promise<any>;
    saveGalleryImage: (token: string, galleryId: number, image: any) => Promise<any>;
    saveGalleryEntry: (token: string, galleryId: number, seed: GalleryEntrySeed) => Promise<any>;
    saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
    searchEtsyShops: (query: string) => Promise<any>;
    searchMusicArtists: (query: string) => Promise<any>;
};
export default _default;
