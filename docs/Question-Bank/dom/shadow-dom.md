# shadow Dom

- [使用 shadow DOM - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
- [神奇的 Shadow DOM - 凹凸实验室](https://jelly.jd.com/article/6006b1045b6c6a01506c87ac)
- [深入理解 Shadow DOM v1 - 思否翻译](https://segmentfault.com/a/1190000019115050)
- [Shadow DOM 201](https://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom-201/)
- [Chrome 63 将删除::shadow 和 /deep/](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing?hl=zh-cn)

## 什么是 Shadow DOM

Web components 的一个重要属性是**封装**——可以将标记结构、样式和行为隐藏起来，并`与页面上的其他代码相隔离`，保证不同的部分不会混在一起，可使代码更加干净、整洁。其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上。

封装是面向对象编程的基本特性，Shadow DOM 将此概念引入 HTML。DOM 的封装，可以类比到 js 中的封装，也是为了代码隔离互补影响，否则全局变量户会相互影响，出现命名冲突。而 HTML 中来自外部源的数据和小部件如果不能封装起来，就迫使开发人员使用特定的选择器和!important 规则来避免样式冲突。

Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

![shadow-dom](./images/shadow-dom.png)

Shadow DOM 特有的术语：

- `Shadow host（影子宿主）`：一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree：Shadow DOM 内部的 DOM 树。
- `Shadow boundary（影子边界）`：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
- `Shadow root（影子根）`： Shadow tree 的根节点。

### 创建 Shadow DOM

使用 createShadowRoot()来创建 Shadow DOM，并赋值给一个变量，然后添加元素给变量即可：

```js
// 影子宿主（shadow host）
var shadowHost = document.querySelector(".shadowhost");

// 创建影子根（shadow root）
var shadowRoot = shadowHost.createShadowRoot();

// 影子根作为影子树的第一个节点，其他的节点比如p节点都是它的子节点。
shadowRoot.innerHTML =
	'<p class="shadowroot_son">夏天夏天悄悄过去留下小秘密！</p>';
```

因为影子宿主和影子根之间存在影子边界（shadow boundary），**影子边界保证主 DOM 写的 CSS 选择器和 JavaScript 代码都不会影响到 Shadow DOM，当然也保护主文档不受 shadow DOM 样式的侵袭**。

所以添加在 host 元素的 css，无法在 shadow tree 中生效；同理，添加到 shadow DOM 的 CSS 对于 hosting 元素来说是本地的，不会影响 DOM 中的其他元素：

```html
<script>
	const elem = document.querySelector("#host");
	const shadowRoot = elem.attachShadow({ mode: "open" });
	shadowRoot.innerHTML = `
    <p>Shadow DOM</p>
    <style>p {color: red}</style>`;
</script>
```

还可以将样式规则放在外部样式表中：

```js
shadowRoot.innerHTML = `
  <p>Shadow DOM</p>
  <link rel="stylesheet" href="style.css">`;
```

### shadowRoot mode

当调用 Element.attachShadow()方法来附加 shadow root 时，必须通过传递一个对象作为参数来指定 shadow DOM 树的封装模式，否则将会抛出一个 TypeError。该对象必须具有 mode 属性，其值为 open 或 closed。

打开的 shadow root 允许你使用 host 元素的 shadowRoot 属性从 root 外部访问 shadow root 的元素；但是如果 mode 属性的值为“closed”，则尝试从 root 外部用 JavaScript 访问 shadow root 的元素时会抛出一个 TypeError。当 mode 设置为 closed 时，shadowRoot 属性返回 null。因为 null 值没有任何属性或方法，所以在它上面调用 querySelector()会导致 TypeError。浏览器通常用关闭的 shadow root 来使某些元素的实现内部不可访问，而且不可从 JavaScript 更改。

```html
<div id="host"></div>
<script>
	const elem = document.querySelector("#host");
	const shadowRoot = elem.attachShadow({ mode: "closed" });

	console.log(shadowRoot.mode); // => closed
</script>
```

### 只有一组有限的元素可以托管 shadow DOM

```
+----------------+----------------+----------------+
|    article     |      aside     |   blockquote   |
+----------------+----------------+----------------+
|     body       |       div      |     footer     |
+----------------+----------------+----------------+
|      h1        |       h2       |       h3       |
+----------------+----------------+----------------+
|      h4        |       h5       |       h6       |
+----------------+----------------+----------------+
|    header      |      main      |      nav       |
+----------------+----------------+----------------+
|      p         |     section    |      span      |
+----------------+----------------+----------------+
```

### 浏览器自动将 shadow DOM 附加到某些元素

Shadow DOM 已存在很长一段时间了，浏览器一直用它来隐藏元素的内部结构，比如 `input`， `textarea` 和 `video`。

当你在 HTML 中使用 video 元素时，浏览器会自动将 shadow DOM 附加到包含默认浏览器控件的元素。但 **DOM 中唯一可见的是 video 元素本身**。

以 video 标签为例。#shadow-root 寄生在 video 上，所以 video 此时称为影子宿主。

如果想要在开发者工具中看到 shadow root，需要在浏览器 chrome 中打开，然后**打开 Chrome 的开发者工具，点击右上角的“Settings”按钮，勾选“Show user agent shadow DOM”**。

### 关于样式控制

#### 1. ::shadow 与 /deep/ 实现阴影穿透

原则上来说，影子边界保证主 DOM 写的 CSS 选择器和 JavaScript 代码都不会影响到 Shadow DOM。 但你可能会想打破影子边界的所谓保证，主文档能够给 Shadow DOM 添加一些样式，这时可以使用`::shadow`。

`::shadow`选择器的一个缺陷是它**只能穿透一层影子边界**，如果你在一个影子树中嵌套了多个影子树，那么使用 `/deep/` 来穿透多层 。

```scss
.shadowhost::shadow h1 {
	padding: 20px;
	border: 1px solid #f00;
}
.shadowhost /deep/ h1 {
	padding: 20px;
	border: 1px solid #000;
}
```

**不过，这种方式已经逐渐被放弃使用了：**

- [Chrome 63 将删除::shadow 和 /deep/](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing?hl=zh-cn)

#### 2. 在 shadow root 中样式化 host 元素

通常，要设置 host 元素的样式，你需要将 CSS 添加到 light DOM，因为这是 host 元素所在的位置。但是如果你需要在 shadow DOM 中设置 host 元素的样式呢？

这就是 `host()伪类函数`的用武之地。这个选择器允许你从 shadow root 中的任何地方访问 shadow host。这是一个例子：

```html
<div id="host"></div>

<script>
	const elem = document.querySelector("#host");
	const shadowRoot = elem.attachShadow({ mode: "open" });

	shadowRoot.innerHTML = `
    <p>Shadow DOM</p>
    <style>
      :host {
        display: inline-block;
        border: solid 3px #ccc;
        padding: 0 15px;
      }
    </style>`;
</script>
```

在 shadow root 之外定义的样式规则比 :host 中定义的规则具有更高的特殊性，优先级更高。

还可以将选择器作为参数传递给:host()，这允许你仅在 host 与指定选择器匹配时才会定位 host。换句话说，它允许你定位同一 host 的不同状态：

```html
<style>
	:host(:focus) {
		/* style host only if it has received focus */
	}

	:host(.blue) {
		/* style host only if has a blue class */
	}

	:host([disabled]) {
		/* style host only if it's disabled */
	}
</style>
```

#### 3. 在 shadow root 中基于上下文控制 host 样式

要选择特定祖先内部的 shadow root host ，可以用:host-context()伪类函数

```scss
:host-context(.main) {
	font-weight: bold;
}
```

只有当它是.main 的后代时，此 CSS 代码才会选择 shadow host ：

```html
<body class="main">
	<div id="host"></div>
</body>
```

#### 4. shadow DOM 提供样式钩子（样式占位符）

shadow DOM 能够创建“样式占位符”并允许用户填充它们。这可以通过使用 [CSS 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来完成。

```html
<div id="host"></div>

<style>
	#host {
		--size: 20px;
	}
</style>

<script>
	const elem = document.querySelector("#host");
	const shadowRoot = elem.attachShadow({ mode: "open" });

	shadowRoot.innerHTML = `
    <p>Shadow DOM</p>
    <style>p {font-size: var(--size, 16px);}</style>`;
</script>
```

#### 5. 可继承的样式 会穿透 阴影边界

shadow DOM 允许你创建独立的 DOM 元素，而不会从外部看到选择器可见性，但这并不意味着继承的属性不会通过 shadow 边界。

某些属性（如 `color`，`background` 和 `font-family`）会传递 shadow 边界并应用于 shadow 树。因此，与 iframe 相比，shadow DOM 不是一个非常强大的障碍。

可以通过声明 `all: initial` 将可继承样式重置为其初始值。
