import childProcess from 'child_process';
import X2JS from 'x2js';
const summary = async (url) => {
    let _url = url;
    if (!_url.includes('://')) {
        _url = `https://${_url}`;
    }
    return new Promise((resolve, reject) => {
        const command = `phantomjs --ssl-protocol=any --ignore-ssl-errors=true ./node_modules/tk-clients/dist/page-phantomjs-meta-grabber.js ${_url}`;
        console.log('[page cmd]', command);
        childProcess.exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log('[page err]', err);
                return reject(err);
            }
            if (stderr.length) {
                console.log('[page stderr]', stderr);
                return reject(stderr);
            }
            resolve(stdout);
        });
    }).then((page) => {
        if (page.length < 100) {
            console.log('Unexpectedly short page', page);
        }
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