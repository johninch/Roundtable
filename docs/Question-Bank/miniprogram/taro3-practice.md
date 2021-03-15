# taro3 使用总结

## 平台 API 支持不同导致的差异

由于 Taro 只是对原生 API 的进一步处理封装，而不同底层平台是 API 实现间是有差异的，因此，在不同平台上，taro 的 api 的实际表现并不相同：

### 1. input 组件无法得到 keyCode

taro3 的表单组件 input，inputEventDetail 的返回参数为

```
value	string	输入值
cursor	number	光标位置
keyCode	number	键值
```

但是 tt 小程序中只能拿到 value 和 cursor，keyCode 是没有返回的。

```
bindinput 说明
键盘输入时触发, 若返回 string 则替换 input 内文本内容。

bindinput event 介绍

event.detail.value 为输入框内容
event.detail.cursor 为光标位置
```

这就造成了在比如验证码的多个 input 的场景下，用户删除某个 input 框值之后无法自动 focus 到上一个 input 继续删除，因为根本监听不到点击软键盘的删除按钮，从而造成了较差的交互体验。

### 2. 模态窗样式无法自定义

由于 tt.showModal 的配置中无法自定义按钮颜色，因此虽然 taro.showModal 的配置中可以自定义按钮色，在 tt 平台上也是无法实现的。并且 tt 的主题色是红色，按钮红色字体与业务产品差异太大，所以并不能用。只能考虑自己封装。

## Web Components 类型组件库带来的问题

