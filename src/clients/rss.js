const api = require('../api')
const { forKey } = require('../shareable/common')

const flatten = (obj, keepAsArray, keyPath = '') => {
  forKey(obj, k => {
    const currentKeyPath = keyPath.length ? `${keyPath}.${k}` : k
    if (keepAsArray && keepAsArray.includes(currentKeyPath)) {
      obj[k].forEach(i => flatten(i, keepAsArray, currentKeyPath))
    }
    else if (Array.isArray(obj[k])) {
      obj[k] = obj[k][0]
    }
  
    if (k === '$') {
      console.log('Dollar sinz')
      forKey(obj[k], attributeKey => {
        obj[`${k}${attributeKey}`] = obj[k][attributeKey]
      })
      delete obj[k]
    }
    else if (!Array.isArray(obj[k]) && typeof obj[k] === 'object') {
      flatten(obj[k], keepAsArray, currentKeyPath)
    }
  })
}

const flattenChannel = (channel) => {
  flatten(channel, ['item'])
}

module.exports = {
  feed: (feedUrl) => api(feedUrl)
    .then(result => result.rss.channel[0])
    .then(channel => {
      flattenChannel(channel)
      return channel
    })
}