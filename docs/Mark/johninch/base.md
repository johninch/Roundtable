## 基础知识提纲

### 目录
::: details
- 网络基础
    - http报文组成
    - http方法
        - 无连接，无状态
        - get与post区别（6点）
        - 状态码
            - 1xx 指示信息
            - 2xx
            - 3xx
            - 4xx
            - 5xx
        - 常用端口
        - http工作模式：
            - 普通模式
            - 持久连接
        - http2.0与http1.1的显著不同点：
        - http2.0特性
        - https
            - 为什么安全
            - 采用什么加密方式
            - 为什么一开始使用非对称加密，传输数据使用对称加密
            - https通信过程
            - 中间人劫持，怎么防止
    - TCP、UDP
        - 工作原理
        - 区别:
        - 基于TCP的应用层协议
        - 基于UDP的应用层协议
        - TCP如何保证可靠性
        - 什么是三次握手与四次挥手
    - 5层网络协议栈
    - DNS域名解析
        - 流程
        - dns-prefetch优化
    - 简述输入URL到页面显示全过程


- 浏览器渲染
    - 浏览器渲染过程
    - reflow与repaint
        - 触发reflow的情况：
        - js如何设置获取盒模型对应的宽和高（4种）
        - 重排一定伴随着重绘，重绘却可以单独出现。
        - 减少重排重绘：
- 浏览器多进程
    - 主进程：只有一个，负责协调、主控
    - 插件进程
    - GPU进程：3D绘制，最多一个
    - 浏览器内核（渲染进程）
        - 每个tab页都是一个渲染进程
        - 渲染进程又分为5大类线程
        - 什么是Event Loop（事件循环）
        - JS引擎线程的执行栈中，包括宏任务、微任务
            - 分类：
            - 顺序（由于互斥）

- 浏览器工作原理
    - 线程和进程的区别
    - 进程间通信 6种：
    - 线程间通信 3种：
        - 线程死锁的原因：线程竞争与进程推进顺序不对，具体需要同时满足4个必要条件
        - 解决死锁的方法：加锁顺序、加锁时限、死锁检测
- 浏览器存储
    - Cookie、Session、Token（Authorization） 区别
    - Cookie属性设置
    - Cookie 与 WebStorage 区别

- 跨域问题
    - 同源策略：协议、域名、端口
    - 常用跨域策略（8种）
        - 1、CORS（跨域资源共享）：原理是浏览器在识别ajax发送了跨域请求的时候，会将其拦截并在http头中加一个origin字段，允许跨域通信。
            - CORS请求分成两类，浏览器对这两种请求的处理是不一样的：简单请求、非简单请求。
                - 判断条件
                - 简单请求流程：
                - 注意：默认情况下，Cookie不包括在CORS请求之中。如果要传cookie，
                    - 需要指定Access-Control-Allow-Credentials: true，
                    - 且Access-Control-Allow-Origin不能用通配符*号，必须指定具体域名，
                    - 另外，开发者还需要再客户端对XHR对象中开启 withCredentials: true。
                - 非简单请求：除那3种方法，或者header中有常用的 Content-Type：application/json，以及常用在模块鉴权的Authorization字段，都是非简单请求
                - 非简单请求可以控制预检请求的发送频率，通过  Access-Control-Max-Age: 600 指定预检有效期
        - 2、服务端代理
        - 3、JSONP
            - 利用拥有“src”属性的标签的异步加载来实现（如`<script>,<img>,<iframe>`）
            - 允许客户端传一个callback参数给服务器，然后服务器返回数据时会用这个callback参数作为函数名，包裹住JSON数据，返回客户端，客户端执行返回函数
            - Jsonp只能发get请求
        - 4、Hash
            - 利用的原理是“hash的变动不会触发页面刷新”。
            - 在iframeB页面通过监听window.onhashchange来拿到A页面传来的数据。
        - 5、postMessage
            - HTML5规范中的新方法window.postMessage()可以用于安全跨域通信。
        - 6、WebSocket
            - WebSocket是一种服务器推送技术，支持双向通信，没有同源限制，即允许跨域。协议标识符是ws（如果加密，则为wss）。
                var ws = new WebSocket('wss://xxx.xxxx.org')
                ws.onopen = function() { ws.send() }
                ws.onmessage = function() { ws.close() }
                ws.onclose = function() {}
        - 7、document.domain
            - 适用于：主域相同子域不同的页面
        - 8、window.name
            - 在一个窗口的生命周期内，窗口载入的所有的页面都是共享一个window.name的


- ES6
    - let 和 const
        - ES6中声明变量方式6种
        - 块级作用域
        - 暂时性死区（没有变量提升）
        - 重复声明和赋值
    - 普通函数和箭头函数
        - 函数有变量提升吗？声明式会提升，表达式不会提升
        - 箭头函数就是匿名函数，声明会提升，表达式不提升
        - 箭头函数特点

- ts
    - type和interface区别

- 列举各种排序算法 分别对应的优缺点和时间复杂度
    - 冒泡、选择、插入 都是O(n^2)
    - 希尔、归并、快排、堆排序 都是O(nlogn)
    - 上面这几种中，冒泡插入归并是稳定的，其他都是不稳定的
- 快排
    - Array.prototype.sort()底层实现
        - V8： <=10 插入排序 O(n)； >10 快排 O(nlogn)
    

- js原型链与对象
    - 创建对象的3种方法
    - 构造函数、实例、原型对象 间的关系
    - 原型链的工作原理
    - 实现new操作符

- js基本数据类型
    - 6基本+1引用(5个)
    - 原始类型的特性——不可变性
    - 栈内存与堆内存
    - 基本类型与引用类型的 复制、比较、值传递与引用传递

- 网络安全
    - XSS，跨站脚本攻击，Cross-site scripting
    - CSRF，跨站请求伪造，Cross-site request forgery
        - 防止CSRF攻击
    - XSS 与 CSRF 区别
    - CSP
- 登录验证
    - 基于cookie/session的身份验证
    - 基于token的身份验证
    - token相对cookie的优势
        - 无状态！！！
        - 防止CSRF
        - 性能
        - 多站点使用
        - 支持移动平台

- 盒模型
    - box-sizing
    - JS如何设置获取盒模型对应的宽和高（4种）
    - 外边距重叠：垂直方向
    - BFC(块级格式化上下文)
        - 特性
        - 创建BFC
- CSS3种定位机制：普通流、浮动和绝对定位。
    - display
        - 行内元素：
            - 元素的高度、宽度、行高及顶部和底部边距不可设置，宽高由包含的元素撑开
            - margin 在垂直方向上不生效；设置 padding 本身生效，但是没有把父级元素撑开
        - 块级元素：**典型块级元素**：div、p、h1、form、ul、li
            - 元素的高度、宽度、行高以及顶和底边距都可设置，如果不主动设置，则与其父元素一致
    - position
        - 相对定位
            - relative：
        - 绝对定位
            - fixed
            - absolute
    - 居中
        - 垂直居中
            - 1. 对单行文本居中
            - 2. 模拟div表格居中
            - 3. 绝对定位元素居中 无论知不知道宽高
            - 4. flex居中
        - 水平居中
            - 1. 居中行内元素
            - 2. 居中一个块级元素
            - 3. 绝对定位元素居中 无论知不知道宽高
            - 4. flex居中

- 提升页面性能的方法（5点）
    - 资源压缩合并
    - 善用浏览器缓存
        - 缓存命中流程
            - 强缓存
            - 协商缓存
        - 缓存具体原理
            - 强缓存如何重新加载浏览器缓存里面已经缓存过的资源
    - 非核心代码异步加载（防止js阻塞解析）
        - 3种情况的加载执行图示
        - defer在DOMContentLoaded事件流触发前执行
    - 静态资源异步加载
        - rel="preload"
        - rel="prefetch"
    - CDN
        - CDN，内容分发网络。通过在 Internet 中增加一层新的网络架构，将网站的内容发布到最接近用户的网络“边缘”，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。
    - DNS预解析
        - rel="dns-prefetch"
        - 标签 《meta http-equiv="x-dns-prefetch-control" content="on">在https下开启a标签的dns预解析

- PNG，JPG，GIF，WEBP的区别

