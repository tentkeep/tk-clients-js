import etsy from './src/clients/etsy'
import itunes from './src/clients/itunes'
import musickit from './src/clients/musickit'
import rss from './src/clients/rss'
import spotify from './src/clients/spotify'
import wordpress from './src/clients/wordpress'
import youtube from './src/clients/youtube'

export const clients = {
  etsy,
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
