import { GalleryEntryTypes, } from '@tentkeep/tentkeep';
import { sanitizeUrl } from '../shareable/common.js';
import api from '../api.js';
const raw = {
    products: (url, limit = 250) => api(productsUrl(url, limit)),
    collections: (url) => api(`${sanitizeUrl(url)}/collections.json?limit=250`),
    collectionProducts: (url, collectionHandle) => api(`${sanitizeUrl(url)}/collections/${collectionHandle}/products.json?limit=250`),
};
const contentClient = {
    search: async (query) => {
        try {
            const { products } = await raw.products(query, 3);
            const product = products[0];
            if (!product)
                throw new Error('no products');
            console.log('SSS', product.images);
            return {
                sourceId: query,
                entryType: GalleryEntryTypes.Shopify,
                genericType: 'shop',
                title: product?.vendor ?? 'Products',
                url: productsUrl(query, 0),
                image: product?.images[0]?.src ??
                    products[1]?.images[0]?.src ??
                    products[2]?.images[0]?.src,
            };
        }
        catch (err) {
            return [];
        }
    },
    summarize: async (url, limit = 25) => {
        const products = await raw.products(url, limit);
        const _url = new URL(url);
        const productItems = products.products.map((product) => {
            return {
                sourceId: product.id.toString(),
                title: product.title,
                description: product.body_html?.replace(/\s\s\s+/, ' '),
                images: product.images.map((i) => i.src),
                url: `${sanitizeUrl(url)}/products/${product.handle}`,
                date: product.updated_at,
                detail: {
                    variants: product.variants.map((variant) => {
                        return {
                            id: `${_url.hostname}-${product.id}-${variant.id}`,
                            sourceId: `${variant.id}`,
                            title: variant.title,
                            url: `${sanitizeUrl(url)}/products/${product.handle}?variant=${variant.id}`,
                            date: variant.updated_at,
                            price: parseFloat(variant.price),
                            available: variant.available,
                        };
                    }),
                },
            };
        });
        return {
            sourceId: url,
            title: products.products[0]?.vendor ?? 'Products',
            url: productsUrl(url, limit),
            entryType: GalleryEntryTypes.Shopify,
            genericType: 'shop',
            items: productItems,
        };
    },
};
export default {
    raw,
    ...contentClient,
};
function productsUrl(url, limit) {
    const u = url.startsWith('http') ? url : `https://${url}`;
    const _url = new URL(u);
    if (!_url.pathname.endsWith('/products.json')) {
        _url.pathname = '/products.json';
    }
    if (limit)
        _url.searchParams.append('limit', limit.toString());
    return _url.toString();
}
//# sourceMappingURL=shopify.js.map