- CSS样式
    - 选择器优先级
    - CSS3新增伪类
    - flex布局
        - flex：1 （1 1 0）
        - flex：auto (1 1 auto) 和 none (0 0 auto)。
        - 两列布局
    - 多种方式实现三栏布局
        - 只有 flex弹性布局 与 table表格布局 是在高度超出后其他块的高度也跟随变高

- fastClick
    - 解决的问题（在H5端）
        - 手动点击与真正触发click事件会存在300ms的延迟
        - 点击穿透问题
    - fastclick原理: 

- 移动端适配
        - 基本概念：
            - `设备像素比`(device pixel ratio，简称为`dpr`)：设备像素比 ＝ 物理像素 / 设备独立像素；
                - 在JS中获取dpr：window.devicePixelRatio。
                - 在CSS中，通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询。
        - 适配方案
            1. lib-flexible 手淘H5
                - rem就是相对于根元素`<html>`的font-size来做计算。
                - 通过Hack手段来根据设备的dpr值相应改变`<meta>`标签中viewport的值
                    - 根据dpr的值来修改viewport实现1px的线
                    - 根据dpr的值来修改html的font-size，从而使用rem实现等比缩放
                    - 使用Hack手段用rem模拟vw特性
            2. Viewport（vw）
                - 以前的Flexible方案是通过JS来模拟vw的特性，但目前，vw已经得到了众多浏览器的支持，因此可以直接考虑将vw单位运用于我们的适配布局中。
                - PostCSS的插件`postcss-px-to-viewport`把px转换成vw

- 事件流
    - DOM2级 事件规定的事件流包括 3个阶段：`事件捕获阶段`，`处于目标阶段`，`事件冒泡阶段`。
    - 自定义事件 new Event('test')
    - 事件代理

- js编译器
- js解释器
- js作用域
    - 作用域的作用
    - 作用域链的作用
    - 作用域的工作流程
    - this绑定规则（4条）
        - 默认绑定
        - 隐式绑定
            - 回退到默认绑定规则
        - 主动绑定
        - 由new调用
            - 构造函数忘记使用new，则相当于使用实函数，创建全局变量
    - 什么是闭包
        - 创建闭包（2种）
        - 闭包的缺点
            - 内存的大量消耗
            - 取到外层函数变量的最终值
        - 清除闭包常驻内存
            - 当一个内存空间没有变量指向的时候就会被回收。所以直接 `foo = null`
        - 垃圾回收机制
            - 分类
                - 引用计数
                - 【标记清除】，js引擎使用
            - 存在问题：垃圾回收时停止响应其他操作
                - 优化：【分代回收】，区分“临时”与“持久”对象，多回收临时对象，少回收持久对象。V8引擎就是用分代回收。
        - 内存泄漏的原因：
            -【循环引用】和【闭包】

- 数据结构
    - 数组
        - 广义上数组和链表的区别：
        - js中数组的特点
            - js中数组是由Array构造函数创建的对象，与java不同，有3个自己的特性
    - Set 和 Map
        - Set
            1. 成员不能重复
            2. 只有健值，没有健名，有点类似数组。
            3. 可以遍历，方法有add, delete,has
        - weakSet
            1. 成员都是对象
            2. 成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
            3. 不能遍历，方法有add, delete,has
        - Map
            1. 本质上是健值对的集合，类似集合
            2. 可以遍历，方法很多，可以跟各种数据格式转换
        - weakMap
            1. 只接受对象作为健名（null除外），不接受其他类型的值作为健名
            2. 健名所指向的对象，不计入垃圾回收机制
            3. 不能遍历，方法同get,set,has,delete

- JS遍历对象的方法

- 继承
    - ES5
        - 原型链继承
            - 缺点：原型上任何类型的属性值都不会通过实例被重写，但是引用类型的属性值会受到实例的影响而修改
        - 借用构造函数继承
            - 缺点：只实现了部分继承，父类的原型对象上的属性无法被子类继承。
        - 组合继承（原型链+借用构造函数）
            - 特点：借用构造函数拷贝属性副本，与原型链继承共有属性
            - 优化：
                - 解决Parent执行两次
                - 解决s.constructor指向问题
    - ES6
        - extends
        - super的两种使用方式：函数、对象
        - ES6继承与ES5继承机制比较


- JS模块化规范
    - 1、CommonJS
        - 同步加载、require/module.exports、以node.js为代表
    - 2、AMD
        - 异步加载、依赖前置
    - 3、CMD
        - 异步加载、依赖就近
    - 4、UMD
        - commonjs+AMD
    - 5、ES6Module
        - 成为浏览器和服务器通用的模块解决方案
        - 静态化、使得编译时就能确定模块的依赖关系、输入、输出
        - import，因为是在编译阶段执行，import会 提升
        - export
        - 目前 import/export 最终都是编译为 require/exports 来执行的
    - ESM 与 CommonJS 两种模块化规范的比较
        - 输出类型不同
        - 执行时机不同
        - 循环加载时处理不同

- Webpack
    - 所有文件都是模块，只认识js模块，所以要通过一些loader把css、图片等文件转化成webpack认识的模块。
    - 打包结果
    - module、chunk、bundle3者的关系
    - 打包出的文件具体原理：
    - webpack构建流程：
    - 关键词
        - entry：建立依赖图的起点，3种方式配置
        - output：
            - path
            - publicPath
        - Loader 在 module.rules 中配置，对象数组，作为模块的解析规则
        - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例
            - Plugin 可以监听 Webpack 运行的生命周期中广播出的事件
    - 常用loader和plugin：
    - 提高webpack开发效率
    - 对bundle体积进行监控和分析
    - loader执行顺序
    - 生产环境使用source map
    - 文件指纹chunkhash
        - 指纹类别（3种）
        - [chunkhash]不能和 HMR 一起使用
        - 占位符指定长度 [chunkhash:8]
        - 各类别适用文件
            - JS文件的指纹设置
            - CSS文件的指纹设置
            - Images/Fonts的指纹设置
    - 持久化缓存caching（注意id问题）
        - 注意模块id变化问题：
    - 如何将文件名发送到浏览器
    - code splitting
        - 将项目代码中无需立即调用的代码，在代码构建时转变为异步加载的过程。
        - 代码分割入手点（如何分割）（3种）
        - import()代码分割类型（两种）
        - 魔法注释
        - Webpack 4 引入了 mode 这个选项（提供development、production两种模式，如果 mode 是 production，那 Webpack 4 就会开启 Code Splitting。）
    - webpack文件监听原理
        - 开启监听模式(两种方式)
            - 1. 启动 webpack 命令时，带上 --watch 参数，浏览器需刷新
            - 2. 热更新: 
                - 优点1：
                - 优点2：
        - 热更新原理比较难讲清，只要记住上面的两个优点就行了。
    - 优化 Webpack 的构建速度
        - 1、`分包构建`
            - 1、extenals外部扩展（CDN）
            - 2、DLLPlugin && DllReferencePlugin
                - Externals会有多次引用的问题，所以也不好，DLL则是 前置不经常更新的第三方库依赖包的构建，来提高真正的build和rebuild构建效率
                - 只要第三方库没有变化，之后的每次build都只需要去打包自己的业务代码
                - webpack通过webpack.DllPlugin与webpack.DllReferencePlugin两个内嵌插件实现此功能。
                    - DllPlugin 进行分包，生成两个文件（bundlejs、bundle.mainifest.json）；
                    - DllReferencePlugin 对 bundle.manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
        - 2、摇树优化 `Tree shaking`
            - 得益于es6的import，标记未引用模块，在压缩时去除
        - 3、作用域提升 `Scope hoisting`
            - scope hoisting 会把需要导入的文件直接移入导入者顶部 打包在一起，这就是所谓的 hoisting。es6支持
        - 4、`压缩代码`
        - 5、利用`缓存提升二次构建速度`
    - webpack常用配置技巧
        - 省略文件后缀及配置别名
        - 模块注入全局变量
- 前端路由模式
    - SPA是什么
        - 优点
        - 缺点
    - 前端路由是什么
        - 前端路由需要实现 2点：
        - hash、history模式都可以实现上述两点：
            - hash模式 原理
            - history模式 原理
                - h5提供了
                - 如何监听呢？
            - history模式为什么需要后端支持？
            - 如何选择模式呢？
                - 因为history是趋势，我们直接看hash的缺点就好了（3点）
