import api from '../api.js';
const summary = (url) => {
    let _url = url;
    if (!_url.includes('://')) {
        _url = `https://${_url}`;
    }
    return api(_url)
        .then((p) => p.text())
        .then((page) => {
        const meta = page.match(/<meta[^>]+>/g);
        const links = page.match(/<link[^>]+>/g);
        const title = page.match(/<title.*<\/title>/g);
        return {
            meta,
            links,
            title,
        };
    });
};
export default {
    summary,
};
//# sourceMappingURL=page.js.map