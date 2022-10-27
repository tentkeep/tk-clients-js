import { GalleryEntryItem, GalleryEntrySummary } from '../../index.js'
import { api } from '../api.js'
import { forKey } from '../shareable/common.js'
import { GalleryEntryItemTagSource } from './tentkeep.js'

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
  'search-results',
  'settings',
  'tags',
  'taxonomies',
  'themes',
  'users',
  'plugins',
]

export type WordpressOptions = { per_page?: number; include?: string }
export type WordpressResourceAPI = (options: WordpressOptions) => Promise<any>

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
  posts: WordpressResourceAPI
  postRevisions: WordpressResourceAPI
  postStatuses: WordpressResourceAPI
  postTypes: WordpressResourceAPI
  searchResults: WordpressResourceAPI
  settings: WordpressResourceAPI
  tags: WordpressResourceAPI
  taxonomies: WordpressResourceAPI
  themes: WordpressResourceAPI
  users: WordpressResourceAPI
  plugins: WordpressResourceAPI
}

const resourceMethods = (_host) =>
  resources.reduce((wordpress, resource) => {
    wordpress[toFunctionName(resource)] = (options: WordpressOptions) => {
      const id = typeof options === 'string' ? options : ''
      const url = new URL(`https://${_host}/wp-json/wp/v2/${resource}/${id}`)
      if (typeof options === 'object') {
        forKey(options, (k) => url.searchParams.append(k, options[k]))
      }
      return api(url)
    }
    return wordpress
  }, {} as WordpressResources)

export default {
  host: (_host: string) => ({
    ...resourceMethods(_host),
    async summary(): Promise<GalleryEntrySummary> {
      const postsBaseUrl = `https://${_host}/wp-json/wp/v2/posts`
      const posts = await resourceMethods(_host).posts({ per_page: 100 })
      const authorRefs: string[] = []
      const categoryRefs: string[] = []
      const tagRefs: string[] = []
      posts.forEach((p) => {
        authorRefs.push(p.author)
        categoryRefs.push(...(p.categories || []))
        tagRefs.push(...(p.tags || []))
      })
      const categoriesPromise = resourceMethods(_host).categories({
        per_page: 100,
        include: categoryRefs.join(','),
      })
      const tagsPromise = resourceMethods(_host).tags({
        per_page: 100,
        include: tagRefs.join(','),
      })
      const [categories, tags] = await Promise.all([
        categoriesPromise,
        tagsPromise,
      ])

      return {
        sourceId: Buffer.from(_host).toString('base64'),
        title: _host,
        url: _host,
        items: posts.map(
          (post) =>
            ({
              sourceId: Buffer.from(`${postsBaseUrl}/${post.id}-`).toString(
                'base64',
              ),
              title: extractPostTitle(post),
              description: extractPostDescription(post),
              entryType: 'wordpress',
              genericType: 'page',
              image: extractImageLink(post),
              url: post.link,
              date: new Date(post.date),
              postId: post.id,
              postDate: post.date,
              author: extractPostAuthor(post),
              tags: extractPostTags(post, categories, tags),
            } as GalleryEntryItem),
        ),
      }
    },
  }),
}

const toFunctionName = (resource) =>
  resource.replace(/-(.)/, (_, d) => d.toUpperCase())

function extractPostTitle(post: WordpressPost) {
  return (
    post.yoast_head_json?.title ||
    post.yoast_head_json?.og_title ||
    post.title?.rendered
  )
}

function extractPostDescription(post: WordpressPost) {
  return (
    post.yoast_head_json?.description ||
    post.yoast_head_json?.og_description ||
    post.excerpt?.rendered
  )
}

function extractImageLink(post: WordpressPost): string | undefined {
  return (
    post.yoast_head_json?.og_image?.[0].url ||
    post.featured_image_urls?.full?.[0] ||
    post.featured_image_urls?.medium?.[0] ||
    post.featured_image_urls?.large?.[0] ||
    (post.content?.rendered?.match(/img src="(.+?)"/) || [])[1]
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

type WordpressPost = {
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
  yoast_head?: string
  yoast_head_json?: {
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
}

type WordpressFeaturedImage = [
  url?: string,
  height?: number,
  width?: number,
  unknown_field?: boolean,
]
