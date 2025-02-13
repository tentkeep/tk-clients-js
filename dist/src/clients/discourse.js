import { api } from '../api.js';
export default (host) => ({
    Groups: Groups(host),
    Posts: Posts(host),
    addGroupMembers: (groupId, usernames, actingUser) => discourse(`${host}/groups/${groupId}/members.json`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Api-Username': actingUser === 'admin' ? undefined : actingUser,
        },
        body: { usernames: usernames.join(',') },
    }),
    addGroupOwners: (groupId, usernames, actingUser) => discourse(`${host}/groups/${groupId}/owners.json`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Api-Username': actingUser === 'admin' ? undefined : actingUser,
        },
        body: { usernames: usernames.join(',') },
    }),
    createGroup: (group) => discourse(`${host}/admin/groups.json`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { group },
    }),
    createInvite: (invite, fromUsername) => discourse(`${host}/invites.json`, {
        method: 'post',
        headers: {
            'Api-Username': fromUsername,
            'Content-Type': 'application/json',
        },
        body: invite,
    }),
    getTopic: (topic, options) => discourse(`${host}/t/${options?.external_id ? 'external_id/' : ''}${topic}${options.latestPosts ? '/last' : ''}.json`, {
        headers: {
            'Api-Username': options?.actingUsername,
            'Content-Type': 'application/json',
        },
    }),
    group: (groupName) => discourse(`${host}/groups/${groupName}.json`),
    groupMembers: (groupName) => discourse(`${host}/groups/${groupName}/members.json`),
    groupPrivateMessages: (username, groupName) => discourse(`${host}/topics/private-messages-group/${username}/${groupName}.json`, {
        headers: {
            'Api-Username': username,
        },
    }),
    privateMessage: (fromUsername, toUsername, subject, message, options) => discourse(`${host}/posts.json`, {
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
            ...options,
        },
    }),
    getPrivateMessages: (username, options) => discourse(`${host}/topics/private-messages/${username}.json?page=${(options?.page ?? 1) - 1}`, {
        headers: {
            'Api-Username': username,
        },
    }),
    removeGroupMembers: (groupId, usernames, actingUser) => discourse(`${host}/groups/${groupId}/members.json`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Api-Username': actingUser === 'admin' ? undefined : actingUser,
        },
        body: { usernames: usernames.join(',') },
    }),
    removeGroupOwnerRole: (groupId, usernames, actingUser) => discourse(`${host}/admin/groups/${groupId}/owners.json`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Api-Username': actingUser === 'admin' ? undefined : actingUser,
        },
        body: {
            group: {
                usernames: usernames.join(','),
            },
        },
    }),
    replyToTopic: (topicId, message) => discourse(`${host}/groups/posts.json`, {
        method: 'post',
        body: {
            topic_id: topicId,
            raw: message,
        },
    }),
    runDataQuery: (queryId, input, options) => discourse(`${host}/admin/plugins/explorer/queries/${queryId}/run`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': 'bmjaw8mku2ZqNT86ezTVeJueCqPR3_1ql1Na1I6OjZPLK2WTvlYQykXAnNnIAfWu5oucw3psMDJy6iYwahtI6A',
        },
        body: { params: JSON.stringify(input) },
    }).then((res) => mapDataQuery(res, options)),
    search: (query) => discourse(`${host}/search/query?term=${query}`, {
        headers: { Accept: 'application/json' },
    }),
    user: (user, actingUsername) => {
        const headers = {
            'Api-Username': actingUsername ?? '_fail_',
            Accept: 'application/json',
        };
        return typeof user === 'string'
            ? discourse(`${host}/u/${user}.json`, { headers })
            : actingUsername === 'system'
                ? discourse(`${host}/admin/users/${user}.json`)
                : Promise.reject(new Error('This is an admin operation'));
    },
    userEmails: (username) => discourse(`${host}/u/${username}/emails.json`),
});
const Groups = (host) => ({
    join: (groupId, actingUsername) => discourse(`${host}/groups/${groupId}/join.json`, {
        method: 'put',
        headers: {
            'Api-Username': actingUsername ?? '_fail_',
        },
    }),
    leave: (groupId, actingUsername) => discourse(`${host}/groups/${groupId}/leave.json`, {
        method: 'delete',
        headers: {
            'Api-Username': actingUsername ?? '_fail_',
        },
    }),
});
const Posts = (host) => ({
    create: (actingUsername, payload) => discourse(`${host}/posts`, {
        method: 'post',
        headers: {
            'Api-Username': actingUsername ?? '_fail_',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: payload,
    }),
    get: (id, actingUsername) => discourse(`${host}/posts/${id}.json`, {
        headers: {
            Accept: 'application/json',
            'Api-Username': actingUsername ?? '_fail_',
        },
    }),
    find: (topicId, ids, actingUsername) => discourse(`${host}/t/${topicId}/posts.json?${ids
        .map((id) => `post_ids[]=${id}`)
        .join('&')}`, {
        headers: {
            Accept: 'application/json',
            'Api-Username': actingUsername ?? '_fail_',
        },
    }),
});
const discourse = (url, options = null) => {
    const apiKey = process.env.DISCOURSE_KEY;
    const apiUsername = process.env.DISCOURSE_ADMIN_USERNAME;
    const _options = options ?? {};
    _options.headers = {
        ...options?.headers,
        'Api-Key': apiKey,
    };
    if (!_options.headers?.['Api-Username']) {
        _options.headers['Api-Username'] = apiUsername;
    }
    const _url = url instanceof URL ? url : new URL(url);
    return api(_url, _options);
};
const mapDataQuery = (payload, options) => {
    return {
        data: payload.rows.map((row) => {
            const obj = {};
            for (let index = 0; index < payload.columns.length; index++) {
                const key = payload.columns[index];
                if (key)
                    obj[key] = options?.jsonKeys?.includes(key)
                        ? JSON.parse(row[index])
                        : row[index];
            }
            return obj;
        }),
    };
};
export var GroupVisibility;
(function (GroupVisibility) {
    GroupVisibility[GroupVisibility["Everyone"] = 0] = "Everyone";
    GroupVisibility[GroupVisibility["LoggedOnUser"] = 1] = "LoggedOnUser";
    GroupVisibility[GroupVisibility["OwnersMembersModerators"] = 2] = "OwnersMembersModerators";
    GroupVisibility[GroupVisibility["OwnersModerators"] = 3] = "OwnersModerators";
    GroupVisibility[GroupVisibility["Owners"] = 4] = "Owners";
})(GroupVisibility = GroupVisibility || (GroupVisibility = {}));
export var MessageableLevel;
(function (MessageableLevel) {
    MessageableLevel[MessageableLevel["Nobody"] = 0] = "Nobody";
    MessageableLevel[MessageableLevel["Admins"] = 1] = "Admins";
    MessageableLevel[MessageableLevel["AdminsModerators"] = 2] = "AdminsModerators";
    MessageableLevel[MessageableLevel["AdminsModeratorsMembers"] = 3] = "AdminsModeratorsMembers";
    MessageableLevel[MessageableLevel["AdminsModeratorsOwners"] = 4] = "AdminsModeratorsOwners";
    MessageableLevel[MessageableLevel["Everyone"] = 99] = "Everyone";
})(MessageableLevel = MessageableLevel || (MessageableLevel = {}));
//# sourceMappingURL=discourse.js.map