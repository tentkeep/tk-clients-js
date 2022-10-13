declare namespace _default {
    export function searchArtists(term: any): any;
    export function getArtist(artistId: any): any;
    export { getArtistAlbums };
    export function getAlbum(albumId: any): any;
    export function getAlbums(albumIds: any): any;
    export function artistSummary(artistId: any): Promise<{
        sourceId: any;
        title: any;
        image: any;
        items: any;
    }>;
}
export default _default;
declare function getArtistAlbums(artistId: any): any;
