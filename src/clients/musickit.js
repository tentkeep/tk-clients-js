const { api } = require('../api')
const host = 'https://api.music.apple.com'
const jwt = require('jsonwebtoken')

module.exports = {
  searchArtists: term => music(`/v1/catalog/us/search?term=${term}&limit=25&types=artists,albums`),
  getArtist: artistId => music(`/v1/catalog/us/artists/${artistId}?include=albums,songs`),
  getArtistAlbums: artistId => music(`/v1/catalog/us/artists/${artistId}/albums?include=tracks`),
  getAlbum: albumId => music(`/v1/catalog/us/albums/${albumId}`),
  getAlbums: albumIds => music(`/v1/catalog/us/albums?ids=${albumIds.join(',')}`)
}

const music = (path) => {
  const _url = `${host}${path}`
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return api(_url, options)
}

const privateKey = Buffer.from(process.env.CLIENTS_APPLE_MUSIC_KIT_PRIVATE_KEY, 'base64').toString('utf-8')
const token = jwt.sign({}, privateKey, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: process.env.CLIENTS_APPLE_MUSIC_KIT_TEAM_ID,
  header: {
    alg: 'ES256',
    kid: process.env.CLIENTS_APPLE_MUSIC_KIT_KEY_ID
  }
})
