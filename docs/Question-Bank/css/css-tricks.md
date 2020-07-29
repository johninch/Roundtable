# 样式布局中的奇技淫巧


## 1像素border实现
不能直接用border-bottom来实现，因为在移动端有dpr的概念：比如ip6上dpr是2，物理像素是设备像素的两倍，那么在PC上是1像素的线条，在手机上就是2像素。

可以使用**伪类缩放**：原理就是利用伪类相对于元素是绝对定位，然后根据`媒体查询dpr来缩放`其大小
```css
@media (webkit-min-device-pixel-ratio:2){}
```

## @2x和@3x图片
同样通过媒体查询设备dpr来对应引入2x和3x图片。

## SVG图片（图标字体文件）
在移动端开发中，通常会把一些色彩单一的图片做成svg图片。我们不会直接使用这些svg图片，我们会用一些工具将其转化为图表字体文件，就能在css中引用这些图表字体文件即可。

传送门：[工具IconMoon](https://icomoon.io/)

## 去除连续span分块间空白字符
- 方法1：通过在**父层dom上设置font-size为0**，在子dom上单独设置其font-size的方法；
- 方法2：直接在html中将**连续的span紧挨着**就可以了；
- 方法3：使用**letter-spacing**属性设置间距；

## 文本太长显示…

```scss
.target {
    while-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```


## 在图片高度未知时适应屏幕宽度形成一个宽高相等的容器
- w3c规定，margin与padding值设置为百分数时，其值的计算参照 最近`父级元素width`，注意，四个方向都是以父级的`宽`来百分比的，如果父元素没有宽度，则向上查找父辈元素，直到屏幕宽度。
- 通过这一点可以设置固定宽高比。比如图片宽高比是 2.4:1  那么padding-bottom 或padding-top 应该为 100%/2.4=41.66%。如下wrapper为2.4:1的一个容器。
```scss
.wrapper {
    height: 0;
    width: 200px;
    .div {
        width: 100%;
        padding-bottom: 41.66%;
    }
}
```

## 经典布局：Css Sticky footers
`Sticky footers`：
    - 如果页面内容不够长的时候，页脚块粘贴在视窗底部；
    - 如果内容足够长时，页脚块会被内容向下推送。

相对复杂但兼容性最好的方案：
    - 最外层wrapper设最小100%高度撑开屏幕；
    - 内部的main主要内容设padding-bottom为页脚块留出位置；
    - 与wrapper平级的close页脚块设相对定位向上偏移即可；
```scss
.wrapper {
    min-height: 100%;
    .main {
        margin-top: 64px;
        padding-bottom: 64px;
    }
}
.close {
    position: relative;
    margin-top: -64px;
    width: 32px;
    height: 32px;
    clear: both;
}
```

## 两栏布局flex布局实现（固定宽度和自适应宽度）
- wrapper 外层宽度100%，设置over-flow隐藏；
- left 固定宽度为80px，为了兼容性需要width：80px；
- right 的flex为1自适应；
```scss
.wrapper {
    display: flex;
    width: 100%;
    overflow: hidden;
    .left {
        flex: 0 0 80px;
        width: 80px;
    }
    .right {
        flex: 1; // 等价于 1 1 0
    }
}
```

## 左右列表联动思路

左右列表联动实现：
1. 先实现右侧滑动左侧列表标题对应高亮
    - 关键是计算右侧列表每一块区间的高度，存入数组listHeight中;
    - 拿到better-scroll实时滚动所派发的y值，将其保存到scrollY中；
    - 在计算属性中通过scrollY所在listHeight区间判断，映射到左侧列表；
    - 最后通过绑定class完成左侧列表current样式的变更（currentIndex===index）。
2. 实现左侧标题点击，右侧列表滚动到对应位置：scrollToElement。

## 横向滚动实现
需要满足picList的宽度超出picWrapper的固定宽度。在初始化better-scroll的时候，需要传两个参数：
- 一个是**允许水平滚动**scrollX: true；
- 第二个eventPassthrough: 'vertical' **是允许在这个区块内，忽略整个页面上垂直方向的滚动，而只应用自己的横向滚动**。

## 超链接访问过后，hover样式就不出现是为什么？如何解决？
被点击访问过的超链接不再具有hover和active样式，解决方式是改变css属性的排列顺序，按照link，visited，hover，active的顺序设置（L-V-H-A）(驴哈)。

## rgba()与opacity()的透明效果有什么不同？
- opacity()作用于元素，以及元素内的所有内容；
- rgba()只作用于元素的颜色或者背景色，且子元素不会继承其透明效果。

## display: none与visibility:hidden有什么不同？
display：none是dom元素没渲染，而visibility：hidden只是视觉上隐藏，有dom元素。

具体可参考浏览器渲染部分的解释。

## src和href的区别是什么？
简言之，`src`用于`替换当前元素`；`href`用于在当前文档和引用资源之间`建立联系`。

- `src`指向的内容**会嵌入到文档中当前标签所在的位置**。常用的有：img、script、iframe。当浏览器解析到该元素时，会暂停浏览器的渲染，直到该资源加载完毕。这也是将js脚本放在底部而不是头部的原因。
- `href`是用来建立当前元素和文档之间的链接。常用的有：link、a。浏览器会识别该文档为css文档，**并行下载该文档，并且不会停止对当前文档的处理**。这也是建议使用`link`，而不采用`@import`加载css的原因。

#### CSS中link与@import的区别是？
- `link`是html标签，无兼容问题，而`@import`是CSS提供的，只有IE5以上才能识别；
- `link`随着页面同时加载，`@import`引用的css会等到页面被加载完之后再加载；
- `link`方式的样式权重高于`@import`样式的权重



## onmouse事件

#### onmouseover与onmousemove的区别？
- `onmouseover`只在刚进入区域时触发；
- `onmousemove`除了刚进入区域触发外，在区域内移动鼠标也会触发。
- 从时间上来看`onmouseover`的事件触发是早于`onmousemove`的。
#### mouseout与mouseleave有什么区别？
二者都是鼠标离开指定元素时触发的鼠标事件，不同点是：
- `mouseout`在离开指定元素区域及其子元素区域均触发；
- `mouseleave`只在鼠标离开指定元素区域时触发。

#### 原生JS实现节点拖拽
给需要拖拽的节点绑定`mousedown`、`mousemove`、`mouseup`事件：
1. `mousedown`事件触发后，开始拖拽；
2. `mousemove`时，需要通过event.clientX及clienY获取拖拽的位置，并实时更新位置；
3. `mouseup`时，拖拽结束。
4. 需要注意浏览器边界的计算问题。



## FOUC（文档样式短暂失效）
FOUC（文档样式短暂失效），指的是当样式表晚于html结构加载，在页面dom加载完成到css样式导入完成之间会有一小段时间页面上的内容是没有样式的。当加载css文件时，页面停止之前的渲染，在此css文件下载和解析后，将重新渲染页面，也就出现了短暂的花屏闪烁现象。

这通常是因为如下三点原因造成的：
1. 使用@import方法导入样式表；
2. 将样式表放在页面底部；
3. 有多个样式表，放在html结构的不同位置；

解决方法是：在head标签之间`通过link`或者script元素引入样式文件。


## CSS3动画特性
CSS3动画相关的几个属性是：`transition`过渡, `transform`变换, `animation`动画。
- `transition`关注的是CSS property的变化，property值和时间的关系是一个三次贝塞尔曲线。
- `animation`作用于元素本身而不是样式属性，可以使用**关键帧**的概念，应该说可以实现更自由的动画效果。
至于实现动画效果用哪一种，要看应用场景，但很多情况下`transition`更简单实用些。

#### transition
`transition：all 0 ease 0（默认值）`：
- transition-property：属性名，取值有all/none/property(比如width、height、opacity...)
- transition-duration：持续时间，以秒或者毫秒计
- transition-timing-function：linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n); 过渡效果。
- transition-delay：延迟开始时间，以秒或者毫秒计

