import { GalleryEntryPlace } from '../../index.js'
import { URL } from 'url'
import api, { ApiStatusError } from '../api.js'
import { GalleryEntryDetailPlace } from '../types/tentkeep-types.js'

const raw = {
  places: {
    search: (query: string): Promise<PlaceCandidates> =>
      google(
        `/findplacefromtext/json?fields=${searchFields}&input=${query}&inputtype=textquery`,
      ),
    details: (placeId: string): Promise<{ result: GooglePlace }> =>
      google(`/details/json?place_id=${placeId}`),
  },
}

async function searchPlaces(query: string): Promise<GalleryEntryPlace[]> {
  return (await raw.places.search(query)).candidates.map(mapPlace)
}

async function placeDetails(placeId: string): Promise<GalleryEntryPlace> {
  return mapPlace((await raw.places.details(placeId)).result)
}

export default {
  raw,
  searchPlaces,
  placeDetails,
}

const searchFields =
  'place_id,formatted_address,name,rating,opening_hours,geometry,types'

type GooglePlaceTypes =
  | 'street_number'
  | 'route'
  | 'locality'
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'administrative_area_level_3'
  | 'country'
  | 'postal_code'
  | 'political'

type PlaceCandidates = { candidates: GooglePlace[] }
export type GooglePlace = {
  address_components: {
    long_name: string
    short_name: string
    types: GooglePlaceTypes[]
  }[]
  place_id: string
  name: string
  website?: string
  formatted_address: string
  international_phone_number?: string
  geometry?: {
    location?: {
      lat: number
      lng: number
    }
  }
}

function google(path: string) {
  const url = new URL(`https://maps.googleapis.com/maps/api/place${path}`)
  url.searchParams.append('key', process.env.CLIENTS_GCP_KEY ?? '')
  return api(url)
}

function mapPlace(place: GooglePlace): GalleryEntryPlace {
  if (!place.place_id || !place.name) {
    throw new ApiStatusError(412, 'Missing sourceId or title')
  }
  return {
    sourceId: place.place_id!,
    title: place.name!,
    url: place.website,
    detail: {
      address: place.formatted_address,
      streetNumber: findComponent('street_number'),
      street: findComponent('route'),
      city: findComponent('locality'),
      county: findComponent('administrative_area_level_2'),
      province: findComponent('administrative_area_level_1'),
      country: findComponent('country'),
      postalCode: findComponent('postal_code'),
      phone: place.international_phone_number,
      latitude: place.geometry?.location?.lat as unknown as number,
      longitude: place.geometry?.location?.lng as unknown as number,
    } as GalleryEntryDetailPlace,
  }

  function findComponent(type: GooglePlaceTypes) {
    return (
      place.address_components?.find((c) => c.types.includes(type))
        ?.short_name ?? ''
    )
  }
}