- SSR 服务端渲染和同构原理
    - 为什么要服务端渲染（SSR）
    - 传统SSR 与 CSR客户端渲染（SPA）
    - 前端同构应用（SSR + SPA）：
        - 第一次访问页面是服务端渲染，基于第一次访问，后续的交互就是 SPA 的效果和体验，还不影响SEO。简单说就是一个前端项目里的组件，部分服务端渲染后输出，部分由客户端异步渲染，既保障网页渲染速度，也有利于搜索引擎 SEO。
    - 同构应用需要解决的3个问题
        - 1、`路由同构`
        - 2、`数据预取同构`
        - 到这里，实现了双端的数据预取同构，但是数据也仅仅是服务端有，浏览器端是没有这个数据，浏览器会渲染出不同的结构替换服务端的渲染
        - 3、`渲染同构`
    - 其他要注意的问题
        - node端没有window和webstorage
        - React通过renderToString(`<App />)`方法将应用代码转换成字符串，再替换到页面中占位符的位置。
        - ReactDOM.hydrate会去复用原本已经存在的 DOM 节点，尝试在已有标记上绑定事件监听器。
        - SSR是不支持异步组件的
            - 我们的方案没有解决这个问题
        - SEO支持（路由页动态生成TDK）
            - 采用react-helmet库
        - 结合状态管理的SSR实现

- git
    - git rebase 变基，合并多次本地commit记录，使得分支树是线性的
- base64
    - 作用：传输、存储和表示二进制。基于64个可打印的字符来表示二进制的数据的一种方法。可以用来加密但很简单。
    - 编码原理

- offsetWidth 水平方向 width + 左右padding + 左右border-width
- clientWidth 水平方向 width + 左右padding

:::


### details
::: details
- 网络基础
    - http报文组成
        - 请求行（方法，url，协议版本）、请求头（常用的...）、空行、请求体
        - 响应行（协议版本，状态码）、响应头、空行、响应体
    - http方法
        - 无连接，无状态
        - get与post区别（6点）
            - 回退时get不会重发请求，post需要重发
            - get请求默认会被浏览器缓存，post不会
            - get参数会完整保留在历史记录中，post不会
            - get传参在url中，post在request body中
            - get参数限制在2kb，post无限制
            - get发一个tcp包，post发两个tcp包，先发headers响应100 continue，再发data响应200
        - 状态码
            - 1xx 指示信息
            - 2xx
                - 200 成功
                - 201 Created：请求成功，而且有一个新的资源已经依据请求的需要而建立，通常这是 PUT 方法得到的响应码
                - 204 No content：表示请求成功，但响应报文不含实体的主体部分
                - 206 Partial Content：客户端发送带Range头的Get请求，服务器会按照Range截取对应数据返回，通常用于video标签或audio标签请求一个大的视音频文件时，返回range部分
            - 3xx
                - 301 Moved Permanently：永久重定向
                - 302 Found：临时性重定向
                    - ajax302重定向跨域问题
                    - 303和307是HTTP1.1新加的，它们是对HTTP1.0中的302状态码的细化
                        - 303，POST重定向为GET
                        - 307，不会把POST转为GET
                - 304 Not Modified：协商缓存
            - 4xx
                - 400 Bad Request：客户端请求有语法错误
                - 401 unauthorized：缺少身份认证信息
                    - 一般是忘加 Authorization 这个请求Header
                - 403 Forbidden：对被请求页面的访问被禁止
                    - 一般是服务端收到并验证了，该用户没有权限访问
                    - 在跨域时，也会出现
                        - 注意，如果使用了CORS，非简单请求会先发OPTIONS请求，即使跨域也会返回200，所以就不会出现403了
                - 404 Not Found：请求资源不存在
            - 5xx
                - 500 Internal Server Error：服务器错误
                - 503 Server Unavailable：服务器不可用，临时过载宕机
        - 常用端口
            - http 80 、 https 443 、 DNS 53
        - http工作模式：
            - 普通模式（http1.0中，默认使用的是短连接）：每个请求/应答，客户端和服务器都要新建一个连接，完成之后立即断开（HTTP协议为无连接的协议）。
            - 持久连接（http1.1支持，且1.1默认使用长连接）：
                - Keep-alive模式 又称持久连接或连接重用，指定方式为 Connection: keep-alive
                - keep-alive功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，keep-alive功能避免了重新建立连接。
                    - 从tcp/ip层面来看，长连接需要发送心跳包维持连接，短连接的tcp连接会建立并断开
                    - 管线化需要长连接才支持（1.1才支持），只有get和head可以进行管线化，打包多次请求一次返回多个响应
        - http2.0与http1.1的显著不同点：
            - 1.1：tcp/ip请求1对1，受tcp/ip本身并发数限制（同一域名下并发的tcp连接2-10个不等），速度慢
            - 2.0：tcp/ip请求1对多，分割成更小的帧请求，速度明显提升。2.0的出现导致（譬如打包成精灵图，静态资源多域名拆分等）1.1的优化方式都不重要了。
        - http2.0特性
            - 多路复用（即一个tcp/ip连接可以请求多个资源）；
            - 首部压缩（http头部压缩，减少体积）；
            - 服务器端推送server push（服务端可以对客户端的一个请求发出多个响应，可以主动通知客户端）；
            - 二进制分帧（在应用层跟传送层之间增加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量）；
            - 请求优先级（如果流被赋予了优先级，它就会基于这个优先级来处理，由服务器决定需要多少资源来处理该请求）。 
        - https
            - 为什么安全
            - 采用什么加密方式
                - 为什么一开始使用非对称加密，传输数据使用对称加密
            - https通信过程
            - 中间人劫持，怎么防止。x-frame-option?白屏的喔，怎么办？也不一定嵌入iframe啊，可以嵌入脚本、图片，怎么阻止【描述】
                - https也不是绝对安全的，如下图所示为中间人劫持攻击，中间人可以获取到客户端与服务器之间所有的通信内容。 
                    中间人截取客户端发送给服务器的请求，然后伪装成客户端与服务器进行通信；将服务器返回给客户端的内容发送给客户端，伪装成服务器与客户端进行通信。 
                    通过这样的手段，便可以获取客户端和服务器之间通信的所有内容。 
                - 使用中间人攻击手段，必须要让客户端信任中间人的证书，如果客户端不信任，则这种攻击手段也无法发挥作用。
                - 造成中间人劫持的原因是 没有对服务端证书及域名做校验或者校验不完整，
    - TCP、UDP
        - 工作原理
        - 区别:
            - 都是传输层协议，传输控制协议、用户数据包协议
            - 是否建立连接
            - 是否可靠传输
            - 面向字节流与面向报文
            - 首部字节20 与 首部8字节开销小
            - 一对一 与 1对1/1对多/多对1/多对多
        - 基于TCP的应用层协议：http、ftp
        - 基于UDP的应用层协议：dns、rip
        - TCP如何保证可靠性
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
    - 5层网络协议栈
        - 从应用层的发送http请求，到传输层通过什么是建立tcp/ip连接，再到网络层的ip寻址，再到数据链路层的封装成帧，最后到物理层的利用物理介质传输。服务端的接收就是反过来的步骤：
            - 应用层(dns,http)：DNS解析成IP并发送http请求；
                - *(表示层)，7层插入*，web Socket 接口处于表示层。
                - *(会话层)，7层插入*
            - 传输层(tcp,udp)：建立tcp连接（什么是）；
            - 网络层(IP,ARP)：IP寻址；
            - 数据链路层(PPP)：封装成帧；
            - 物理层(利用物理介质传输比特流)：物理传输（然后传输的时候通过双绞线，电磁波等各种介质）。
        - 完整的OSI七层框架，与5层相比，在传输层与应用层之间，多了会话层、表示层。 
    - DNS域名解析
        - 流程
            - 本机先找缓存
            - 没有时，递归向本地dns服务器，再由其迭代根、二级、主机域，最后递归返回
        - 由于域名解析耗时，可通过dns-prefetch优化




- 简述输入URL到页面显示全过程
    - DNS解析
    - 建立tcp/ip链接
    - 发送http请求，判断是什么缓存类型
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
    - reflow与repaint
        - 触发reflow的情况：
            - resize
            - dom结构改变
            - 改变字体大小
            - 最复杂的一种：获取某些属性时。很多浏览器会对回流做优化，会等到数量足够时做一次批处理回流，但是，除了render树的直接变化，当获取一些属性时，浏览器为了获得正确的值也会触发回流，这样使得 浏览器批处理优化无效，包括：
                - offset(Top/Left/Width/Height)
                - scroll(Top/Left/Width/Height)
                - cilent(Top/Left/Width/Height)
                - width，height
                - 调用了getComputedStyle()或者IE的currentStyle
                    - js如何设置获取盒模型对应的宽和高（4种）
                        - 其他两种兼容性不好，也不常用
                        - window.getComputedStyle(dom).width
                        - dom.getBoundingClientRect().width 相对于viewport边界
        - 重排一定伴随着重绘，重绘却可以单独出现。
        - display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。
        - 减少重排重绘：
            - 避免循环操作dom，创建一个documentFragment或div
            - 使用display: none，触发两次
            - 将需要多次重排的元素的position属性设为absolute或fixed
            - 避免多次读取offset等属性。无法避免则将它们缓存到变量
            - 不要用table布局
- 浏览器多进程
    - 主进程：只有一个，负责协调、主控
    - 插件进程
    - GPU进程：3D绘制，最多一个
    - 浏览器内核（渲染进程）
        - 每个tab页都是一个渲染进程
        - 渲染进程又分为5大类线程
            - GUI渲染线程
            - JS引擎线程
                - GUI渲染线程 与 JS引擎线程 互斥
                    由于 js 可以操作 DOM，如果同时修改元素属性并同时渲染界面(即 JS线程和GUI线程同时运行)，会导致渲染线程前后获得的元素可能不一致。因此，为了防止渲染出现不可预期的结果，浏览器设定 GUI渲染线程和JS引擎线程为互斥关系
            - 事件触发线程
            - 定时器线程
            - 异步http请求线程
        - 什么是Event Loop（事件循环）
            js分为两种任务，一种是*同步任务*（synchronous），另一种是*异步任务*（asynchronous）。
            *同步任务*都在`JS引擎线程`上执行，形成一个`执行栈`；
            js通过「任务队列」来实现异步回调，`事件触发线程`管理一个`任务队列`（task queue）；
            *异步任务*触发条件达成，会由`定时器线程`或`异步http请求线程`将回调事件放到`任务队列`中；
            执行栈中所有同步任务执行完毕，此时JS引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行。这个过程不断重复。
        - JS引擎线程的执行栈中，包括宏任务、微任务
            - 分类：
                - 宏任务，可以理解成每次执行栈中执行的代码
                    - setTimeout
                    - setInterval 
                    - setImmediate
                    - UI rendering（比如一些改变页面css的js代码任务）
                    - script
                    - I/O
                - 微任务，可以理解成 当前宏任务执行过程中所产生的微小任务，并在当前宏任务执行结束时立即执行
                    - Promise.then()或catch()
                    - Promise为基础开发的其它技术，比如fetch API
                    - process.nextTick（Node独有的）
                    - V8的垃圾回收过程
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
    - 进程间通信 6种：
        1. 管道pipe
        2. 命名管道namedpipe
        3. 消息队列MessageQueue
        4. 信号量Semaphore
        5. 共享内存SharedMemory
        6. 套接字Socket
    - 线程间通信 3种：
        1. **锁机制**：包括`互斥锁`、`条件变量`、`读写锁`
        2. 信号量机制
        3. 信号机制
        - 线程死锁的原因：线程竞争与进程推进顺序不对，具体需要同时满足4个必要条件
        - 解决死锁的方法：加锁顺序、加锁时限、死锁检测
- 浏览器存储
    - Cookie、Session、Token（Authorization） 区别
    - Cookie属性设置
    - Cookie 与 WebStorage 区别

- 跨域问题
    - 同源策略：协议、域名、端口
    - 常用跨域策略（8种）
        - 1、CORS（跨域资源共享）：原理是浏览器在识别ajax发送了跨域请求的时候，会将其拦截并在http头中加一个origin字段，允许跨域通信。
            - CORS请求分成两类，浏览器对这两种请求的处理是不一样的：简单请求、非简单请求。
                - 判断条件，需同时满足：
                    - 必须是三种方法之一：HEAD、GET、POST，
                    - 且header信息不超出某几种字段
                    （同时满足上述两个条件，才是简单请求，比如header中常用的 Content-Type：application/json，还有鉴权的Authorization，都属于非简单请求）

                - 简单请求流程：
                    - 浏览器自动在header添加一个origin字段，表明本次请求来自哪个源（协议、域名、端口)。
                    - 如果origin在指定范围内，则返回多个Access-Control-xx字段
                    - 如果origin不在指定范围，则响应header中不包含Access-Control-Allow-Origin字段，浏览器收到后就会抛出错误
                - 注意：默认情况下，Cookie不包括在CORS请求之中。如果要传cookie，
                    - 需要指定Access-Control-Allow-Credentials: true，
                    - 且Access-Control-Allow-Origin不能用通配符*号，必须指定具体域名，
                    - 另外，开发者还需要在客户端对XHR对象中开启 withCredentials: true。

                - 非简单请求：除那3种方法，或者header中有常用的 Content-Type：application/json，以及常用在模块鉴权的Authorization字段，都是非简单请求
                    - 会先发送 一个OPTIONS的"预检"请求（里面也包含origin字段头信息），用来询问 所在的域名是否在服务器的许可名单之中，以及运行哪些方法和头信息。
                    - 如果origin在指定范围内，则返回多个Access-Control-xx字段
                        - 预检通过后之后，就可以发简单请求来完成真正的数据通信了
                    - 如果origin不在指定范围，则响应header中不包含Access-Control-Allow-Origin字段，浏览器收到后就会抛出错误
                - 非简单请求可以控制预检请求的发送频率，通过  Access-Control-Max-Age: 600 指定预检有效期

        - 2、服务端代理
            - 通过nginx反向代理或者nodejs代理请求，原理就是服务端是不受浏览器的同源策略限制的，因此可通过服务端先请求好资源，再从服务端拿来用。
            - 开发环境下可以使用webpack 的 http-proxy-middleware中间件，在devServer配置proxy: config.dev.proxyTable实现代理跨域。
        - 3、JSONP
            - 利用拥有“src”属性的标签的异步加载来实现（如`<script>,<img>,<iframe>`）
            - 允许客户端传一个callback参数给服务器，然后服务器返回数据时会用这个callback参数作为函数名，包裹住JSON数据，返回客户端，客户端执行返回函数
            - Jsonp只能发get请求
        - 4、Hash
            - 利用的原理是“hash的变动不会触发页面刷新”。
            - 在iframeB页面通过监听window.onhashchange来拿到A页面传来的数据。
        - 5、postMessage
            - HTML5规范中的新方法window.postMessage()可以用于安全跨域通信。
        - 6、WebSocket
            - WebSocket是一种服务器推送技术，支持双向通信，没有同源限制，即允许跨域。协议标识符是ws（如果加密，则为wss）。
                var ws = new WebSocket('wss://xxx.xxxx.org')
                ws.onopen = function() { ws.send() }
                ws.onmessage = function() { ws.close() }
                ws.onclose = function() {}
        - 7、document.domain
            - 适用于：主域相同子域不同的页面
        - 8、window.name
            - 在一个窗口的生命周期内，窗口载入的所有的页面都是共享一个window.name的




