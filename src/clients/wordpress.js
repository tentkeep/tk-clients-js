
const { api } = require('../api')
const { forKey } = require('../shareable/common')

const wordpressResources = ['block-types', 'blocks', 'block-revisions', 'rendered-blocks', 'categories', 'comments', 'media', 'pages', 'page-revisions', 'posts', 'post-revisions', 'search-results', 'settings', 'post-statuses', 'tags', 'taxonomies', 'themes', 'post-types', 'users', 'block-directory-items', 'plugins']

module.exports = {
  host: (_host) => wordpressResources.reduce((wordpress, resource) => {
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
