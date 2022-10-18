import { Item } from 'index.js'
import { URL } from 'url'
import api, { ApiStatusError } from '../api.js'

const raw = {
  places: {
    search: (query: string): Promise<PlaceCandidates> =>
      google(
        `/findplacefromtext/json?fields=${searchFields}&input=${query}&inputtype=textquery`,
      ),
    details: (
      placeId: string,
    ): Promise<{ result: google.maps.places.PlaceResult }> =>
      google(`/details/json?place_id=${placeId}`),
  },
}

async function searchPlaces(query: string): Promise<Place[]> {
  return (await raw.places.search(query)).candidates.map(mapPlace)
}

async function placeDetails(placeId: string): Promise<Place> {
  return mapPlace((await raw.places.details(placeId)).result)
}

export type Place = Item & {
  address?: string
  phone?: string
  latitude?: number
  longitude?: number
}

export default {
  raw,
  searchPlaces,
  placeDetails,
}

const searchFields =
  'place_id,formatted_address,name,rating,opening_hours,geometry,types'

type PlaceCandidates = { candidates: google.maps.places.PlaceResult[] }

function google(path: string) {
  const url = new URL(`https://maps.googleapis.com/maps/api/place${path}`)
  url.searchParams.append('key', process.env.GCP_KEY ?? '')
  return api(url)
}

function mapPlace(place: google.maps.places.PlaceResult): Place {
  if (!place.place_id || !place.name) {
    throw new ApiStatusError(412, 'Missing sourceId or title')
  }
  return {
    sourceId: place.place_id!,
    title: place.name!,
    url: place.website,
    address: place.formatted_address,
    phone: place.formatted_phone_number,
    latitude: place.geometry?.location?.lat as unknown as number,
    longitude: place.geometry?.location?.lng as unknown as number,
  }
}
