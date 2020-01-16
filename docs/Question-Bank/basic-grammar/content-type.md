---
title: content-type.md
date: 2019-12-12 17:21:04
tags: [http]
---
# HTTP content-type类型

- application/json


- multipart/form-data (Multipart 类型)
FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据；
``` js
var formData = new FormData();
formData.append("username", "Groucho");
formData.append("accountnum", 123456); //数字123456会被立即转换成字符串 "123456"

// HTML 文件类型input，由用户选择
formData.append("userfile", fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
var blob = new Blob([content], { type: "text/xml"});

请求体
title: 122
corporation_id: 201
detail_url: esop/fRwhNbrD7D8.pdf
employees: (binary)
```
<strong>formData只能接受file、blob及string类型</strong>

- application/x-www-form-urlencoded
数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值. 非字母或数字的字符会被 编码: 这也就是为什么这种类型不支持二进制数据(应使用 multipart/form-data 代替).
``` js
POST / HTTP/1.1
Host: foo.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

say=Hi&to=Mom
```
![](https://upload-images.jianshu.io/upload_images/5863464-eefb916cd00ff9f9.png?imageMogr2/auto-orient/strip|imageView2/2/w/813/format/webp)
- MIME类型

MIME的组成结构非常简单；由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型。

MIME类型对大小写不敏感，但是传统写法都是小写

- xml
XML 有两种 MIME 媒体类型：text/xml 和 application/xml：

1. application/xml 媒体类型：推荐使用。如果 MIME 用户代理或 Web 用户代理不支持这个媒体类型，会转为 application/octet-stream，当做二进制流来处理。application/xml 实体默认用 UTF-8 字符集。Content-type: application/xml; charset="utf-8" 或 <?xml version="1.0" encoding="utf-8"?> 都可以生效。

2. text/xml 媒体类型：如果 MIME 用户代理或 Web 用户代理不支持这个媒体类型，会将其视为 text/plain，当做纯文本处理。text/xml 媒体类型限制了 XML 实体中可用的编码类型（例如此时支持 UTF-8 但不支持 UTF-16，因为使用 UTF-16 编码的文本在处理 CR，LF 和 NUL 会导致异常转换）。text/xml 实体在 XML 头指定编码格式无效，必须在 HTTP 头部的 Content-Type: 中指定才会生效（例如 <?xml version="1.0" encoding="utf-8"?> 无法设置字符集，Content-Type: text/xml; charset="utf-8" 则可以）。没有设置字符集时默认使用“us-ascii”字符集。
