import { sanitizeUrl } from '../shareable/common.js';
import api, { ApiStatusError } from '../api.js';
import clients from '../../index.js';
import * as jsdom from 'jsdom';
const summary = async (url) => {
    let _url = sanitizeUrl(url);
    const pageSummary = {
        url: _url,
        title: '',
        features: [],
        headers: {},
        allowsIFrame: false,
    };
    const [dom, pageInfo] = await Promise.all([
        jsdom.JSDOM.fromURL(_url),
        info(url),
    ]);
    const page = dom.serialize();
    if (page.length < 100) {
        console.log('[page.summary] Unexpectedly short page:', page);
    }
    const attributeMapper = (m) => Array.from(m.attributes).reduce((acc, cur) => {
        acc[cur.nodeName] = cur.nodeValue;
        return acc;
    }, {});
    const meta = Array.from(dom.window.document.head.querySelectorAll('meta')).map(attributeMapper);
    const links = Array.from(dom.window.document.head.querySelectorAll('link')).map(attributeMapper);
    const title = dom.window.document.head.querySelector('title')?.text ?? '';
    const anchors = Array.from(dom.window.document.body.querySelectorAll('a')).map((a) => a.href);
    const images = [
        ...new Set(page.match(/[^("']*(jpg|jpeg|png)[^)"']*/g)?.map((img) => {
            img = img.split('?')[0] ?? '';
            img = img.replace(/^(\/[^/])/, `${_url}$1`);
            img = img.replace(/^\.(\/[^/])/, `${_url}$1`);
            return img.replace(/^[/]+/, 'https://');
        })),
    ].filter((img) => img.startsWith('http'));
    pageSummary.title =
        meta?.find((m) => m.property === 'og =site_name')?.content ?? title;
    pageSummary.description = findDescription(meta);
    pageSummary.features?.push(...pageInfo.features);
    pageSummary.headers = pageInfo.headers;
    pageSummary.allowsIFrame = pageInfo.allowsIFrame;
    pageSummary.image = findImage(meta, _url);
    pageSummary.images = images;
    pageSummary.icon = findIcon(links, _url);
    pageSummary.platforms = {
        twitter: meta?.find((m) => m.property === 'twitter:site')?.content,
        barn2door: anchors.find((a) => a.includes('app.barn2door')),
    };
    pageSummary.elements = {
        anchors,
        meta,
        links,
        title,
    };
    if (page.match('squarespace.com')) {
        pageSummary.features?.push('squarespace');
    }
    if (page.match('Drupal')) {
        pageSummary.features?.push('drupal');
    }
    if (pageSummary.elements?.meta.find((m) => m.content === 'GrazeCart')) {
        pageSummary.features?.push('grazecart');
    }
    if (pageSummary.platforms?.barn2door) {
        pageSummary.features?.push('barn2door');
    }
    if (page.match('localline')) {
        pageSummary.features?.push('localline');
    }
    for (const platform in pageSummary.platforms) {
        if (!pageSummary.platforms[platform])
            delete pageSummary.platforms[platform];
    }
    return pageSummary;
};
const info = async (url) => {
    let _url = sanitizeUrl(url);
    const site = await api(_url);
    if (!site.ok) {
        throw new ApiStatusError(404, 'Site not found');
    }
    const features = await detectFeatures(_url);
    return {
        allowsIFrame: !site.headers['x-frame-options'],
        headers: site.headers,
        features,
    };
};
export default {
    info,
    summary,
};
async function detectFeatures(_url) {
    const features = [];
    const shopifyPromise = clients.shopify.raw
        .products(_url, 1)
        .then((r) => {
        if (r.products !== undefined)
            features.push('shopify');
    })
        .catch((_e) => { });
    const wordpressPromise = clients.wordpress
        .host(_url)
        .isWordpress()
        .then((r) => {
        if (r)
            features.push('wordpress');
    })
        .catch((_e) => { });
    const wordpressCommercePromise = clients.wordpress
        .host(_url)
        .hasProducts()
        .then((r) => {
        if (r)
            features.push('wordpress-commerce');
    })
        .catch((_e) => { });
    await Promise.allSettled([
        shopifyPromise,
        wordpressPromise,
        wordpressCommercePromise,
    ]);
    return features;
}
function findDescription(meta) {
    return (meta?.find((m) => m.name === 'description')?.content ??
        meta?.find((m) => m.property === 'og:description')?.content);
}
function findImage(meta, webAddress) {
    return (meta?.find((m) => m.property === 'og:image:secure_url')?.content ??
        meta?.find((m) => m.property === 'og:image')?.content ??
        meta?.find((m) => m.property === 'twitter:image')?.content ??
        `https://www.google.com/s2/favicons?sz=128&domain_url=${webAddress}`);
}
function findIcon(links, webAddress) {
    const icon = links?.find((l) => l.rel === 'apple-touch-icon')?.href ??
        links?.find((l) => l.rel === 'icon')?.href;
    if (!icon) {
        return `https://www.google.com/s2/favicons?sz=64&domain_url=${webAddress}`;
    }
    return formatUrl(icon, webAddress);
}
function formatUrl(url, webAddress) {
    if (url?.startsWith('/')) {
        return `${webAddress}${url}`;
    }
    return url;
}
//# sourceMappingURL=page.js.map