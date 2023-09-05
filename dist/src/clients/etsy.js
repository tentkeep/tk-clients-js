import { GalleryEntryTypes, } from '@tentkeep/tentkeep';
import { api } from '../api.js';
const host = 'https://openapi.etsy.com/v3';
const getShop = (shopId) => etsy(`${host}/application/shops/${shopId}`);
const shopListings = (shopId, offset = 0) => etsy(`${host}/application/shops/${shopId}/listings/active?limit=100&offset=${offset}&includes=Images(url_170x135,url_570xN)`);
const allShopListings = async (shopId) => {
    let offset = 0;
    let total = 1;
    const allListings = [];
    while (offset < total && offset < 501) {
        const response = await shopListings(shopId, offset);
        total = response.count;
        const listings = await getListingsWith(response.results.map((l) => l.listing_id), ['Images']);
        allListings.push(...listings.results);
        offset += 100;
        console.log('Etsy product offset', offset);
    }
    return allListings;
};
const getListingsWith = (listingIds, includes) => etsy(`${host}/application/listings/batch?listing_ids=${listingIds.join(',')}&includes=${includes.join(',')}`);
const listingImages = (listingId) => etsy(`${host}/application/listings/${listingId}/images`);
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
        const shop = await getShop(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }
        let listings = await allShopListings(shopId);
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
            items: listings.map((l) => ({
                sourceId: l.listing_id.toString(),
                entryType: GalleryEntryTypes.Etsy,
                genericType: 'shop',
                title: l.title,
                description: l.description,
                images: l.images?.map((i) => i.url_570xN),
                url: l.url,
                date: fromEpoch(l.last_modified_timestamp),
                detail: {
                    price: l.price,
                    tags: (l.tags || []).join('||'),
                    views: l.views,
                    customizable: l.is_customizable,
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
    shopListings,
    allShopListings,
    getListingsWith,
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