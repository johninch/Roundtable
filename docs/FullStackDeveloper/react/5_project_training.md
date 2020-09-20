# 5、项目实战1

## 目标

- 掌握生成器函数：generator
- 掌握路由守卫
- 掌握redux异步方案：redux-saga

## Generator

惰性求值
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同，参考文档 [ES6 - generator](https://es6.ruanyifeng.com/#docs/generator)

1. function关键字与函数名之间有一个`*`;
2. 函数体内部使用`yield`表达式，定义不同的内部状态。
3. yield表达式只能`在 Generator 函数里`使用，在其他地方会报错。
```js
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

//执行
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

// {value: "hello", done: false}
// {value: "world", done: false}
// {value: "ending", done: true}
// {value: undefined, done: true}
```
4. yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的`“惰性求值”(Lazy Evaluation)`的语法功能。
```js
var a = 0;

function* fun() {
    let aa = yield (a = 1 + 1);
    return aa;
}
console.log("fun0", a);
let b = fun();
console.log("fun", b.next()); //注释下这句试试，比较下前后a的值
console.log("fun1", a);
```
由于 Generator 函数返回的`遍历器对象`，只有调用 next 方法才会遍历下一个内部状态，所以其实**提供了一种可以暂停执行的函数**。 yield 表达式就是暂停标志。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。 value 属性表示当前的内部状态的值，是 yield 表达式后面那个表达式的值; done 属性是一个布尔值，表示是否遍历结束。


## 路由守卫

**创建高阶组件包装Route，使其具有权限判断功能。**

- 做路由守卫，意思就是跳转路由前加个判断
    - 以登录为例： 登录的话，直接走
    - 没有登录的话，去登录页面，同时把当前地址记录下来
```js
import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

// PrivateRoute函数式组件，不能用装饰器，直接用括号的形式，connect(mapStateToProps)(PrivateRoute)，isLogin一般存在store中
export default connect(({user}) => ({isLogin: user.isLogin}))(
  function PrivateRoute({isLogin, path, component: Component, ...restProps}) {
    return (
      <Route
        {...restProps}
        render={props =>
          isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{pathname: "/login", state: {from: props.location.pathname}}} // 这里将本来要访问的地址记录下来
            />
          )
        }
      />
    );
  }
);
```

```js
export default function Routes(props) {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      <Link to="/login">登录</Link>

      <BottomNav />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/user" component={UserPage} /> */}
        <PrivateRoute path="/user" component={UserPage} />
        <Route component={_404Page} />
      </Switch>
    </Router>
  );
}
```

::: details 接下来，要改造登录页，处理登录跳转逻辑
```js
import React, { Component } from "react";

export default class LoginPage extends Component {

  render() {
    const { isLogin } = this.props;

    return (
      <div>
        <h3>LoginPage</h3>
      </div>
    );
  }
}

export default LoginPage;
```
改造后：
```js
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../action/user";

// 1、location 从哪来?  location是route props的
// 2、connect 的参数
    // mapStateToProps 把store state映射到props上
    // mapDispatchToProps 把dispatch映射到props上
// 3、为什么dispatch 之后页面就跳转了？
    // store state中的isLogin改变后，订阅的listener会重渲，组件树会依次重渲
@connect(({user}) => ({isLogin: user.isLogin}))
class LoginPage extends Component {
  render() {
    const { isLogin, location, dispatch } = this.props;
    // 登录
    if (isLogin) {
      const {from = "/"} = location.state || {};
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h3>LoginPage</h3>
        <button onClick={() => dispatch({type: "LOGIN_SUCCESS"})}>
          点击登录
        </button>
      </div>
    );
  }
}

export default LoginPage;
```

进一步改造，添加登录逻辑：
```js
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../action/user";

@connect(
  ({ user }) => ({ isLogin: user.isLogin, loading: user.loading, err: user.err }),
  {
    login //: userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo})
  }
)
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  nameChange = e => {
    this.setState({ name: e.target.value });
  };
  render() {
    const { isLogin, location, dispatch, login, loading, err } = this.props;
    // 登录
    if (isLogin) {
      const { from = "/" } = location.state || {};
      return <Redirect to={from} />;
    }

    const { name } = this.state;
    return (
      <div>
        <h3>LoginPage</h3>
        <input value={name} onChange={this.nameChange} />
        <button onClick={() => login({ name })}>
          {loading ? "loading..." : "login"}
        </button>
        <p className="red">{err.msg}</p>
      </div>
    );
  }
}

export default LoginPage;
```
:::



## redux异步方案：redux-saga

### 简介

[redux-saga](https://github.com/redux-saga/redux-saga) 是一个用于管理应用程序 Side Effect(副作用，例如异步获取数据，访问浏览器缓存等)的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。
```bash
yarn add redux-saga
```
在 redux-saga 的世界里，Sagas 都用 `Generator函数实现`。我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑。 我们称呼那些对象为 Effect。你可以使用 redux-saga/effects 包里提供的函数来创建 Effect。effect 是一个 javascript 对象，里面包含描述副作用的信息，可以通过 yield 传达给 sagaMiddleware 执行。所有的 effect 都必须被 yield 才会执行。

不同于 redux-thunk，你不会再遇到回调地狱了，你可以很容易地测试异步流程并保持你的 action 是干净的，因此我们可以说redux-saga更擅长解决复杂异步这样的场景，也更便于测试。



### 案例：saga的方式实现路由守卫

创建一个./action/userSaga.js处理用户登录请求。call，调用异步操作；put，状态更新，类似于redux中的dispatch；takeEvery，做saga监听。

- store/index.js：在创建store时，需要创建saga中间件实例，并以loginSaga为参数，让实例跑起来 sagaMiddleware.run(loginSaga)
```js
import { loginReducer } from "./loginReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import loginSaga from "../action/loginSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({ user: loginReducer }),
    // applyMiddleware(thunk)
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(loginSaga);

export default store;
```

- action/user.js
    - 如下分别有4中实现：同步方法、redux-thunk异步、async/await异步、redux-saga异步
```js
import LoginService from "../service/login";

// ! 同步方法
// export const login = userInfo => ({type: "LOGIN_SUCCESS", payload: userInfo});

// ----------------------------------------
// ! 异步方法1：redux-thunk
// redux-thunk 缺点就是 容易形成嵌套地狱
// export const login = userInfo => dispatch => {
//   dispatch({type: "REQUEST"}); // 改变loading状态
//   LoginService.login(userInfo).then(
//     res => {
//       // 异步请求嵌套
//       getMoreUserInfo(dispatch, res);
//     },
//     err => {
//       dispatch({type: "LOGIN_FAILURE", payload: err});
//     }
//   );
// };

// export const getMoreUserInfo = (dispatch, userInfo) => {
//   LoginService.getMoreUserInfo(userInfo).then(
//     res => {
//       dispatch({ type: "LOGIN_SUCCESS", payload: res });
//     },
//     err => {
//       dispatch({ type: "LOGIN_FAILURE", payload: err });
//     }
//   );
// };


// ----------------------------------------
// !方法2：async await优点就是简单，本质上还是generator，只是没有generator强大
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({type: "REQUEST"});
//     let res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }

// export const loginPromise = (dispatch, userInfo) => {
//   return LoginService.login(userInfo).then(
//     res => {
//       return res;
//       // dispatch({type: "LOGIN_SUCCESS", payload: res});
//     },
//     err => {
//       dispatch({type: "LOGIN_FAILURE", payload: err});
//     }
//   );
// };


// ----------------------------------------
// !方法3：redux-saga
export const login = userInfo => ({ type: "LOGIN_SAGA", payload: userInfo });
```

- action/loginSaga.js
    - 订阅saga（watcher saga）：`takeEvery`、`take`
    - 执行更新saga（worker saga）：
        - 同步的方式执行异步请求
            - `call` 是**阻塞式**的，多个请求间有先后关系
            - `fork` 是**非阻塞式**的，多个请求之间无先后关系，并行请求
        - 更新state
            - `put`
```js
import { call, put, takeEvery } from 'redux-sage/effects';
import LoginService from '../service/login';

// worker saga，执行更新
function* loginHandle(action) {
    try {
        // 同步的方式执行异步请求
        // call 是阻塞式的，多个请求间有先后关系
        // fork 是非阻塞式的，多个请求之间无先后关系，并行请求
        const res1 = yield call(LoginService.login, action.payload);
        const res2 = yield call(LoginService.getMoreUserInfo, res1);

        // 更新state
        yield put({ type: "LOGIN_SUCCESS", payload: res2 })
    } catch (err) {
        yield put({ type: "LOGIN_FAILURE", payload: err })
    }
}

// watcher saga，订阅
function* loginSaga() {
    yield takeEvery("LOGIN_SAGA", loginHandle);
}

export default loginSaga;
```


#### 当有多个Saga的时候

- action/rootSaga.js：
```js
import {all} from "redux-saga/effects";
import loginSaga from "./loginSaga";

export default function* rootSaga(params) {
    yield all([loginSaga()]);
}
```
- store/index.js中，引用改成rootSaga即可：
```js
// ...
sagaMiddleware.run(rootSaga);
```







