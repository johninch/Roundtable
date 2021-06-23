# Http Proxy

本地代理其实有两种方式：

#### 方式 1

1、第一种本地代理方式，比如 devServer 使用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#readme)，本地起代理服务器 httpProxy，浏览器发出 ajax 请求时，比如请求 example.com/abc，实际是请求到 localhost:3000。再由 httpProxy 做代理转发到 example.com/abc 获取数据，从而绕过浏览器跨域限制。

这里特别说明下 `changeOrigin` 配置项，它的作用**并不是为了解决跨域问题，而是去改变请求 header 中的 host 值为 target 地址**。其主要解决的问题是`虚拟主机技术中单 IP 多域名`的情况（💡 Tip: Set the option changeOrigin to true for [name-based virtual hosted sites](https://en.wikipedia.org/wiki/Virtual_hosting#Name-based).）

- 默认情况下，当 localhost 将请求转发到 example.com 时，因为 changeOrigin 为 false，所以会带请求头为 host: localhost:3000。此时如果目标服务器是多虚拟机的情况，则因为没有指定正确的 host 而导致找不到服务，而返回 404；
- 如果设置 changeOrigin: true，当 localhost 将请求转发到 example.com 时，会带请求头为 host: example.com，即指向 target。此时就能正常访问对应服务。
- 当然，如果目标服务器不存在多虚拟机的情况，并且后端应用逻辑无需校验指定请求的 URL，也可以忽略不设置 changeOrigin。

::: tip 虚拟主机技术

简而言之，就是主要应用在虚拟主机技术上。虚拟主机（virtual hosting）即共享主机（shared web hosting），可以利用虚拟技术把一台完整的服务器分成若干个主机，因此可以在单一主机上运行多个网站或服务。

比如说有一台 ip 地址为 11.11.11.11 的服务器，在这台服务器上部署着淘宝、京东、拼多多的网站，并且配置了三个虚拟主机：a.com, b.com, c.com, 这三个域名都指向 11.11.11.11。 当我们访问 c.com 的网站时，看到的是拼多多的页面而不是淘宝和京东的页面，原因就是 Host 请求头决定着访问哪个虚拟主机。

:::

::: tip 跨域的判断原理

首先要明确，跨域的判断是由浏览器完成的，不是服务端。

- 浏览器先根据同源策略对前端 origin 和请求的 target 做匹配，若同源，则直接发送数据请求；若不同源，则发送跨域请求。
- 服务器解析程序收到浏览器跨域请求时，若未配置过任何允许跨域的配置，则响应 header 中不包含 Access-Control-Allow-origin 字段，若有跨域配置，则返回 Access-Control-Allow-origin+ 对应配置规则里的域名的方式。
- 浏览器是明确知道自己请求 header 的 origin 的，首先发送预检请求判断跨域，当收到 http 响应时，发现响应 header 中没有 Access-Control-Allow-origin 字段，说明不允许跨域，则报跨域错误；若有 Access-Control-Allow-origin 字段，则对字段内容和当前域名（即请求 header 的 origin）做比对，如果同源，则说明可以跨域，浏览器发送真实请求；若不同源，则说明该域名不可跨域，不发送真实请求。

:::

#### 方式 2

2、第二种本地代理方式是类似 charles 起代理，当浏览器访问一个地址比如 example.com 时，将其劫持，并做一些访问控制。

## 参考链接

- [浏览器和服务器实现跨域（CORS）判定的原理](https://segmentfault.com/a/1190000003710973)
- [webpack 代理返回 404，changeOrigin 的原理](https://marskid.net/2018/01/13/webpack-devserver-proxy/)
- [Webpack Proxy 工作原理？为什么能解决跨域?](https://www.cnblogs.com/houxianzhou/p/14743623.html)
- [HTTP headers 之 host, referer, origin](https://juejin.cn/post/6844903954455724045#heading-7)
