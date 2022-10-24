import { PageSummary } from '../../index.js'
import { PageInfo, Place, ProductItem } from '../../index.js'
import api, { API, ApiStatusError, sanitizeOptions } from '../api.js'

const TENTKEEP_HOST = 'https://api.tentkeep.com/v1'

export type Gallery = {
  id?: number
  title?: string
  description?: string
  createdBy?: number
  tinyImage?: string
  url?: string
  image?: string
  createdAt?: Date
  modifiedAt?: Date
}
export type GalleryEntryGenericTypes =
  | 'shop'
  | 'music'
  | 'podcast'
  | 'page'
  | 'place'
  | 'video'
export type GalleryEntry = {
  id?: number
  galleryId?: number
  createdBy?: number
  entryType?: GalleryEntryTypes
  genericType?: GalleryEntryGenericTypes
  sourceId?: string
  title?: string
  description?: string
  image?: string
  url?: string
  detail?: any
  createdAt?: Date
  modifiedAt?: Date
}
export type GalleryEntryItem = {
  id?: number
  galleryEntryId?: number
  createdBy?: number
  entryType: GalleryEntryTypes
  genericType: GalleryEntryGenericTypes
  sourceId: string
  title: string
  description?: string
  image?: string
  url: string
  detail?: any
  date?: Date
  tokens?: string[]
  createdAt?: Date
  modifiedAt?: Date
}

export type GalleryEntrySeedEtsy = {
  entryType: GalleryEntryTypes.Etsy
  entry?: GalleryEntry
  details?: { shopId }
}
export type GalleryEntrySeedGooglePlace = {
  entryType: GalleryEntryTypes.GooglePlace
  entry?: GalleryEntry
  details?: { placeId: string }
}
export type GalleryEntrySeedMusic = {
  entryType: GalleryEntryTypes.Music
  entry?: GalleryEntry
  details: { artistId: string }
}
export type GalleryEntrySeedPodcast = {
  entryType: GalleryEntryTypes.Podcast
  entry?: GalleryEntry
  details: { feedUrl: string }
}
export type GalleryEntrySeedShopify = {
  entryType: GalleryEntryTypes.Shopify
  entry?: GalleryEntry
  details: { shopUrl: string }
}
export type GalleryEntrySeedWordpress = {
  entryType: GalleryEntryTypes.Wordpress
  entry?: GalleryEntry
  details: { url: string }
}
export type GalleryEntrySeedYoutube = {
  entryType: GalleryEntryTypes.YouTube
  entry?: GalleryEntry
  details: { username?: string; channelId?: string }
}
export type GalleryEntrySeed =
  | GalleryEntrySeedEtsy
  | GalleryEntrySeedGooglePlace
  | GalleryEntrySeedMusic
  | GalleryEntrySeedPodcast
  | GalleryEntrySeedShopify
  | GalleryEntrySeedWordpress
  | GalleryEntrySeedYoutube

export enum DataDomain {
  Christian = 1,
  Bootroots = 2,
}
export enum GalleryEntryTypes {
  Etsy = 'etsy',
  GooglePlace = 'google.place',
  Music = 'music',
  Podcast = 'podcast',
  Shopify = 'shopify',
  Wordpress = 'wordpress',
  YouTube = 'youtube',
}

export type GalleryUserRoles = 'member' | 'creator' | 'owner'

export type GalleryUser = {
  galleryId?: number
  userId?: number
  roles?: GalleryUserRoles[]
  domain?: number
}

export default (dataDomain: DataDomain) => {
  const tentkeep: API = (path: string, options) => {
    const _options = sanitizeOptions(options)
    _options.headers = _options.headers ?? {}
    _options.headers.key = new Date().toISOString().substring(0, 10)
    _options.headers['x-data-domain'] = dataDomain

    const url = new URL(`${TENTKEEP_HOST}${path}`)
    return api(url, _options)
  }

  return {
    authSignIn: (strategy: string) => {
      // @ts-ignore
      if (window) {
        // @ts-ignore
        window.location = `${TENTKEEP_HOST}/auth/authorize/${strategy}?dataDomain=${dataDomain}`
      } else {
        throw new ApiStatusError(
          400,
          'Sign in must occur in a browser context.',
        )
      }
    },
    authExchangeAccessCode: (code) => {
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
    getPageInfo: (url: string) =>
      tentkeep(`/proxy/page/info?url=${url}`) as Promise<PageInfo>,
    getPageSummary: (url: string) =>
      tentkeep(`/proxy/page/summary?url=${url}`) as Promise<PageSummary>,
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
    saveGallery: (token: string, gallery: Gallery & { title: string }) =>
      tentkeep(`/galleries`, {
        method: 'post',
        headers: postHeaders(token),
        body: gallery,
      }) as Promise<Gallery>,
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
      }) as Promise<GalleryEntry>,
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
