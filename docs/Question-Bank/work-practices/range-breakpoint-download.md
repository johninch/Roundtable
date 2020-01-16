# 简单实现断点续传

> 将请求的信息记录下来,在中断后重新读取记录，然后从记录点开始请求数据，并且将数据追加到文件中就行了。

```js
const fetch = require("node-fetch");
const fs = require('fs'); // 引入fs模块

function readJSON(p) { return JSON.parse(fs.readFileSync(p)); };//读取json
function writeJSON(p, d) { fs.writeFileSync(p, JSON.stringify(d)); };//保存json
//读取响应头
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
            })
            return resolve(h);
        }).catch(reject);
    });
}
//下载块
function downloadBlock(u, o) {
    let option = {
        'Content-Type': 'application/octet-stream',
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Pragma: "no-cache"
    };
    if (typeof o == "string") {
        option["Range"] = "bytes=" + o;
    } else if (typeof o == "object") {
        option = Object.assign(option, o);
    }
    return fetch(u, {
        method: 'GET',
        headers: option,
    }).then(res => res.buffer());
}
//切割大小
function cutSize(contentLength, blockSize) {
    //向后取整
    let blockLen = Math.ceil(contentLength / blockSize);
    let blist = [];
    for (let i = 0, start, end; i < blockLen; i++) {
        start = i * blockSize;
        end = (i + 1) * blockSize - 1;
        end = end > contentLength ? contentLength : end;
        blist.push({ start: start, end: end });
    }
    return blist;
}
(async function () {
    // let url = "http://cdn.npm.taobao.org/dist/node/v10.14.2/node-v10.14.2-x64.msi";
    let url = "https://dldir1.qq.com/qqfile/qq/QQ9.0.8/24209/QQ9.0.8.24209.exe";
    // let url = "https://www.python.org/ftp/python/3.7.2/python-3.7.2-amd64.exe";
    let fileName = url.split("/").reverse()[0].split("?")[0];
    //获取请求头信息
    let h = await getResHeaders(url);
    let contentRange = h["content-range"];
    //分块大小
    let blockSize = 1024 * 1024 * 4;//b
    let etag = h.etag || null;
    //记录文件当前下载状态的文件
    let logFileName = fileName + ".info";//这个可自定义
    let logContent;
    //如果日志文件存在
    if (fs.existsSync(logFileName)) {
        //读取数据
        logContent = readJSON(logFileName);
        //比较etag来判断文件是否发生变动
        if (etag != logContent.etag) {
            logContent = null;
        }
    }
    //判断是否支持分段下载
    if (contentRange) {
        if (!logContent) {
            //获取文件大小
            let contentLength = Number(contentRange.split("/").reverse()[0]);
            //判断是否后需要分块下载
            if (contentLength >= blockSize) {
                let contentType = h["content-type"];
                //计算分块
                let blist = cutSize(contentLength, blockSize);
                //日志记录内容根据需要添加
                logContent = {
                    url: url,
                    etag: etag,
                    fileName: fileName,
                    contentLength: contentLength,
                    contentType: contentType,
                    blocks: blist,
                    pointer: 0
                };
                //创建记录文件
                writeJSON(logFileName, logContent);
            } else {
                contentRange = false;
            }
        }
        if (logContent) {
            //遍历并下载
            for (let i = logContent.pointer; i < logContent.blocks.length; i++) {
                let block = logContent.blocks[i];
                let b = await downloadBlock(url, {
                    etag: logContent.etag,
                    'Content-Type': logContent.contentType,
                    "Range": "bytes=" + block.start + "-" + block.end
                });
                //追加内容
                fs.appendFileSync(logContent.fileName, b);
                //记录日志
                logContent.pointer++;
                console.log(logContent.fileName, logContent.pointer / logContent.blocks.length * 100 + "%");
                writeJSON(logFileName, logContent);
            }
            //如果需要删除日志文件的话
            // fs.unlink(logFileName, function(err){});
        }
    } else {
        contentRange = false;
    }
    //使用 contentRange = false 来标识 直接下载
    if (contentRange == false) {
        //直接下载
        let fileBuffer = await downloadBlock(url, {});
        //保存文件
        fs.writeFile(fileName, fileBuffer, function (err) {
            if (err) throw err;
            console.log('Saved.');
        });
    }
})();
```
