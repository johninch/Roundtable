---
title: 块级元素的垂直水平居中
tags: [css, 块级元素, 居中]
categories: css
---

# 块级元素的垂直水平居中

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