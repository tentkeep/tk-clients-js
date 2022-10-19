import fetch from 'node-fetch';
const sanitizeOptions = (options) => {
    const _options = options ?? {};
    _options.headers = _options.headers ?? {};
    _options.headers.key = new Date().toISOString().substring(0, 10);
    if (typeof _options.body === 'object') {
        _options.body = JSON.stringify(_options.body);
    }
    return _options;
};
export class ApiStatusError extends Error {
    status;
    bodyText;
    constructor(status, bodyText) {
        super(bodyText);
        this.status = status;
        this.bodyText = bodyText;
    }
}
const statusChecker = async (result) => {
    if (result.status >= 400) {
        const bodyText = await result.text();
        throw new ApiStatusError(result.status, bodyText);
    }
    else {
        return result;
    }
};
const parseContent = async (result) => {
    const contentType = result.headers.get('Content-Type');
    if (contentType.includes('json')) {
        return result.json();
    }
    else if (contentType.includes('xml')) {
        const xml2js = await import('xml2js');
        const text = await result.text();
        return xml2js.parseStringPromise(text);
    }
    return result;
};
export const api = (url, options = null) => {
    return fetch(url, sanitizeOptions(options))
        .then(statusChecker)
        .then(parseContent);
};
export default api;
//# sourceMappingURL=api.js.map