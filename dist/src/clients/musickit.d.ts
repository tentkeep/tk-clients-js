import { GalleryEntry } from '@tentkeep/tentkeep';
declare const _default: {
    search: (query: string, options?: Record<string, any> | undefined) => Promise<GalleryEntry[]>;
    summarize: (sourceId: string) => Promise<import("@tentkeep/tentkeep").GalleryEntrySummary>;
    searchArtists: (term: string) => Promise<SearchArtistsResponse>;
    getArtist: (artistId: any) => Promise<any>;
    getArtistAlbums: (artistId: any) => Promise<any>;
    getAlbum: (albumId: any) => Promise<any>;
    getAlbums: (albumIds: any) => Promise<any>;
};
export default _default;
declare type SearchArtistsResponse = {
    results: {
        artists: {
            href: string;
            next: string;
            data: [
                {
                    id: string;
                    type: string;
                    href: string;
                    attributes: {
                        name: string;
                        genreNames: string[];
                        artwork: {
                            width: number;
                            height: number;
                            url: string;
                            bgColor: string;
                            textColor1: string;
                            textColor2: string;
                            textColor3: string;
                            textColor4: string;
                        };
                        url: string;
                    };
                    relationships: {
                        albums: {
                            href: string;
                            data: [
                                {
                                    id: string;
                                    type: string;
                                    href: string;
                                    attributes: {
                                        copyright: string;
                                        genreNames: string[];
                                        releaseDate: string;
                                        upc: string;
                                        isMasteredForItunes: false;
                                        artwork: {
                                            width: number;
                                            height: number;
                                            url: string;
                                            bgColor: string;
                                            textColor1: string;
                                            textColor2: string;
                                            textColor3: string;
                                            textColor4: string;
                                        };
                                        url: string;
                                        playParams: {
                                            id: string;
                                            kind: string;
                                        };
                                        recordLabel: string;
                                        isCompilation: false;
                                        trackCount: number;
                                        isSingle: false;
                                        name: string;
                                        artistName: string;
                                        isComplete: true;
                                    };
                                }
                            ];
                        };
                    };
                }
            ];
        };
    };
    meta: {
        results: {
            order: [string];
            rawOrder: [string];
        };
    };
};
