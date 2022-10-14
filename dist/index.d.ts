export declare const clients: {
    etsy: {
        favorites: (userId: any) => any;
        listing: (listingId: any) => any;
        listingImages: (listingId: any) => any;
        userShops: (userId: any) => any;
        searchShops: (name: any) => any;
        getShop: (shopId: any) => any;
        getShopWithListings: (shopId: any) => any;
        shopListings: (shopId: any, page?: number) => any;
        allShopListings: (shopId: any) => Promise<any>;
        shopSummary: (shopId: any) => Promise<{
            sourceId: any;
            title: any;
            description: any;
            image: any;
            url: any;
            userId: any;
            items: any;
        }>;
    };
    google: {
        places: {
            search: (query: string) => any;
            details: (placeId: string) => any;
        };
    };
    itunes: {
        podcasts: (query: any) => any;
    };
    musickit: {
        searchArtists: (term: any) => any;
        getArtist: (artistId: any) => any;
        getArtistAlbums: (artistId: any) => any;
        getAlbum: (albumId: any) => any;
        getAlbums: (albumIds: any) => any;
        artistSummary: (artistId: any) => Promise<{
            sourceId: any;
            title: any;
            image: any;
            items: any;
        }>;
    };
    page: {
        summary: (url: string) => Promise<{
            url: string;
            meta: unknown[] | undefined;
            links: unknown[] | undefined;
            title: unknown[] | undefined;
        }>;
    };
    rss: {
        feed: (feedUrl: any) => any;
        podcastSummary: (feedUrl: any) => any;
    };
    spotify: {
        searchArtists: (query: any) => Promise<any>;
        searchPlaylists: (query: any) => Promise<any>;
        userPlaylists: (userId: any) => Promise<any>;
        playlist: (playlistId: any) => Promise<any>;
        playlistTracks: (playlistId: any) => Promise<any>;
    };
    wordpress: {
        host: (_host: any) => {
            summary(): Promise<{
                sourceId: string;
                title: any;
                url: any;
                items: any;
            }>;
        };
    };
    youtube: {
        channelSummary: ({ username, channelId }: {
            username: any;
            channelId: any;
        }) => Promise<{
            sourceId: any;
            title: any;
            image: any;
            publishedAt: any;
            uploadsPlaylistId: any;
            items: any;
            imageWidth: any;
            imageHeight: any;
            playlists: any;
        }>;
        channelForUser: (username: any) => any;
        playlistsForChannel: (channelId: any) => any;
        playlist: (playlistId: any, opts?: {}) => any;
        videosForPlaylist: (playlistId: any, opts?: {}) => any;
    };
};
export default clients;
export declare type Item = {
    sourceId: string;
    title: string;
    description?: string;
    image?: string;
    url: string;
};
export declare type Summary = Item & {
    userId?: string;
    items: Item[];
};
