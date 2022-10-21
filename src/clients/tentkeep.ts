import { Place, ProductItem } from '../../index.js'
import api, { API, sanitizeOptions } from '../api.js'

const TENTKEEP_HOST = 'https://api.tentkeep.com/v1'

export type Gallery = {
  id?: number
  title: string
  description?: string
  created_by?: number
  tiny_image?: string
}
export type GalleryEntry = {
  id?: number
  gallery_id: number
  created_by?: number
  entry_type: 'etsy' | 'music' | 'podcast' | 'wordpress' | 'youtube'
  generic_type: 'shop' | 'music' | 'podcast' | 'page' | 'video'
  source_id: string
  title: string
  description?: string
  image?: string
  url: string
  detail?: any
}
export type GalleryEntryItem = {
  id?: number
  gallery_entry_id: number
  created_by?: number
  entry_type: 'etsy' | 'music' | 'podcast' | 'wordpress' | 'youtube'
  generic_type: 'shop' | 'music' | 'podcast' | 'page' | 'video'
  source_id: string
  title: string
  description?: string
  image?: string
  url: string
  detail?: any
  date?: Date
  tokens?: string[]
}

export type GalleryEntrySeedEtsy = {
  entryType: 'etsy'
  entry?: GalleryEntry
  details?: { shopId }
}
export type GalleryEntrySeedGooglePlace = {
  entryType: 'google.place'
  entry?: GalleryEntry
  details?: { placeId: string }
}
export type GalleryEntrySeedMusic = {
  entryType: 'music'
  entry?: GalleryEntry
  details: { artistId: string }
}
export type GalleryEntrySeedPodcast = {
  entryType: 'podcast'
  entry?: GalleryEntry
  details: { feedUrl: string }
}
export type GalleryEntrySeedWordpress = {
  entryType: 'wordpress'
  entry?: GalleryEntry
  details: { url: string }
}
export type GalleryEntrySeedYoutube = {
  entryType: 'youtube'
  entry?: GalleryEntry
  details: { username?: string; channelId?: string }
}
export type GalleryEntrySeed =
  | GalleryEntrySeedEtsy
  | GalleryEntrySeedGooglePlace
  | GalleryEntrySeedMusic
  | GalleryEntrySeedPodcast
  | GalleryEntrySeedWordpress
  | GalleryEntrySeedYoutube

export enum DataDomain {
  Christian = 1,
  Bootroots = 2,
}

export default (dataDomain: DataDomain) => {
  const tentkeep: API = (path: string, options) => {
    const _options = sanitizeOptions(options)
    _options.headers = _options.headers ?? {}
    _options.headers.key = new Date().toISOString().substring(0, 10)
    _options.headers['x-data-domain'] = dataDomain

    const url = new URL(`https://api.tentkeep.com/v1${path}`)
    return api(url, _options)
  }

  return {
    exchangeAccessCode: (code) => {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          grant_type: 'authorization_code',
          code,
        },
      }
      return tentkeep(`/auth/token`, options)
    },
    getPageInfo: (url: string) => tentkeep(`/proxy/page/info?url=${url}`),
    getPageSummary: (url: string) => tentkeep(`/proxy/page/summary?url=${url}`),
    getPlaces: (query: string): Promise<Place[]> =>
      tentkeep(`/proxy/places?q=${query}`),
    getPlaceDetail: (sourceId: string): Promise<Place> =>
      tentkeep(`/proxy/places/detail?id=${sourceId}`),
    getPodcastSummary: (feedUrl: string) =>
      tentkeep(`/proxy/rss/podcast-summary?feed=${feedUrl}`),
    getShopifyProductsSummary: (
      url: string,
      limit: number = 15,
    ): Promise<ProductItem[]> =>
      tentkeep(`/proxy/shopify/products/summary?url=${url}&limit=${limit}`),
    searchYoutubeChannels: (query: string) =>
      tentkeep(`/proxy/youtube/channels?q=${query}`),

    // GALLERIES
    getGalleries: (): Promise<Gallery[]> => tentkeep(`/galleries`),
    getGallery: (galleryId: number): Promise<Gallery> =>
      tentkeep(`/galleries/${galleryId}`),
    getRecentlyAddedGalleryEntryItems: () =>
      tentkeep(`/gallery-entry-items/recent`),
    getGalleriesForUser: (token: string) =>
      tentkeep(`/me/galleries`, { headers: authHeaders(token) }),
    getGalleryImageUrl: (galleryId: number) =>
      `${TENTKEEP_HOST}/galleries/${galleryId}/image`,
    getGalleryEntries: (galleryId: number) =>
      tentkeep(`/galleries/${galleryId}/entries`),
    getGalleryUserRole: (token: string, galleryId: number) =>
      tentkeep(`/me/galleries/${galleryId}`, {
        headers: authHeaders(token),
      }),
    saveGallery: (token: string, gallery: Gallery) =>
      tentkeep(`/galleries`, {
        method: 'post',
        headers: postHeaders(token),
        body: gallery,
      }),
    saveGalleryImage: async (token: string, galleryId: number, image) => {
      const body = {
        galleryId: galleryId,
        name: 'gallery-image',
        contentType: 'image/*',
      }
      const mediaPrepare = await tentkeep(`/content/prepare`, {
        method: 'post',
        headers: postHeaders(token),
        body,
      })
      const signedPutRequest = JSON.parse(
        Buffer.from(mediaPrepare.id, 'hex').toString('utf-8'),
      )

      return api(signedPutRequest.url, {
        ...signedPutRequest.options,
        body: image,
      })
    },
    saveGalleryEntry: (
      token: string,
      galleryId: number,
      seed: GalleryEntrySeed,
    ) =>
      tentkeep(`/galleries/${galleryId}/entries`, {
        method: 'post',
        headers: postHeaders(token),
        body: seed,
      }),
    saveUserItemActivity: (token: string, itemActivity) =>
      tentkeep(`/me/activity/item`, {
        method: 'post',
        headers: postHeaders(token),
        body: itemActivity,
      }),
    searchEtsyShops: (query: string) =>
      tentkeep(`/proxy/etsy/shops?q=${query}`),
    searchMusicArtists: (query: string) =>
      tentkeep(`/proxy/music/artists?q=${query}`),
  }
}

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

const postHeaders = (token: string) => ({
  ...authHeaders(token),
  'Content-Type': 'application/json',
})
