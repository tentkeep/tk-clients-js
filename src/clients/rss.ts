import {
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { api } from '../api.js'
import { forKey } from '../shareable/common.js'
import { SummarizeOptions } from '../../index.js'

const flatten = (obj, keepAsArray, keyPath = '') => {
  forKey(obj, (k) => {
    const currentKeyPath = keyPath.length ? `${keyPath}.${k}` : k
    if (keepAsArray && keepAsArray.includes(currentKeyPath)) {
      obj[k].forEach((i) => flatten(i, keepAsArray, currentKeyPath))
    } else if (Array.isArray(obj[k])) {
      obj[k] = obj[k][0]
    }

    if (k === '$') {
      forKey(obj[k], (attributeKey) => {
        obj[`${k}${attributeKey}`] = obj[k][attributeKey]
      })
      delete obj[k]
    } else if (!Array.isArray(obj[k]) && typeof obj[k] === 'object') {
      flatten(obj[k], keepAsArray, currentKeyPath)
    }
  })
}

const flattenChannel = (channel) => {
  flatten(channel, ['item'])
}

const feed = (feedUrl): Promise<RSS> =>
  api(feedUrl)
    .then((result) => result.rss.channel[0])
    .then((channel) => {
      flattenChannel(channel)
      return channel
    })

const contentClient = {
  search: async (query: string) => {
    const podcast = await feed(query)
    return [
      {
        sourceId: query,
        entryType: GalleryEntryTypes.RSS,
        genericType: 'page',
        title: podcast.title,
        description: podcast.description,
        image: podcast.image?.url || podcast['itunes:image']?.['$href'],
        url: query,
      } as GalleryEntry,
    ]
  },
  /**
   * @param feedUrl - the feed url
   */
  summarize: (feedUrl: string, _options?: SummarizeOptions) =>
    feed(feedUrl).then((_feed) => {
      const { title, description, item } = _feed
      const image = _feed.image?.url || _feed['itunes:image']?.['$href']
      const pubDateComparator = (a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      }
      const recentItems = item.sort(pubDateComparator)
      console.log('RSS Feed with item count:', recentItems.length)

      return {
        sourceId: Buffer.from(feedUrl).toString('base64'),
        title,
        description,
        image,
        url: feedUrl,
        items: recentItems.map(
          (i) =>
            ({
              sourceId: Buffer.from(i.enclosure?.$url || i.link).toString(
                'base64',
              ),
              entryType: GalleryEntryTypes.RSS,
              genericType: 'page',
              title: i.title,
              description: i.description,
              url: i.enclosure?.$url || i.link,
              date: i.pubDate ? new Date(i.pubDate) : undefined,
              images: [image],
              detail: {
                pubDate: i.pubDate,
                author: i['itunes:author'] || i['dc:creator'],
                duration: i['itunes:duration'],
                length: i.enclosure?.$length,
                type: i.enclosure?.$type,
                content: i['content:encoded'],
              },
            }) as GalleryEntryItem,
        ),
      } as GalleryEntrySummary
    }),
}

export default {
  feed,
  ...contentClient,
}

type RSS = {
  title: string
  description: string
  link: string
  image?: {
    url?: string
    title?: string
    link?: string
  }
  generator?: string
  lastBuildDate: string
  pubDate: string
  'atom:link'?: {
    $href?: string
    $rel?: string
    $type?: string
  }
  author?: string
  copyright?: string
  language?: string
  'anchor:support'?: string
  'anchor:station'?: string
  'itunes:author'?: string
  'itunes:summary'?: string
  'itunes:type'?: string
  'itunes:owner'?: {
    'itunes:name'?: string
    'itunes:email'?: string
  }
  'itunes:explicit'?: string
  'itunes:category'?: { $text?: string }
  'itunes:image'?: {
    $href?: string
  }
  item: [
    {
      title: string
      description: string
      link: string
      guid?: string | { _: string }
      'dc:creator'?: string
      pubDate?: string
      'content:encoded'?: string
      enclosure?: {
        $url?: string
        $length?: string
        $type?: string
      }
      'itunes:summary'?: string
      'itunes:explicit'?: string
      'itunes:duration'?: string
      'itunes:image'?: {
        $href?: string
      }
      'itunes:season'?: string
      'itunes:episode'?: string
      'itunes:episodeType'?: string
    },
  ]
}
