# 给出基于react-router的路由定义
```
假设页面需要以下几个页面：
    /: Home
    /login: Login
    /personal: Personal
    /personal/deposit: Deposit
    /about: About

- 假定有全局变量isLogin来表示是否登录
- /personal、/personal/deposit需要登录后才能访问。如果未登录，跳转/login
- /login 要求只能为登录情况下访问，如果已登录跳转/personal
- 非以上地址访问全部跳转首页
```
请尽可能只通过react-router实现上述要求：


## johninch
```tsx
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './home';
// ...

let isLogin = false;

ReactDom.render(
    <BrowserRouter>
       <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/personal" render={() => {
                isLogin ? (
                    <Route exact path="/personal" component={Personal} />
                    <Route path="/personal/deposit" component={Deposit} />
                ) : (
                    <Login />
                )
            }}/>
            <Route path="/about" component={About} />
            <Redirect to="/">
       </Switch>
    </BrowserRouter>
)
```
