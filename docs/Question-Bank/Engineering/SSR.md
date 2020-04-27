# SSR 服务端渲染和同构原理

## 为什么要服务端渲染（SSR）

- **首屏等待**：在 SPA 模式下，所有的数据请求和 Dom 渲染都在浏览器端完成，所以当我们第一次访问页面的时候很可能会存在“白屏”等待，而服务端渲染所有数据请求和 html内容已在服务端处理完成，浏览器收到的是完整的 html 内容，可以更快的看到渲染内容，在服务端完成数据请求肯定是要比在浏览器端效率要高的多。
- **更好支持SEO**：有些网站的流量来源主要还是靠搜索引擎，所以网站的 SEO 还是很重要的，而 SPA 模式对搜索引擎不够友好，要想彻底解决这个问题只能采用服务端直出。改变不了别人（搜索yinqing），只能改变自己。

## 传统SSR

`传统的SSR服务端渲染`，是指**服务端直接吐出具有数据的HTML页面，而不是在客户端拼接的HTML**。单纯实现SSR是很传统的技术，很简单，不分语言，随便用 php 、jsp、asp、node 等都可以实现。

而现今流行的SPA单页应用，则是`CSR客户端渲染`，指的是在客户端通过Ajax请求来拼装数据，所有页面都是在客户端拼接好的。

如果只实现 SSR 其实没意义，技术上没有任何发展和进步，否则 SPA 技术就不会出现。

## 前端同构应用（SSR + SPA）

**最好的方案是**：`SSR + SPA 的前端同构应用`。第一次访问页面是服务端渲染，基于第一次访问，后续的交互就是 SPA 的效果和体验，还不影响SEO。简单说就是一个前端项目里的组件，部分服务端渲染后输出，部分由客户端异步渲染，既保障网页渲染速度，也有利于搜索引擎 SEO。

**「同构」**的意思是：服务端和前端使用同一套渲染层代码，在服务端执行虚拟DOM(一般用Node.js)，此时服务端使用和前端相同的虚拟DOM的原理来拼接HTML模板。

得益于 Node.js 既是后端又是用JS来写，使得使用一套代码就能在服务端和客户端都执行渲染，最大限度的重用代码（同构），减少开发维护成本。当前的前端同构应用，需要采用 react 或者 vue 等前端框架，与 node SSR 结合来实现。


## 同构应用需要解决的3个问题

所谓`「同构」`就是**采用一套代码，构建双端（server 和 client）逻辑，最大限度的重用代码，不用维护两套代码**。

### `路由同构`：双端路由如何维护？

原理是将**路由配置抽取出来**，方便在服务端以及客户端共用（建议将路由配置统一放置到stores/routes）。node server 通过req url path 进行组件的查找，得到需要渲染的组件。路由匹配可以使用
React官方维护的`react-router-config`库，实现嵌套路由的查找。


### `数据预取同构`：获取数据的方法和逻辑写在哪里？

`数据预取同构`，解决双端如何使用同一套数据请求方法来进行数据请求。在查找到要渲染的组件后，需要预先得到此组件所需要的数据，然后将数据传递给组件后，再进行组件的渲染。

#### 可选的方案有
- 使用高阶组件给路由页面组件绑定数据获取方法（比如`withSSR(WrappedCompoennt, getInitialProps)`）。因此，我们的页面组件应该尽可能依赖于从其props中获取相关页面所需数据，减少其内部自身的数据获取逻辑。
- 可以通过给组件定义静态（static）方法来处理，在 server 端和组件内都也可以直接通过组件（function）来进行访问（比如`Index.getInitialProps`）。
- 再或者在声明路由的时候把数据请求方法关联到路由中（比如定一个 `getInitialProps` 方法，然后在查找到路由后就可以判断`route`上是否存在`getInitialProps`这个方法）。

### `渲染同构`：如何复用 服务端html？

假设上述两个问题解决了，整个服务可以跑起来（路由能够正确匹配，数据预取正常，服务端可以直出组件的 html ，浏览器加载 js 代码正常，查看网页源代码能看到 html 内容）。但是依然有这样的问题未解决：**当浏览器端的 js 执行完成后，发现数据重新请求了，组件的重新渲染导致页面看上去有些闪烁。**

- 这是因为在浏览器端，`双端节点对比失败，导致组件重新渲染`，也就是只有当服务端和浏览器端渲染的组件具有相同的props 和 DOM 结构的时候，组件才能只渲染一次。
- 虽然我们实现了双端的数据预取同构，但是数据也仅仅是服务端有，浏览器端是没有这个数据，当客户端进行首次组件渲染的时候没有初始化的数据，渲染出的节点肯定和服务端直出的节点不同，导致组件重新渲染。

#### 解决方式
`渲染同构`方案：
1. 数据注水：**在服务端将预取的数据注入到浏览器，使浏览器端可以访问到。**
2. 数据脱水：**客户端进行渲染前，需要先将数据传入对应的组件，保证props的一致性。**
    - 实现方式1：通过`高阶组件`，添加预取的数据。
    - 实现方式2：通过 `context` 传递，只需要在入口处传入。
    - 实现方式3：直接`挂在html`中。