#### transform
transform：scale | skew | rotate | translate | 某个方向属性及3d属性如translateX(x)、translate3d(x,y,z)。

此外还有matrix矩阵 和perspective(n) 3d透视视图这种不常用的取值。

#### animation
`animation : none 0 ease 0 1 normal  (默认值)`：
- animation-name：规定需要绑定到选择器的 keyframe 名称，如下示例自定义的myAni
- animation-duration：持续时间，以秒或毫秒计
- animation-timing-function：linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n); 速度效果曲线。
- animation-delay：延迟开始时间，以秒或者毫秒计
- animation-iteration-count：动画播放次数
- animation-direction：normal|alternate；是否应该轮流反向播放动画
```css
@keyframe myAni {
    0% {
        background: red;
    }
    50% {
        background: blue;
    }
    100% {
        background: black;
    }
}
@keyframe myAni2 {
    from { background: red; }
    to { background: black; }
}
```


## fixed相对于父元素定位

**position:fixed**; 是对于浏览器窗口定位的，要实现相当于父元素定位，可以这样：
- 不设置fixed元素的top、left和top、right值，他就会默认居于父级进行定位。
- 具体相对位置偏移需要通过`margin`来设置。

这种方法本质上fixed元素还是相当于窗口定位的，实现效果上是相对于父元素定位。
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        .parent {
            width: 500px;
            height: 2500px;
            margin: 100px;
            background-color: yellow;
        }
        .fix {
            position: fixed;
            width: 200px;
            height: 200px;
            border: 1px solid #1B6D85;
            margin: 50px;
            /* top: 100px;
            bottom: 100px;
            left: 100px;
            right: 100px; */
        }
    </style>
