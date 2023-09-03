import { GalleryEntryTypes, } from '@tentkeep/tentkeep';
import { api } from '../api.js';
import { tryGet } from '../shareable/common.js';
const host = 'https://openapi.etsy.com/v3';
const getShop = (shopId) => etsy(`${host}/application/shops/${shopId}`);
const getShopWithListings = (shopId) => etsy(`${host}/application/shops/${shopId}?includes=Listings:200/Images(url_170x135,url_570xN)`);
const shopListings = (shopId, page = 1) => etsy(`${host}/application/shops/${shopId}/listings/active?limit=100&includes=Images(url_170x135,url_570xN)&page=${page}`);
const allShopListings = async (shopId) => {
    const listings = await shopListings(shopId);
    let nextPage = listings.pagination.next_page;
    while (nextPage) {
        const next = await shopListings(shopId, nextPage);
        listings.results.push(...next.results);
        nextPage = next.pagination.next_page;
        console.log(nextPage);
    }
    return listings;
};
const listingImages = (listingId) => etsy(`${host}/v2/listings/${listingId}/images`);
const searchShops = (name) => etsy(`${host}/application/shops?shop_name=${name}`);
const contentClient = {
    search: async (query) => {
        return searchShops(query).then((response) => {
            return response.results.map((shop) => ({
                sourceId: shop.shop_id.toString(),
                entryType: GalleryEntryTypes.Etsy,
                genericType: 'shop',
                title: shop.shop_name,
                description: shop.title,
                image: shop.icon_url_fullxfull,
                url: shop.url,
            }));
        });
    },
    summarize: async (shopId) => {
        const shop = (await getShop(shopId)).results[0];
        if (!shop) {
            throw new Error('Shop not found');
        }
        const listings = await allShopListings(shopId);
        const fromEpoch = (epochSeconds) => {
            var d = new Date(0);
            d.setUTCSeconds(epochSeconds);
            return d;
        };
        return {
            sourceId: shopId,
            title: shop.shop_name,
            description: shop.title,
            image: shop.icon_url_fullxfull,
            url: shop.url,
            userId: shop.user_id,
            items: listings.results.map((l) => ({
                sourceId: l.listing_id,
                entryType: GalleryEntryTypes.Etsy,
                genericType: 'shop',
                title: l.title,
                description: l.description,
                image: tryGet(() => l.Images[0].url_570xN),
                images: l.Images,
                url: l.url,
                date: fromEpoch(l.last_modified_tsz),
                detail: {
                    price: l.price,
                    currency: l.currency_code,
                    tags: (l.tags || []).join('||'),
                    views: l.views,
                    customizable: l.is_customizable,
                    digital: l.is_digital,
                },
            })),
        };
    },
};
export default {
    listing: (listingId) => etsy(`${host}/v2/listings/${listingId}`),
    listingImages,
    searchShops,
    getShop,
    getShopWithListings,
    shopListings,
    allShopListings,
    ...contentClient,
};
const etsy = (url, options = null) => {
    const apiKey = process.env.CLIENTS_ETSY_API_KEY;
    const _url = url instanceof URL ? url : new URL(url);
    const _options = options ?? {};
    _options.headers = _options.headers ?? {};
    if (apiKey) {
        _options.headers['x-api-key'] = apiKey;
    }
    return api(_url, _options);
};
//# sourceMappingURL=etsy.js.map