const { api } = require('../api')
const { forKey } = require('../shareable/common')
const host = 'https://www.googleapis.com/youtube/v3'

const resources = [
  'channels', 'comments', 'playlists', 'search', 'videos'
]

const resourcesApi = resources.reduce((yt, resource) => {
  yt[resource] = (params = {}) => {
    const url = new URL(`${host}/${resource}`)
    forKey(params, k => url.searchParams.append(k, params[k]))
    return youtube(url)
  }
  return yt
}, {})

const playlist = (playlistId) => youtube(`${host}/playlistItems?playlistId=${playlistId}&part=snippet,contentDetails&maxResults=25`)

module.exports = {
  ...resourcesApi,
  channelForUser: (username) => youtube(`${host}/channels?forUsername=${username}&part=snippet,contentDetails`),
  playlistsForChannel: (channelId) => youtube(`${host}/playlists?channelId=${channelId}&part=snippet,contentDetails,player`),
  playlist,
  videosForPlaylist: (playlistId) => playlist(playlistId)
    .then(pl => pl.items.map(i => i.snippet.resourceId.videoId))
    .then(videoIds => resourcesApi.videos({ id: videoIds.join(','), part: 'snippet,contentDetails,player,statistics,topicDetails' }))
}

const youtube = (url, options) => {
  const apiKey = process.env.CLIENTS_GOOGLE_YOUTUBE_API_KEY
  const _url = url instanceof URL ? url : new URL(url)
  _url.searchParams.append('key', apiKey)
  return api(_url, options)
}
