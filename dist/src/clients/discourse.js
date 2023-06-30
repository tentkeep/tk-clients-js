import { api } from '../api.js';
export default (host) => ({
    groupMembers: (groupName) => discourse(`${host}/groups/${groupName}/members.json`),
    privateMessage: (fromUsername, toUsername, subject, message) => discourse(`${host}/posts.json`, {
        method: 'post',
        headers: {
            'Api-Username': fromUsername,
            'Content-Type': 'application/json',
        },
        body: {
            title: subject,
            raw: message,
            target_recipients: toUsername,
            archetype: 'private_message',
        },
    }),
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
    };
    if (!_options.headers['Api-Username']) {
        _options.headers['Api-Username'] = apiUsername;
    }
    const _url = url instanceof URL ? url : new URL(url);
    return api(_url, _options);
};
//# sourceMappingURL=discourse.js.map