- ES6
    - let 和 const
        - ES6中声明变量方式6种
        - 块级作用域
        - 暂时性死区（没有变量提升）
        - 重复声明和赋值
    - 普通函数和箭头函数
        - 函数有变量提升吗？声明式会提升，表达式不会提升
        - 箭头函数就是匿名函数，声明会提升，表达式不提升
        - 箭头函数：
            - this是定义时所在对象
            - 内部无this，是定义时外部代码块this，不能用作构造函数，不能new
            - 无arguments，用rest参数替代
            - 不能用yield
- ts
    - type和interface区别
        - interface 只能定义对象类型；type声明的方式可以定义原始类型、组合类型
        - interface 可以实现接口的extends/implements，而type 不行
        - interface 可以实现接口的merge，但是type不行


- 列举各种排序算法 分别对应的优缺点和时间复杂度
    - 冒泡、选择、插入 都是O(n^2)
    - 希尔、归并、快排、堆排序 都是O(nlogn)
    - 上面这几种中，冒泡插入归并是稳定的，其他都是不稳定的
- 快排
    - 手写
    - Array.prototype.sort()底层实现
        - V8： <=10 插入排序 O(n)； >10 快排 O(nlogn)
    

- js原型链与对象
    - 创建对象的3种方法
        - 实现Object.create
    - 构造函数、实例、原型对象 间的关系
    - 原型链的工作原理
    - 实现new操作符



