(window.webpackJsonp=window.webpackJsonp||[]).push([[173],{717:function(t,s,a){"use strict";a.r(s);var n=a(14),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_2、密码安全-数据库密码强化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、密码安全-数据库密码强化"}},[t._v("#")]),t._v(" 2、密码安全-数据库密码强化")]),t._v(" "),a("h2",{attrs:{id:"哈希摘要加密算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#哈希摘要加密算法"}},[t._v("#")]),t._v(" 哈希摘要加密算法")]),t._v(" "),a("p",[t._v("服务器并不是一定安全的，有可能被窃取数据，如果服务器中存储密码时直接采用明文存储，则一旦泄露用户信息就会被窃取者直接使用。")]),t._v(" "),a("p",[t._v("因此，需要将密码使用哈希算法来加密得到密文存储。那用户登录输入明文密码时如何到数据库中去与密文比对呢？因为使用同一套哈希算法加密，通过保留的密钥再次对用户输入的明文密码加密，得到密文结果后去与数据库中的存储密文比对，也可以完成校验。并且，数据库中的密文是无法反推明文的。这样就既解决了安全性问题，也能够正常校验。")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("什么是哈希算法")]),t._v(" "),a("p",[t._v("哈希算法（一类加密摘要算法）：常见的有"),a("code",[t._v("md5")]),t._v("、"),a("code",[t._v("sha1")]),t._v("、"),a("code",[t._v("sha256")]),t._v("等。哈希算法必须满足如下4个特点：")]),t._v(" "),a("ul",[a("li",[t._v("明文与密文一一对应")]),t._v(" "),a("li",[t._v("雪崩效应：明文小幅变化时，密文会剧烈变化\n"),a("ul",[a("li",[t._v("比如 张老师 => zls，徐老师 => xls，这就不满足雪崩效应，因为明文变化了一点，密文也只变化了一点。")])])]),t._v(" "),a("li",[t._v("根据密文是无法反推明文的")]),t._v(" "),a("li",[t._v("不管明文有多长，密文是固定长度的")])])]),t._v(" "),a("h3",{attrs:{id:"加盐salt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#加盐salt"}},[t._v("#")]),t._v(" 加盐salt")]),t._v(" "),a("p",[t._v("但是，因为明文与密文是一一对应的，因此，世面上有很多反查网站，可以将相对简单的密码的明文和密文保存在一张大表中，这样，虽然从数学角度上无法反推，但可以通过这样暴力保存键值对来查询到。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("crypto "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'crypto'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("hash")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" str")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" crypto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createHash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("update")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("digest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hex'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("md5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("str")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("hash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'md5'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("sha1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("str")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("hash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sha1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" simplePsw "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'111111'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" complexPsw "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sfdf23rwfsof@s.efx/l-'")]),t._v("\n")])])]),a("p",[t._v("这就要求用户能够尽可能使用数字字母符号混合的方式来增强密码强度。")]),t._v(" "),a("p",[t._v("但作为服务提供方，我们不能要求用户做什么，因为用户是懒惰的，我们只能要求自己来解决，这里就要使用后端”加盐salt“：")]),t._v(" "),a("ul",[a("li",[t._v("当用户注册时，即在数据库中存储用户名密码时，给用户存储一个自己的"),a("code",[t._v("盐salt")]),t._v("字符串（随机生成的复杂字符串），并将salt与password连起来，一起进行哈希加密得到密码密文存储在数据库中。\n"),a("ul",[a("li",[t._v("这相当于我们帮助用户提升了其密码强度，这样就不容易被反查出来了")])])]),t._v(" "),a("li",[t._v("当该用户登录校验时，将该用户名所对应的salt与password连起来，再次进行哈希加密，得到的密码密文就可以与数据库中保存的比对完成校验了。")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("encryptPassword")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("salt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" password")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("md5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("salt "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" simplePsw"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);