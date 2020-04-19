# CSS命名风格规范

本文主要简介：BEM, OOCSS, ACSS。

## BEM（Block, Element, Modifier）
Block Element Modifier，它是一种前端命名方法，旨在帮助开发者实现模块化、可复用、高可维护性和结构化的CSS代码。

简单说，就是 html 是一个 DOM树，那么你在写样式的的时候就写成一个 BEM树一一对应就可以了
```scss
.block{}
.block__element{}
.block--modifier{}
```
多层dom节点嵌套时
```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link">
      <span class="menu__text"></span>
    </a>
  </li>
</ul>
```
这里的 a 不能写出 menu__item__link 这样就太丑了

## OOCSS（面向对象css）
Object Oriented CSS 的想法首先要明白 CSS 的 “Object” 是什么。一般指一个视觉上的图案、控件等，且大部分情况下，这种 Object 肯定是可以复用的。

OOCSS 认为 container 和 content 是需要隔离开的。也就是说，尽量不要去使用依赖于节点结构位置的样式定义。
```scss
.video-container .title{
  ...
}
```
OOCSS 中会建议你直接这样去写:
```scss
.title{
  ...
}
```

## ACSS（Atomic CSS）
Atomic CSS 就是 `Style with class`，就好像你所有的样式都是 inline 了一样一目了然。

好处就是不用在管理各种页面各自的样式文件了，你准备好一个原子库，直接写 html 就能把样式写出来。

问题也很明显，如果要做响应式就会比较麻烦，因为你的样式都是原子性的写在 html 中。它会针对每个选择器定义一个可以复用的 class：
```scss
.Bgc-fff{
   background-color: #fff;
}
```
```html
<div class="Bgc-fff"></div>
```
