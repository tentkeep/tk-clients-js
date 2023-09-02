import { GalleryEntry, GalleryEntrySummary } from '@tentkeep/tentkeep';
declare const _default: {
    search: (query: string, options?: Record<string, any> | undefined) => Promise<GalleryEntry>;
    summarize: (sourceId: string) => Promise<GalleryEntrySummary>;
    podcasts: (query: any) => Promise<PodcastSearchResult>;
};
export default _default;
declare type PodcastSearchResult = {
    resultCount: number;
    results: [
        {
            wrapperType: 'track';
            kind: 'podcast';
            collectionId: number;
            trackId: number;
            artistName: string;
            collectionName: string;
            trackName: string;
            collectionCensoredName: string;
            trackCensoredName: string;
            collectionViewUrl: string;
            feedUrl: string;
            trackViewUrl: string;
            artworkUrl30: string;
            artworkUrl60: string;
            artworkUrl100: string;
            collectionPrice: number;
            trackPrice: number;
            collectionHdPrice: number;
            releaseDate: string;
            collectionExplicitness: 'notExplicit';
            trackExplicitness: 'cleaned';
            trackCount: number;
            trackTimeMillis: number;
            country: string;
            currency: string;
            primaryGenreName: string;
            contentAdvisoryRating: 'Clean';
            artworkUrl600: string;
            genreIds: string[];
            genres: string[];
        }
    ];
};
