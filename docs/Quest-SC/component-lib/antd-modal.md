---
title: antd modal实现
tags: [antd, component, modal, portal, createPortal]
categories: component
---

# antd modal 实现

## README

基于 antd-design 封装的 Modal 组件

<!-- vim-markdown-toc GFM -->

- [传递 component 字段](#传递-component-字段)
- [关闭弹窗](#关闭弹窗)
- [传递数据](#传递数据)
- [保持 react context 上下文](#保持-react-context-上下文)

<!-- vim-markdown-toc -->

不建议直接调用这个库，为了保持项目兼容性，安装了本组件后，将`component/Modal`中的代码改为：

```typescript
import "antd-modal/modal.css"; // 还有一个css文件，主要是隐藏空的标题栏

export * from "antd-modal";
export { default } from "antd-modal"; // 不能省略，貌似TS的declaration对于 export * 会漏掉default？
```

来使用。调用时还是从`import Modal from 'components/Modal';`来获取

相对于 antd 本身的 Modal 组件，本组件是对其的再次导出，只是在其上面添加了一个`open`方法，方便使用命令式快速创建不依赖于调用位置的 Modal 弹窗。

antd 本身的 Modal 是个组件，要求必须声明式调用，实际使用时必须手动维护一个`visible`状态值来表示 Modal 的可见，这样子不方便使用，并且当同一个页面上 Modal 多了以后，管理维护也是个灾难。

我们给 Modal 扩展了一个`open`方法：

```typescript
type ModalOpen = (
	config: ModalProps & {
		component: React.ComponentType | React.ReactElement;
	}
) => {
	close(data: any): void; // 关闭弹窗，这个会使返回的result的promise状态变为resolved
	dismiss(reason: any): void; // 关闭弹窗，这个会使返回的result的promise状态变为rejected
	result: Promise<any>; // Modal关闭的promise回调，其中如果是调用close方法关闭，将会是resolved状态，dismiss关闭的话这是rejected状态
	render(newContent: React.ComponentType | React.ReactElement<any>): void;
};
```

建议总是使用`Modal.open`来创建弹窗，它接受所有的 antd 本身的 Modal 所支持的所有 props 当作参数，还额外接受一个`component`参数，来传递要渲染的组件或者节点对象，这个组件/节点将会被强制传递`{close,dismiss}`的对象，你可以通过这两种方法来关闭弹窗。

### 传递 component 字段

```typescript
// 使用render props形式，传递一个渲染函数，它接受的是包含 close和dismiss两个关闭方法的对象
Modal.open({
	component: handlers => <MyApp onClose={() => handlers.close()} />
});

// 直接传递组件节点
Modal.open({
	component: <MyApp />
});

// 传递组件定义
Modal.open({
	component: MyApp
});
```

### 关闭弹窗

假定我们要在弹窗里渲染一个名为`MyApp`的组件，这个组件有一个关闭按钮，点击后会调用组件传递来的`onClose`的属性方法。

```typescript
Modal.open({
	component: ({ close }) => <MyApp onClose={close} />
});

// 也可以在外部关闭。但是一般不建议:
const myModal = Modal.open({
	component: () => <MyApp onClose={onClose} />
});
const onClose = () => myModal.close();
```

### 传递数据

我们可以利用`Modal.open`返回的`result`这个 promise 对象，并辅以`close` `dismiss`两个关闭弹窗的方法来传递一些弹窗里的数据给调用位置的代码：

```typescript
Modal.open({
	component: ({ close }) => <MyApp onClose={close} />
}).result.then(data => {
	// 从promise回调中获取MyApp通过close传递过来的数据
	console.log(data);
});

// MyApp.tsx
function MyApp(props) {
	return <button onClick={() => props.close("data")}>close</button>;
}
```

### 保持 react context 上下文

> `v0.1.0` 起新增

由于`Modal.open`的实现机制，是利用 `ReactDom.render` 来将传递的 `component` 进行渲染，其与项目的根组件不在一个树中（同一个 react 上下文中）。

如果你利用 react 本身的`context`机制来进行一些全局状态管理，例如`antd`本身的`ConfigProvider`类设置项目的国际化、组件命名前缀等，那么这将导致通过`component`传递的组件以及内部的`Modal`组件，都无法正确获取在根组件的配置信息。

为了解决这个问题，从`v0.1.0`，新增加一个 `ModalRoot` 组件，你只需要将这个组件在项目的根组件下渲染即可，这样就可以保证`Modal.open`渲染的组件都能正确获取到根组件设置的 context 状态啦！

```typescript
import { ModalRoot } from '@tiger/antd-modal';

render(<ConfigProvider locale={zh_CN} prefixCls="custom">
    <App />
    <ModalRoot>
</ConfigProvider>, document.querySelector('#root'))
```

## 源码

```ts
import React, { Children, cloneElement, Component } from "react";
import {
	render as reactRender,
	unmountComponentAtNode,
	createPortal,
	Renderer
} from "react-dom";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import { isValidElementType } from "react-is";
import "./style.scss";

const AntdModal = Modal; // babel-import-plugin会有bug，因此这里需要重新命名给新变量

/**
 * From T delete a set of properties P
 */
type Omit<T, P> = Pick<T, Exclude<keyof T, P>>;

type ModalShadow = typeof Modal & {
	open: (
		config: ModalConfig
	) => ModalHandler & {
		result: Promise<any>;
		render: (
			newContent:
				| React.ComponentType
				| React.ExoticComponent<any>
				| React.ReactElement
		) => void;
	};
};

export interface ModalHandler {
	close: (data?: any) => void;
	dismiss: (reason?: any) => void;
}

export interface ModalConfig extends Omit<ModalProps, "onOk" | "onCancel"> {
	onOk?: (e: React.MouseEvent<any>, handler: ModalHandler) => void;
	onCancel?: (e: React.MouseEvent<any>, handler: ModalHandler) => void;
	component?:
		| React.ComponentType
		| React.ExoticComponent<any>
		| React.ReactElement;
}

const defaultSettings = {
	destroyOnClose: true,
	footer: null,
	maskClosable: false,
	closable: false
};

let renderToRoot = reactRender;

(AntdModal as ModalShadow).open = (props: ModalConfig = {}) => {
	const _renderToRoot = renderToRoot;
	let destroyed;
	let withResolve;
	let withReject;

	const settings = { ...defaultSettings, ...props };

	if (settings.footer === true) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		delete settings.footer;
	}

	if (props.onOk) {
		settings.onOk = ev => props.onOk!(ev, { close, dismiss });
	}

	if (props.onCancel) {
		settings.onCancel = ev => props.onCancel!(ev, { close, dismiss });
	}

	const div = document.createElement("div");

	document.body.appendChild(div);

	function destroy() {
		if (!destroyed) {
			destroyed = true;

			unmountComponentAtNode(div);

			document.body.removeChild(div);
		}
	}

	function close(data) {
		render(false, () => withResolve(data));
	}

	function dismiss(reason) {
		render(false, () => withReject(reason));
	}

	function render(visible, callback?: () => void) {
		const { component: TheComponent, ...props } = settings;
		const childProps = {
			close,
			dismiss
		};

		let children;

		if (isValidElementType(TheComponent)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			children = <TheComponent />;
		} else {
			children = TheComponent;
		}

		_renderToRoot(
			<Modal
				onCancel={dismiss as any}
				onOk={close as any}
				{...props}
				visible={visible}
				afterClose={() => {
					if (!callback) {
						callback = withReject;
					}

					callback!();
					destroy();
				}}
			>
				{Children.map(children, child =>
					cloneElement(child as React.ReactElement, childProps)
				)}
			</Modal>,
			div
		);
	}

	render(true);

	return {
		close,
		dismiss,
		result: new Promise((resolve, reject) => {
			withResolve = resolve;
			withReject = reject;
		}),
		render(newContent: React.ComponentType | React.ReactElement) {
			settings.component = newContent;

			render(true);
		}
	};
};

export interface ModalRootState {
	modals: Record<string, React.ReactElement>;
}

export class ModalRoot extends Component<{}, ModalRootState> {
	readonly state: ModalRootState = {
		modals: {}
	};

	root: HTMLDivElement | undefined;

	public componentDidMount() {
		renderToRoot = ((element, target) => {
			if (!target.id) {
				target.id = `ant-modal-${Date.now() + Math.random()}`;
			}

			const { modals } = this.state;
			const originalCallback = element.props.afterClose;

			modals[target.id] = cloneElement(element, {
				key: target.id,
				afterClose: () => {
					originalCallback();

					const { modals } = this.state;

					delete modals[target.id];

					this.setState({
						modals
					});
				}
			});

			this.setState({
				modals
			});
		}) as Renderer;
	}

	public componentWillUnmount() {
		if (this.root) {
			document.body.removeChild(this.root);
		}
	}

	render() {
		if (!this.root) {
			this.root = document.createElement("div");

			document.body.appendChild(this.root);
		}

		const { modals } = this.state;

		return createPortal(Object.values(modals), this.root);
	}
}

export default AntdModal as ModalShadow;
```

## 实现关键点解读

### 如何保持 context 上下文

关键是 Portals 传送门，即使用 `ReactDOM.createPortal` 替代 `ReactDom.render` 来完成 Modal 的渲染。

#### Portals 的作用和注意点

- [Portals](https://zh-hans.reactjs.org/docs/portals.html#event-bubbling-through-portals) 提供了一种将子节点`渲染到存在于父组件以外的 DOM 节点`的优秀的方案。
- `ReactDOM.createPortal(child, container)`，会将 child 的 dom 挂载到 container 的 dom 树节点下，但是当前组件在哪里使用，决定了其处在 react 树之中的位置，从而决定了其所在的 context 上下文。
- 比如 源码中，使用时将 ModalRoot 引入 react 树的某个 layout 下，即处在 layout 的上下文中。渲染时 createPortal(Object.values(modals), this.root)，modals 的 dom 节点挂载到 body 下的一个 div 中，但上下文依然是 layout。这就是成功`分离了 modal 所处在的 react 树和 dom 树的位置`。

#### 两种使用方式的差别

- **如果不使用 ModalRoot**，只使用 Modal.open 来调用 modal，那么 open 会使用 reactRender 来渲染，此时 modal 所挂载的 react 树和 dom 树的位置是绑定的，都是 body 下的一个 div。因此，modal 是无法获取到 layout 下的 context 的。
- **如果使用了 ModalRoot**，当 ModalRoot 被引入到 layout 中时，didMount 阶段会对全局的 renderToRoot 方法进行覆盖，通过维护一个 ModalRootState，将其以随机数与 modal element 为 key-val 保存在 ModalRootState 当中，每次 open 方法，都会调用覆盖的 renderToRoot 方法，更新 ModalRootState，从而触发重新的 createPortal(child, container)渲染。此时所有的 modal 实例，就都以 portal 传送门的形式被渲染了。
