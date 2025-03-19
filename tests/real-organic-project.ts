import * as jsdom from 'jsdom'

async function scrapeItemPages() {
  const start = Date.now()
  const farms = (await import('../realorganicproject.json')).default

  await runQueue(5, farms.items, async (farm) => {
    const page = await got(farm.url).text()
    fs.writeFileSync(`temp/realorganicproject/${farm.sourceId}.html`, page)
  })
}

async function extractRealOrganicProject() {
  const farmItems = (await import('../realorganicproject.json')).default

  const farms: any[] = []
  let count = 0

  for (const farm of farmItems.items) {
    console.log('Processing', count, farm.title)
    try {
      const dom = await jsdom.JSDOM.fromFile(
        `temp/realorganicproject_pages/${farm.sourceId}.html`,
      )

      const document = dom.window.document

      const data: Record<string, any> = {}
      Array.from(document.querySelectorAll('h4')).forEach((h4) => {
        if (h4.textContent) {
          data[h4.textContent] = h4.nextElementSibling?.textContent
        }
      })

      farms.push({
        sourceId: farm.sourceId,
        url: farm.url,
        title: farm.title,
        data: farm.date,
        website: Array.from(
          document.querySelectorAll('.sd-block-buttons a.button'),
        ).find((el) => el.textContent === 'Visit the Website')?.href,
        store: Array.from(
          document.querySelectorAll('.sd-block-buttons a.button'),
        ).find((el) => el.textContent === 'Shop Online')?.href,

        ...data,

        facebook: document.getElementById('farm-social-facebook')?.href,
        instagram: document.getElementById('farm-social-instagram')?.href,
      })
    } catch (error) {
      console.error('ERROR', error)
    } finally {
      count++
    }
  }

  fs.writeFileSync(
    'temp/real-organic-project/realorganicproject.json',
    JSON.stringify(farms, null, 2),
  )
}
