(window.webpackJsonp=window.webpackJsonp||[]).push([[147],{686:function(v,_,l){"use strict";l.r(_);var e=l(14),t=Object(e.a)({},(function(){var v=this,_=v.$createElement,l=v._self._c||_;return l("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[l("h1",{attrs:{id:"_11、中台专题"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_11、中台专题"}},[v._v("#")]),v._v(" 11、中台专题")]),v._v(" "),l("h2",{attrs:{id:"什么是中台"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#什么是中台"}},[v._v("#")]),v._v(" 什么是中台")]),v._v(" "),l("ul",[l("li",[v._v("减少重复劳动\n"),l("ul",[l("li",[v._v("类似于NPM包管理，提供通用的功能抽象，使得需要完成功能的业务方能复用已有功能，减少重复工作。")])])]),v._v(" "),l("li",[v._v("赋能\n"),l("ul",[l("li",[v._v("通过提供丰富的API，提供给调用方更多种可能性。比如调用方一开始只想到通过A方案实现，但中台可以提供B方案、C方案，相比于原先的A方案来说可能是更好更高阶的，这个时候相当于中台对调用方赋予了更多可能性。")])])]),v._v(" "),l("li",[v._v("平台化\n"),l("ul",[l("li",[v._v("提供平台化的服务时（把API集中管理的平台），才能称作中台，否则，仅仅是对某些项目提供一些服务的话，只能将其称作后台。")])])])]),v._v(" "),l("div",{staticClass:"language- extra-class"},[l("pre",{pre:!0,attrs:{class:"language-text"}},[l("code",[v._v(" 电影拍摄组 A                       电影 A\n 电影拍摄组 B    =>  横店影视城  =>   电影 B\n电视剧拍摄组 C                      电视剧 C\n  ......                          ......\n")])])]),l("p",[v._v("类比到电影制作上，"),l("code",[v._v("「横店影视城」就相当于「技术中台」")]),v._v("。影视城相当于一个平台，可以被各个电影电视剧组，甚至是游客利用，影视城内的布景，可以多次复用。甚至可以给剧组提供更好的场景来完成故事，赋能。")]),v._v(" "),l("p",[l("em",[v._v("中台是一个概念，本质上是类似于一个"),l("code",[v._v("套娃")]),v._v("的概念。")])]),v._v(" "),l("h2",{attrs:{id:"中台的划分"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#中台的划分"}},[v._v("#")]),v._v(" 中台的划分")]),v._v(" "),l("p",[v._v("前台与后台之间：")]),v._v(" "),l("ul",[l("li",[v._v("技术中台\n"),l("ul",[l("li",[v._v("以下3个只是API服务，需要平台化之后才是中台：\n"),l("ul",[l("li",[v._v("GraphQL")]),v._v(" "),l("li",[v._v("PostgREST")]),v._v(" "),l("li",[v._v("Kubernetes")])])]),v._v(" "),l("li",[v._v("成熟的中台产品：\n"),l("ul",[l("li",[v._v("LeanCloud")]),v._v(" "),l("li",[v._v("Firebase")])])])])]),v._v(" "),l("li",[v._v("业务中台")]),v._v(" "),l("li",[v._v("组织中台\n"),l("ul",[l("li",[v._v("孵化中台的中台\n"),l("ul",[l("li",[v._v("（后台）Java后台，账户登录")]),v._v(" "),l("li",[v._v("（后台的后台）人脸识别平台，机器学习")]),v._v(" "),l("li",[v._v("（后台的后台的后台）计算平台，Spark/Storm")])])]),v._v(" "),l("li",[v._v("调度中台的中台\n"),l("ul",[l("li",[v._v("（前台）Weex，手淘首页事件流")]),v._v(" "),l("li",[v._v("（后台）Java后台，内容")]),v._v(" "),l("li",[v._v("（后台的后台）搭建中台，转发/去重/埋点，数据编辑")]),v._v(" "),l("li",[v._v("（后台的后台的后台）千人千面、广告、影响导购")])])])])])]),v._v(" "),l("h2",{attrs:{id:"代码概念"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#代码概念"}},[v._v("#")]),v._v(" 代码概念")]),v._v(" "),l("p",[v._v("这3个概念都可以用来做中台：")]),v._v(" "),l("ul",[l("li",[v._v("元数据（metadata），描述数据的数据\n"),l("ul",[l("li",[v._v("比如sql语句中，INT，TIMESTAMP等等都是用来描述数据项的数据")]),v._v(" "),l("li",[v._v("比如request的请求头，请求行以及response中响应头，响应行都是源数据")])])]),v._v(" "),l("li",[v._v("高阶函数\n"),l("ul",[l("li",[v._v("处理函数的函数：arr.reduce((a, b) => a + b)，reduce就是处理传入函数的函数")]),v._v(" "),l("li",[v._v("返回函数的函数：比如bodyparser就是一个传入不同元数据，返回不同函数的函数")])])]),v._v(" "),l("li",[v._v("Proxy\n"),l("ul",[l("li",[v._v("Proxy server：比如VPN，比如数据库中间件，在node后台与mysql中间转发")]),v._v(" "),l("li",[v._v("ES6 Proxy feature：方便开发者劫持对象的操作\n"),l("ul",[l("li",[v._v("getter/setter")]),v._v(" "),l("li",[v._v("Function call/construct")]),v._v(" "),l("li",[v._v("in、delete操作符")])])])])])]),v._v(" "),l("p",[v._v("作用：")]),v._v(" "),l("ul",[l("li",[v._v("元数据：生成新项目的数据库、生成接口调用")]),v._v(" "),l("li",[v._v("高阶函数：固化处理逻辑、留空处理逻辑")]),v._v(" "),l("li",[v._v("Proxy：代替用户去做某事、无感知的优化")])])])}),[],!1,null,null,null);_.default=t.exports}}]);