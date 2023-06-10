import { api } from '../api.js';
export default (host) => ({
    search: (query) => discourse(`${host}/search/query?term=${query}`, {
        headers: { Accept: 'application/json' },
    }),
    users: (userId) => discourse(`${host}/admin/users/${userId}.json`),
});
const discourse = (url, options = null) => {
    const apiKey = process.env.DISCOURSE_KEY;
    const apiUsername = process.env.DISCOURSE_ADMIN_USERNAME;
    const _options = options ?? {};
    _options.headers = {
        ...options?.headers,
        'Api-Key': apiKey,
        'Api-Username': apiUsername,
    };
    const _url = url instanceof URL ? url : new URL(url);
    return api(_url, _options);
};
//# sourceMappingURL=discourse.js.map