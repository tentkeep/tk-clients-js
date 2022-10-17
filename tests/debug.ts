import clients from '../index.js'

const [_entryPoint, _file, arg] = process.argv

// clients.page.summary('grocefamilyfarm.com').then((summary) => {
//   console.log(JSON.stringify(summary, null, 2))
// })

clients.google.places.search(arg as string).then((result) => {
  console.log(JSON.stringify(result, null, 2))
  if (result.candidates.length === 1) {
    console.log('Fetching Details...')
    clients.google.places
      .details(result.candidates[0].place_id)
      .then((details) => [console.log(JSON.stringify(details, null, 2))])
  }
})
