import { DataDomain } from '../types/tentkeep-types.js'
import {
  Gallery,
  GalleryEntry,
  GalleryEntryGenericTypes,
  GalleryEntryItem,
  GalleryEntryPlace,
  GalleryEntrySeed,
  GalleryEntrySummary,
  PageSummary,
} from '../../index.js'
import { PageInfo, ProductItem } from '../../index.js'
import api, { API, ApiStatusError, sanitizeOptions } from '../api.js'

const DEFAULT_HOST = 'https://api.tentkeep.com/v1'

export default (
  dataDomain: DataDomain,
  TENTKEEP_HOST: string | undefined = DEFAULT_HOST,
) => {
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
      // The Auth needs to come from the real api so that OAuth providers respect it
      // @ts-ignore
      if (window) {
        // @ts-ignore
        window.location = `${DEFAULT_HOST}/auth/authorize/${strategy}?dataDomain=${dataDomain}`
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
    getPlaces: (query: string): Promise<GalleryEntryPlace[]> =>
      tentkeep(`/proxy/places?q=${query}`),
    getPlaceDetail: (sourceId: string): Promise<GalleryEntryPlace> =>
      tentkeep(`/proxy/places/detail?id=${sourceId}`),
    getPodcastSummary: (feedUrl: string) =>
      tentkeep(`/proxy/rss/podcast-summary?feed=${feedUrl}`),
    getShopifyProductsSummary: (
      url: string,
      limit: number = 15,
    ): Promise<ProductItem[]> =>
      tentkeep(`/proxy/shopify/products/summary?url=${url}&limit=${limit}`),
    getWordpressPostsSummary: (
      url: string,
      limit: number = 5,
    ): Promise<GalleryEntrySummary> =>
      tentkeep(`/proxy/wordpress/posts?url=${url}&limit=${limit}`),
    searchYoutubeChannels: (query: string, limit: number = 5) =>
      tentkeep(`/proxy/youtube/channels?q=${query}&limit=${limit}`),

    // GALLERIES
    getGalleries: (): Promise<Gallery[]> => tentkeep(`/galleries`),
    getGallery: (galleryId: number): Promise<Gallery> =>
      tentkeep(`/galleries/${galleryId}`),
    getRecentGalleryEntryItems: (
      genericType: GalleryEntryGenericTypes | undefined = undefined,
    ) =>
      tentkeep(
        `/gallery-entry-items/recent?genericType=${genericType}`,
      ) as Promise<GalleryEntryItem[]>,
    getTrendingGalleryEntryItemTopics: (
      limit: number = 15,
    ): Promise<string[]> => tentkeep(`/gallery-entry-items/trending?${limit}`),
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
    updateGallery: (token: string, gallery: Gallery & { id: number }) =>
      tentkeep(`/galleries/${gallery.id}`, {
        method: 'put',
        headers: postHeaders(token),
        body: gallery,
      }) as Promise<Gallery>,
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
