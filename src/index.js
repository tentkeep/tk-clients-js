const clientsFiles = [
  'etsy',
  'itunes',
  'rss',
  'spotify',
  'wordpress',
  'youtube'
]

const clients = clientsFiles.reduce((agg, file) => {
  Object.defineProperty(
    agg,
    file,
    { get: () => require(`./clients/${file}`) }
  )
  return agg
}, {})

module.exports = clients
