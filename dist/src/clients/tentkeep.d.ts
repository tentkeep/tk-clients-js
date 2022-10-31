import { DataDomain } from '../types/tentkeep-types.js';
import { Gallery, GalleryEntry, GalleryEntryGenericTypes, GalleryEntryItem, GalleryEntryPlace, GalleryEntrySeed, GalleryEntrySummary, PageSummary } from '../../index.js';
import { PageInfo, ProductItem } from '../../index.js';
declare const _default: (dataDomain: DataDomain) => {
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
    updateGallery: (token: string, gallery: Gallery & {
        id: number;
    }) => Promise<Gallery>;
    saveGalleryEntry: (token: string, galleryId: number, seed: GalleryEntrySeed) => Promise<GalleryEntry>;
    saveUserItemActivity: (token: string, itemActivity: any) => Promise<any>;
    searchEtsyShops: (query: string) => Promise<any>;
    searchMusicArtists: (query: string) => Promise<any>;
};
export default _default;
