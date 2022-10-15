import clients from '../index.js'

clients.page.summary('azurestandard.com').then((summary) => {
  console.log(JSON.stringify(summary, null, 2))
})
