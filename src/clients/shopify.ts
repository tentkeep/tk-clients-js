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
    page: number = 1,
  ): Promise<{ products: ShopifyProduct[] }> =>
    api(productsUrl(url, limit, page)),
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
      const { products } = await raw.products(query, 3)
      const product = products[0]
      if (!product) throw new Error('no products')
      return [
        {
          sourceId: query,
          entryType: GalleryEntryTypes.Shopify,
          genericType: 'shop',
          title: product?.vendor ?? 'Products',
          url: productsUrl(query, 0),
          image:
            product?.images[0]?.src ??
            products[1]?.images[0]?.src ??
            products[2]?.images[0]?.src,
        },
      ]
    } catch (err) {
      return []
    }
  },
  summarize: async (
    url: string,
  ): Promise<GalleryEntry & { items: GalleryEntryItemProduct[] }> => {
    const limit = 250
    const _url = new URL(url)
    let title = _url.host
    const items: GalleryEntryItemProduct[] = []

    let page = 1
    while (page > 0) {
      await raw.products(url, limit, page).then((response) => {
        page = response.products.length === 0 ? -1 : page + 1

        title = response.products[0]?.vendor ?? 'Products'

        const mappedItems = response.products.map((product) =>
          mapToGalleryEntryItem(product, url, _url),
        )
        items.push(...mappedItems)
      })
    }

    return {
      sourceId: url,
      title,
      url: productsUrl(url, limit),
      entryType: GalleryEntryTypes.Shopify,
      genericType: 'shop',
      items,
    }
  },
} as TentkeepClient<{ limit: number }>

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

function productsUrl(url: string, limit: number, page: number = 1): string {
  const u = url.startsWith('http') ? url : `https://${url}`
  const _url = new URL(u)
  if (!_url.pathname.endsWith('/products.json')) {
    _url.pathname = '/products.json'
  }
  if (limit) _url.searchParams.append('limit', limit.toString())
  _url.searchParams.append('page', page.toString())
  return _url.toString()
}

function productUrl(url: string, product: ShopifyProduct) {
  let _url = url
  if (url.includes('/products.json')) {
    _url = url.split('/products.json')[0] as string
  }
  return `${sanitizeUrl(_url)}/products/${product.handle}`
}

const mapToGalleryEntryItem = (
  product: ShopifyProduct,
  url: string,
  _url: URL,
) => {
  return {
    sourceId: product.id.toString(),
    title: product.title,
    entryType: GalleryEntryTypes.Shopify,
    genericType: 'shop',
    description: product.body_html?.replace(/\s\s\s+/, ' '),
    images: product.images.map((i) => i.src),
    url: productUrl(url, product),
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
}
