import { GalleryEntrySummary } from '../../index.js';
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
declare type YoutubeEntry = {
    publishedAt: Date;
    uploadsPlaylistId: any;
    imageWidth: string;
    imageHeight: string;
    playlists: any;
};
declare const _default: {
    channelSummary: ({ username, channelId, }: {
        username: any;
        channelId: any;
    }) => Promise<GalleryEntrySummary & YoutubeEntry>;
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
