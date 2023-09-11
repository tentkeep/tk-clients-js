import X2JS from 'x2js';
import { sanitizeUrl } from '../shareable/common.js';
import api, { ApiStatusError } from '../api.js';
import clients from '../../index.js';
import * as jsdom from 'jsdom';
const summary = async (url) => {
    let _url = sanitizeUrl(url);
    const page = await captureUrl(_url);
    if (page.length < 100) {
        console.log('[page.summary] Unexpectedly short page:', page);
    }
    const x2js = new X2JS({
        ignoreRoot: true,
        attributePrefix: '',
    });
    const xmlParser = (xml) => x2js.xml2js(xml);
    const meta = page.match(/<meta[^>]+>/g)?.map(xmlParser);
    const links = page.match(/<link[^>]+>/g)?.map(xmlParser);
    const title = page.match(/<title.*<\/title>/g)?.map(xmlParser);
    const images = [
        ...new Set(page.match(/[^("']*(jpg|jpeg|png)[^)"']*/g)?.map((img) => {
            img = img.split('?')[0] ?? '';
            img = img.replace(/^(\/[^/])/, `${_url}$1`);
            img = img.replace(/^\.(\/[^/])/, `${_url}$1`);
            return img.replace(/^[/]+/, 'https://');
        })),
    ].filter((img) => img.startsWith('http'));
    return {
        url: _url,
        title: meta?.find((m) => m.property === 'og:site_name')?.content ??
            title?.[title.length - 1]['__text'],
        description: findDescription(meta),
        image: findImage(meta, _url),
        images,
        icon: findIcon(links, _url),
        twitter: meta?.find((m) => m.property === 'twitter:site')?.content,
        elements: {
            meta,
            links,
            title,
        },
    };
};
const info = async (url) => {
    let _url = sanitizeUrl(url);
    const site = await api(_url);
    if (!site.ok) {
        throw new ApiStatusError(404, 'Site not found');
    }
    let features = [];
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
    await Promise.allSettled([shopifyPromise, wordpressPromise]);
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
async function captureUrl(url) {
    const dom = await jsdom.JSDOM.fromURL(url);
    const html = dom.serialize();
    return html;
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