export declare type YoutubeResourceParams = any & {
    part: string;
    maxResults: number;
};
export declare type YoutubeResourceAPI = (params: YoutubeResourceParams) => Promise<any>;
export interface YoutubeResources {
    activities: YoutubeResourceAPI;
    channels: YoutubeResourceAPI;
    comments: YoutubeResourceAPI;
    playlists: YoutubeResourceAPI;
    playlistItems: YoutubeResourceAPI;
    search: YoutubeResourceAPI;
    videos: YoutubeResourceAPI;
    videoCategories: YoutubeResourceAPI;
}
declare const _default: {
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
    channelForUser: (username: any) => Promise<any>;
    playlistsForChannel: (channelId: any) => Promise<any>;
    playlist: (playlistId: any, opts?: {}) => Promise<any>;
    videosForPlaylist: (playlistId: any, opts?: {}) => Promise<{
        videos: any;
        nextPageToken: any;
    }>;
    activities: YoutubeResourceAPI;
    channels: YoutubeResourceAPI;
    comments: YoutubeResourceAPI;
    playlists: YoutubeResourceAPI;
    playlistItems: YoutubeResourceAPI;
    search: YoutubeResourceAPI;
    videos: YoutubeResourceAPI;
    videoCategories: YoutubeResourceAPI;
};
export default _default;
