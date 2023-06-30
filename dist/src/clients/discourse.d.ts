declare const _default: (host: string) => {
    groupMembers: (groupName: string) => Promise<GroupMembers>;
    privateMessage: (fromUsername: string, toUsername: string, subject: string, message: string) => Promise<any>;
    search: (query: string) => Promise<SearchResponse>;
    users: (userId: number) => Promise<any>;
};
export default _default;
export declare type SearchResponse = {
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
    groups: any[];
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
export declare type GroupMembers = {
    members: UserMember[];
    owners: UserMember[];
    meta: {
        total: number;
        limit: number;
        offset: number;
    };
};
export declare type UserMember = {
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
