# JSBridge原理

## 什么是JSBridge

Hybird APP基本90%以上都是H5。由于H5页面是内嵌到原生应用的WebView中的，手机浏览器Javascript引擎是在一个沙箱环境中运行，因此JavaScript的权限受到严格限制。如果JavaScript要用到这些受限的能力时，就需要委托原生去实现，原生完成后，再将结果通知JavaScript。这就需要一个通信的桥梁，JSBridge。

JSBridge是一种**H5页面与Native之间「异步双向」的通信方式**。任何一个移动操作系统中都包含可运行 JavaScript 的容器，即一个单独的 JS Context 中（例如，*WebView 的 Webkit 引擎*、*JSCore*）。

## 动态化技术

目前动态化的技术主要有四种：

- 热补丁
- 混合开发框架（RN、Weex等）
- 纯粹的Web APP
- 原生加H5的Hybrid（需要经常更新的部分用H5实现）。

其中热补丁技术主要用于修复一些线上bug，不用于主流开发。剩余的三种方案，都是通过Javascript 和原生配合实现的，而它们都用到了 JsBridge。

## JSBridge原理

JSBridge 要实现的主要逻辑是两点（可以把这个流程类比成 JSONP 的流程）：

- **1. 通信调用（Native 与 JS 通信）**
- **2. 句柄解析调用**

以 Hybrid 方案为例：

### 一、JavaScript 调用 Native

主要有两种方式：`注入 API`**（推荐）** 和 `拦截 URL SCHEME`

#### 1、`注入 API`

`注入 API`：使用 Native的API（暂且称它为defineFunc函数），通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
```js
// define 翻译过来大概就是下面的这个意思
function defineFunc (funcName, func) {
    const window = webView.window ... // 通过一些Native的API拿到WebView的window
    window[funcName] = func // 这里的func 是Native的func，执行的是纯Native的代码
}

// Native
defineFunc('callSomeNativeFunction', () => {
    // 这些是由Native的代码翻译成javascript的伪代码
    const file = io.readFile('/path/to/file')
    ...
    // 做一些H5做不到的事情
    file.write('/path/to/file', 'content')
    ...
})
```

#### 2、`拦截 URL SCHEME`
`拦截 URL SCHEME`：Web 端通过某种方式（例如 `iframe.src`）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

::: tip 解释一下 URL SCHEME
**URL SCHEME**是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: qunarhy://hy/url?url=ymfe.tech，protocol 是 qunarhy，host 则是 hy。
:::

这种方式在实践中存在两个缺陷：
- 使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
- 创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长。

而之所以以前很多方案采用这种「`拦截 URL SCHEME`」的方式，是因为它支持iOS6。。但如今不推荐再为了市场占比很小的iOS6而是用这种不优雅的方式了。

- 其实可以想到三种发请求的方式：
    - 使用带有src属性标签发送请求，如iframe...
    - 使用location.href发送请求
    - 使用Ajax的方式来发送请求
- 【注1】：有些方案为了规避 url 长度隐患的缺陷，在 iOS 上采用了使用 Ajax 发送同域请求的方式，并将参数放到 head 或 body 里。这样，虽然规避了 url 长度的隐患，但是 WKWebView 并不支持这样的方式。
- 【注2】：为什么选择 iframe.src 不选择 locaiton.href ？因为如果通过 location.href 连续调用 Native，很容易丢失一些调用。


### 二、Native 调用 JavaScript

Native 调用 JavaScript，其实就是`执行拼接 JavaScript 字符串`，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法`必须在全局的 window 上`。


## 代码实现（注入 API + 执行拼接 JavaScript 字符串）

### JavaScript端 JSBridge 的实现
```js
// 只是一个示例，主要用于剖析 JSBridge 的原理和流程，里面存在诸多省略和不完善的代码逻辑
(function () {
    var id = 0,
        callbacks = {},
        registerFuncs = {};

    window.JSBridge = {
        // 调用 Native
        invoke: function(bridgeName, callback, data) {
            // 判断环境，获取不同的 nativeBridge
            var thisId = id ++; // 获取唯一 id
            callbacks[thisId] = callback; // 存储 Callback
            nativeBridge.postMessage({
                bridgeName: bridgeName,
                data: data || {},
                callbackId: thisId // 传到 Native 端
            });
        },
        receiveMessage: function(msg) {
            var bridgeName = msg.bridgeName,
                data = msg.data || {},
                callbackId = msg.callbackId, // Native 将 callbackId 原封不动传回
                responstId = msg.responstId;
            // 具体逻辑
            // bridgeName 和 callbackId 不会同时存在
            if (callbackId) {
                if (callbacks[callbackId]) { // 找到相应句柄
                    callbacks[callbackId](msg.data); // 执行调用
                }
            } elseif (bridgeName) {
                if (registerFuncs[bridgeName]) { // 通过 bridgeName 找到句柄
                    var ret = {},
                        flag = false;
                    registerFuncs[bridgeName].forEach(function(callback) => {
                        callback(data, function(r) {
                            flag = true;
                            ret = Object.assign(ret, r);
                        });
                    });
                    if (flag) {
                        nativeBridge.postMessage({ // 回调 Native
                            responstId: responstId,
                            ret: ret
                        });
                    }
                }
            }
        },
        register: function(bridgeName, callback) {
            if (!registerFuncs[bridgeName])  {
                registerFuncs[bridgeName] = [];
            }
            registerFuncs[bridgeName].push(callback); // 存储回调
        }
    };
})();
```

### Native端 JSBridge 的实现

Native 端配合实现 JSBridge：
- **JavaScript 调用 Native 逻辑**

主要的代码逻辑是：接收到 JavaScript 消息 => 解析参数，拿到 bridgeName、data 和 callbackId => 根据 bridgeName 找到功能方法，以 data 为参数执行 => 执行返回值和 callbackId 一起回传前端。 Native 调用 JavaScript 也同样简单，直接自动生成一个唯一的 ResponseId，并存储句柄，然后和 data 一起发送给前端即可。

- **Native 调用 JavaScript**

直接自动生成一个唯一的 ResponseId，并存储句柄，然后和 data 一起发送给前端即可。


## JSBridge 如何引用

对于 JSBridge 的引用，常用有两种方式，各有利弊：

- **由 Native 端进行注入**，注入方式和 Native 调用 JavaScript 类似，直接执行桥的全部代码。
    - 它的优点在于：桥的版本很容易与 Native 保持一致，Native 端不用对不同版本的 JSBridge 进行兼容；
    - 它的缺点是：注入时机不确定，需要实现注入失败后重试的机制，保证注入的成功率，同时 JavaScript 端在调用接口时，需要优先判断 JSBridge 是否已经注入成功。

- **由 JavaScript 端引用**，直接与 JavaScript 一起执行。这与由 Native 端注入正好相反：
    - 它的优点在于：JavaScript 端可以确定 JSBridge 的存在，直接调用即可；
    - 缺点是：如果桥的实现方式有更改，JSBridge 需要兼容多版本的 Native Bridge 或者 Native Bridge 兼容多版本的 JSBridge。


## 参考链接

- [JSBridge的原理](https://juejin.im/post/5abca877f265da238155b6bc)
- [【前端基础】Web与Native交互之The JSBridge FAQ](https://juejin.im/post/5d425a16f265da03f564c1c3)
