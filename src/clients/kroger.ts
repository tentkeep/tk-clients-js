// Kroger Documentation: https://developer.kroger.com/api-products

import {
  GalleryEntryItemProduct,
  GalleryEntryItemProductVariant,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import got from 'got'

export interface GalleryEntryItem {
  id: string
  title: string
  imageUrl: string
  price: number | null
  description: string
  productUrl: string
}

export default {
  search: (query: string, locationId: string) => {
    return new KrogerApiClient().searchProducts(query, locationId, 10)
  },
  searchLocations: (zipCode: string) => {
    return new KrogerApiClient().searchLocations(zipCode)
  },
}

export interface KrogerProductSearchOptions {
  query: string
  locationId: string
  limit?: number
  token: string // Kroger API OAuth2 token
}

export class KrogerApiClient {
  private baseUrl = 'https://api.kroger.com/v1'

  constructor() {}

  private _token?: string

  async searchLocations(
    zipCode: string,
  ): Promise<KrogerResponse<KrogerLocation>> {
    return got(`${this.baseUrl}/locations`, {
      searchParams: {
        'filter.zipCode.near': zipCode,
        'filter.limit': 2,
      },
      headers: {
        Authorization: `Bearer ${await this.getToken()}`,
      },
    }).json()
  }

  async searchProducts(
    query: string,
    locationId: string,
    limit: number = 10,
  ): Promise<KrogerResponse<GalleryEntryItemProduct>> {
    return got(`${this.baseUrl}/products`, {
      searchParams: {
        'filter.term': query,
        'filter.locationId': locationId,
        'filter.limit': limit,
      },
      headers: {
        Authorization: `Bearer ${await this.getToken()}`,
      },
    })
      .json()
      .then((response: KrogerResponse<KrogerProduct>) => {
        // Map the products to GalleryEntryItemProduct format
        return {
          data: response.data.map((product) =>
            this.mapProductToGalleryEntryItem(product),
          ),
          meta: response.meta,
        } as KrogerResponse<GalleryEntryItemProduct>
      })
  }

  private mapProductToGalleryEntryItem(
    product: KrogerProduct,
  ): GalleryEntryItemProduct {
    const productItem = product.items?.[0]
    return {
      sourceId: product.productId,
      url: 'https://kroger.com' + product.productPageURI,
      title: product.description,
      entryType: GalleryEntryTypes.ProductFeed,
      genericType: 'shop',
      description: `${product.description}, ${productItem?.size}`,
      galleryTitle: product.brand,
      images: product.images
        ?.map((image) => image.sizes.find((s) => s.size === 'large')?.url)
        .filter(Boolean) as string[],
      price: [productItem?.price?.promo || productItem?.price.regular].filter(
        Boolean,
      ) as number[],
      detail: {
        ...product,
        variants: product.items?.map(
          (item) =>
            ({
              id: item.itemId,
              title: product.description,
              sourceId: item.itemId,
              url: 'https://kroger.com' + product.productPageURI,
              inventory: item.inventory?.stockLevel,
              favorite: item.favorite,
              fulfillment: item.fulfillment,
              price: [item.price.promo || item.price.regular],
              priceRegular: item.price.regular,
              priceDiscounted: item.price.promo,
              size: item.size,
              soldBy: item.soldBy,
            }) as any as GalleryEntryItemProductVariant,
        ),
      },
      // Optionally, you can add more fields if GalleryEntryItemProduct supports them
    }
  }

  async getToken() {
    if (this._token) {
      return this._token
    }

    const clientId = process.env.CLIENTS_KROGER_CLIENT_ID || ''
    const clientSecret = process.env.CLIENTS_KROGER_CLIENT_SECRET || ''

    const scope = 'product.compact'
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    )
    const response: { access_token: string } = await got
      .post('https://api.kroger.com/v1/connect/oauth2/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        form: {
          grant_type: 'client_credentials',
          scope,
        },
        responseType: 'json',
      })
      .json()

    console.log('Kroger API Token:', response)

    return response.access_token
  }
}

/**
 * cart.basic:write
Locations (Public)	
Products (Public)	product.compact
Profile (Public)	profile.compact
 */

export interface KrogerLocationDepartment {
  departmentId: string
  name: string
  phone?: string
  hours?: KrogerLocationHours
  address?: KrogerLocationAddress
  geolocation?: KrogerLocationGeolocation
  offsite?: boolean
}

export interface KrogerLocationAddress {
  addressLine1: string
  city: string
  state: string
  zipCode: string
  county?: string
}

export interface KrogerLocationGeolocation {
  latitude: number
  longitude: number
  latLng: string
}

export interface KrogerLocationDayHours {
  open: string
  close: string
  open24: boolean
}

export interface KrogerLocationHours {
  timezone?: string
  gmtOffset?: string
  open24: boolean
  monday?: KrogerLocationDayHours
  tuesday?: KrogerLocationDayHours
  wednesday?: KrogerLocationDayHours
  thursday?: KrogerLocationDayHours
  friday?: KrogerLocationDayHours
  saturday?: KrogerLocationDayHours
  sunday?: KrogerLocationDayHours
}

export interface KrogerLocation {
  locationId: string
  storeNumber: string
  divisionNumber: string
  chain: string
  address: KrogerLocationAddress
  geolocation: KrogerLocationGeolocation
  name: string
  hours: KrogerLocationHours
  phone: string
  departments: KrogerLocationDepartment[]
}

export interface KrogerResponseMeta {
  pagination: {
    start: number
    limit: number
    total: number
  }
}

export interface KrogerResponse<T> {
  data: T[]
  meta: KrogerResponseMeta
}

export interface KrogerProductImageSize {
  size: string
  url: string
}

export interface KrogerProductImage {
  perspective: string
  featured?: boolean
  sizes: KrogerProductImageSize[]
}

export interface KrogerProductItemInventory {
  stockLevel: string
}

export interface KrogerProductItemFulfillment {
  curbside: boolean
  delivery: boolean
  inStore: boolean
  shipToHome: boolean
}

export interface KrogerProductItemPrice {
  regular: number
  promo: number
}

export interface KrogerProductItem {
  itemId: string
  inventory?: KrogerProductItemInventory
  favorite?: boolean
  fulfillment?: KrogerProductItemFulfillment
  price: KrogerProductItemPrice
  size?: string
  soldBy?: string
}

export interface KrogerProductItemInformation {
  depth: string
  height: string
  width: string
}

export interface KrogerProductTemperature {
  indicator: string
  heatSensitive: boolean
}

export interface KrogerProduct {
  productId: string
  upc: string
  productPageURI: string
  aisleLocations: { description: string; number: string }[]
  brand: string
  categories: string[]
  countryOrigin: string
  description: string
  images: KrogerProductImage[]
  items: KrogerProductItem[]
  itemInformation: KrogerProductItemInformation
  temperature: KrogerProductTemperature
}
