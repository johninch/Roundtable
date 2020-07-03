---
title: CSS 基础属性
tags: [css, 布局, 文档流, 浮动]
categories: css
---

# CSS 基础属性

## CSS 选择器
- id选择器（ # myid）
- 类选择器（.myclassname）
- 标签选择器（div, h1, p）
- 相邻选择器（h1 + p）
- 子选择器（ul > li）
- 后代选择器（li a）
- 通配符选择器（ * ）
- 属性选择器（a[rel = "external"]）
- 伪类选择器（a: hover, li:nth-child）

### 优先级如何计算？
- 内联样式 > ID选择器 > 伪类 > 属性选择器 > 类选择器 > 标签选择器 > 通用选择器（*）
- 优先级就近原则，同权重情况下样式定义最近者为准，载入样式以最后载入的定位为准。
- !important 规则例外, 该样式声明会覆盖CSS中任何其他的声明,最高权重。
- **样式表中定义的样式，后面的优先级更高，覆盖前面的**

::: details 样式覆盖
p标签颜色应该是 red，因为优先级是看样式定义中后面覆盖前面的:
```css
<style>
	.classA{
        color:blue;
	}
	.classB{
        color:red;
	}
</style>
<p class="classB classA">123</p>
```
:::

## CSS3新增伪类
- p:first-of-type：选择属于其父元素的首个p元素的每个p元素。
- p:last-of-type：选择属于其父元素的最后p元素的每个p元素。
- p:only-of-type：选择属于其父元素唯一的p元素的每个p元素。
- p:only-child：选择属于其父元素的唯一子元素的每个p元素。
- p:nth-child(2)：选择属于其父元素的第二个子元素的每个p元素。
    - p:nth-child(even)：偶数行
    - p:nth-child(odd)：奇数行
    - p:nth-child(2n)：偶数行
    - p:nth-child(2n+1)：奇数行
    - p:nth-child(-n+3)：n为1、2、3的元素（-n+3>0的元素）
- :enabled :disabled：控制表单控件的禁用状态。
- :checked：单选框或复选框被选中。

### 伪类与伪元素的区别
伪类和伪元素的根本区别在于：`它们是否创造了新的元素`。
- 从我们模仿其意义的角度来看，如果需要添加新元素加以标识的，就是伪元素，反之，如果只需要在既有元素上添加类别的，就是伪类。
- 使用语法二者也有不同：在CSS1和CSS2中，伪元素和伪类一样，都是用:开头。
- 但在CSS3中，伪元素以::开头，用以和伪类进行区分。IE8不支持::。因此如果要兼容IE8，只能用:。

## CSS3有哪些常用新特性
- 圆角（border-radius）
- 阴影（box-shadow）
- 文字阴影（text-shadow）
- 线性渐变（gradient）
- 变形（transform）
- 多背景rgba
- 新增选择器
- 媒体查询

## 关于CSS3中的transform
- transform的含义是：改变，使…变形；转换；
- transform的属性包括：rotate() / skew() / scale() / translate(,) ，分别还有x、y之分，比如：rotatex() 和 rotatey()。

#### transform:rotate()： 含义：旋转；其中“deg”是“度”的意思，如“10deg”表示“10度”下同。
```css
.demo_transform {
	-webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
}
```
#### transform:skew()： 含义：倾斜；
```css
.demo_transform {
	-webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
}
```
#### transform:scale()： 含义：比例；“1.5”表示以1.5的比例放大，如果要放大2倍，须写成“2.0”，缩小则为负“-”。
```css
.demo_transform {
	-webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
}
```
#### transform:translate()： 含义：变动，位移；如下表示向右位移120像素，如果向上位移，把后面的“0”改个值就行，向左向下位移则为负“-”。
```css
.demo_transform {
	-webkit-transform: translate(120px,0);
    -moz-transform: translate(120px,0);
}
```



