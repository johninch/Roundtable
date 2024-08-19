(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{576:function(t,s,r){t.exports=r.p+"assets/img/CSRF.9a8b5189.png"},902:function(t,s,r){"use strict";r.r(s);var e=r(14),a=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"前端常见安全问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前端常见安全问题"}},[t._v("#")]),t._v(" 前端常见安全问题")]),t._v(" "),e("h2",{attrs:{id:"csrf-跨站请求伪造"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#csrf-跨站请求伪造"}},[t._v("#")]),t._v(" CSRF 跨站请求伪造")]),t._v(" "),e("p",[t._v("CSRF，跨站请求伪造，Cross-site request forgery")]),t._v(" "),e("h3",{attrs:{id:"攻击原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#攻击原理"}},[t._v("#")]),t._v(" 攻击原理")]),t._v(" "),e("p",[t._v("首先用户要登录网站A，网站A就会下发给用户cookie信息，当用户再访问网站B时，用户会被引诱点击网站B上的攻击链接，指向网站A的某个漏洞接口，点击后浏览器会上传用户的cookie，网站A会判定其为合法用户从而通过登录。")]),t._v(" "),e("p",[e("img",{attrs:{src:r(576),alt:"CSRF攻击原理"}})]),t._v(" "),e("h3",{attrs:{id:"防御措施"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#防御措施"}},[t._v("#")]),t._v(" 防御措施：")]),t._v(" "),e("ul",[e("li",[t._v("token验证(除了下发cookie还要分配一个token，攻击链接只能携带cookie但不能携带token)")]),t._v(" "),e("li",[t._v("referer验证(服务器判断页面的来源从而屏蔽攻击)")]),t._v(" "),e("li",[t._v("隐藏令牌(与token验证类似，只是字段不会放在链接上，如放在http header头中，较隐蔽)")])]),t._v(" "),e("h2",{attrs:{id:"xss-跨站脚本攻击"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#xss-跨站脚本攻击"}},[t._v("#")]),t._v(" XSS 跨站脚本攻击")]),t._v(" "),e("p",[t._v("XSS，跨站脚本攻击，Cross-site scripting")]),t._v(" "),e("h3",{attrs:{id:"攻击原理-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#攻击原理-2"}},[t._v("#")]),t._v(" 攻击原理")]),t._v(" "),e("p",[t._v("向页面中注入js脚本，运行函数体来完成自己攻击网站的目的，可能导致cookie泄露")]),t._v(" "),e("h3",{attrs:{id:"防御措施-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#防御措施-2"}},[t._v("#")]),t._v(" 防御措施")]),t._v(" "),e("p",[t._v("核心点就是"),e("code",[t._v("过滤阻止插入的js脚本执行")]),t._v("。")]),t._v(" "),e("h2",{attrs:{id:"csrf与xss的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#csrf与xss的区别"}},[t._v("#")]),t._v(" CSRF与XSS的区别")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("CSRF依赖于用户登录网站，利用网站的漏洞接口完成攻击")]),t._v("；")]),t._v(" "),e("li",[e("code",[t._v("XSS则是向页面注入js脚本来执行函数体")]),t._v("。")])]),t._v(" "),e("p",[e("strong",[t._v("注意")]),t._v("：顺便提下sql注入，原理就是通过吧sql命令插入到web表单提交；或输入域名；或页面请求的查询字符串中，达到欺骗服务器执行恶意的sql命令。")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://www.cxymsg.com/guide/security.html#%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%AF%E8%83%BD%E5%BC%95%E8%B5%B7%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8%E7%9A%84%E7%9A%84%E9%97%AE%E9%A2%98",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端安全面试题"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=a.exports}}]);