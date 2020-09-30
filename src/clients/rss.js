const { api } = require('../api')
const { forKey } = require('../shareable/common')

const flatten = (obj, keepAsArray, keyPath = '') => {
  forKey(obj, k => {
    const currentKeyPath = keyPath.length ? `${keyPath}.${k}` : k
    if (keepAsArray && keepAsArray.includes(currentKeyPath)) {
      obj[k].forEach(i => flatten(i, keepAsArray, currentKeyPath))
    } else if (Array.isArray(obj[k])) {
      obj[k] = obj[k][0]
    }

    if (k === '$') {
      forKey(obj[k], attributeKey => {
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

const feed = (feedUrl) => api(feedUrl)
  .then(result => result.rss.channel[0])
  .then(channel => {
    flattenChannel(channel)
    return channel
  })

module.exports = {
  feed,
  podcastSummary: (feedUrl) => feed(feedUrl)
    .then(podcast => {
      const { title, description, image, item } = podcast
      const pubDateComparator = (a, b) => { return new Date(b.pubDate) - new Date(a.pubDate) }
      const recentItems = item
        .sort(pubDateComparator)
      console.log('Podcast with episode count:', recentItems.length)

      return {
        sourceId: Buffer.from(feedUrl).toString('base64'),
        title,
        description,
        image: image.url,
        url: feedUrl,
        items: recentItems.map(i => ({
          sourceId: Buffer.from(i.enclosure.$url).toString('base64'),
          title: i.title,
          description: i.description,
          url: i.enclosure.$url,
          date: new Date(i.pubDate).toISOString(),
          pubDate: i.pubDate,
          author: i['itunes:author'],
          duration: i['itunes:duration'],
          length: i.enclosure.$length,
          type: i.enclosure.$type
        }))
      }
    })
}
