(window.webpackJsonp=window.webpackJsonp||[]).push([[165],{706:function(v,e,_){"use strict";_.r(e);var t=_(14),a=Object(t.a)({},(function(){var v=this,e=v.$createElement,_=v._self._c||e;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"_11、react-vue"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_11、react-vue"}},[v._v("#")]),v._v(" 11、React & Vue")]),v._v(" "),_("p",[v._v("React 只是专注于数据到视图的转换，而 Vue 则是典型的 MVVM，带有双向绑定。")]),v._v(" "),_("h2",{attrs:{id:"事件差异"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事件差异"}},[v._v("#")]),v._v(" 事件差异")]),v._v(" "),_("h3",{attrs:{id:"react-事件机制"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#react-事件机制"}},[v._v("#")]),v._v(" React 事件机制")]),v._v(" "),_("ol",[_("li",[v._v("React原生事件被包装成合成事件，通过事件代理，所有事件都冒泡到顶层document监听（17版本绑定到rootNode上），然后在这里合成事件下发，统一管理事件。基于这套，可以跨端使用事件机制，而不是和Web DOM强绑定。")]),v._v(" "),_("li",[v._v("React组件上无事件，父子组件通信使用props")])]),v._v(" "),_("h3",{attrs:{id:"vue-事件机制"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vue-事件机制"}},[v._v("#")]),v._v(" Vue 事件机制")]),v._v(" "),_("p",[v._v("Vue 支持 2 种事件类型，原生DOM事件 和 自定义事件。")]),v._v(" "),_("ol",[_("li",[v._v("Vue原生DOM事件使用标准Web事件："),_("code",[v._v("普通 DOM 元素")]),v._v("和在组件上挂了"),_("code",[v._v(".native")]),v._v(" 修饰符的事件。最终调用的还是原生的 "),_("code",[v._v("addEventListener()")]),v._v(" 方法 ( 源码：target.addEventListener())。")]),v._v(" "),_("li",[v._v("Vue自定义事件机制：只有组件节点才可以添加自定义事件，组件上的自定义事件会调用 Vue 原型上的"),_("code",[v._v("$on")]),v._v("，"),_("code",[v._v("$emit")]),v._v("方法，实现父子组件通信。")])]),v._v(" "),_("h3",{attrs:{id:"提问"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#提问"}},[v._v("#")]),v._v(" 提问")]),v._v(" "),_("ul",[_("li",[v._v("Q：React自己实现了一套合成事件机制，而Vue却没有实现自己的事件系统。那么既然React的合成事件，具有跨平台，抹平兼容性差异，统一管理事件，性能好等优点，那为什么Vue没有做这件事呢？")]),v._v(" "),_("li",[v._v("A：React 使用合成事件的背景，是 React 想要做跨平台，不仅仅是做 web。而 Vue 目前没看到那个野心。React合成事件的优点是非常明显，但同时也非常复杂，实现起来还不知道要改多少 bug 呢。软件开发也得考虑成本和时间。")])]),v._v(" "),_("h2",{attrs:{id:"diff差异"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#diff差异"}},[v._v("#")]),v._v(" diff差异")]),v._v(" "),_("p",[_("a",{attrs:{href:"https://www.imooc.com/article/295545",target:"_blank",rel:"noopener noreferrer"}},[v._v("浅谈 React/Vue/Inferno 在 DOM Diff 算法上的异同"),_("OutboundLink")],1)]),v._v(" "),_("h3",{attrs:{id:"概述"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[v._v("#")]),v._v(" 概述")]),v._v(" "),_("ul",[_("li",[v._v("Vue和React的diff算法，都是"),_("code",[v._v("同级比较，深度优先")]),v._v("。")]),v._v(" "),_("li",[v._v("React是fiber架构，是个单链表，只能单向遍历，并且使用diff队列保存需要更新哪些DOM，得到patch树后，再统一操作批量更新DOM；而Vue Diff使用双向链表，双端遍历比较，边对比，边更新DOM。")]),v._v(" "),_("li",[v._v("Vue对比节点，当节点元素类型（tag）相同，但是属性不同，认为是不同类型元素，删除重建；而React会认为是同类型节点，只是修改节点属性")]),v._v(" "),_("li",[v._v("Vue的列表对比，采用从4指针双端比较，而React则采用从左到右单向遍历对比的方式。二者最不利情形都是"),_("code",[v._v("序列倒序")]),v._v("，需要N-1次移动，而对于"),_("code",[v._v("末尾移到首位")]),v._v("的情形，Vue只需一次移动，而React依然是最差的N-1次移动。总体上，Vue的对比方式相比于React更高效。")])]),v._v(" "),_("h3",{attrs:{id:"react-diff"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#react-diff"}},[v._v("#")]),v._v(" React diff")]),v._v(" "),_("p",[v._v("通过 三大策略 进行优化，将O(n^3)复杂度 转化为 O(n)复杂度:")]),v._v(" "),_("ul",[_("li",[v._v("1、策略一（"),_("em",[v._v("tree diff")]),v._v("），只同层级比较")]),v._v(" "),_("li",[v._v("2、策略二（"),_("em",[v._v("component diff")]),v._v("），相同类的两个组件，生成相似的树形结构，不同类的两个组件，生成不同的树形结构")]),v._v(" "),_("li",[v._v("3、策略三（"),_("em",[v._v("element diff")]),v._v("）：对于同一层级的一组子节点，通过唯一key区分。")])]),v._v(" "),_("p",[v._v("diffing算法复杂度O(n)，按照"),_("code",[v._v("同层比较，深度优先")]),v._v("的顺序，遍历比较一遍，过程如下：")]),v._v(" "),_("ul",[_("li",[v._v("深度优先比较")]),v._v(" "),_("li",[v._v("不在同一层级，根本不比较")]),v._v(" "),_("li",[v._v("同一层级下：\n"),_("ul",[_("li",[v._v("oldVnode不存在时，直接新增")]),v._v(" "),_("li",[v._v("newVnode不存在时，直接删除")]),v._v(" "),_("li",[v._v("key或type有一者不同，直接替换")]),v._v(" "),_("li",[v._v("key和type相同\n"),_("ul",[_("li",[v._v("oldVnode和newVnode相同，复用节点")]),v._v(" "),_("li",[v._v("oldVnode和newVnode不同，更新节点")])])])])])]),v._v(" "),_("h4",{attrs:{id:"列表diff"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#列表diff"}},[v._v("#")]),v._v(" 列表diff")]),v._v(" "),_("ul",[_("li",[v._v("React 的 DOM diff过程，设定 Virtual DOM 的"),_("code",[v._v("首个节点不执行移动")]),v._v("（除非它要被移除），以该节点为原点，其它节点通过从左到右单向比较，都去寻找自己的新位置；")]),v._v(" "),_("li",[v._v("对该算法最不利情形是"),_("code",[v._v("序列倒序")]),v._v("。比如从【A、B、C、D】转换为【D、C、B、A】，除了首个节点外，其它所有节点都需要移动，对于有 N 个节点的数组，总共 "),_("strong",[v._v("N-1次移动")]),v._v("。")]),v._v(" "),_("li",[_("code",[v._v("末尾移到首位")]),v._v("，比如从【A、B、C、D】变成【D、A、B、C】，React 它会怎么做：\n"),_("ol",[_("li",[v._v("节点D是首个节点，不执行移动。")]),v._v(" "),_("li",[v._v("节点A移动到节点D后面：【B、C、D、A】；")]),v._v(" "),_("li",[v._v("节点B移动到节点A后面：【C、D、A、B】；")]),v._v(" "),_("li",[v._v("节点C移动到节点B后面：【D、A、B、C】。")])]),v._v(" "),_("ul",[_("li",[v._v("还是"),_("strong",[v._v("N-1次移动")]),v._v("。"),_("code",[v._v("首个节点不执行移动")]),v._v("这个特性，导致了只要把末尾节点移动到首位，就会引起 "),_("strong",[v._v("N-1次移动")]),v._v(" 这种最坏的 DOM Diff 过程，所以大家要尽可能避免这种重排序。")])])]),v._v(" "),_("li",[v._v("React 假定最大递增子序列从0开始，在末尾节点移动到首位的场景中会恶化；")])]),v._v(" "),_("h3",{attrs:{id:"vue-diff"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vue-diff"}},[v._v("#")]),v._v(" Vue diff")]),v._v(" "),_("p",[v._v("优化到O(n)：")]),v._v(" "),_("ul",[_("li",[_("em",[v._v("只比较同一层级，不跨级比较")])]),v._v(" "),_("li",[_("em",[v._v("tag不相同")]),v._v("，则认为是不同节点，直接删掉重建，不再深度比较")]),v._v(" "),_("li",[_("em",[v._v("tag和key两者都相同")]),v._v("，则认为是相同节点，不再深度比较")])]),v._v(" "),_("p",[v._v("过程：")]),v._v(" "),_("ul",[_("li",[v._v("首先进行"),_("code",[v._v("树级别比较patch()")]),v._v("，"),_("strong",[v._v("同层比较，深度优先")]),v._v("，可能有三种情况："),_("strong",[v._v("增删改")]),v._v("。\n"),_("ul",[_("li",[v._v("new VNode不存在就删；")]),v._v(" "),_("li",[v._v("old VNode不存在就增；")]),v._v(" "),_("li",[v._v("都存在就改，执行diff更新："),_("code",[v._v("递归更新节点patchVnode()")]),v._v(" "),_("ul",[_("li",[v._v("执行patchVnode，一定是判断为两个相同的节点，即sameVnode()：key相同、tag相同")]),v._v(" "),_("li",[_("em",[v._v("sameVnode(vnode1, vnode2)，如果没有key（即key为undefined），那么tag相同时，key都是undefined也相同，则就是相同节点")])]),v._v(" "),_("li",[v._v("比较两个VNode，包括三种类型操作："),_("strong",[v._v("属性更新、文本更新、子节点更新")]),v._v(" "),_("ul",[_("li",[v._v("属性更新：xxxxx")]),v._v(" "),_("li",[v._v("text文本和children子节点是互斥的：\n"),_("ul",[_("li",[v._v("1、当"),_("strong",[v._v("新老节点都无子节点")]),v._v("，只是文本的替换。")]),v._v(" "),_("li",[v._v("2、当"),_("strong",[v._v("新节点有子节点而老节点没有子节点")]),v._v("，先清空老节点的文本内容，然后为其新增子节点。")]),v._v(" "),_("li",[v._v("3、当"),_("strong",[v._v("新节点没有子节点而老节点有子节点")]),v._v("，则移除该节点的所有子节点。")]),v._v(" "),_("li",[v._v("4、新老节点"),_("strong",[v._v("均有children子节点")]),v._v("，则对子节点进行diff操作，调用"),_("code",[v._v("updateChildren重排子节点")]),v._v("：")])])])])])])])])])]),v._v(" "),_("h4",{attrs:{id:"列表diff-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#列表diff-2"}},[v._v("#")]),v._v(" 列表diff")]),v._v(" "),_("ul",[_("li",[v._v("Vue 的 DOM Diff 过程就是一个查找排序的过程（使用了双向遍历的方式，加速了遍历的速度），遍历 Virtual DOM 的节点，在 Real DOM 中找到对应的节点，并移动到新的位置上。")]),v._v(" "),_("li",[v._v("对该算法最不利情形也是"),_("code",[v._v("序列倒序")]),v._v("。比如从【A、B、C、D】转换为【D、C、B、A】，算法将执行"),_("strong",[v._v("N-1次移动")]),v._v("，与 React 相同，并没有更坏。")]),v._v(" "),_("li",[_("code",[v._v("末尾移到首位")]),v._v("，序列【A、B、C、D】转换为【D、A、B、C】，看一下 Vue 的算法表现如何：\n"),_("ul",[_("li",[v._v("在第一轮比较中，Real DOM 的末尾节点D与 Virtual DOM 的首节点D相同，那么就把节点D移动到首位，变成【D、A、B、C】，直接一步到位，高效完成了转换。")])])]),v._v(" "),_("li",[v._v("Vue 利用双端比较遍历排序的方法，有可能不是最优解，但与最优解十分逼近。")])]),v._v(" "),_("p",[v._v("因此，在实际的业务开发中，无论是Vue还是React，"),_("code",[v._v("序列倒序")]),v._v("都是最应该被避免的场景。而对于 React 还应注意末尾节点的问题。除此之外，没有什么特别需要担心的。")]),v._v(" "),_("h2",{attrs:{id:"变化侦测的方式差异"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#变化侦测的方式差异"}},[v._v("#")]),v._v(" 变化侦测的方式差异")]),v._v(" "),_("p",[v._v("既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行diff检测差异? 「pull、push」")]),v._v(" "),_("p",[v._v("现代前端框架有两种方式进行「变化侦测」，一种是pull，一种是push。")]),v._v(" "),_("h3",{attrs:{id:"pull"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#pull"}},[v._v("#")]),v._v(" pull")]),v._v(" "),_("ul",[_("li",[_("code",[v._v("React")]),v._v(" 的 setState 和（早期）Angular 的脏检查都是 "),_("code",[v._v("pull")]),v._v("：即 系统不知道数据是否已改变，需要进行 pull。")]),v._v(" "),_("li",[v._v("以React为例，用 setState API显式更新，然后React会进行一层层的 VDOM Diff操作找出差异，之后Patch到DOM上。也就是说，React从一开始就不知道到底是哪发生了变化，只是知道 “有变化了”，然后再进行比较暴力的Diff操作查找 “哪发生变化了”。")])]),v._v(" "),_("h3",{attrs:{id:"push"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#push"}},[v._v("#")]),v._v(" push")]),v._v(" "),_("ul",[_("li",[v._v("相比之下 push 在数据变动时会立刻知道哪些数据改变，但这里还有个粒度问题。如果 pull 是完全粗粒度的，那么 push 可以进行更细粒度的更新。push 方式 要做到 粒度掌控，就需要付出 相应内存开销、建立依赖追踪开销的代价。")]),v._v(" "),_("li",[v._v("以"),_("code",[v._v("Vue")]),v._v("为例，当 Vue 初始化时，就会对数据data进行依赖收集，一但数据发生变化，响应式系统就会立刻知道 “在哪发生变化了”。而Vue的每一次数据绑定，就需要一个Watcher，如果粒度过细，就会有太多的Watcher，开销太大，但如果粒度过粗，又无法精准侦测变化。")]),v._v(" "),_("li",[v._v("因此，Vue 选择的是中间的 "),_("strong",[v._v("「混合式："),_("code",[v._v("push + pull")]),v._v("」")]),v._v("：Vue在"),_("code",[v._v("组件级别")]),v._v("选择 push方式，每个组件都是 Watcher，一旦某个组件发生变化Vue立刻就能知道；而在组件内部选择 pull方式，使用 VDOM Diff 进行比较。")])]),v._v(" "),_("h3",{attrs:{id:"vue为什么没有类似于react中shouldcomponentupdate的生命周期"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vue为什么没有类似于react中shouldcomponentupdate的生命周期"}},[v._v("#")]),v._v(" Vue为什么没有类似于React中shouldComponentUpdate的生命周期？")]),v._v(" "),_("p",[v._v("承接上文：")]),v._v(" "),_("ul",[_("li",[v._v("首先，React是以 pull 的方式侦测变化的，因为不能知道到底哪里发生了变化，所以会进行大量 VDOM Diff 差异检测，为了提升性能，就可以使用 SCU（shouldComponentUpdate）来避免对那些肯定不会变化的组件进行Diff检测。")]),v._v(" "),_("li",[v._v("而Vue在组件级是push方式，在push阶段能够自动判断，无需手动控制Diff。在组件内是pull的方式，理论上是可以引入类似于 SCU的钩子来让开发者控制的，但是，通常合理大小的组件不会有过量的Diff 检测，手动优化的价值有限。因此Vue没有引入SCU。")])])])}),[],!1,null,null,null);e.default=a.exports}}]);