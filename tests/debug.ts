import clients from '../index.js'

const [_entryPoint, _file, arg] = process.argv
console.info(
  'OPTIONS',
  googlePlaces,
  pageSummary,
  pageInfo,
  podcastSummary,
  shopifyProductSummary,
  spotify,
  tentkeep,
  youtubeChannelSearch,
)
console.log('ARG', arg)

podcastSummary()

// OPTIONS BELOW

function googlePlaces() {
  clients.google.searchPlaces(arg as string).then((result) => {
    print(result)
    if (result.length === 1) {
      console.log('Fetching Details...')
      clients.google.placeDetails(result[0]?.sourceId ?? '').then(print)
    }
  })
}

function pageSummary() {
  clients.page.summary(arg as string).then(print)
}

function pageInfo() {
  clients.page.info(arg as string).then(print)
}

function podcastSummary() {
  clients.itunes.podcasts(arg as string).then(print)
}

function shopifyProductSummary() {
  clients.shopify.productsSummary(arg as string, 5).then(print)
}

function spotify() {
  clients.spotify.searchPodcasts(arg).then(print)
}

function tentkeep() {
  clients
    .tentkeep(2)
    .getPageInfo(arg as string)
    .then(print)
  // clients.tentkeep(2).getGalleries().then(print)
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
