import { Item } from '../../index.js'
import { sanitizeUrl } from '../shareable/common.js'
import api from '../api.js'

const raw = {
  products: (
    url: string,
    limit: number = 250,
  ): Promise<{ products: ShopifyProduct[] }> =>
    api(`${sanitizeUrl(url)}/products.json?limit=${limit}`),
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
): Promise<ProductItem[]> => {
  const products = await raw.products(url, limit)
  return products.products.map((product) => ({
    sourceId: product.id.toString(),
    title: productSummaryTitle(product),
    description: product.body_html,
    url: `${sanitizeUrl(url)}/products/${product.handle}`,
    image: product.images[0]?.src,
    price: product.variants[0]?.price,
  }))
}

export type ProductItem = Item & {
  price?: string | number
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

function productSummaryTitle(product: ShopifyProduct): string {
  return (
    product.title +
    (product.variants.length > 1 ? ` - ${product.variants[0]?.title}` : '')
  )
}
