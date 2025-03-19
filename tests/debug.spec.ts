import { describe, it } from 'vitest'
import clients from '../index.js'
import fs from 'fs'
import got from 'got'

const [_entryPoint, _file, arg] = process.argv
console.log('ARG', arg)

describe('debug', () => {
  it(
    'prints info',
    async () => {
      await pageSummary().catch((err) => {
        console.error(err, err.response?.body)
      })
    },
    { timeout: 15 * 60 * 1000 },
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

function pageSummary(url: string) {
  return clients.page.summary(url, { textContent: true }).then((res) => {
    fs.appendFileSync(
      'temp/pageSummary.json',
      JSON.stringify(
        { url, title: res.title, content: res.textContent },
        null,
        2,
      ) + ',\n',
    )
  })
}

function pageInfo() {
  return clients.page.summary('https://www.farmerspal.com').then(print)
}

function podcastSummary() {
  return clients.itunes.podcasts(arg as string).then(print)
}

function rss() {
  return clients.rss.feed('https://feeds.buzzsprout.com/804512.rss').then(print)
}

function shopify() {
  return clients.shopify
}

function shopifyProductSummary() {
  return clients.shopify
    .summarize('https://grocefamilyfarm.com', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    .then(print)
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

function wordpress() {
  return (
    clients.wordpress
      .host('https://realorganicproject.org')
      .summary()
      // .isWordpress()
      .then((res) => {
        print(res)
      })
  )
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

function wait(seconds: number) {
  return new Promise((res) => setTimeout(res, seconds * 1000))
}

function runQueue(
  concurrentOperations: number,
  items: any[],
  callback: (item: any) => Promise<any>,
) {
  let queueIndex = -1
  let completedCount = 0

  return new Promise((resolve) => {
    for (let i = 0; i < Math.min(concurrentOperations, items.length); i++) {
      queue()
    }

    function queue() {
      queueIndex++
      const item = items[queueIndex]
      console.log(`${queueIndex}. STARTED`)
      callback(item).finally(() => {
        completedCount++
        const percent = ((completedCount / items.length) * 100).toFixed(1)
        console.log(`>> Item ${completedCount}/${items.length} - ${percent}%`)
        if (completedCount < items.length) {
          queue()
        } else {
          resolve(true)
        }
      })
    }
  })
    .then(() => {
      console.log('UpdateQueue done', queueIndex)
    })
    .catch((err) => {
      console.error('Top Level Error', err)
    })
}
