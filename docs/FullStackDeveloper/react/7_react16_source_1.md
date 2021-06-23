# 7、react16 源码解析 1

-   [React 中文网](https://react.docschina.org/)
-   [React 源码](https://github.com/facebook/react)
-   [Debug React](https://github.com/bubucuo/DebugReact)
-   [源码指引](https://www.processon.com/view/link/5dd68342e4b001fa2e0c4697)

## 目录

-   虚拟 DOM
-   JSX
-   React 核心 API
    -   React
        -   CreateElement
        -   Component
    -   ReactDOM
        -   render

## 虚拟 DOM 补充介绍

React 本身只是一个 DOM 的抽象层，使用组件构建虚拟 DOM。

::: details 一个真实 DOM 元素 div 有多大？

```js
var div = document.createElement('div');
var str = '';
for (var key in div) {
    str += '' + key;
}

('aligntitlelangtranslatedirhiddenaccessKeydraggablespellcheckautocapitalizecontentEditableisContentEditableinputModeoffsetParentoffsetTopoffsetLeftoffsetWidthoffsetHeightstyleinnerTextouterTextoncopyoncutonpasteonabortonbluroncanceloncanplayoncanplaythroughonchangeonclickoncloseoncontextmenuoncuechangeondblclickondragondragendondragenterondragleaveondragoverondragstartondropondurationchangeonemptiedonendedonerroronfocusonformdataoninputoninvalidonkeydownonkeypressonkeyuponloadonloadeddataonloadedmetadataonloadstartonmousedownonmouseenteronmouseleaveonmousemoveonmouseoutonmouseoveronmouseuponmousewheelonpauseonplayonplayingonprogressonratechangeonresetonresizeonscrollonseekedonseekingonselectonstalledonsubmitonsuspendontimeupdateontoggleonvolumechangeonwaitingonwebkitanimationendonwebkitanimationiterationonwebkitanimationstartonwebkittransitionendonwheelonauxclickongotpointercaptureonlostpointercaptureonpointerdownonpointermoveonpointeruponpointercancelonpointeroveronpointeroutonpointerenteronpointerleaveonselectstartonselectionchangeonanimationendonanimationiterationonanimationstartontransitionenddatasetnonceautofocustabIndexclickattachInternalsfocusblurenterKeyHintonpointerrawupdatenamespaceURIprefixlocalNametagNameidclassNameclassListslotattributesshadowRootpartassignedSlotinnerHTMLouterHTMLscrollTopscrollLeftscrollWidthscrollHeightclientTopclientLeftclientWidthclientHeightattributeStyleMaponbeforecopyonbeforecutonbeforepasteonsearchelementTimingpreviousElementSiblingnextElementSiblingchildrenfirstElementChildlastElementChildchildElementCountonfullscreenchangeonfullscreenerroronwebkitfullscreenchangeonwebkitfullscreenerrorhasAttributesgetAttributeNamesgetAttributegetAttributeNSsetAttributesetAttributeNSremoveAttributeremoveAttributeNStoggleAttributehasAttributehasAttributeNSgetAttributeNodegetAttributeNodeNSsetAttributeNodesetAttributeNodeNSremoveAttributeNodeattachShadowclosestmatcheswebkitMatchesSelectorgetElementsByTagNamegetElementsByTagNameNSgetElementsByClassNameinsertAdjacentElementinsertAdjacentTextsetPointerCapturereleasePointerCapturehasPointerCaptureinsertAdjacentHTMLrequestPointerLockgetClientRectsgetBoundingClientRectscrollIntoViewscrollscrollToscrollByscrollIntoViewIfNeededanimatecomputedStyleMapbeforeafterreplaceWithremoveprependappendquerySelectorquerySelectorAllrequestFullscreenwebkitRequestFullScreenwebkitRequestFullscreenonbeforexrselectariaAtomicariaAutoCompleteariaBusyariaCheckedariaColCountariaColIndexariaColSpanariaCurrentariaDisabledariaExpandedariaHasPopupariaHiddenariaKeyShortcutsariaLabelariaLevelariaLiveariaModalariaMultiLineariaMultiSelectableariaOrientationariaPlaceholderariaPosInSetariaPressedariaReadOnlyariaRelevantariaRequiredariaRoleDescriptionariaRowCountariaRowIndexariaRowSpanariaSelectedariaSetSizeariaSortariaValueMaxariaValueMinariaValueNowariaValueTextariaDescriptiongetAnimationsELEMENT_NODEATTRIBUTE_NODETEXT_NODECDATA_SECTION_NODEENTITY_REFERENCE_NODEENTITY_NODEPROCESSING_INSTRUCTION_NODECOMMENT_NODEDOCUMENT_NODEDOCUMENT_TYPE_NODEDOCUMENT_FRAGMENT_NODENOTATION_NODEDOCUMENT_POSITION_DISCONNECTEDDOCUMENT_POSITION_PRECEDINGDOCUMENT_POSITION_FOLLOWINGDOCUMENT_POSITION_CONTAINSDOCUMENT_POSITION_CONTAINED_BYDOCUMENT_POSITION_IMPLEMENTATION_SPECIFICnodeTypenodeNamebaseURIisConnectedownerDocumentparentNodeparentElementchildNodesfirstChildlastChildpreviousSiblingnextSiblingnodeValuetextContenthasChildNodesgetRootNodenormalizecloneNodeisEqualNodeisSameNodecompareDocumentPositioncontainslookupPrefixlookupNamespaceURIisDefaultNamespaceinsertBeforeappendChildreplaceChildremoveChildaddEventListenerremoveEventListenerdispatchEvent');
```

:::

DOM 操作其实也不慢，但

-   如果你要更新视图，首先要知道哪些 DOM 要更新，要如何更新，这就需要 diff 比较，如果直接用真实 DOM 去比较，真实 DOM 很庞大，比较起来太耗费性能。
-   而如果视图更新时，不比较直接将所有 DOM 更新，首先是进行了大量不必要的更新，并且更新 DOM 会造成视图闪烁，直接更新太过武断。

## InchReact 实现

### 主要实现点

-   createElement
    -   jsx 被 babel-loader 编译后传入 createElement(type, config, children)
    -   return ReactElement
-   ReactDOM.render
    1. vnode => node，const node = createNode(vnode)
        - 区分节点类型：
            - 文本节点
            - html 标签节点
            - 哪种组件节点，isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
            - 空节点，</>或 Fragment
        - 遍历调和子节点
    2. container.appendChild(node)
-   defaultProps 实现
-   Component 实现

    -   定义 setState
    -   定义 forceUpdate
    -   定义 isReactComponent

    ```js
    Component.prototype.setState = function (partialState, callback) {
        this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    Component.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    // 判断是不是类组件，从而区分是类组件还是函数式组件（不能用typeof来判断，因为都是Function）
    // 这里预期是个bool值，但源码是实现成了一个对象，应该是为了扩展
    Component.prototype.isReactComponent = {};
    ```

### 代码

-   src/index.js

```js
// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import React from './InchReact/';
import ReactDOM from './InchReact/react-dom';
import Component from './InchReact/Component';
import './index.css';

class ClassComponent extends Component {
    static defaultProps = {
        color: 'pink',
    };
    render() {
        return (
            <div className='border'>
                {this.props.name}
                <p className={this.props.color}>{this.props.name}</p>
            </div>
        );
    }
}

function FunctionComponent(props) {
    return (
        <div className='border'>
            <span className={props.color}>{props.name}</span>
        </div>
    );
}

FunctionComponent.defaultProps = {
    color: 'pink',
};

const jsx = (
    <div className='border'>
        <p>全栈</p>
        <a href='https://johninch.github.io/Roundtable'>RoundTable</a>
        <ClassComponent name='class component' color='red' />
        <FunctionComponent name='function component' />

        <>
            <li>Inch</li>
            <li>Amy</li>
        </>
    </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

-   InchReact/index.js：React 主要包含两个东西 { createElement, Component }

```js
import { TEXT } from './const';

function createElement(type, config, ...children) {
    if (config) {
        delete config.__self;
        delete config.__source;
    }

    let defaultProps = {};
    if (type && type.defaultProps) {
        defaultProps = { ...type.defaultProps };
    }

    // !先不考虑key和ref的特殊情况
    const props = {
        ...defaultProps,
        ...config,
        children: children.map(child => (typeof child === 'object' ? child : createTextNode(child))),
    };

    return {
        type,
        props,
    };
}

// 把文本节点变成对象的形式，方便统一简洁处理，当然源码当中没这样做，我们是为了逻辑清晰
function createTextNode(text) {
    return {
        type: TEXT,
        props: {
            children: [],
            nodeValue: text,
        },
    };
}

export default { createElement };
```

-   InchReact/Component.js

```js
class Component {
    // 我们这里使用类组件实现，而源码中是用函数组件实现的
    // 之所以定义成静态方法，是方便从type上获取
    // 如果写成实例方法，对于类组件，就必须先实例化再使用，显然是不合理的
    static isReactComponent = {};

    constructor(props) {
        this.props = props;
    }
}

// 写成函数组件也可以，源码中就是函数组件
// function Component(props) {
//     this.props = props
// }
// 源码中的isReactComponent是实例方法
// Component.prototype.isReactComponent = {}

export default Component;
```

-   InchReact/react-dom.js：这里我们把 react-dom 的实现也一并放在 React 中，但源码是分开的库

```js
import { TEXT } from './const';

function render(vnode, container) {
    // todo
    // 1.vnode => node
    const node = createNode(vnode);
    // 2.container.appendChild(node)
    container.appendChild(node);
}

// 生成真实dom节点
function createNode(vnode) {
    let node = null;
    const { type, props } = vnode;

    if (type === TEXT) {
        // 创建文本节点
        node = document.createTextNode('');
    } else if (typeof type === 'string') {
        // 证明是个html标签节点，比如div span
        node = document.createElement(type);
    } else if (typeof type === 'function') {
        // 类组件 或者 函数组件
        node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
    } else {
        // 空的Fragment或</>的形式，没有type
        node = document.createDocumentFragment();
    }

    // 遍历调和子节点
    reconcileChildren(props.children, node);
    // 添加属性到真实dom上
    updateNode(node, props);

    return node;
}

function reconcileChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        // child是vnode，那需要把vnode => node，然后插入父节点node中
        render(child, node);
    }
}

function updateNode(node, nextVal) {
    Object.keys(nextVal)
        .filter(k => k !== 'children')
        .forEach(k => {
            node[k] = nextVal[k];
        });
}

function updateClassComponent(vnode) {
    const { type, props } = vnode;
    const cmp = new type(props); // 类组件需要new实例
    const vvnode = cmp.render();

    // 返回真实dom节点
    const node = createNode(vvnode);
    return node;
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const vvnode = type(props); // 函数组件直接执行返回虚拟dom

    const node = createNode(vvnode);
    return node;
}

export default { render };
```

### 补充知识点

#### createElement 中的 config

```js
function createElement(type, config, children) {
    // ...

    // 返回 a new ReactElement
    return ReactElement(type, key, ref, self, source, owner, props);
}
```

config 包括 3 大块儿，key，ref，props。这也是为什么 key 和 ref 不能通过 props 传递，会被过滤掉。

::: warning 特殊的 props
大部分 JSX 元素上的 props 都会被传入组件，然而，有两个特殊的 props （`ref 和 key`） **已经被 React 所使用，因此不会被传入组件**。

举个例子，在组件中试图获取 this.props.key（比如通过 render 函数或 propTypes）将得到 undefined。如果你需要在子组件中获取相同的值，你应该用一个不同的 prop 来传入它，例如：

```html
<ListItemWrapper key="{result.id}" id="{result.id}" />
```

虽然这似乎是多余的，但是将应用程序逻辑和协调提示（reconciliation hints）分开是很重要的。
:::

#### cloneElement

```js
// Clone and return a new ReactElement using element as the starting point.
function cloneElement(element, config, children) {
    // 做复制操作，并添加新属性

    return ReactElement(element.type, key, ref, self, source, owner, props);
}
```

实现：

```js
function cloneElement(element, config, ...children) {
    const props = Object.assign({}, element.props);

    let defaultProps = {};
    if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
    }

    for (let propName in config) {
        if (propName !== 'key' && propName !== 'ref') {
            let val = config[propName] || defaultProps[propName];
            val && (props[propName] = val);
        }
    }

    return {
        key: element.key || config.key || '',
        type: element.type,
        props,
    };
}
```

#### isValidElement

```js
export function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
```

#### 包裹多个子元素

::: warning 渲染多个子元素时使用的包裹元素

`div、</>、Fragment`

首先，渲染多个子元素必须加 key，否则会报错（如果不加，在 diff 时，因为节点的 type 都相同，react 只能根据 index 去 diff 和复用，因为索引不稳定，所以无法确定唯一性，容易出错）

再者，包裹元素可以有如下 3 种形式，它们的区别为：

-   `div或其他标签`：会多一个无用的 div 标签包裹
-   `</>`：</>标签可以包裹，渲染时会去掉也就没有无用标签，但问题是，传入的 key 也会被丢掉。因此只能在不需要传参数时使用</>
-   `Fragment`：可以解决 2 中的问题，既不会渲染无用标签，但 key 值可以正常传入。因此用到属性的时候要用 Fragment

```js
// 1、会多一个无用的div标签包裹
{[1, 2].map(item => (
    <div key={item}>
        <p>{item}</p>
        <p>omg-{item}</p>
    </div>
))}

// 2、</>标签可以包裹，渲染时会去掉也就没有无用标签，但问题是，传入的key也会被丢掉。因此只能在不需要传参数时使用</>
{[1, 2].map(item => (
    <key={item}>
        <p>{item}</p>
        <p>omg-{item}</p>
    </>
))}

// 3、Fragment可以解决2中的问题，既不会渲染无用标签，但key值可以正常传入。因此用到属性的时候要用Fragment
{[1, 2].map(item => (
    <React.Fragment key={item}>
        <p>{item}</p>
        <p>omg-{item}</p>
    </React.Fragment>
))}
```

:::
