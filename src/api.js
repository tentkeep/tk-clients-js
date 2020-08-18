const fetch = require('node-fetch')
const xml2js = require('xml2js')

const sanitizeOptions = options => {
  if (options) {
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }
  }
}

class ApiStatusError extends Error {
  constructor (status, bodyText) {
    super(bodyText)
    this.status = status
    this.bodyText = bodyText
  }
}

const statusChecker = async result => {
  if (result.status >= 400) {
    const bodyText = await result.text()
    throw new ApiStatusError(result.status, bodyText)
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

module.exports = {
  api: (url, options) => {
    sanitizeOptions(options)
    return fetch(url, options)
      .then(statusChecker)
      .then(parseContent)
  },
  ApiStatusError
}
