import etsy from './src/clients/etsy.js'
import google, { Place } from './src/clients/google.js'
import itunes from './src/clients/itunes.js'
import musickit from './src/clients/musickit.js'
import page, { PageSummary, PageInfo } from './src/clients/page.js'
import rss from './src/clients/rss.js'
import shopify, { ProductItem } from './src/clients/shopify.js'
import spotify from './src/clients/spotify.js'
import tentkeep, {
  DataDomain,
  GalleryEntryTypes,
  Gallery,
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntrySeed,
  GalleryUser,
} from './src/clients/tentkeep.js'
import wordpress from './src/clients/wordpress.js'
import youtube from './src/clients/youtube.js'

import tentkeepLogic from './src/logic/l-tentkeep.js'

export const clients = {
  etsy,
  google,
  itunes,
  musickit,
  page,
  rss,
  shopify,
  spotify,
  tentkeep,
  wordpress,
  youtube,
}

export default clients

export const logic = {
  tentkeep: tentkeepLogic,
}

export type Item = {
  sourceId: string
  title: string
  description?: string
  image?: string
  url?: string
  date?: Date
}

export type Summary = Item & {
  userId?: string
  items: Item[]
}

export { Place }
export { PageSummary, PageInfo }
export { ProductItem }

// MARK: TENTKEEP
export { DataDomain as TKDataDomain }
export {
  Gallery,
  GalleryEntry,
  GalleryEntryItem,
  GalleryEntrySeed,
  GalleryEntryTypes,
  GalleryUser,
}
