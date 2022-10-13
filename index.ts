import etsy from './src/clients/etsy.js'
import google from './src/clients/google.js'
import itunes from './src/clients/itunes.js'
import musickit from './src/clients/musickit.js'
import rss from './src/clients/rss.js'
import spotify from './src/clients/spotify.js'
import wordpress from './src/clients/wordpress.js'
import youtube from './src/clients/youtube.js'

export const clients = {
  etsy,
  google,
  itunes,
  musickit,
  rss,
  spotify,
  wordpress,
  youtube,
}

export default clients

export type Item = {
  sourceId: string
  title: string
  description?: string
  image?: string
  url: string
}

export type Summary = Item & {
  userId?: string
  items: Item[]
}
