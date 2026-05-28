import {
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { api } from '../api.js'
import { SummarizeOptions } from 'index.js'
const host = 'https://api.spotify.com'

const client = {
  search,
  searchArtists: (query) => spotify(`${host}/v1/search?q=${query}&type=artist`),
  searchPlaylists: (query) =>
    spotify(`${host}/v1/search?q=${query}&type=playlist`),
  searchPodcasts: (query, options?: { limit: number }) =>
    spotify(
      `${host}/v1/search?q=${query}&type=show&market=US&limit=${
        options?.limit ?? 20
      }`,
    ) as Promise<ShowsSearchResults>,
  userPlaylists: (userId) => spotify(`${host}/v1/users/${userId}/playlists`),
  playlist: (playlistId) => spotify(`${host}/v1/playlists/${playlistId}`),
  playlistTracks: (playlistId) =>
    spotify(`${host}/v1/playlists/${playlistId}/tracks`),
  getArtist: (artistId) => spotify(`${host}/v1/artists/${artistId}`),
  getArtistAlbums: (artistId) =>
    spotify(`${host}/v1/artists/${artistId}/albums`),
  getAlbumTracks: (albumId) => spotify(`${host}/v1/albums/${albumId}/tracks`),
  getAlbum: (albumId) => spotify(`${host}/v1/albums/${albumId}`),
  getTrack: (trackId) => spotify(`${host}/v1/tracks/${trackId}`),
  getShow: (showId, options?: { limit?: number }): Promise<SpotifyShowDetail> =>
    spotify(`${host}/v1/shows/${showId}?limit=${options?.limit ?? 50}`),
  getShowEpisodes: (showId) => spotify(`${host}/v1/shows/${showId}/episodes`),
  getEpisode: (episodeId) => spotify(`${host}/v1/episodes/${episodeId}`),
  summarize,
}

export default client

var cachedToken = null

function search(
  query: string,
  options?: { type?: 'artist' | 'show' },
): Promise<GalleryEntry[]> {
  const type = options?.type ?? 'artist,show'
  return spotify(
    `${host}/v1/search?q=${query}&type=${type}&market=US&limit=5`,
  ).then((result: SpotifySearchResult) => {
    const artists =
      result.artists?.items.map((artist) => mapArtist(artist)) ?? []
    const shows = result.shows?.items.map((show) => mapShow(show)) ?? []
    return [...artists, ...shows]
  })
}
function mapShow(show): GalleryEntry {
  return {
    sourceId: `${show.type}:${show.id}`,
    title: show.name,
    description: show.description,
    image: show.images[0]?.url,
    entryType: GalleryEntryTypes.Spotify,
    genericType: 'audio',
    url: show.external_urls.spotify,
    detail: show,
  }
}

function mapArtist(artist): GalleryEntry {
  return {
    sourceId: `${artist.type}:${artist.id}`,
    title: artist.name,
    image: artist.images[0]?.url,
    entryType: GalleryEntryTypes.Spotify,
    genericType: 'music',
    url: artist.external_urls.spotify,
    detail: artist,
  }
}

async function summarize(
  sourceId: string,
  options?: SummarizeOptions,
): Promise<GalleryEntrySummary> {
  const [type, id] = sourceId.split(':')
  if (type === 'show') {
    const show = await client.getShow(id, { limit: options?.limit ?? 50 })
    const galleryEntry = mapShow(show)
    const _episodes = show.episodes.items

    function isWithinUpdatedAfterThreshold(
      episodes: typeof show.episodes.items,
    ) {
      if (!options?.updatedAfter) return true
      const updatedAfterDate = new Date(options.updatedAfter)
      return episodes.every((episode) => {
        const episodeDate = new Date(episode.release_date)
        return episodeDate > updatedAfterDate
      })
    }

    if (
      _episodes.length < show.episodes.total &&
      isWithinUpdatedAfterThreshold(_episodes)
    ) {
      let offset = 50
      while (offset < show.episodes.total) {
        options?.logger?.info?.(
          `Fetching next episodes for ${show.name}... offset: ${offset}`,
        )
        const nextEpisodes = await spotify(
          `${host}/v1/shows/${id}/episodes?limit=50&offset=${offset}`,
        )
        _episodes.push(...nextEpisodes.items)
        offset += 50
      }
    }

    const items = _episodes.map((episode) => {
      const { name, description, id, release_date, ...rest } = episode
      delete rest.html_description
      return {
        title: name,
        description: description,
        images: [episode.images[0]?.url],
        sourceId: `episode:${id}`,
        entryType: GalleryEntryTypes.Spotify,
        genericType: 'audio',
        url: episode.external_urls.spotify,
        date: release_date ? new Date(release_date) : undefined,
        detail: rest,
      } as GalleryEntryItem
    })
    options?.logger?.info?.(`Fetched ${items.length} episodes for ${show.name}`)
    return {
      ...galleryEntry,
      items,
    }
  } else if (type === 'artist') {
    const artist = await client.getArtist(id)
    const galleryEntry = mapArtist(artist)
    return {
      ...galleryEntry,
      items: [],
    }
  }

  throw new Error(`Unsupported Spotify type: ${type}`)
}

const spotify = async (url: string, options?) => {
  if (!cachedToken) {
    cachedToken = await token()
  }

  const _options = { ...options }
  _options.headers = {
    ..._options.headers,
    Authorization: `Bearer ${cachedToken}`,
  }

  return api(url, _options).catch(async (e) => {
    console.warn(
      'Spotify API request failed, attempting to refresh token...',
      e,
    )
    // Try to refresh the token once
    cachedToken = await token()
    _options.headers.Authorization = `Bearer ${cachedToken}`
    return api(url, _options)
  })
}

const authHeader = () => {
  const id = process.env.CLIENTS_SPOTIFY_CLIENT_ID
  const secret = process.env.CLIENTS_SPOTIFY_CLIENT_SECRET
  return Buffer.from(`${id}:${secret}`).toString('base64')
}

const token = () =>
  api('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      Authorization: `Basic ${authHeader()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  }).then((tokenPayload) => tokenPayload.access_token)

type ShowsSearchResults = {
  shows: {
    href: string
    limit: number
    next: string
    offset: number
    previous: null
    total: number
    items: {
      copyrights: []
      description: string
      html_description: string
      explicit: false
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: {
        height: number
        url: string
        width: number
      }[]
      is_externally_hosted: false
      languages: string[]
      media_type: 'audio'
      name: string
      publisher: string
      type: 'show'
      uri: string
      total_episodes: number
    }[]
  }
}

type SpotifyArtist = {
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }[]
  name: string
  popularity: number
  type: 'artist'
  uri: string
}

type SpotifyShow = {
  available_markets: string[]
  copyrights: []
  description: string
  html_description: string
  explicit: boolean
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: 'audio'
  name: string
  publisher: string
  type: 'show'
  uri: string
  total_episodes: number
}

type SpotifySearchResult = {
  artists: {
    href: string
    limit: number
    next: string
    offset: number
    previous: null
    total: number
    items: SpotifyArtist[]
  }
  shows: {
    href: string
    limit: number
    next: string
    offset: number
    previous: null
    total: number
    items: SpotifyShow[]
  }
}

type SpotifyShowDetail = {
  available_markets: string[]
  copyrights: []
  description: string
  html_description: string
  explicit: boolean
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  is_externally_hosted: false
  languages: string[]
  media_type: 'audio'
  name: string
  publisher: string
  type: 'show'
  uri: string
  total_episodes: number
  episodes: {
    href: string
    limit: number // 50 default
    next: string
    offset: number
    previous: null
    total: number
    items: [
      {
        audio_preview_url: string | null
        description: string
        html_description?: string
        duration_ms: number
        explicit: boolean
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        images: {
          url: string
          height: number
          width: number
        }[]
        is_externally_hosted: true
        is_playable: true
        language: 'en'
        languages: ['en']
        name: string
        release_date: string
        release_date_precision: 'day'
        type: 'episode'
        uri: string
      },
    ]
  }
}
