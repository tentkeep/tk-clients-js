declare const _default: (host: string) => {
    Posts: {
        create: (actingUsername: string, payload: CreatePost) => Promise<DiscoursePost>;
    };
    addGroupMembers: (groupId: number, usernames: string[], actingUser: string | 'admin') => Promise<AddGroupMembersResponse>;
    addGroupOwners: (groupId: number, usernames: string[], actingUser: string | 'admin') => Promise<AddGroupMembersResponse>;
    createGroup: (group: Group) => Promise<{
        basic_group: Group;
    }>;
    createInvite: (invite: InviteRequest, fromUsername: string) => Promise<InviteResponse>;
    getPost: (id: number) => Promise<DiscoursePost>;
    getTopic: (topic: number | string, options: {
        actingUsername: string;
        external_id?: true;
    }) => Promise<DiscourseTopic>;
    group: (groupName: string) => Promise<{
        group: Group;
    }>;
    groupMembers: (groupName: string) => Promise<GroupMembers>;
    privateMessage: (fromUsername: string, toUsername: string, subject: string, message: string) => Promise<DiscoursePost>;
    removeGroupMembers: (groupId: number, usernames: string[], actingUser: string | 'admin') => Promise<AddGroupMembersResponse>;
    removeGroupOwnerRole: (groupId: number, usernames: string[], actingUser: string) => Promise<any>;
    replyToTopic: (topicId: number, message: string) => Promise<DiscoursePost>;
    search: (query: string) => Promise<SearchResponse>;
    user: <T extends string | number>(user: T) => Promise<T extends number ? DiscourseUser : DiscourseUserPlus>;
    userEmails: (username: string) => Promise<DiscourseUserEmails>;
};
export default _default;
export type SearchResponse = {
    posts: {
        id: number;
        name: string;
        username: string;
        avatar_template: string;
        created_at: Date;
        like_count: number;
        blurb: string;
        post_number: number;
        topic_id: number;
    }[];
    topics: {
        id: number;
        title: string;
        fancy_title: string;
        slug: string;
        posts_count: number;
        reply_count: number;
        highest_post_number: number;
        created_at: Date;
        last_posted_at: Date;
        bumped: boolean;
        bumped_at: Date;
        archetype: string;
        unseen: boolean;
        pinned: boolean;
        unpinned: null;
        visible: boolean;
        closed: boolean;
        archived: boolean;
        bookmarked: null;
        liked: null;
        tags: [];
        tags_descriptions: {};
        category_id: number;
    }[];
    users: {
        id: number;
        username: string;
        name: string;
        avatar_template: string;
        custom_data: any[];
    }[];
    categories: any[];
    tags: any[];
    groups: Group[];
    grouped_search_result: {
        more_posts: null;
        more_users: null;
        more_categories: null;
        term: string;
        search_log_id: number;
        more_full_page_results: null;
        can_create_topic: boolean;
        error: null;
        post_ids: number[];
        user_ids: number[];
        category_ids: number[];
        tag_ids: number[];
        group_ids: number[];
    };
};
export type DiscourseUser = {
    id: number;
    username: string;
    name: string;
    avatar_template: string;
    active: boolean;
    admin: boolean;
    moderator: boolean;
    last_seen_at: string;
    last_emailed_at: string;
    created_at: string;
    last_seen_age: number;
    last_emailed_age: number;
    created_at_age: number;
    trust_level: number;
    manual_locked_trust_level: string;
    flag_level: number;
    title: string;
    time_read: number;
    staged: boolean;
    days_visited: number;
    posts_read_count: number;
    topics_entered: number;
    post_count: number;
    associated_accounts: [null];
    can_send_activation_email: boolean;
    can_activate: boolean;
    can_deactivate: boolean;
    ip_address: string;
    registration_ip_address: string;
    can_grant_admin: boolean;
    can_revoke_admin: boolean;
    can_grant_moderation: boolean;
    can_revoke_moderation: boolean;
    can_impersonate: boolean;
    like_count: number;
    like_given_count: number;
    topic_count: number;
    flags_given_count: number;
    flags_received_count: number;
    private_topics_count: number;
    can_delete_all_posts: boolean;
    can_be_deleted: boolean;
    can_be_anonymized: boolean;
    can_be_merged: boolean;
    full_suspend_reason: string;
    silence_reason: string;
    post_edits_count: number;
    primary_group_id: string;
    badge_count: number;
    warnings_received_count: number;
    bounce_score: number;
    reset_bounce_score_after: string;
    can_view_action_logs: boolean;
    can_disable_second_factor: boolean;
    can_delete_sso_record: boolean;
    api_key_count: number;
    single_sign_on_record: string;
    approved_by: {
        id: number;
        username: string;
        name: string;
        avatar_template: string;
    };
    suspended_by: string;
    silenced_by: string;
    penalty_counts: {
        silenced: number;
        suspended: number;
    };
    next_penalty: string;
    tl3_requirements: any;
    groups: Group[];
    external_ids: any;
};
export type DiscourseUserMini = {
    id: number;
    username: string;
    name: string;
    avatar_template: string;
};
export type DiscourseUserEmails = {
    email: string;
    secondary_emails: string[];
    unconfirmed_emails: string[];
    associated_accounts?: {
        name: string;
        description: string;
    }[];
};
export type DiscourseUserPlus = {
    user_badges: any[];
    badges: any[];
    badge_types: any[];
    users: {
        id: number;
        username: string;
        name?: string;
        avatar_template?: string;
        flair_name?: string;
        admin: boolean;
        moderator: boolean;
        trust_level: number;
    }[];
    user: DiscourseUser & {
        group_users: {
            group_id: number;
            user_id: number;
            notification_level: number;
        }[];
        user_option: any;
    };
};
export type Group = {
    id?: number;
    name: string;
    full_name?: string;
    bio_raw?: string;
    usernames?: string;
    owner_usernames?: string;
    automatic_membership_email_domains?: string;
    visibility_level?: GroupVisibility;
    messageable_level?: MessageableLevel;
    members_visibility_level?: GroupVisibility;
    primary_group?: boolean;
    flair_icon?: string;
    flair_upload_id?: 0;
    flair_bg_color?: string;
    public_admission?: boolean;
    public_exit?: boolean;
    default_notification_level?: 0;
    muted_category_ids?: number[];
    regular_category_ids?: number[];
    watching_category_ids?: number[];
    tracking_category_ids?: number[];
    watching_first_post_category_ids?: number[];
};
export declare enum GroupVisibility {
    Everyone = 0,
    LoggedOnUser = 1,
    OwnersMembersModerators = 2,
    OwnersModerators = 3,
    Owners = 4
}
export declare enum MessageableLevel {
    Nobody = 0,
    Admins = 1,
    AdminsModerators = 2,
    AdminsModeratorsMembers = 3,
    AdminsModeratorsOwners = 4,
    Everyone = 99
}
export type GroupMembers = {
    members: UserMember[];
    owners: UserMember[];
    meta: {
        total: number;
        limit: number;
        offset: number;
    };
};
export type UserMember = {
    id: number;
    username?: string;
    name?: string;
    avatar_template?: string;
    title?: string;
    last_posted_at?: string;
    last_seen_at?: string;
    added_at?: string;
    timezone?: string;
};
export type AddGroupMembersResponse = {
    success: 'OK' | string;
    usernames: string[];
    emails: string[];
};
export type DiscoursePost = {
    id: number;
    name?: string;
    username?: string;
    avatar_template?: string;
    created_at?: Date;
    cooked?: string;
    post_number?: number;
    post_type?: number;
    updated_at?: Date;
    reply_count?: number;
    reply_to_post_number?: null;
    quote_count?: number;
    incoming_link_count?: number;
    reads?: number;
    readers_count?: number;
    score?: number;
    yours?: boolean;
    topic_id: number;
    topic_slug?: string;
    display_username?: null;
    primary_group_name?: null;
    flair_name?: null;
    flair_url?: string;
    flair_bg_color?: string;
    flair_color?: string;
    version?: number;
    can_edit?: boolean;
    can_delete?: boolean;
    can_recover?: boolean;
    can_wiki?: boolean;
    user_title?: string;
    bookmarked?: boolean;
    raw?: string;
    moderator?: boolean;
    admin?: boolean;
    staff?: boolean;
    user_id?: number;
    draft_sequence?: number;
    hidden?: boolean;
    trust_level?: number;
    deleted_at?: string;
    user_deleted?: boolean;
    edit_reason?: string;
    can_view_edit_history?: boolean;
    wiki?: boolean;
    reviewable_id?: null;
    reviewable_score_count?: number;
    reviewable_score_pending_count?: number;
};
export type InviteRequest = {
    skip_email?: boolean;
    custom_message?: string;
    max_redemptions_allowed?: number;
    group_ids?: string;
    group_names?: string;
};
export type InviteResponse = {
    id: number;
    invite_key: string;
    link: string;
    domain: any;
    can_delete_invite: boolean;
    max_redemptions_allowed: number;
    redemption_count: number;
    created_at: Date;
    updated_at: Date;
    expires_at: Date;
    expired: boolean;
    topics: any[];
    groups: Group[];
};
export type DiscourseTopic = {
    post_stream: {
        posts: DiscoursePost[];
        stream: number[];
    };
    timeline_lookup: number[][];
    suggested_topics: {
        id: number;
        title: string;
        fancy_title: string;
        slug: string;
        posts_count: number;
        reply_count: number;
        highest_post_number: number;
        image_url: string;
        created_at: Date;
        last_posted_at: Date;
        bumped: boolean;
        bumped_at: Date;
        archetype: string;
        unseen: boolean;
        last_read_post_number: number;
        unread: number;
        new_posts: number;
        unread_posts: number;
        pinned: boolean;
        unpinned: null;
        visible: boolean;
        closed: boolean;
        archived: boolean;
        notification_level: number;
        bookmarked: boolean;
        liked: boolean;
        tags: [];
        tags_descriptions: {};
        like_count: number;
        views: number;
        category_id: number;
        featured_link: null;
        posters: {
            extras: string;
            description: string;
            user: DiscourseUserMini;
        }[];
    }[];
    tags: [];
    tags_descriptions: {};
    id: number;
    title: string;
    fancy_title: string;
    posts_count: number;
    created_at: Date;
    views: number;
    reply_count: number;
    like_count: number;
    last_posted_at: Date;
    visible: boolean;
    closed: boolean;
    archived: boolean;
    has_summary: boolean;
    archetype: string;
    slug: string;
    category_id: number;
    word_count: number;
    deleted_at: null;
    user_id: -1;
    featured_link: null;
    pinned_globally: boolean;
    pinned_at: null;
    pinned_until: null;
    image_url: null;
    slow_mode_seconds: number;
    draft: null;
    draft_key: string;
    draft_sequence: number;
    posted: boolean;
    unpinned: null;
    pinned: boolean;
    current_post_number: number;
    highest_post_number: number;
    last_read_post_number: number;
    last_read_post_id: number;
    deleted_by: null;
    has_deleted: boolean;
    actions_summary: [
        {
            id: number;
            count: number;
            hidden: boolean;
            can_act: boolean;
        }
    ];
    chunk_size: number;
    bookmarked: boolean;
    bookmarks: [];
    topic_timer: null;
    message_bus_last_id: number;
    participant_count: number;
    show_read_indicator: boolean;
    thumbnails: null;
    slow_mode_enabled_until: null;
    summarizable: boolean;
    details: {
        can_edit: boolean;
        notification_level: number;
        notifications_reason_id: null;
        can_move_posts: boolean;
        can_remove_allowed_users: boolean;
        can_create_post: boolean;
        can_reply_as_new_topic: boolean;
        can_flag_topic: boolean;
        can_convert_topic: boolean;
        can_review_topic: boolean;
        can_close_topic: boolean;
        can_archive_topic: boolean;
        can_split_merge_topic: boolean;
        can_edit_staff_notes: boolean;
        can_toggle_topic_visibility: boolean;
        can_pin_unpin_topic: boolean;
        can_moderate_category: boolean;
        can_remove_self_id: number;
        participants: Partial<DiscourseUser>;
        created_by: DiscourseUserMini;
        last_poster: DiscourseUserMini;
    };
};
type CreatePost = {
    title: string;
    raw: string;
    target_recipients: string;
    archetype?: 'private_message';
    external_id?: string;
} | {
    raw: string;
    topic_id: number;
    title?: string;
    target_recipients?: string;
    archetype?: 'private_message';
    external_id?: string;
};
