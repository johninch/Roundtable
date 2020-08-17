
性能优化
    - 缓存（前端存储、service worker的cache api、http缓存）
    - 发送请求（避免多余重定向、DNS预解析dns-prefetch、DNS优化：域名发散与域名收敛、建立preconnect）
    - 页面解析与处理（引用位置、defer和async、首屏时间优化——SSR同构/骨架屏幕/loading）
    - 页面静态资源（CDN、prefetch和preload、代码拆分与按需加载、提取公共代码、Tree Shaking、打包压缩、图片资源优化）
    - 运行时（rAF避免强制同步布局、长列表优化、避免JS执行过长而掉帧——rAF时间分片/requestIdleCallback空闲时间执行、web worker并行线程计算）
    - 渲染时（减少重排重绘、开启GPU硬件加速单独触发DOM合成层）
    - 滚动时（防抖、节流、Passive event listeners）

网络传输性能检测工具——Page Speed，谷歌插件


前端鉴权
    - session-cookie的前端鉴权方式
        - 认证过程：创建session会话，保存session到内存或redis中，生成sessionId种到响应头中返回。客户端得到sessionId后保存于cookie中，之后每次该客户端发送请求都会携带cookie中的sessionId，服务端拿到后去内存中匹配鉴权。
        - 缺点：服务器内存消耗大，且易受到CSRF攻击
    - Token验证
        - 有状态token
            - token是随机生成的UUID，存在Redis内存中，服务端验证客户端发送过来的 Token 时，需要去redis内存中查找匹配获取用户信息，验证 Token 是否有效。
        - 无状态token
            - 本质是：用 解析token 的计算时间换取 创建会话session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
            - JWT，无状态token解决方案
        - 前端存储和发送Token的两种方式：
            - 1 使用 Header.Authorization + localStorage 存储和发送 token
            - 2 使用 cookie 存储和发送 token
        - :100:其实有状态token和sessionId这种方式其实是差不多的，都是针对每个用户UUID生成唯一的字符串来匹配，都需要在服务端来存储。而无论前端是用cookie传，还是用header.Authorization传，对于后端来说也是差不多的。
            - 但`sessionId有一个致命问题`在于，只会在登录认证的应用服务器上创建对应的session会话，而如果有多台服务器，比如做了负载均衡或轮询，则用户登到其他服务器就不行了，因为其他服务器上没有对应的session会话，就需要重新创建一个。
            - 而有状态token使用redis集群来存储已经签发的token列表，使用redis集群来存而不在「内存」或「应用服务器」中存的原因是：
                - redis集群相对于「应用服务器」来说，相当于单独的服务器，不会占用应用服务器资源，且方便扩容。
                - redis集群相对于「内存」来说，相当于一个单独的共享空间，对于多个应用服务器可以共享。


前端安全
    - XSS
        - 分类 - XSS 攻击可分为存储型、反射型和 DOM型 三种
            - 存储型、反射型 都属于服务端安全漏洞
                - `存储型`：攻击者将恶意代码提交到目标网站的`数据库中`。用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。前端执行了恶意代码。
                - 反射型：跟存储型 XSS 的区别是：**存储型 XSS** 的恶意代码`存在数据库里`，**反射型 XSS** 的恶意代码`存在 URL 里`。
            - DOM型 则完全是前端JS安全漏洞
                - 把不可信的数据当作代码执行了
        - 防范
            - 防止攻击者提交：输入过滤
                - 但可能会产生乱码
            - 防止恶意代码被执行：
                - 对于服务端的两种：
                    - 改成纯前端渲染
                        - 代码和数据分开，但对于需要SSR的场景是不可行的
                    - 对 HTML 做充分转义
                        - 对于 HTML 转义通常只有一个规则，就是把 & < > " ' / 这几个字符转义掉
                - 对于前端的 DOM型：
                    - 实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。
                        在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。

                        如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。

                        DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。
    - CSRF
        -



- diff算法
    - 传统diff算法是O(n^3)，即如果有1000个节点的树比较，则需比较1亿次
    - 优化到O(n)
        - *只比较同一层级，不跨级比较*
        - *tag不相同*，则认为是不同节点，直接删掉重建，不再深度比较
        - *tag和key两者都相同*，则认为是相同节点，不再深度比较
    - vue的diff算法参考snabbdom，采用双端比较。
        - diff的核心实现主要通过两个方法，patchVnode 与 updateChildren
            - patchVnodepatch(vnode, newVnode) 有两个参数，主要分五种比较情况.
            - updateChildren
                - oldCh 和 newCh 各有两个头尾的指针 StartIdx 和 EndIdx ，一共有4种比较方式。
                - 如果 4 种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，指针会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。
        - 这也是为什么key尽量不要用随机数或索引来做，因为无法判断唯一性


