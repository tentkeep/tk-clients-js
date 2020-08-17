const api = require('../api')
const host = 'https://api.spotify.com'
const id = process.env.CLIENTS_SPOTIFY_CLIENT_ID
const secret = process.env.CLIENTS_SPOTIFY_CLIENT_SECRET
const authHeader = Buffer.from(`${id}:${secret}`).toString('base64')

const withAuth = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

module.exports = {
  token: () => api(
    `https://accounts.spotify.com/api/token`,
    {
      method: 'post',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    }
  ),
  me: (token) => api(
    `${host}/v1/me`,
    withAuth(token)
  ),
  searchArtists: (token, query) => api(
    `${host}/v1/search?q=${query}&type=artist`,
    withAuth(token)
  ),
  searchPlaylists: (token, query) => api(
    `${host}/v1/search?q=${query}&type=playlist`,
    withAuth(token)
  ),
  userPlaylists: (token, userId) => api(
    `${host}/v1/users/${userId}/playlists`,
    withAuth(token)
  )
}