---
title: 元素居中方法总结
tags: [css, 布局, 元素居中]
categories: css
---

# 元素居中方法总结

## johninch

### 垂直居中
1. 对单行文本居中：
```css
{
    height: 100px;
    line-height: 100px; /* 值等于元素高度的值 */
}
```
2. 模拟div表格居中：
```css
div{
    display: table-cell; /* 让元素以表格的单元格形式渲染 */
    vertical-align: middle; /* 使元素垂直对齐 */
}
```
3. 绝对定位元素居中:
```css
.element {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -200px;    /* 高度的一半 */
    margin-left: -200px;    /* 宽度的一半 */
}
/* 上面的方法需要已知元素的宽高，更好的方法是利用CSS3中的transform，对任意宽高都适用： */
.element {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
}
```
4. flex居中：
```css
.div {
    display: flex;
    align-items: center;
}
```

### 水平居中
1. 居中一个行内元素
> 只需要把行内元素包裹在一个属性display为block的父层元素中，并且把父层元素添加如下属性便可以实现居中的效果：
```css
text-align: center;
```

2. 居中一个块级元素
> 给div设置一个宽度，然后添加margin:0 auto属性才会有效：
```css
div {
    width:200px;
    margin:0 auto;
}
```

3. 绝对定位元素居中:
```css
.element {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -200px;    /* 高度的一半 */
    margin-left: -200px;    /* 宽度的一半 */
}
/* 上面的方法需要已知元素的宽高，更好的方法是利用CSS3中的transform，对任意宽高都适用： */
.element {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
}
```

4、居中浮动元素
> 实现居中的关键就在于 margin设置与 position:relative。
```css
.div {
    float：left
    width: 400px ;
    height: 400px;
    position: relative;
    left: 50%;
    top: 50%;
    margin: -200px 0 0 -200px;
}
```
5、flex水平居中
```css
.div {
    display: flex;
    justify-content: center;
}
```

## mtd
````html
<div class="parent">
    <div class="child"></div>
</div>
````
1.flex实现
````css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
````
2.table-cell布局实现
````css
.parent {
    display: table-cell;
    vertical-align: middle;
}
.child {
    margin: 0 auto;
}
````
3.定位+transform
````css
.parent {
    position: relative;
}
.child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
````

## johninch
