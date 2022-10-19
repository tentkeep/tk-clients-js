import fs from 'fs'

const files = ['dist/index.d.ts', 'dist/src/clients/page.d.ts']
files.forEach(file => {
  fs.readFile(file, undefined, (err, data) => {
    const match = '/// <reference types="node_modules/got/dist/source/core/timed-out.js" />'
    const cleaned = data.toString('utf-8').replace(match, '')
    fs.writeFile(file, cleaned, () => {})
  })
})