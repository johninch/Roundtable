## 基础知识提纲

### 面试注意点

- 回答项目问题

  - 项目背景: 简要说一下项目的背景,让面试官知道这个项目是做什么的
  - 个人角色: 让面试官知道你在这个项目中扮演的角色
  - 难点: 让面试官知道你在项目开发过程中碰到的难点
  - 解决方案: 针对上面的难点你有哪一些解决方案, 是如何结合业务进行取舍的
  - 总结沉淀: 在攻克上述的难点后有没有沉淀出一套通用的解决方案, 有没有将自己的方案在大部门进行推广等等

- 向面试官提问
  - 禁忌
    - 切忌问结果
    - 切忌问工资
    - 切忌问技术问题
  - 有几个比较好的提问可供参考:
    - 如果我入职这个岗位的话,前三个月你希望我能做到些什么?
    - 你对这个职位理想人选的要求是什么?你觉得我在这个要求体系下欠缺的是什么？
    - 请不要问一些技术无关 的问题，比如:几点下班，团队现在多少人等;这些问题可以留给 hr 来解答 。 最好是根据面试情况，问一下技术方向的话题，比如性能优化你回答的不好，问面试 官，如何提高这方面的技术，尽量表现出对技术的追求，面试官会喜欢的

### 知识点列表

### details

::: details 列表带解释

- js 连等赋值问题

```js
var a = { n: 1 };
var b = a; // 持有a，以回查
a.x = a = { n: 2 };
alert(a.x); // --> undefined
alert(b.x); // --> {n:2}
```

- 错误监控

  - 即时运行错误的捕获方式：
    - try..catch..
    - window.onerror
  - 资源加载错误的捕获方式：
    - object.onerror 比如 img.onerror
    - performance.getEntries()：用 2 需要的去除 1 中已经加载到的资源就是加载失败的资源
      1. performance.getEntries().forEach(item=>{console.log(item.name)}) 遍历出来页面中所有加载到的资源；
      2. document.getElementsByTagName('img') 拿到所有需要的某种需要的资源
  - Error 事件捕获
    window.addEventListener('error', function(e) {
    console.log('捕获', e)
    }, true)
    true 代表事件捕获，如果是 false，也就是事件冒泡，只报错但获取不到该错误

  - 延伸：跨域的 js 运行错误可以捕获吗，错误提示是什么，应该怎么处理?
    可以捕获，但是只能知道 script error，但无法拿到行号列号，处理方法是：
    在客户端 script 标签增加 crossorigin 属性；
    在服务端设置 js 资源响应头 Access-Control-Allow-Origin: \*
    就可以拿到具体的跨域的 js 运行错误了。

- 精度丢失问题：0.1+0.2 !== 0.3

  - 数据均以 2 进制存储，js 使用 64 位双进度浮点数编码，1+11+52，由于尾数位只能存储 52 个数字，这就能解释 toString(2)的执行结果了:由于限制，有效数字第 53 位及以后的数字是不能存储的，它遵循，如果是 1 就向前一位进 1，如果是 0 就舍弃的原则。
  - 0.1 的二进制科学计数法第 53 位是 1，0.2 有着同样的问题，其实正是由于这样的存储，在这里有了精度丢失，导致了 0.1+0.2!=0.3。

