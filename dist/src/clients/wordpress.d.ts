import { GalleryEntrySummary } from 'tentkeep';
export declare type WordpressOptions = {
    per_page?: number;
    include?: string;
};
export declare type WordpressResourceAPI = (options: WordpressOptions) => Promise<any>;
export interface WordpressResources {
    blockTypes: WordpressResourceAPI;
    blocks: WordpressResourceAPI;
    blockRevisions: WordpressResourceAPI;
    renderedBlocks: WordpressResourceAPI;
    blockDirectoryItems: WordpressResourceAPI;
    categories: WordpressResourceAPI;
    comments: WordpressResourceAPI;
    media: WordpressResourceAPI;
    pages: WordpressResourceAPI;
    pageRevisions: WordpressResourceAPI;
    posts: WordpressResourceAPI;
    postRevisions: WordpressResourceAPI;
    postStatuses: WordpressResourceAPI;
    postTypes: WordpressResourceAPI;
    searchResults: WordpressResourceAPI;
    settings: WordpressResourceAPI;
    tags: WordpressResourceAPI;
    taxonomies: WordpressResourceAPI;
    themes: WordpressResourceAPI;
    users: WordpressResourceAPI;
    plugins: WordpressResourceAPI;
}
declare const _default: {
    host: (_host: string) => {
        isWordpress(): Promise<boolean>;
        summary(limit?: number): Promise<GalleryEntrySummary>;
        blockTypes: WordpressResourceAPI;
        blocks: WordpressResourceAPI;
        blockRevisions: WordpressResourceAPI;
        renderedBlocks: WordpressResourceAPI;
        blockDirectoryItems: WordpressResourceAPI;
        categories: WordpressResourceAPI;
        comments: WordpressResourceAPI;
        media: WordpressResourceAPI;
        pages: WordpressResourceAPI;
        pageRevisions: WordpressResourceAPI;
        posts: WordpressResourceAPI;
        postRevisions: WordpressResourceAPI;
        postStatuses: WordpressResourceAPI;
        postTypes: WordpressResourceAPI;
        searchResults: WordpressResourceAPI;
        settings: WordpressResourceAPI;
        tags: WordpressResourceAPI;
        taxonomies: WordpressResourceAPI;
        themes: WordpressResourceAPI;
        users: WordpressResourceAPI;
        plugins: WordpressResourceAPI;
    };
};
export default _default;
