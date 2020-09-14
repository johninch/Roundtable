# 项目挖掘

任何需求，都可以做成亮点
1. 效率开发：效率运行，效率空间占用
2. 数据量变大，工程师价值所在
    1. 文件上传，文件变大
    2. 列表渲染，列表数据变大
3. 网络如果不稳定，弱网

## 文件上传

### 1. axios.post

formdata server直接接受，实现功能，无亮点

### 2. 加一个进度条，也没啥亮点
```js
createProgresshandler(item) {
    return e => {
        item.progress = parseInt(String((e.loaded / e.total) * 100));
    };
},
```

### 3. 文件变大，比如是2个G怎么办？`分片上传`：
```js
createFileChunk(file, size = SIZE) {
    // 生成文件块
    const chunks = [];
    let cur = 0;
    while (cur < file.size) {
        chunks.push({ file: file.slice(cur, cur + size) });
        cur += size;
    }
    return chunks;
},
```

### 4. 上传成功，后端要存起来切片，知道上传了哪些，所以需要`SparkMD5计算一个指纹`
```js
async calculateHashSync(chunks) {
    return new Promise(resolve => {
        const spark = new SparkMD5.ArrayBuffer();
        let progress = 0;
        let count = 0;

        const loadNext = index => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(chunks[index].file);
            reader.onload = e => {
                // 累加器 不能依赖index，
                count++;
                // 增量计算md5
                spark.append(e.target.result);
                if (count === chunks.length) {
                    // 通知主线程，计算结束
                    resolve(spark.end());
                    this.hashProgress = 100;
                } else {
                    // 每个区块计算结束，通知进度即可
                    this.hashProgress += 100 / chunks.length;

                    // 计算下一个
                    loadNext(count);
                }
            };
        };
        // 启动
        loadNext(0);
    });
    // 不计算之前的 方便一会拆解
},
```
- 文件如果2个G，计算md5大概要十几秒，卡顿怎么解决（计算量太大，阻塞主线程）？
    1. `web-worker`开一个影分身去做
    ```js
    async calculateHashWorker(chunks) {
        return new Promise(resolve => {
            // web-worker 防止卡顿主线程
            this.container.workder = new Worker("/hash.js");
            this.container.workder.postMessage({ chunks });
            this.container.workder.onmessage = e => {
                const { progress, hash } = e.data;
                this.hashProgress = Number(progress.toFixed(2));
                if (hash) {
                    resolve(hash);
                }
            };
        });
    },
    ```
    ```js
    // web-worker
    self.importScripts("spark-md5.min.js");

    self.onmessage = (e) => {
        // 接受主线程的通知
        const { chunks } = e.data;
        const spark = new self.SparkMD5.ArrayBuffer();
        let progress = 0;
        let count = 0;

        const loadNext = (index) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(chunks[index].file);
            reader.onload = (e) => {
                // 累加器 不能依赖index，
                count++;
                // 增量计算md5
                spark.append(e.target.result);
                if (count === chunks.length) {
                    // 通知主线程，计算结束
                    self.postMessage({
                        progress: 100,
                        hash: spark.end(),
                    });
                } else {
                    // 每个区块计算结束，通知进度即可
                    progress += 100 / chunks.length;
                    self.postMessage({
                        progress,
                    });
                    // 计算下一个
                    loadNext(count);
                }
            };
        };
        // 启动
        loadNext(0);
    };
    ```
    2. 时间切片time-slice，`requestIdleCallback`
    ```js
    async calculateHashIdle(chunks) {
        return new Promise(resolve => {
            const spark = new SparkMD5.ArrayBuffer();
            let count = 0;
            const appendToSpark = async file => {
                return new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = e => {
                        spark.append(e.target.result);
                        resolve();
                    };
                });
            };
            const workLoop = async deadline => {
                // 有任务，并且当前帧还没结束
                while (
                    count < chunks.length &&
                    deadline.timeRemaining() > 1
                ) {
                    await appendToSpark(chunks[count].file);
                    count++;
                    // 没有了 计算完毕
                    if (count < chunks.length) {
                        // 计算中
                        this.hashProgress = Number(
                            ((100 * count) / chunks.length).toFixed(2)
                        );
                        // console.log(this.hashProgress)
                    } else {
                        // 计算完毕
                        this.hashProgress = 100;
                        resolve(spark.end());
                    }
                }
                window.requestIdleCallback(workLoop);
            };
            window.requestIdleCallback(workLoop);
        });
    },
    ```
    3. `抽样hash`(牺牲一点可靠性，换取效率，布隆过滤器)
    - 前面1M后面1M，中间每M取前中后2各字节，拼成一个新的二进制
    ```js
    async calculateHashSample() {
        return new Promise(resolve => {
            const spark = new SparkMD5.ArrayBuffer();
            const reader = new FileReader();
            const file = this.container.file;
            // 文件大小
            const size = this.container.file.size;
            let offset = 2 * 1024 * 1024;

            let chunks = [file.slice(0, offset)];

            // 前面100K
            let cur = offset;
            while (cur < size) {
                // 最后一块全部加进来
                if (cur + offset >= size) {
                    chunks.push(file.slice(cur, cur + offset));
                } else {
                    // 中间的 前中后去两个子杰
                    const mid = cur + offset / 2;
                    const end = cur + offset;
                    chunks.push(file.slice(cur, cur + 2));
                    chunks.push(file.slice(mid, mid + 2));
                    chunks.push(file.slice(end - 2, end));
                }
                // 前取两个字节
                cur += offset;
            }
            // 拼接
            reader.readAsArrayBuffer(new Blob(chunks));

            // 最后100K
            reader.onload = e => {
                spark.append(e.target.result);

                resolve(spark.end());
            };
        });
    },
    ```

