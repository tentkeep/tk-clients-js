const clientsFiles = [
  'etsy',
  'itunes',
  'musickit',
  'rss',
  'spotify',
  'wordpress',
  'youtube'
]

const clients = clientsFiles.reduce((agg, file) => {
  Object.defineProperty(
    agg,
    file,
    { get: () => require(`./src/clients/${file}`) }
  )
  return agg
}, {})

module.exports = clients
