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
  createInvite: (invite: InviteRequest, fromUsername: string) =>
    discourse(`${host}/invites.json`, {
      method: 'post',
      headers: {
        'Api-Username': fromUsername,
        'Content-Type': 'application/json',
      },
      body: invite,
    }) as Promise<InviteResponse>,
  group: (groupName: string) =>
    discourse(`${host}/groups/${groupName}.json`) as Promise<{ group: Group }>,
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
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Api-Username': actingUser === 'admin' ? undefined : actingUser,
      },
      body: { usernames: usernames.join(',') },
    }) as Promise<AddGroupMembersResponse>,
  removeGroupOwnerRole: (
    groupId: number,
    usernames: string[],
    actingUser: string,
  ) =>
    discourse(`${host}/admin/groups/${groupId}/owners.json`, {
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
  user: <T extends number | string>(
    user: T,
  ): Promise<T extends number ? DiscourseUser : DiscourseUserPlus> => {
    return typeof user === 'number'
      ? discourse(`${host}/admin/users/${user}.json`)
      : discourse(`${host}/u/${user}.json`)
  },
  userEmails: (username: string): Promise<DiscourseUserEmails> =>
    discourse(`${host}/u/${username}/emails.json`),
})

const discourse: API = (url: string | URL, options = null) => {
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
  groups: Group[]
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

export type DiscourseUser = {
  id: number
  username: string
  name: string
  avatar_template: string
  active: boolean
  admin: boolean
  moderator: boolean
  last_seen_at: string
  last_emailed_at: string
  created_at: string
  last_seen_age: number
  last_emailed_age: number
  created_at_age: number
  trust_level: number
  manual_locked_trust_level: string
  flag_level: number
  title: string
  time_read: number
  staged: boolean
  days_visited: number
  posts_read_count: number
  topics_entered: number
  post_count: number
  associated_accounts: [null]
  can_send_activation_email: boolean
  can_activate: boolean
  can_deactivate: boolean
  ip_address: string
  registration_ip_address: string
  can_grant_admin: boolean
  can_revoke_admin: boolean
  can_grant_moderation: boolean
  can_revoke_moderation: boolean
  can_impersonate: boolean
  like_count: number
  like_given_count: number
  topic_count: number
  flags_given_count: number
  flags_received_count: number
  private_topics_count: number
  can_delete_all_posts: boolean
  can_be_deleted: boolean
  can_be_anonymized: boolean
  can_be_merged: boolean
  full_suspend_reason: string
  silence_reason: string
  post_edits_count: number
  primary_group_id: string
  badge_count: number
  warnings_received_count: number
  bounce_score: number
  reset_bounce_score_after: string
  can_view_action_logs: boolean
  can_disable_second_factor: boolean
  can_delete_sso_record: boolean
  api_key_count: number
  single_sign_on_record: string
  approved_by: {
    id: number
    username: string
    name: string
    avatar_template: string
  }
  suspended_by: string
  silenced_by: string
  penalty_counts: {
    silenced: number
    suspended: number
  }
  next_penalty: string
  tl3_requirements: any
  groups: Group[]
  external_ids: any
}

export type DiscourseUserEmails = {
  email: string
  secondary_emails: string[]
  unconfirmed_emails: string[]
  associated_accounts?: {
    name: string
    description: string
  }[]
}

export type DiscourseUserPlus = {
  user_badges: any[]
  badges: any[]
  badge_types: any[]
  users: {
    id: number
    username: string
    name?: string
    avatar_template?: string
    flair_name?: string
    admin: boolean
    moderator: boolean
    trust_level: number
  }[]
  user: DiscourseUser & {
    group_users: {
      group_id: number
      user_id: number
      notification_level: number
    }[]
    user_option: any
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

export type InviteRequest = {
  skip_email?: boolean
  custom_message?: string
  max_redemptions_allowed?: number
  group_ids?: string
  group_names?: string
}
export type InviteResponse = {
  id: number
  invite_key: string
  link: string
  domain: any
  can_delete_invite: boolean
  max_redemptions_allowed: number
  redemption_count: number
  created_at: Date
  updated_at: Date
  expires_at: Date
  expired: boolean
  topics: any[]
  groups: Group[]
}
