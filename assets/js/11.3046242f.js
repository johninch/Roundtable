(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{483:function(t,n,e){t.exports=e.p+"assets/img/WX20191024-122130.6037594d.png"},484:function(t,n,e){t.exports=e.p+"assets/img/nginx-499.3f77c16b.png"},485:function(t,n,e){t.exports=e.p+"assets/img/nginx-499-2.c8bd6a22.png"},486:function(t,n,e){t.exports=e.p+"assets/img/nginx-499-3.3b51bbf0.png"},776:function(t,n,e){"use strict";e.r(n);var s=e(14),a=Object(s.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"nginx-相关问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-相关问题"}},[t._v("#")]),t._v(" Nginx 相关问题")]),t._v(" "),s("blockquote",[s("p",[t._v("Nginx相关问题记录")])]),t._v(" "),s("hr"),t._v(" "),s("h2",{attrs:{id:"_1、nginx目录穿越漏洞"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1、nginx目录穿越漏洞"}},[t._v("#")]),t._v(" 1、Nginx目录穿越漏洞")]),t._v(" "),s("p",[t._v("常见于 Nginx 做反向代理的情况，动态的部分被 proxy_pass 传递给后端端口，而静态文件需要 Nginx 来处理。")]),t._v(" "),s("p",[t._v("假设静态文件存储在 /home/目录下，而该目录在 url 中名字为 files ，那么就需要用 alias 设置目录的别名：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[t._v("location /files "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" alias /home/; "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("此时，访问http://example.com/files/readme.txt， 就可以获取/home/readme.txt文件。")]),t._v(" "),s("p",[t._v("但我们注意到，url上/files没有加后缀/，而alias设置的/home/是有后缀/的，这个/就导致我们可以从/home/目录穿越到他的上层目录：")]),t._v(" "),s("p",[s("img",{attrs:{src:e(483),alt:"目录穿越"}})]),t._v(" "),s("p",[t._v("进而我们获得了一个任意文件下载漏洞。")]),t._v(" "),s("blockquote",[s("p",[t._v("如何解决这个漏洞？")])]),t._v(" "),s("p",[t._v("只需要保证 location 和 alias 的值"),s("code",[t._v("都有")]),t._v("后缀/ 或"),s("code",[t._v("都没有")]),t._v("这个后缀。")]),t._v(" "),s("h2",{attrs:{id:"_2、nginx超时时间设置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2、nginx超时时间设置"}},[t._v("#")]),t._v(" 2、Nginx超时时间设置")]),t._v(" "),s("h3",{attrs:{id:"问题描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题描述"}},[t._v("#")]),t._v(" 问题描述")]),t._v(" "),s("p",[t._v("某些大数据量接口在loading一段时间后提示当前请求异常(此错误提示是前端代码给出的提示)，浏览器network中查看对应接口，显示接口status为failed，爆红，没有response体，且接口时间未1min或多一点。")]),t._v(" "),s("p",[t._v("运维同学查日志后发现 nginx报了499 错误，")]),t._v(" "),s("blockquote",[s("p",[t._v("499 是 nginx 扩展的 4xx 错误，目的只是用于记录，并没有实际的响应。")]),t._v(" "),s("blockquote",[s("p",[t._v("看一下 nginx 源码 ngx_http_request.h 对 499 的定义：")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("/*\n* HTTP does not define the code for the case when a client closed\n* the connection while we are processing its request so we introduce\n* own code to log such situation when a client has closed the connection\n* before we even try to send the HTTP header to it\n*/\n# define NGX_HTTP_CLIENT_CLOSED_REQUEST     499\n")])])]),s("blockquote",[s("p",[t._v("nginx 499 代表客户端请求还未返回时，客户端主动断开连接。")])]),t._v(" "),s("h3",{attrs:{id:"问题解决时间线"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题解决时间线"}},[t._v("#")]),t._v(" 问题解决时间线")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("因为表述为 "),s("strong",[t._v("客户端主动断开连接")]),t._v("，所以团队小伙伴都以为是浏览器主动断开了连接，猜测是不是浏览器有默认超时时间。查阅相关资料后发现Chrome的默认浏览器超时时间至少是5分钟，结合问题中描述的1min，因此判断不是浏览器主动断开连接；")])]),t._v(" "),s("li",[s("p",[t._v("后端同学通过 postman主动调接口，通过html结构的形式，返回 "),s("code",[t._v("504 gateway time-out")]),t._v("：\n"),s("img",{attrs:{src:e(484),alt:""}}),t._v("\n网关超时，且通过postman而不是浏览器，进一步说明和浏览器没有关系，不是前端的锅，汗！")])]),t._v(" "),s("li",[s("p",[t._v("查阅资料：\nnginx 499 是客户端主动断开了连接。这里的客户端概念，"),s("strong",[t._v("是对请求连接过程中的下游服务而言的")]),t._v("，例如"),s("code",[t._v("浏览器与 nginx 之间的连接，浏览器为客户端")]),t._v("；"),s("code",[t._v("nginx 与其分发的服务而言，nginx 是客户端")]),t._v("；php 处理程序中发起的 curl 请求而言，php-fpm 可视为客户端。")]),t._v(" "),s("p",[t._v("这里说客户端不一定是浏览器，有可能是nginx，因此从nginx的超时时间设置入手：")]),t._v(" "),s("p",[t._v("nginx 作为反向代理时，nginx 将请求分发至对应的处理服务器时，有两对超时参数的设置："),s("code",[t._v("proxy_send_timeout")]),t._v(" 和 "),s("code",[t._v("proxy_read_timeout")]),t._v(" ; "),s("code",[t._v("fastcgi_send_timeout")]),t._v(" 和 "),s("code",[t._v("fastcgi_read_timeout")]),t._v("。两对参数分别对应的是 ngx_http_proxy_module 和 ngx_http_fastcgi_module 模块的参数。两对参数默认的超时时间都是 60 s。在 nginx 出现 499 的情况下，可以结合请求断开前的耗时和这两对设定的时间进行对比，看一下是不是在 proxy_pass 或者 fastcgi_pass 处理时，设置的超时时间短了。")]),t._v(" "),s("p",[t._v("因此尝试设置为5分钟：\n"),s("img",{attrs:{src:e(485),alt:""}}),t._v("\n但还是同样报错...")])]),t._v(" "),s("li",[s("p",[t._v("host绑定IP，绕过安全waf，确定问题所在：\n运维同学建议host绑定IP，发现请求没问题了，为什么这样呢？")]),t._v(" "),s("p",[t._v("因为前端到服务器之间，除了通过nginx转发，在此之前还要经过安全waf，"),s("code",[t._v("waf = web application firewall")]),t._v("，即是安全部门在前端到应用前面加一个防火墙，统一实施安全策略，之后再到nginx服务器，再到后端"),s("code",[t._v("（ 浏览器 => 安全waf => nginx服务器 => 后端服务）")]),t._v("：\n"),s("img",{attrs:{src:e(486),alt:""}})]),t._v(" "),s("p",[t._v("通过host绑定对应ip，绕过了安全waf，直接打到nginx服务器，就没有任何问题，因此确定是需要在waf层的nginx设置对应超时时间，解决问题。")])])]),t._v(" "),s("p",[t._v("参考链接："),s("a",{attrs:{href:"https://www.jianshu.com/p/88fb291fc1ec",target:"_blank",rel:"noopener noreferrer"}},[t._v("nginx 499 产生的原因"),s("OutboundLink")],1)])])}),[],!1,null,null,null);n.default=a.exports}}]);