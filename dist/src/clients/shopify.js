import { TagSource, GalleryEntryTypes, } from '@tentkeep/tentkeep';
import { sanitizeUrl } from '../shareable/common.js';
import api from '../api.js';
const raw = {
    products: (url, limit = 250, page = 1) => api(productsUrl(url, limit, page), {
        signal: AbortSignal.timeout(60 * 1000),
    }),
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
            return [
                {
                    sourceId: query,
                    entryType: GalleryEntryTypes.Shopify,
                    genericType: 'shop',
                    title: product?.vendor ?? 'Products',
                    url: productsUrl(query, 0),
                    image: product?.images[0]?.src ??
                        products[1]?.images[0]?.src ??
                        products[2]?.images[0]?.src,
                },
            ];
        }
        catch (err) {
            return [];
        }
    },
    summarize: async (url) => {
        const limit = 250;
        const _url = new URL(url);
        let title = _url.host;
        const items = [];
        let page = 1;
        while (page > 0) {
            await raw.products(url, limit, page).then((response) => {
                page = response.products.length === 0 ? -1 : page + 1;
                title = response.products[0]?.vendor ?? 'Products';
                const mappedItems = response.products.map((product) => mapToGalleryEntryItem(product, url, _url));
                items.push(...mappedItems);
            });
        }
        return {
            sourceId: url,
            title,
            url: productsUrl(url, limit),
            entryType: GalleryEntryTypes.Shopify,
            genericType: 'shop',
            items,
        };
    },
};
export default {
    raw,
    ...contentClient,
};
function productsUrl(url, limit, page = 1) {
    const u = url.startsWith('http') ? url : `https://${url}`;
    const _url = new URL(u);
    if (!_url.pathname.endsWith('/products.json')) {
        _url.pathname = '/products.json';
    }
    if (limit)
        _url.searchParams.append('limit', limit.toString());
    _url.searchParams.append('page', page.toString());
    return _url.toString();
}
function productUrl(url, product) {
    let _url = url;
    if (url.includes('/products.json')) {
        _url = url.split('/products.json')[0];
    }
    return `${sanitizeUrl(_url)}/products/${product.handle}`;
}
const mapToGalleryEntryItem = (product, url, _url) => {
    return {
        sourceId: product.id.toString(),
        title: product.title,
        entryType: GalleryEntryTypes.Shopify,
        genericType: 'shop',
        description: product.body_html?.replace(/\s\s\s+/, ' '),
        images: product.images.map((i) => i.src),
        url: productUrl(url, product),
        date: product.updated_at,
        tags: product.tags.map((_tag) => ({
            label: _tag,
            source: TagSource.Source,
        })),
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
};
//# sourceMappingURL=shopify.js.map