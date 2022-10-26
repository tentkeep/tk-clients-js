import clients, { TKDataDomain } from '../index.js'

const [_entryPoint, _file, arg] = process.argv
console.info(
  'OPTIONS',
  googlePlaces,
  musickit,
  pageSummary,
  pageInfo,
  podcastSummary,
  shopifyProductSummary,
  spotify,
  tentkeep,
  youtube,
)
console.log('ARG', arg)

youtube()

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

function musickit() {
  clients.musickit.searchArtists('True Words').then(print)
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
    .tentkeep(TKDataDomain.Bootroots)
    .searchYoutubeChannels('azurestandard.com')
    .then(print)
  // clients.tentkeep(2).getGalleries().then(print)
}

function youtube() {
  clients.youtube
    .channelSummary({
      username: undefined,
      channelId: 'UCkSIxqE14z-nX0f_Wy3JZEg',
    })
    .then(print)
}

function print(result: any) {
  console.log(JSON.stringify(result, null, 2))
}
