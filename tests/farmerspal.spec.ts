import got from 'got'
import fs from 'fs'
import * as jsdom from 'jsdom'
import { describe, it } from 'vitest'
import { content } from '@tentkeep/tentkeep/dist/src/directory'

describe('farmerspal', () => {
  it('extractInfo', extractInfo)
})

async function downloadFarmersPal() {
  for (let index = 1; index < 150; index++) {
    await getPage(index)
  }
  function getPage(page: number) {
    return got(`https://www.farmerspal.com/organic-farms/page/${page}`)
      .text()
      .then((html) => {
        console.log('Writing', page, html.slice(0, 400))
        fs.writeFileSync(`temp/farmerspal/page-${page}.html`, html)
      })
  }
}

async function extractInfo() {
  const pages = fs.readdirSync('temp/farmerspal_pages')

  const farms: any[] = []
  let count = 0

  for (const page of pages) {
    console.log('Processing', count, page)
    try {
      const dom = await jsdom.JSDOM.fromFile(`temp/farmerspal_pages/${page}`)

      const document = dom.window.document

      const listings = Array.from(document.querySelectorAll('h4')).map((h4) => {
        let blockquote: Element | null = h4.nextElementSibling
        while (
          blockquote &&
          !['h4', 'blockquote'].includes(blockquote.tagName.toLowerCase())
        ) {
          blockquote = blockquote.nextElementSibling
        }
        return {
          h4,
          content:
            blockquote?.tagName.toLowerCase() === 'blockquote'
              ? blockquote
              : null,
        }
      })

      listings.forEach((listing) => {
        const sections = listing.content?.innerHTML
          .split(/<br\s*\/?>/i)
          .map((section) => section.trim().replace(/\s+/g, ' '))
          .filter(Boolean)
        const email = listing.content
          ?.querySelector('a[href^="mailto:"]')
          ?.textContent?.trim()
        const phone = sections?.find((section) => {
          return section.match(/\(\d{3}\) \d{3}-\d{4}/)
        })
        const facebook = sections
          ?.find((section) => section.includes('facebook.com'))
          ?.match(/href="(http:\/\/www\.facebook\.com\/[^"]+)"/)?.[1]

        farms.push({
          title: listing.h4.textContent?.trim(),
          url: listing.h4.querySelector('a')?.href,
          email,
          phone,
          facebook,
          sections,
        })
      })
    } catch (error) {
      console.error('ERROR', error)
    } finally {
      count++
    }
  }

  fs.writeFileSync(
    'temp/farmerspal/farmerspal.json',
    JSON.stringify(farms, null, 2),
  )
}
