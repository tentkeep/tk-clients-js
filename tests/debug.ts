import clients from '../index.js'

clients.page.summary('grocefamilyfarm.com').then((summary) => {
  console.log(JSON.stringify(summary, null, 2))
})
