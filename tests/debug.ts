import clients from '../index.js'

const [_entryPoint, _file, arg] = process.argv

// clients.page.summary('grocefamilyfarm.com').then((summary) => {
//   console.log(JSON.stringify(summary, null, 2))
// })

clients.google.searchPlaces(arg as string).then((result) => {
  console.log(JSON.stringify(result, null, 2))
  if (result.length === 1) {
    console.log('Fetching Details...')
    clients.google
      .placeDetails(result[0]?.sourceId ?? '')
      .then((details) => [console.log(JSON.stringify(details, null, 2))])
  }
})