### 5. `断点续传`：后端需要通过上一步的唯一hash标识，来判定文件是不是上传过
- 如果该文件已经上传成功了，即`文件秒传`，直接提示成功
- 如果该文件不存在，则获取已经上传过的切片列表：
```js
// 判断文件是否存在,如果不存在，获取已经上传的切片
const { uploaded, uploadedList } = await this.verify(
    this.container.file.name,
    this.container.hash
);

if (uploaded) {
    return this.$message.success("秒传:上传成功");
}
this.chunks = chunks.map((chunk, index) => {
    const chunkName = this.container.hash + "-" + index;
    return {
        fileHash: this.container.hash,
        chunk: chunk.file,
        index,
        hash: chunkName,
        progress: uploadedList.indexOf(chunkName) > -1 ? 100 : 0,
        size: chunk.file.size
    };
});
// 传入已经存在的切片清单（续传时之前已上传的分片）
await this.uploadChunks(uploadedList);
```
- 当本次上传和已经上传的分片，等于文件全部大小时，需要通知后端进行`分片合并`
```js
async uploadChunks(uploadedList = []) {
    // 这里一起上传，碰见大文件就是灾难
    // 没被hash计算打到，被一次性的tcp链接把浏览器稿挂了
    // 异步并发控制策略，我记得这个也是头条一个面试题
    // 比如并发量控制成4
    const list = this.chunks
        .filter(chunk => uploadedList.indexOf(chunk.hash) == -1)
        .map(({ chunk, hash, index }, i) => {
            const form = new FormData();
            form.append("chunk", chunk);
            form.append("hash", hash);
            form.append("filename", this.container.file.name);
            form.append("fileHash", this.container.hash);
            return { form, index, status: Status.wait };
        });
    // .map(({ form, index }) =>
    //   request({
    //     url: "/upload",
    //     data: form,
    //     onProgress: this.createProgresshandler(this.chunks[index]),
    //     requestList: this.requestList
    //   })
    // );
    // await Promise.all(list);
    try {
        const ret = await this.sendRequest(list, 4);
        if (uploadedList.length + list.length === this.chunks.length) {
            // 上传和已经存在之和 等于全部的再合并
            await this.mergeRequest();
        }
    } catch (e) {
        // 上传有被reject的
        this.$message.error("亲 上传失败了,考虑重试下呦");
    }
},
```
- 断点续传，提供`暂停上传`和`继续上传`功能
```js
async handleResume() {
    this.status = Status.uploading;

    const { uploadedList } = await this.verify(
        this.container.file.name,
        this.container.hash
    );
    await this.uploadChunks(uploadedList);
},
handlePause() {
    this.status = Status.pause;

    this.requestList.forEach(xhr => xhr?.abort());
    this.requestList = [];
},
```

