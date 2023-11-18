import { sanitizeUrl } from '../shareable/common.js'
import api, { ApiStatusError } from '../api.js'
import clients from '../../index.js'
import { PageInfo, PageSummary, PageInfoFeatures } from '@tentkeep/tentkeep'
import * as jsdom from 'jsdom'

const summary = async (url: string) => {
  let _url = sanitizeUrl(url)

  const pageSummary: PageSummary = {
    url: _url,
    title: '',
    features: [] as PageInfoFeatures[],
    headers: {},
    allowsIFrame: false,
  }

  const [dom, pageInfo] = await Promise.all([
    jsdom.JSDOM.fromURL(_url),
    info(url),
  ])
  const page = dom.serialize()

  if (page.length < 100) {
    console.log('[page.summary] Unexpectedly short page:', page)
  }

  const attributeMapper = (m: HTMLElement) =>
    Array.from(m.attributes).reduce((acc, cur) => {
      acc[cur.nodeName] = cur.nodeValue
      return acc
    }, {} as Record<string, any>)

  const meta = Array.from(
    dom.window.document.head.querySelectorAll('meta'),
  ).map(attributeMapper)

  const links = Array.from(
    dom.window.document.head.querySelectorAll('link'),
  ).map(attributeMapper)

  const title = dom.window.document.head.querySelector('title')?.text ?? ''
  const anchors = Array.from(
    dom.window.document.body.querySelectorAll('a'),
  ).map((a) => a.href)
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
  pageSummary.platforms = {
    twitter: meta?.find((m) => m.property === 'twitter:site')?.content,
    barn2door: anchors.find((a) => a.includes('app.barn2door')),
  }
  pageSummary.elements = {
    anchors,
    meta,
    links,
    title,
  } as any

  if (pageSummary.platforms?.barn2door) {
    pageSummary.features?.push('barn2door')
  }
  if (page.match('squarespace.com')) {
    pageSummary.features?.push('squarespace')
  }

  for (const platform in pageSummary.platforms) {
    if (!pageSummary.platforms[platform]) delete pageSummary.platforms[platform]
  }

  return pageSummary
}

/**
 * PageInfo does NOT require scraping the site
 */
const info = async (url: string): Promise<PageInfo> => {
  let _url = sanitizeUrl(url)

  const site = await api(_url)
  if (!site.ok) {
    throw new ApiStatusError(404, 'Site not found')
  }

  const features: PageInfoFeatures[] = await detectFeatures(_url)

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

async function detectFeatures(_url: string) {
  const features: PageInfoFeatures[] = []

  const shopifyPromise = clients.shopify.raw
    .products(_url, 1)
    .then((r) => {
      if (r.products !== undefined) features.push('shopify')
    })
    .catch((_e) => {})

  const wordpressPromise = clients.wordpress
    .host(_url)
    .isWordpress()
    .then((r) => {
      if (r) features.push('wordpress')
    })
    .catch((_e) => {})
  const wordpressCommercePromise = clients.wordpress
    .host(_url)
    .hasProducts()
    .then((r) => {
      if (r) features.push('wordpress-commerce')
    })
    .catch((_e) => {})

  await Promise.allSettled([
    shopifyPromise,
    wordpressPromise,
    wordpressCommercePromise,
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
