import childProcess from 'child_process'
import X2JS from 'x2js'

const summary = async (url: string) => {
  let _url = url
  if (!_url.includes('://')) {
    _url = `https://${_url}`
  }
  if (_url.endsWith('/')) {
    _url = _url.slice(0, -1)
  }

  return new Promise((resolve, reject) => {
    const command = `${phantomjs()} --ssl-protocol=any --ignore-ssl-errors=true ${scriptPath()} ${_url}`
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
  }).then((page: string) => {
    if (page.length < 100) {
      console.log('[page.summary] Unexpectedly short page:', page)
    }
    const x2js = new X2JS({ ignoreRoot: true, attributePrefix: '' })
    const xmlParser = (xml) => x2js.xml2js(xml) as any
    const meta = page.match(/<meta[^>]+>/g)?.map(xmlParser)
    const links = page.match(/<link[^>]+>/g)?.map(xmlParser)
    const title = page.match(/<title.*<\/title>/g)?.map(xmlParser)

    return {
      url: _url,
      title:
        meta?.find((m) => m.property === 'og:site_name').content ??
        title?.[title.length - 1]['__text'],
      description: findDescription(meta),
      image: findImage(meta),
      icon: findIcon(links, _url),
      twitter: meta?.find((m) => m.property === 'twitter:site').content,
      elements: {
        meta,
        links,
        title,
      },
    }
  })
}

export default {
  summary,
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

function findDescription(meta: any[] | undefined): string | undefined {
  return (
    meta?.find((m) => m.name === 'description').content ??
    meta?.find((m) => m.property === 'og:description').content
  )
}
function findImage(meta: any[] | undefined): string | undefined {
  return (
    meta?.find((m) => m.property === 'og:image').content ??
    meta?.find((m) => m.property === 'twitter:image').content
  )
}
function findIcon(
  links: any[] | undefined,
  webAddress: string,
): string | undefined {
  const icon =
    links?.find((l) => l.rel === 'apple-touch-icon').href ??
    links?.find((l) => l.rel === 'icon').href
  return formatUrl(icon, webAddress)
}

function formatUrl(url: string, webAddress: string): string {
  if (url.startsWith('/')) {
    return `${webAddress}${url}`
  }
  return url
}
