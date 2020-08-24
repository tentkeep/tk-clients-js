
const { api } = require('../api')
const { forKey } = require('../shareable/common')

const resources = [
  'block-types', 'blocks', 'block-revisions', 'rendered-blocks', 'block-directory-items',
  'categories',
  'comments',
  'media',
  'pages', 'page-revisions',
  'posts', 'post-revisions', 'post-statuses', 'post-types',
  'search-results',
  'settings',
  'tags',
  'taxonomies',
  'themes',
  'users',
  'plugins'
]

module.exports = {
  host: (_host) => resources.reduce((wordpress, resource) => {
    wordpress[resourceToFunction(resource)] = (options = '') => {
      const id = typeof options === 'string' ? options : ''
      const url = new URL(`https://${_host}/wp-json/wp/v2/${resource}/${id}`)
      if (typeof options === 'object') {
        forKey(options, k => url.searchParams.append(k, options[k]))
      }
      return api(url)
    }
    return wordpress
  }, {})
}

const resourceToFunction = resource => resource.replace(/-(.)/, (_, d) => d.toUpperCase())
