import {
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { api } from '../api.js'
import { tryGet } from '../shareable/common.js'
import { TentkeepClient } from './tentkeep-client.js'
const host = 'https://api.music.apple.com'

const getArtistAlbums = (artistId) =>
  music(`/v1/catalog/us/artists/${artistId}/albums?include=tracks`)
const searchArtists = (term: string) =>
  music(
    `/v1/catalog/us/search?term=${term}&limit=25&types=artists&include=albums`,
  ) as Promise<SearchArtistsResponse>

const contentClient = {
  search: async (query: string) =>
    searchArtists(query).then((response) =>
      response.results.artists.data.map(
        (artist) =>
          ({
            sourceId: artist.id.toString(),
            entryType: GalleryEntryTypes.Music,
            genericType: 'music',
            title: artist.attributes.name,
            image: artist.attributes.artwork.url.replace(/{[wh]}/g, '600'),
          } as GalleryEntry),
      ),
    ),
  summarize: async (sourceId: string) => {
    const artistAlbums = await getArtistAlbums(sourceId)
    const albums = artistAlbums.data.map(
      (a) =>
        ({
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
        } as GalleryEntryItem),
    )
    return {
      sourceId: sourceId,
      title: artistAlbums.data[0].attributes.artistName,
      image: artistAlbums.data[0].attributes.artwork.url.replace(
        /{w}|{h}/g,
        600,
      ),
      items: albums,
    }
  },
} as TentkeepClient

export default {
  searchArtists,
  getArtist: (artistId) =>
    music(`/v1/catalog/us/artists/${artistId}?include=albums,songs`),
  getArtistAlbums,
  getAlbum: (albumId) => music(`/v1/catalog/us/albums/${albumId}`),
  getAlbums: (albumIds) =>
    music(`/v1/catalog/us/albums?ids=${albumIds.join(',')}`),
  ...contentClient,
}

const music = async (path) => {
  const _url = `${host}${path}`
  const options = {
    headers: {} as Record<string, string>,
  }
  try {
    // @ts-ignore
    window
  } catch {
    const musickitToken = await token()
    options.headers.Authorization = `Bearer ${musickitToken}`
  }
  return api(_url, options)
}

const privateKey = () =>
  Buffer.from(
    process.env.CLIENTS_APPLE_MUSIC_KIT_PRIVATE_KEY as string,
    'base64',
  ).toString('utf-8')

const token = async () => {
  const jwt = (await import('jsonwebtoken')).default
  return jwt.sign({}, privateKey(), {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: process.env.CLIENTS_APPLE_MUSIC_KIT_TEAM_ID,
    header: {
      alg: 'ES256',
      kid: process.env.CLIENTS_APPLE_MUSIC_KIT_KEY_ID,
    },
  })
}

type SearchArtistsResponse = {
  results: {
    artists: {
      href: string
      next: string
      data: [
        {
          id: string
          type: string
          href: string
          attributes: {
            name: string
            genreNames: string[]
            artwork: {
              width: number
              height: number
              url: string
              bgColor: string
              textColor1: string
              textColor2: string
              textColor3: string
              textColor4: string
            }
            url: string
          }
          relationships: {
            albums: {
              href: string
              data: [
                {
                  id: string
                  type: string
                  href: string
                  attributes: {
                    copyright: string
                    genreNames: string[]
                    releaseDate: string
                    upc: string
                    isMasteredForItunes: false
                    artwork: {
                      width: number
                      height: number
                      url: string
                      bgColor: string
                      textColor1: string
                      textColor2: string
                      textColor3: string
                      textColor4: string
                    }
                    url: string
                    playParams: {
                      id: string
                      kind: string
                    }
                    recordLabel: string
                    isCompilation: false
                    trackCount: number
                    isSingle: false
                    name: string
                    artistName: string
                    isComplete: true
                  }
                },
              ]
            }
          }
        },
      ]
    }
  }
  meta: {
    results: {
      order: [string]
      rawOrder: [string]
    }
  }
}
