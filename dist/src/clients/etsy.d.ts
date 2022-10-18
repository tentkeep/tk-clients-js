declare const _default: {
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
export default _default;