## 其他要注意的问题

解决了上面3个问题后，可以说「同构」应用的基本实现原理就清楚了，但还有一些问题需要解决。

### 入口文件配置

``` {8,10,13}
  ├── app
  │   ├── components
  │   ├── hooks
  │   ├── modules
  │   ├── types
  │   ├── utils
  │   ├── index.tsx
+ │   ├── index.node.tsx
  │   ├── about.tsx
+ │   └── about.node.tsx
  ├── public
  │   ├── index.html
+ │   ├── index.node.html
  │   └── service-worker.js
```

#### SSR入口文件
如果不考虑异步路由提取，基本的 `index.node.tsx` 里的内容大致如下：
```js
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import fs from 'fs';

const renderer = async (templateFile, request, response) => {
    // templateFile 模板文件路径，读取模板文件内容
    const template = fs.readFileSync(templateFile, 'utf8');
    // 获取react组件的渲染字符串
    const body = renderToString(<App />);
    // 替换模板中占位注释字符，完成渲染初始化
    const html = template.replace('<!-- root -->', body);

    response.send(html);
};

// 请注意这里需要导出renderer方法
export default renderer;
```
React通过`renderToString(<App />)`方法将应用代码转换成字符串，再替换到页面中占位符的位置。

#### CSR入口文件
```js
// app/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'stores/routes';

/**
 * CSR端也需要使用 react-router-config 的 renderRoutes 方法渲染路由
 */
ReactDOM[__SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
        <div className="app">{renderRoutes(routes)}</div>
    </BrowserRouter>,
    document.getElementById('wrap')
);
```
初次渲染可以调用两种方法：ReactDOM.render和`ReactDOM.hydrate`，需要通过环境变量判断使用对应的方法渲染。

`ReactDOM.hydrate`会去**复用原本已经存在的 DOM 节点，尝试在已有标记上绑定事件监听器**。减少了重新生成节点以及删除原本 DOM 节点的开销，来加速初次渲染的功能。


### node端没有window和webstorage

因此需要通过三目运算符来判断环境变量，使用`typeof window === 'undefined' ? global : window`来对应处理。

对于需要保存的变量，只能存储到cookie中，或者直接将页面的初始数据通过全局变量`__DATA__`渲染到页面上，让 CSR 端的组件读取，以实现同构渲染：
```js
let html = template
        .replace('%ROOT%', body)
        .replace('%DATA%', `var __DATA__=${initialProps ? JSON.stringify(initialProps) : 'null'}`);
```


### css过滤

在**服务端css文件是无法执行的**，因为本来就不需要渲染 css，所以可以在编译的时候通过babel将css代码过滤掉。


### 动态路由SSR

SPA模式下大部分都会实现组件分包和按需加载，防止所有代码打包在一个文件过大影响页面的加载和渲染，影响用户体验。

但**SSR是不支持异步组件的**。因为在做路由同构的时候，双端使用的是同一个 route配置文件routes-config.js，如果改成按需加载的异步组件，在路由查找后得到的组件就是改变后的异步组件，根本无法转换出组件内容。

具体分析一下流程：
1. 首先服务端直出了 html 内容；
2. 而此时浏览器端js执行完后需要做按需加载，在按需加载前的组件默认的内容就是`<span>正在加载......</span>`这个缺省内容；
3. 这个缺省内容和服务端直出的 html 内容完全不同，所以双端对比失败，页面会渲染成`<span>正在加载......</span>`；
4. 然后按需加载完成后组件再次渲染，此时渲染的就是真正的组件了。

### SEO支持（路由页动态生成TDK）

页面的 SEO 效果取决于
- 页面的主体内容
- 页面的 TDK（标题 title,描述 description,关键词 keywords）以及关键词的分布和密度
实现了SSR之后页面的主体内容有了，还需要**动态设置页面的TDK让每个页面（路由）的都拥有与自己相匹配的内容摘要**。

这里建议采用[react-helmet](https://github.com/nfl/react-helmet)库来实现。

### 结合状态管理的SSR实现

直接将使用 context 传递数据改成按 store 传递，参考代码：
```js
function renderUI(initialData) {
   ReactDOM.hydrate(
       <BrowserRouter>
            <Provider store={initialData}>
                <Routes />
            </Provider>
        </BrowserRouter>,
        document.getElementById('rootEle'), (e) => {
   });
}
```

## 参考链接

- [一文吃透 React SSR 服务端渲染和同构原理](https://segmentfault.com/a/1190000020417285)
- [tiger-new#ssr](https://github.com/qiqiboy/tiger-new#ssr)
- [React 中同构（SSR）原理脉络梳理](https://segmentfault.com/a/1190000016722457)
- [官网hydrate()](https://zh-hans.reactjs.org/docs/react-dom.html#hydrate)
- [hydrate](https://react.jokcy.me/book/features/hydrate.html)




