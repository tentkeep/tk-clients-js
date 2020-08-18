const { api } = require('../api')
const host = 'https://openapi.etsy.com'
const apiKey = process.env.CLIENTS_ETSY_API_KEY

module.exports = {
  favorites: (userId) => api(
    `${host}/v2/users/${userId}/favorites/listings?api_key=${apiKey}`
  ),
  listing: (listingId) => api(
    `${host}/v2/listings/${listingId}?api_key=${apiKey}`
  ),
  listingImages: (listingId) => api(
    `${host}/v2/listings/${listingId}/images?api_key=${apiKey}`
  ),
}