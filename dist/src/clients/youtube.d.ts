import { GalleryEntry, GalleryEntrySummary } from '@tentkeep/tentkeep';
export type YoutubeResourceParams = any & {
    part: string;
    maxResults: number;
};
export type YoutubeResourceAPI = (params: YoutubeResourceParams) => Promise<any>;
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
type YoutubeEntry = {
    publishedAt: Date;
    uploadsPlaylistId: any;
    imageWidth: string;
    imageHeight: string;
    playlists: any;
};
declare const _default: {
    searchYouTube: YoutubeResourceAPI;
    search: (query: string) => Promise<GalleryEntry[]>;
    summarize: (channelId: string) => Promise<GalleryEntrySummary & YoutubeEntry>;
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
    videos: YoutubeResourceAPI;
    videoCategories: YoutubeResourceAPI;
};
export default _default;
