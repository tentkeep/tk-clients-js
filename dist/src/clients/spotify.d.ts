declare const _default: {
    searchArtists: (query: any) => any;
    searchPlaylists: (query: any) => any;
    searchPodcasts: (query: any) => Promise<ShowsSearchResults>;
    userPlaylists: (userId: any) => any;
    playlist: (playlistId: any) => any;
    playlistTracks: (playlistId: any) => any;
};
export default _default;
type ShowsSearchResults = {
    shows: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: null;
        total: number;
        items: {
            copyrights: [];
            description: string;
            html_description: string;
            explicit: false;
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            images: {
                height: number;
                url: string;
                width: number;
            }[];
            is_externally_hosted: false;
            languages: string[];
            media_type: 'audio';
            name: string;
            publisher: string;
            type: 'show';
            uri: string;
            total_episodes: number;
        }[];
    };
};
