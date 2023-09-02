import { GalleryEntryTypes } from '@tentkeep/tentkeep';
import { api } from '../api.js';
import { tryGet } from '../shareable/common.js';
const host = 'https://api.music.apple.com';
const getArtistAlbums = (artistId) => music(`/v1/catalog/us/artists/${artistId}/albums?include=tracks`);
const searchArtists = (term) => music(`/v1/catalog/us/search?term=${term}&limit=25&types=artists&include=albums`);
export default {
    searchArtists,
    getArtist: (artistId) => music(`/v1/catalog/us/artists/${artistId}?include=albums,songs`),
    getArtistAlbums,
    getAlbum: (albumId) => music(`/v1/catalog/us/albums/${albumId}`),
    getAlbums: (albumIds) => music(`/v1/catalog/us/albums?ids=${albumIds.join(',')}`),
    search: async (query) => searchArtists(query).then((response) => response),
    summarize: async (sourceId) => {
        const artistAlbums = await getArtistAlbums(sourceId);
        const albums = artistAlbums.data.map((a) => ({
            sourceId: a.id,
            entryType: GalleryEntryTypes.Music,
            genericType: 'music',
            title: a.attributes.name,
            image: a.attributes.artwork.url.replace(/{w}|{h}/g, 600),
            url: '',
            date: new Date(a.attributes.releaseDate),
            detail: {
                releaseDate: a.attributes.releaseDate,
                recordLabel: a.attributes.recordLabel,
                copyright: a.attributes.copyright,
                isSingle: a.attributes.isSingle,
                tracks: tryGet(() => a.relationships.tracks.data, []).map((t) => ({
                    sourceId: t.id,
                    title: t.attributes.name,
                    preview: tryGet(() => t.attributes.previews[0].url),
                    trackNumber: t.attributes.trackNumber,
                    duration: t.attributes.durationInMillis,
                    isrc: t.attributes.isrc,
                    services: {
                        apple: {
                            id: t.id,
                            url: t.attributes.url,
                            kind: t.attributes.playParams.kind,
                        },
                    },
                })),
                services: {
                    apple: { id: a.id, url: a.attributes.url },
                },
            },
        }));
        return {
            sourceId: sourceId,
            title: artistAlbums.data[0].attributes.artistName,
            image: artistAlbums.data[0].attributes.artwork.url.replace(/{w}|{h}/g, 600),
            items: albums,
        };
    },
};
const music = async (path) => {
    const _url = `${host}${path}`;
    const options = {
        headers: {},
    };
    if (window === undefined) {
        const musickitToken = await token();
        options.headers.Authorization = `Bearer ${musickitToken}`;
    }
    return api(_url, options);
};
const privateKey = () => Buffer.from(process.env.CLIENTS_APPLE_MUSIC_KIT_PRIVATE_KEY, 'base64').toString('utf-8');
const token = async () => {
    const jwt = (await import('jsonwebtoken')).default;
    return jwt.sign({}, privateKey(), {
        algorithm: 'ES256',
        expiresIn: '180d',
        issuer: process.env.CLIENTS_APPLE_MUSIC_KIT_TEAM_ID,
        header: {
            alg: 'ES256',
            kid: process.env.CLIENTS_APPLE_MUSIC_KIT_KEY_ID,
        },
    });
};
//# sourceMappingURL=musickit.js.map