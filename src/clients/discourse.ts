import { API, api } from '../api.js'

export default (host: string) => ({
  groupMembers: (groupName: string) =>
    discourse(
      `${host}/groups/${groupName}/members.json`,
    ) as Promise<GroupMembers>,
  privateMessage: (
    fromUsername: string,
    toUsername: string,
    subject: string,
    message: string,
  ) =>
    discourse(`${host}/posts.json`, {
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
  search: (query: string) =>
    discourse(`${host}/search/query?term=${query}`, {
      headers: { Accept: 'application/json' },
    }) as Promise<SearchResponse>,
  users: (userId: number) => discourse(`${host}/admin/users/${userId}.json`),
})

const discourse: API = (url, options = null) => {
  const apiKey = process.env.DISCOURSE_KEY
  const apiUsername = process.env.DISCOURSE_ADMIN_USERNAME
  const _options = options ?? {}
  _options.headers = {
    ...options?.headers,
    'Api-Key': apiKey,
  }
  if (!_options.headers['Api-Username']) {
    _options.headers['Api-Username'] = apiUsername
  }
  const _url = url instanceof URL ? url : new URL(url)
  return api(_url, _options)
}

export type SearchResponse = {
  posts: {
    id: number
    name: string
    username: string
    avatar_template: string
    created_at: Date
    like_count: number
    blurb: string
    post_number: number
    topic_id: number
  }[]
  topics: {
    id: number
    title: string
    fancy_title: string
    slug: string
    posts_count: number
    reply_count: number
    highest_post_number: number
    created_at: Date
    last_posted_at: Date
    bumped: boolean
    bumped_at: Date
    archetype: string
    unseen: boolean
    pinned: boolean
    unpinned: null
    visible: boolean
    closed: boolean
    archived: boolean
    bookmarked: null
    liked: null
    tags: []
    tags_descriptions: {}
    category_id: number
  }[]
  users: {
    id: number
    username: string
    name: string
    avatar_template: string
    custom_data: any[]
  }[]
  categories: any[]
  tags: any[]
  groups: any[]
  grouped_search_result: {
    more_posts: null
    more_users: null
    more_categories: null
    term: string
    search_log_id: number
    more_full_page_results: null
    can_create_topic: boolean
    error: null
    post_ids: number[]
    user_ids: number[]
    category_ids: number[]
    tag_ids: number[]
    group_ids: number[]
  }
}

export type GroupMembers = {
  members: UserMember[]
  owners: UserMember[]
  meta: {
    total: number
    limit: number
    offset: number
  }
}
export type UserMember = {
  id: number
  username?: string
  name?: string
  avatar_template?: string
  title?: string
  last_posted_at?: string
  last_seen_at?: string
  added_at?: string
  timezone?: string
}
