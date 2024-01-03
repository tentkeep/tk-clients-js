import { GalleryEntryTypes, } from '@tentkeep/tentkeep';
import { api } from '../api.js';
import { forKey, sanitizeUrl } from '../shareable/common.js';
import { GalleryEntryItemTagSource } from '@tentkeep/tentkeep';
const resources = [
    'block-types',
    'blocks',
    'block-revisions',
    'rendered-blocks',
    'block-directory-items',
    'categories',
    'comments',
    'media',
    'pages',
    'page-revisions',
    'posts',
    'post-revisions',
    'post-statuses',
    'post-types',
    'product',
    'search-results',
    'settings',
    'tags',
    'taxonomies',
    'themes',
    'users',
    'plugins',
];
const resourceMethods = (site) => resources.reduce((wordpress, resource) => {
    wordpress[toFunctionName(resource)] = (options) => {
        const id = typeof options === 'string' ? options : '';
        const _url = site.startsWith('http') ? site : `https://${site}`;
        const url = new URL(_url);
        url.pathname += `/wp-json/wp/v2/${resource}/${id}`;
        if (typeof options === 'object') {
            forKey(options, (k) => url.searchParams.append(k, options[k]));
        }
        return api(url);
    };
    return wordpress;
}, {});
const host = (_host) => {
    const url = sanitizeUrl(_host);
    const resources = resourceMethods(url);
    return {
        ...resources,
        async isWordpress() {
            return resources
                .posts({ per_page: 1 })
                .then((posts) => posts.length === 1)
                .catch((_err) => false);
        },
        hasProducts() {
            return resources
                .product({ per_page: 1 })
                .then((posts) => posts.length === 1)
                .catch((_err) => false);
        },
        async summary(limit = 100) {
            const posts = await resources.posts({ per_page: limit });
            const authorRefs = [];
            const categoryRefs = [];
            const tagRefs = [];
            posts.forEach((p) => {
                if (p.author)
                    authorRefs.push(p.author);
                categoryRefs.push(...(p.categories || []));
                tagRefs.push(...(p.tags || []));
            });
            const categoriesPromise = resources
                .categories({
                per_page: 100,
                include: categoryRefs.join(','),
            })
                .catch((e) => {
                console.error('Failed to fetch Wordpress categories', url, e.message);
                return [];
            });
            const tagsPromise = resources
                .tags({
                per_page: 100,
                include: tagRefs.join(','),
            })
                .catch((e) => {
                console.error('Failed to fetch Wordpress tags', url, e.message);
                return [];
            });
            let categories = [], tags = [];
            try {
                const [_categories, _tags] = await Promise.all([
                    categoriesPromise,
                    tagsPromise,
                ]);
                categories = _categories;
                tags = _tags;
            }
            catch (err) {
                console.error('Failed to fetch Wordpress categories or tags', err);
            }
            return {
                sourceId: url,
                title: posts[0]?.yoast_head_json?.og_site_name || url,
                url: url,
                items: posts.map((post) => ({
                    sourceId: post.id.toString(),
                    title: extractTitle(post),
                    description: extractDescription(post),
                    entryType: GalleryEntryTypes.Wordpress,
                    genericType: 'page',
                    images: [extractImageLink(post)],
                    url: post.link,
                    date: post.date ? new Date(post.date) : undefined,
                    postId: post.id,
                    postDate: post.date,
                    author: extractPostAuthor(post),
                    tags: extractPostTags(post, categories, tags),
                })),
            };
        },
    };
};
const commerce = {
    summarize: async (siteUrl) => {
        const url = sanitizeUrl(siteUrl);
        function mapProduct(product) {
            const image = extractProductImage(product);
            return {
                entryType: GalleryEntryTypes.WordpressCommerce,
                genericType: 'shop',
                sourceId: product.id.toString(),
                title: extractTitle(product),
                url: product.link ?? '',
                description: extractDescription(product),
                images: image ? [image] : [],
                detail: {
                    variants: [],
                },
            };
        }
        const post = (await host(url).posts({ per_page: 1 }))[0];
        const productOptions = { per_page: 100, _embed: 'wp:featuredmedia' };
        const products = await host(url)
            .product(productOptions)
            .then((products) => products.map(mapProduct));
        let page = products.length <= 100 ? -1 : 2;
        while (page > 0) {
            const _products = await host(url).product(productOptions);
            products.push(..._products.map(mapProduct));
            page = _products.length <= 100 ? -1 : 2;
        }
        return {
            sourceId: url,
            title: post?.yoast_head_json?.og_site_name || url,
            url: url,
            entryType: GalleryEntryTypes.WordpressCommerce,
            genericType: 'shop',
            items: products,
        };
    },
};
export default {
    search: async (query) => {
        try {
            const url = sanitizeUrl(query);
            const results = [];
            const postsPromise = resourceMethods(url)
                .posts({
                per_page: 1,
            })
                .then((posts) => {
                const post = posts[0];
                if (!post)
                    return;
                results.push({
                    sourceId: url,
                    entryType: GalleryEntryTypes.Wordpress,
                    genericType: 'page',
                    title: (post?.yoast_head_json?.og_site_name || new URL(url).hostname) +
                        ' - Posts',
                    url: url,
                    image: extractImageLink(post),
                });
            });
            const productsPromise = resourceMethods(url)
                .product({
                per_page: 1,
                _embed: 'wp:featuredmedia',
            })
                .then((products) => {
                const product = products[0];
                if (!product)
                    return;
                const _url = new URL(url);
                _url.searchParams.append('post_type', 'product');
                results.push({
                    sourceId: _url.toString(),
                    entryType: GalleryEntryTypes.WordpressCommerce,
                    genericType: 'shop',
                    title: (product?.yoast_head_json?.og_site_name ||
                        new URL(url).hostname) + ' - Products',
                    url: _url.toString(),
                    image: extractProductImage(product),
                });
            });
            await Promise.all([postsPromise, productsPromise]);
            return results;
        }
        catch (err) {
            return [];
        }
    },
    summarize: (siteUrl) => host(siteUrl).summary(),
    commerce,
    host,
};
const toFunctionName = (resource) => resource.replace(/-(.)/, (_, d) => d.toUpperCase());
function extractProductImage(product) {
    const imageSizes = product?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
    const image = imageSizes?.medium_large?.source_url ??
        imageSizes?.large?.source_url ??
        imageSizes?.full?.source_url;
    return image;
}
function extractTitle(resource) {
    return (resource.yoast_head_json?.title ||
        resource.yoast_head_json?.og_title ||
        resource.title?.rendered).replace('&#8217;', `'`);
}
function extractDescription(resource) {
    return (resource.yoast_head_json?.description ||
        resource.yoast_head_json?.og_description ||
        resource.excerpt?.rendered);
}
function extractImageLink(post) {
    return (post.yoast_head_json?.og_image?.[0].url ||
        post.featured_image_urls?.full?.[0] ||
        post.featured_image_urls?.medium?.[0] ||
        post.featured_image_urls?.large?.[0] ||
        (post.content?.rendered?.match(/img[^>]*src=\\?"(.+?)\\?"/) || [])[1]);
}
function extractPostAuthor(post) {
    return post.yoast_head_json?.author || post.author_info?.name || '';
}
function extractPostTags(post, categories, wTags) {
    let tags = {};
    post.categories?.forEach((c) => {
        const tag = categories
            .find((cat) => cat.id === c)
            ?.name?.toLowerCase();
        if (tag)
            tags[tag] = GalleryEntryItemTagSource.Source;
    });
    post.tags?.forEach((t) => {
        const tag = wTags
            .find((tag) => tag.id === t)
            ?.name?.toLowerCase();
        if (tag)
            tags[tag] = GalleryEntryItemTagSource.Source;
    });
    return tags;
}
//# sourceMappingURL=wordpress.js.map