</head>
<body>
    <div class="parent">
        <h3>position:fixed 默认是相对浏览器窗口定位的,怎么实现相对父级元素定位呀?</h3>
        <div class="fix">
            fixed定位相对父级容器定位，不添加:top,bottom,left,right样式，通过margin定位
        </div>
    </div>
</body>
</html>
```

***冷知识***

- `fixed`在特殊情况下不会相对于`视口`来定位，如果当前元素的父元素`transform`不为none，那么定位的元素就不是依据视口进行定位，而是依据父元素进行定位

## line-height

[对于line-height的认识](https://blog.csdn.net/weixin_38858002/article/details/80571829)

#### line-height都有哪些属性以及这些属性对应的属性值：

- `数值`：如**line-heigth：1.5**，其最终的计算值是与当前的font-size相乘后的值。
    - 例如：假设我们此时的font-size大小是14px，则此时line-height就是1.5*14px = 21px；
- `百分比值`：如**line-height：150%**，其最终的计算值是与当前的font-size相乘后的值。
    - 例如：假设我们此时的font-size大小是14px，则此时line-height就是150%*14px = 21px；
- `长度值`：也就是带单位的值，**line-heigth：21px**或者**line-height：1.5em**
    - 此处em是一个相对于font-size的相对单位，因此其最终的计算值和当前的font-size相乘后的值。
    - 例如：假设我们此时的font-size大小是14px，则此时line-height就是1.5*14px = 21px；

乍一看，似乎line-height：1.5，line-height：150%以及line-height：1.5em的最终效果都是一样的，但是实际上，line-height：1.5 和其他两个是有区别的，那就体现在继承方面上。

#### line-height的继承
- 如果使用数值作为line-hieght的属性值，那么所有的子元素继承的都是这个值，比如：
line-height：1.5，那么子元素继承的就是1.5；

- 如果使用百分比值或者长度值作为属性值，那么所有的子元素都继承的是最终的计算值。比如：line-height：1.5em或者line-height：150%，font-size：14px，那么子元素继承的是1.5*14px = 21px；


#### 空div的高度是由line-height决定的

当给一个空div里面添加文字时，这个div的高度是怎么来的。这个元素的高度是由line-height决定的。


## 如何实现先快后慢的缓动函数（结合tween.js）

[github.com/tweenjs](https://github.com/tweenjs/tween.js/blob/1f85d6e74491037653ddad2ee4193958f09928e2/src/Easing.ts)
```js
	Sinusoidal: {
		In: function (amount: number): number {
			return 1 - Math.cos((amount * Math.PI) / 2)
		},
		Out: function (amount: number): number {
			return Math.sin((amount * Math.PI) / 2)
		},
		InOut: function (amount: number): number {
			return 0.5 * (1 - Math.cos(Math.PI * amount))
		},
	},
```



