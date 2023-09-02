import { GalleryEntrySummary } from '@tentkeep/tentkeep';
declare const _default: {
    search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry>;
    summarize: (sourceId: string) => Promise<GalleryEntrySummary>;
    feed: (feedUrl: any) => Promise<any>;
};
export default _default;
