---
title: 浏览器工作原理
tags: [多进程, 多线程, 渲染进程, cookie, session, Storage]
categories: browser
---

# 浏览器工作原理

## 浏览器是多进程的

按类型分为： 
- Browser进程：浏览器的主进程（负责协调、主控），只有一个；
- 插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建；
- GPU进程：最多一个，用于3D绘制；
- `浏览器渲染进程（浏览器内核）`：默认每个Tab页面一个进程，互不影响，控制页面渲染，脚本执行，事件处理等（有时候会优化，如多个空白tab会合并成一个进程）。

## 浏览器内核是多线程的

每一个tab页面可以看作是浏览器内核进程，然后这个进程是多线程的，它有几大类子线程：
- GUI线程；
- JS引擎线程（这也是为什么js是单线程的）；
- 事件触发线程；
- 定时器线程；
- 网络请求线程。

每次网络请求时都需要开辟单独的线程进行，譬如如果URL解析到http协议，就会新建一个网络线程去处理资源下载。因此浏览器会根据解析出得协议，开辟一个网络线程，前往请求资源。

这部分建议与[从多线程到Event Loop全面梳理](/Question-Bank/browser/process-eventloop.md)一同食用。

## 浏览器存储

### Cookie 和 Session
- Cookie 和 Session都为了用来保存状态信息，都是保存客户端状态的机制，它们都是`为了解决HTTP无状态`的问题的。
- Cookie是保存在客户端浏览器的一小段的文本信息，`每个domain最多只能有20条Cookie`，每个Cookie`长度不能超过4KB`，否则会被截掉。考虑到安全应当使用Session而不是cookie。
- Session保存在服务器上。Session的运行依赖Session Id，而Session Id是存在Cookie中的，也就是说，如果浏览器禁用了Cookie，同时Session也会失效（但是可以通过其它方式实现，比如在url中传递session_id）。如果Cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道Cookie的意义，他只要原样转发Cookie就可以达到目的了。考虑到减轻服务器性能方面，应当使用cookie而不是session。
- 注：
    - cookie的键/值对中的值不允许出现分号、逗号和空白符，因此在设置cookie前要用encodeURIComponent()编码，读取时再用decodeURIComponent()解码；
    - cookie默认的有效期是浏览器会话期间，作用域是整个浏览器而不仅仅局限于窗口或标签页；
    - cookie默认是不能跨域访问的，但对于主域相同子域不同的两个页面，document.domain设置为相同的父域名，即可实现不同子域名之间的跨域通信。

### Cookie 与 Web Storage
H5的Web Storage提供了两个拥有一致API的对象：
- window.localStorage：用来在本地存储永久数据的；
- window.sessionStorage：用来存储会话数据的（也就是tab不关闭时的数据）；
- 这两个对象存储的都是 name/value 。而且与Cookie不同，Web存储的大小比Cookie的大多了（`最少5MB`），而且通过这个策略存储的数据是`永远不会传输至server`的。
- 纵使Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外Cookie不可以跨域调用。但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生。
- 除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像Cookie需要前端开发者自己封装setCookie，getCookie。