- react 渲染/更新过程
    - **初次渲染**
        - 有了props state
        - babel解析JSX为render函数
        - 执行render函数，生成vnode，由patch(elem, vnode)渲染
            - react中的`patch被拆分为两个阶段`
                - *reconciliation*阶段：执行diff算法，纯js计算
                    - fiber，会将reconciliation阶段进行任务拆分（commit阶段dom渲染，无法拆分）
                - *commit*阶段：将diff结果渲染DOM
    - **更新渲染过程**
        - setState(newState) --> 生成dirtyComponents（可能包含子组件）
        - 重新执行render函数，生成newVnode，由patch(vnode, newVnode)渲染
    - 为什么没有说vue中的patch分为两个阶段？
        - 个人理解是vue中每个组件都是一个watcher，只针对组件内部进行diff比较，通过响应式来得知哪些组件需要diff
        - 因此，在合理划分组件的情况下，diff比较量不会很大，更新的较快，不太会出现js线程对gui线程的阻塞，所以，也就没有引入fiber，并且也没有引入SCU


- vue 渲染/更新过程（想一下官网的流程图）
    - vue-template-compiler从模板到render函数，再到vnode，再到渲染和更新
    - **初次渲染**
        - 解析模板为render函数（打包编译时完成，在开发环境下使用vue-loader已完成）
        - 触发响应式，监听data属性，添加getter和setter
        - 执行render函数，生成vnode，由patch(elem, vnode)渲染
            - （render过程中，会touch所用到data的getter，我们知道每个组件实例都对应一个 watcher 实例，则被touch的data会被组件的watcher收集）
    - **更新渲染过程**
        - 修改data，触发setter
            - （setter通知watcher，匹配依赖收集的deps列表，如果之前已经被watcher监听过了，触发re-render）
        - 重新执行render函数，生成newVnode，由patch(vnode, newVnode)渲染
    - 异步渲染
        - 汇总data修改，一次性更新视图
        - 减少DOM操作次数，提高性能


koa的洋葱模型，和express有什么区别
用过nginx吗，说说干嘛的
webpack的拆包策略
mouesemove,mouseleave,mouseup等等几个API的区别
实现一个JSON.stringfy()，要支持循环引用，并记录循环引用的路径
软件工程和设计模式有什么区别，说说几个了解的设计模式
generater的本质是什么，或者说下generater执行时操作系统中发生了什么


很多人被问到项目亮点或者难点的时候不知道怎么说，这个其实可以结合你学过的基础知识来讲，比如项目某个地方用到了某种设计模式，达到了什么效果，或者用到了某种数据结构或算法，或者是写了什么webpack插件来辅助项目开发，又或者是遇到了某些性能问题，排查之后怎么去解决，等等这些都可以去讲，如果这些都没有，可以强行加上一些通用问题，比如长列表优化，列表基本上每个人的项目上都有，可以去网上看看常见的长列表优化方案，为什么要优化，怎么去优化，优化有哪些方案，每个方案的优略，优化之后带来的成果等等。


实现class和extend

编写webpack插件
```js
    apply(compiler) {
        // compiler.hooks，常用如下：
            // compile: SyncHook同步的，一个新的编译(compilation)创建之后，钩入(hook into) compiler
            // compilation: SyncHook同步的， 编译(compilation)创建之后，执行插件
            // emit: AsyncSeriesHook异步的， 生成资源到 output 目录之前
            // done: SyncHook同步的， 编译(compilation)完成
        // 同步hook用tap，异步hook用tapAsync
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
            console.log('compile是同步hook')
        })
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            // debugger;
            // compiler 存放了所有配置和打包的内容
            // compilation 只存放当前这次打包相关的内容
            // compilation.assets 存放了所有打包生成的内容
            compilation.assets['copyright.txt'] = {
                source: () => {
                    return 'copyright by John Inch'
                },
                size: () => {
                    return 21; // source return 的字符长度
                }
            }
            cb() // 使用tapAsync异步方式，必须触发下回调
        })
    }
```


