# 文件下载实现

## 案例：分块下载
分块下载的原理简述：

#### 1. 是否支持范围请求：
- 如果 `响应头response headers`中，有 `Accept-Ranges:bytes` 标识，则代表当前资源是支持范围请求的。

#### 2. 获取与发送范围：
- 在HTTP/1.1中定义了一个`Range的请求头`来指定请求的实体的范围，即`Range: bytes=0-1xxx`，它的范围取值是在 `0 - 总Length` 之间。
- 通过指定 Range: bytes=0-1 发送请求后，返回的响应为 HTTP/1.1 206 Partial Content ，有一个`Content-Range响应头`，`Content-range: bytes 0-1/1484477`，即 `Range请求头类型 范围值 / 总Length`。

#### 3. 检查资源是否变化：
- 在终端发起续传请求时，很有可能，URL对应的文件内容在服务端已经发生变化。因此需要检查文件是否变化；
- 检查资源变化最简单的方式是通过判断响应头的`ETag`的值，`ETag用于标识当前文件的唯一性`。在Response Headers中返回ETag。

#### 4. 下载实现：
- 就是先判断服务器是否支持分块，分块Size设置是否小于文件大小，如果小于则根据分块Size计算请求头中的Range的范围值去请求切割的块。当所有分块都请求成功之后将其合并保存成文件。

#### 5. 断点续下：
- 如果要实现断点续下，就需要记录当前请求点，如果下载中断，需要丢弃当前未完成的分片，然后从记录点开始请求数据，并且将数据追加到文件中就行了。

::: details 简单实现
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
:::

## 参考链接

- [NodeJS实现简单的HTTP文件断点续传下载功能](https://www.jianshu.com/p/934d3e8d371e?tdsourcetag=s_pctim_aiomsg)