taro3 为了使得只用一份代码构建的组件库能兼容所有的 web 开发框架，将原有的 react 组件库（支持 taro1、taro2）改造为 Web Components（[Taro Next H5 跨框架组件库实践](https://nervjs.github.io/taro/blog/2020-4-13-taro-components#%E6%8A%80%E6%9C%AF%E8%A7%84%E8%8C%83)）。

[Web Components](https://www.webcomponents.org/introduction) 由一系列的技术规范所组成，它让开发者可以开发出浏览器原生支持的组件。主要技术规范为：

- Custom Elements
  - Custom Elements 让开发者可以自定义带有特定行为的 HTML 标签。
- Shadow DOM
  - Shadow DOM 对标签内的结构和样式进行一层包装。
- HTML Template
  - 《template》 标签为 Web Components 提供复用性，还可以配合 《slot》 标签提供灵活性。

### 1. radio 和 checkbox 组件自定义样式

由于 Shadow DOM 的封装，阴影边界（shadow boundary）会阻止影子宿主（Shadow host）和影子根（Shadow root）之间 js 和 css 的相互入侵。所以我们无法直接在我们的页面样式中覆盖 taro3 组件库中 radio 和 checkbox 的点选框样式（尝试使用 ::shadow 和 /deep/ 选择器也无法穿透覆盖，据说这两个属性现在已经被废弃了：[Chrome 63 将删除::shadow 和 /deep/](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing?hl=zh-cn)）。

因此，业务中采取的方式是 hack 样式，通过将 taro 提供的 Radio 组件进一步封装，并将 Radio 组件在视觉上隐藏掉，自己通过当前是否选中来显示 UI 需要的点选框来实现。Checkbox 组件思路一致。

::: danger
注意：由于某些 ios 版本下，display none 掉原生 radio 图标后，点击 label 是没有办法触发 radiochange 的，所以需要将原生 radio 绝对定位后完全透明（opacity 0）占满点击区域来 hack。
:::

```jsx
export const PageRadio = ({
	value,
	text,
	checked,
	disabled,
	id,
	customClassName,
	...extraProps
}: IPageRadioProps) => {
	return (
		<Label
			className={`radio-item custom-radio_label ${checked ? "active" : ""} ${
				disabled ? "disabled" : ""
			}  ${customClassName}`}
			for={id}
			key={id}
			{...extraProps}
		>
			<Radio
				className="custom-radio_radio"
				value={String(value)}
				checked={checked}
				disabled={disabled}
			/>
			<View className="icon" />
			<View className="radio-item-text">{text}</View>
		</Label>
	);
};
```

```scss
.custom-radio_label {
	margin-left: 16px;
	color: #666666;
	position: relative;
	&:first-of-type {
		margin-left: 0;
	}
	.custom-radio_radio {
		// 某些 ios 版本下，display none 掉原生radio图标后，点击label是没有办法触发radiochange的，所以需要将原生radio绝对定位后完全透明占满点击区域来hack
		// display: none;
		opacity: 0;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		position: absolute;
	}
	&.active {
		color: #222222;
	}
	&.disabled {
		color: #999999;
	}
	& .icon {
		display: inline-block;
		width: 24px;
		height: 12px;
		background: url("~@/assets/svg/radio0.svg") no-repeat;
		background-size: 12px;
	}
	&.active .icon {
		display: inline-block;
		width: 24px;
		height: 12px;
		background: url("~@/assets/svg/radio1.svg") no-repeat;
		background-size: 12px;
	}
	.radio-item-text {
		display: inline-block;
		line-height: 28px;
	}
}
```

> 还有一种思路是通过获取 dom 后，通过注入一个 style 元素到 ShadowRoot 下来覆盖样式。但是感觉更麻烦。。可参考:
>
> - [Angular/Ionic 修改 ShadowRoot 元素样式](https://www.jianshu.com/p/57cb11e58a46)
> - [Override styles in a shadow-root element](https://stackoverflow.com/questions/47625017/override-styles-in-a-shadow-root-element)

## 路由传参问题

官方提到的路由带参数是通过在 Taro.navigateTo 的 url 选项后手动拼接多个参数来完成的。但这样有个问题是，无法支持传递对象参数，且会丢失数据类型（不利于 typescript 使用）。

小程序不同页面间的数据共享有这么几种形式：

1. 放在状态管理器 Mobx、Redux、context api 等等

   - 但路由间传参不太适合状态管理器中，场景不合适。

2. 借助小程序提供的 storage ，来完成在不同页面间数据的同步

   - 思路与第一种类似，并且每次用完都需要清理掉这个缓存，不然会造成数据错乱。

### 3. 使用官方提供的 getOpenerEventChannel API

**[微信小程序页面间通信接口](https://segmentfault.com/a/1190000020732602)**

- （a）A -> B，A 向 B 传递数据，在页面 A 执行代码：

```js
wx.navigateTo({
  url: 'test?id=1'
  success: function(res) {
  // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
```

当 A 跳转到 B 时，就会触发 B 当中定义的 acceptDataFromOpenerPage，并将后续的数据传递过去。

在 B 中，在 onLoad 去定义 eventChannel 的相关方法：

```js
Page({
	onLoad: function(option) {
		// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		let eventChannel = this.getOpenerEventChannel();
		eventChannel.on("acceptDataFromOpenerPage", function(data) {
			console.log(data);
		});
	}
});
```

- （b）A -> B，B 向 A 传递数据，在 A 中加入 events 的定义：

```js
wx.navigateTo({
	url: "test?id=1",
	events: {
		someEvent: function(data) {
			console.log(data);
		}
	}
});
```

然后在 B 中，调用如下代码来发信息

```js
Page({
	onLoad: function(option) {
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.emit("someEvent", { data: "test" });
	}
});
```

这种官方提供的方式，既能正向传数据，也能反向传数据。非常方便。

::: warning
不过，在 taro3 中，`getOpenerEventChannel API` 被隐藏了（https://github.com/NervJS/taro/issues/3856），官方推荐使用 [Taro.Events](https://nervjs.github.io/taro/docs/apis/about/events) 来代替。

实际上就是利用订阅的方式里获取数据：

```js
// A 页面
Taro.navigateTo({
  url: `/pages/messages/detail`,
  success: () => {
    Taro.eventCenter.trigger('message:detail', { text: 'test' })
  }
})


// B 页面
constructor() {
  Taro.eventCenter.once('message:detail', (message) => console.log(message))
}
```

**但是！！！**实际中发现 navigateTo 的 success 回调时机在真机和模拟器不同（这个不敢肯定，所以不能作为结论）。`有时 B 页面还没有初始化监听，A 页面就 success 触发了`。因此不能实现顺利传参。

这里提供一种思路：即 在 B 页面先触发一个初始化完毕事件，等 A 收到 event 后再触发事件。

```js
// B 页面
constructor() {
  Taro.eventCenter.once('message:detail', (message) => console.log(message))
  Taro.eventCenter.trigger('page:init')
}

// A 页面
Taro.navigateTo({
  url: `/pages/messages/detail`,
  success: () => {
    Taro.eventCenter.once('page:init', () => {
      Taro.eventCenter.trigger('message:detail', { text: 'test' })
    })
  }
})
```

这样虽然可以保证事件按照预期顺序执行，但因为 B 页面要先触发一个初始化事件，等 A 收到后触发事件，B 再接收到实际的 data，那么 `B 页面至少要执行两次`。

- [Taro 3 页面间通讯](https://huaoguo.github.io/taro/2020/11/11/taro3-page-event.html)
  :::

### 4. 推荐：还是直接通过 url 传参，通过编解码保留数据类型

```js
/**
 * 跳转时构造：
 *  Taro.navigateTo({
      url: buildURL('/pages/survey/form/index', {
        value: '<img alt="" class="has" height="328" src="https://img-blog.csdn.net/20181023164853397?watermark=aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIzMDI1NTI&font=5a6L5L2T&fontsize=400" width="933">',
        obj: { a: 1, b: ['000'] },
        arr: ['向建行', 999, { c: 222 }],
        2: false,
        type: undefined, // 会被过滤掉
        mode: null,
        patient_no: 10,
        name: '33'
      })
    });
 */
export const buildURL = (url, params = {}) => {
	if (!params) return url;
	const joiner = url.match(/\?/) ? "&" : "?";
	// JSON.parse 无法解析 undefined，过滤掉
	const paramsStr = Object.keys(params)
		.filter(k => params[k] !== undefined)
		.map(key => `${key}=${encodeURIComponent(JSON.stringify(params[key]))}`)
		.join("&");
	return url + joiner + paramsStr;
};

/**
 * 接收时解析：
  const params = decodeParams(getCurrentInstance().router?.params as unknown as IRouteParams);
 */
export const decodeParams = (originParams = {}) => {
	const result = {};
	if (!originParams) return {};

	return Object.keys(originParams).reduce((acc, cur) => {
		let a = decodeURIComponent(originParams[cur]);
		acc[cur] = JSON.parse(a);

		return acc;
	}, result);
};
```

- [小程序之页面跳转传递对象参数问题](https://blog.csdn.net/tinson12321/article/details/82981365)

## 路由跳转相关问题

### 根据当前路由栈判断跳转方向

业务需求是让某个页面组件在不同的业务流程中，操作完成后跳转不同的页面。因为此页面组件是被多次复用的，如果根据参数来判断跳转方向就会比较混乱。所以思路是通过`getCurrentPages`拿到当前小程序的页面栈（也可以叫作 路由栈，最多 10 层），从而做出不同的行为。

```js
// 拿到页面栈，方便回退逻辑执行
const routes = Taro.getCurrentPages().map(item => item.data);

Taro.showToast({
	title: toastText,
	icon: "success",
	duration: 2000,
	complete: () => {
		const arr = routes.map(item => item.root.uid);
		const targetIdx = arr.findIndex(url =>
			url.startsWith("pages/customer/family/index")
		);
		if (targetIdx > -1) {
			// 如果走了A流程，要回退到列表页，继续A流程
			Taro.navigateBack({ delta: arr.length - targetIdx - 1 }); // 最后减一是因为，回退时计数问题
		} else {
			// 如果直接走B流程，则回退到个人中心刷新页面
			// tabBar路由不能使用navigateTo方式跳转，需要用switchTab
			Taro.switchTab({ url: "/pages/person/index" });
		}
	}
});
```

### 只能用 switchTab 跳转的路由

如果要跳转的页面已经设置成了 tabBar，则不能用 navigateTo 来跳转，只能用 switchTab，也就是在 tab 之间去跳转。

[微信小程序 | navigateTo 不能跳转问题](https://zhuanlan.zhihu.com/p/40328147)

### 监听网络状态

通过 `onNetworkStatusChange` 监听网络状态。

每一个 Taro 应用都需要一个入口组件用来注册应用，入口文件默认是 src 目录下的 app.js。

在 Taro 中使用 React，入口组件必须导出一个 React 组件。由于 Taro 必须通过 props.children 注入到入口页面，从而承接要渲染的页面，所以不能直接在这一级条件渲染无网络兜底空页面。

实际实现是将兜底空页面单独定义为一个路由，在入口页面和兜底页面分别监听网络状态来完成到对方的跳转：

```jsx
// 入口公共组件
function Page({ children, auth }: Props) {
	useEffect(() => {
		Taro.onNetworkStatusChange(res => {
			if (!res.isConnected) {
				console.log("jump to empty page");
				openUrl("/pages/empty-page/index");
			}
		});

		return () => {
			Taro.offNetworkStatusChange();
		};
	}, []);

	return (
		<StoreService.Provider value={useStore()}>
			<View
				className="c-page"
				style={{ height: Taro.getSystemInfoSync().windowHeight + "px" }}
			>
				<View className="hover-top"></View>
				{auth && <Authorization />}
				<View
					style={{ height: "100%", display: "flex", flexDirection: "column" }}
				>
					{children}
				</View>
			</View>
		</StoreService.Provider>
	);
}
```

```jsx
// 兜底页面组件
const EmptyPage = () => {
	useEffect(() => {
		Taro.onNetworkStatusChange(res => {
			if (res.isConnected) {
				Taro.navigateBack();
			}
		});

		return () => {
			Taro.offNetworkStatusChange();
		};
	}, []);

	return <BlankPage netError text="网络未连接" />;
};
```

## 地图 Map

使用 `Taro.openLocation(option)` 可以自动调起地图功能，并且可以自动识别当前用户所装地图 app，由用户点击后选择调用。

如果需要自己定义，需要开发者自己使用 Map 组件自定义，并添加第三方 sdk 来完成调起地图。

## 条形码与二维码

taro 小程序使用 jsbarcode 显示不出来，可以使用 [Miaonster/taro-code](https://github.com/Miaonster/taro-code)。

::: tip

此条 tip 与前端技术无关：

注意有些扫码枪扫码异常（可能没有小写，可能没有数字），需要对扫码枪进行配置，例如需要英文输入法等等。。

:::
