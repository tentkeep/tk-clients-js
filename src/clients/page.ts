import childProcess from 'child_process'
import X2JS from 'x2js'
import got from 'got'
import { sanitizeUrl } from '../shareable/common.js'

const summary = async (url: string): Promise<PageSummary> => {
  let _url = sanitizeUrl(url)

  const page = await captureUrl(_url)

  if (page.length < 100) {
    console.log('[page.summary] Unexpectedly short page:', page)
  }
  const x2js = new X2JS({
    ignoreRoot: true,
    attributePrefix: '',
  })
  const xmlParser = (xml) => x2js.xml2js(xml) as any
  const meta = page.match(/<meta[^>]+>/g)?.map(xmlParser)
  const links = page.match(/<link[^>]+>/g)?.map(xmlParser)
  const title = page.match(/<title.*<\/title>/g)?.map(xmlParser)

  return {
    url: _url,
    title:
      meta?.find((m) => m.property === 'og:site_name')?.content ??
      title?.[title.length - 1]['__text'],
    description: findDescription(meta),
    image: findImage(meta, _url),
    icon: findIcon(links, _url),
    twitter: meta?.find((m) => m.property === 'twitter:site')?.content,
    elements: {
      meta,
      links,
      title,
    },
  }
}

const info = async (url: string) => {
  let _url = sanitizeUrl(url)

  const site = await got(_url)
  const hasShopify = (await got(`${_url}/products.json?limit=1`)).headers[
    'content-type'
  ]?.includes('json')
  return {
    allowsIFrame: !site.headers['x-frame-options'],
    headers: site.headers,
    features: hasShopify ? ['shopify'] : [],
  }
}

export default {
  info,
  summary,
}

export type PageSummary = {
  url: string
  title: string
  description?: string
  image?: string
  icon?: string
  twitter?: string
  elements?: { meta; links; title }
}

function phantomjs(): string {
  return process.env.PHANTOMJS_PATH ?? 'phantomjs'
}

function scriptPath(): string {
  return (
    process.env.PHANTOMJS_SCRIPT_PATH ??
    './node_modules/tk-clients/dist/page-phantomjs-meta-grabber.js'
  )
}

function captureUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = `${phantomjs()} --ssl-protocol=any --ignore-ssl-errors=true ${scriptPath()} ${url}`
    console.log('[page cmd]', command)
    childProcess.exec(command, (err, stdout: string, stderr: string) => {
      if (err) {
        console.log('[page err]', err)
        return reject(err)
      }
      if (stderr.length) {
        console.log('[page stderr]', stderr)
        return reject(stderr)
      }
      resolve(stdout)
    })
  })
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
