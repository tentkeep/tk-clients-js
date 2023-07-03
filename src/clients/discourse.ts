import { API, api } from '../api.js'

export default (host: string) => ({
  addGroupMembers: (
    groupId: number,
    usernames: string[],
    actingUser: string | 'admin',
  ) =>
    discourse(`${host}/groups/${groupId}/members.json`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Api-Username': actingUser === 'admin' ? undefined : actingUser,
      },
      body: { usernames: usernames.join(',') },
    }) as Promise<AddGroupMembersResponse>,
  addGroupOwners: (
    groupId: number,
    usernames: string[],
    actingUser: string | 'admin',
  ) =>
    discourse(`${host}/groups/${groupId}/owners.json`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Api-Username': actingUser === 'admin' ? undefined : actingUser,
      },
      body: { usernames: usernames.join(',') },
    }) as Promise<AddGroupMembersResponse>,
  createGroup: (group: Group) =>
    discourse(`${host}/admin/groups.json`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { group },
    }) as Promise<{ basic_group: Group }>,
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
    }) as Promise<NewPostResponse>,
  removeGroupMembers: (
    groupId: number,
    usernames: string[],
    actingUser: string | 'admin',
  ) =>
    discourse(`${host}/groups/${groupId}/members.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Api-Username': actingUser === 'admin' ? undefined : actingUser,
      },
      body: { usernames: usernames.join(',') },
    }) as Promise<AddGroupMembersResponse>,
  replyToTopic: (topicId: number, message: string) =>
    discourse(`${host}/groups/posts.json`, {
      method: 'post',
      body: {
        topic_id: topicId,
        raw: message,
      },
    }) as Promise<NewPostResponse>,
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

export type Group = {
  id?: number
  name: string
  full_name?: string
  bio_raw?: string
  usernames?: string
  owner_usernames?: string
  automatic_membership_email_domains?: string
  visibility_level?: GroupVisibility
  messageable_level?: MessageableLevel
  members_visibility_level?: GroupVisibility
  primary_group?: boolean
  flair_icon?: string
  flair_upload_id?: 0
  flair_bg_color?: string
  public_admission?: boolean
  public_exit?: boolean
  default_notification_level?: 0
  muted_category_ids?: number[]
  regular_category_ids?: number[]
  watching_category_ids?: number[]
  tracking_category_ids?: number[]
  watching_first_post_category_ids?: number[]
}
export enum GroupVisibility {
  Everyone = 0,
  LoggedOnUser = 1,
  OwnersMembersModerators = 2,
  OwnersModerators = 3,
  Owners = 4,
}
export enum MessageableLevel {
  Nobody = 0,
  Admins = 1,
  AdminsModerators = 2,
  AdminsModeratorsMembers = 3,
  AdminsModeratorsOwners = 4,
  Everyone = 99,
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
export type AddGroupMembersResponse = {
  success: 'OK' | string
  usernames: string[]
  emails: string[]
}

export type NewPostResponse = {
  id: number
  name?: string
  username?: string
  avatar_template?: string
  created_at?: Date
  cooked?: string
  post_number?: number
  post_type?: number
  updated_at?: Date
  reply_count?: number
  reply_to_post_number?: null
  quote_count?: number
  incoming_link_count?: number
  reads?: number
  readers_count?: number
  score?: number
  yours?: boolean
  topic_id: number
  topic_slug?: string
  display_username?: null
  primary_group_name?: null
  flair_name?: null
  flair_url?: string
  flair_bg_color?: string
  flair_color?: string
  version?: number
  can_edit?: boolean
  can_delete?: boolean
  can_recover?: boolean
  can_wiki?: boolean
  user_title?: string
  bookmarked?: boolean
  raw?: string
  moderator?: boolean
  admin?: boolean
  staff?: boolean
  user_id?: number
  draft_sequence?: number
  hidden?: boolean
  trust_level?: number
  deleted_at?: string
  user_deleted?: boolean
  edit_reason?: string
  can_view_edit_history?: boolean
  wiki?: boolean
  reviewable_id?: null
  reviewable_score_count?: number
  reviewable_score_pending_count?: number
}