### 6. 如果2个G，每个切片是1M，2000各小切片，上传的时候，如果用Promise.all 会让浏览器卡顿
- 控制并发数，这个本身，也是头条一个经典面试题：`sendReuqest(task,4)`
    - 为什么选并发4？
        - 浏览器并发限制是6，6以上的没意义
        - 直接用6打满，可能会影响别的，选4比较合适

（见7处代码）

### 7. 弱网报错，网络抖动，报错
- `自动重试`比如说3次，每个切片3次机会
```js
async sendRequest(urls, max = 4, retrys = 3) {
    return new Promise((resolve, reject) => {
        const len = urls.length;
        let idx = 0;
        let counter = 0;
        const retryArr = [];
        const start = async () => {
            // 有请求，有通道
            while (counter < len && max > 0) {
                max--; // 占用通道
                console.log(idx, "start");
                const i = urls.findIndex(
                    v =>
                        v.status == Status.wait ||
                        v.status == Status.error
                ); // 等待或者error
                urls[i].status = Status.uploading;
                const form = urls[i].form;
                const index = urls[i].index;
                if (typeof retryArr[index] == "number") {
                    console.log(index, "开始重试");
                }
                request({
                    url: "/upload",
                    data: form,
                    onProgress: this.createProgresshandler(
                        this.chunks[index]
                    ),
                    requestList: this.requestList
                })
                    .then(() => {
                        urls[i].status = Status.done;

                        max++; // 释放通道
                        counter++;
                        urls[counter].done = true;
                        if (counter === len) {
                            resolve();
                        } else {
                            start();
                        }
                    })
                    .catch(() => {
                        // 初始值
                        urls[i].status = Status.error;
                        if (typeof retryArr[index] !== "number") {
                            retryArr[index] = 0;
                        }
                        // 次数累加
                        retryArr[index]++;
                        // 一个请求报错3次的
                        if (retryArr[index] >= 2) {
                            return reject(); // 考虑abort所有别的
                        }
                        console.log(index, retryArr[index], "次报错");
                        // 3次报错以内的 重启
                        this.chunks[index].progress = -1; // 报错的进度条
                        max++; // 释放当前占用的通道，但是counter不累加

                        start();
                    });
            }
        };
        start();
    });
},
```

### 8. 如果只允许上传jpg或者png格式
1. File.name.split('.')[1]=='jpg'
    - 一个pdf文件，重命名xx.jpg就可以越过
