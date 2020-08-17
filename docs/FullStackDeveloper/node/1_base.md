# 1、NodeJS基础

## 课程目标

- 掌握异步I/O概念、promisify用法、流、buffer
- 掌握一个简单http服务（页面、json数据、静态资源）
- 实战一个cli工具（vue路由约定）

## I/O处理

## 异步非阻塞I/O

> CPU的速度很快，但是与CPU配合的磁盘、网络都不够快，导致阻塞。

### 讲清楚 异步I/O，非阻塞I/O

来理解几个概念：
- 阻塞IO(blocking I/O)
- 非阻塞IO(non-blocking I/O)
- 同步IO(synchronous I/O)
- 异步IO(synchronous I/O)

::: danger 这里肯定有人想问，异步I/O和非阻塞I/O不是一回事吗？？

异步I/O和非阻塞I/O`根本不是同一回事`，曾经笔者一直天真的以为非阻塞I/O就是异步I/O T_T(直到看见朴灵大神的深入浅出Node.js)。

:::

::: tip 响水壶的栗子🌰
老张爱喝茶，废话不说，煮开水。出场人物：老张，水壶两把（普通水壶，简称水壶；会响的水壶，简称响水壶）。

- 1、老张把水壶放到火上，立等水开。（`同步阻塞`）老张觉得自己有点傻
- 2、老张把水壶放到火上，去客厅看电视，时不时去厨房看看水开没有。（`同步非阻塞`）老张还是觉得自己有点傻，于是变高端了，买了把会响笛的那种水壶。水开之后，能大声发出嘀~~~~的噪音。
- 3、老张把响水壶放到火上，立等水开。（`异步阻塞`）老张觉得这样傻等意义不大
- 4、老张把响水壶放到火上，去客厅看电视，水壶响之前不再去看它了，响了再去拿壶。（`异步非阻塞`）老张觉得自己聪明了。

所谓`同步异步`，只是对于水壶而言。普通水壶，同步；响水壶，异步。虽然都能干活，但响水壶可以在自己完工之后，提示老张水开了。这是普通水壶所不能及的。同步只能让调用者去轮询自己（情况2中），造成老张效率的低下。

所谓`阻塞非阻塞`，仅仅对于老张而言。立等的老张，阻塞；看电视的老张，非阻塞。情况1和情况3中老张就是阻塞的，媳妇喊他都不知道。虽然3中响水壶是异步的，可对于立等的老张没有太大的意义。所以一般异步是配合非阻塞使用的，这样才能发挥异步的效用。
:::

## 读取文件 fs

```js
// 03-fs
const fs = require('fs')

// 同步调用
const data = fs.readFileSync('./conf.js') // 代码会阻塞在这里
console.log(data)

// 异步调用
fs.readFile('./conf.js', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data)
})

// promisify
const { promisify } = require('promisify')
const readFile = promisify(fs.readFile)

readFile('./conf.js').then(data => console.log(data))


// process.nextTick(async () => {
//     const data = await readFile('./conf.js')
//     console.log('data', data.toString())
// })



```


## Buffer缓冲区
> 读取数据类型为Buffer。因为js实际上是不存在处理二进制数据的功能的。buffer就是为了提供给js来操作二进制的。

Buffer - 用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。八位字节组成的数组，可以有效的在JS中存储二进制数据。

Buffer类似数组，所以很多数组方法它都有。

```js
// 04-buffer.js
// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10) // 分配一个10字节的
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建一个Buffer包含ascii.
// ascii 查询 http://ascii.911cha.com/
const buf2 = Buffer.from('a')
console.log(buf2) // <Buffer 61>


// 创建Buffer包含UTF-8字节
// UTF编码是一种全语言编码
// UFT-8:一种变长的编码方案，使用 1~6 个字节来存储;
// UFT-32:一种固定长度的编码方案，不管字符编号大小，始终使用 4 个字节来存储;
// UTF-16:介于 UTF-8 和 UTF-32 之间，使用 2 个或者 4 个字节来存储，长度既固定又可变。
const buf3 = Buffer.from('汉');
console.log(buf3); // <Buffer e6 b1 89>

// buffer连接，buffer.toString() 就是将二进制转换成Unicode编码
const buf4 = Buffer.concat([buf2, buf3])
console.log(buf4, buf4.toString()) // <Buffer 61 e6 b1 89> a汉


// 写入Buffer数据
buf1.write('hello');
console.log(buf1);

// 读取Buffer数据
console.log(buf3.toString())
```

## http服务

```js
// 05-http.js
// 创建一个http服务器
const http = require('http')
const server = http.createServer((request, response) => {
    response.end('')
})

server.listen(3000)
```

```js
// 打印原型链
function getPrototypeChain(obj) {
    const protoChain = []
    while(obj = object.getPrototypeOf(obj)) {
        protoChain.push(obj)
    }
    protoChain.push(null)

    return protoChain
}
```

```js
// 显示一个首页
const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
    const {url, method} = request;
        if (url === '/' && method === 'GET') {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type':'text/plain;charset=utf-8' });
                    response.end('500，服务器错误');
                    return;
                }
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.end(data);
            })
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/plain;charset=utf-8');
            response.end('404, 页面没有找到');
        }
});

server.listen(3000)
```

```js
// 编写一个接口
else if (url === '/users' && method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json'})
    response.end(JSON.stringify({
        name: 'tom',
        age: 20
    }))
}
```

一个个通过if...else...编写接口是很low的，流行的做法是使用「设计模式：策略模式」来做。


## Stream流

> stream - 是用于与node中流数据交互的接口

读取一张图片，复制并输出
- 复制一张图片，但是不能直接全部承载。也就是不能直接复制好，再移动到另一个地方
- 因此需要使用stream流操作，即通过建立一个「读取流」，建立一个「写入流」，再把二者连起来
- 相当于在两个流之间，建立一个导管（pipe）
```js
const fs = require('fs')

const rs = fs.createReadStream('./01.jpeg')
const ws = fs.createWriteStream('./02.jpeg')

rs.pipe(ws)
```

```js
// 图片接口响应
else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    fs.createReadStream('.' + url).pipe(response);
}
```

*如果流中断了，需要引入虫洞里去*









