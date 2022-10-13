declare namespace _default {
    export function favorites(userId: any): any;
    export function listing(listingId: any): any;
    export { listingImages };
    export function userShops(userId: any): any;
    export function searchShops(name: any): any;
    export { getShop };
    export { getShopWithListings };
    export { shopListings };
    export { allShopListings };
    export function shopSummary(shopId: any): Promise<{
        sourceId: any;
        title: any;
        description: any;
        image: any;
        url: any;
        userId: any;
        items: any;
    }>;
}
export default _default;
declare function listingImages(listingId: any): any;
declare function getShop(shopId: any): any;
declare function getShopWithListings(shopId: any): any;
declare function shopListings(shopId: any, page?: number): any;
declare function allShopListings(shopId: any): Promise<any>;
