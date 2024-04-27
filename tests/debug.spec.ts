import { describe, it } from 'vitest'
import clients from '../index.js'
import shopifyFixture from './fixtures/shopify-products.json'

const [_entryPoint, _file, arg] = process.argv
console.log('ARG', arg)

describe('debug', () => {
  it(
    'prints info',
    async () => {
      await clients
        .discourse('https://boards.thebootroots.com')
        .runDataQuery(4, { key: 'qL961SqMjS' })
        .then(print)
        .catch((err) => {
          console.error(err, '\n---', err.response?.body)
        })
    },
    { timeout: 35000 },
  )
})

// OPTIONS BELOW

function googlePlaces() {
  clients.google.search(arg as string).then((result) => {
    print(result)
    if (result.length === 1) {
      console.log('Fetching Details...')
      clients.google.placeDetails(result[0]?.sourceId ?? '').then(print)
    }
  })
}

function musickit() {
  return clients.musickit.search('True Words').then(print)
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

function wordpress() {
  clients.wordpress
    .host(arg as string)
    .summary()
    // .isWordpress()
    .then(print)
}

function shopifyProductSummary() {
  clients.shopify.summarize(arg as string).then(print)
}
function shopifyRaw() {
  clients.shopify.raw.products(arg as string, 250).then(print)
}

function spotify() {
  clients.spotify.searchPodcasts(arg).then(print)
}

function tentkeep() {
  // tk(TKDataDomain.Bootroots, {
  //   baseUrl: 'http://localhost:3749/v1',
  //   api: api,
  // })
  // // .getGalleries()
  // // .searchYoutubeChannels(arg as string)
  // // .getWordpressPostsSummary(arg as string, 3)
  // .getGalleriesNearby('40207', { miles: 60, limit: 5 })
  // .then(print)
}

function youtube() {
  clients.youtube
    .playlist('UUkSIxqE14z-nX0f_Wy3JZEg')
    // .channels({
    //   id: 'UCkSIxqE14z-nX0f_Wy3JZEg',
    //   part: 'snippet,contentDetails',
    // })
    // .channelSummary({
    //   username: undefined,
    //   channelId: 'UCkSIxqE14z-nX0f_Wy3JZEg',
    // })
    .then(print)
}

function print(result: any) {
  console.log(JSON.stringify(result, null, 2))
}
