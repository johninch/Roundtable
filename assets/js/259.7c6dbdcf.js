(window.webpackJsonp=window.webpackJsonp||[]).push([[259],{830:function(t,s,a){"use strict";a.r(s);var n=a(14),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"css-基础属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css-基础属性"}},[t._v("#")]),t._v(" CSS 基础属性")]),t._v(" "),a("h2",{attrs:{id:"css-选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css-选择器"}},[t._v("#")]),t._v(" CSS 选择器")]),t._v(" "),a("ul",[a("li",[t._v("id选择器（ # myid）")]),t._v(" "),a("li",[t._v("类选择器（.myclassname）")]),t._v(" "),a("li",[t._v("标签选择器（div, h1, p）")]),t._v(" "),a("li",[t._v("相邻选择器（h1 + p）")]),t._v(" "),a("li",[t._v("子选择器（ul > li）")]),t._v(" "),a("li",[t._v("后代选择器（li a）")]),t._v(" "),a("li",[t._v("通配符选择器（ * ）")]),t._v(" "),a("li",[t._v('属性选择器（a[rel = "external"]）')]),t._v(" "),a("li",[t._v("伪类选择器（a: hover, li:nth-child）")])]),t._v(" "),a("h3",{attrs:{id:"优先级如何计算"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优先级如何计算"}},[t._v("#")]),t._v(" 优先级如何计算？")]),t._v(" "),a("ul",[a("li",[t._v("内联样式 > ID选择器 > 伪类 > 属性选择器 > 类选择器 > 标签选择器 > 通用选择器（*）")]),t._v(" "),a("li",[t._v("优先级就近原则，同权重情况下样式定义最近者为准，载入样式以最后载入的定位为准。")]),t._v(" "),a("li",[t._v("!important 规则例外, 该样式声明会覆盖CSS中任何其他的声明,最高权重。")]),t._v(" "),a("li",[a("strong",[t._v("样式表中定义的样式，后面的优先级更高，覆盖前面的")])])]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("样式覆盖")]),t._v(" "),a("p",[t._v("p标签颜色应该是 red，因为优先级是看样式定义中后面覆盖前面的:")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("<style>\n\t.classA")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("blue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".classB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n</style>\n<p class="),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"classB classA"')]),t._v(">123</p>\n")])])])]),t._v(" "),a("h2",{attrs:{id:"css3新增伪类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css3新增伪类"}},[t._v("#")]),t._v(" CSS3新增伪类")]),t._v(" "),a("ul",[a("li",[t._v("p:first-of-type：选择属于其父元素的首个p元素的每个p元素。")]),t._v(" "),a("li",[t._v("p:last-of-type：选择属于其父元素的最后p元素的每个p元素。")]),t._v(" "),a("li",[t._v("p:only-of-type：选择属于其父元素唯一的p元素的每个p元素。")]),t._v(" "),a("li",[t._v("p:only-child：选择属于其父元素的唯一子元素的每个p元素。")]),t._v(" "),a("li",[t._v("p:nth-child(2)：选择属于其父元素的第二个子元素的每个p元素。\n"),a("ul",[a("li",[t._v("p:nth-child(even)：偶数行")]),t._v(" "),a("li",[t._v("p:nth-child(odd)：奇数行")]),t._v(" "),a("li",[t._v("p:nth-child(2n)：偶数行")]),t._v(" "),a("li",[t._v("p:nth-child(2n+1)：奇数行")]),t._v(" "),a("li",[t._v("p:nth-child(-n+3)：n为1、2、3的元素（-n+3>0的元素）")])])]),t._v(" "),a("li",[t._v(":enabled :disabled：控制表单控件的禁用状态。")]),t._v(" "),a("li",[t._v(":checked：单选框或复选框被选中。")])]),t._v(" "),a("h3",{attrs:{id:"伪类与伪元素的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#伪类与伪元素的区别"}},[t._v("#")]),t._v(" 伪类与伪元素的区别")]),t._v(" "),a("p",[t._v("伪类和伪元素的根本区别在于："),a("code",[t._v("它们是否创造了新的元素")]),t._v("。")]),t._v(" "),a("ul",[a("li",[t._v("从我们模仿其意义的角度来看，如果需要添加新元素加以标识的，就是伪元素，反之，如果只需要在既有元素上添加类别的，就是伪类。")]),t._v(" "),a("li",[t._v("使用语法二者也有不同：在CSS1和CSS2中，伪元素和伪类一样，都是用:开头。")]),t._v(" "),a("li",[t._v("但在CSS3中，伪元素以::开头，用以和伪类进行区分。IE8不支持::。因此如果要兼容IE8，只能用:。")])]),t._v(" "),a("h2",{attrs:{id:"css3有哪些常用新特性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css3有哪些常用新特性"}},[t._v("#")]),t._v(" CSS3有哪些常用新特性")]),t._v(" "),a("ul",[a("li",[t._v("圆角（border-radius）")]),t._v(" "),a("li",[t._v("阴影（box-shadow）")]),t._v(" "),a("li",[t._v("文字阴影（text-shadow）")]),t._v(" "),a("li",[t._v("线性渐变（gradient）")]),t._v(" "),a("li",[t._v("变形（transform）")]),t._v(" "),a("li",[t._v("多背景rgba")]),t._v(" "),a("li",[t._v("新增选择器")]),t._v(" "),a("li",[t._v("媒体查询")])]),t._v(" "),a("h2",{attrs:{id:"关于css3中的transform"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于css3中的transform"}},[t._v("#")]),t._v(" 关于CSS3中的transform")]),t._v(" "),a("ul",[a("li",[t._v("transform的含义是：改变，使…变形；转换；")]),t._v(" "),a("li",[t._v("transform的属性包括：rotate() / skew() / scale() / translate(,) ，分别还有x、y之分，比如：rotatex() 和 rotatey()。")])]),t._v(" "),a("h4",{attrs:{id:"transform-rotate-含义-旋转-其中-deg-是-度-的意思-如-10deg-表示-10度-下同。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transform-rotate-含义-旋转-其中-deg-是-度-的意思-如-10deg-表示-10度-下同。"}},[t._v("#")]),t._v(" transform:rotate()： 含义：旋转；其中“deg”是“度”的意思，如“10deg”表示“10度”下同。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo_transform")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-webkit-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rotate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("10deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-moz-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rotate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("10deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"transform-skew-含义-倾斜"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transform-skew-含义-倾斜"}},[t._v("#")]),t._v(" transform:skew()： 含义：倾斜；")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo_transform")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-webkit-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("skew")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("20deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-moz-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("skew")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("20deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"transform-scale-含义-比例-1-5-表示以1-5的比例放大-如果要放大2倍-须写成-2-0-缩小则为负-。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transform-scale-含义-比例-1-5-表示以1-5的比例放大-如果要放大2倍-须写成-2-0-缩小则为负-。"}},[t._v("#")]),t._v(" transform:scale()： 含义：比例；“1.5”表示以1.5的比例放大，如果要放大2倍，须写成“2.0”，缩小则为负“-”。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo_transform")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-webkit-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1.5"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-moz-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scale")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1.5"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"transform-translate-含义-变动-位移-如下表示向右位移120像素-如果向上位移-把后面的-0-改个值就行-向左向下位移则为负-。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transform-translate-含义-变动-位移-如下表示向右位移120像素-如果向上位移-把后面的-0-改个值就行-向左向下位移则为负-。"}},[t._v("#")]),t._v(" transform:translate()： 含义：变动，位移；如下表示向右位移120像素，如果向上位移，把后面的“0”改个值就行，向左向下位移则为负“-”。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".demo_transform")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-webkit-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("translate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("120px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("-moz-transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("translate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("120px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);