- js基本数据类型
    - 6基本+1引用(5个)
    - 原始类型的特性——不可变性
    - 栈内存与堆内存
    - 基本类型与引用类型的 复制、比较、值传递与引用传递：
        - ECMAScript中所有的函数的参数都是按值传递的。

- 网络安全
    - XSS，跨站脚本攻击，Cross-site scripting
        - 防止XSS攻击：对提交的所有内容进行过滤，对url中的参数进行过滤，过滤掉会导致脚本执行的相关内容；然后对动态输出到页面的内容进行html编码，使脚本无法在浏览器中执行。
    - CSRF，跨站请求伪造，Cross-site request forgery
        - 防止CSRF攻击
    - XSS 与 CSRF 区别
    - CSP 内容安全策略，是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。
- 登录验证
    - 基于cookie/session的身份验证
    - 基于token的身份验证
    - token相对cookie的优势
        - 无状态
        - 防止CSRF（攻击链接只能携带cookie但不能携带token）
        - 性能
        - 多站点使用
        - 支持移动平台

- 盒模型
    - box-sizing: 
        - `content-box`（`默认值`，`标准盒模型`）：width 与 height 只包括内容的宽和高
        - `border-box` （`IE盒模型`，也叫Quirks`怪异模型`）：
    - JS如何设置获取盒模型对应的宽和高（4种）
    - 外边距重叠：垂直方向
    - BFC(块级格式化上下文)
        - 特性
            - 隔离了的独立容器——边距重叠解决】
            - 可以包含浮动元素，避免高度塌陷（计算BFC高度的时候，浮动元素也会参与计算）
        - 创建BFC
            - float 除 none
            - overflow 除 visible
            - 绝对定位
            - display （inline-blocks，flex，inline-flex，table，table-cells，table-captions...)
- CSS3种定位机制：普通流、浮动和绝对定位。
    - display
        - 行内元素：**典型行内元素**：span、a、label、input、textarea、select、 img、br、strong、em
            - 不独占一行
            - 元素的高度、宽度、行高及顶部和底部边距不可设置，宽高由包含的元素撑开
            - margin 在垂直方向上不生效；设置 padding 本身生效，但是没有把父级元素撑开
        - 块级元素：**典型块级元素**：div、p、h1、form、ul、li
            - 独占一行
            - 元素的高度、宽度、行高以及顶和底边距都可设置，如果不主动设置，则与其父元素一致
    - position
        - 相对定位
            - relative：
                - `相对于自身原有位置进行偏移`，仍处于标准文档流之中。保有原来的display属性。
                - **注意**：`relative元素如果设置偏移后，它原来占据的文档流中的位置仍然会保留，不会被其他块浮动过来填补掉。并且，它的偏移也不会把别的块从文档流中原来的位置挤开，如果有重叠的地方它会重叠在其它文档流元素之上`。
        - 绝对定位
            - fixed：以浏览器`可视窗口为基准`偏移
            - absolute：
                - 在无已定位祖先元素时，以根节点`<html>`为基准偏移；
                - 在有已定位祖先元素时，`相对于最近一级的、不是static定位的父元素`来定位。
    - 居中
        - 垂直居中
            - 1. 对单行文本居中 height line-Height
            - 2. 模拟div表格居中  display：table-cell 与 vertical-align: center
            - 3. 绝对定位元素居中 无论知不知道宽高，都
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%); 
            - 4. flex居中 align-items: center;

        - 水平居中
            - 1. 居中行内元素 text-align: center;
            - 2. 居中一个块级元素 width:200px; margin:0 auto;
            - 3. 绝对定位元素居中 无论知不知道宽高，都
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%); 
            - 4. flex居中 justify-content: center;

- 提升页面性能的方法（5点）
    - 资源压缩合并
    - 善用浏览器缓存
        - 缓存命中流程
            - 强缓存
                - cache-control: public, private, no-store, no-cache
            - 协商缓存
        - 缓存具体原理
            - 与Last-Modified不一样的是，当服务器返回304 Not Modified的响应时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag跟之前的没有变化。
            - 字段优先级
            - 强缓存如何重新加载浏览器缓存里面已经缓存过的资源
    - 非核心代码异步加载（防止js阻塞解析）
        - 3种情况的加载执行图示
        - async不确保执行顺序，defer确保
        - defer在DOMContentLoaded事件流触发前执行
        - DOMContentLoaded与onload的区别
    - 静态资源异步加载
        - rel="preload"，本页面可能用到的资源，一般立即加载
        - rel="prefetch"，下个页面可能用到的资源，一般空闲时才加载
        - prefetch跟preload不同在于：用户从A页面进入B页面，preload的内容会失效，而prefetch的内容可以在B页面使用。
    - CDN
        - CDN，内容分发网络。通过在 Internet 中增加一层新的网络架构，将网站的内容发布到最接近用户的网络“边缘”，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。
    - DNS预解析
        - rel="dns-prefetch"
        - 标签 《meta http-equiv="x-dns-prefetch-control" content="on">在https下开启a标签的dns预解析


- PNG，JPG，GIF，WEBP的区别
    - jpg是有损压缩，适合照片，文件小。
    - png是无损压缩，适合透明图，小图，做照片文件偏大。
    - gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果。
    - webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。
        - 缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。


- CSS样式
    - 选择器优先级
        - 内联样式 > ID选择器 > 伪类 > 属性选择器 > 类选择器 > 标签选择器 > 通用选择器（*）
        - 样式表中定义在后面的会覆盖之前的
    - CSS3新增伪类
        - p:first-of-type：选择属于其父元素的首个p元素的每个p元素。
        - p:last-of-type：选择属于其父元素的最后p元素的每个p元素。
        - p:only-of-type：选择属于其父元素唯一的p元素的每个p元素。
        - p:only-child：选择属于其父元素的唯一子元素的每个p元素。
        - p:nth-child(2)：选择属于其父元素的第二个子元素的每个p元素。
            - p:nth-child(even)：偶数行
            - p:nth-child(odd)：奇数行
            - p:nth-child(2n)：偶数行
            - p:nth-child(2n+1)：奇数行
            - p:nth-child(-n+3)：n为1、2、3的元素（-n+3>0的元素）
        - :enabled :disabled：控制表单控件的禁用状态。
        - :checked：单选框或复选框被选中。
    - flex布局
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
    - 多种方式实现三栏布局
        - （1）浮动：
        - （2）绝对定位
        - （3）flex弹性
        - （4）table表格
        - （5）grid网格：
            - grid-template-rows: 
            - grid-template-column:
        - 只有 flex弹性布局 与 table表格布局 是在高度超出后其他块的高度也跟随变高

- fastClick
    - 解决的问题（在H5端）
        - 手动点击与真正触发click事件会存在300ms的延迟
            - 延迟的存在是因为浏览器想知道你是否在进行双击操作，如果是双击，移动端会缩放
        - 点击穿透问题（点击行为会穿透元素触发非父子关系元素的事件）
            - 点击穿透是因为300ms延迟触发时的副作用。
            - 具体穿透现象：
                        比如点击弹窗浮层关闭按钮时，也点击了浮层下页面上对应位置的元素（正常是不应该点击到页面上的对应的元素的）
                            之所以说点击穿透是300ms延迟触发的副作用，可通过如下过程分析得出：
                                手指触碰到屏幕时，触发 touchstart , 弹窗隐藏（这里就已经隐藏了，而如果不是双击，click可能在300ms后才触发）
                                手指按上时，可能会有短暂的停留和轻微的移动，触发 touchmove
                                手指离开屏幕时，触发 touchend
                                等待 300ms 后，看用户在此时间内是否再次触摸屏幕，如果没有
                                300ms 后，此时弹窗已消失，浏览器在用户手指离开的位置触发 click 事件，所以点到了页面上的元素
    - fastclick原理: 
        - 在检测到touchend事件的时候，会通过DOM自定义事件立即触发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉

