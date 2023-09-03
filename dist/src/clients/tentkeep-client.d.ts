import { GalleryEntry, GalleryEntrySummary } from '@tentkeep/tentkeep';
export interface TentkeepClient {
    search: (query: string, options?: Record<string, any>) => Promise<GalleryEntry[]>;
    summarize: (sourceId: string) => Promise<GalleryEntrySummary>;
}
