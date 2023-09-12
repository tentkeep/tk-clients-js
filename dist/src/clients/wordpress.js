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
        const url = new URL(`${_url}/wp-json/wp/v2/${resource}/${id}`);
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
        async summary(limit = 100) {
            const posts = await resources.posts({ per_page: limit });
            const authorRefs = [];
            const categoryRefs = [];
            const tagRefs = [];
            posts.forEach((p) => {
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
                    title: extractPostTitle(post),
                    description: extractPostDescription(post),
                    entryType: GalleryEntryTypes.Wordpress,
                    genericType: 'page',
                    images: [extractImageLink(post)],
                    url: post.link,
                    date: new Date(post.date),
                    postId: post.id,
                    postDate: post.date,
                    author: extractPostAuthor(post),
                    tags: extractPostTags(post, categories, tags),
                })),
            };
        },
    };
};
export default {
    search: async (query) => {
        try {
            const posts = await resourceMethods(query).posts({
                per_page: 1,
            });
            const post = posts[0];
            if (!post)
                throw new Error('no content');
            return {
                sourceId: query,
                entryType: GalleryEntryTypes.Wordpress,
                genericType: 'page',
                title: post?.yoast_head_json?.og_site_name || query,
                url: query,
                image: extractImageLink(post),
            };
        }
        catch (err) {
            return [];
        }
    },
    summarize: (siteUrl) => host(siteUrl).summary(),
    host,
};
const toFunctionName = (resource) => resource.replace(/-(.)/, (_, d) => d.toUpperCase());
function extractPostTitle(post) {
    return (post.yoast_head_json?.title ||
        post.yoast_head_json?.og_title ||
        post.title?.rendered);
}
function extractPostDescription(post) {
    return (post.yoast_head_json?.description ||
        post.yoast_head_json?.og_description ||
        post.excerpt?.rendered);
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