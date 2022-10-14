import path from 'path';
import childProcess from 'child_process';
import X2JS from 'x2js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('dirname', __dirname);
const summary = async (url) => {
    let _url = url;
    if (!_url.includes('://')) {
        _url = `https://${_url}`;
    }
    var childArgs = [
        './node_modules/tk-clients/dist/page-phantomjs-meta-grabber.js',
        _url,
    ];
    console.log(childArgs);
    return new Promise((resolve, reject) => {
        childProcess.execFile('./node_modules/tk-clients/dist/phantomjs', childArgs, function (err, stdout, stderr) {
            if (err) {
                return reject(err);
            }
            if (stderr.length) {
                return reject(stderr);
            }
            resolve(stdout);
        });
    }).then((page) => {
        const x2js = new X2JS();
        const meta = page.match(/<meta[^>]+>/g);
        const links = page.match(/<link[^>]+>/g);
        const title = page.match(/<title.*<\/title>/g);
        return {
            url: _url,
            meta: meta?.map((i) => x2js.xml2js(i)),
            links: links?.map((i) => x2js.xml2js(i)),
            title: title?.map((i) => x2js.xml2js(i)),
        };
    });
};
export default {
    summary,
};
//# sourceMappingURL=page.js.map