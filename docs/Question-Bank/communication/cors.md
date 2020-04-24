---
title: CORS 跨域资源共享
date: 2019-12-25 18:48:17
tags: [HTTP, 浏览器, 跨域, 预检请求]
---

> 本文主要说明 跨域资源共享CORS 的原理及相关配置，主要涉及的知识点有： 简单请求、非简单请求、预检请求（preflight）。

<!-- more -->

# CORS 跨域资源共享

## 概念简介

CORS（Cross-origin resource sharing）跨域资源共享：需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

## 简单请求与非简单请求

浏览器将CORS请求分成两类：**简单请求**、**非简单请求**。浏览器对这两种请求的处理是**不一样**的。

同时满足以下两个条件就是简单请求：
- 请求方法是以下三种方法之一：HEAD、GET、POST
- HTTP的 header信息 不超出以下几种字段：
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

凡是不同时满足上面两个条件，就属于非简单请求。

## 简单请求的请求响应流程

浏览器发现这次跨域请求是简单请求，就自动在header信息之中，添加一个Origin字段，并直接发出这个CORS请求。
```
GET /cors HTTP/1.1
Origin: http://www.esop.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
Origin字段用来说明，本次请求来自哪个源（协议、域名、端口)。服务器根据这个值，决定是否同意这次请求。

- 如果Origin指定的源，`不在许可范围内`，服务器会返回一个正常的HTTP回应，但响应header中不包含`Access-Control-Allow-Origin`字段。浏览器发现，响应头信息没有Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XHR的onerror回调函数捕获。*注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。*
- 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段：
    ```
    Access-Control-Allow-Origin: http://www.esop.com
    Access-Control-Allow-Credentials: true
    Access-Control-Expose-Headers: FooBar
    Content-Type: text/html; charset=utf-8
    ```
    - **Access-Control-Allow-Origin**：必须。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求；
    - **Access-Control-Allow-Credentials**：选填。布尔值，表示是否允许发送Cookie。**默认情况下，Cookie不包括在CORS请求之中。**设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可；
        - CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定` Access-Control-Allow-Credentials: true`；
        - 另一方面，开发者需要再XHR对象中开启 `withCredentials: true`；
        - 否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。
        - 如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。
        - `注意一点！！！`如果要发送Cookie（Access-Control-Allow-Credentials: true），`Access-Control-Allow-Origin就不能设为星号(通配符)`，必须指定明确的、与请求网页一致的域名，否则请求失败。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie（为什么有这个规则：因为Cookie还是遵循同源策略的，每个Origin的Cookie是不能被其他Origin获取到的，也就是不允许Access-Control-Allow-Origin 的值为“*”）。
        - 另外再啰嗦一句：如果在开发中后端同时设置了Access-Control-Allow-Credentials:true 与 Access-Control-Allow-Origin: *，但依然能正常请求和响应，不是因为上面的注意事项是错的，而是前端启用了 chrome 的 disable-web-security 的设置。而开发完成部署上线后，前后端是同源的不会跨域，所以这样设置也不会导致失败（因为没意义了）。
    - Access-Control-Expose-Headers：选填。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。

## 非简单请求的请求响应流程（需要预检请求preflight）

- 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
- 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。
浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP方法和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

### 发送一个预检请求
假设一个请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header。浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的header信息。
```
OPTIONS /cors HTTP/1.1
Origin: http://www.esop.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
- "预检"请求用的请求方法是**OPTIONS**，表示这个请求是用来询问的。
- 请求header信息里面，关键字段是Origin，表示请求来自哪个源。
- Access-Control-Request-Method：必填的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT
- Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会**额外发送的header信息字段**，上例是X-Custom-Header。

### 预检请求的响应

- `允许响应`：服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
    ```
    HTTP/1.1 200 OK
    Date: Mon, 01 Dec 2008 01:15:39 GMT
    Server: Apache/2.0.61 (Unix)
    Access-Control-Allow-Origin: http://www.esop.com
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Access-Control-Max-Age: 1728000
    Content-Type: text/html; charset=utf-8
    Content-Encoding: gzip
    Content-Length: 0
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    Content-Type: text/plain
    ```
    - 响应中，关键的是`Access-Control-Allow-Origin`字段，表示 http://www.esop.com 可以请求数据。该字段也可以设为星号，表示同意任意跨域请求。
    - Access-Control-Allow-Methods：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求；
    - Access-Control-Allow-Headers：如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段；
    - Access-Control-Allow-Credentials：该字段与简单请求时的含义相同；
    - Access-Control-Max-Age：该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

- `不响应`：浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息（比如`Access-Control-Allow-Origin`）字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XHR对象的onerror回调函数捕获。控制台会打印出如下的报错信息。
    ```
    XMLHttpRequest cannot load http://api.tiger.com.
    Origin http://www.esop.com is not allowed by Access-Control-Allow-Origin.
    ```

### 通过预检请求后的请求

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。

### 不想发预检请求可以么？

- 想要避免发送OPTION请求，只能是发简单请求，但实际的业务中，比如我们的Content-Type绝大多数是`application/json`，此外我们做业务模块权限，请求头里用`Authorization`字段传递token身份令牌，而且我们的请求方法也不一定只是get、post、head，因此不满足简单请求的条件；
- 但是，可以通过`设置预检请求结果缓存时间来减少发起OPTIONS请求的次数`:在响应header中设置 Access-Control-Max-Age:（number）。数值代表preflight request 的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息）可以被缓存多久，单位是秒。如 Access-Control-Max-Age: 600 代表将预检请求的结果缓存10分钟。


## CORS与JSONP的比较

- CORS与JSONP的使用目的相同，但是比JSONP更强大。
- JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
