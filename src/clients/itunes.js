const api = require('../api')
const host = 'https://itunes.apple.com'

module.exports = {
  podcasts: (query) => api(
    `${host}/search?entity=podcast&term=${query}`
  ).then(r => r.json())
}