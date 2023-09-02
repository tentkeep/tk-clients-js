import {
  GalleryEntry,
  GalleryEntryItemProduct,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { sanitizeUrl } from '../shareable/common.js'
import api from '../api.js'
import { GalleryEntryItemProductVariant } from '@tentkeep/tentkeep'
import { TentkeepClient } from './tentkeep-client.js'

const raw = {
  products: (
    url: string,
    limit: number = 250,
  ): Promise<{ products: ShopifyProduct[] }> => api(productsUrl(url, limit)),
  collections: (url: string): Promise<any> =>
    api(`${sanitizeUrl(url)}/collections.json?limit=250`),
  collectionProducts: (url: string, collectionHandle: string): Promise<any> =>
    api(
      `${sanitizeUrl(
        url,
      )}/collections/${collectionHandle}/products.json?limit=250`,
    ),
}

const contentClient = {
  search: async (query: string) => {
    try {
      const products = await raw.products(query, 1)
      const product = products.products[0]
      if (!product) throw new Error('no products')
      return {
        sourceId: query,
        entryType: GalleryEntryTypes.Shopify,
        genericType: 'shop',
        title: product?.vendor ?? 'Products',
        url: productsUrl(query, 0),
        image: product?.images[0]?.src,
      }
    } catch (err) {
      return []
    }
  },
  summarize: async (
    url: string,
    limit: number = 25,
  ): Promise<GalleryEntry & { items: GalleryEntryItemProduct[] }> => {
    const products = await raw.products(url, limit)
    const _url = new URL(url)
    const productItems = products.products.map((product: ShopifyProduct) => {
      return {
        sourceId: product.id.toString(),
        title: product.title,
        description: product.body_html?.replace(/\s\s\s+/, ' '),
        images: product.images.map((i) => i.src),
        url: `${sanitizeUrl(url)}/products/${product.handle}`,
        date: product.updated_at,
        detail: {
          variants: product.variants.map((variant) => {
            return {
              id: `${_url.hostname}-${product.id}-${variant.id}`,
              sourceId: `${variant.id}`,
              title: variant.title,
              url: `${sanitizeUrl(url)}/products/${product.handle}?variant=${
                variant.id
              }`,
              date: variant.updated_at,
              price: parseFloat(variant.price),
              available: variant.available,
            } as GalleryEntryItemProductVariant
          }),
        },
      } as GalleryEntryItemProduct
    })
    return {
      sourceId: url,
      title: products.products[0]?.vendor ?? 'Products',
      url: productsUrl(url, limit),
      entryType: GalleryEntryTypes.Shopify,
      genericType: 'shop',
      items: productItems,
    }
  },
} as TentkeepClient

export type ShopifyProduct = {
  id: number
  title: string
  handle: string
  body_html: string
  published_at: Date
  created_at: Date
  updated_at: Date
  vendor: string
  product_type: string
  tags: string[]
  variants: {
    id: number
    title: string
    option1: string | null
    option2: string | null
    option3: string | null
    sku: string
    requires_shipping: boolean
    taxable: boolean
    featured_image: string | null
    available: boolean
    price: string
    grams: number
    compare_at_price: any
    position: number
    product_id: number
    created_at: Date
    updated_at: Date
  }[]

  images: [
    {
      id: number
      created_at: Date
      position: number
      updated_at: Date
      product_id: number
      variant_ids: number[]
      src: string
      width: number
      height: number
    },
  ]
  options: {
    name: string
    position: number
    values: string[]
  }[]
}

export default {
  raw,
  ...contentClient,
}

function productsUrl(url: string, limit: number): string {
  const _url = new URL(url)
  if (!_url.pathname.endsWith('/products.json')) {
    _url.pathname = '/products.json'
  }
  if (limit) _url.searchParams.append('limit', limit.toString())
  return _url.toString()
}
