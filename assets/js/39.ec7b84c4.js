(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{519:function(t,a,s){t.exports=s.p+"assets/img/base64-table.4135b65b.png"},520:function(t,a,s){t.exports=s.p+"assets/img/Man.c3f49396.png"},825:function(t,a,s){"use strict";s.r(a);var e=s(14),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"文件预览"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文件预览"}},[t._v("#")]),t._v(" 文件预览")]),t._v(" "),e("h2",{attrs:{id:"blob、file、filereader"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#blob、file、filereader"}},[t._v("#")]),t._v(" Blob、File、FileReader")]),t._v(" "),e("ul",[e("li",[t._v("从input onchange中返回的图片对象其实就是一个File对象。")]),t._v(" "),e("li",[t._v("而Blob对象是一个用来包装二进制文件的容器，File继承于Blob。")]),t._v(" "),e("li",[t._v("FileReader用来读取file或blob的文件数据。")])]),t._v(" "),e("h3",{attrs:{id:"blob"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#blob"}},[t._v("#")]),t._v(" Blob")]),t._v(" "),e("p",[t._v("一个 Blob对象表示一个不可变的，原始数据的类似文件对象。Blob表示的数据不一定是一个JavaScript原生格式。")]),t._v(" "),e("p",[t._v("创建blob对象：")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" aBlob "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Blob")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" array"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array，或者其他类似对象的混合体，它将会被放进 Blob。")]),t._v("\n")])])]),e("h3",{attrs:{id:"file"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#file"}},[t._v("#")]),t._v(" File")]),t._v(" "),e("p",[t._v("File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。通常情况下，File 对象是来自用户在一个"),e("code",[t._v("<input>")]),t._v("元素上选择文件后返回的 "),e("code",[t._v("FileList对象")]),t._v("，也可以是来自由拖放操作生成的"),e("code",[t._v("DataTransfer对象")]),t._v("，继承于Blob。")]),t._v(" "),e("h3",{attrs:{id:"filereader"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#filereader"}},[t._v("#")]),t._v(" FileReader")]),t._v(" "),e("p",[e("code",[t._v("FileReader")]),e("strong",[t._v("用来读取file或blob文件数据")]),t._v("，基于文件大小不同，读取的过程为"),e("code",[t._v("异步")]),t._v("。")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" render "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileReader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nrender"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onload")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" src "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" render"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("result\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nrender"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("readAsDataURL")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("file"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("p",[t._v("FileReader读取文件方法：")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("readAsDataURL(file)")]),t._v("："),e("strong",[t._v("将文件读取为"),e("code",[t._v("Data URLs")])])]),t._v(" "),e("li",[e("code",[t._v("readAsBinaryString(file)")]),t._v("：将文件读取为二进制编码")]),t._v(" "),e("li",[e("code",[t._v("readAsBinaryArray(file)")]),t._v("：将文件读取为二进制数组")]),t._v(" "),e("li",[e("code",[t._v("readAsText(file[, encoding])")]),t._v("：按照格式将文件读取为文本，encode默认为UTF-8")])]),t._v(" "),e("h2",{attrs:{id:"blob-url-和-data-urls-base64"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#blob-url-和-data-urls-base64"}},[t._v("#")]),t._v(" "),e("code",[t._v("Blob Url")]),t._v(" 和 "),e("code",[t._v("Data URLs（base64）")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Blob Url")]),t._v("只能在浏览器中通过"),e("code",[t._v("URL.createObjectURL(blob)")]),t._v("创建，当不使用的时候，需要URL.revokeObjectURL(blobURL)来进行释放。\n"),e("ul",[e("li",[t._v("可以简单理解为对应浏览器"),e("code",[t._v("内存文件中的软链接")]),t._v("。该链接"),e("code",[t._v("只能存在于浏览器")]),t._v("单一实例或对应"),e("code",[t._v("会话中")]),t._v("（例如：页面的生命周期）")]),t._v(" "),e("li",[e("code",[t._v("blobURL = URL.createObjectURL(blob)")])])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("例如\nblob:http://localhost:8000/xxxxxxxx\n")])])])]),t._v(" "),e("li",[e("code",[t._v("Data URLs")]),t._v("可以获取文件的"),e("code",[t._v("base64编码")]),t._v("。"),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("data:[<mediatype>][;base64],<data>\n")])])]),e("ul",[e("li",[t._v('mediatype是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII')]),t._v(" "),e("li",[t._v("可以通过FileReader.readAsDataURL获取"),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" reader "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileReader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nreader"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"load"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" dataURL "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("result"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nreader"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("readAsDataURL")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("blob"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])]),t._v(" "),e("h2",{attrs:{id:"图片预览实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#图片预览实现"}},[t._v("#")]),t._v(" 图片预览实现")]),t._v(" "),e("h3",{attrs:{id:"获取图片地址的两种方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取图片地址的两种方法"}},[t._v("#")]),t._v(" 获取图片地址的两种方法")]),t._v(" "),e("p",[t._v("两种方法都可以：")]),t._v(" "),e("ul",[e("li",[t._v("通过"),e("code",[t._v("URL.createObjectURL(blob)")]),t._v("可以获取当前文件的一个"),e("code",[t._v("blob内存url")]),t._v("。")]),t._v(" "),e("li",[t._v("通过"),e("code",[t._v("FileReader.readAsDataURL(file)")]),t._v("可以获取一段"),e("code",[t._v("data:base64的字符串")]),t._v("。")])]),t._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[t._v("它们的区别")]),t._v(" "),e("ol",[e("li",[t._v("执行时机\n"),e("ul",[e("li",[e("code",[t._v("createObjectURL")]),t._v("是"),e("strong",[t._v("同步执行")]),t._v("（立即的）")]),t._v(" "),e("li",[e("code",[t._v("FileReader.readAsDataURL")]),t._v("是"),e("strong",[t._v("异步执行")]),t._v("（过一段时间）")])])]),t._v(" "),e("li",[t._v("内存使用\n"),e("ul",[e("li",[e("code",[t._v("createObjectURL")]),t._v("返回一段带hash的url，并且一直"),e("strong",[t._v("存储在内存中")]),t._v("，直到document触发了unload事件（例如：document close）或者执行revokeObjectURL来释放。")]),t._v(" "),e("li",[e("code",[t._v("FileReader.readAsDataURL")]),t._v("则返回包含很多字符的base64，并会比blob url"),e("strong",[t._v("消耗更多内存")]),t._v("，但是在不用的时候会自动从内存中清除（通过垃圾回收机制）")])])]),t._v(" "),e("li",[t._v("兼容性\n"),e("ul",[e("li",[e("code",[t._v("createObjectURL")]),t._v("IE10往上")]),t._v(" "),e("li",[e("code",[t._v("FileReader.readAsDataURL")]),t._v("IE10往上")])])])])]),t._v(" "),e("h3",{attrs:{id:"方式1-bloburl-url-createobjecturl-blob"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方式1-bloburl-url-createobjecturl-blob"}},[t._v("#")]),t._v(" 方式1-blobUrl：URL.createObjectURL(blob)")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" file "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'file'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" img "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'img'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nfile"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'change'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" obj "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" file"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("files"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" src "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token constant"}},[t._v("URL")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("createObjectURL")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    img"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" src"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h3",{attrs:{id:"方式2-base64-filereader-readasdataurl-file"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方式2-base64-filereader-readasdataurl-file"}},[t._v("#")]),t._v(" 方式2-base64：FileReader.readAsDataURL(file)")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" file "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'file'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" img "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'img'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nfile"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'change'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" obj "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" file"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("files"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" reader "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileReader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    reader"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("readAsDataURL")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    reader"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onloadend")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        img"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reader"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("result"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),e("h2",{attrs:{id:"base64"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#base64"}},[t._v("#")]),t._v(" base64")]),t._v(" "),e("h3",{attrs:{id:"作用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#作用"}},[t._v("#")]),t._v(" 作用")]),t._v(" "),e("p",[t._v("Base64编码主要用在：")]),t._v(" "),e("ul",[e("li",[t._v("应用于"),e("code",[t._v("传输、存储和表示二进制")]),t._v("等领域：\n"),e("ul",[e("li",[t._v("因为在参数传输的过程中经常遇到的一种情况：使用全英文的没问题，但一旦涉及到中文就会出现乱码情况。")]),t._v(" "),e("li",[t._v("网络上传输的字符并不全是可打印的字符，比如二进制文件、图片等。Base64的出现就是为了解决此问题，它是"),e("code",[t._v("基于64个可打印的字符来表示二进制的数据的一种方法")]),t._v("。")])])]),t._v(" "),e("li",[t._v("还可以"),e("code",[t._v("用来加密")]),t._v("，但是这种加密比较简单，只是一眼看上去不知道什么内容罢了，当然也可以对Base64的字符序列进行定制来进行加密。")])]),t._v(" "),e("h3",{attrs:{id:"特点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[t._v("#")]),t._v(" 特点")]),t._v(" "),e("ul",[e("li",[t._v("大多数的编码，都是由字符转化成二进制的过程，而从二进制转成字符的过程称为解码。但"),e("strong",[t._v("Base64恰好相反")]),t._v("，由二进制转到字符称为编码，由字符到二进制称为解码。")]),t._v(" "),e("li",[t._v("可以将任意的二进制数据进行Base64编码。")]),t._v(" "),e("li",[t._v("所有的数据都能被编码为只用"),e("code",[t._v("65")]),t._v("个字符就能表示的文本文件。")]),t._v(" "),e("li",[t._v("对文件或字符串进行Base64编码后将比原始大小增加33%。")]),t._v(" "),e("li",[t._v("不够安全，但却被很多加密算法作为编码方式。")]),t._v(" "),e("li",[t._v("能够逆运算。")])]),t._v(" "),e("p",[e("strong",[t._v("base64索引表:")])]),t._v(" "),e("img",{attrs:{src:s(519),title:"base64索引表",alt:"base64索引表",height:"500"}}),t._v(" "),e("h3",{attrs:{id:"编码原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编码原理"}},[t._v("#")]),t._v(" 编码原理")]),t._v(" "),e("p",[e("img",{attrs:{src:s(520),alt:"base64编码原理"}}),t._v("\n以上图编码"),e("strong",[t._v("Man")]),t._v("为例：")]),t._v(" "),e("ul",[e("li",[t._v("1）将所有"),e("code",[t._v("字符")]),t._v("转化为"),e("code",[t._v("ASCII码")]),t._v("；")]),t._v(" "),e("li",[t._v("2）将"),e("code",[t._v("ASCII码")]),t._v("转化为"),e("code",[t._v("8位二进制")]),t._v("（即1字节，1byte = 8bit）；")]),t._v(" "),e("li",[t._v("3）"),e("strong",[t._v("3个byte")]),t._v("一组(不足3个在后边补0)"),e("strong",[t._v("共24位")]),t._v("，再拆分"),e("strong",[t._v("成4组")]),t._v("，"),e("strong",[t._v("每组6位")]),t._v("；")]),t._v(" "),e("li",[t._v("4）统一在6位二进制前补两个0"),e("strong",[t._v("凑足8位")]),t._v("；")]),t._v(" "),e("li",[t._v("5）将"),e("code",[t._v("补0后的二进制")]),t._v("转为"),e("code",[t._v("十进制")]),t._v("；")]),t._v(" "),e("li",[t._v("6）从Base64编码表获取十进制对应的"),e("code",[t._v("Base64编码")]),t._v("；")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("Man     base64编码结果:    TWFu\nA       base64编码结果:    QQ==\nBC      base64编码结果:    QKM=\n")])])]),e("p",[e("strong",[t._v("注意：")]),e("code",[t._v("=")]),t._v("并不在64个索引表字符中，这是因为对于转换结果，必须是4个索引字符一组，如果转换结果不足4个字符，则在末尾需要用填充字符"),e("code",[t._v("=")]),t._v("来补。")]),t._v(" "),e("h2",{attrs:{id:"参考链接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[t._v("#")]),t._v(" 参考链接")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://juejin.im/post/5b890c386fb9a019c771713a#heading-11",target:"_blank",rel:"noopener noreferrer"}},[t._v("少侠，留步，图片预览术"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://juejin.im/post/5bd705abf265da0a8d36dbdc#heading-10",target:"_blank",rel:"noopener noreferrer"}},[t._v("H5拍照上传填坑汇总"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.jianshu.com/p/bd4ac318d359",target:"_blank",rel:"noopener noreferrer"}},[t._v("base64编码原理和过程"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=n.exports}}]);