import got from 'got';
export const sanitizeOptions = (options) => {
    const _options = options ?? {};
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
const statusChecker = async (response) => {
    if (!response.ok) {
        throw new ApiStatusError(response.statusCode, response.body);
    }
    else {
        return response;
    }
};
const parseContent = async (response) => {
    const contentType = response.headers['Content-Type'];
    if (contentType?.includes('json')) {
        return JSON.parse(response.body);
    }
    else if (contentType?.includes('xml')) {
        const xml2js = await import('xml2js');
        return xml2js.parseStringPromise(response.body);
    }
    return response;
};
export const api = (url, options = null) => {
    return got(url, sanitizeOptions(options))
        .then(statusChecker)
        .then(parseContent);
};
export default api;
//# sourceMappingURL=api.js.map