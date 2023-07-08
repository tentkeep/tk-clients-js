import clients from 'index.js'

function main() {
  clients.shopify
    .productsSummary('https://sietefoods.com', 250)
    .then((response) => {
      console.log(response)
    })
}

main()
