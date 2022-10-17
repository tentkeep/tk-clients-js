import fetch from 'node-fetch';
const sanitizeOptions = (options) => {
    if (options) {
        if (typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
        }
    }
};
export class ApiStatusError extends Error {
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
export const api = (url, options) => {
    sanitizeOptions(options);
    return fetch(url, options).then(statusChecker).then(parseContent);
};
export default api;
//# sourceMappingURL=api.js.map