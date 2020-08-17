const fs = require('fs')
const { default: fetch } = require('node-fetch')

const extractName = file => file.match(/(.*)\./)[1]

const clientsFiles = fs.readdirSync('./src/clients')
const clients = clientsFiles.reduce((agg, file) => {
  Object.defineProperty(
    agg,
    extractName(file),
    { get: () => require(`./clients/${file}`) }
  )
  return agg
}, {})

module.exports = clients