---
title: HTTP 请求头
tags: [http报文, host, origin, referer]
categories: http
---

# HTTP headers

## 1. host

### 定义

Host 请求头指明了请求（目标）服务器的域名/IP 地址和端口号。

- 组成：域名 + 端口号
- 例子：test.com:1998。如果没有给定端口号，会自动使用被请求服务的默认端口（比如请求一个 HTTP 的 URL 会自动使用 80 端口）。

HTTP/1.1 的所有请求报文中必须包含一个 Host 头字段。如果一个 HTTP/1.1 请求缺少 Host 头字段或者设置了超过一个的 Host 头字段，一个 400（Bad Request）状态码会被返回。

### 用途

我们知道，不同的域名通过 A 记录或者 CNAME 方式可以连接都同一个 IP 下，同一个 IP 也可以设置多个不同站点，那么访问不同的域名都转发到同一 IP，怎么区分这些不同的站点呢，就是用的 Host 字段。这样每次访问都会根据不同的 Host 的信息请求到不同的站点上面。

简而言之，就是主要应用在虚拟主机技术上。虚拟主机（virtual hosting）即共享主机（shared web hosting），可以利用虚拟技术把一台完整的服务器分成若干个主机，因此可以在单一主机上运行多个网站或服务。

![virtual-hosted-sites](./images/virtual-hosted-sites.png)

比如说有一台 ip 地址为 11.11.11.11 的服务器，在这台服务器上部署着淘宝、京东、拼多多的网站，并且配置了三个虚拟主机：a.com, b.com, c.com, 这三个域名都指向 11.11.11.11。 当我们访问 c.com 的网站时，看到的是拼多多的页面而不是淘宝和京东的页面，原因就是 Host 请求头决定着访问哪个虚拟主机。

## 2. referer

2.1 定义：
Referer 首部包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。

组成：协议+域名+端口号+路径+参数（注意，不包含 hash 值）

例子：http://test.com:1998/home

需要注意的是 referer 实际上是 “referrer” 误拼写。

在以下几种情况下，Referer 不会被发送：

来源页面采用的协议为表示本地文件的 “file” 或者 “data” URI；
当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）；
直接输入网址或通过浏览器书签访问；
使用 JavaScript 的 Location.href 或者是 Location.replace()；
使用 html5 中 noreferrer
2.2 用途
服务端一般使用 Referer 首部识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等，还有个常见的用途是图片防盗链。

防盗链原理是：当用户访问网页时，referer 就是前一个网页的 URL；如果是图片的话，通常指的就是图片所在的网页。当浏览器向服务器发送请求时，referer 就自动携带在 HTTP 请求头了。
图片服务器根据这个请求头判断，如果 referer 不是自己的服务器，就将其拦截。

比如说掘金的图片：

https://user-gold-cdn.xitu.io/2019/9/23/16d5d0e6314aac90?imageView2/0/w/1280/h/960/format/webp/ignore-error/1

直接在浏览器中打开是可以访问的，因为此时 referer 不会被发送。

而如果把图片放到自己的网站下，是看不到正常图片的。

因为 referer 不在掘金白名单里。（掘金、微信等客户端能看到，因为在掘金白名单里）

那么如何破解盗链呢，常用的是用一个服务器程序作为代理爬虫，服务器爬虫可以自由地设置请求头。

但是 referrer 存在很多问题。比如说在请求外部网站的时候，携带着 url 的很多参数信息，而这些信息实际上是隐私的，所以存在一定的隐私暴露风险。
下面的 origin 就不存在这种隐私问题。

## 3. origin

3.1 定义
请求首部字段 Origin 指示了请求来自于哪个站点。该字段仅指示服务器名称，并不包含任何路径信息。除了不包含路径信息，该字段与 Referer 首部字段相似。

该首部用于 CORS 请求或者 POST 请求。

组成：协议+域名+端口号

注意：只有跨域请求（可以看到 response 有对应的 header：Access-Control-Allow-Origin），或者同域时发送 post 请求，才会携带 origin 请求头。
如果浏览器不能获取请求源，那么 origin 满足上面情况也会携带，不过其值为 null。

而 referer 不论何种情况下，只要浏览器能获取到请求源都会携带。如果浏览器如果不能获取请求源，那么请求头中不会携带 referer。

3.2 用途
用于 CORS: 当我们的浏览器发出跨站请求时，服务器会校验当前请求是不是来自被允许的站点。服务器就是通过 Origin 字段的值来进行判断。

- [HTTP headers 之 host, referer, origin](https://blog.csdn.net/wanglele16/article/details/101547020)
