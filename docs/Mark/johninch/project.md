## 项目经验

### admin（vue项目技术点）

想一下，vue的高级特性，与我的项目生产经验结合的点








::: details
#### 命令式dialog

黄老师Vue课程中给出的弹窗组件使用方式，不是很方便，每个使用的地方需要引入该组件，需要注册，需要给组件加ref引用，需要调用事件来控制状态。

改成命令式组件的的实现方式，使其相对独立，且可以解决elementUI中弹窗中表单校验resetFields不能清空的问题。

命令式Vue组件实现原理：
使用`extend`将 组件对象 转为 组件构造函数，在`实例化`这个构造函数后，就会得到 $el属性，也就是组件的 真实Dom，这个时候我们就可以操作得到的真实的Dom去任意挂载，使用命令式也可以调用。


`extend`接受的是一个组件对象，执行extend时将继承基类构造器上的一些属性、原型方法、静态方法等，最后返回Sub这么一个构造好的子组件构造函数。拥有和vue基类一样的能力，**并在实例化时会执行继承来的_init方法完成子组件的初始化**。

`$mount`在得到初始化后的对象后，开始组件的挂载。首先将当前render函数转为VNode，然后将VNode转为真实Dom插入到页面完成渲染。再完成挂载之后，会在当前组件实例this下挂载$el属性，它就是完成挂载后对应的真实Dom，我们就需要使用这个属性。

```js
// dialog.vue

export default {
  data() {
    return {
      showFlag: false,
      title: "这是个弹窗",  // 可以使用props
      ConfirmBtnText: "确定",  // 为什么不用props接受参数
      cancelBtnText: "取消"  // 之后会明白
    };
  },
  methods: {
    show(cb) {  // 加入一个在执行Promise前的回调
      this.showFlag = true;
      typeof cb === "function" && cb.call(this, this);
      return new Promise((resolve, reject) => { // 返回Promise
        this.reject = reject;  // 给取消按钮使用
        this.resolve = resolve;  // 给确认按钮使用
      });
    },
    cancel() {
      this.reject("cancel");  // 抛个字符串
      this.hide();
    },
    confirm() {
      this.resolve("confirm");
      this.hide();
    },
    hide() {
      this.showFlag = false;
      document.body.removeChild(this.$el);  // 结束移除Dom
      this.$destroy();  // 执行组件销毁
    }
  }
};
```
```js
// confirm/index.js

import Vue from 'vue';
import Dialog from './dialog';  // 引入组件

let instance;
const dialogCtor = Vue.extend(Dialog);  // 创建构造函数

function initInstance() { // 执行方法后完成挂载
  instance = new dialogCtor();  // 实例化
  document.body.appendChild(instance.$mount().$el);
  // 实例化后手动挂载，得到$el真实Dom，将其添加到body最后
}

function Dialog(options) { // 导出一个方法，接受配置参数
  if (!instance) {
    initInstance(); // 挂载
  }
  Object.assign(instance, options);
  // 实例化后instance就是一个对象了，所以data内的数据会
  // 挂载到this下，传入一个对象与之合并
  
  return instance.show(vm => {  // 显示弹窗
    instance = null;  // 将实例对象清空
  })
}

export default Dialog
```

```js
// main.js
import Dialog from './base/dialog/index';

Vue.prototype.$Dialog = Dialog;

// 试试这样调用吧~
this.$Dialog({
  title: 'vue大法好!'
}).then(confirm => {
  console.log(confirm)  
}).catch(cancel => {
  console.log(cancel)
})
```

