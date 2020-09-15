const { api } = require('../api')
const host = 'https://openapi.etsy.com'

const getShop = shopId => etsy(
    `${host}/v2/shops/${shopId}`
)
const getShopWithListings = shopId => etsy(
    `${host}/v2/shops/${shopId}?includes=Listings:200/Images(url_170x135,url_570xN)`
)
const shopListings = (shopId, page = 1) => etsy(
    `${host}/v2/shops/${shopId}/listings/active?limit=100&includes=Images(url_170x135,url_570xN)&page=${page}`
)
const allShopListings = async shopId => {
  const listings = await shopListings(shopId)
  let nextPage = listings.pagination.next_page
  while (nextPage) {
    const next = await shopListings(shopId, nextPage)
    listings.results.push(...next.results)
    nextPage = next.pagination.next_page
    console.log(nextPage)
  }
  return listings
}

const listingImages = listingId => etsy(`${host}/v2/listings/${listingId}/images`)

module.exports = {
  favorites: (userId) => etsy(
    `${host}/v2/users/${userId}/favorites/listings`
  ),
  listing: (listingId) => etsy(
    `${host}/v2/listings/${listingId}`
  ),
  listingImages,
  userShops: userId => etsy(
    `${host}/v2/users/${userId}/shops`
  ),
  searchShops: name => etsy(`${host}/v2/shops?shop_name=${name}`),
  getShop,
  getShopWithListings,
  shopListings,
  allShopListings,
  shopSummary: async shopId => {
    const shop = (await getShop(shopId)).results[0]
    if (!shop) {
      throw new Error('Shop not found')
    }
    const listings = await allShopListings(shopId)
    return {
      shopId,
      title: shop.shop_name,
      description: shop.title,
      shopUrl: shop.url,
      shopImage: shop.icon_url_fullxfull,
      userId: shop.user_id,
      listings: listings.results.map(l => ({
        id: l.listing_id,
        title: l.title,
        description: l.description,
        price: l.price,
        currency: l.currency_code,
        tags: (l.tags || []).join('||'),
        url: l.url,
        views: l.views,
        customizable: l.is_customizable,
        digital: l.is_digital,
        images: l.Images
      }))
    }
  }
}

const etsy = (url, options) => {
  const apiKey = process.env.CLIENTS_ETSY_API_KEY
  const _url = url instanceof URL ? url : new URL(url)
  _url.searchParams.append('api_key', apiKey)
  return api(_url, options)
}
