# 吸顶效果 ceiling

## 参考文章写在最前

[【前端词典】5 种滚动吸顶实现方式的比较[性能升级版] #10](https://github.com/wanqihua/blog/issues/10)

## 常用方式

### 一、使用 position: sticky 实现

#### 1、粘性定位是什么？

**粘性定位** `sticky`([MDN 传送门](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)) 相当于`相对定位 relative 和固定定位 fixed 的结合`；在页面元素滚动过程中，某个元素距离其父元素的距离达到 sticky 粘性定位的要求时；元素的相对定位 relative 效果变成固定定位 fixed 的效果。

#### 2、如何使用？

使用条件：

- 父元素不能 overflow:hidden 或者 overflow:auto 属性
- 必须指定 top、bottom、left、right 4 个值之一，否则只会处于相对定位
- 父元素的高度不能低于 sticky 元素的高度
- sticky 元素仅在其父元素内生效
- 在需要滚动吸顶的元素加上以下样式便可以实现这个效果：

```scss
.sticky {
	position: -webkit-sticky;
	position: sticky;
	top: 0;
}
```

**注意**：这个 API 在 _IOS 系统的兼容性还是比较好_，但在安卓端不行，所以需要和其他方案结合使用。

### 二、使用滚动监听切换 css

可以使用 `obj.getBoundingClientRect().top` 实现。这个 API 可以告诉你页面中某个元素相对浏览器视窗上下左右的距离。然后通过添加 `isFixed` 类名切换 `position: fixed` 就可以了~

```html
<div class="pride_tab_fixed" ref="pride_tab_fixed">
	<div class="pride_tab" :class="titleFixed == true ? 'isFixed' :''">
		// some code
	</div>
</div>
```

```jsx
export default {
	data() {
		return {
			titleFixed: false
		};
	},
	activated() {
		this.titleFixed = false;
		window.addEventListener("scroll", this.handleScroll);
	},
	methods: {
		//滚动监听，头部固定
		handleScroll: function() {
			let offsetTop = this.$refs.pride_tab_fixed.getBoundingClientRect().top;
			this.titleFixed = offsetTop < 0;
			// some code
		}
	}
};
```

::: tip offsetTop 和 getBoundingClientRect() 区别

- 1. getBoundingClientRect():

用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。不包含文档卷起来的部分。

该函数返回一个 object 对象，有 8 个属性：top, right, buttom, left, width, height, x, y

- 2. offsetTop:

用于获得当前元素到定位父级（ element.offsetParent ）顶部的距离（偏移值）。

> 定位父级 offsetParent 的定义是：与当前元素最近的 position != static 的父级元素。

offsetTop 和 offsetParent 方法相结合可以获得该元素到 body 上边距的距离。代码如下：

```js
function getOffset(obj, direction) {
	let offsetL = 0;
	let offsetT = 0;
	while (obj !== window.document.body && obj !== null) {
		offsetL += obj.offsetLeft;
		offsetT += obj.offsetTop;
		obj = obj.offsetParent;
	}
	if (direction === "left") {
		return offsetL;
	} else {
		return offsetT;
	}
}
```

:::

::: tip 延伸知识点 offsetWidth 与 offsetTop

- offsetWidth：
  元素在水平方向上占用的空间大小：`offsetWidth = border-left + padding-left + width + padding-right + border-right`

- offsetHeight：
  元素在垂直方向上占用的空间大小：`offsetHeight = border-top + padding-top + height + padding-bottom + border-bottom`

> 注：如果存在垂直滚动条，offsetWidth 也包括垂直滚动条的宽度；如果存在水平滚动条，offsetHeight 也包括水平滚动条的高度；

- offsetTop：
  元素的上外边框至 offsetParent 元素的上内边框之间的像素距离；

- offsetLeft：
  元素的左外边框至 offsetParent 元素的左内边框之间的像素距离；

**注意事项**

1. 所有偏移量属性都是*只读的*；
2. 如果给元素设置了 display:none，则它的偏移量属性都为 0；
3. 每次访问偏移量属性都需要*重新计算*（保存变量）；
4. 在使用的时候可能出现 DOM 没有初始化，就读取了该属性，这个时候会返回 0；对于这个问题我们需要等到 DOM 元素初始化完成后再执行。

:::

## 常见问题踩坑与解决

### 一. 吸顶的那一刻伴随抖动

<!-- 小程序调用 boundingClientRect 等获取元素位置信息很慢
https://developers.weixin.qq.com/community/develop/doc/0008e610154a40bff7c6c1eeb51800 -->

**原因**：**在吸顶元素 position 变为 fixed 的那一瞬间，该元素就脱离了文档流，下一个元素就进行了补位**。就是这个`补位操作造成了抖动`。

**解决方案**：

1. 为这个吸顶元素添加一个`等高的父元素`，我们监听这个父元素的 getBoundingClientRect().top 值来实现吸顶效果，即：

```html
<div class="title_box" ref="pride_tab_fixed">
	<div class="title" :class="titleFixed == true ? 'isFixed' :''">
		使用 `obj.getBoundingClientRect().top` 实现
	</div>
</div>
```

这个方案就可以解决抖动的 Bug 了。

2. 如果使用的*第三方组件改造*，因为无法添加父元素所以第一种方法不能用。由于我们使用了 taro ui 的 AtTabs，无法为 at-tabs**header 添加一个等高父元素，所以采取给 at-tabs**body `添加一个 block 伪元素`，来站位来实现相同的效果。

```scss
.at-tabs__header {
	height: 50px;
}

.fixed {
	.at-tabs__header {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
	}
	.at-tabs__body::before {
		display: block;
		content: "";
		height: 50px;
		width: 1px;
		visibility: hidden;
	}
}
```

### 二、吸顶效果不能及时响应

**描述：**

- 当页面往下滚动时，吸顶元素需要等页面滚动停止之后才会出现吸顶效果；
- 当页面往上滚动时，滚动到吸顶元素恢复文档流位置时吸顶元素不恢复原样，而等页面停止滚动之后才会恢复原样。

**原因**：这个问题有的说在 ios 上才有，有的比如我在 taro 小程序端也出现了该问题。究其原因，其实是`不能实时进行滚动监听`，要么死在**滚动停止时才触发其相关的事件**，要么是滚动时监听的粒度并不是 92、93、94 这种每个像素都监听到触发的，而是**跳着触发，比如 78、84、86、92 这种，其实就是不能实时监听的问题**。

**结论**：这个和平台的滚动监听钩子内部实现有关。如果粘性定位兼容性好的话可以替代实现，如果不行就是无解的。
