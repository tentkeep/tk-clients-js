import { api } from '../api.js'
import { tryGet } from '../shareable/common.js'
const host = 'https://api.music.apple.com'
import jwt from 'jsonwebtoken'

const getArtistAlbums = (artistId) =>
  music(`/v1/catalog/us/artists/${artistId}/albums?include=tracks`)

export default {
  searchArtists: (term) =>
    music(
      `/v1/catalog/us/search?term=${term}&limit=25&types=artists&include=albums`,
    ),
  getArtist: (artistId) =>
    music(`/v1/catalog/us/artists/${artistId}?include=albums,songs`),
  getArtistAlbums,
  getAlbum: (albumId) => music(`/v1/catalog/us/albums/${albumId}`),
  getAlbums: (albumIds) =>
    music(`/v1/catalog/us/albums?ids=${albumIds.join(',')}`),
  artistSummary: async (artistId) => {
    const artistAlbums = await getArtistAlbums(artistId)
    const albums = artistAlbums.data.map((a) => ({
      sourceId: a.id,
      title: a.attributes.name,
      image: a.attributes.artwork.url.replace(/{w}|{h}/g, 600),
      date: new Date(a.attributes.releaseDate).toISOString(),
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
    }))
    return {
      sourceId: artistId,
      title: artistAlbums.data[0].attributes.artistName,
      image: artistAlbums.data[0].attributes.artwork.url.replace(
        /{w}|{h}/g,
        600,
      ),
      items: albums,
    }
  },
}

const music = (path) => {
  const _url = `${host}${path}`
  const options = {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  }
  return api(_url, options)
}

const privateKey = () =>
  Buffer.from(
    process.env.CLIENTS_APPLE_MUSIC_KIT_PRIVATE_KEY,
    'base64',
  ).toString('utf-8')

const token = () =>
  jwt.sign({}, privateKey(), {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: process.env.CLIENTS_APPLE_MUSIC_KIT_TEAM_ID,
    header: {
      alg: 'ES256',
      kid: process.env.CLIENTS_APPLE_MUSIC_KIT_KEY_ID,
    },
  })
