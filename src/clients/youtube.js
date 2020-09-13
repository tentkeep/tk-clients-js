const { api } = require('../api')
const { forKey } = require('../shareable/common')
const host = 'https://www.googleapis.com/youtube/v3'

const resources = [
  'activities', 'channels', 'comments', 'playlists', 'playlistItems', 'search', 'videos', 'videoCategories'
]

const resourcesApi = resources.reduce((yt, resource) => {
  yt[resource] = (params = {}) => {
    const url = new URL(`${host}/${resource}`)
    forKey(params, k => url.searchParams.append(k, params[k]))
    return youtube(url)
  }
  return yt
}, {})

const playlist = (playlistId, opts = {}) =>
  resourcesApi.playlistItems(
    { playlistId, part: 'snippet,contentDetails', maxResults: 50, ...opts }
  )
const channelForUser = (username) =>
  youtube(`${host}/channels?forUsername=${username}&part=snippet,contentDetails`)
const playlistsForChannel = (channelId) =>
  youtube(`${host}/playlists?channelId=${channelId}&part=snippet,contentDetails,player&maxResults=50`)

const videosForPlaylist = (playlistId, opts = {}) => {
  return playlist(playlistId, opts) // 1 x #pages
    .then(pl => ({ nextPageToken: pl.nextPageToken, videoIds: pl.items.map(i => i.snippet.resourceId.videoId) }))
    .then(async ({ nextPageToken, videoIds }) => {
      const videos = await resourcesApi.videos({ id: videoIds.join(','), part: 'snippet,contentDetails,player,statistics,topicDetails' })
      return { videos, nextPageToken }
    }) // 1 x #pages
}
const allVideosForPlaylist = async (playlistId) => {
  const first = await playlist(playlistId)
  const videos = first.items
  let pageCount = 1
  let nextPageToken = first.nextPageToken
  while (nextPageToken) {
    const page = await playlist(playlistId, { pageToken: nextPageToken })
    videos.push(...page.items)
    pageCount++
    nextPageToken = page.nextPageToken
  }
  console.log(`All videos fetched from ${pageCount} pages.`)
  return videos
}

module.exports = {
  ...resourcesApi,
  channelSummary: async username => {
    const channelResponse = await channelForUser(username) // 1
    if (!channelResponse.items || channelResponse.items.length !== 1) {
      throw new Error('404')
    }
    const channel = channelResponse.items[0]
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads
    const [uploadedVideos, playlists] = await Promise.all([
      allVideosForPlaylist(uploadsPlaylistId),
      playlistsForChannel(channel.id)
    ])

    return {
      id: channel.id,
      title: channel.snippet.title,
      publishedAt: channel.snippet.publishedAt,
      thumbnail: channel.snippet.thumbnails.default,
      uploads: {
        id: uploadsPlaylistId,
        items: uploadedVideos.map(i => ({
          id: i.id,
          videoId: i.contentDetails.videoId,
          publishedAt: i.contentDetails.videoPublishedAt,
          title: i.snippet.title,
          description: i.snippet.description,
          thumbnail: i.snippet.thumbnails.high.url
          // kind: i.kind,
          // channelId: i.snippet.channelId,
          // channelTitle: i.snippet.channelTitle,
          // duration: i.contentDetails.duration, // requires video fetch
          // definition: i.contentDetails.definition, // requires video fetch
          // tags: (i.snippet.tags || []).join('||'), // requires video fetch
          // views: i.statistics.viewCount, // requires video fetch
          // likes: i.statistics.likeCount, // requires video fetch
          // dislikes: i.statistics.dislikeCount // requires video fetch
        }))
      },
      playlists: playlists.items.map(p => ({
        id: p.id,
        publishedAt: p.snippet.publishedAt,
        title: p.snippet.title,
        description: p.snippet.description,
        thumbnail: p.snippet.thumbnails.high.url,
        itemCount: p.contentDetails.itemCount
      }))
    }
  },
  channelForUser,
  playlistsForChannel,
  playlist,
  videosForPlaylist
}

const youtube = (url, options) => {
  const apiKey = process.env.CLIENTS_GOOGLE_YOUTUBE_API_KEY
  const _url = url instanceof URL ? url : new URL(url)
  _url.searchParams.append('key', apiKey)
  return api(_url, options)
}