- 移动端适配
        - 基本概念：
            - 物理像素(physical pixel)：物理像素又被称为设备像素，显示设备中一个**最微小的物理部件**；
            - 设备独立像素(density-independent pixel，简称DIPs)：设备独立像素也称为`密度无关像素`，可以认为是计算机**坐标系统中的一个点**，程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。
            - `设备像素比`(device pixel ratio，简称为`dpr`)：设备像素比 ＝ 物理像素 / 设备独立像素；
                - 在JS中获取dpr：window.devicePixelRatio。
                - 在CSS中，通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询。
                `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>`
        - 适配方案
            1. lib-flexible 手淘H5
                - rem就是相对于根元素`<html>`的font-size来做计算。
                - 基准：750设计稿；
                - 通过Hack手段来根据设备的dpr值相应改变`<meta>`标签中viewport的值
                    - 根据dpr的值来修改viewport实现1px的线
                    - 根据dpr的值来修改html的font-size，从而使用rem实现等比缩放
                    - 使用Hack手段用rem模拟vw特性
            2. Viewport（vw）
                - 以前的Flexible方案是通过JS来模拟vw的特性，但目前，vw已经得到了众多浏览器的支持，因此可以直接考虑将vw单位运用于我们的适配布局中。
                    - vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
                    - vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
                    - vmin：vmin的值是当前vw和vh中较小的值
                    - vmax：vmax的值是当前vw和vh中较大的值
                    - 如果window.innerHeight > window.innerWidth则vmin取百分之一的window.innerWidth，vmax取百分之一的window.innerHeight计算。
                - 使用vw来实现页面的适配，并且通过PostCSS的插件`postcss-px-to-viewport`把px转换成vw。这样的好处是，我们在撸码的时候，不需要进行任何的计算，你只需要根据设计图写px单位
                - 为了更好的实现长宽比，特别是针对于img、vedio和iframe元素，通过PostCSS插件postcss-aspect-ratio-mini来实现，在实际使用中，只需要把对应的宽和高写进去即可
                - 对于 `1px` 是不建议将其转换成对应的vw单位的，但在 Retina 下，我们始终是需要面对如何解决1px的问题。
                    - 为了解决1px的问题，使用PostCSS插件postcss-write-svg，自动生成border-image或者background-image的图片
                缺点：
                    - px转换成vw单位，多少还会存在一定的像素差，毕竟很多时候无法完全整除。
                    - 当容器使用vw单位，margin采用px单位时，很容易造成整体宽度超过100vw，可以使用calc()函数解决vw和px混合使用的问题。


- 事件流
    - DOM2级 事件规定的事件流包括 3个阶段：`事件捕获阶段`，`处于目标阶段`，`事件冒泡阶段`。
    - 自定义事件 new Even('test')
    - 事件代理
- 事件循环

js编译器
js解释器
- js作用域
    - 作用域的作用：作用域决定了内部变量的生命周期(即何时被释放)，以及哪一部分代码可以访问其中的变量
    - 作用域链的用途：是保证对执行环境有权访问的所有变量和函数的有序访问。
    - 作用域的工作流程
        1. 浏览器在首次载入脚本时，会创建全局执行上下文（`全局作用域`），并压入**执行栈**栈顶（`全局执行上下文是永远不会被弹出的`）；
        2. 然后每进入其它作用域（即`函数作用域`）就创建对应的执行上下文并把它压入执行栈的顶部，一旦对应的上下文执行完毕，就从栈顶弹出，并将上下文控制权交给当前的执行栈。
        3. 这样依次执行（最终都会回到全局执行上下文）。
        4. 当前执行上下文执行完毕时，被弹出执行栈，然后如果其没有被引用（没有形成闭包），那么这个函数中用到的内存就会被垃圾处理器*自动回收*。
    - this绑定规则（4条）
        - 默认绑定：绑定到全局对象window或global，在严格模式下绑定到undefined。
        - 隐式绑定：由上下文对象调用，绑定到那个上下文对象（谁调用，指向谁）。
            - 将隐式绑定的函数以回调的形式传递给另一个自定义函数、第三方库函数或者像 setTimeout 这样的内置JavaScript函数时，丢失执行上下文，回退到默认绑定规则
        - 主动绑定：由call或者apply(或者bind)调用，绑定到指定的对象。
        - 由new调用：绑定到新创建的实例对象。
            - 构造函数忘记使用new，则相当于使用实函数，创建全局变量
    - 什么是闭包
        - 创建闭包（2种）
        - 闭包的缺点
            - 滥用闭包会造成内存的大量消耗
            - 副作用，闭包函数只能取到外层函数变量的最终值。这个问题可以通过立即执行函数解决。
                - 之所以拿到最终值，是因为`函数在预解释阶段，被闭包引用的原始数据也被存在了堆内存中`，等到函数执行阶段，循环变量已经达到最终值，才被传入执行。
                - 使用立即执行函数包裹后，由于函数参数是按值传递的，所以就会将变量 i 的当前值复制给形参index。
        - 清除闭包常驻内存
            - 当一个内存空间没有变量指向的时候就会被回收。所以直接 `foo = null`
        - 垃圾回收机制
            - 分类
                - 引用计数
                - 【标记清除】，js引擎使用
            - 存在问题：垃圾回收时停止响应其他操作
                - 优化：【分代回收】，区分“临时”与“持久”对象，多回收临时对象，少回收持久对象。V8引擎就是用分代回收。
        - 内存泄漏的原因：
            -【循环引用】和【闭包】

- 数据结构
    - 数组
        - 广义上数组和链表的区别：
            - 1. 存储形式：数组是一块连续的空间，声明时就要确定长度。链表是一块可不连续的动态空间，长度可变，每个节点要保存相邻结点指针；
            - 2. 数据查找：数组的线性查找速度快，查找操作直接使用偏移地址。链表需要按顺序检索结点，效率低；
            - 3. 数据插入或删除：链表可以快速插入和删除结点，而数组则可能需要大量数据移动；
            - 4. 越界问题：链表不存在越界问题，数组有越界问题。
        - js中数组的特点
            - js中数组是由Array构造函数创建的对象，与java不同，有3个自己的特性
            - 1、无类型：数组成员可以是任意类型，且同一个数组中可以有不同类型的成员
            - 2、长度可变：数组长度可以动态变化，所以js中数组不存在越界问题
            - 3、不连续性：数组成员可以不连续
    - Set 和 Map
        - Set
            1. 成员不能重复
            2. 只有健值，没有健名，有点类似数组。
            3. 可以遍历，方法有add, delete,has
        - weakSet
            1. 成员都是对象
            2. 成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
            3. 不能遍历，方法有add, delete,has
        - Map
            1. 本质上是健值对的集合，类似集合
            2. 可以遍历，方法很多，可以跟各种数据格式转换
        - weakMap
            1. 只接受对象作为健名（null除外），不接受其他类型的值作为健名
            2. 健名所指向的对象，不计入垃圾回收机制
            3. 不能遍历，方法同get,set,has,delete
    

- JS遍历对象的方法
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
                - 解决Parent执行两次
                - 解决s.constructor指向问题
    - ES6
        - extends
        - super的两种使用方式：函数、对象
        - ES6继承与ES5继承机制比较
            - ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
            - ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。


- JS模块化规范
    - 1、CommonJS
        - 同步加载、require/module.exports、以node.js为代表
    - 2、AMD
        - 异步加载、依赖前置
    - 3、CMD
        - 异步加载、依赖就近
    - 4、UMD
        - commonjs+AMD
    - 5、ES6Module
        - 成为浏览器和服务器通用的模块解决方案
        - 静态化、使得编译时就能确定模块的依赖关系、输入、输出
        - import，因为是在编译阶段执行，import会 提升
        - export
        - 目前 import/export 最终都是编译为 require/exports 来执行的
    - ES6 Module 与 CommonJS 两种模块化规范的比较
        - 输出类型不同
            - CommonJS 输出 值的拷贝副本
            - ES6Module 输出 值的引用
        - 执行时机不同
            - CommonJS 运行时加载
            - ES6Module 编译时输出接口
        - 循环加载时处理不同
            - CommonJS require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
            - ES6Module import时成为指向被加载模块的引用，因此在"循环加载"时，也只能由开发者自己保证，真正取值的时候能够取到值。
