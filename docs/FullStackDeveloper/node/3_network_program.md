# 3、网络编程

## 课程目标

- 掌握HTTP协议
- 掌握跨域尤其是CORS
- 掌握bodyparser原理
- 掌握上传原理
- 了解socketio实现实时聊天程序
- 了解爬虫

*所谓端口，其实也是在TCP/IP层面的事情。总共有65535个端口，前8000个是已经被系统占用的，后面的端口随便用。*

## 套接字编程Socket

原理：Net模块提供一个异步API能够创建基于流的TCP服务器，客户端与服务器建立连接后，服务器可以获得一个全双工Socket对象，服务器可以保存Socket对象列表，在接收某客户端消息时，推送给其他客户端。

Socket实现
```js
const net = require('net')
const chatServer = net.createServer()
const clientList = []

chatServer.on('connection', client => {
    client.write('Hi!\n')

    clientList.push(client)
    client.on('data', data => {
        // console.log('receive:', data.toString())
        clientList.forEach(v => {
            v.write(data)
        })
    })
})
chatServer.listen(9000)
```

通过Telnet模拟客户端，连接服务器：
```bash
telnet localhost 9000
```
当开启多个终端输入时，会广播到所有终端




## HTTP协议


## 跨域


## Bodyparser

表单传输：Content-type:application/x-www-form-urlencoded
```html
<form action="/api/save" method="post">
  <input type="text" name="abc" value="123">
  <input type="submit" value="save">
</form>
```
::: warning
post方式的body数据，接收和承载的内容可能会比较多，就不能直接放在内存里处理，因为可能会挂掉。

因此，**post的body数据，需要`以流的方式来接收`**。
:::
原生流处理方式：
```js
// api.js
else if (method === "POST" && url === "/api/save") {
  let reqData = [];
  let size = 0;
  req.on('data', data => {
    console.log('>>>req on', data);
    reqData.push(data);
    size += data.length;
  });
  req.on('end', function () {
    console.log('end')
    const data = Buffer.concat(reqData, size);
    console.log('data:', size, data.toString())
    res.end(`formdata:${data.toString()}`)
}); }
```

关于post的body请求，一定得有流的处理。上述方式又过于繁琐，因此，`bodyparser中间件`其实就是帮我们完成这个 **req.on('data', function() {})** 的过程的。


```js
application/json

await axios.post("/api/save", {
            a: 1,
b: 2 })

// 模拟application/x-www-form-urlencoded await axios.post("/api/save", 'a=1&b=3', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
}, })
```


## 文件上传（未完成）





## 实战爬虫

爬虫原理：服务端模拟客户端，发送请求到目标服务器，获取⻚面内容并解析，获取其中关注部分的数据。

一个简单的定向爬取电影天堂标题内容的爬虫：
```js
const originRequest = require("request");
const cheerio = require("cheerio"); // 服务端的jquery
const iconv = require("iconv-lite");

function request(url, callback) {
    const options = {
        url: url,
        encoding: null
    };
    originRequest(url, options, callback);
}

for (let i = 100553; i < 100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url, function (err, res, body) {
        const html = iconv.decode(body, "gb2312");
        const $ = cheerio.load(html);
        console.log($(".title_all h1").text());
    });
}
```


## websocket：即时通讯IM


## websocket：socket.io


## https 与 http2



## RESTful架构

REST，互联网应用程序的API设计理论，即（Representational State Transfer，`表现层状态转化`）。如果一个架构符合REST原则，就称它为RESTful架构。

- "资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。
- 每一个URI代表一种资源，但是只代表资源的位置。它的具体表现形式，应该在HTTP请求的头信息中用Accept和Content-Type字段指定，这两个字段才是对"表现层"的描述。
- 客户端通过5个HTTP动词，对服务器端资源进行操作，实现"`表现层状态转化`"。
```
GET（SELECT）：从服务器取出资源（一项或多项）。
POST（CREATE）：在服务器新建一个资源。
PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
DELETE（DELETE）：从服务器删除资源。
```

[理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)

[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)



