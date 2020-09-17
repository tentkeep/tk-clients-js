
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

const resourceMethods = _host => resources.reduce((wordpress, resource) => {
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

module.exports = {
  host: (_host) => ({
    ...resourceMethods(_host),
    async summary () {
      const posts = await api(`https://${_host}/wp-json/wp/v2/posts?per_page=1`)
      const authorRefs = []; const categoryRefs = []; const tagRefs = []
      posts.forEach(p => {
        authorRefs.push(p.author)
        categoryRefs.push(...p.categories)
        tagRefs.push(...p.tags)
      })
      const authorsPromise = resourceMethods(_host).users({ per_page: 100, include: authorRefs.join(',') })
        .catch(_ => [])
      const categoriesPromise = resourceMethods(_host).categories({ per_page: 100, include: categoryRefs.join(',') })
      const tagsPromise = resourceMethods(_host).tags({ per_page: 100, include: tagRefs.join(',') })
      const [authors, categories, tags] = await Promise.all([authorsPromise, categoriesPromise, tagsPromise])

      return {
        title: _host,
        items: posts.map(p => ({
          title: p.title.rendered,
          description: p.excerpt.rendered,
          date: p.date,
          url: p.link,
          image: (p.content.rendered.match(/img src="(.+?)"/) || [])[1],
          author: (authors.find(a => a.id === p.author) || {}).name,
          categories: p.categories.map(c => (categories.find(cat => cat.id === c) || {}).name),
          tags: p.tags.map(t => (tags.find(tag => tag.id === t) || {}).name)
        }))
      }
    }
  })
}

const resourceToFunction = resource => resource.replace(/-(.)/, (_, d) => d.toUpperCase())