- 前端性能优化方向（缓存、发送请求、页面解析、静态资源加载、运行时(可包括框架性能优化)）

  - **（一）缓存**
    - 1. 有些资源和数据可以本地存储，不需要发请求（localStorage、sessionStorage、indexedDB）
    - 2. 内存缓存（Memory）
      - 请求页面及其子资源时，会先检查内存中是否已经有对应资源，这部分是浏览器自己完成的，对我们而言是无感的
    - 3. 使用 Service Worker 和 Cache API
      - Cache API 提供的缓存可以认为是“持久性”的，关闭浏览器或离开页面之后，下次再访问仍然可以使用。通过 Service Worker 的生命周期控制。
    - 4. HTTP 缓存
      - 强缓存
        - 如果响应头部有 Etag 字段，那么浏览器就会将本次缓存写入硬盘中（from disk cache）
        - 如果服务器上设置 Etag 未开启，则放到内存中（from memory cache）
      - 协商缓存
  - **（二）发送请求**
    - 1. 避免多余重定向
    - 2. DNS 预解析
      - DNS 解析是一个递归与迭代的过程
        - hosts 文件中是否有映射
        - 查找本地 DNS 缓存
        - 向 本地 DNS 服务器 递归查询
        - 本地 DNS 服务器 迭代向根域名服务器、顶级域名服务器、二级域名服务器、主机域名服务器查询，直到找到该域名。
      - 开启预解析：`<link rel="dns-prefetch" href="//yourwebsite.com">`
    - 3. DNS 优化：域名发散与域名收敛
      - 域名发散是 pc 端为了利用浏览器的多线程并行下载能力
      - 域名收敛多用于移动端，m 端网速慢 dns 太耗时，收敛提高性能
    - 4. 预先建立连接
      - `<link rel="preconnect" href="//sample.com" crossorigin>` 告诉浏览器，视情况来预先建立 tcp/ip 链接，crossorigin 是可选的设置 CORS
    - 5. 使用 CDN
  - （三）服务端响应

    - 1. 使用流进行响应
    - 2. 业务聚合 BFF，减少请求数和请求时间
    - 3. 负载均衡（只针对高并发量网站）
      - Node.js 处理 IO 密集型请求
      - pm2 实现 Node.js“多线程”，pm2 是对进程实现负载均衡
      - nginx 搭建反向代理，反向代理是对服务器实现负载均衡，通过轮询机制，将用户的请求分配到压力较小的服务器上
        - nginx 中，模块被分为三大类：handler、filter 和 upstream。而其中的 upstream 模块，负责完成网络数据的接收、处理和转发，也是我们需要在反向代理中用到的模块。

  - **（四）页面解析与处理**
    - 1. 资源引用位置
      - 因为 JS 会阻塞 DOM 构建，而 CSSOM 的构建又会阻塞 JS 的执行。
      - CSS 样式表放在 `<head>` 之中（即页面的头部），把 JS 脚本放在 `<body>` 的最后（即页面的尾部）
    - 2. 使用 defer 和 async
      - 在一些与主业务无关的非核心 JS 脚本上使用 async 和 defer 属性
    - 白屏体验优化
      - 白屏时间 = firstPaint - performance.timing.navigationStart
      - 白屏时间内发生了什么:
        回车按下,浏览器解析网址,进行 DNS 查询,查询返回 IP,通过 IP 发出 HTTP(S) 请求
        服务器返回 HTML,浏览器开始解析 HTML,此时触发请求 js 和 css 资源
        js 被加载,开始执行 js,调用各种函数创建 DOM 并渲染到根节点,直到第一个可见元素产生
      - 白屏体验优化
        1. 白屏 loading 提示（在 js 执行期间插入 loading 图）
        ```
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                loading: loading
            })
        ]
        ```
        2. SSR 同构，服务端直出 html
        3. 首次有意义绘制 FMP
           - 在不同框架上都有相应的 Skeleton 骨架屏实现
             - React: antd 内置的骨架图 Skeleton 方案
             - Vue: vue-skeleton-webpack-plugin
  - **（五）页面静态资源**
    - 预加载
      - 通过设置 link 属性来控制预加载
        - DNS Prefetch
        - Preconnect
        - prefetch
        - prerender
        - preload
        - 在 webpack 中使用魔法注释指定
          - /_ webpackPrefetch: true _/
          - /_ webpackPreload: true _/
      - 通过 js 来控制预加载
        - 可以使用 PreloadJS 这个库，提供脚本、样式、图片、字体、SVG 等各类资源的预加载器
    - 代码拆分（code split）与按需加载
    - 提取公共代码：splitChunks 或者 CommonChunkPlugin
    - Tree Shaking
      - 只支持 ESM，因为本质是利用静态分析
      1. 先标记：标记功能需要配置 optimization.usedExports = true 开启
      2. 再 shaking：使用 terser 插件进行 dead 代码摘除
    - 只加载真正所需的 polyfill，减小代码体积。
      - useBuiltIns: entry/usage/false
    - 打包压缩代码资源
      - js 压缩：UglifyJsPlugin
      - html 压缩：HtmlWebpackPlugin，配置 minify 选项
      - 提取 css 并压缩：MiniCssExtractPlugin
      - 开启 Gzip 压缩：配置 nginx 反向代理
        - ！！！不要对图片文件进行 Gzip 压缩，因为会占用后台大量资源，且压缩效果并不理想，「弊大于利」，所以一定要在 gzip_types 配置中把图片的相关项去掉。
    - 图片资源优化
      - 不要在 HTML 里缩放图像：比如不要在 200✖200 的图片容器内使用 400✖400 的图片，用户并不会感到缩放后的大图更清晰，但严重增加了图片传输时间和带宽浪费。
      - 图片懒加载
        - js 懒加载图片，监听滚动判断是否进入视口；（还可以使用更先进的 Intersection Observer API）
        - css 懒加载图片，通过切换 className 的方式
          ```css
          .login {
          	background-url: url(/static/img/login.png);
          }
          ```
      - 使用雪碧图
      - 使用字体图标
      - 使用合适的图片
        - 使用 WebP：一种旨在加快图片加载速度的图片格式，压缩体积大约只有 JPEG 的 2/3
        - HTML5 在 `<img>` 元素上为我们提供了 srcset 和 sizes 属性，可以让浏览器根据屏幕信息选择需要展示的图片。
          - `<img srcset="small.jpg 480w, large.jpg 1080w" sizes="50w" src="large.jpg" >`
    - 平滑加载字体资源
      - 在字体加载的期间，浏览器页面是默认不展示文本内容的。即我们常说的 FOIT (Flash of Invisible Text)。在现代浏览器中，FOIT 持续至多 3 秒。
      - 通过加载策略来降低甚至消除 FOIT
        - 使用 font-display: swap，在加载期间使用默认字体显示
        - 将字体文件转为 base64 的字符串，避免异步加载时的问题
    - 使用 CDN
  - **（六）运行时**

    - 1. 注意强制同步布局
      - 什么是强制同步布局？
        - 即某些 JS 操作会导致浏览器需要提前执行布局操作
      - 使用 rAF 避免强制同步布局
        - 将布局查询的操作放在 requestAnimationFrame 中
      - 批量化元素的布局查询操作，等到下一次 requestAnimationFrame 触发时一起执行
    - 2. 长列表优化
      - 实现 Virtual List，只渲染可见区域附近的列表元素。（只有视口内和临近视口的上下区域内的元素会被渲染）
      - 原生的 Virtual Scroller，`<virtual-scroller>` 是内置（built-in）模块提供的，还不建议在生成环境使用
    - 3. 避免 JavaScript 运行时间过长（线程互斥导致“掉帧”）

      - 使用 rAF 进行任务分解，时间分片
      - 使用 requestIdleCallback 空闲时执行注册回调。防止饿死可以指定第二个参数来设定超时时间。
      - 并行计算，考虑将 CPU 密集型计算场景与主线程并行。在浏览器中启用并行线程可以使用 Web Worker，并行（concurrency）地执行 JS。

        ```js
        // index.js
        const worker = new Worker("worker.js");

        worker.addEventListener(
        	"message",
        	function(e) {
        		console.log(`result is ${e.data}`);
        	},
        	false
        );

        worker.postMessage("start");
        ```


                // worker.js
                self.addEventListener('message', function (e) {
                    if (e.data === 'start') {
                        // 一些密集的计算……
                        self.postMessage(result);
                    }
                }, false);
                ```
            - 页面渲染性能，着重减少重排的发生率：
                - 因为，重排是由CPU处理的，而重绘是由GPU处理的，CPU的处理效率远不及GPU，并且重排一定会引发重绘，而重绘不一定会引发重排。
                - CSS属性读写分离：先读后写，避免出现两者交叉使用，最佳实践是不用JS去操作元素样式
                - 通过切换class或者style.csstext属性去批量操作元素样式
                - DOM元素离线更新：
                    - 对DOM进行相关操作时（innerHTML、appendChild），都可以使用DocumentFragment对象进行离线操作，等元素“组装”完成后再一次插入页面
                    - 或者使用display:none 对元素隐藏，在元素“消失”后进行相关操作
                - 图片在渲染前指定大小：因为img元素是内联元素，所以在加载图片后会改变宽高，严重的情况会导致整个页面重排，所以最好在渲染前就指定其大小，或者让其脱离文档流。
                - 善用 Composite，开启GPU硬件加速（单独触发DOM渲染层）：
                    - GPU会对所有的渲染层作缓存，把那些一直发生大量重排重绘的元素提取出来，单独触发一个渲染层，那样这个元素不就不会“连累”其他元素一块重绘
                    - 给元素设置 3D transform，提升到单独的合成层（比如transform: translateZ(0)）
                    - 合成层在性能优化上的*优点*在于：
                        - 合成层的位图，会交由 GPU 合成，比 CPU 处理要快；
                        - 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层；
                        - 对于 transform 和 opacity 效果，不会触发 layout 和 paint。
                    - 但同时，也要注意避免*层爆炸*，防止在无法进行层压缩的情况下出现过多的层，反而导致性能的下降
            - 滚动事件的性能优化
                - 防抖
                - 节流
                - Passive event listeners使滚动更顺畅（无等待立即滚动）
                    - 原理：当你添加触摸、滚轮的事件监听后，每次触发该事件，浏览器都会先花费时间执行完你的回调，然后根据结果判断是否需要滚动页面。如果的操作花费了 200ms，那页面只能在 200ms 后再滚动或缩放，这就导致了性能问题。
                        ```js
                        document.addEventListener('touchstart', function (e) {
                            // 做了一些操作……
                            e.preventDefault();
                        }, true);


                        document.addEventListener('touchstart', function (e) {
                            // 做了一些操作……
                        }, {passive: true});
                        ```
                    - 比如我不会阻止默认事件，通过传入`{passive: true}`先告诉浏览器不用等（你放心，我没有阻止默认行为，你不用在这儿等了可以先“滚”了），直接滚动页面就行
                    - 注意：addEventListener第三个参数中传入 {passive: true}有兼容性问题，因为对于低版本浏览器来说，第三个参数是用来设置是否进行事件捕获的，所以需要特性检测。
                - 使用 pointer-events: none 禁止鼠标事件
                    - 在用户开始滚动页面的时候, 给body添加 .disable-hover。这个操作可以让鼠标经过元素的时候**禁用hover效果**。
                    ```css
                    .disable-hover {
                        pointer-events: none;
                    }
                    ```
                    ```js
                    var body = document.body,
                        timer;

                    window.addEventListener('scroll', function() {
                        clearTimeout(timer);
                        if(!body.classList.contains('disable-hover')) {
                            body.classList.add('disable-hover')
                        }

                        // 在用户停止滚动操作的时候移除这个class
                        timer = setTimeout(function(){
                            body.classList.remove('disable-hover')
                        },500);
                    }, false);
                    ```
                    - 当前, 给body添加pointer-events属性能够满足绝大多数场景下工作正常, 但是如果子元素设置了pointer-eventes: auto, 这会覆盖父元素的属性, 然后导致滚动的时候页面闪动.
                    ```css
                    .disable-hover,
                    .disable-hover * {
                        pointer-events: none !important;
                    }
                    ```
                    - 一个简单的解决方案是使用星号选择器, 并且添加 !important 属性. 从而保证子元素的pointer-events属性是设置成’none’的.
                    - 不过，张鑫旭有一篇专门的文章，用来探讨 pointer-events: none 是否真的能够加速滚动性能，并提出了自己的质疑。

[前端性能优化之旅](https://alienzhou.github.io/fe-performance-journey/#%E5%89%8D%E7%AB%AF%E9%9C%80%E8%A6%81%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E4%B9%88%EF%BC%9F)
[网站性能优化实战——从 12.67s 到 1.06s 的故事](https://juejin.im/post/5b6fa8c86fb9a0099910ac91#heading-15)
[[译]使用 pointer-events:none 实现 60fps 滚动 (2014.1.4 更新)](http://www.html-js.com/article/1598)
[pointer-events:none 提高页面滚动时候的绘制性能？](https://www.zhangxinxu.com/wordpress/2014/01/pointer-events-none-avoiding-unnecessary-paints/)

- 正向代理：**正向代理隐藏了真实的请求客户端**，服务端不知道真实的客户端是谁，客户端请求的服务都被代理服务器代替来请求。
  - 某些科学上网工具扮演的就是典型的正向代理角色。用浏览器访问 www.google.com 时，被残忍的 block，于是你可以在国外搭建一台代理服务器，让代理帮我去请求 google.com，代理把请求返回的相应结果再返回给我。
- 反向代理：**反向代理隐藏了真实的服务端**，反向代理服务器会帮我们把请求转发到真实的服务器那里去。Nginx 就是性能非常好的反向代理服务器，用来做负载均衡。
  - 当我们请求 www.baidu.com 的时候，背后可能有成千上万台服务器为我们服务，www.baidu.com 就是我们的反向代理服务器

* 前端鉴权

  - session-cookie
    - 利用服务器端的 session（会话）和浏览器端的 cookie 来实现前后端的认证，由于 http 请求是无状态的，服务器正常情况下是不知道当前请求之前有没有来过，这个时候我们如果要记录状态，就需要在服务器端创建一个会话(session)，将同一个客户端的请求都维护在各自的会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建 session，如果有则已经认证成功了，否则就没有认证。
    - 认证过程：
      - 1. 服务器在接受客户端首次访问时在服务器端创建 session 会话，并保存该 session 到`内存中`，或保存在`redis中`（推荐后者），然后给这个 session 生成一个唯一的 sessionId，并在响应头中 setCookie 种下这个 sessionId。
      - 2. 浏览器从响应中解析响应头，然后将 sessionId 保存在本地 cookie 中，浏览器在下次 http 请求的请求头中会带上该域名下的 cookie 信息。
      - 3. 服务器在接受客户端请求时会去解析请求头 cookie 中的 sessionId，并根据此 sessionId 在服务器端查找保存的该客户端的对应 session 会话，判断该请求是否合法。
    - 缺点：
      - 服务器内存消耗大: 用户每做一次应用认证，应用就会在服务端做一次记录，以方便用户下次请求时使用，通常来讲 session 保存在内存中，随着认证用户的增加，服务器的消耗就会很大。
      - 易受到 CSRF 攻击: 基于 cookie 的一种跨站伪造攻击，基于 cookie 来进行识别用户的话，用户本身就携带了值，cookie 被截获，用户就很容易被伪造。
    - 注意：
      - 对于跨域，前端我们设置 axios 的 withCredentials = true 来设置 axios 可以发送 cookie，后端我们需要设置响应头 Access-Control-Allow-Credentials:true，并且同时设置 Access-Control-Allow-Origin 为前端页面的服务器地址，而不能是\*。
  - Token 验证

    - 当用户第一次登录后，服务器生成一个 token 并将此 token 返回给客户端，以后客户端只需带上这个 token 前来请求数据即可，无需再次带上用户名和密码。
    - Token 验证可以是无状态的，也可以是有状态的
      - 有状态 Token（服务端持久化，存入数据库，考虑有效期有两种方案）：
        - 1. 在服务器端保存 Token 状态，用户每次操作都会自动刷新（推迟）Token 的过期时间——Session 就是采用这种策略来保持用户登录状态的
        - 2. 使用 Refresh Token，它可以避免频繁的读写操作。即登录后下发到客户端[token,refreshToken]两个一组，二者是相关联的。当 token 发到服务端过期时并返回过期状态时，前端会把 refreshToken 发到后端，后端对其进行验证并生成新的 token'替换掉原来的 token，前端拿到这个 token'之后就可以重新发送业务请求了。。。refreshToken 的有效期可以设置的长一些，当 refreshToken 也过期的时候，就真的应该让用户重新登录一次了
      - 无状态 Token
        - （如果把所有状态信息都附加在 Token 上，服务器就可以不保存，服务端只需要认证 Token 有效就行了。。。只要服务端能确认是自己签发的 Token，而且其信息未被改动过，就证明是有效 token。。使用对称加密算法来验证“签名”，一般是 HS256）
        - 本质是：用 解析 token 的计算时间换取 创建会话 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
        - 认证过程：
          - 1. 客户端使用用户名跟密码请求登录
          - 2. 服务端收到请求，去验证用户名与密码
          - 3. 验证成功后，服务端会`签发一个 Token`，再把这个 Token 发送给客户端
          - 4. 客户端收到 Token 以后可以把它存储起来，比如放在 `Cookie 里`或者 `LocalStorage 里`
          - 前端每次路由跳转，判断 localStroage 有无 token ，没有则跳转到登录页，有则请求获取用户信息，改变登录状态；
          - 5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
          - 6. 服务端收到请求，然后去验证客户端请求里面带着的 Token
            - 如果验证成功，就向客户端返回请求的数据
            - 如果验证不合法，就返回 401（鉴权失败）
        - JWT，（JSON Web Token）一种跨域认证授权解决方案，无状态 token 解决方案
          - 是一个很长的字符串，中间用点（.）分隔成三个部分：Header（头部）.Payload（载荷）.Signature（签名）
          - token = base64UrlEncode(header) + "." + base64UrlEncode(payload) + signature
            - Header 头部：描述 JWT 元数据的 JSON 对象
            - Payload 载荷：存放实际传递信息的 JSON 对象，需要用 Base64URL 转成字符串
            - Signature 签名：（使用默认签名算法 HS256 生成，传入密钥 secret， Base64URL 相比于 Base64 算法，多了对 URL 里面特殊含义字符的处理，因为 JWT 作为一个令牌 token，可以放在 URL 中传输）
              - signature = HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
          - 使用方式：
            - 方式 1：`Authorization: Bearer <token>`
            - 方式 2：跨域的时候，可以把 JWT 放在 POST 请求的数据体里
            - 方式 3：通过 URL 传输
          - 最大缺点！
            - JWT 的最大缺点是，由于服务器不保存会话，因此，JWT 一旦签发，在到期之前就会始终有效，因此无法在使用过程中废止某个 token，或者更改 token 的权限，除非服务器部署额外的逻辑。
            - 如果用户修改(比如重置密码)或注销了 token，那他之前未到期的 token 怎么废弃掉呢？
              - 比较常用的方式是「维护一个 token 黑名单，失效则加入黑名单中」，从而使后端能够主动让 JWT 失效
    - 有状态 Token 与 JWT 的区别
      - 有状态 Token：token 是随机生成的 UUID，存在 Redis 内存中，服务端验证客户端发送过来的 Token 时，需要去 redis 内存中查找匹配获取用户信息，验证 Token 是否有效。
      - JWT：将 Token 和 Payload 加密后存储于客户端，服务端只需要解密进行校验即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。
    - 前端存储和发送 Token 的两种方式：
      - 1 使用 Header.Authorization + localStorage 存储和发送 token
        - 这种方法可以避免 CSRF 攻击，因为没有使用 cookie，而 CSRF 就是基于 cookie 来攻击的。
        - 但是这种方法容易被 XSS 攻击，因为 XSS 可以攻击 localStorage ，从中读取到 token，如果 token 中的 head 和 payload 部分没有加密，那么攻击者只要将 head 和 payload 的 base64 形式解码出来就可以看到 head 和 payload 的明文了。当然可以加密 payload 保护敏感信息。
      - 2 使用 cookie 存储和发送 token：
        - 这种方法避免 CSRF，需要使用 httpOnly 来使客户端脚本无法访问到 cookie，才能保证 token 安全。
    - Token 优点与缺点

      - 优点：
        - Cookie 是不允许垮域访问的，而 token 可避开同源策略
        - 因为不需要 cookie 了，所以 token 可以避免 CSRF 攻击
        - 解决 session 扩展性问题，Token 可以是无状态的，可以在多个服务间共享
          - token 不需要在服务端去保留用户的认证信息或者会话信息，服务器端只需要根据定义的规则校验这个 token 是否合法就行，这就意味着基于 token 认证机制的应用不需要去考虑用户在哪一台服务器登录了
      - 缺点：
        - Token 相比于 session-cookie 来说就是一个`时间换空间`的方案。token 需要服务端花费更多的时间和性能来对 token 进行解密验证。

    - :100:其实有状态 token 和 sessionId 这种方式其实是差不多的，都是针对每个用户 UUID 生成唯一的字符串来匹配，都需要在服务端来存储。而无论前端是用 cookie 传，还是用 header.Authorization 传，对于后端来说也是差不多的。
      - 但 sessionId 有一个致命问题在于，只会在登录认证的应用服务器上创建对应的 session 会话，而如果有多台服务器，比如做了负载均衡或轮询，则用户登到其他服务器就不行了，因为其他服务器上没有对应的 session 会话，就需要重新创建一个。
      - 而有状态 token 使用 redis 集群来存储已经签发的 token 列表，使用 redis 集群来存而不在「内存」或「应用服务器」中存的原因是：
        - redis 集群相对于「应用服务器」来说，相当于单独的服务器，不会占用应用服务器资源，且方便扩容。
        - redis 集群相对于「内存」来说，相当于一个单独的共享空间，对于多个应用服务器可以共享。
    - 单点登录 SSO
    - 第三方登录 OAuth2.0

[前端面试查漏补缺--(十) 前端鉴权](https://juejin.im/post/5c6e6063f265da2da53ec8f3#heading-0)
[JWT、OAuth 2.0、session 用户授权实战](https://juejin.im/post/5cddae69f265da036207d036#heading-5)
[傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc)
[Token 认证的来龙去脉](https://juejin.im/post/5a6c60166fb9a01caf37a5e5#heading-6)
[跨域认证解决方案-JSON WEB TOKEN 讲解与实战](https://juejin.im/post/5ce272c1e51d45109b01b0f8)

- 前端安全

  - XSS

    - 分类 - XSS 攻击可分为存储型、反射型和 DOM 型 三种
      - 存储型、反射型 都属于服务端安全漏洞
        - `存储型`：攻击者将恶意代码提交到目标网站的`数据库中`。用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。前端执行了恶意代码。
        - 反射型：跟存储型 XSS 的区别是：**存储型 XSS** 的恶意代码`存在数据库里`，**反射型 XSS** 的恶意代码`存在 URL 里`。用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
      - DOM 型 则完全是前端 JS 安全漏洞
        - 把不可信的数据当作代码执行了
    - 防范

      - 防止攻击者提交：输入过滤
        - 但可能会产生乱码
      - 防止恶意代码被执行：

        - 对于服务端的两种：
          - 改成纯前端渲染
            - 代码和数据分开，但对于需要 SSR 的场景是不可行的
          - 对 HTML 做充分转义
            - 对于 HTML 转义通常只有一个规则，就是把 & < > " ' / 这几个字符转义掉
        - 对于前端的 DOM 型：

          - 实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。
            在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。

            如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。

            DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，< a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。

  - 中间人劫持，怎么防止。x-frame-option?白屏的喔，怎么办？也不一定嵌入 iframe 啊，可以嵌入脚本、图片，怎么阻止【描述】
    - https 也不是绝对安全的，中间人劫持攻击，中间人可以获取到客户端与服务器之间所有的通信内容。
      中间人截取客户端发送给服务器的请求，然后伪装成客户端与服务器进行通信；将服务器返回给客户端的内容发送给客户端，伪装成服务器与客户端进行通信。
      通过这样的手段，便可以获取客户端和服务器之间通信的所有内容。
    - 使用中间人攻击手段，必须要让客户端信任中间人的证书，如果客户端不信任，则这种攻击手段也无法发挥作用。
    - 造成中间人劫持的原因是 没有对服务端证书及域名做校验或者校验不完整，
  - [前端面试查漏补缺--(七) XSS 攻击与 CSRF 攻击](https://juejin.im/post/5c6d142151882503b3271f4b)
  - [前端安全面试题](https://www.cxymsg.com/guide/security.html#%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%AF%E8%83%BD%E5%BC%95%E8%B5%B7%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8%E7%9A%84%E7%9A%84%E9%97%AE%E9%A2%98)

* 网络基础

  - http 报文组成
    - 请求行（方法，url，协议版本）、请求头（常用的...）、空行、请求体
    - 响应行（协议版本，状态码）、响应头、空行、响应体
  - http 方法

    - 无连接，无状态
    - get 与 post 区别（6 点）
      - 回退时 get 不会重发请求，post 需要重发
      - get 请求默认会被浏览器缓存，post 不会
      - get 参数会完整保留在历史记录中，post 不会
      - get 传参在 url 中，post 在 request body 中
      - get 参数限制在 2kb，post 无限制
      - get 发一个 tcp 包，post 发两个 tcp 包，先发 headers 响应 100 continue，再发 data 响应 200
    - 状态码
      - 1xx 指示信息
      - 2xx
        - 200 成功
        - 201 Created：请求成功，而且有一个新的资源已经依据请求的需要而建立，通常这是 PUT 方法得到的响应码
        - 204 No content：表示请求成功，但响应报文不含实体的主体部分
        - 206 Partial Content：客户端发送带 Range 头的 Get 请求，服务器会按照 Range 截取对应数据返回，通常用于 video 标签或 audio 标签请求一个大的视音频文件时，返回 range 部分
      - 3xx
        - 301 Moved Permanently：永久重定向
        - 302 Found：临时性重定向
          - ajax302 重定向跨域问题
          - 303 和 307 是 HTTP1.1 新加的，它们是对 HTTP1.0 中的 302 状态码的细化
            - 303，POST 重定向为 GET
            - 307，不会把 POST 转为 GET
        - 304 Not Modified：协商缓存
      - 4xx
        - 400 Bad Request：客户端请求有语法错误
        - 401 unauthorized：缺少身份认证信息
          - 一般是忘加 Authorization 这个请求 Header
        - 403 Forbidden：对被请求页面的访问被禁止
          - 一般是服务端收到并验证了，该用户没有权限访问
          - 在跨域时，也会出现
            - 注意，如果使用了 CORS，非简单请求会先发 OPTIONS 请求，即使跨域也会返回 200，所以就不会出现 403 了
        - 404 Not Found：请求资源不存在
      - 5xx
        - 500 Internal Server Error：服务器错误
        - 503 Server Unavailable：服务器不可用，临时过载宕机
    - 常用端口
      - http 80 、 https 443 、 DNS 53
    - http 工作模式：
      - 普通模式（http1.0 中，默认使用的是短连接）：每个请求/应答，客户端和服务器都要新建一个连接，完成之后立即断开（HTTP 协议为无连接的协议）。
      - 持久连接（http1.1 支持，且 1.1 默认使用长连接）：
        - Keep-alive 模式 又称持久连接或连接重用，指定方式为 Connection: keep-alive
        - keep-alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，keep-alive 功能避免了重新建立连接。
          - 从 tcp/ip 层面来看，长连接需要发送心跳包维持连接，短连接的 tcp 连接会建立并断开
          - 管线化需要长连接才支持（1.1 才支持），只有 get 和 head 可以进行管线化，打包多次请求一次返回多个响应
    - http2.0 与 http1.1 的显著不同点：
      - 1.1：tcp/ip 请求 1 对 1，受 tcp/ip 本身并发数限制（同一域名下并发的 tcp 连接 2-10 个不等），速度慢
      - 2.0：tcp/ip 请求 1 对多，分割成更小的帧请求，速度明显提升。2.0 的出现导致（譬如打包成精灵图，静态资源多域名拆分等）1.1 的优化方式都不重要了。
    - http2.0 特性
      - 多路复用（即一个 tcp/ip 连接可以请求多个资源）；
      - 首部压缩（http 头部压缩，减少体积）；
        - 压缩原理：
          - 使用`Hpack`思想，消息发送端和消息接受端共同维护一份*静态表*和一份*动态表*（这两个合起来充当**字典**的角色），每次请求时，发送方根据字典的内容以及一些特定指定，编码压缩消息头部，接收方根据字典进行解码，并且根据指令来判断是否需要更新动态表。
          - 更新的动态表有利于二次压缩时进一步提升压缩率
          - 据此，可以在传输的过程，简化消息内容，从而降低消息的大小
      - 服务器端推送 server push（服务端可以对客户端的一个请求发出多个响应，可以主动通知客户端）；
      - 二进制分帧（在应用层跟传送层之间增加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量）；
      - 请求优先级（如果流被赋予了优先级，它就会基于这个优先级来处理，由服务器决定需要多少资源来处理该请求）。
    - https
      - 为什么安全
      - 采用什么加密方式
        - 为什么一开始使用非对称加密，传输数据使用对称加密
      - https 通信过程

  - TCP、UDP
    - 工作原理
    - 区别:
      - 都是传输层协议，传输控制协议、用户数据包协议
      - 是否建立连接
      - 是否可靠传输
      - 面向字节流与面向报文
      - 首部字节 20 与 首部 8 字节开销小
      - 一对一 与 1 对 1/1 对多/多对 1/多对多
    - 基于 TCP 的应用层协议：http、ftp
    - 基于 UDP 的应用层协议：dns、rip
    - TCP 如何保证可靠性
      - 什么是建立全双工信道
      - 数据截断为合理长度
      - 对于收到的请求，给出响应
      - 接收方校验包出错会丢弃，且不给出响应
      - 发送方未收到响应，会超时重发
      - 对于失序数据会重新排序，再交给应用层
      - 重复数据会丢弃
      - 提供「流量控制」，基于可变大小的滑动窗口协议
      - 提供「拥塞控制」，通过慢启动、拥塞避免、快重传、快恢复等算法，防止网络风暴
    - 什么是三次握手与四次挥手
  - 5 层网络协议栈
    - 从应用层的发送 http 请求，到传输层通过什么是建立 tcp/ip 连接，再到网络层的 ip 寻址，再到数据链路层的封装成帧，最后到物理层的利用物理介质传输。服务端的接收就是反过来的步骤：
      - 应用层(dns,http)：DNS 解析成 IP 并发送 http 请求；
        - _(表示层)，7 层插入_，web Socket 接口处于表示层。
        - _(会话层)，7 层插入_
      - 传输层(tcp,udp)：建立 tcp 连接（什么是）；
      - 网络层(IP,ARP)：IP 寻址；
      - 数据链路层(PPP)：封装成帧；
      - 物理层(利用物理介质传输比特流)：物理传输（然后传输的时候通过双绞线，电磁波等各种介质）。
    - 完整的 OSI 七层框架，与 5 层相比，在传输层与应用层之间，多了会话层、表示层。
  - DNS 域名解析
    - 流程
      - 本机先找缓存
      - 没有时，递归向本地 dns 服务器，再由其迭代根、二级、主机域，最后递归返回
    - 由于域名解析耗时，可通过 dns-prefetch 优化

- 简述输入 URL 到页面显示全过程

  - DNS 解析
  - 建立 tcp/ip 链接
  - 发送 http 请求，判断是什么缓存类型
  - 客户端拿到资源
  - 开始渲染过程

- 浏览器渲染
  - 浏览器渲染过程
    - dom tree
    - css rule tree
    - render tree
    - layout
    - repaint
    - composite
  - reflow 与 repaint
    - 触发 reflow 的情况：
      - resize
      - dom 结构改变
      - 改变字体大小
      - 最复杂的一种：获取某些属性时。很多浏览器会对回流做优化，会等到数量足够时做一次批处理回流，但是，除了 render 树的直接变化，当获取一些属性时，浏览器为了获得正确的值也会触发回流，这样使得 浏览器批处理优化无效，包括：
        - offset(Top/Left/Width/Height)
        - scroll(Top/Left/Width/Height)
        - cilent(Top/Left/Width/Height)
        - width，height
        - 调用了 getComputedStyle()或者 IE 的 currentStyle
          - js 如何设置获取盒模型对应的宽和高（4 种）
            - 其他两种兼容性不好，也不常用
            - window.getComputedStyle(dom).width
            - dom.getBoundingClientRect().width 相对于 viewport 边界
    - 重排一定伴随着重绘，重绘却可以单独出现。
    - display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。
    - 减少重排重绘：
      - 避免循环操作 dom，创建一个 documentFragment 或 div
      - 使用 display: none，触发两次
      - 将需要多次重排的元素的 position 属性设为 absolute 或 fixed
      - 避免多次读取 offset 等属性。无法避免则将它们缓存到变量
      - 不要用 table 布局
- 浏览器多进程

  - 主进程：只有一个，负责协调、主控
  - 插件进程
  - GPU 进程：3D 绘制，最多一个
  - 浏览器内核（渲染进程）
    - 每个 tab 页都是一个渲染进程
    - 渲染进程又分为 5 大类线程
      - GUI 渲染线程
      - JS 引擎线程
        - GUI 渲染线程 与 JS 引擎线程 互斥
          由于 js 可以操作 DOM，如果同时修改元素属性并同时渲染界面(即 JS 线程和 GUI 线程同时运行)，会导致渲染线程前后获得的元素可能不一致。因此，为了防止渲染出现不可预期的结果，浏览器设定 GUI 渲染线程和 JS 引擎线程为互斥关系
      - 事件触发线程
      - 定时器线程
      - 异步 http 请求线程
    - 什么是 Event Loop（事件循环）
      js 分为两种任务，一种是*同步任务*（synchronous），另一种是*异步任务*（asynchronous）。
      *同步任务*都在`JS引擎线程`上执行，形成一个`执行栈`；
      js 通过「任务队列」来实现异步回调，`事件触发线程`管理一个`任务队列`（task queue）；
      *异步任务*触发条件达成，会由`定时器线程`或`异步http请求线程`将回调事件放到`任务队列`中；
      执行栈中所有同步任务执行完毕，此时 JS 引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行。这个过程不断重复。
    - JS 引擎线程的执行栈中，包括宏任务、微任务
      - 分类：
        - 宏任务，可以理解成每次执行栈中执行的代码
          - setTimeout
          - setInterval
          - setImmediate
          - UI rendering（比如一些改变页面 css 的 js 代码任务）
          - script
          - I/O
        - 微任务，可以理解成 当前宏任务执行过程中所产生的微小任务，并在当前宏任务执行结束时立即执行
          - Promise.then()或 catch()
          - Promise 为基础开发的其它技术，比如 fetch API
          - process.nextTick（Node 独有的）
          - V8 的垃圾回收过程
          - MutationObserver
      - 顺序（由于互斥）：
        - 宏任务-->(可能由当前宏任务所产生的微任务)-->渲染-->宏任务-->(可能由当前宏任务所产生的微任务)-->渲染-->...

- 浏览器工作原理
  - 线程和进程的区别
    - 进程是`资源分配的最小单位`，线程是`CPU调度（即程序执行）的最小单位`；
    - 一个进程可以包含多个线程，**每个进程有自己的独立内存空间，不同进程间数据很难共享**；
    - **同一进程下不同线程间共享**全局变量、静态变量，数据很易共享；
    - 进程要比线程消耗更多的计算机资源；
    - 进程间不会相互影响，而一个线程挂掉将导致其他线程阻塞。
  - 进程间通信 6 种：
    1. 管道 pipe
    2. 命名管道 namedpipe
    3. 消息队列 MessageQueue
    4. 信号量 Semaphore
    5. 共享内存 SharedMemory
    6. 套接字 Socket
  - 线程间通信 3 种：
    1. **锁机制**：包括`互斥锁`、`条件变量`、`读写锁`
    2. 信号量机制
    3. 信号机制
    - 线程死锁的原因：线程竞争与进程推进顺序不对，具体需要同时满足 4 个必要条件
    - 解决死锁的方法：加锁顺序、加锁时限、死锁检测
- 浏览器存储

  - Cookie、Session、Token（Authorization） 区别
  - Cookie 属性设置
  - Cookie 与 WebStorage 区别

- 跨域问题

  - 同源策略：协议、域名、端口
  - 常用跨域策略（8 种）

    - 1、CORS（跨域资源共享）：原理是浏览器在识别 ajax 发送了跨域请求的时候，会将其拦截并在 http 头中加一个`origin字段`，允许跨域通信。

      - CORS 请求分成两类，浏览器对这两种请求的处理是不一样的：简单请求、非简单请求。

        - 判断条件，需同时满足：

          - 必须是三种方法之一：HEAD、GET、POST，
          - 且 header 信息不超出某几种字段
            （同时满足上述两个条件，才是简单请求，比如 header 中常用的 Content-Type：application/json，还有鉴权的 Authorization，都属于非简单请求）

        - 简单请求流程：
          - 浏览器自动在 header 添加一个 origin 字段，表明本次请求来自哪个源（协议、域名、端口）。
          - 如果 origin 在指定范围内，则返回多个 Access-Control-xx 字段
          - 如果 origin 不在指定范围，则响应 header 中不包含 Access-Control-Allow-Origin 字段，浏览器收到后就会抛出错误
        - 注意：默认情况下，Cookie 不包括在 CORS 请求之中。如果要传 cookie，

          - 需要指定 Access-Control-Allow-Credentials: true，
          - 且 Access-Control-Allow-Origin 不能用通配符\*号，必须指定具体域名，
          - 另外，开发者还需要在客户端对 XHR 对象中开启 withCredentials: true。

        - 非简单请求：除那 3 种方法，或者 header 中有常用的 Content-Type：application/json，以及常用在模块鉴权的 Authorization 字段，都是非简单请求
          - 会先发送 一个 OPTIONS 的"预检"请求（里面也包含 origin 字段头信息），用来询问 所在的域名是否在服务器的许可名单之中，以及运行哪些方法和头信息。
          - 如果 origin 在指定范围内，则返回多个 Access-Control-xx 字段
            - 预检通过后之后，就可以发简单请求来完成真正的数据通信了
          - 如果 origin 不在指定范围，则响应 header 中不包含 Access-Control-Allow-Origin 字段，浏览器收到后就会抛出错误
        - 非简单请求可以控制预检请求的发送频率，通过 Access-Control-Max-Age: 600 指定预检有效期

    - 2、服务端代理
      - 通过 nginx 反向代理或者 nodejs 代理请求，原理就是服务端是不受浏览器的同源策略限制的，因此可通过服务端先请求好资源，再从服务端拿来用。
      - 开发环境下可以使用 webpack 的 http-proxy-middleware 中间件，在 devServer 配置 proxy: config.dev.proxyTable 实现代理跨域。
    - 3、JSONP
      - 利用拥有“src”属性的标签的异步加载来实现（如`<script>,<img>,<iframe>`）
      - 允许客户端传一个 callback 参数给服务器，然后服务器返回数据时会用这个 callback 参数作为函数名，包裹住 JSON 数据，返回客户端，客户端执行返回函数
      - Jsonp 只能发 get 请求
    - 4、Hash
      - 利用的原理是“hash 的变动不会触发页面刷新”。
      - 在 iframeB 页面通过监听 window.onhashchange 来拿到 A 页面传来的数据。
    - 5、postMessage
      - HTML5 规范中的新方法 window.postMessage()可以用于安全跨域通信。
    - 6、WebSocket
      - WebSocket 是一种服务器推送技术，支持双向通信，没有同源限制，即允许跨域。协议标识符是 ws（如果加密，则为 wss）。
        var ws = new WebSocket('wss://xxx.xxxx.org')
        ws.onopen = function() { ws.send() }
        ws.onmessage = function() { ws.close() }
        ws.onclose = function() {}
    - 7、document.domain
      - 适用于：主域相同子域不同的页面
    - 8、window.name
      - 在一个窗口的生命周期内，窗口载入的所有的页面都是共享一个 window.name 的

* ES

  - JS = ES + Web API
    - Web API：DOM 操作，BOM 操作，事件绑定，Ajax 等。。
  - nodejs = ES + nodejs API
    - nodejs API：处理 http，处理文件等。。

* ES6
  - let 和 const
    - ES6 中声明变量方式 6 种
    - 块级作用域
    - 暂时性死区（没有变量提升）
    - 重复声明和赋值
  - 普通函数和箭头函数
    - 函数有变量提升吗？声明式会提升，表达式不会提升
    - 箭头函数就是匿名函数，声明会提升，表达式不提升
    - 箭头函数：
      - this 是定义时所在对象
      - 内部无 this，是定义时外部代码块 this，不能用作构造函数，不能 new
      - 无 arguments，用 rest 参数替代
      - 不能用 yield
* ts
  - 优点（得益于静态语言的优势）
    - TS 增加了代码的可读性和可维护性。
      - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了；
      - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好；
      - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等；
    - TS 具有包容性。
      - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可；
      - 即使不显式的定义类型，也能够自动做出类型推论；
      - 编译报错也还是会生成 js 文件；
  - type 和 interface 区别
    - interface 只能定义对象类型；type 声明的方式可以定义原始类型、组合类型
    - interface 可以实现接口的 extends/implements，而 type 不行
    - interface 可以实现接口的 merge，但是 type 不行
    - 其实 type 只是一个类型别名，**并不会产生类型**。所以其实 type 和 interface 其实不是同一个概念，其实他们俩不应该用来比较的，只是有时候用起来看着类似。

- 列举各种排序算法 分别对应的优缺点和时间复杂度
  - 冒泡、选择、插入 都是**O(n^2)**
  - 希尔、归并、快排、堆排序 都是**O(nlogn)**
  - 上面这几种中，冒泡插入归并是稳定的，其他都是不稳定的
- 快排

  - 手写
  - Array.prototype.sort()底层实现
    - V8： <=10 _插入排序 O(n)_； >10 _快排 O(nlogn)_
    - V8 引擎 7.0 版本之后，舍弃快排，因为其不稳定，使用 TimSort 混合排序算法，插入加归并
  - topK 问题
    - 大顶堆，小顶堆：O(nlogk)

- js 原型链与对象
  - 创建对象的 3 种方法
    - 实现 Object.create
  - 构造函数、实例、原型对象 间的关系
  - 原型链的工作原理
  - 实现 new 操作符

* js 基本数据类型

  - 6 基本+1 引用(5 个)
  - 原始类型的特性——不可变性
  - 栈内存与堆内存
  - 基本类型与引用类型的 复制、比较、值传递与引用传递：
    - ECMAScript 中所有的函数的参数都是按值传递的。

* 盒模型
  - box-sizing:
    - `content-box`（`默认值`，`标准盒模型`）：width 与 height 只包括内容的宽和高
    - `border-box` （`IE盒模型`，也叫 Quirks`怪异模型`）：
    - offsetWidth 水平方向 width + 左右 padding + 左右 border-width
    - clientWidth 水平方向 width + 左右 padding
    - margin 与 padding 值设置为百分数时，其值的计算参照 最近父级元素 width，注意，四个方向都是以父级的宽来百分比的
  - JS 如何设置获取盒模型对应的宽和高（4 种）
  - 外边距重叠：垂直方向
  - BFC(块级格式化上下文)
    - 特性
      - 隔离了的独立容器——边距重叠解决方案
      - 可以包含浮动元素，避免高度塌陷（计算 BFC 高度的时候，浮动元素也会参与计算）
    - 创建 BFC
      - float 除 none
      - overflow 除 visible
      - 绝对定位
      - display （inline-blocks，flex，inline-flex，table，table-cells，table-captions...)
* CSS3 种定位机制：普通流、浮动和绝对定位。

  - display
    - 行内元素：**典型行内元素**：span、a、label、input、textarea、select、 img、br、strong、em
      - 不独占一行
      - 元素的高度、宽度、行高及顶部和底部边距不可设置，宽高由包含的元素撑开
      - margin 在垂直方向上不生效；设置 padding 本身生效，但是没有把父级元素撑开
    - 块级元素：**典型块级元素**：div、p、h1、form、ul、li
      - 独占一行
      - 元素的高度、宽度、行高以及顶和底边距都可设置，如果不主动设置，则与其父元素一致
    - line-height：1.5，line-height：150%以及 line-height：1.5em 的区别
  - position
    - 相对定位
      - relative：
        - `相对于自身原有位置进行偏移`，仍处于标准文档流之中。保有原来的 display 属性。
        - **注意**：`relative元素如果设置偏移后，它原来占据的文档流中的位置仍然会保留，不会被其他块浮动过来填补掉。并且，它的偏移也不会把别的块从文档流中原来的位置挤开，如果有重叠的地方它会重叠在其它文档流元素之上`。
    - 绝对定位
      - fixed：以浏览器`可视窗口为基准`偏移
      - absolute：
        - 在无已定位祖先元素时，以根节点`<html>`为基准偏移；
        - 在有已定位祖先元素时，`相对于最近一级的、不是static定位的父元素`来定位。
    - 奇技淫巧：fixed 相对于父元素定位
      - fixed 在特殊情况下不会相对于视口来定位，如果当前元素的父元素 transform 不为 none，不添加:top,bottom,left,right 样式，那么定位的元素就不是依据视口进行定位，而是依据父元素进行定位
  - 居中

    - 垂直居中

      - 1. 对单行文本居中 height line-Height
      - 2. 模拟 div 表格居中 display：table-cell 与 vertical-align: center
      - 3. 绝对定位元素居中 无论知不知道宽高，都
           position: absolute;
           left: 50%;
           top: 50%;
           transform: translate(-50%, -50%);
      - 4. flex 居中 align-items: center;

    - 水平居中
      - 1. 居中行内元素 text-align: center;
      - 2. 居中一个块级元素 width:200px; margin:0 auto;
      - 3. 绝对定位元素居中 无论知不知道宽高，都
           position: absolute;
           left: 50%;
           top: 50%;
           transform: translate(-50%, -50%);
      - 4. flex 居中 justify-content: center;

* 提升页面性能的方法（5 点）
  - 资源压缩合并
  - 善用浏览器缓存
    - 缓存命中流程
      - 强缓存
        - cache-control: public, private, no-store, no-cache
      - 协商缓存
    - 缓存具体原理
      - 与 Last-Modified 不一样的是，当服务器返回 304 Not Modified 的响应时，由于 ETag 重新生成过，response header 中还会把这个 ETag 返回，即使这个 ETag 跟之前的没有变化。
      - 字段优先级
      - 强缓存如何重新加载浏览器缓存里面已经缓存过的资源
  - 非核心代码异步加载（防止 js 阻塞解析）
    - 3 种情况的加载执行图示
    - async 不确保执行顺序，defer 确保
    - defer 在 DOMContentLoaded 事件流触发前执行
    - DOMContentLoaded 与 onload 的区别
  - 静态资源异步加载
    - rel="preload"，本页面可能用到的资源，一般立即加载
    - rel="prefetch"，下个页面可能用到的资源，一般空闲时才加载
    - prefetch 跟 preload 不同在于：用户从 A 页面进入 B 页面，preload 的内容会失效，而 prefetch 的内容可以在 B 页面使用。
  - CDN
    - CDN，内容分发网络。通过在 Internet 中增加一层新的网络架构，将网站的内容发布到最接近用户的网络“边缘”，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。
  - DNS 预解析
    - rel="dns-prefetch"
    - 标签 《meta http-equiv="x-dns-prefetch-control" content="on">在 https 下开启 a 标签的 dns 预解析

- PNG，JPG，GIF，WEBP 的区别
  - jpg 是有损压缩，适合照片，文件小。
  - png 是无损压缩，适合透明图，小图，做照片文件偏大。
  - gif 是一种位图文件格式，以 8 位色重现真色彩的图像。可以实现动画效果。
  - webp 格式是谷歌在 2010 年推出的图片格式，压缩率只有 jpg 的 2/3，大小比 png 小了 45%。
    - 缺点是压缩的时间更久了，兼容性不好，目前谷歌和 opera 支持。

* CSS 样式

  - 选择器优先级
    - 内联样式 > ID 选择器 > 伪类 > 属性选择器 > 类选择器 > 标签选择器 > 通用选择器（\*）
    - 样式表中定义在后面的会覆盖之前的
  - CSS3 新增伪类
    - p:first-of-type：选择属于其父元素的首个 p 元素的每个 p 元素。
    - p:last-of-type：选择属于其父元素的最后 p 元素的每个 p 元素。
    - p:only-of-type：选择属于其父元素唯一的 p 元素的每个 p 元素。
    - p:only-child：选择属于其父元素的唯一子元素的每个 p 元素。
    - p:nth-child(2)：选择属于其父元素的第二个子元素的每个 p 元素。
      - p:nth-child(even)：偶数行
      - p:nth-child(odd)：奇数行
      - p:nth-child(2n)：偶数行
      - p:nth-child(2n+1)：奇数行
      - p:nth-child(-n+3)：n 为 1、2、3 的元素（-n+3>0 的元素）
    - :enabled :disabled：控制表单控件的禁用状态。
    - :checked：单选框或复选框被选中。
  - flex 布局
    - 主轴、交叉轴
    - justify-content 主轴对齐方式
    - align-items 交叉轴对齐方式
    - align-content 交叉轴多根轴线时对齐方式
    - flex：1 （1 1 0）
      - flex-grow 1 放大
      - flex-shrink 1 缩小
      - flex-basis 0 占据空间基准
    - flex：auto (1 1 auto) 和 none (0 0 auto)。
    - 两列布局
      .left {
      flex: 0 0 80px;
      width: 80px;
      }
      .right {
      flex: 1; // 等价于 1 1 0
      }
    - flex-basis 属性定义了在分配多余空间之前，item 占据的主轴空间（main size）。_浏览器根据这个属性，计算主轴是否有多余空间_。它的默认值为 auto，即项目的本来大小。
  - 多种方式实现三栏布局
    - （1）浮动：
    - （2）绝对定位
    - （3）flex 弹性
    - （4）table 表格
    - （5）grid 网格：
      - grid-template-rows:
      - grid-template-column:
    - 只有 flex 弹性布局 与 table 表格布局 是在高度超出后其他块的高度也跟随变高
  - 最后一行左对齐问题
    - flex
      - 案例：每一行列数是固定的
        - 根据个数最后一个元素动态 margin
        ```css
        /* 如果最后一行是3个元素 */
        .list:last-child:nth-child(4n - 1) {
        	margin-right: calc(24% + 4% / 3);
        }
        /* 如果最后一行是2个元素 */
        .list:last-child:nth-child(4n - 2) {
        	margin-right: calc(48% + 8% / 3);
        }
        ```
      - 案例：子元素宽度不固定，最后一行左对齐
        - 方法 1：最后一项 margin-right: auto
        - 方法 2：::after 伪元素 flex:auto 或 flex:1
        ```css
        /* 方法1 */
        .container:nth-of-type(1) > :last-child {
        	margin-right: auto;
        }
        /* 方法2 */
        .container:nth-of-type(2)::after {
        	content: "";
        	flex: auto; /* 或者flex: 1 */
        }
        ```
      - 案例：每一行列数不固定
        - 使用足够的空白标签进行填充占位
    - Grid 布局
      - 天然有 gap 间隙，且天然格子对齐排布，因此，实现最后一行左对齐可以认为是天生的效果。
      - 但是 repeat()函数兼容性不好，IE 不支持
  - 经典布局 Sticky Footer
    `html <div class="wrapper"> <div class="content"><!-- 页面主体内容区域 --></div> <div class="footer"><!-- 需要做到 Sticky Footer 效果的页脚 --></div> </div>`
    - 方法 1：absolute（需指定 html、body 100% 的高度，wrapper 的 min 且 content 的 padding-bottom 需要与 footer 的 height 一致。）
      ```css
      html,
      body {
      	height: 100%;
      }
      .wrapper {
      	position: relative;
      	min-height: 100%;
      	padding-bottom: 50px; // padding-bottom预留footer高度
      	box-sizing: border-box;
      }
      .footer {
      	position: absolute;
      	bottom: 0;
      	height: 50px;
      }
      ```
    - 方法 2：Flexbox（指定 flex 容器为纵向，content flex 1 自动占满可用空间）
      ```css
      html {
      	height: 100%;
      }
      body {
      	min-height: 100%;
      	display: flex;
      	flex-direction: column;
      }
      .content {
      	flex: 1;
      }
      ```

* 移动端问题

  - JSBridge 原理
    - 实现原理（异步双向）
      - JavaScript 调用 Native
        - 1. 注入 API（推荐）
          - webView.window[funcName] = NativeSomeFunc
        - 2. 拦截 URL SCHEME
          - 例如 iframe.src，Native 拦截后根据 URL 参数去做操作
      - Native 调用 JavaScript
        - 执行拼接 JavaScript 字符串，JavaScript 的方法必须在全局的 window 上
  - fastClick

    - 解决的问题（在 H5 端）
      - 手动点击与真正触发 click 事件会存在 300ms 的延迟
        - 延迟的存在是因为浏览器想知道你是否在进行双击操作，如果是双击，移动端会缩放
      - 点击穿透问题（点击行为会穿透元素触发非父子关系元素的事件）
        - 点击穿透是因为 300ms 延迟触发时的副作用。
        - 具体穿透现象：
          比如点击弹窗浮层关闭按钮时，也点击了浮层下页面上对应位置的元素（正常是不应该点击到页面上的对应的元素的）
          之所以说点击穿透是 300ms 延迟触发的副作用，可通过如下过程分析得出：
          手指触碰到屏幕时，触发 touchstart , 弹窗隐藏（这里就已经隐藏了，而如果不是双击，click 可能在 300ms 后才触发）
          手指按上时，可能会有短暂的停留和轻微的移动，触发 touchmove
          手指离开屏幕时，触发 touchend
          等待 300ms 后，看用户在此时间内是否再次触摸屏幕，如果没有
          300ms 后，此时弹窗已消失，浏览器在用户手指离开的位置触发 click 事件，所以点到了页面上的元素
    - fastclick 原理:

      - 在检测到 touchend 事件的时候，会通过 DOM 自定义事件立即触发模拟一个 click 事件，并把浏览器在 300ms 之后真正的 click 事件阻止掉
        - 移动端，当用户点击屏幕时，会依次触发 touchstart，touchmove(0 次或多次)，touchend，mousemove，mousedown，mouseup，click。即【touch 事件】【mouse 事件】【click 事件】
        - touchmove 只有当手指在屏幕发生移动的时候才会触发 touchmove 事件。**在 touchstart ，touchmove 或者 touchend 事件中的任意一个调用 event.preventDefault，mouse 事件 以及 click 事件将不会触发。**
      - 具体实现：
        - `在 touchend 阶段 调用 event.preventDefault`，然后通过 `document.createEvent 创建一个 MouseEvents，然后 通过 event​Target​.dispatch​Event 触发对应目标元素上绑定的 click 事件。`
        - [2019 再聊移动端 300ms 延迟及 fastClick 原理解析](https://juejin.im/post/5ce764a2f265da1b8c19645a#heading-3)

    - 其他解决点击穿透问题的方案：
      1. pointer-events，让被覆盖元素（下层元素 box）短时间内无法触发 click
         CSS3 的 pointer-events 属性有很多值，有用的主要是 auto（与不设置一样） 和 none（元素不再是 target）
         ```js
         // 监听touchstart事件，让下方的box元素先 pointer-events: none。。。延迟350ms后再改回auto
         $(".mask").on("touchstart", function() {
         	console.log("mask-touchstart");
         	$(this).css("display", "none");
         	//让被覆盖元素无法响应click
         	$(".box").css("pointer-events", "none");
         	//恢复被覆盖元素
         	setTimeout(function() {
         		$(".box").css("pointer-events", "auto");
         	}, 300);
         });
         ```
      2. 设置蒙层 mask 消失的延迟
         touch 后延迟 350ms 再隐藏 mask。先把透明度设置为 0，解决视觉层面的效果，在设置定时器延迟，让蒙层元素消失
         ```js
         // 监听touchstart事件，让mask的透明度先设为0，并延迟350ms后再 display: none
         $(".mask").on("touchstart", function() {
         	console.log("mask-touchstart");
         	$(this).css("opacity", 0);
         	setTimeout(function() {
         		$(".mask").css("display", "none");
         	}, 350);
         });
         ```
         - [点击穿透问题的方案](https://www.cnblogs.com/leftJS/p/11095226.html)

  - 移动端适配
    - 基本概念：
      - 物理像素(physical pixel)：物理像素又被称为设备像素，显示设备中一个**最微小的物理部件**；
      - 设备独立像素(density-independent pixel，简称 DIPs)：设备独立像素也称为`密度无关像素`，可以认为是计算机**坐标系统中的一个点**，程序使用的虚拟像素(比如说 CSS 像素)，然后由相关系统转换为物理像素。
      - `设备像素比`(device pixel ratio，简称为`dpr`)：设备像素比 ＝ 物理像素 / 设备独立像素(即 CSS 像素)；
        - 在 JS 中获取 dpr：window.devicePixelRatio。
        - 在 CSS 中，通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio 和 -webkit-max-device-pixel-ratio 进行媒体查询。
          `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>`
    - 适配方案
      1. lib-flexible 手淘 H5
         - rem 就是相对于根元素`<html>`的 font-size 来做计算。
         - 基准：750 设计稿；
         - 通过 Hack 手段来根据设备的 dpr 值相应改变`<meta>`标签中 viewport 的值
           - 根据 dpr 的值来修改 viewport 实现 1px 的线
           - 根据 dpr 的值来修改 html 的 font-size，从而使用 rem 实现等比缩放
           - 使用 Hack 手段用 rem 模拟 vw 特性
         - 与 rem 相对的，`em`是相对于`父级元素font-size`来计算大小的，em 会继承父级元素的字体大小，浏览器默认字体高为 16px，默认 1em=16px\*
      2. Viewport（vw）
         - 以前的 Flexible 方案是通过 JS 来模拟 vw 的特性，但目前，vw 已经得到了众多浏览器的支持，因此可以直接考虑将 vw 单位运用于我们的适配布局中。
           - vw：是 Viewport's width 的简写,1vw 等于 window.innerWidth 的 1%
           - vh：和 vw 类似，是 Viewport's height 的简写，1vh 等于 window.innerHeight 的 1%
           - vmin：vmin 的值是当前 vw 和 vh 中较小的值
           - vmax：vmax 的值是当前 vw 和 vh 中较大的值
           - 如果 window.innerHeight > window.innerWidth 则 vmin 取百分之一的 window.innerWidth，vmax 取百分之一的 window.innerHeight 计算。
         - 使用 vw 来实现页面的适配，并且通过 PostCSS 的插件`postcss-px-to-viewport`把 px 转换成 vw。这样的好处是，我们在撸码的时候，不需要进行任何的计算，你只需要根据设计图写 px 单位
         - 为了更好的实现长宽比，特别是针对于 img、video 和 iframe 元素，通过 PostCSS 插件`postcss-aspect-ratio-mini`来实现，在实际使用中，只需要把对应的宽和高写进去即可
         - 对于 `1px` 是不建议将其转换成对应的 vw 单位的，但在 Retina 下，我们始终是需要面对如何解决 1px 的问题。 - 为了解决 1px 的问题，使用 PostCSS 插件`postcss-write-svg`，自动生成 border-image 或者 background-image 的图片
           缺点： - px 转换成 vw 单位，多少还会存在一定的像素差，毕竟很多时候无法完全整除。 - 当容器使用 vw 单位，margin 采用 px 单位时，很容易造成整体宽度超过 100vw，可以使用 calc()函数解决 vw 和 px 混合使用的问题。
  - 1px border 问题
    - 产生原因：由于不同的手机有不同的 CSS 像素密度，所以设备独立像素（css 像素）中的 1px 并不等于设备的物理像素的 1px。所以当你写 1px 样式时，当 dpr 为 2 时，显示的就是 2px。
    - 解决办法：
      - 使用 viewport 设置 rem 基准（手淘使用的 lib-flexible 就是这种方式）
        ```html
        在devicePixelRatio = 2 时，输出viewport：
        <meta
        	name="viewport"
        	content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
        />
        在devicePixelRatio = 3 时，输出viewport：
        <meta
        	name="viewport"
        	content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no"
        />
        ```
      - 利用 伪类 + transform 实现
        - 原理是：把原先元素相对定位，border 去掉，然后利用 :before 或者 :after 重做 border，设为绝对定位，并 transform 的 scale 缩小为对应 dpr 比例
        ```css
        .border-1px {
        	position: relative;
        	&::before {
        		content: "";
        		position: absolute;
        		left: 0;
        		top: 0;
        		width: 200%;
        		border: 1px solid red;
        		color: red;
        		height: 200%;
        		-webkit-transform-origin: left top;
        		transform-origin: left top;
        		-webkit-transform: scale(0.5);
        		transform: scale(0.5);
        		pointer-events: none; /* 防止点击触发 */
        		box-sizing: border-box;
        		@media screen and (min-device-pixel-ratio: 3),
        			(-webkit-min-device-pixel-ratio: 3) {
        			width: 300%;
        			height: 300%;
        			-webkit-transform: scale(0.33);
        			transform: scale(0.33);
        		}
        	}
        }
        ```
      - 使用 border-image 实现
        ```css
        .test {
        	border: 1px solid transparent;
        	border-image: url("./border-1px.png") 2 repeat;
        }
        ```
      - 使用 box-shadow 模拟边框
      - 直接写 0.5px 边框
        - 这种方法有的浏览器不支持，会识别为 0px
      - [7 种方法解决移动端 Retina 屏幕 1px 边框问题](http://blog.lemonss.net/2016/12/08/retina-1px-border/)
      - [1px 边框解决方案总结](https://juejin.im/post/5af136b8f265da0b7a20a40e#heading-5)

* 事件流
  - DOM2 级 事件规定的事件流包括 3 个阶段：`事件捕获阶段`，`处于目标阶段`，`事件冒泡阶段`。
  - 自定义事件 new Even('test')
  - 事件代理
* 事件循环

* 防抖和节流
  - 防抖是将多次执行变为最后一次执行，节流是将多次执行变为在规定时间内只执行一次。
    - 各自的原理
    - 各自的场景
    - 各自的代码实现

js 编译器
js 解释器

- js 作用域

  - 作用域的作用：作用域决定了内部变量的生命周期(即何时被释放)，以及哪一部分代码可以访问其中的变量
  - 作用域链的用途：是保证对执行环境有权访问的所有变量和函数的有序访问。
  - 作用域的工作流程
    1. 浏览器在首次载入脚本时，会创建全局执行上下文（`全局作用域`），并压入**执行栈**栈顶（`全局执行上下文是永远不会被弹出的`）；
    2. 然后每进入其它作用域（即`函数作用域`）就创建对应的执行上下文并把它压入执行栈的顶部，一旦对应的上下文执行完毕，就从栈顶弹出，并将上下文控制权交给当前的执行栈。
    3. 这样依次执行（最终都会回到全局执行上下文）。
    4. 当前执行上下文执行完毕时，被弹出执行栈，然后如果其没有被引用（没有形成闭包），那么这个函数中用到的内存就会被垃圾处理器*自动回收*。
  - this 绑定规则（4 条）
    - 默认绑定：绑定到全局对象 window 或 global，在严格模式下绑定到 undefined。
    - 隐式绑定：由上下文对象调用，绑定到那个上下文对象（谁调用，指向谁）。
      - 将隐式绑定的函数以回调的形式传递给另一个自定义函数、第三方库函数或者像 setTimeout 这样的内置 JavaScript 函数时，丢失执行上下文，回退到默认绑定规则
    - 主动绑定：由 call 或者 apply(或者 bind)调用，绑定到指定的对象。
    - 由 new 调用：绑定到新创建的实例对象。
      - 构造函数忘记使用 new，则相当于使用实函数，创建全局变量
  - 什么是闭包
    - 创建闭包（2 种）
    - 闭包的缺点
      - 滥用闭包会造成内存的大量消耗
      - 副作用，闭包函数只能取到外层函数变量的最终值。这个问题可以通过立即执行函数解决。
        - 之所以拿到最终值，是因为`函数在预解释阶段，被闭包引用的原始数据也被存在了堆内存中`，等到函数执行阶段，循环变量已经达到最终值，才被传入执行。
        - 使用立即执行函数包裹后，由于函数参数是按值传递的，所以就会将变量 i 的当前值复制给形参 index。
    - 清除闭包常驻内存
      - 当一个内存空间没有变量指向的时候就会被回收。所以直接 `foo = null`
    - 垃圾回收机制
      - 分类
        - 引用计数
        - 【标记清除】，js 引擎使用
      - 存在问题：垃圾回收时停止响应其他操作
        - 优化：【分代回收】，区分“临时”与“持久”对象，多回收临时对象，少回收持久对象。V8 引擎就是用分代回收。
    - 内存泄漏的原因： -【循环引用】和【闭包】
    - 变量和函数声明提升
      - **函数整体在变量整体的下面**（即*变量提升的优先级更高，在最顶上*）。
        - 第一阶段，先提升函数：对所有函数声明进行提升（忽略表达式和箭头函数）
        - 第二阶段，再提升变量因此变量在更高的位置：对所有的变量进行提升，全部赋值为 undefined（如果已经存在，不赋值为 undefined）

- 数据结构

  - 数组
    - 广义上数组和链表的区别：
      - 1. 存储形式：数组是一块连续的空间，声明时就要确定长度。链表是一块可不连续的动态空间，长度可变，每个节点要保存相邻结点指针；
      - 2. 数据查找：数组的线性查找速度快，查找操作直接使用偏移地址。链表需要按顺序检索结点，效率低；
      - 3. 数据插入或删除：链表可以快速插入和删除结点，而数组则可能需要大量数据移动；
      - 4. 越界问题：链表不存在越界问题，数组有越界问题。
    - js 中数组的特点
      - js 中数组是由 Array 构造函数创建的对象，与 java 不同，有 3 个自己的特性
      - 1、无类型：数组成员可以是任意类型，且同一个数组中可以有不同类型的成员
      - 2、长度可变：数组长度可以动态变化，所以 js 中数组不存在越界问题
      - 3、不连续性：数组成员可以不连续
  - Set 和 Map

    - Set
      1. 成员不能重复
      2. 只有健值，没有健名，有点类似数组。
      3. 可以遍历，方法有 add, delete,has
    - weakSet
      1. 成员都是对象
      2. 成员都是弱引用，随时可以消失。 可以用来保存 DOM 节点，不容易造成内存泄漏
      3. 不能遍历，方法有 add, delete,has
    - Map
      1. 本质上是健值对的集合，类似集合
      2. 可以遍历，方法很多，可以跟各种数据格式转换
    - weakMap
      1. 只接受对象作为健名（null 除外），不接受其他类型的值作为健名
      2. 健名所指向的对象，不计入垃圾回收机制
      3. 不能遍历，方法同 get,set,has,delete

  - for in
  - Object.keys
  - Object.getOwnProperty

- 继承
  - ES5
    - 原型链继承
      - 缺点：原型上任何类型的属性值都不会通过实例被重写，但是引用类型的属性值会受到实例的影响而修改
    - 借用构造函数继承
      - 缺点：只实现了部分继承，父类的原型对象上的属性无法被子类继承。
    - 组合继承（原型链+借用构造函数）
      - 特点：借用构造函数拷贝属性副本，与原型链继承共有属性
      - 优化：
        - 解决 Parent 执行两次
        - 解决 s.constructor 指向问题
  - ES6
    - extends
    - super 的两种使用方式：函数、对象
    - ES6 继承与 ES5 继承机制比较
      - ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。
      - ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

* JS 模块化规范

  - 1、CommonJS
    - 同步加载、require/module.exports、以 node.js 为代表
  - 2、AMD
    - 异步加载、依赖前置
  - 3、CMD
    - 异步加载、依赖就近
  - 4、UMD
    - commonjs+AMD
  - 5、ES6Module
    - 成为浏览器和服务器通用的模块解决方案
    - 静态化、使得编译时就能确定模块的依赖关系、输入、输出
    - import，因为是在编译阶段执行，import 会 提升
    - export
    - 目前 import/export 最终都是编译为 require/exports 来执行的
  - ES6 Module 与 CommonJS 两种模块化规范的比较
    - 输出类型不同
      - CommonJS 输出 值的拷贝副本
      - ES6Module 输出 值的引用
    - 执行时机不同
      - CommonJS 运行时加载
      - ES6Module 编译时输出接口
    - 执行位置不同
      - require 可以理解为一个全局方法，就意味着可以在任何地方执行
      - import 因为在编译时执行，所以必须写在文件的顶部
    - 性能差异
      - require 的性能相对于 import 稍低，因为 require 是在**运行时才加载整个模块**并且还赋值给某个变量
      - import 只需要依据 import 中的接口在编译时引入指定模块所以性能稍高
    - 循环加载时处理不同
      - CommonJS require 的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
      - ES6Module import 时成为指向被加载模块的引用，因此在"循环加载"时，也只能由开发者自己保证，真正取值的时候能够取到值。

* web worker

  - web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。用户可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。
  - 分类
    - Dedicated Worker：专用的 worker，只能被创建它的 JS 访问
    - Shared Worker：共享的 worker，可以被同一域名下的 JS 访问
    - Service Worker：事件驱动的 worker，生命周期与页面无关。Service Worker 表示离线缓存文件，其本质是*Web 应用程序*与*浏览器*之间的**代理服务器**。
      - 可以在网络可用时作为浏览器和网络间的代理，也可以在离线或者网络极差的环境下使用离线的缓存文件。
  - Dedicated Worker 和 Shared Worker 专注于解决`「耗时的JS执行 影响 UI响应」`的问题。
  - Service Worker 则是为解决`「Web App 的用户体验不如 Native App」`的普遍问题。

* Webpack

  - 所有文件都是模块，只认识 js 模块，所以要通过一些 loader 把 css、图片等文件转化成 webpack 认识的模块。
  - 打包结果
    - app.js：团队编写的源码入口文件
    - vendor.js：源码依赖的第三方 vendor 代码
    - n.js：按数字索引的团队源码异步拆分部分
    - manifest.js，有些项目也直接命名为 runtime.js：这个 manifest 文件是最先加载的「指引文件」，runtime 通过其记录的模块标识符，处理和加载其他 bundle 文件，使其按要求进行加载和执行。
      - 打包后 js 文件的加载顺序是先 manifest.js，再 vendor.js，之后才是 app.js
  - module、chunk、bundle3 者的关系

    - `module` 在开发中的所有的资源(.js、.css、.png)都是 module，是 webpack 打包前的概念。
    - `chunk` 是 webpack 在进行模块的依赖分析的时候，代码分割出来的代码块。一个 chunk 可能包含若干 module。
    - `bundle` 最终输出到用户端的 chunk，被称之为 bundle；
      - 一般一个 chunk 对应一个 bundle
        - 只有在配置了 sourcemap 时，才会出现一个 chunk 对应多个 bundle 的情况。
        - 而在 entry 指定数组，多个 chunk 会打包到一个 bundle 中。

  - 打包后文件

    - **manifest.js** 内部是一个 IIFE，称为`webpackBootstrap启动器函数`，这个函数会接受一个空数组（命名为 modules）作为参数。

      - 除**manifest.js**外的所有其他 bundle，都往 window["webpackJsonp"]数组里面 push chunkId 和 含有的 modules。
      - 而**manifest.js**提供 3 个核心方法：

        - 1、提供全局函数 `webpackJsonpCallback(data)` 来处理全局的 window["webpackJsonp"] 数组。

        - 2、提供 `__webpack_require__(moduleId)`：作用就是加载执行对应的 module，并且缓存起来。

          - 先判断下 installedModules 中是否有缓存，有则直接返回其 module.exports；
          - 没有的话就执行，将 module 输出的内容挂载到 module.exports 对象上，同时缓存到 installedModules 中。
          - 注意：每个 module 只会在最开始依赖到的时候加载一次，如果有继续依赖的 module，则递归执行，且加载过的依赖值也只执行一次。

        - 3、提供 `__webpack_require__.e(chunkId)`，也就是 `requireEnsure(chunkId)` 异步加载模块，返回 promise。
          - 简单地说，是用来 懒加载某个 chunk 的
          - 传入一个 chunkId，先判断该 chunk 是否已被加载，是的话直接返回一个成功的 promise，并让 then 执行函数的 `__webpack_require__` 对应的 module 即可；
          - 否则，会动态创建一个 script 标签去加载对应 chunk，加载成功后会将该 chunk 中所有 module 注入到 webpackJsonp 中

      - **bundle.js**，app.js 或 n.js 都属于此类。
        - 每个 chunk 都是一个 IIFE 的 webpackJsonp 方法
        - webpackJsonp 的具体 3 个参数见上文，
        - 其内部会使用到`__webpack_require__(moduleId)`去加载执行模块
        - 如果有异步加载的模块，还会使用`__webpack_require__.e(chunkId)`去返回 promise

  - webpack 构建流程：
    - 1、`初始化`：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
    - 2、`编译`：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
    - 3、`输出`：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中。
  - 关键词
    - bundle：webpack 打包出来的文件。
    - chunk：webpack 依赖分析的时候，分割出来的代码块。
    - entry：建立依赖图的起点，3 种方式配置：字符串、数组、对象。
    - output：
      - path：dist 文件夹
      - publicPath：浏览器加载代码的 url 通用部分，即 dist 文件后的路径
    - Loader 在 module.rules 中配置，对象数组，作为模块的解析规则
      - test、use、options
    - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例
      - Plugin 可以监听 Webpack 运行的生命周期中广播出的事件
  - 常用 loader 和 plugin：
    - loader：sass-loader, postcss-loader, css-loader, style-loader, file-loader, vue-loader, babel-loader
    - plugin：uglifyjs-webpack-plugin, terser-webpack-plugin（压缩 js）, define-plugin, CommonsChunkPlugin, SplitChunksPlugin, HashedModuleIdsPlugin, html-webpack-plugin, WebpackManifestPlugin, MiniCssExtractPlugin, HotModuleReplacementPlugin
  - 提高 webpack 开发效率
    - 对打包速度分析：speed-measure-webpack-plugin
    - webpack-merge
    - HotModuleReplacementPlugin
  - 对 bundle 体积进行监控和分析
    - 对打包体积分析：webpack-bundle-analyzer
    - VSCode 插件 Import Cost
  - loader 执行顺序
    - 1、默认情况下，会按照配置文件中的书写顺序 从下往上 处理
    - 2、enforce 强制执行 loader 的作用顺序： - pre 代表在所有正常 loader 之前执行； - post 是所有 loader 之后执行； - inline 官方不推荐使用。
  - 生产环境使用 source map
    - map 文件只要不打开开发者工具，浏览器是不会加载的。
    - 3 种处理方案：
      - hidden-source-map：借助第三方错误监控平台 Sentry 使用。
      - nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高。
      - sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)。
    - 注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积，并降低整体性能。
  - 文件指纹 chunkhash
    - 指纹类别
      - Hash：即每次编译都不同。可以在测试环境打包的 JS 文件中使用'[name].[hash]'
      - `Chunkhash`：不同的 entry 会生出不同的 chunkhash。适用于`生产环境`打包后的 JS 文件'[name].[chunkhash]'，最大限度利用浏览器缓存。
      - Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。
    - [chunkhash]不能和 HMR 一起使用，即开发环境因为不需要持久化缓存，故不要用[chunkhash]、[contenthash]、[hash]，直接用[name]
    - 占位符指定长度 [chunkhash:8]
    - 各类别适用文件
      - JS 文件的指纹设置'[name][chunkhash:8].js'
        - （_js 文件为什么不用 contenthash 呢_？）
        - 因为 js 引入了 css 模块，如果 css 改变，css 使用的 contenthash，css 的指纹变了，但对于引入它的 js 模块来说，如果使用 contenthash，则 js 模块指纹不变。这样就会出错了，因为 js 无法引入更新后的 css 文件。
      - CSS 文件的指纹设置'[name][contenthash:8].css'
        - （_css 文件为什么不用 chunkhash 呢_？）
        - 因为 js 引入了 css 模块，如果 js 改变，js 使用的是 chunkhash，则 chunkhash 会改变，那么其引入的 css 模块也会跟着改变指纹，但这是不合理的，因为 css 自身内容根本没变。
        - 所以 css 要使用 contenthash，只与自身内容有关，无视被哪个 js 模块引用。
      - Images/Fonts 的指纹设置'[name][hash:8].[ext]', 注意，图片字体的 hash 与和 css 或 js 的 hash 概念不一样，是按内容生成的，不是按编译生成的。
  - 持久化缓存 caching（注意 id 问题）
    - 通过指定：output.filename: '[name].[chunkhash].js'，内容改变名字才变
    - 再配合代码分割：将 vendor.js 单独打包。
    - 注意模块 id 变化问题：
      - 异步模块 id 是计数器递增的，如果中间增加了新模块，之后的就要变
      - 使用 HashedModuleIdsPlugin 插件来改变模块 ID 的计算方式，哈希值代替计数 ID
  - 如何将文件名发送到浏览器
    - HtmlWebpackPlugin
    - WebpackManifestPlugin
  - webpack 动态加载就两种方式：
    - import()和 require.ensure，不过他们实现原理是相同的。
  - code splitting

    - 将项目代码中无需立即调用的代码，在代码构建时转变为异步加载的过程。
    - 代码分割入手点（如何分割）
      - 1、`入口文件方式`（Entry Points）
      - 2、`动态引入/懒加载`（Dynamic Imports/Lazy-Loading）
      - 3、`避免重复`（Prevent Duplication）
        - webpack3：CommonsChunkPlugin 提取公共代码块被（Webpack4 废弃了 CommonsChunkPlugin）
          new webpack.optimize.CommonsChunkPlugin() - name: 'vendor', minChunks: module => module.context - name: 'manifest', minChunks: Infinity,
        - webpack4：SplitChunksPlugin 自动分割
          module.exports = {
          optimization: {
          splitChunks: {
          chunks: 'all', // 智能将依赖项提取到独立的 chunk 中, vendor.js
          }
          runtimeChunk: true, // 提取 runtime.js 或叫 manifest.js
          },
          };
    - import()代码分割类型（两种）
      - 静态代码分割
      - 动态代码分割
    - 魔法注释
      - 在 import 关键字后的括号中使用指定注释，对分离出的 chunk 进行命名，指定异步加载模块不同打包模式，使异步模块预加载
    - Webpack 4 引入了 mode 这个选项（提供 development、production 两种模式，如果 mode 是 production，那 Webpack 4 就会开启 Code Splitting。

  - webpack 文件监听原理
    - 开启监听模式(两种方式)
      - 1. 启动 webpack 命令时，带上 --watch 参数，浏览器需刷新
      - 2. 热更新: WDS 使用 HotModuleReplacementPlugin
        - 优点 1：WDS（webpack-dev-server）不刷新浏览器；
        - 优点 2：WDS 不输出文件，⽽是放在内存中；
  - 热更新原理比较难讲清，只要记住上面的两个优点就行了。

  - 优化 Webpack 的构建速度

    - 1、`分包构建`（从 vendor.js 中将不太变动的库依赖单独处理，因为比如 axios 不经常变动，打包进 vendor 中造成包很大，并且经常打包也浪费了构建时间），两种方式：

      - 1、extenals 外部扩展（CDN）
        - webpack 打包时，发现 jquery 定义在 externals，是外部引用的，则不会打包 jquery 代码，从而减少打包时间
      - 2、DLLPlugin && DllReferencePlugin
        - Externals 会有多次引用的问题，所以也不好，DLL 则是 前置不经常更新的第三方库依赖包的构建，来提高真正的 build 和 rebuild 构建效率
        - 只要第三方库没有变化，之后的每次 build 都只需要去打包自己的业务代码
        - webpack 通过 webpack.DllPlugin 与 webpack.DllReferencePlugin 两个内嵌插件实现此功能。
          - DllPlugin 进行分包，生成两个文件（bundlejs、bundle.mainifest.json）；
          - DllReferencePlugin 对 bundle.manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。

    - 2、摇树优化 `Tree shaking`

      - 在打包过程中检测工程中没有被引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉（只对 ES6 Modlue 生效）
      - 原理：
        - tree-shaking 是因为*import 静态引入*的能力，得以*对文件内容进行浅层比较*，去掉未被使用的代码。
      - 如何使用：
        - 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率。
        - 禁用 babel-loader 的模块依赖解析（会转成 commonjs 形式模块，就不能 tree shaking 了）
        - 尽量使用 ESM 版的 lodash(lodash-es)，import { dobounce } from 'lodash-es'
        - 使用插件，去除无用 CSS 代码

    - 3、作用域提升 `Scope hoisting`

      - scope hoisting 会把需要导入的文件直接移入导入者顶部 打包在一起，这就是所谓的 hoisting。
        - Scope hoisting 的收益
          - 代码量明显减少，因为减少了函数声明语句
          - 减少了内存开销
          - 运行速度提升：因为不用多次使用**webpack_require**调用模块。
        - Scope hoisting 的条件
          - 必须使用 ES6 的语法
          - 如何开启：new webpack.optimize.ModuleConcatenationPlugin()
            - 当然开启了也不一定会打包在一起，因为有的是非 ES6 模块或使用异步 import()

    - 4、`压缩代码`

      - 多进程并行压缩 webpack-paralle-uglify-plugin，开启 parallel 参数
      - 压缩 CSS：mini-css-extract-plugin

    - 5、利用`缓存提升二次构建速度`
      - babel-loader 开启缓存（cacheDirectory：true）
      - terser-webpack-plugin：开启缓存（cache：true）

  - webpack 常用配置技巧

    - 省略文件后缀及配置别名：`extensions`、`alias`
    - 模块注入全局变量：使用 `ProvidePlugin` 配置全局注入

  - babel 转译过程：
    - parseing：babylon 进行解析得到 ES6 代码的 AST
    - transforming：plugin 用 babel-traverse 对 AST 转译得到新的 AST
    - generating：用 babel-generator 通过 新的 AST 树生成 ES5 代码

- 前端路由模式

  - SPA：只有一个 HTML 的应用，利用 JS 动态的变换 HTML 的内容，从而来模拟多个视图间跳转。
    - 优点：无需重复加载整个页面，前后端分离职责清晰，服务器压力小
    - 缺点：首次加载耗时多，需要管理前进后退路由，SEO 难度较大
  - 前端路由：

    - 为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和 SEO 时均通过这个特殊的 url 来实现。
    - 前端路由需要实现 2 点：
      - **能改变 url 但不让浏览器向服务器发送请求。**
      - **可以监听到 url 的变化。**
    - hash、history 模式都可以实现上述两点：

      - hash 模式 原理
        - 改变 hash，不会刷新页面，即 不会导致浏览器向服务器发送请求
        - hashchange 事件
      - history 模式 原理
        - h5 提供了 history.pushState() 和 history.replaceState()，因此可以实现：改变 url 同时，不会刷新页面
        - 如何监听呢？因为 history 的改变并不会触发任何事件，所以需要”曲线救国“，拦截所有可能触发 history 改变的情况，变相监听 history 的改变，
          - 只有 4 种 history 改变途径
            - 点击浏览器的前进或后退按钮；window.onpopstate
            - 点击 a 标签；
            - 在 JS 代码中触发 history.pushState 函数；
            - 在 JS 代码中触发 history.replaceState 函数；
      - history 模式为什么需要后端支持？

        - history 在修改 url 后，虽然页面并不会刷新，但如果我们手动刷新，或通过 url 直接进入应用的时候，服务端是无法识别这个 url 的
        - 单页应用，其他 url 服务器会 404
        - 因此，需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回单页应用的 html 文件。

                nginx配置修改，主要增加了：
                ```bash
                location / {
                    try_files $uri $uri/ @rewrites;
                }
                ```
                try_files 是指当用户请求url资源时 www.xxx.com/xxx，try_files 会到硬盘资源根目录里找 xxx。
                - 如果存在名为 xxx 的文件就返回；
                - 如果找不到再找名为 xxx 的目录；
                - 再找不到就会执行@rewrites。（$uri指找文件， $uri/指找目录）
                ```
                location @rewrites {
                    rewrite ^(.+)$ /index.html last;
                }
                ```
                rewrite是nginx中的重定向指令。^(.+)$ 是重定向规则。/index.html重定向路径。

      - 如何选择模式呢？
        - 因为 history 是趋势，我们直接看 hash 的缺点就好了：
          - 更丑；
          - 会导致锚点功能失效；
          - 相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以。

  - 前端路由（重复了，需整理下）
    - hash 模式
      - `hash的变化不会向服务器发送请求，即不会刷新页面，但会触发网页跳转，即前进后退`，而且 hash 的改变会`触发 hashchange 事件`
    - history 模式
      - `history.pushState(state, title, url)` 和 `history.replaceState()` `可以改变 url 同时，不会刷新页面`
      - 监听 url 变化需要通过监听 4 个方面：
        - 监听前进、后退 `window.onpopstate`
          ```js
          window.onpopstate = function(event) {
          	console.log("onpopstate", event.state, location.pathname);
          };
          ```
        - 监听 a 标签点击
        - js 主动 history.pushState
          ```js
          document.getElementById("btn1").addEventListener("click", () => {
          	const state = { name: "page1" };
          	console.log("切换路由到", "page1");
          	history.pushState(state, "", "page1"); // 重要！！
          });
          ```
        - js 主动 history.replaceState
      - 后端支持，无论访问什么 url，都返回 index.html，并且前端需要添加匹配不到路由时展示 404 页面
    - hash 模式相比于 history 模式的优点、缺点：
      - 优点就是更简单
      - 缺点
        - 更丑；
        - 会导致锚点功能失效；
        - 相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以。

* SSR 服务端渲染和同构原理

  - 为什么要服务端渲染（SSR）
    - `避免首屏等待`，即 TTFP，首屏等待时间
    - `更好支持SEO`
  - 主流的 SSR 框架有：
    - NEXT.js，对应 React
    - Nuxt.js，对应 Vue
  - 传统 SSR 与 CSR 客户端渲染（SPA）
  - 前端同构应用（SSR + SPA）：
    - 第一次访问页面是服务端渲染，基于第一次访问，后续的交互就是 SPA 的效果和体验，还不影响 SEO。简单说就是一个前端项目里的组件，部分服务端渲染后输出，部分由客户端异步渲染，既保障网页渲染速度，也有利于搜索引擎 SEO。
  - 同构应用需要解决的 3 个问题

    - 1、`路由同构`：双端路由如何维护
      - 路由配置抽取出来 react-router-config
    - 2、`数据预取同构`：获取数据的方法和逻辑写在哪里
      - 可选方案：使用高阶组件给路由页面组件绑定数据获取方法，比如 withSSR(WrappedCompoennt, getInitialProps)
    - 到这里，实现了双端的数据预取同构，但是数据也仅仅是服务端有，浏览器端是没有这个数据，浏览器会渲染出不同的结构替换服务端的渲染
    - 3、`渲染同构`：如何复用 服务端 html
      - 在服务端将预取的数据注入到浏览器，使浏览器端可以访问到。客户端进行渲染前，需要先将数据传入对应的组件，保证 props 的一致性。
      - 我们的方案是直接挂在 html 中。

  - SSR 之所以能够实现，**本质上是因为虚拟 DOM 的存在**

  - SSR 生命周期注意点：（_mount 钩子都不支持 ssr 端_）

    - 在 React 中，componentDidMount 只在客户端才会执行，在服务器端这个生命周期函数是不会执行的。即服务端不支持 componentDidMount。
    - 在 Vue 中，服务端渲染只支持 beforCreate 和 created 两个钩子函数，不支持 mounted 这个钩子。

  - 其他要注意的问题

    - node 端没有 window 和 webstorage
    - React 通过 renderToString(`<App />`)方法将应用代码转换成字符串，再替换到页面中占位符的位置。
    - ReactDOM.hydrate 会去复用原本已经存在的 DOM 节点，尝试在已有标记上绑定事件监听器。
    - SSR 是不支持异步组件的
      - 我们的方案没有解决这个问题
    - SEO 支持（路由页动态生成 TDK）
      - 采用 react-helmet 库
    - 结合状态管理的 SSR 实现

  - [React 中同构（SSR）原理脉络梳理](https://juejin.im/post/5bc7ea48e51d450e46289eab#heading-0)

* base64

  - 作用：传输、存储和表示二进制。基于 64 个可打印的字符来表示二进制的数据的一种方法。可以用来加密但很简单。
  - 编码原理

* git - git rebase 变基，合并多次本地 commit 记录，使得分支树是线性的
  如果你想要你的分支树呈现简洁，不罗嗦，线性的 commit 记录，那就采用 rebase
  git rebase 操作实际上是将当前执行 rebase 分支的所有基于原分支提交点之后的 commit 打散成一个一个的 patch，并重新生成一个新的 commit hash 值，再次基于原分支目前最新的 commit 点上进行提交，并不根据两个分支上实际的每次提交的时间点排序，rebase 完成后，切到基分支进行合并另一个分支时也不会生成一个新的 commit 点，可以保持整个分支树的完美线性

          另外值得一提的是，当我们开发一个功能时，可能会在本地有无数次commit，而你实际上在你的master分支上只想显示每一个功能测试完成后的一次完整提交记录就好了，其他的提交记录并不想将来全部保留在你的master分支上，那么rebase将会是一个好的选择，他可以在rebase时将本地多次的commit合并成一个commit，还可以修改commit的描述等

          git merge 操作合并分支会让两个分支的每一次提交都按照提交时间（并不是push时间）排序，并且会将两个分支的最新一次commit点进行合并成一个新的commit，最终的分支树呈现非整条线性直线的形式

  :::
