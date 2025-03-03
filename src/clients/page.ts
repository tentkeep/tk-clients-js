import { sanitizeUrl } from '../shareable/common.js'
import api, { ApiStatusError } from '../api.js'
import clients from '../../index.js'
import { PageInfo, PageSummary, PageInfoFeatures } from '@tentkeep/tentkeep'
import * as jsdom from 'jsdom'

const summary = async (url: string, options?: { timeout?: number }) => {
  let _url = sanitizeUrl(url)

  const pageSummary: PageSummary = {
    url: _url,
    title: '',
    features: [] as PageInfoFeatures[],
    headers: {},
    allowsIFrame: false,
  }

  const virtualConsole = new jsdom.VirtualConsole()
  virtualConsole.on('error', (e: any) => {
    throw e
  })

  const dom = await jsdom.JSDOM.fromURL(_url, { virtualConsole })
  const pageInfo = await info(url, options)

  const page = dom.serialize()

  if (page.length < 100) {
    console.log('[page.summary] Unexpectedly short page:', page)
  }

  const attributeMapper = (m: HTMLElement) =>
    Array.from(m.attributes).reduce(
      (acc, cur) => {
        acc[cur.nodeName] = cur.nodeValue
        return acc
      },
      {} as Record<string, any>,
    )

  const meta = Array.from(
    dom.window.document.head.querySelectorAll('meta'),
  ).map(attributeMapper)

  const links = Array.from(
    dom.window.document.head.querySelectorAll('link'),
  ).map(attributeMapper)

  const title = dom.window.document.head.querySelector('title')?.text ?? ''
  const anchors = [
    ...new Set(
      Array.from(dom.window.document.body.querySelectorAll('a')).map(
        (a) => a.href,
      ),
    ),
  ].filter(Boolean)
  const images: string[] = [
    ...new Set(
      page.match(/[^("']*(jpg|jpeg|png)[^)"']*/g)?.map((img) => {
        img = img.split('?')[0] ?? '' // drop query params
        img = img.replace(/^(\/[^/])/, `${_url}$1`) // expand absolute urls
        img = img.replace(/^\.(\/[^/])/, `${_url}$1`) // expand relative urls
        return img.replace(/^[/]+/, 'https://') // some CDNs use 2 leading forward slashes
      }),
    ),
  ].filter((img) => img.startsWith('http'))

  pageSummary.title =
    meta?.find((m) => m.property === 'og =site_name')?.content ?? title
  pageSummary.description = findDescription(meta)
  pageSummary.features?.push(...pageInfo.features)
  pageSummary.headers = pageInfo.headers
  pageSummary.allowsIFrame = pageInfo.allowsIFrame
  pageSummary.image = findImage(meta, _url)
  pageSummary.images = images
  pageSummary.icon = findIcon(links, _url)

  const arr = (...args: (string | string[] | undefined)[]) =>
    args.flatMap((arg) => arg).filter((arg) => !!arg) as string[]

  pageSummary.platforms = {
    barn2door: anchors.find((a) => a.includes('app.barn2door')),
    facebook: anchors.filter((a) => a.includes('facebook.com')),
    instagram: anchors.filter((a) => a.includes('instagram.com')),
    linkedin: anchors.filter((a) => a.includes('linkedin.com')),
    storefront: arr(anchors.filter((a) => a.match(/\Wshop|\Wstore|products/))),
    x: arr(
      meta?.find((m) => m.property === 'twitter:site')?.content,
      meta?.find((m) => m.property === 'x:site')?.content,
      anchors.find((a) => a.includes('twitter.com')),
      anchors.find((a) => a.includes('x.com')),
    ),
    youtube: anchors.filter((a) => a.includes('youtube.com')),
  }
  pageSummary.elements = {
    anchors,
    meta,
    links,
    title,
  } as any

  if (page.match('squarespace.com')) {
    pageSummary.features?.push('squarespace')
  }
  if (page.match('Drupal')) {
    pageSummary.features?.push('drupal')
  }
  if (page.match('content="Square')) {
    pageSummary.features?.push('square')
  }
  if (page.match('Wix.com')) {
    pageSummary.features?.push('wix')
  }

  if (pageSummary.elements?.meta.find((m) => m.content === 'GrazeCart')) {
    pageSummary.features?.push('grazecart')
  }
  if (pageSummary.platforms?.barn2door) {
    pageSummary.features?.push('barn2door')
  }
  if (page.match('localline')) {
    pageSummary.features?.push('localline')
  }
  if (page.match('localfoodmarketplace.com')) {
    pageSummary.features?.push('localfoodmarketplace')
  }

  for (const platform in pageSummary.platforms) {
    if (!pageSummary.platforms[platform]) delete pageSummary.platforms[platform]
  }

  return pageSummary
}

/**
 * PageInfo does NOT require scraping the site
 */
const info = async (
  url: string,
  options?: { timeout?: number },
): Promise<PageInfo> => {
  let _url = sanitizeUrl(url)

  const site = await api(_url, {
    signal: AbortSignal.timeout(options?.timeout ?? 20 * 1000),
  } as RequestInit)
  if (!site.ok) {
    throw new ApiStatusError(404, 'Site not found', site)
  }

  const features: PageInfoFeatures[] = await detectFeatures(_url, options)

  return {
    allowsIFrame: !site.headers['x-frame-options'],
    headers: site.headers,
    features,
  }
}

export default {
  info,
  summary,
}

async function detectFeatures(_url: string, options?: { timeout?: number }) {
  const features: PageInfoFeatures[] = []
  let count = 0

  const shopifyPromise = clients.shopify.raw
    .products(_url, 1)
    .then((r) => {
      if (r.products !== undefined) features.push('shopify')
    })
    .catch((_e) => {})
    .finally(() => count++)

  const wordpressPromise = clients.wordpress
    .host(_url)
    .isWordpress()
    .then((r) => {
      if (r) features.push('wordpress')
    })
    .catch((_e) => {})
    .finally(() => count++)
  const wordpressCommercePromise = clients.wordpress
    .host(_url)
    .hasProducts()
    .then((r) => {
      if (r) features.push('wordpress-commerce')
    })
    .catch((_e) => {})
    .finally(() => count++)

  await Promise.race([
    Promise.allSettled([
      shopifyPromise,
      wordpressPromise,
      wordpressCommercePromise,
    ]),
    new Promise((_res, reject) => {
      setTimeout(
        () => {
          reject('Page Features Timeout')
        },
        options?.timeout ?? 60 * 1000,
      )
    }),
  ])
  return features
}

function findDescription(meta: any[] | undefined): string | undefined {
  return (
    meta?.find((m) => m.name === 'description')?.content ??
    meta?.find((m) => m.property === 'og:description')?.content
  )
}
function findImage(
  meta: any[] | undefined,
  webAddress: string,
): string | undefined {
  return (
    meta?.find((m) => m.property === 'og:image:secure_url')?.content ??
    meta?.find((m) => m.property === 'og:image')?.content ??
    meta?.find((m) => m.property === 'twitter:image')?.content ??
    `https://www.google.com/s2/favicons?sz=128&domain_url=${webAddress}`
  )
}
function findIcon(
  links: any[] | undefined,
  webAddress: string,
): string | undefined {
  const icon =
    links?.find((l) => l.rel === 'apple-touch-icon')?.href ??
    links?.find((l) => l.rel === 'icon')?.href
  if (!icon) {
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${webAddress}`
  }
  return formatUrl(icon, webAddress)
}

function formatUrl(
  url: string | undefined,
  webAddress: string,
): string | undefined {
  if (url?.startsWith('/')) {
    return `${webAddress}${url}`
  }
  return url
}
