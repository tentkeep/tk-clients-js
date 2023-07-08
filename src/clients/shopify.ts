import {
  GalleryEntry,
  GalleryEntryItemProduct,
  GalleryEntryTypes,
} from 'tentkeep'
import { sanitizeUrl } from '../shareable/common.js'
import api from '../api.js'
import { GalleryEntryItemProductVariant } from 'tentkeep/dist/src/types/tentkeep-types.js'

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

const productsSummary = async (
  url: string,
  limit: number = 25,
): Promise<GalleryEntry & { items: GalleryEntryItemProduct[] }> => {
  const products = await raw.products(url, limit)
  const _url = new URL(url)
  const productItems = products.products.map((product: ShopifyProduct) => {
    return {
      sourceId: product.id.toString(),
      title: productSummaryTitle(product),
      description: product.body_html.replace(/\s\s\s+/, ' '),
      image: product.images[0]?.src,
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
    sourceId: 'products.json',
    title: 'Products',
    url: productsUrl(url, limit),
    entryType: GalleryEntryTypes.Shopify,
    genericType: 'shop',
    items: productItems,
  }
}

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
  productsSummary,
}

function productsUrl(url: string, limit: number): string {
  const _url = new URL(url)
  if (!_url.pathname.endsWith('/products.json')) {
    _url.pathname = '/products.json'
  }
  _url.searchParams.append('limit', limit.toString())
  return _url.toString()
}

function productSummaryTitle(product: ShopifyProduct): string {
  return (
    product.title +
    (product.variants.length > 1 ? ` - ${product.variants[0]?.title}` : '')
  )
}
