(window.webpackJsonp=window.webpackJsonp||[]).push([[251],{814:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"从多线程到-event-loop-全面梳理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从多线程到-event-loop-全面梳理"}},[t._v("#")]),t._v(" 从多线程到 Event Loop 全面梳理")]),t._v(" "),a("h2",{attrs:{id:"浏览器内核-渲染进程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器内核-渲染进程"}},[t._v("#")]),t._v(" 浏览器内核（渲染进程）")]),t._v(" "),a("p",[t._v("渲染进程包含以下线程：")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("GUI 渲染线程")])]),t._v(" "),a("ul",[a("li",[t._v("负责渲染页面，布局和绘制;")]),t._v(" "),a("li",[t._v("页面需要重绘和回流时，该线程就会执行;")]),t._v(" "),a("li",[t._v("与 js 引擎线程互斥，防止渲染结果不可预期;")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("JS 引擎线程")])]),t._v(" "),a("ul",[a("li",[t._v("负责处理解析和执行 javascript 脚本程序")]),t._v(" "),a("li",[t._v("只有一个 JS 引擎线程（单线程）")]),t._v(" "),a("li",[t._v("与 GUI 渲染线程互斥，防止渲染结果不可预期")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("事件触发线程")])]),t._v(" "),a("ul",[a("li",[t._v("用来控制事件循环（鼠标点击、setTimeout、ajax 等）")]),t._v(" "),a("li",[t._v("当事件满足触发条件时，将事件放入到 JS 引擎所在的执行队列中")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("定时触发器线程")])]),t._v(" "),a("ul",[a("li",[t._v("setInterval 与 setTimeout 所在的线程")]),t._v(" "),a("li",[t._v("定时任务并不是由 JS 引擎计时的，是由定时触发线程来计时的")]),t._v(" "),a("li",[t._v("计时完毕后，通知事件触发线程")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("异步 http 请求线程")])]),t._v(" "),a("ul",[a("li",[t._v("浏览器有一个单独的线程用于处理 AJAX 请求")]),t._v(" "),a("li",[t._v("当请求完成时，若有回调函数，通知事件触发线程")])])])]),t._v(" "),a("h2",{attrs:{id:"从-event-loop-看-js-的运行机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从-event-loop-看-js-的运行机制"}},[t._v("#")]),t._v(" 从 Event Loop 看 JS 的运行机制")]),t._v(" "),a("ul",[a("li",[t._v("JS 分为同步任务和异步任务")]),t._v(" "),a("li",[t._v("同步任务都在 JS 引擎线程上执行，形成一个执行栈")]),t._v(" "),a("li",[t._v("事件触发线程管理一个任务队列，异步任务触发条件达成，将回调事件放到任务队列中")]),t._v(" "),a("li",[t._v("执行栈中所有同步任务执行完毕，此时 JS 引擎线程空闲，系统会读取任务队列，将可运行的异步任务回调事件添加到执行栈中，开始执行")])]),t._v(" "),a("h2",{attrs:{id:"宏任务、微任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宏任务、微任务"}},[t._v("#")]),t._v(" 宏任务、微任务")]),t._v(" "),a("h4",{attrs:{id:"什么是宏任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是宏任务"}},[t._v("#")]),t._v(" 什么是宏任务")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("我们可以将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。")])]),t._v(" "),a("li",[a("p",[t._v("主代码块，setTimeout，setInterval 等，都属于宏任务。")])]),t._v(" "),a("li",[a("p",[t._v("举个例子")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:black"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:red"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:blue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:grey"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/8/20/16caca3e44d7d357?imageslim",alt:""}}),t._v("\n页面背景会在瞬间变成灰色，以上代码属于同一次宏任务，所以全部执行完才触发页面渲染，渲染时 GUI 线程会将所有 UI 改动优化合并，所以视觉效果上，只会看到页面变成灰色。")]),t._v(" "),a("ul",[a("li",[t._v("第二个例子")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:blue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tdocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:black"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/8/20/16caca3ed44e6b16?imageslim",alt:""}})]),t._v(" "),a("ul",[a("li",[t._v("页面先显示成蓝色背景，然后瞬间变成了黑色背景，这是因为以上代码属于两次"),a("strong",[t._v("宏任务")]),t._v("；")]),t._v(" "),a("li",[t._v("第一次宏任务执行的代码是将背景变成蓝色，然后触发渲染，将页面变成蓝色；")]),t._v(" "),a("li",[t._v("再触发第二次宏任务将背景变成黑色。")])]),t._v(" "),a("h4",{attrs:{id:"什么是微任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是微任务"}},[t._v("#")]),t._v(" 什么是微任务")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("微任务可以理解成在当前宏任务执行后立即执行的任务。")])]),t._v(" "),a("li",[a("p",[t._v("当宏任务执行完，会在渲染前，将执行期间所产生的所有微任务都执行完。")])]),t._v(" "),a("li",[a("p",[t._v("Promise，process.nextTick 等，属于微任务。")])]),t._v(" "),a("li",[a("p",[t._v("第一个例子")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:blue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nPromise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tdocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"background:black"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/8/20/16cad85d2378ccb5?imageslim",alt:""}}),t._v("\n页面的背景色直接变成黑色，没有经过蓝色的阶段，是因为，我们在宏任务中将背景设置为蓝色，但在进行渲染前执行了微任务， 在微任务中将背景变成了黑色，然后才执行的渲染")]),t._v(" "),a("ul",[a("li",[t._v("第二个例子")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tPromise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// print : 1 3 2")]),t._v("\n")])])]),a("ul",[a("li",[t._v("上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有"),a("strong",[t._v("两个宏任务")]),t._v("，")]),t._v(" "),a("li",[t._v("其中第一个宏任务执行中，输出 1 ，并且创建了微任务队列，")]),t._v(" "),a("li",[t._v("所以在下一个宏任务队列执行前，先执行微任务，在微任务执行中，输出 3 ，")]),t._v(" "),a("li",[t._v("微任务执行后，执行下一次宏任务，执行中输出 2")])]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ul",[a("li",[t._v("执行一个宏任务（栈中没有就从事件队列中获取）")]),t._v(" "),a("li",[t._v("执行过程中如果遇到微任务，就将它添加到微任务的任务队列中")]),t._v(" "),a("li",[t._v("宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）")]),t._v(" "),a("li",[t._v("当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染")]),t._v(" "),a("li",[t._v("渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）")])]),t._v(" "),a("p",[t._v("参考链接："),a("a",{attrs:{href:"https://juejin.im/post/5d5b4c2df265da03dd3d73e5#heading-11",target:"_blank",rel:"noopener noreferrer"}},[t._v("从多线程到 Event Loop 全面梳理"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);