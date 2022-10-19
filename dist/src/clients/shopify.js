import { sanitizeUrl } from '../shareable/common.js';
import api from '../api.js';
const raw = {
    products: (url, limit = 250) => api(`${sanitizeUrl(url)}/products.json?limit=${limit}`),
    collections: (url) => api(`${sanitizeUrl(url)}/collections.json?limit=250`),
    collectionProducts: (url, collectionHandle) => api(`${sanitizeUrl(url)}/collections/${collectionHandle}/products.json?limit=250`),
};
const productsSummary = async (url, limit = 25) => {
    const products = await raw.products(url, limit);
    return products.products.map((product) => ({
        sourceId: product.id.toString(),
        title: productSummaryTitle(product),
        description: product.body_html,
        url: `${sanitizeUrl(url)}/products/${product.handle}`,
        image: product.images[0]?.src,
        price: product.variants[0]?.price,
    }));
};
export default {
    raw,
    productsSummary,
};
function productSummaryTitle(product) {
    return (product.title +
        (product.variants.length > 1 ? ` - ${product.variants[0]?.title}` : ''));
}
//# sourceMappingURL=shopify.js.map