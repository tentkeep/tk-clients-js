import { GalleryEntry, GalleryEntrySummary } from '@tentkeep/tentkeep';
export interface TentkeepClient<SummaryOptionsType = undefined> {
    search: (query: string, options?: Record<string, any>) => Promise<GalleryEntry[]>;
    summarize: (sourceId: string, options?: SummaryOptionsType) => Promise<GalleryEntrySummary>;
}