什么是PV值
       PV（page view ） `访问量`，是网站分析的一个术语，用以衡量网站用户访问的网页的数量。对于广告主，PV 值可预期它可以带来多少广告收入。一般来说，PV 与来访者的数量成正比，但是 PV 并不直接决定页面的真实来访者数量，如同一个来访者通过不断的刷新页面，也可以制造出非常高的 PV。

       PV 即页面浏览量或点击量，是衡量一个网站或网页用户访问量。具体的说，PV 值就是所有访问者在 24 小时（0 点到 24 点）内看了某个网站多少个页面或某个网页多少次。PV 是指页面刷新的次数，每一次页面刷新，就算做一次 PV 流量。度量方法就是从浏览器发出一个对网络服务器的请求（Request），网络服务器接到这个请求后，会将该请求对应的一个网页（Page）发送给浏览器，从而产生了一个 PV。那么在这里只要是这个请求发送给了浏览器，无论这个页面是否完全打开（下载完成），那么都是应当计为 1 个 PV。

什么是 UV 值
       UV （unique visitor ）即`独立访客数`，指访问某个站点或点击某个网页的不同 IP  地址的人数。在同一天内，UV  只记录第一次进入网站的具有独立IP  的访问者，在同一天内再次访问该网站则不计数。UV 提供了一定时间内不同观众数量的统计指标，而没有反应出网站的全面活动。


- 位图算法应用：https://www.cnblogs.com/zhuoqingsen/p/9214709.html
    - 判断一个数是否存在某数据中，假如有40亿数据，我们如何快速判断指定一个数是否存在？
        申请512M的内存 512M = 512 * 1024 * 1024B * 8 = 4294967296比特(bit)  这个空间可以装40亿了

        一个bit位代表一个int值

        读入40亿个数，设置相应的bit位

        读入要查询的数，查看相应bit位是否为1，为1表示存在，为0表示不存在
    - 做交集和并集效率极高
        举个例子，现有一位图0000101，代表喜欢吃苹果用户

        　　　　　　另一位图0000111，代表喜欢吃西瓜用户

        统计喜欢吃苹果或西瓜的用户，0000101|0000111=0000111

- 字典树算法应用：https://blog.csdn.net/piaocoder/article/details/97039255
    - 给一亿个长度不一样的字符串，怎么判断一个随机长度的字符串在不在这个里面






// - `M 670. 最大交换`
// 将数字从大到小排列，与原数字比较，找出第一位置不一样的数。如8217排序后变为8721，两两对比，第二个数不同，表示7和2交换，得到结果8712
// 对于有重复数字的情况，应该要用位于最后面的去交换

E 674. 最长连续递增序列
E 面试题61. 扑克牌中的顺子
H 42. 接雨水
M 11. 盛最多水的容器
E 1. 两数之和
M 43. 字符串相乘（大数相乘）
E 字符串相加（处理加法精度）
M 2. 两数相加 —— 链表head是个位：(2 -> 4 -> 3) 342
M 445. 两数相加 II —— 链表尾部是个位：(2 -> 4 -> 3) 243
M 3. 无重复字符的最长子串
M 5. 最长回文子串
E 21. 合并两个有序链表
E 53. 最大子序和
M 146. LRU缓存机制
E 121. 买卖股票的最佳时机
E 122. 买卖股票的最佳时机 II（尽可能地完成更多的交易）
M 56. 合并区间
M 46. 全排列
M 面试题38. 字符串的排列
E 20. 有效的括号
M 102. 二叉树的层序遍历
M 199. 二叉树的右视图
M 103. 二叉树的锯齿形层次遍历
M 70. 爬楼梯
M 22. 括号生成
M 93. 复原IP地址
M 200. 岛屿数量
M 695. 岛屿的最大面积
E 9. 回文数
M 19. 删除链表的倒数第N个节点
M 322. 零钱兑换 x
E 160. 相交链表
E 14. 最长公共前缀
E 141. 环形链表
E 206. 反转链表 （2种）
E 198. 打家劫舍
E 111. 二叉树的最小深度
E 104. 二叉树的最大深度
E 101. 对称二叉树
E 112. 路径总和
H 41. 缺失的第一个正数
M 17. 电话号码的字母组合
求组合：从n个数组中各选一个元素，有多少种组合
455. 分发饼干
M 442. 数组中重复的数据
E 414. 第三大的数
M 1143. 最长公共子序列
E 62. 不同路径
M 63. 不同路径 II
面试题 08.06. 汉诺塔问题
二叉树的层序遍历

种花问题（筛选运算-贪心）
链表倒数第k个节点
链表中环的入口结点