2. （最合理的方式）二进制文件头信息来判断，甚至能从二进制信息里直接读取文件宽高
```js
handleFileChange(e) {
    const [file] = e.target.files;
    if (!file) return;

    if(file.size>CHUNK_SIZE){
        this.$message.error("请选择小于2M的文件");
        return;
    }
    if(!this.isImage(file)){
        this.$message.error("请选择正确的图片格式");
        return
    }

    this.file = file;
},
isImage(file) {
    return this.isGif(file) && this.isPng(file) && this.isJpg(file);
},
async isGif(file) {
    const ret = await this.blobToString(file.slice(0, 6));
    const isgif =
        ret === "47 49 46 38 39 61" || ret === "47 49 46 38 37 61";
    if (isgif) {
        console.log("文件是gif");

        const { w, h } = await this.getRectByOffset(
            file,
            [6, 8],
            [8, 10],
            true
        );
        console.log("gif宽高", w, h);
        if (w > IMG_WIDTH_LIMIT || h > IMG_HEIGHT_LIMIT) {
            this.$message.error(
                "gif图片宽高不得超过！" +
                    IMG_WIDTH_LIMIT +
                    "和" +
                    IMG_HEIGHT_LIMIT
            );
            return false;
        }
    }
    return isgif;
    // 文件头16进制 47 49 46 38 39 61 或者47 49 46 38 37 61
    // 分别仕89年和87年的规范
    // const tmp = '47 49 46 38 39 61'.split(' ')
    //               .map(v=>parseInt(v,16))
    //               .map(v=>String.fromCharCode(v))
    // console.log('gif头信息',tmp)
    // // 或者把字符串转为16进制 两个方法用那个都行
    // const tmp1 = 'GIF89a'.split('')
    //                 .map(v=>v.charCodeAt())
    //                 .map(v=>v.toString(16))
    // console.log('gif头信息',tmp1)

    // return ret ==='GIF89a' || ret==='GIF87a'
    // 文件头标识 (6 bytes) 47 49 46 38 39(37) 61
},
async isPng(file) {
    const ret = await this.blobToString(file.slice(0, 8));
    const ispng = ret === "89 50 4E 47 0D 0A 1A 0A";
    if (ispng) {
        console.log("png宽高", w, h);
        const { w, h } = await this.getRectByOffset(
            file,
            [18, 20],
            [22, 24]
        );
        if (w > IMG_WIDTH_LIMIT || h > IMG_HEIGHT_LIMIT) {
            this.$message.error(
                "png图片宽高不得超过！" +
                    IMG_WIDTH_LIMIT +
                    "和" +
                    IMG_HEIGHT_LIMIT
            );
            return false;
        }
    }
    return ispng;
},
async isJpg(file) {
    // jpg开头两个仕 FF D8
    // 结尾两个仕 FF D9
    const len = file.size;
    const start = await this.blobToString(file.slice(0, 2));
    const tail = await this.blobToString(file.slice(-2, len));
    const isjpg = start === "FF D8" && tail === "FF D9";
    if (isjpg) {
        const heightStart = parseInt("A3", 16);
        const widthStart = parseInt("A5", 16);
        const { w, h } = await this.getRectByOffset(
            file,
            [widthStart, widthStart + 2],
            [heightStart, heightStart + 2]
        );
        console.log("jpg大小", w, h);
    }
    return isjpg;
},
```



### 9. 切片大小如何确定？`慢启动上传`
- 参考 TCP的`慢启动`逻辑
    1. 先丢一个小切片，比如4，10，或者100kb都OK，记录一下时间
    2. 成功后，看一下上传耗时来修正下一个区块的大小
```js
async handleUpload1() {
    // @todo数据缩放的比率 可以更平缓
    // @todo 并发+慢启动

    // 慢启动上传逻辑
    const file = this.container.file;
    if (!file) return;
    this.status = Status.uploading;
    const fileSize = file.size;
    let offset = 1024 * 1024;
    let cur = 0;
    let count = 0;
    this.container.hash = await this.calculateHashSample();

    while (cur < fileSize) {
        const chunk = file.slice(cur, cur + offset);
        cur += offset;
        const chunkName = this.container.hash + "-" + count;
        const form = new FormData();
        form.append("chunk", chunk);
        form.append("hash", chunkName);
        form.append("filename", file.name);
        form.append("fileHash", this.container.hash);
        form.append("size", chunk.size);

        let start = new Date().getTime();
        await request({ url: "/upload", data: form });
        const now = new Date().getTime();

        const time = ((now - start) / 1000).toFixed(4);
        let rate = time / 30;
        // 速率有最大和最小 可以考虑更平滑的过滤 比如1/tan
        if (rate < 0.5) rate = 0.5;
        if (rate > 2) rate = 2;
        // 新的切片大小等比变化
        console.log(
            `切片${count}大小是${this.format(
                offset
            )},耗时${time}秒，是30秒的${rate}倍，修正大小为${this.format(
                offset / rate
            )}`
        );
        offset = parseInt(offset / rate);
        // if(time)
        count++;
    }
},
```
### 10. 文件碎片怎么清理
### 11. 文件上传cdn
### 12. 文件的备份



