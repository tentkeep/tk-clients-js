import { describe, it } from 'vitest'
import clients from '../index.js'

const [_entryPoint, _file, arg] = process.argv
console.log('ARG', arg)

describe('debug', () => {
  it(
    'prints info',
    async () => {
      await rss().catch((err) => {
        console.error(err, err.response?.body)
      })
    },
    { timeout: 10000 },
  )
})

// OPTIONS BELOW

async function discourse() {
  return await clients
    .discourse('https://boards.thebootroots.com')
    // .runDataQuery(9, { username: 'jwilkey' }, { jsonKeys: [] })
    // .getTopic('154', { actingUsername: 'jwilkey', latestPosts: true })
    .Posts.find(154, [183, 511, 512], 'jwilkey')
    // .getPrivateMessages('system', { page: 1 })
    // .privateMessage(
    //   'bootroots',
    //   'devtestdubbadoo_1724861068463',
    //   'Test Msg_Access',
    //   'sent on ' + new Date().toISOString(),
    // )
    .then((res) => {
      print(res.post_stream.posts)
    })
}

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
  return clients.page.summary(arg as string).then(print)
}

function pageInfo() {
  return clients.page.info(arg as string).then(print)
}

function podcastSummary() {
  return clients.itunes.podcasts(arg as string).then(print)
}

function rss() {
  return clients.rss.feed('https://feeds.buzzsprout.com/804512.rss').then(print)
}

function wordpress() {
  return (
    clients.wordpress
      .host(arg as string)
      .summary()
      // .isWordpress()
      .then(print)
  )
}

function shopify() {
  return clients.shopify
}

function shopifyProductSummary() {
  return clients.shopify.summarize(arg as string).then(print)
}
function shopifyRaw() {
  return clients.shopify.raw.products(arg as string, 250).then(print)
}

function spotify() {
  return clients.spotify.searchPodcasts(arg).then(print)
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
  const channels = {
    trinityLinton: {
      channelId: 'UCkSIxqE14z-nX0f_Wy3JZEg',
      uploadsPlaylistId: 'UUkSIxqE14z-nX0f_Wy3JZEg',
    },
    justinRhodes: {
      channelId: 'UCOSGEokQQcdAVFuL_Aq8dlg',
      uploadsPlaylistId: 'UUOSGEokQQcdAVFuL_Aq8dlg',
    },
  }
  return (
    clients.youtube
      // .search('Justin Rhodes')
      .summarize(channels.justinRhodes.channelId, {
        updatedAfter: '2025-02-23',
      })
      // .playlist(channels.justinRhodes.uploadsPlaylistId)
      // .channels({
      //   id: channels.justinRhodes.channelId,
      //   part: 'snippet,contentDetails',
      // })
      .then(print)
  )
}

function print(result: any) {
  if (result) {
    try {
      return console.log(JSON.stringify(result, null, 2))
    } catch (error) {
      return console.log(result)
    }
  }
  console.log('empty result')
}
