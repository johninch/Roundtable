---
{
    "title": "CSS 变量教程",
}
---
### 变量的声明

```css
:root {
  --w: 100px; /* 全局变量 */
}
```

#### 变量作用域
> 同一个 CSS 变量，可以在多个选择器内声明。读取的时候，**优先级**最高的声明生效。这与 CSS 的**"层叠"**（cascade）规则是一致的。

上面提到了全局变量。
```css
.container {
  --h: 10px;
  /* 局部变量
      只作用于拥有 .container类名的节点，
      以及该节点下的所有后辈节点。
  */
}
```

### var() 函数

- 它用于读取变量
- 可接受两个参数，第一个参数是作用域内的变量，第二个参数（可选）是第一个参数的默认值。
- 变量值只能作为属性值。

### 变量值的类型
- 类型
  - 字符串（'hello world'）不能是带单位带数字。
  - 数字。
  - 带单位的数字（1px, 30deg, ...）。
- 运算规则
  - 字符串可以拼接。
  - 数字运算只能用```calc```。

### 响应式布局
变量可用于@media媒体查询。

### 与sass、less区别
变量是动态的，sass、less是静态的，他们没法做到更新变量就刷新布局达到响应式的效果

### JavaScript 操作
- 可以通过改变css变量实现动画、主题等；例如[ani-css首页的robot](https://esop-fed.github.io/ani-css)
### 其他优秀文章
[小tips:了解CSS/CSS3原生变量var](https://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/)

参考链接：[css变量教程](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)