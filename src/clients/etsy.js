const { api } = require('../api')
const host = 'https://openapi.etsy.com'

module.exports = {
  favorites: (userId) => etsy(
    `${host}/v2/users/${userId}/favorites/listings`
  ),
  listing: (listingId) => etsy(
    `${host}/v2/listings/${listingId}`
  ),
  listingImages: (listingId) => etsy(
    `${host}/v2/listings/${listingId}/images`
  )
}

const etsy = (url, options) => {
  const apiKey = process.env.CLIENTS_ETSY_API_KEY
  const _url = url instanceof URL ? url : new URL(url)
  _url.searchParams.append('api_key', apiKey)
  return api(_url, options)
}
