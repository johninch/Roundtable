---
title: CSS 中的定位机制
tags: [css, 布局, float, 浮动, position, 绝对定位, display, 块级元素, 行内元素]
categories: css
---

# CSS 中的定位机制

CSS 有三种基本的定位机制：`普通流`、`浮动`和`绝对定位`。

**注意**：float和absolute属性，可以让元素脱离文档流，并且可以设置其宽高。但重点是：**float仍会占据位置（`也就是说没有完全脱离文档流`），而absolute/fixed会覆盖文档流中的其他元素**。

## 浮动
浮动布局是CSS中规定的第二种定位机制。通过设置float属性，能够实现横向多列布局。

### 浮动原理
浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于文档流（但是又没有完全脱离文档流），当一个元素浮动之后，不会影响到块级框的布局而只会影响内联框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样，当浮动框高度超出包含框的时候，会出现包含框不会自动伸高来闭合浮动元素（“**高度塌陷**”现象）。顾名思义，就是漂浮于普通流之上，像浮云一样，但是只能左右浮动。

### 清除浮动

#### 第一类方法（推荐）
通过在浮动元素的末尾添加一个空元素，设置 clear：both属性。after伪元素其实也是通过 content 在元素的后面生成了内容为一个点的块级元素；
1. `after伪选择符`，就可以在父容器的尾部自动创建一个子元素。
    ```css
    div:after {
        content: ".";
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }
    ```
2. `工程上常用的.clearfix`一般是这样描述的：
    ```css
    .cf:before,
    .cf:after {
        content: "";
        display: block;
        clear: both;
    }
    /* For IE 6/7 (trigger hasLayout) */
    .cf { zoom: 1; }
    ```
    - `content: " "`：是在父容器的结尾处放一个空白字符；
    - `display: block; clear: both;`：是确保这个空白字符是非浮动的独立区块。
    - :after选择符IE 6不支持，所以我们添加一条IE 6的独有命令"zoom:1;"就行了。这条命令的作用是激活父元素的"hasLayout"属性，让父元素拥有自己的布局。IE 6会读取这条命令，而其他浏览器则会直接忽略它。

#### 第二类方法（不推荐）
通过设置父元素 overflow 或者display：table 属性来闭合浮动，这里的原理涉及到BFC（[如何创建bfc](/Question-Bank/css/box-sizing&margin-collapse&BFC.md#如何创建bfc：)）
1. 添加额外标签，在浮动元素末尾添加一个新标签：
    ```html
    <div style=”clear:both;”></div> // 清除float:left 和 float:right的影响
    ```
2. 父元素也设置浮动
    - 优点：不存在结构和语义化问题，代码量极少。
    - 缺点：使得与父元素相邻的元素的布局会受到影响，不可能一直浮动到body，不推荐使用。

3. 父元素设置overflow属性
    通过设置父元素overflow为hidden或者auto；在IE6中还需要触发hasLayout，例如zoom：1；
    - 优点：不存在结构和语义化问题，代码量极少。
    - 缺点：overflow:hidden；内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素；不要使用overflow:auto；多层嵌套后，firefox与IE 可能会出现显示错误。


## 关于display
- inline(默认值)：内部元素的宽高+padding会撑开其宽高，主动给其设置宽高是无效的。inline不单独占一行，其他元素紧跟其后。
- block：实际宽高是本身宽高+padding，但block是可以设置宽高的。独占一行。
- inline-block：inline-block既具有block的宽高特性又具有inline的同行元素特性。
- none：`display: none`**不渲染**，不会保留元素本该显示的空间（`即不在 render tree中`），但是`visibility: hidden`还是**渲染了**，会保留空间（在render tree中），只是视觉上看不到而已。

### 行内元素和块级元素

#### 行内元素特点：（margin 在垂直方向上不生效；设置 padding 本身生效，但是没有把父级元素撑开；）
- 和其他元素都在一行上；
- 元素的高度、宽度、行高及顶部和底部边距不可设置；
- 元素的宽度就是它包含的文字或图片的宽度，不可改变。 
- **典型行内元素**：span、a、label、input、textarea、select、 img、br、strong和em就是典型的行内元素（inline）。

#### 块级元素特点
- 每个块级元素都从新的一行开始，并且其后的元素也另起一行。
- 元素的高度、宽度、行高以及顶和底边距都可设置。
- 元素宽度在不设置的情况下，和父元素的宽度一致，除非设定一个宽度。
- **典型块级元素**：div、p、h1、form、ul 和 li 就是典型的块级元素（block）。


## position
postion属性属于CSS流的第三种定位规则，position常用值有 position : absolute | fixed | relative 。

### 绝对定位（absolute与fixed）：
绝对定位元素的display为块级
- absolute：
    - 在无已定位祖先元素时，以根节点`<html>`为基准偏移；
    - 在有已定位祖先元素时，`相对于最近一级的、不是static定位的父元素`来定位。
- fixed：
    - 无论有无已定位祖先元素，都以浏览器`可视窗口为基准`偏移。所以有滚动条时，位置是相对于窗口固定的，浮于标准文档流上方（z-index方向）。

### 相对定位：
- relative：
    - `相对于自身原有位置进行偏移`，仍处于标准文档流之中。保有原来的display属性。
    - **注意**：`relative元素如果设置偏移后，它原来占据的文档流中的位置仍然会保留，不会被其他块浮动过来填补掉。并且，它的偏移也不会把别的块从文档流中原来的位置挤开，如果有重叠的地方它会重叠在其它文档流元素之上`。
    - **注意**：top|right|bottom|left的细节：“定位父元素border内边到该元素margin外边的距离”。







