import {
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { API, api } from '../api.js'
import { tryGet } from '../shareable/common.js'
import { TentkeepClient } from './tentkeep-client.js'

const host = 'https://openapi.etsy.com/v3'

const getShop = (shopId) => etsy(`${host}/application/shops/${shopId}`)
const getShopWithListings = (shopId) =>
  etsy(
    `${host}/application/shops/${shopId}?includes=Listings:200/Images(url_170x135,url_570xN)`,
  )
const shopListings = (shopId, page = 1) =>
  etsy(
    `${host}/application/shops/${shopId}/listings/active?limit=100&includes=Images(url_170x135,url_570xN)&page=${page}`,
  )
const allShopListings = async (shopId) => {
  const listings = await shopListings(shopId)
  let nextPage = listings.pagination.next_page
  while (nextPage) {
    const next = await shopListings(shopId, nextPage)
    listings.results.push(...next.results)
    nextPage = next.pagination.next_page
    console.log(nextPage)
  }
  return listings
}

const listingImages = (listingId) =>
  etsy(`${host}/v2/listings/${listingId}/images`)

const searchShops = (name) =>
  etsy(
    `${host}/application/shops?shop_name=${name}`,
  ) as Promise<ShopSearchResult>

const contentClient = {
  search: async (query: string) => {
    return (await searchShops(query)).results.map(
      (shop) =>
        ({
          sourceId: shop.shop_id.toString(),
          entryType: GalleryEntryTypes.Etsy,
          genericType: 'shop',
          title: shop.shop_name,
          description: shop.title,
          image: shop.icon_url_fullxfull,
          url: shop.url,
        } as GalleryEntry),
    )
  },
  /**
   * @param sourceId - the Etsy shop id
   */
  summarize: async (sourceId: string) => {
    const shop = (await getShop(sourceId)).results[0]
    if (!shop) {
      throw new Error('Shop not found')
    }
    const listings = await allShopListings(sourceId)
    const fromEpoch = (epochSeconds) => {
      var d = new Date(0)
      d.setUTCSeconds(epochSeconds)
      return d
    }
    return {
      sourceId: sourceId,
      title: shop.shop_name,
      description: shop.title,
      image: shop.icon_url_fullxfull,
      url: shop.url,
      userId: shop.user_id,
      items: listings.results.map(
        (l) =>
          ({
            sourceId: l.listing_id,
            entryType: GalleryEntryTypes.Etsy,
            genericType: 'shop',
            title: l.title,
            description: l.description,
            image: tryGet(() => l.Images[0].url_570xN),
            images: l.Images,
            url: l.url,
            date: fromEpoch(l.last_modified_tsz),
            detail: {
              price: l.price,
              currency: l.currency_code,
              tags: (l.tags || []).join('||'),
              views: l.views,
              customizable: l.is_customizable,
              digital: l.is_digital,
            },
          } as GalleryEntryItem),
      ),
    } as GalleryEntrySummary
  },
} as TentkeepClient

export default {
  // favorites: (userId) => etsy(`${host}/v2/users/${userId}/favorites/listings`),
  listing: (listingId) => etsy(`${host}/v2/listings/${listingId}`),
  listingImages,
  // userShops: (userId) => etsy(`${host}/v2/users/${userId}/shops`),
  searchShops,
  getShop,
  getShopWithListings,
  shopListings,
  allShopListings,
  ...contentClient,
}

const etsy: API = (url, options = null) => {
  const apiKey = process.env.CLIENTS_ETSY_API_KEY
  const _url = url instanceof URL ? url : new URL(url)
  if (apiKey) {
    _url.searchParams.append('api_key', apiKey)
  }
  return api(_url, options)
}

type ShopSearchResult = {
  count: number
  results: {
    shop_id: number
    shop_name: string
    user_id: number
    create_date: number
    created_timestamp: number
    title?: string
    announcement?: string
    currency_code: string
    is_vacation: boolean
    vacation_message?: string
    sale_message?: string
    digital_sale_message?: string
    update_date: number
    updated_timestamp: number
    listing_active_count: number
    digital_listing_count: number
    login_name: string
    accepts_custom_requests: boolean
    vacation_autoreply?: string
    url: string
    image_url_760x100?: string
    num_favorers: number
    languages: string[]
    icon_url_fullxfull?: string
    is_using_structured_policies: boolean
    has_onboarded_structured_policies: boolean
    include_dispute_form_link: boolean
    is_direct_checkout_onboarded: boolean
    is_etsy_payments_onboarded: boolean
    is_opted_in_to_buyer_promise: boolean
    is_calculated_eligible: boolean
    is_shop_us_based: boolean
    transaction_sold_count: number
    shipping_from_country_iso?: string
    shop_location_country_iso?: string
    policy_welcome?: string
    policy_payment?: string
    policy_shipping?: string
    policy_refunds?: string
    policy_additional?: string
    policy_seller_info?: string
    policy_update_date: number
    policy_has_private_receipt_info: boolean
    has_unstructured_policies: boolean
    policy_privacy?: string
    review_average?: string
    review_count?: string
  }[]
}
