declare namespace _default {
    export function searchArtists(term: any): Promise<any>;
    export function getArtist(artistId: any): Promise<any>;
    export { getArtistAlbums };
    export function getAlbum(albumId: any): Promise<any>;
    export function getAlbums(albumIds: any): Promise<any>;
    export function artistSummary(artistId: any): Promise<{
        sourceId: any;
        title: any;
        image: any;
        items: any;
    }>;
}
export default _default;
declare function getArtistAlbums(artistId: any): Promise<any>;
