import { BootrootsAttribute } from './src/types/tentkeep-bootroots-claim.js'
import etsy from './src/clients/etsy.js'
import google from './src/clients/google.js'
import itunes from './src/clients/itunes.js'
import musickit from './src/clients/musickit.js'
import page, { PageSummary, PageInfo } from './src/clients/page.js'
import rss from './src/clients/rss.js'
import shopify, { ProductItem } from './src/clients/shopify.js'
import spotify from './src/clients/spotify.js'
import tentkeep from './src/clients/tentkeep.js'
import {
  DataDomain,
  GalleryEntryTypes,
  Gallery,
  GalleryEntry,
  GalleryEntrySummary,
  GalleryEntryPlace,
  GalleryEntryItem,
  GalleryEntrySeed,
  GalleryUser,
  GalleryAttribute,
  GalleryEntryGenericTypes,
} from './src/types/tentkeep-types.js'
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

export { PageSummary, PageInfo }
export { ProductItem }

// MARK: TENTKEEP
export { DataDomain as TKDataDomain }
export {
  BootrootsAttribute,
  Gallery,
  GalleryEntry,
  GalleryEntrySummary,
  GalleryEntryPlace,
  GalleryEntryItem,
  GalleryEntrySeed,
  GalleryEntryTypes,
  GalleryEntryGenericTypes,
  GalleryUser,
  GalleryAttribute,
}
