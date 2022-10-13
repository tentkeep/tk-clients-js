import { URL } from 'url'
import api from '../api.js'

const places = {
  search: (query: string) =>
    google(
      `/findplacefromtext/json?fields=${searchFields}&input=${query}&inputtype=textquery`,
    ),
  details: (placeId: string) => google(`/details/json?place_id=${placeId}`),
}

export default {
  places,
}

const searchFields =
  'place_id,formatted_address,name,rating,opening_hours,geometry'

function google(path: string) {
  const url = new URL(`https://maps.googleapis.com/maps/api/place${path}`)
  url.searchParams.append('key', process.env.GCP_KEY ?? '')
  return api(`https://maps.googleapis.com/maps/api/place${path}`)
}
