import { api } from '../api.js'
import { Response } from 'got'
import { TentkeepClient } from './tentkeep-client.js'
import {
  GalleryEntry,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
const host = 'https://itunes.apple.com'

const podcasts = (query): Promise<PodcastSearchResult> =>
  api(`${host}/search?entity=podcast&term=${query}`).then(
    (response: Response<string>) => JSON.parse(response.body),
  )

const contentClient = {
  search: (query: string) =>
    podcasts(query).then((result) =>
      result.results.map(
        (r) =>
          ({
            sourceId: r.feedUrl,
            entryType: GalleryEntryTypes.Podcast,
            genericType: 'audio',
            title: r.collectionName,
            description: r.genres.join(', '),
            url: r.feedUrl,
            image: r.artworkUrl600,
          } as GalleryEntry),
      ),
    ),
  summarize: (_sourceId) => Promise.resolve({} as GalleryEntrySummary),
} as TentkeepClient

export default {
  podcasts,
  ...contentClient,
}

type PodcastSearchResult = {
  resultCount: number
  results: [
    {
      wrapperType: 'track'
      kind: 'podcast'
      collectionId: number
      trackId: number
      artistName: string
      collectionName: string
      trackName: string
      collectionCensoredName: string
      trackCensoredName: string
      collectionViewUrl: string
      feedUrl: string
      trackViewUrl: string
      artworkUrl30: string
      artworkUrl60: string
      artworkUrl100: string
      collectionPrice: number
      trackPrice: number
      collectionHdPrice: number
      releaseDate: string // ISO
      collectionExplicitness: 'notExplicit'
      trackExplicitness: 'cleaned'
      trackCount: number
      trackTimeMillis: number
      country: string
      currency: string
      primaryGenreName: string
      contentAdvisoryRating: 'Clean'
      artworkUrl600: string
      genreIds: string[]
      genres: string[]
    },
  ]
}
