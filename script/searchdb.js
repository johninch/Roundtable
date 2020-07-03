const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const host = '/';

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

function readText(pathname) {
    if (!/\.md/.test(pathname)) return
    const bin = fs.readFileSync(pathname);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
}

const data = [];

function insert2json(title, url, content) {
    data.push({
        title,
        url: host + url.replace('md', 'html').replace('doc', 'Roundtable').replace('README', 'index'),
        content
    })
}

travel('docs', pathname => {
    try {
        const data = readText(pathname);
        const title = data.match(/#{1}\s*(?=([^#^\n]+))/)[1];
        insert2json(title, pathname, data)
    } catch (err) {
        // Deal with error.
    }
});

setTimeout(() => fs.writeFileSync('./docs/.vuepress/public/db.json', JSON.stringify(data)));
