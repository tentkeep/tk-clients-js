import {
  GalleryEntryItem,
  GalleryEntrySummary,
  GalleryEntryTypes,
} from '@tentkeep/tentkeep'
import { api } from '../api.js'
import { forKey } from '../shareable/common.js'
import { TentkeepClient } from './tentkeep-client.js'

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
        entryType: GalleryEntryTypes.Podcast,
        genericType: 'podcast',
        title: podcast.title,
        description: podcast.description,
        image: podcast.image.url,
        url: query,
      },
    ]
  },
  /**
   * @param feedUrl - the feed url
   */
  summarize: (feedUrl: string) =>
    feed(feedUrl).then((podcast) => {
      const { title, description, image, item } = podcast
      const pubDateComparator = (a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      }
      const recentItems = item.sort(pubDateComparator)
      console.log('Podcast with episode count:', recentItems.length)

      return {
        sourceId: Buffer.from(feedUrl).toString('base64'),
        title,
        description,
        image: image.url,
        url: feedUrl,
        items: recentItems.map(
          (i) =>
            ({
              sourceId: Buffer.from(i.enclosure.$url).toString('base64'),
              entryType: GalleryEntryTypes.Podcast,
              genericType: 'podcast',
              title: i.title,
              description: i.description,
              url: i.enclosure.$url,
              date: new Date(i.pubDate),
              images: [image.url],
              detail: {
                pubDate: i.pubDate,
                author: i['itunes:author'],
                duration: i['itunes:duration'],
                length: i.enclosure.$length,
                type: i.enclosure.$type,
              },
            } as GalleryEntryItem),
        ),
      } as GalleryEntrySummary
    }),
} as TentkeepClient

export default {
  feed,
  ...contentClient,
}

type RSS = {
  title: string
  description: string
  link: string
  image: {
    url: string
    title: string
    link: string
  }
  generator: string
  lastBuildDate: string
  'atom:link': {
    $href: string
    $rel: string
    $type: string
  }
  author: string
  copyright: string
  language: string
  'anchor:support': string
  'anchor:station': string
  'itunes:author': string
  'itunes:summary': string
  'itunes:type': string
  'itunes:owner': {
    'itunes:name': string
    'itunes:email': string
  }
  'itunes:explicit': string
  'itunes:category': { $text: string }
  'itunes:image': {
    $href: string
  }
  item: [
    {
      title: string
      description: string
      link: string
      guid: { _: string }
      'dc:creator': string
      pubDate: string
      enclosure: {
        $url: string
        $length: string
        $type: string
      }
      'itunes:summary': string
      'itunes:explicit': string
      'itunes:duration': string
      'itunes:image': {
        $href: string
      }
      'itunes:season': string
      'itunes:episode': string
      'itunes:episodeType': string
    },
  ]
}
