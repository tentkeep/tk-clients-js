import {
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { API, api } from '../api.js'
import { SummarizeOptions } from '../../index.js'

const host = 'https://openapi.etsy.com/v3'

const getShop = (shopId) =>
  etsy(`${host}/application/shops/${shopId}`) as Promise<EtsyShop>
const shopListings = (shopId, offset = 0) =>
  etsy(
    `${host}/application/shops/${shopId}/listings/active?limit=100&offset=${offset}&includes=Images(url_170x135,url_570xN)`,
  ) as Promise<ShopListingsResponse>
const allShopListings = async (shopId) => {
  let offset = 0
  let total = 1
  const allListings: EtsyShopListing[] = []
  while (offset < total && offset < 501) {
    const response = await shopListings(shopId, offset)
    total = response.count
    const listings = await getListingsWith(
      response.results.map((l) => l.listing_id),
      ['Images'],
    )
    allListings.push(...listings.results)
    offset += 100
    console.log('Etsy product offset', offset)
  }
  return allListings
}
const getListingsWith = (
  listingIds: number[],
  includes: (
    | 'Shipping'
    | 'Images'
    | 'Shop'
    | 'User'
    | 'Translations'
    | 'Inventory'
    | 'Videos'
  )[],
) =>
  etsy(
    `${host}/application/listings/batch?listing_ids=${listingIds.join(
      ',',
    )}&includes=${includes.join(',')}`,
  ) as Promise<ShopListingsResponse>

const listingImages = (listingId) =>
  etsy(
    `${host}/application/listings/${listingId}/images`,
  ) as Promise<EtsyListingImagesResponse>

const searchShops = (name) =>
  etsy(
    `${host}/application/shops?shop_name=${name}`,
  ) as Promise<ShopSearchResult>

const contentClient = {
  search: async (query: string) => {
    return searchShops(query).then((response) => {
      return response.results.map(
        (shop) =>
          ({
            sourceId: shop.shop_id.toString(),
            entryType: GalleryEntryTypes.Etsy,
            genericType: 'shop',
            title: shop.shop_name,
            description: shop.title,
            image: shop.icon_url_fullxfull,
            url: shop.url,
          }) as GalleryEntry,
      )
    })
  },
  summarize: async (shopId: string, _options?: SummarizeOptions) => {
    const shop = await getShop(shopId)
    if (!shop) {
      throw new Error('Shop not found')
    }
    let listings = await allShopListings(shopId)
    const fromEpoch = (epochSeconds) => {
      var d = new Date(0)
      d.setUTCSeconds(epochSeconds)
      return d
    }
    return {
      sourceId: shopId,
      title: shop.shop_name,
      description: shop.title,
      image: shop.icon_url_fullxfull,
      url: shop.url,
      userId: shop.user_id,
      items: listings.map(
        (l) =>
          ({
            sourceId: l.listing_id.toString(),
            entryType: GalleryEntryTypes.Etsy,
            genericType: 'shop',
            title: l.title,
            description: l.description,
            images: l.images?.map((i) => i.url_570xN),
            url: l.url,
            date: fromEpoch(l.last_modified_timestamp),
            detail: {
              price: l.price,
              tags: (l.tags || []).join('||'),
              views: l.views,
              customizable: l.is_customizable,
            },
          }) as GalleryEntryItem,
      ),
    } as GalleryEntrySummary
  },
}

export default {
  // favorites: (userId) => etsy(`${host}/v2/users/${userId}/favorites/listings`),
  listing: (listingId) => etsy(`${host}/v2/listings/${listingId}`),
  listingImages,
  // userShops: (userId) => etsy(`${host}/v2/users/${userId}/shops`),
  searchShops,
  getShop,
  shopListings,
  allShopListings,
  getListingsWith,
  ...contentClient,
}

const etsy: API = (url, options = null) => {
  const apiKey = process.env.CLIENTS_ETSY_API_KEY
  const _url = url instanceof URL ? url : new URL(url)
  const _options = options ?? {}
  _options.headers = _options.headers ?? {}
  if (apiKey) {
    _options.headers['x-api-key'] = apiKey
  }
  return api(_url, _options)
}

type ShopSearchResult = {
  count: number
  results: EtsyShop[]
}

type EtsyShop = {
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
}

type ShopListingsResponse = {
  count: number
  results: EtsyShopListing[]
}

type EtsyShopListing = {
  listing_id: number
  user_id: number
  shop_id: number
  title: string
  description: string
  state: string
  creation_timestamp: number
  created_timestamp: number
  ending_timestamp: number
  original_creation_timestamp: number
  last_modified_timestamp: number
  updated_timestamp: number
  state_timestamp: number
  quantity: number
  shop_section_id?: string
  featured_rank: number
  url: string
  num_favorers: number
  non_taxable: boolean
  is_taxable: boolean
  is_customizable: boolean
  is_personalizable: boolean
  personalization_is_required: boolean
  personalization_char_count_max?: string
  personalization_instructions?: string
  listing_type: string
  tags: string[]
  materials: string[]
  shipping_profile_id: number
  return_policy_id?: string
  processing_min: number
  processing_max: number
  who_made: string
  when_made: string
  is_supply: boolean
  item_weight?: string
  item_weight_unit?: string
  item_length?: string
  item_width?: string
  item_height?: string
  item_dimensions_unit?: string
  is_private: boolean
  style: string[]
  file_data: string
  has_variations: boolean
  should_auto_renew: boolean
  language: string
  price: {
    amount: number
    divisor: number
    currency_code: string
  }
  taxonomy_id: number
  production_partners: string[]
  skus: string[]
  views: number
  images?: EtsyListingImage[]
}

type EtsyListingImagesResponse = {
  count: number
  results: EtsyListingImage[]
}

type EtsyListingImage = {
  listing_id: number
  listing_image_id: number
  hex_code: string
  red: number
  green: number
  blue: number
  hue: number
  saturation: number
  brightness: number
  is_black_and_white: boolean
  creation_tsz: number
  created_timestamp: number
  rank: number
  url_75x75: string
  url_170x135: string
  url_570xN: string
  url_fullxfull: string
  full_height: number
  full_width: number
  alt_text?: string
}