- [](https://juejin.im/post/5d8249636fb9a06afe12cd67#heading-5)

#### api切换配置优化

1. 最开始是通过建立不同的环境变量文件：（dev.env.js、test.env.js、prod.env.js）都设置各自的 NODE_ENV，BASE_API 变量，在webpack中，new webpack.DefinePlugin({'process.env': require('../config/test.env')})，再npm run test之后，就有了环境变量process.env.BASE_API；在axios封装时，直接取const baseURL = process.env.BASE_API。
    - 缺点很明显，每次要改环境都需要重新build项目，也就是说，是在webpack打包时就取到值，在本地联调时需要切换环境，只能改本地dev的BASE_API并重新build
    - 另外，由于部署测试服务时，如果有多个test环境，就只能配置多个环境变量文件；或者还采取过hack的方式，在gitlab-ci.yml文件配置中，写shell script命令
        ```
        <!-- https://blog.csdn.net/zds78/article/details/84070622 -->
        sed是一个管道命令，主要以行为单位进行处理，可以将数据行进行替换、删除、新增、选取等特定工作。
        符号 `` 括起来的grep命令，表示将grep命令的的结果作为操作文件
        -i，直接修改读取的文件内容
        sed -i "s/esop-api-test\.tigerfintech\.com/esop-api-dev\.tigerfintech\.com/g" `grep esop-api-test.tigerfintech.com -rl distStg/`
        ```
2. 之后，不使用DefinePlugin这种注入环境变量的方式，而是使用在gitlab-ci.yml文件的shell script命令中配置全局变量，比如 REACT_APP_TEST=test3 npm run build:dev；并在封装axios时，动态通过环境变量process.env.REACT_APP_TEST 去匹配得到 baseURL，从而连不同的数据库
    - 这样的优点是，不需要搞那么多变量文件，使webpack配置文件更简洁
    - 并且因为axios封装时动态获取了baseUrl，所以在本地联调时，切换所连库不需要重新build
3. 还有一个痛点没有解决：即后端同学希望能够将最新的前端代码连接到自己本机数据库，更方便的做回测（postman效率太低了）
    - 最开始想到的最笨的方法就是让后端同学也有权限能拉取前端的代码，并在本地跑起来
    - 但是借用之前的思路，是否可以动态切换api地址，比如本机地址，这样后端同学就能使用比如测试环境前端代码，通过某种方式将代码的api请求地址改变为本机地址，然后就可以自己回测后端逻辑了。
    - 具体实现（HostSwitch组件）：
        - 增加 axios.interceptors.request.use(proxyInterceptor) 请求拦截，将config替换成切换后的baseUrl地址
        - 在 HostSwitch 组件中就render，挂载到body下的div上
        - 直接 将 HostSwitch 引入到项目入口文件中即可使用
    - 需注意在BOS2中的使用：
        - 因为BOS2作为金融业务运营平台，有多个业务线共同使用，我们ESOP只占其中一个模块，因此，需要避免影响到其他业务线使用。
        - 如果直接在我们ESOP的业务入口引入 HostSwitch 组件，那么其他业务线的人访问系统时，无论进不进我们ESOP的模块，HostSwitch组件都会执行render挂载，里面的请求拦截会把全部的请求都拦截并替换成我们ESOP的BASE_API地址，这样其他业务就不能使用了。。
        - 因此，需要采用高阶组件 withHostSwitch(creatModule)，在里面添加 HostSwitch 的渲染挂载，这样当退出ESOP模块时，HostSwitch会随着整个ESOP模块的卸载而卸载，拦截器也执行eject。。。这样，HostSwitch只会在访问ESOP业务模块时运行，不会影响其他。

#### 自定义指令 v-loadmore 实现分部分获取数据
- 自定义指令，通过dom元素判断select和autocomplete组件options下拉是否到底，从而触发获取更多数据的动作
- 在比如select组件中，维护选项列表 suggestions
```js
Vue.directive('loadmore', {
  bind(el, binding, vnode, oldVnode) {
      targetWrap.addEventListener('scroll', function(e) {
          // 如果元素滚动到底, 下面等式返回true, 没有则返回false:
          // ele.scrollHeight - ele.scrollTop === ele.clientHeight;
          // 如果为真，则触发执行指令绑定的函数

          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight

          CONDITION && binding.value()
      }
  }
}
```

#### elementUI v-infinite-scroll 无限滚动
- 默认无限滚动指令会去找当前所在标签，如果当前标签是可以滚动的，则可轻易实现无线滚动
```js
<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>
```

- 但是，给el-table添加无限滚动标签时，需要给el-table下添加一个标签并通过slot="append"插入列表内容，注意，如果直接插入如下标签并v-infinite-scroll="load"时，整个html body都是滚动的。。。
```js
<el-table
  max-height="100"
  :data="tableData"
  style="width: 100%">
  <el-table-column
    prop="date"
    label="日期"
    width="180">
  </el-table-column>
  <span
    slot="append"
    v-infinite-scroll="load">
  </span>
</el-table>
```

- 通过查看v-infinite-scroll的elementUI源码，发现：
	- v-infinite-scroll有一个寻找 scrollContainer （可滚动容器）的过程（getScrollContainer函数），如果当前元素可滚动（isScroll函数），则取当前元素，否则一直向上找直到最顶端。 上面的现象就是没找到table列表的可滚动wrapper，而找到了外部的body
	- 因此，需要控制插入的span标签的插入时机，需要在列表有内容撑开后，再插入标签。
	- 即通过v-if判断，在获取到数据后，并在nextTick中拿到更新的dom时，再使span标签显示、插入到table下，此时span标签中的无限滚动指令就能拿到最近的可滚动列表wrapper了。


- 注意，v-infinite-scroll会加载渲染所有的item，对于复杂的列表会造成页面卡顿
  - 使用虚拟列表，虚拟滚动
  - `vue-virtual-listview`
    - 只对可见区域进行渲染，对非可见区域中的数据，部分渲染（buffer缓冲区渲染）
      - 对于item项高度不定，以预估高度先行渲染，然后获取item真实高度，使用钩子函数updated 缓存，之后的渲染通过数组索引从缓存中取。
        - 监听scroll事件的方式来触发可视区域中数据的更新
        - 定义组件属性bufferScale,用于接收缓冲区数据与可视区数据的比例
        - 可视区域上方：above
        - 可视区域：screen
        - 可视区域下方：below


#### 权限系统

- meta.permission 控制路由的权限
- permitterMixin methods permitter 控制页面内细粒度的权限


#### eslint+husky+prettier+lint-staged
- 通过 husky(哈士奇) 注册在 git hook 中的 commit-msg钩子函数，执行commitlint，强制校验代码提交时的commit msg；
- 通过 husky(哈士奇) 注册在 git hook 中的 pre-commit钩子函数被调用，执行lint-staged；
	- lint-staged（顾名思义是只对暂存区文件执行lint）取得所有被提交的文件依次执行写好的任务（ESLint 和 Prettier）：
		- 执行prettier脚本，这是对代码进行格式化的
		- 执行eslint --fix操作，进行扫描，若发现工具可修复的问题进行fix；
		- 上述两项任务完成后对代码重新add

- 本方案中：借用了两个插件来**集成eslint与prettier**：`eslint-config-prettier` 这个是关闭eslint冲突的规则，`eslint-plugin-prettier`是在eslint运行时同步执行prettier

#### 多语言实现 vue-i18n + i18next-scanner
两个方案特点：
- 可无刷新翻译（依赖vue响应式数据的能力）。
- 使用i18next-scanner跑脚本来自动提取文案，形成一对一的键值对json语言包，方便维护。

不在渲染函数中的文案为啥会无刷新切换：
- 一些js文件中在字面量中只用_scan扫描，将字面量对象引入组件后，再使用__执行翻译过程
- 或者，对于这些js文件中的字面量文案，就可以直接调用__执行翻译过程，并将字面量对象写成函数返回的形式，引入到组件中后放到computed中访问

#### admin的webpack配置

- `module` 在开发中的所有的资源(.js、.css、.png)都是module，是webpack打包前的概念。
- `chunk` 是webpack在进行模块的依赖分析的时候，代码分割出来的代码块。一个 chunk 可能包含若干 module。
- `bundle` 最终输出到用户端的chunk，被称之为bundle；一般一个chunk对应一个bundle，只有在配置了sourcemap时，才会出现一个chunk对应多个bundle的情况。

- 打包后 js 文件的加载顺序是先 manifest.js，再vendor.js，之后才是 app.js

打包出的文件具体原理：
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


- [webpack是如何实现动态导入的](https://juejin.im/post/5d26e7d1518825290726f67a)
- [](https://juejin.im/post/5a23b130f265da432003101a)
- [](https://juejin.im/post/5ad8c96ff265da0ba062b190)


:::






### staff、mobile、portal（react相关项目技术点）

::: details
react项目都是基于组件的一些二次封装，好像也没什么可以讲的技术点

#### PdfPrinter


#### tiger-new相比于官网脚手架cra

- 提供了一系列自己封装的工具组件、方法、变量等
- 集成了react-formutil的表单管理库
	- 提供了全局表单状态同步，心智负担小
	- 支持数据双向同步（model<->view），类似于vue的双向绑定实现
- webapck方面增加了npm run cdn的脚步，通过rsync第三方库（一个远程数据同步工具），将本地打包后的资源（除了index.html）外都上传到cdn平台
	- 会在根项目下维护一个static.config.json文件，记录了打包后的文件列表清单，每次上传会将本次打包后的文件列表与保存的清单比较，跳过未改变的包
- 提供了utils/i18n模块
	- 通过`require('i18next-scanner').Parser`来实现对语言包的自动扫描提取，语言包的形式是一对一的键值对json对象（即不存在嵌套多层对象）
	- 提供全局翻译函数，每次切换语言后需要刷新页面，重新加载对应语言包
- SSR：tiger-new默认的SSR功能仅提供了对相关入口文件的构建编译支持，并不包含更进一步的路由、异步数据处理等逻辑。比如esop-portal就没有进一步的异步数据处理等。。。
	- `路由同构`方案：
		- 提取到 store/routes中统一维护一套路由表，使用官方的react-config-router来实现嵌套路由匹配
	- `数据预取同构`方案：
		- 数据获取的方法放在高阶组件withSSR中，给路由页面组件绑定，组件内部获取的数据应该尽量都从props中获取。。也可以给类或函数添加静态方法，这样双端都能调用
	- `渲染同构`方案：
		- 数据注水（将ssr端得到的数据挂载到html中，即使得csr端可以拿到）
		- 数据脱水（在csr端通过高阶组件或context传入初始数据）
	- 没有实现异步组件的SSR场景
	- 通过react-helmet生成动态的TDK

:::
