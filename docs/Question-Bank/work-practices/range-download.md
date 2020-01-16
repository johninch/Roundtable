# 简单实现分块下载

> 原理就是先判断服务器是否支持分块，且分块的大小是否小于文件大小，如果小于则根据分块大小计算请求头中的Range的范围值去请求切割的块,最后如果所有分块都请求成功之后将其合并保存成文件。

```js
const fetch = require("node-fetch");
var fs = require('fs'); // 引入fs模块

//获取响应头信息
function getResHeaders(u) {
    return new Promise(function (resolve, reject) {
        fetch(u, {
            method: "GET", //请求方式
            // mode: 'cors',
            headers: { //请求头
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                Pragma: "no-cache",
                Range: "bytes=0-1"
            }
        }).then(r => {
            let h = {};
            r.headers.forEach(function (v, i, a) {
                h[i.toLowerCase()] = v;
            });
            return resolve(h);
        }).catch(reject);
    });
}
//下载块
function downloadBlock(u, o) {
    let config = {
        'Content-Type': 'application/octet-stream',
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Pragma: "no-cache"
    };
    if (typeof o == "string") {
        config["Range"] = "bytes=" + o;
    } else if (typeof o == "object") {
        config = Object.assign(config, o);
    }
    return fetch(u, {
        method: 'GET',
        headers: config,
    }).then(res => res.buffer());
}
(async function () {  
    // let url = "http://cdn.npm.taobao.org/dist/node/v10.14.2/node-v10.14.2-x64.msi";
    let url = "https://www.python.org/ftp/python/3.7.2/python-3.7.2-amd64.exe";
    let fileName = url.split("/").reverse()[0].split("?")[0];
    let fileBuffer = null;
    //获取请求头信息
    let h = await getResHeaders(url);
    let contentRange = h["content-range"];
    //分块大小
    let blockSize = 1024 * 1024 * 4;//b
    //判断是否支持分段下载
    if (contentRange) {
        //获取文件大小
        let contentLength = Number(contentRange.split("/").reverse()[0]);
        //判断是否需要分块下载
        if (contentLength >= blockSize) {
            let etag = h.etag;
            let contentType = h["content-type"];
            let blockLen = Math.ceil(contentLength / blockSize);
            let blist = [];
            //计算分块
            for (let i = 0, start, end; i < blockLen; i++) {
                start = i * blockSize;
                end = (i + 1) * blockSize - 1;
                end = end > contentLength ? contentLength : end;
                console.log("download:", start, end);
                let b = await downloadBlock(url, {
                    etag: etag,
                    'Content-Type': contentType,
                    "Range": "bytes=" + start + "-" + end
                });
                blist.push(b);
            }
            fileBuffer = Buffer.concat(blist);

        }
    }
    if (!fileBuffer) {
        //直接下载
        fileBuffer = await downloadBlock(url, {});
    }
    if (fileBuffer) {
        //保存文件
        fs.writeFile(fileName, fileBuffer, function (err) {
            if (err) throw err;
            console.log('Saved.');
        });
    }
})();
```
