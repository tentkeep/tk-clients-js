export type Gallery = {
  id?: number
  title?: string
  description?: string
  createdBy?: number
  tinyImage?: string
  url?: string
  image?: string
  attributes?: GalleryAttribute[]
  createdAt?: Date
  modifiedAt?: Date
}
export type GalleryEntryGenericTypes =
  | 'shop'
  | 'music'
  | 'podcast'
  | 'page'
  | 'place'
  | 'video'
export type GalleryEntry = {
  id?: number
  galleryId?: number
  createdBy?: number
  entryType?: GalleryEntryTypes
  genericType?: GalleryEntryGenericTypes
  sourceId?: string
  title?: string
  description?: string
  image?: string
  url?: string
  detail?: any
  createdAt?: Date
  modifiedAt?: Date
}
export type GalleryEntrySummary = GalleryEntry & { items: GalleryEntryItem[] }
export type GalleryEntryPlace = GalleryEntry & {
  detail?: GalleryEntryDetailPlace
}
export type GalleryEntryDetailPlace = {
  address: string
  streetNumber: string
  street: string
  city: string
  county: string
  province: string
  country: string
  postalCode: string

  phone?: string
  latitude: number
  longitude: number
}

export type GalleryEntryItem = {
  id?: number
  galleryEntryId?: number
  createdBy?: number
  entryType: GalleryEntryTypes
  genericType: GalleryEntryGenericTypes
  sourceId: string
  title: string
  description?: string
  image?: string
  url: string
  detail?: any
  date?: Date
  tags?: Record<string, GalleryEntryItemTagSource>
  tokens?: string[]
  createdAt?: Date
  modifiedAt?: Date
}
export enum GalleryEntryItemTagSource {
  Source = 'source',
  User = 'user',
}

export type GalleryEntrySeedEtsy = {
  entryType: GalleryEntryTypes.Etsy
  entry?: GalleryEntry
  details?: { shopId }
}
export type GalleryEntrySeedGooglePlace = {
  entryType: GalleryEntryTypes.GooglePlace
  entry?: GalleryEntry
  details?: { placeId: string }
}
export type GalleryEntrySeedMusic = {
  entryType: GalleryEntryTypes.Music
  entry?: GalleryEntry
  details: { artistId: string }
}
export type GalleryEntrySeedPodcast = {
  entryType: GalleryEntryTypes.Podcast
  entry?: GalleryEntry
  details: { feedUrl: string }
}
export type GalleryEntrySeedShopify = {
  entryType: GalleryEntryTypes.Shopify
  entry?: GalleryEntry
  details: { shopUrl: string }
}
export type GalleryEntrySeedWordpress = {
  entryType: GalleryEntryTypes.Wordpress
  entry?: GalleryEntry
  details: { url: string }
}
export type GalleryEntrySeedYoutube = {
  entryType: GalleryEntryTypes.YouTube
  entry?: GalleryEntry
  details: { username?: string; channelId?: string }
}
export type GalleryEntrySeed =
  | GalleryEntrySeedEtsy
  | GalleryEntrySeedGooglePlace
  | GalleryEntrySeedMusic
  | GalleryEntrySeedPodcast
  | GalleryEntrySeedShopify
  | GalleryEntrySeedWordpress
  | GalleryEntrySeedYoutube

export enum DataDomain {
  Christian = 1,
  Bootroots = 2,
}
export enum GalleryEntryTypes {
  Etsy = 'etsy',
  GooglePlace = 'google.place',
  Music = 'music',
  Podcast = 'podcast',
  Shopify = 'shopify',
  Wordpress = 'wordpress',
  YouTube = 'youtube',
}

export type GalleryUserRoles = 'member' | 'creator' | 'owner'

export type GalleryUser = {
  galleryId?: number
  userId?: number
  roles?: GalleryUserRoles[]
  domain?: number
}

export type GalleryAttribute = {
  value: number
  short: string
  label: string
}

export type Place = {
  title?: string
  location?: PlaceLocation
  galleryId?: number
  galleryEntryId?: number
  galleryEntryItemId?: number
}
export type PlaceLocation = {
  lat: number
  long: number
}
