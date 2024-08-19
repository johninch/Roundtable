(window.webpackJsonp=window.webpackJsonp||[]).push([[248],{808:function(v,_,e){"use strict";e.r(_);var o=e(14),i=Object(o.a)({},(function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h1",{attrs:{id:"浏览器工作原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器工作原理"}},[v._v("#")]),v._v(" 浏览器工作原理")]),v._v(" "),e("h2",{attrs:{id:"cpu、进程、线程-的关系"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cpu、进程、线程-的关系"}},[v._v("#")]),v._v(" CPU、进程、线程 的关系")]),v._v(" "),e("ul",[e("li",[v._v("CPU（工厂）：计算机的核心是CPU，承担所有计算任务。")]),v._v(" "),e("li",[v._v("进程（车间）：进程是CPU资源分配和独立运行的最小单位。进程之间相互独立，任一时刻，CPU总是运行一个进程，其他进程处于非运行状态。\n"),e("ul",[e("li",[v._v("CPU使用时间片轮转进度算法来实现同时运行多进程。")]),v._v(" "),e("li",[v._v("不同进程之间也可以通信，不过代价较大。")])])]),v._v(" "),e("li",[v._v("线程（工人）：线程是CPU调度的最小单位。一个进程中可以有多个线程，多个线程共享进程资源。\n"),e("ul",[e("li",[v._v("单线程与多线程，都是指在一个进程内的单和多。")])])])]),v._v(" "),e("h4",{attrs:{id:"线程和进程的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#线程和进程的区别"}},[v._v("#")]),v._v(" 线程和进程的区别")]),v._v(" "),e("ul",[e("li",[v._v("进程是"),e("code",[v._v("资源分配的最小单位")]),v._v("，线程是"),e("code",[v._v("CPU调度（即程序执行）的最小单位")]),v._v("；")]),v._v(" "),e("li",[v._v("一个进程可以包含多个线程，"),e("strong",[v._v("每个进程有自己的独立内存空间，不同进程间数据很难共享")]),v._v("；")]),v._v(" "),e("li",[e("strong",[v._v("同一进程下不同线程间共享")]),v._v("全局变量、静态变量，数据很易共享；")]),v._v(" "),e("li",[v._v("进程要比线程消耗更多的计算机资源；")]),v._v(" "),e("li",[v._v("进程间不会相互影响，而一个线程挂掉将导致其他线程阻塞。")])]),v._v(" "),e("h4",{attrs:{id:"进程间通信-6种"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#进程间通信-6种"}},[v._v("#")]),v._v(" 进程间通信（6种）")]),v._v(" "),e("ol",[e("li",[e("code",[v._v("管道pipe")]),v._v("：速度慢，容量有限，半双工（数据只能单向流动），且只有父子进程能通讯")]),v._v(" "),e("li",[e("code",[v._v("命名管道namedpipe")]),v._v("：同样速度慢，半双工，但是相比pipe，具有任何进程间都能通讯的特点")]),v._v(" "),e("li",[e("code",[v._v("消息队列MessageQueue")]),v._v("：容量受到系统限制，且要注意第一次读的时候，要考虑上一次没有读完数据的问题")]),v._v(" "),e("li",[e("code",[v._v("信号量Semaphore")]),v._v("：是一个计数器，不能传递复杂消息，只可用来控制多个进程对共享资源的访问，起同步作用")]),v._v(" "),e("li",[e("code",[v._v("共享内存SharedMemory")]),v._v("：能够很容易控制容量，速度快，但要保持同步，比如一个进程在写的时候，另一个进程要注意读写的问题，相当于线程中的线程安全。当然，共享内存区同样可以用作线程间通讯，不过没这个必要，线程间本来就已经共享了同一进程内的一块内存")]),v._v(" "),e("li",[e("code",[v._v("套接字Socket")]),v._v("：与其他通信机制不同的是，它可用于不同及其间的进程通信。")])]),v._v(" "),e("h4",{attrs:{id:"线程间通信-3种"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#线程间通信-3种"}},[v._v("#")]),v._v(" 线程间通信（3种）")]),v._v(" "),e("ol",[e("li",[e("strong",[v._v("锁机制")]),v._v("：包括"),e("code",[v._v("互斥锁")]),v._v("、"),e("code",[v._v("条件变量")]),v._v("、"),e("code",[v._v("读写锁")]),v._v(" "),e("ul",[e("li",[v._v("a. "),e("code",[v._v("互斥锁")]),v._v("提供了以排他方式防止数据结构被并发修改的方法。")]),v._v(" "),e("li",[v._v("b. "),e("code",[v._v("条件变量")]),v._v("对条件的测试是在"),e("code",[v._v("互斥锁")]),v._v("的保护下进行的，始终与"),e("code",[v._v("互斥锁")]),v._v("一起使用。可以以原子的方式阻塞进程，直到某个特定条件为真为止。")]),v._v(" "),e("li",[v._v("c. "),e("code",[v._v("读写锁")]),v._v("允许多个线程同时读共享数据，而对写操作是互斥的。")])])]),v._v(" "),e("li",[e("strong",[v._v("信号量机制(Semaphore)")]),v._v("：包括无名线程信号量和命名线程信号量")]),v._v(" "),e("li",[e("strong",[v._v("信号机制(Signal)")]),v._v("：类似进程间的信号处理线程间的通信目的.主要是用于线程同步，所以线程没有像进程通信中的用于数据交换的通信机制。")])]),v._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[v._v("多线程中产生死锁的原因和解决死锁的办法")]),v._v(" "),e("ul",[e("li",[e("strong",[v._v("线程死锁")]),v._v("是指由于两个或者多个线程互相持有对方所需要的资源，导致这些线程处于等待状态，无法前往执行。")]),v._v(" "),e("li",[v._v("产生"),e("strong",[v._v("死锁的原因")]),v._v("，概括来说是"),e("strong",[v._v("由于线程间竞争系统资源，或者进程的推进顺序不当引起的")]),v._v("。\n"),e("ul",[e("li",[v._v("具体来说，如果在一个系统中以下四个条件同时成立，那么就能引起死锁（"),e("code",[v._v("4个必要条件")]),v._v("）：\n"),e("ul",[e("li",[v._v("互斥条件：进程要求对所分配的资源进行排它性控制，即在一段时间内某资源仅为一进程所占用。")]),v._v(" "),e("li",[v._v("请求和保持条件：当进程因请求资源而阻塞时，对已获得的资源保持不放。")]),v._v(" "),e("li",[v._v("不剥夺条件：进程已获得的资源在未使用完之前，不能剥夺，只能在使用完时由自己释放。")]),v._v(" "),e("li",[v._v("环路等待条件：在发生死锁时，必然存在一个进程--资源的环形链。")])])])])]),v._v(" "),e("li",[v._v("解决死锁的办法：\n"),e("ul",[e("li",[e("code",[v._v("加锁顺序")]),v._v("（线程按照一定的顺序加锁）")]),v._v(" "),e("li",[e("code",[v._v("加锁时限")]),v._v("（线程尝试获取锁的时候加上一定的时限，超过时限则放弃对该锁的请求，并释放自己占有的锁）")]),v._v(" "),e("li",[e("code",[v._v("死锁检测")])])])])])]),v._v(" "),e("h4",{attrs:{id:"并行与并发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#并行与并发"}},[v._v("#")]),v._v(" 并行与并发")]),v._v(" "),e("ul",[e("li",[e("strong",[v._v("并行")]),v._v("：两个任务同时运行(多个CPU)。")]),v._v(" "),e("li",[e("strong",[v._v("并发")]),v._v("：指两个任务同时请求运行，处理器一次只能接受一个任务，就会把两个任务安排"),e("code",[v._v("轮流执行")]),v._v("，由于"),e("strong",[v._v("CPU时间片运行时间很短，就会感觉两个任务同时执行")]),v._v("。")])]),v._v(" "),e("h2",{attrs:{id:"浏览器是多进程的"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器是多进程的"}},[v._v("#")]),v._v(" 浏览器是多进程的")]),v._v(" "),e("ul",[e("li",[v._v("计算机中的每个应用程序都是一个进程，应用程序可分为多个子模块，这些子模块就对应多个子进程。")]),v._v(" "),e("li",[v._v("浏览器应用程序就是一个大进程，而每个tab页都是一个子进程，所以浏览器是多进程的。")])]),v._v(" "),e("h3",{attrs:{id:"浏览器多进程分类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器多进程分类"}},[v._v("#")]),v._v(" 浏览器多进程分类")]),v._v(" "),e("ul",[e("li",[v._v("主进程：浏览器的主进程（负责协调、主控），只有一个；")]),v._v(" "),e("li",[v._v("第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建；")]),v._v(" "),e("li",[v._v("GPU进程：用于3D绘制，最多一个；")]),v._v(" "),e("li",[e("code",[v._v("渲染进程（浏览器内核）")]),v._v("：\n"),e("ul",[e("li",[v._v("每个tab页面是一个渲染进程，互不影响。")]),v._v(" "),e("li",[v._v("这个渲染进程也是多线程的，包含5大类线程。")])])])]),v._v(" "),e("h2",{attrs:{id:"渲染进程是多线程的"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#渲染进程是多线程的"}},[v._v("#")]),v._v(" 渲染进程是多线程的")]),v._v(" "),e("p",[v._v("每一个tab页面可以看作是「渲染进程」进程，然后这个进程是多线程的，它有几大类线程：")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("GUI渲染线程")]),v._v(" "),e("ul",[e("li",[v._v("负责渲染页面，布局和绘制")]),v._v(" "),e("li",[v._v("页面需要重绘和回流时，该线程就会执行")]),v._v(" "),e("li",[v._v("与js引擎线程互斥，防止渲染结果不可预期")])])]),v._v(" "),e("li",[e("code",[v._v("JS引擎线程")]),v._v(" "),e("ul",[e("li",[v._v("负责处理解析和执行javascript脚本程序")]),v._v(" "),e("li",[v._v("只有一个JS引擎线程（单线程）")]),v._v(" "),e("li",[v._v("与GUI渲染线程互斥，防止渲染结果不可预期")])])]),v._v(" "),e("li",[e("code",[v._v("事件触发线程")]),v._v(" "),e("ul",[e("li",[v._v("用来控制事件循环（鼠标点击、setTimeout、ajax等）")]),v._v(" "),e("li",[v._v("当事件满足触发条件时，将事件放入到JS引擎所在的执行队列中")])])]),v._v(" "),e("li",[e("code",[v._v("定时器线程")]),v._v(" "),e("ul",[e("li",[v._v("setInterval与setTimeout所在的线程")]),v._v(" "),e("li",[v._v("定时任务并不是由JS引擎计时的，是由定时器线程来计时的")]),v._v(" "),e("li",[v._v("计时完毕后，通知事件触发线程")])])]),v._v(" "),e("li",[e("code",[v._v("异步http请求线程")]),v._v(" "),e("ul",[e("li",[v._v("浏览器有一个单独的线程用于处理AJAX请求")]),v._v(" "),e("li",[v._v("当请求完成时，若有回调函数，通知事件触发线程")])])])]),v._v(" "),e("h3",{attrs:{id:"两个问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#两个问题"}},[v._v("#")]),v._v(" 两个问题")]),v._v(" "),e("h4",{attrs:{id:"为什么-javascript-是单线程的"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么-javascript-是单线程的"}},[v._v("#")]),v._v(" 为什么 javascript 是单线程的")]),v._v(" "),e("ul",[e("li",[v._v("创建 js 语言时，多线程架构的硬件支持并不好。")]),v._v(" "),e("li",[v._v("因为多线程的复杂性，多线程操作需要加锁，编码的复杂性会增高。")]),v._v(" "),e("li",[v._v("作为浏览器脚本语言，js的主要用途是与用户互动，以及操作DOM，如果同时操作 DOM ，在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期。")]),v._v(" "),e("li",[v._v("为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。")])]),v._v(" "),e("h4",{attrs:{id:"为什么-gui渲染线程-与-js引擎线程-互斥"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么-gui渲染线程-与-js引擎线程-互斥"}},[v._v("#")]),v._v(" 为什么 GUI渲染线程 与 JS引擎线程 互斥")]),v._v(" "),e("p",[v._v("由于 js 可以操作 DOM，如果同时修改元素属性并同时渲染界面(即 JS线程和GUI线程同时运行)，会导致渲染线程前后获得的元素可能不一致。因此，为了防止渲染出现不可预期的结果，浏览器设定 GUI渲染线程和JS引擎线程为互斥关系，当JS引擎线程执行时GUI渲染线程会被挂起，GUI更新则会被保存在一个队列中等待JS引擎线程空闲时立即被执行。")]),v._v(" "),e("p",[v._v("这部分建议与"),e("RouterLink",{attrs:{to:"/Question-Bank/execution/event-loop.html"}},[v._v("任务队列 与 Event Loop")]),v._v("一同食用。")],1),v._v(" "),e("h2",{attrs:{id:"浏览器存储"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器存储"}},[v._v("#")]),v._v(" 浏览器存储")]),v._v(" "),e("h3",{attrs:{id:"cookie-和-session"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cookie-和-session"}},[v._v("#")]),v._v(" Cookie 和 Session")]),v._v(" "),e("ul",[e("li",[v._v("Cookie 和 Session都为了用来保存状态信息，都是保存客户端状态的机制，它们都是"),e("code",[v._v("为了解决HTTP无状态")]),v._v("的问题的。")]),v._v(" "),e("li",[v._v("Cookie是保存在客户端浏览器的一小段的文本信息，"),e("code",[v._v("每个domain最多只能有20条Cookie")]),v._v("，每个Cookie"),e("code",[v._v("长度不能超过4KB")]),v._v("，否则会被截掉。考虑到安全应当使用Session而不是cookie。")]),v._v(" "),e("li",[v._v("Session保存在服务器上。Session的运行依赖Session Id，而Session Id是存在Cookie中的，也就是说，如果浏览器禁用了Cookie，同时Session也会失效（但是可以通过其它方式实现，比如在url中传递session_id）。如果Cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道Cookie的意义，他只要原样转发Cookie就可以达到目的了。考虑到减轻服务器性能方面，应当使用cookie而不是session。")]),v._v(" "),e("li",[v._v("注：\n"),e("ul",[e("li",[v._v("cookie默认是"),e("strong",[v._v("不能跨域访问的")]),v._v("，但对于主域相同子域不同的两个页面，document.domain设置为相同的父域名，即可实现不同子域名之间的跨域通信。")]),v._v(" "),e("li",[v._v("cookie的键/值对中的值不允许出现分号、逗号和空白符，因此在设置cookie前要用encodeURIComponent()编码，读取时再用decodeURIComponent()解码；")]),v._v(" "),e("li",[v._v("cookie默认的有效期是浏览器会话期间，作用域是整个浏览器而不仅仅局限于窗口或标签页；")])])])]),v._v(" "),e("h4",{attrs:{id:"cookie属性设置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cookie属性设置"}},[v._v("#")]),v._v(" Cookie属性设置")]),v._v(" "),e("p",[e("strong",[v._v("cookie选项包括")]),v._v("：expires、domain、path、secure、HttpOnly。在设置这些属性时，属性之间由一个分号和一个空格隔开：")]),v._v(" "),e("ul",[e("li",[v._v("expires：cookie失效日期。")]),v._v(" "),e("li",[v._v("domain、path：域名、路径，两者加起来就构成了 URL，domain和path一起来限制 cookie 能被哪些 URL 访问。")]),v._v(" "),e("li",[v._v("secure：用来设置cookie只在确保安全的请求中才会发送。当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie才能被发送至服务器。")]),v._v(" "),e("li",[v._v("HttpOnly：用来设置cookie是否能通过 js 去访问。默认情况下不带httpOnly选项，即可以访问。")]),v._v(" "),e("li",[v._v("SameSite：用来防止 CSRF 攻击和用户追踪。")])]),v._v(" "),e("p",[e("strong",[v._v("服务端设置 cookie")]),v._v("：")]),v._v(" "),e("ul",[e("li",[v._v("服务端都会返回response。header中有一项叫set-cookie，是服务端专门用来设置cookie的。")]),v._v(" "),e("li",[v._v("一个set-cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。")]),v._v(" "),e("li",[v._v("服务端可以设置cookie 的所有选项：expires、domain、path、secure、HttpOnly")])]),v._v(" "),e("p",[e("strong",[v._v("客户端设置 cookie")]),v._v("：")]),v._v(" "),e("ul",[e("li",[v._v('document.cookie="age=12; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=sankuai.com; path=/";')])]),v._v(" "),e("h3",{attrs:{id:"cookie-与-web-storage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cookie-与-web-storage"}},[v._v("#")]),v._v(" Cookie 与 Web Storage")]),v._v(" "),e("p",[v._v("H5的Web Storage提供了两个拥有一致API的对象：")]),v._v(" "),e("ul",[e("li",[v._v("window.localStorage：用来在本地存储永久数据的；")]),v._v(" "),e("li",[v._v("window.sessionStorage：用来存储会话数据的（也就是tab不关闭时的数据）；")]),v._v(" "),e("li",[v._v("这两个对象存储的都是 name/value 。而且与Cookie不同，Web存储的大小比Cookie的大多了（"),e("code",[v._v("最少5MB")]),v._v("），而且通过这个策略存储的数据是"),e("code",[v._v("永远不会传输至server")]),v._v("的。")]),v._v(" "),e("li",[v._v("纵使Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外Cookie不可以跨域调用。但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生。")]),v._v(" "),e("li",[v._v("除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像Cookie需要前端开发者自己封装setCookie，getCookie。")])]),v._v(" "),e("h2",{attrs:{id:"登录验证方案"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#登录验证方案"}},[v._v("#")]),v._v(" 登录验证方案")]),v._v(" "),e("h3",{attrs:{id:"基于cookie-session的身份验证"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基于cookie-session的身份验证"}},[v._v("#")]),v._v(" 基于cookie/session的身份验证")]),v._v(" "),e("p",[v._v("基于"),e("code",[v._v("cookie/session")]),v._v("的验证是"),e("code",[v._v("有状态的")]),v._v("，即 "),e("strong",[v._v("验证信息必须同时在客户端和服务端保存")]),v._v("。这个信息服务端一般在数据库中记录，而前端会保存在cookie中。")]),v._v(" "),e("p",[e("strong",[v._v("验证的一般流程如下：")])]),v._v(" "),e("ul",[e("li",[v._v("用户输入登陆凭据；")]),v._v(" "),e("li",[v._v("服务器验证凭据是否正确，并创建会话，然后把会话数据存储在数据库session中；")]),v._v(" "),e("li",[v._v("具有会话sessionId的cookie被放置在用户浏览器中；")]),v._v(" "),e("li",[v._v("在后续请求中，服务器会根据数据库验证sessionId，如果验证通过，则继续处理；")]),v._v(" "),e("li",[v._v("一旦用户登出，服务端和客户端同时销毁该会话。")])]),v._v(" "),e("h3",{attrs:{id:"基于token的身份验证"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基于token的身份验证"}},[v._v("#")]),v._v(" 基于token的身份验证")]),v._v(" "),e("p",[v._v("基于"),e("code",[v._v("token")]),v._v("的验证是"),e("code",[v._v("无状态的")]),v._v("。服务器不记录哪些用户已登陆或者已经发布了哪些JWT(JSON Web Tokens)。对服务器的每个请求都需要带上验证请求的token。该标记既可以加在header中，可以在POST请求的主体中发送，也可以作为查询参数发送。")]),v._v(" "),e("p",[e("strong",[v._v("验证流程如下：")])]),v._v(" "),e("ul",[e("li",[v._v("用户输入登陆凭据；")]),v._v(" "),e("li",[v._v("服务器验证凭据是否正确，然后返回一个经过签名的token；")]),v._v(" "),e("li",[v._v("客户端负责存储token，可以存在local storage，或者cookie中；")]),v._v(" "),e("li",[v._v("对服务器的请求带上这个token；")]),v._v(" "),e("li",[v._v("服务器对JWT进行解码，如果token有效，则处理该请求；")]),v._v(" "),e("li",[v._v("一旦用户登出，客户端销毁token。")])]),v._v(" "),e("h3",{attrs:{id:"token相对cookie的优势"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#token相对cookie的优势"}},[v._v("#")]),v._v(" token相对cookie的优势")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("无状态")]),v._v("：基于token的验证是无状态的，这也许是它相对cookie来说最大的优点。后端服务不需要记录token。每个令牌都是独立的，包括检查其有效性所需的所有数据，并通过声明传达用户信息。服务器唯一的工作就是在成功的登陆请求上签署token，并验证传入的token是否有效。")]),v._v(" "),e("li",[e("code",[v._v("防跨站请求伪造（CSRF）")]),v._v("：使用了token作为验证手段时，攻击者无法获取正确的token，所以可避免CSRF。")]),v._v(" "),e("li",[e("code",[v._v("性能")]),v._v("：一次网络往返时间（通过数据库查询session信息）总比做一次 HMAC-SHA256 计算的Token验证和解析要费时得多。")]),v._v(" "),e("li",[e("code",[v._v("多站点使用")]),v._v("：cookie绑定到单个域。而使用token就没有这样的问题。这对于需要向多个服务获取授权的单页面应用程序尤其有用。")]),v._v(" "),e("li",[e("code",[v._v("支持移动平台")]),v._v("：在移动平台上，cookie是不被支持的，而token可以同时支持浏览器，iOS和Android等移动平台。")])])])}),[],!1,null,null,null);_.default=i.exports}}]);