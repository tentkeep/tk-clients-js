const fetch = require('node-fetch')
const xml2js = require('xml2js')

const sanitizeOptions = options => {
  if (options) {
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }
  }
}

const statusChecker = async result => {
    if (result.status >= 400) {
      const message = await result.text()
      const error = new Error(message)
      error.status = result.status
      throw error
    } else {
      return result
    }
  } 

const parseContent = async result => {
  const contentType = result.headers.get('Content-Type')
  if (contentType.includes('application/json')) {
    return result.json()
  } else if (contentType.includes('xml')) {
    const text = await result.text()
    return xml2js.parseStringPromise(text)
  }
  return result
}

module.exports = (url, options) => {
  sanitizeOptions(options) 
  return fetch(url, options)
    .then(statusChecker)
    .then(parseContent)
}