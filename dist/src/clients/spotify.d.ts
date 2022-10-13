declare namespace _default {
    function searchArtists(query: any): Promise<any>;
    function searchPlaylists(query: any): Promise<any>;
    function userPlaylists(userId: any): Promise<any>;
    function playlist(playlistId: any): Promise<any>;
    function playlistTracks(playlistId: any): Promise<any>;
}
export default _default;
