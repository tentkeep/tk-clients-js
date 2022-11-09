import { GalleryEntryTypes, } from '../../index.js';
import { sanitizeUrl } from '../shareable/common.js';
import api from '../api.js';
const raw = {
    products: (url, limit = 250) => api(productsUrl(url, limit)),
    collections: (url) => api(`${sanitizeUrl(url)}/collections.json?limit=250`),
    collectionProducts: (url, collectionHandle) => api(`${sanitizeUrl(url)}/collections/${collectionHandle}/products.json?limit=250`),
};
const productsSummary = async (url, limit = 25) => {
    const products = await raw.products(url, limit);
    const productItems = products.products.map((product) => {
        return {
            sourceId: product.id.toString(),
            title: productSummaryTitle(product),
            description: product.body_html,
            image: product.images[0]?.src,
            url: `${sanitizeUrl(url)}/products/${product.handle}`,
            date: product.updated_at,
            variants: product.variants.map((variant) => {
                return {
                    sourceId: `${variant.id}`,
                    title: variant.title,
                    url: `${sanitizeUrl(url)}/products/${product.handle}?variant=${variant.id}`,
                    date: variant.updated_at,
                    price: parseFloat(variant.price),
                    available: variant.available,
                };
            }),
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
    return `${sanitizeUrl(url)}/products.json?limit=${limit}`;
}
function productSummaryTitle(product) {
    return (product.title +
        (product.variants.length > 1 ? ` - ${product.variants[0]?.title}` : ''));
}
//# sourceMappingURL=shopify.js.map