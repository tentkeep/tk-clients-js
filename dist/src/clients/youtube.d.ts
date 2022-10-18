declare namespace _default {
    export function channelSummary({ username, channelId }: {
        username: any;
        channelId: any;
    }): Promise<{
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
    export { channelForUser };
    export { playlistsForChannel };
    export { playlist };
    export { videosForPlaylist };
}
export default _default;
declare function channelForUser(username: any): Promise<any>;
declare function playlistsForChannel(channelId: any): Promise<any>;
declare function playlist(playlistId: any, opts?: {}): any;
declare function videosForPlaylist(playlistId: any, opts?: {}): any;
