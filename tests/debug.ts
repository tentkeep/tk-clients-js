import clients from '../index.js'

const [_entryPoint, _file, arg] = process.argv
console.info(
  'OPTIONS',
  youtubeChannelSearch,
  pageSummary,
  pageInfo,
  googlePlaces,
  shopifyProductSummary,
)
console.log('ARG', arg)

shopifyProductSummary()

// OPTIONS BELOW

function pageSummary() {
  clients.page.summary(arg as string).then(print)
}

function pageInfo() {
  clients.page.info(arg as string).then(print)
}

function googlePlaces() {
  clients.google.searchPlaces(arg as string).then((result) => {
    print(result)
    if (result.length === 1) {
      console.log('Fetching Details...')
      clients.google.placeDetails(result[0]?.sourceId ?? '').then(print)
    }
  })
}

function shopifyProductSummary() {
  clients.shopify.productsSummary(arg as string, 5).then(print)
}

function youtubeChannelSearch() {
  clients.youtube
    .search({
      part: 'snippet,contentOwnerDetails',
      maxResults: 3,
      q: arg,
      type: 'channel',
    })
    .then(print)
}

function print(result: any) {
  console.log(JSON.stringify(result, null, 2))
}
