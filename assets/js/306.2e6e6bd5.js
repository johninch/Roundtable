(window.webpackJsonp=window.webpackJsonp||[]).push([[306],{901:function(t,s,a){"use strict";a.r(s);var n=a(14),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"慕课实战-web前后端漏洞分析与防御"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#慕课实战-web前后端漏洞分析与防御"}},[t._v("#")]),t._v(" 慕课实战：web前后端漏洞分析与防御")]),t._v(" "),a("h2",{attrs:{id:"web安全"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#web安全"}},[t._v("#")]),t._v(" Web安全")]),t._v(" "),a("ul",[a("li",[t._v("代码层面")]),t._v(" "),a("li",[t._v("架构层面")]),t._v(" "),a("li",[t._v("运维层面")])]),t._v(" "),a("p",[t._v("本课程重点关注代码层面的安全问题，也会涉及少量架构层面的安全知识，不涉及运维层面的安全问题。")]),t._v(" "),a("h3",{attrs:{id:"安全问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安全问题"}},[t._v("#")]),t._v(" 安全问题")]),t._v(" "),a("ul",[a("li",[t._v("用户身份被盗用")]),t._v(" "),a("li",[t._v("用户密码泄露")]),t._v(" "),a("li",[t._v("用户资料被盗取")]),t._v(" "),a("li",[t._v("网站数据库泄露")]),t._v(" "),a("li",[t._v("...")])]),t._v(" "),a("h2",{attrs:{id:"课程目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#课程目录"}},[t._v("#")]),t._v(" 课程目录")]),t._v(" "),a("ul",[a("li",[t._v("跨站脚本攻击XSS")]),t._v(" "),a("li",[t._v("跨站请求伪造攻击CSRF")]),t._v(" "),a("li",[t._v("前端Cookies安全性")]),t._v(" "),a("li",[t._v("点击劫持攻击")]),t._v(" "),a("li",[t._v("传输过程安全问题")]),t._v(" "),a("li",[t._v("用户密码安全问题")]),t._v(" "),a("li",[t._v("SQL注入攻击")]),t._v(" "),a("li",[t._v("信息泄露和社会工程学")]),t._v(" "),a("li",[t._v("其他安全问题")])]),t._v(" "),a("h2",{attrs:{id:"跨站脚本攻击xss"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#跨站脚本攻击xss"}},[t._v("#")]),t._v(" 跨站脚本攻击XSS")]),t._v(" "),a("h4",{attrs:{id:"xss攻击原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss攻击原理"}},[t._v("#")]),t._v(" XSS攻击原理")]),t._v(" "),a("p",[t._v("本来应该显示数据的位置，通过script标签变成了程序。")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    ${content}\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    ")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h4",{attrs:{id:"xss攻击可以干啥坏事呢"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss攻击可以干啥坏事呢"}},[t._v("#")]),t._v(" XSS攻击可以干啥坏事呢？")]),t._v(" "),a("ul",[a("li",[t._v("获取页面数据\n"),a("ul",[a("li",[t._v("盗取用户数据")])])]),t._v(" "),a("li",[t._v("获取Cookies\n"),a("ul",[a("li",[t._v("盗取用户密码和登录状态")])])]),t._v(" "),a("li",[t._v("劫持前端逻辑\n"),a("ul",[a("li",[t._v("欺骗用户")])])]),t._v(" "),a("li",[t._v("发送请求\n"),a("ul",[a("li",[t._v("发到攻击者自己的网站，盗取资料")])])])]),t._v(" "),a("h4",{attrs:{id:"xss分类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss分类"}},[t._v("#")]),t._v(" XSS分类")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("反射型：url参数直接注入。")]),t._v(" "),a("ul",[a("li",[t._v("url参数中直接写script脚本，这个可能很明显会被用户看到，但攻击者可以轻易将其变换成「短网址」「短域名」，短域名是乱码，就看不出来脚本标签了。")])])]),t._v(" "),a("li",[a("p",[t._v("存储型：存储到DB后读取时注入")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);