import { api } from '../api.js'
import { Response } from 'got'
const host = 'https://itunes.apple.com'

export default {
  podcasts: (query) =>
    api(`${host}/search?entity=podcast&term=${query}`).then(
      (response: Response<string>) => JSON.parse(response.body),
    ),
}
