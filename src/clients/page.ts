// import api from '../api.js'
// import jsdom from 'jsdom'
// const { JSDOM } = jsdom
import path from 'path'
import childProcess from 'child_process'
import phantomjs from 'phantomjs-prebuilt'
import X2JS from 'x2js'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const binPath = phantomjs.path
console.log('BIN PATH', binPath)
console.log('dirname', __dirname)

const summary = async (url: string) => {
  let _url = url
  if (!_url.includes('://')) {
    _url = `https://${_url}`
  }

  var childArgs = [
    './node_modules/tk-clients/dist/page-phantomjs-meta-grabber.js',
    _url,
  ]
  console.log(childArgs)
  return new Promise((resolve, reject) => {
    childProcess.execFile(
      './node_modules/tk-clients/dist/phantomjs',
      childArgs,
      function (err, stdout: string, stderr: string) {
        if (err) {
          return reject(err)
        }
        if (stderr.length) {
          return reject(stderr)
        }
        resolve(stdout)
      },
    )
  }).then((page: string) => {
    const x2js = new X2JS()
    const meta = page.match(/<meta[^>]+>/g)
    const links = page.match(/<link[^>]+>/g)
    const title = page.match(/<title.*<\/title>/g)
    return {
      url: _url,
      meta: meta?.map((i) => x2js.xml2js(i)),
      links: links?.map((i) => x2js.xml2js(i)),
      title: title?.map((i) => x2js.xml2js(i)),
    }
  })

  // return api(_url)
  //   .then((p) => p.text())
  //   .then((page) => {
  //     const dom = new JSDOM(page, {
  //       url: _url,
  //       referrer: '*',
  //       resources: 'usable',
  //       runScripts: 'dangerously',
  //       pretendToBeVisual: true,
  //     })
  //     dom.window.document.onload = function () {
  //       console.log(
  //         Array.from(dom.window.document.querySelectorAll('meta')).map(
  //           (i: any) => i.content,
  //         ),
  //       )
  //     }

  //     const meta = page.match(/<meta[^>]+>/g)
  //     const links = page.match(/<link[^>]+>/g)
  //     const title = page.match(/<title.*<\/title>/g)
  //     return {
  //       url: _url,
  //       meta,
  //       links,
  //       title,
  //       query: dom.window.document,
  //     }
  //   })
}

// summary('azurestandard.com')

export default {
  summary,
}
