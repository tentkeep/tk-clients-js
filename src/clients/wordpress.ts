import {
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntryItemProduct,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { api } from '../api.js'
import { forKey, sanitizeUrl } from '../shareable/common.js'
import { GalleryEntryItemTagSource } from '@tentkeep/tentkeep'
import { TentkeepClient } from './tentkeep-client.js'

const resources = [
  'block-types',
  'blocks',
  'block-revisions',
  'rendered-blocks',
  'block-directory-items',
  'categories',
  'comments',
  'media',
  'pages',
  'page-revisions',
  'posts',
  'post-revisions',
  'post-statuses',
  'post-types',
  'product',
  'search-results',
  'settings',
  'tags',
  'taxonomies',
  'themes',
  'users',
  'plugins',
]

export type WordpressOptions = {
  per_page?: number
  page?: number
  include?: string
  _embed?: string
}
export type WordpressResourceAPI<T = Record<string, any>> = (
  options: WordpressOptions,
) => Promise<T[]>

export interface WordpressResources {
  blockTypes: WordpressResourceAPI
  blocks: WordpressResourceAPI
  blockRevisions: WordpressResourceAPI
  renderedBlocks: WordpressResourceAPI
  blockDirectoryItems: WordpressResourceAPI
  categories: WordpressResourceAPI
  comments: WordpressResourceAPI
  media: WordpressResourceAPI
  pages: WordpressResourceAPI
  pageRevisions: WordpressResourceAPI
  posts: WordpressResourceAPI<WordpressPost>
  postRevisions: WordpressResourceAPI
  postStatuses: WordpressResourceAPI
  postTypes: WordpressResourceAPI
  product: WordpressResourceAPI<WordpressProduct>
  searchResults: WordpressResourceAPI
  settings: WordpressResourceAPI
  tags: WordpressResourceAPI
  taxonomies: WordpressResourceAPI
  themes: WordpressResourceAPI
  users: WordpressResourceAPI
  plugins: WordpressResourceAPI
}

const resourceMethods = (site: string) =>
  resources.reduce((wordpress, resource) => {
    wordpress[toFunctionName(resource)] = (options?: WordpressOptions) => {
      const id = typeof options === 'string' ? options : ''

      const _url = site.startsWith('http') ? site : `https://${site}`
      const url = new URL(`${_url}/wp-json/wp/v2/${resource}/${id}`)
      if (typeof options === 'object') {
        forKey(options, (k) => url.searchParams.append(k, options[k]))
      }
      return api(url)
    }
    return wordpress
  }, {} as WordpressResources)

const host = (_host: string) => {
  const url = sanitizeUrl(_host)
  const resources = resourceMethods(url)
  return {
    ...resources,
    async isWordpress(): Promise<boolean> {
      return resources
        .posts({ per_page: 1 })
        .then((posts) => posts.length === 1)
        .catch((_err) => false)
    },
    hasProducts() {
      return resources
        .product({ per_page: 1 })
        .then((posts) => posts.length === 1)
        .catch((_err) => false)
    },
    async summary(limit: number = 100): Promise<GalleryEntrySummary> {
      const posts = await resources.posts({ per_page: limit })
      const authorRefs: number[] = []
      const categoryRefs: number[] = []
      const tagRefs: string[] = []
      posts.forEach((p) => {
        if (p.author) authorRefs.push(p.author)
        categoryRefs.push(...(p.categories || []))
        tagRefs.push(...(p.tags || []))
      })
      const categoriesPromise = resources
        .categories({
          per_page: 100,
          include: categoryRefs.join(','),
        })
        .catch((e) => {
          console.error('Failed to fetch Wordpress categories', url, e.message)
          return []
        })
      const tagsPromise = resources
        .tags({
          per_page: 100,
          include: tagRefs.join(','),
        })
        .catch((e) => {
          console.error('Failed to fetch Wordpress tags', url, e.message)
          return []
        })
      let categories: any[] = [],
        tags: any[] = []
      try {
        const [_categories, _tags] = await Promise.all([
          categoriesPromise,
          tagsPromise,
        ])
        categories = _categories
        tags = _tags
      } catch (err) {
        console.error('Failed to fetch Wordpress categories or tags', err)
      }

      return {
        sourceId: url,
        title: posts[0]?.yoast_head_json?.og_site_name || url,
        url: url,
        items: posts.map(
          (post) =>
            ({
              sourceId: post.id.toString(),
              title: extractTitle(post),
              description: extractDescription(post),
              entryType: GalleryEntryTypes.Wordpress,
              genericType: 'page',
              images: [extractImageLink(post)],
              url: post.link,
              date: post.date ? new Date(post.date) : undefined,
              postId: post.id,
              postDate: post.date,
              author: extractPostAuthor(post),
              tags: extractPostTags(post, categories, tags),
            } as GalleryEntryItem),
        ),
      }
    },
  }
}

const commerce = {
  summarize: async (siteUrl: string): Promise<GalleryEntrySummary> => {
    const url = sanitizeUrl(siteUrl)

    function mapProduct(product: WordpressProduct): GalleryEntryItemProduct {
      const image = extractProductImage(product)

      return {
        entryType: GalleryEntryTypes.WordpressCommerce,
        genericType: 'shop',
        sourceId: product.id.toString(),
        title: extractTitle(product),
        url: product.link ?? '',
        description: extractDescription(product),
        images: image ? [image] : [],
        detail: {
          variants: [],
        },
      }
    }

    const post = (await host(url).posts({ per_page: 1 }))[0]

    const productOptions = { per_page: 100, _embed: 'wp:featuredmedia' }
    const products = await host(url)
      .product(productOptions)
      .then((products) => products.map(mapProduct))

    let page = products.length <= 100 ? -1 : 2
    while (page > 0) {
      const _products = await host(url).product(productOptions)
      products.push(..._products.map(mapProduct))
      page = _products.length <= 100 ? -1 : 2
    }

    return {
      sourceId: url,
      title: post?.yoast_head_json?.og_site_name || url,
      url: url,
      entryType: GalleryEntryTypes.WordpressCommerce,
      genericType: 'shop',
      items: products,
    }
  },
}

export default {
  search: async (query: string) => {
    try {
      const url = sanitizeUrl(query)

      const results: GalleryEntry[] = []

      const postsPromise = resourceMethods(url)
        .posts({
          per_page: 1,
        })
        .then((posts) => {
          const post = posts[0]
          if (!post) return

          results.push({
            sourceId: url,
            entryType: GalleryEntryTypes.Wordpress,
            genericType: 'page',
            title: (post?.yoast_head_json?.og_site_name || url) + ' - Posts',
            url: url,
            image: extractImageLink(post),
          })
        })

      const productsPromise = resourceMethods(url)
        .product({
          per_page: 1,
          _embed: 'wp:featuredmedia',
        })
        .then((products) => {
          const product = products[0]
          if (!product) return

          const _url = new URL(url)
          _url.searchParams.append('post_type', 'product')

          results.push({
            sourceId: _url.toString(),
            entryType: GalleryEntryTypes.WordpressCommerce,
            genericType: 'shop',
            title:
              (product?.yoast_head_json?.og_site_name || url) + ' - Products',
            url: _url.toString(),
            image: extractProductImage(product),
          })
        })

      await Promise.all([postsPromise, productsPromise])

      return results
    } catch (err) {
      return []
    }
  },
  summarize: (siteUrl: string) => host(siteUrl).summary(),
  commerce,
  host,
} as TentkeepClient & { host: typeof host; commerce: typeof commerce }

const toFunctionName = (resource) =>
  resource.replace(/-(.)/, (_, d) => d.toUpperCase())

function extractProductImage(product: WordpressProduct) {
  const imageSizes =
    product?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes
  const image =
    imageSizes?.medium_large?.source_url ??
    imageSizes?.large?.source_url ??
    imageSizes?.full?.source_url
  return image
}

function extractTitle(resource: {
  yoast_head_json?: { title?; og_title? }
  title?
}) {
  return (
    resource.yoast_head_json?.title ||
    resource.yoast_head_json?.og_title ||
    resource.title?.rendered
  )
}

function extractDescription(resource: {
  yoast_head_json?: { description?; og_description? }
  excerpt?: { rendered? }
}) {
  return (
    resource.yoast_head_json?.description ||
    resource.yoast_head_json?.og_description ||
    resource.excerpt?.rendered
  )
}

function extractImageLink(post: WordpressPost): string | undefined {
  return (
    post.yoast_head_json?.og_image?.[0].url ||
    post.featured_image_urls?.full?.[0] ||
    post.featured_image_urls?.medium?.[0] ||
    post.featured_image_urls?.large?.[0] ||
    (post.content?.rendered?.match(/img[^>]*src=\\?"(.+?)\\?"/) || [])[1]
  )
}

function extractPostAuthor(post: WordpressPost): string | undefined {
  return post.yoast_head_json?.author || post.author_info?.name || ''
}

function extractPostTags(
  post: WordpressPost,
  categories: any[],
  wTags: any[],
): Record<string, GalleryEntryItemTagSource> {
  let tags: Record<string, GalleryEntryItemTagSource> = {}
  post.categories?.forEach((c) => {
    const tag: string | undefined = categories
      .find((cat) => cat.id === c)
      ?.name?.toLowerCase()
    if (tag) tags[tag] = GalleryEntryItemTagSource.Source
  })
  post.tags?.forEach((t) => {
    const tag: string | undefined = wTags
      .find((tag) => tag.id === t)
      ?.name?.toLowerCase()
    if (tag) tags[tag] = GalleryEntryItemTagSource.Source
  })
  return tags
}

// TYPES -------

type WordpressBase = WordpressEmbed & {
  id: number
  date?: Date
  date_gmt?: Date
  guid?: {
    rendered?: string
  }
  modified?: Date
  modified_gmt?: Date
  slug?: string
  status?: string
  type?: string
  link?: string
  title?: {
    rendered?: string
  }
  content?: {
    rendered?: string
    protected?: boolean
  }
  excerpt?: {
    rendered?: string
    protected?: boolean
  }
  yoast_head?: string
  yoast_head_json?: Yoast
}

type WordpressPost = WordpressBase & {
  author?: number
  featured_media?: number
  comment_status?: string
  ping_status?: string
  sticky?: boolean
  template?: string
  format?: string
  meta?: {
    _mo_disable_npp?: ''
    'disable-jtr'?: false
    _genesis_hide_title?: false
    _genesis_hide_breadcrumbs?: false
    _genesis_hide_singular_image?: false
    _genesis_hide_footer_widgets?: false
    _genesis_custom_body_class?: ''
    _genesis_custom_post_class?: ''
    _genesis_layout?: ''
  }
  categories?: number[]
  tags?: any[]
  acf?: any[]
  featured_image_urls?: {
    full?: WordpressFeaturedImage
    thumbnail?: WordpressFeaturedImage
    medium?: WordpressFeaturedImage
    medium_large?: WordpressFeaturedImage
    large?: WordpressFeaturedImage
    '1536x1536'?: WordpressFeaturedImage
    '2048x2048'?: WordpressFeaturedImage
    'featured-thumb'?: WordpressFeaturedImage
  }
  post_excerpt_stackable?: string
  category_list?: string
  author_info?: {
    name?: string
    url?: string
  }
  comments_num?: string
}

type WordpressFeaturedImage = [
  url?: string,
  height?: number,
  width?: number,
  unknown_field?: boolean,
]

type MediaDetailSize = {
  file: string
  width: number
  height: number
  uncropped: boolean
  mime_type: string
  source_url: string
}

type WordpressMedia = {
  id: number
  date?: Date
  slug?: string
  type?: string
  link?: string
  title?: {
    rendered?: string
  }
  author?: number
  jetpack_sharing_enabled?: boolean
  jetpack_shortlink?: string
  caption?: { rendered?: string }
  alt_text?: string
  media_type?: string
  mime_type?: string
  media_details?: {
    width?: number
    height?: number
    file?: string
    sizes?: {
      woocommerce_thumbnail?: MediaDetailSize
      woocommerce_gallery_thumbnail?: MediaDetailSize
      woocommerce_single?: MediaDetailSize
      thumbnail?: MediaDetailSize
      medium?: MediaDetailSize
      medium_large?: MediaDetailSize
      large?: MediaDetailSize
      shop_catalog?: MediaDetailSize
      shop_single?: MediaDetailSize
      shop_thumbnail?: MediaDetailSize
      full?: MediaDetailSize
    }
    image_meta?: {
      aperture?: string
      credit?: string
      camera?: string
      caption?: string
      created_timestamp?: string
      copyright?: string
      focal_length?: string
      iso?: string
      shutter_speed?: string
      title?: string
      orientation?: string
      keywords?: string[]
    }
  }
  source_url?: string
  _links?: {
    self?: [{ href?: string }]
    collection?: [{ href?: string }]
    about?: [{ href?: string }]
    author?: [{ embeddable?: boolean; href?: string }]
    replies?: [{ embeddable?: boolean; href?: string }]
  }
}

type WordpressEmbed = {
  _embedded?: {
    'wp:featuredmedia'?: WordpressMedia[]
  }
}

type Yoast = {
  title?: string
  description?: string
  robots?: {
    index?: 'index'
    follow?: 'follow'
    'max-snippet'?: 'max-snippet?:-1'
    'max-image-preview'?: 'max-image-preview?:large'
    'max-video-preview'?: 'max-video-preview?:-1'
  }
  canonical?: string
  og_locale?: string
  og_type?: string
  og_title?: string
  og_description?: string
  og_url?: string
  og_site_name?: string
  article_publisher?: string
  article_published_time?: Date
  article_modified_time?: Date
  og_image?: [
    {
      width?: number
      height?: number
      url?: string
      type?: string
    },
  ]
  author?: string
  twitter_card?: string
  twitter_creator?: string
  twitter_site?: string
  twitter_misc?: Record<string, string>
}

type WordpressProduct = WordpressBase & {
  featured_media: number
  template: string
  meta: {
    jetpack_post_was_ever_published: boolean
    jetpack_publicize_message: string
    jetpack_is_tweetstorm: boolean
    jetpack_publicize_feature_enabled: boolean
    jetpack_social_post_already_shared: boolean
    jetpack_social_options: {
      image_generator_settings: { template: string; enabled: boolean }
    }
  }
  product_cat: [number]
  product_tag: [number]
  jetpack_publicize_connections: []
  jetpack_sharing_enabled: boolean
  _links: {
    self: [{ href: string }]
    collection: [{ href: string }]
    about: [{ href: string }]
    'wp:featuredmedia': [{ embeddable: boolean; href: string }]
    'wp:attachment': [{ href: string }]
    'wp:term': { taxonomy: string; embeddable: boolean; href: string }[]
    curies: { name: string; href: string; templated: boolean }[]
  }
}
