import { GalleryEntryTypes, } from 'tentkeep';
import { sanitizeUrl } from '../shareable/common.js';
import api from '../api.js';
const raw = {
    products: (url, limit = 250) => api(productsUrl(url, limit)),
    collections: (url) => api(`${sanitizeUrl(url)}/collections.json?limit=250`),
    collectionProducts: (url, collectionHandle) => api(`${sanitizeUrl(url)}/collections/${collectionHandle}/products.json?limit=250`),
};
const productsSummary = async (url, limit = 25) => {
    const products = await raw.products(url, limit);
    const _url = new URL(url);
    const productItems = products.products.map((product) => {
        return {
            sourceId: product.id.toString(),
            title: product.title,
            description: product.body_html.replace(/\s\s\s+/, ' '),
            image: product.images[0]?.src,
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
        sourceId: 'products.json',
        title: 'Products',
        url: productsUrl(url, limit),
        entryType: GalleryEntryTypes.Shopify,
        genericType: 'shop',
        items: productItems,
    };
};
export default {
    raw,
    productsSummary,
};
function productsUrl(url, limit) {
    const _url = new URL(url);
    if (!_url.pathname.endsWith('/products.json')) {
        _url.pathname = '/products.json';
    }
    _url.searchParams.append('limit', limit.toString());
    return _url.toString();
}
//# sourceMappingURL=shopify.js.map