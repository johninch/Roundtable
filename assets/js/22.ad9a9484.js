(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{387:function(t,a,s){t.exports=s.p+"assets/img/layout-3-col-01.e86b7a52.png"},536:function(t,a,s){t.exports=s.p+"assets/img/layout-3-col-02.e810a606.png"},537:function(t,a,s){t.exports=s.p+"assets/img/layout-3-col-03.7e92f20b.png"},833:function(t,a,s){"use strict";s.r(a);var _=s(14),r=Object(_.a)({},(function(){var t=this,a=t.$createElement,_=t._self._c||a;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"多种方式实现三栏布局"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#多种方式实现三栏布局"}},[t._v("#")]),t._v(" 多种方式实现三栏布局")]),t._v(" "),_("blockquote",[_("p",[t._v("假设高度已知，请写出三栏布局，其中左栏、右栏宽度各为300px，中间自适应.")])]),t._v(" "),_("h2",{attrs:{id:"高度已知时-有哪些方式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高度已知时-有哪些方式"}},[t._v("#")]),t._v(" 高度已知时，有哪些方式")]),t._v(" "),_("h4",{attrs:{id:"_1-浮动"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-浮动"}},[t._v("#")]),t._v(" （1）浮动：")]),t._v(" "),_("ul",[_("li",[t._v("缺点：脱离文档流，需要清除浮动，清除不好会导致很多问题；")]),t._v(" "),_("li",[t._v("优点：兼容性比较好")])]),t._v(" "),_("h4",{attrs:{id:"_2-绝对定位"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-绝对定位"}},[t._v("#")]),t._v(" （2）绝对定位")]),t._v(" "),_("ul",[_("li",[t._v("缺点：脱离文档流，导致子元素也必须脱离文档流，因此可使用性较差")]),t._v(" "),_("li",[t._v("优点：快捷，不容易出问题")])]),t._v(" "),_("h4",{attrs:{id:"_3-flex弹性"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-flex弹性"}},[t._v("#")]),t._v(" （3）flex弹性")]),t._v(" "),_("ul",[_("li",[t._v("优点：CSS3中出现，解决了上述两种布局的问题，是较为完美的布局，移动端基本都是flex布局")])]),t._v(" "),_("h4",{attrs:{id:"_4-table表格"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-table表格"}},[t._v("#")]),t._v(" （4）table表格")]),t._v(" "),_("ul",[_("li",[t._v("优点：兼容性非常好")]),t._v(" "),_("li",[t._v("缺点：比较麻烦；当其中一块的高度超出时，其他同级块的高度也要跟随其变高(非预期的)")])]),t._v(" "),_("h4",{attrs:{id:"_5-grid网格"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-grid网格"}},[t._v("#")]),t._v(" （5）grid网格")]),t._v(" "),_("ul",[_("li",[t._v("优点：比较新出的布局方式，CSS支持的栅格布局，无需再用框架模拟栅格；完成复杂布局的代码量非常少")])]),t._v(" "),_("p",[_("img",{attrs:{src:s(387),alt:""}})]),t._v(" "),_("h2",{attrs:{id:"高度未知时-哪些方式还适用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#高度未知时-哪些方式还适用"}},[t._v("#")]),t._v(" 高度未知时，哪些方式还适用")]),t._v(" "),_("p",[t._v("只有"),_("code",[t._v("flex弹性布局")]),t._v("与"),_("code",[t._v("table表格布局")]),t._v("是在高度超出后其他块的高度也跟随变高，所以适用；")]),t._v(" "),_("p",[t._v("其他布局方案在不改变的情况下是不再适用的：")]),t._v(" "),_("ul",[_("li",[t._v("浮动布局是因为中间自适应块的内容在向左浮动的时候，遇到左浮动的块儿被挡住了，当高度超出左边浮动块儿时，就浮动到左边。想要阻止浮动到左边，需要创建BFC；")]),t._v(" "),_("li",[t._v("绝对定位无内容撑开时，按照设定min-height；有内容撑开超出最小高度时被内容撑开；")]),t._v(" "),_("li",[t._v("grid网格布局可设定grid-template-rows: auto使网格高度都跟随内容撑高")])]),t._v(" "),_("p",[_("img",{attrs:{src:s(536),alt:""}})]),t._v(" "),_("h2",{attrs:{id:"代码附录"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#代码附录"}},[t._v("#")]),t._v(" 代码附录：")]),t._v(" "),_("p",[_("img",{attrs:{src:s(537),alt:""}})])])}),[],!1,null,null,null);a.default=r.exports}}]);