- Webpack
    - 所有文件都是模块，只认识js模块，所以要通过一些loader把css、图片等文件转化成webpack认识的模块。
    - 打包结果
        - app.js：团队编写的源码入口文件
        - vendor.js：源码依赖的第三方vendor代码
        - n.js：按数字索引的团队源码异步拆分部分
        - manifest.js，有些项目也直接命名为runtime.js：这个manifest文件是最先加载的「指引文件」，runtime通过其记录的模块标识符，处理和加载其他bundle文件，使其按要求进行加载和执行。
            - 打包后 js 文件的加载顺序是先 manifest.js，再vendor.js，之后才是 app.js
    - module、chunk、bundle3者的关系
        - `module` 在开发中的所有的资源(.js、.css、.png)都是module，是webpack打包前的概念。
        - `chunk` 是webpack在进行模块的依赖分析的时候，代码分割出来的代码块。一个 chunk 可能包含若干 module。
        - `bundle` 最终输出到用户端的chunk，被称之为bundle；一般一个chunk对应一个bundle，只有在配置了sourcemap时，才会出现一个chunk对应多个bundle的情况。

    - 打包出的文件具体原理：
            - **manifest.js** 内部是一个 IIFE，这个函数会接受一个空数组（命名为modules）作为参数。提供3个核心方法：
                - 提供全局函数 `webpackJsonp(chunkIds, moreModules, executeModules)` 供其他chunk使用
                    - chunkIds传入的数组是[chunkId]，首先包含自身这个chunk的id，以及如果有这个chunk所用到的module打包到其他chunk需要预加载的话，也会在这个数组中。
                    - moreModules传入的是一个大对象，对象[key-value]就是[moduleId-每个module被以函数的形式包裹(实现作用域上的隔离)]，这些module都是这个chunk加载后带来的。
                    - executeModules传入的数组是[moduleId]，指的是需要被执行的module，加载的过程就执行，使用下面提到的`__webpack_require__`函数，返回最后的执行结果
                    ```js
                    if (executeModules) {
                        for (i = 0; i < executeModules.length; i++) {
                            result = __webpack_require__(executeModules[i]);
                        }
                    }
                    ```
                - 提供 `__webpack_require__(moduleId)`  
                    - 作用就是加载执行对应的module，并且缓存起来。
                    - 先判断下installedModules中是否有缓存，有则直接返回其module.exports；
                    - 没有的话就执行，将module输出的内容挂载到module.exports对象上，同时缓存到installedModules中。
                    - 注意：每个module只会在最开始依赖到的时候加载一次，如果有继续依赖的module，则递归执行，且加载过的依赖值也只执行一次。
                - 提供 `__webpack_require__.e(chunkId)`，也就是 `requireEnsure(chunkId)`
                    - 简单地说，是用来 懒加载某个chunk的
                    - 传入一个chunkId，先判断该 chunk 是否已被加载，是的话直接返回一个成功的 promise，并让 then 执行函数的 `__webpack_require__` 对应的 module 即可；
                    - 否则，会动态创建一个 script 标签去加载对应chunk，加载成功后会将该chunk中所有module注入到 webpackJsonp 中
                    ```js
                        btn.addEventListener('click', function() {
                            __webpack_require__.e(0).then((function() {
                                const data = __webpack_require__("zFrx");
                                p.innerHTML = data;
                            }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
                        })
                    ```
            - **bundle.js**，app.js或n.js都属于此类。
                - 每个chunk都是一个 IIFE 的 webpackJsonp方法
                - webpackJsonp的具体3个参数见上文，
                - 其内部会使用到`__webpack_require__(moduleId)`去加载执行模块
                - 如果有异步加载的模块，还会使用`__webpack_require__.e(chunkId)`去返回promise
    - webpack构建流程：
        - 1、`初始化`：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
        - 2、`编译`：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
        - 3、`输出`：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中。
    - 关键词
        - bundle：webpack打包出来的文件。
        - chunk：webpack依赖分析的时候，分割出来的代码块。
        - entry：建立依赖图的起点，3种方式配置：字符串、数组、对象。
        - output：
            - path：dist文件夹
            - publicPath：浏览器加载代码的url通用部分，即dist文件后的路径
        - Loader 在 module.rules 中配置，对象数组，作为模块的解析规则
            - test、use、options
        - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例
            - Plugin 可以监听 Webpack 运行的生命周期中广播出的事件
    - 常用loader和plugin：
        - loader：sass-loader, postcss-loader, css-loader, style-loader, file-loader, vue-loader, babel-loader
        - plugin：uglifyjs-webpack-plugin, terser-webpack-plugin（压缩js）, define-plugin, CommonsChunkPlugin, SplitChunksPlugin, HashedModuleIdsPlugin, html-webpack-plugin, WebpackManifestPlugin, MiniCssExtractPlugin, HotModuleReplacementPlugin
    - 提高webpack开发效率
        - webpack-merge
        - HotModuleReplacementPlugin
    - 对bundle体积进行监控和分析
        - webpack-bundle-analyzer
        - VSCode 插件 Import Cost
    - loader执行顺序
        - 1、默认情况下，会按照配置文件中的书写顺序 从下往上 处理
        - 2、enforce 强制执行 loader 的作用顺序：
                - pre 代表在所有正常 loader 之前执行；
                - post 是所有 loader 之后执行；
                - inline 官方不推荐使用。
    - 生产环境使用source map
        - map文件只要不打开开发者工具，浏览器是不会加载的。
        - 3种处理方案：
            - hidden-source-map：借助第三方错误监控平台 Sentry 使用。
            - nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高。
            - sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)。
        - 注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积，并降低整体性能。
    - 文件指纹chunkhash
        - 指纹类别
            - Hash：即每次编译都不同。可以在测试环境打包的JS文件中使用'[name].[hash]'
            - `Chunkhash`：不同的 entry 会生出不同的 chunkhash。适用于`生产环境`打包后的JS文件'[name].[chunkhash]'，最大限度利用浏览器缓存。
            - Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。
        - [chunkhash]不能和 HMR 一起使用，即开发环境因为不需要持久化缓存，故不要用[chunkhash]、[contenthash]、[hash]，直接用[name]
        - 占位符指定长度 [chunkhash:8]
        - 各类别适用文件
            - JS文件的指纹设置'[name][chunkhash:8].js'
            - CSS文件的指纹设置'[name][contenthash:8].css'
            - Images/Fonts的指纹设置'[name][hash:8].[ext]', 注意，图片字体的hash与和css或js的hash概念不一样，是按内容生成的，不是按编译生成的
    - 持久化缓存caching（注意id问题）
        - 通过指定：output.filename: '[name].[chunkhash].js'，内容改变名字才变
        - 再配合代码分割：将vendor.js单独打包。
        - 注意模块id变化问题：
            - 异步模块id是计数器递增的，如果中间增加了新模块，之后的就要变
            - 使用 HashedModuleIdsPlugin 插件来改变模块 ID 的计算方式，哈希值代替计数ID
    - 如何将文件名发送到浏览器
        - HtmlWebpackPlugin
        - WebpackManifestPlugin
    - code splitting
        - 将项目代码中无需立即调用的代码，在代码构建时转变为异步加载的过程。
        - 代码分割入手点（如何分割）
            - 1、`入口文件方式`（Entry Points）
            - 2、`动态引入/懒加载`（Dynamic Imports/Lazy-Loading）
            - 3、`避免重复`（Prevent Duplication）
                - webpack3：CommonsChunkPlugin提取公共代码块被（Webpack4 废弃了 CommonsChunkPlugin）
                    new webpack.optimize.CommonsChunkPlugin() 
                        - name: 'vendor', minChunks: module => module.context 
                        - name: 'manifest', minChunks: Infinity,
                - webpack4：SplitChunksPlugin自动分割
                    module.exports = {
                        optimization: {
                            splitChunks: {
                                chunks: 'all', // 智能将依赖项提取到独立的 chunk 中, vendor.js
                            }
                            runtimeChunk: true, // 提取runtime.js 或叫 manifest.js
                        },
                    };
        - import()代码分割类型（两种）
            - 静态代码分割
            - 动态代码分割
        - 魔法注释
            - 在 import 关键字后的括号中使用指定注释，对分离出的 chunk 进行命名，指定异步加载模块不同打包模式，使异步模块预加载
        - Webpack 4 引入了 mode 这个选项（提供development、production两种模式，如果 mode 是 production，那 Webpack 4 就会开启 Code Splitting。

    - webpack文件监听原理
        - 开启监听模式(两种方式)
            - 1. 启动 webpack 命令时，带上 --watch 参数，浏览器需刷新
            - 2. 热更新: WDS使用HotModuleReplacementPlugin
                - 优点1：WDS（webpack-dev-server）不刷新浏览器；
                - 优点2：WDS 不输出文件，⽽是放在内存中；
    - 热更新原理比较难讲清，只要记住上面的两个优点就行了。

    - 优化 Webpack 的构建速度
        - 1、`分包构建`（从vendor.js中将不太变动的库依赖单独处理，因为比如axios不经常变动，打包进vendor中造成包很大，并且经常打包也浪费了构建时间），两种方式：
            - 1、extenals外部扩展（CDN）
                - webpack打包时，发现jquery定义在externals，是外部引用的，则不会打包jquery代码，从而减少打包时间
            - 2、DLLPlugin && DllReferencePlugin
                - Externals会有多次引用的问题，所以也不好，DLL则是 前置不经常更新的第三方库依赖包的构建，来提高真正的build和rebuild构建效率
                - 只要第三方库没有变化，之后的每次build都只需要去打包自己的业务代码
                - webpack通过webpack.DllPlugin与webpack.DllReferencePlugin两个内嵌插件实现此功能。
                    - DllPlugin 进行分包，生成两个文件（bundlejs、bundle.mainifest.json）；
                    - DllReferencePlugin 对 bundle.manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。

        - 2、摇树优化 `Tree shaking`
            - 在打包过程中检测工程中没有被引用过的模块并进行标记，在资源压缩时将它们从最终的bundle中去掉（只对ES6 Modlue生效）
            - 原理：
                - tree-shaking是因为*import静态引入*的能力，得以*对文件内容进行浅层比较*，去掉未被使用的代码。
            - 如何使用：
                - 开发中尽可能使用ES6 Module的模块，提高tree shaking效率。
                - 禁用 babel-loader 的模块依赖解析（会转成commonjs形式模块，就不能tree shaking了）
                - 使用插件，去除无用 CSS 代码

        - 3、作用域提升 `Scope hoisting`
            - scope hoisting 会把需要导入的文件直接移入导入者顶部 打包在一起，这就是所谓的 hoisting。
                - Scope hoisting的收益
                    - 代码量明显减少，因为减少了函数声明语句
                    - 减少了内存开销
                    - 运行速度提升：因为不用多次使用__webpack_require__调用模块。
                - Scope hoisting的条件
                    - 必须使用ES6的语法
                    - 如何开启：new webpack.optimize.ModuleConcatenationPlugin()
                        - 当然开启了也不一定会打包在一起，因为有的是非ES6 模块或使用异步 import()

        - 4、`压缩代码`
            - 多进程并行压缩 webpack-paralle-uglify-plugin，开启 parallel 参数
            - 压缩CSS：mini-css-extract-plugin

        - 5、利用`缓存提升二次构建速度`
            - babel-loader 开启缓存（cacheDirectory：true）
            - terser-webpack-plugin：开启缓存（cache：true）

    - webpack常用配置技巧
        - 省略文件后缀及配置别名：`extensions`、`alias`
        - 模块注入全局变量：使用 `ProvidePlugin` 配置全局注入





