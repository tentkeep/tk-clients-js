const clientsFiles = [
  'etsy',
  'itunes',
  'musickit',
  'rss',
  'spotify',
  'wordpress',
  'youtube'
]

const clients = clientsFiles.reduce((agg, clientName) => {
  Object.defineProperty(
    agg,
    clientName,
    { get: () => require(`./src/clients/${clientName}`) }
  )
  return agg
}, {})

module.exports = clients
