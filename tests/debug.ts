import clients from '../index.js'

const [_entryPoint, _file, arg] = process.argv
console.log('ARG', arg)

// // PAGE SUMMARY
// clients.page.summary(arg).then((summary) => {
//   console.log(JSON.stringify(summary, null, 2))
// })
// // PAGE INFO
clients.page.info(arg as string).then((info) => {
  console.log(JSON.stringify(info, null, 2))
})

// // PLACES
// clients.google.searchPlaces(arg as string).then((result) => {
//   console.log(JSON.stringify(result, null, 2))
//   if (result.length === 1) {
//     console.log('Fetching Details...')
//     clients.google
//       .placeDetails(result[0]?.sourceId ?? '')
//       .then((details) => [console.log(JSON.stringify(details, null, 2))])
//   }
// })

// clients.youtube
//   .search({
//     part: 'snippet,contentOwnerDetails',
//     maxResults: 3,
//     q: arg,
//     type: 'channel',
//   })
//   .then((result) => {
//     console.log(JSON.stringify(result, null, 2))
//   })