- 前端路由模式
    - SPA：只有一个HTML的应用，利用 JS 动态的变换 HTML 的内容，从而来模拟多个视图间跳转。
        - 优点：无需重复加载整个页面，前后端分离职责清晰，服务器压力小
        - 缺点：首次加载耗时多，需要管理前进后退路由，SEO 难度较大
    - 前端路由：
        - 为 SPA 中的每个视图展示形式匹配一个特殊的 url。在刷新、前进、后退和SEO时均通过这个特殊的 url 来实现。
        - 前端路由需要实现 2点：
            - **能改变 url 但不让浏览器向服务器发送请求。**
            - **可以监听到 url 的变化。**
        - hash、history模式都可以实现上述两点：
            - hash模式 原理
                - 改变hash，不会刷新页面，即 不会导致浏览器向服务器发送请求
                - hashchange 事件
            - history模式 原理
                - h5提供了 history.pushState() 和 history.replaceState()，因此可以实现：改变 url 同时，不会刷新页面
                - 如何监听呢？因为history 的改变并不会触发任何事件，所以需要”曲线救国“，拦截所有可能触发 history 改变的情况，变相监听 history 的改变，
                    - 只有4种history改变途径
                        - 点击浏览器的前进或后退按钮；
                        - 点击 a 标签；
                        - 在 JS 代码中触发 history.pushState 函数；
                        - 在 JS 代码中触发 history.replaceState 函数；
            - history模式为什么需要后端支持？
                - history 在修改 url 后，虽然页面并不会刷新，但如果我们手动刷新，或通过 url 直接进入应用的时候，服务端是无法识别这个 url 的
                - 单页应用，其他url服务器会404
                - 因此，需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回单页应用的 html 文件。
            - 如何选择模式呢？
                - 因为history是趋势，我们直接看hash的缺点就好了：
                    - 更丑；
                    - 会导致锚点功能失效；
                    - 相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以。

- SSR 服务端渲染和同构原理
    - 为什么要服务端渲染（SSR）
        - `避免首屏等待`
        - `更好支持SEO`
    - 传统SSR 与 CSR客户端渲染（SPA）
    - 前端同构应用（SSR + SPA）：
        - 第一次访问页面是服务端渲染，基于第一次访问，后续的交互就是 SPA 的效果和体验，还不影响SEO。简单说就是一个前端项目里的组件，部分服务端渲染后输出，部分由客户端异步渲染，既保障网页渲染速度，也有利于搜索引擎 SEO。
    - 同构应用需要解决的3个问题
        - 1、`路由同构`：双端路由如何维护 
            - 路由配置抽取出来 react-router-config
        - 2、`数据预取同构`：获取数据的方法和逻辑写在哪里
            - 可选方案：使用高阶组件给路由页面组件绑定数据获取方法，比如withSSR(WrappedCompoennt, getInitialProps)
        - 到这里，实现了双端的数据预取同构，但是数据也仅仅是服务端有，浏览器端是没有这个数据，浏览器会渲染出不同的解构替换服务端的渲染
        - 3、`渲染同构`：如何复用 服务端html
            - 在服务端将预取的数据注入到浏览器，使浏览器端可以访问到。客户端进行渲染前，需要先将数据传入对应的组件，保证props的一致性。
            - 我们的方案是直接挂在html中。

    - 其他要注意的问题
        - node端没有window和webstorage
        - React通过renderToString(`<App />`)方法将应用代码转换成字符串，再替换到页面中占位符的位置。
        - ReactDOM.hydrate会去复用原本已经存在的 DOM 节点，尝试在已有标记上绑定事件监听器。
        - SSR是不支持异步组件的
            - 我们的方案没有解决这个问题
        - SEO支持（路由页动态生成TDK）
            - 采用react-helmet库
        - 结合状态管理的SSR实现

- git
    - git rebase 变基，合并多次本地commit记录，使得分支树是线性的
        如果你想要你的分支树呈现简洁，不罗嗦，线性的commit记录，那就采用rebase
        git rebase操作实际上是将当前执行rebase分支的所有基于原分支提交点之后的commit打散成一个一个的patch，并重新生成一个新的commit hash值，再次基于原分支目前最新的commit点上进行提交，并不根据两个分支上实际的每次提交的时间点排序，rebase完成后，切到基分支进行合并另一个分支时也不会生成一个新的commit点，可以保持整个分支树的完美线性

        另外值得一提的是，当我们开发一个功能时，可能会在本地有无数次commit，而你实际上在你的master分支上只想显示每一个功能测试完成后的一次完整提交记录就好了，其他的提交记录并不想将来全部保留在你的master分支上，那么rebase将会是一个好的选择，他可以在rebase时将本地多次的commit合并成一个commit，还可以修改commit的描述等

        git merge 操作合并分支会让两个分支的每一次提交都按照提交时间（并不是push时间）排序，并且会将两个分支的最新一次commit点进行合并成一个新的commit，最终的分支树呈现非整条线性直线的形式

- offsetWidth 水平方向 width + 左右padding + 左右border-width
- clientWidth 水平方向 width + 左右padding
- margin与padding值设置为百分数时，其值的计算参照 最近父级元素width，注意，四个方向都是以父级的宽来百分比的
:::

