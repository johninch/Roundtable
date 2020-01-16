# 给出基于react-router的路由定义
假设页面需要以下几个页面：
    /: Home
    /login: Login
    /personal: Perosnal
    /personal/deposit: Deposit
    /about: About

假定有全局变量isLogin来表示是否登录，要求：

/perosnal、/personal/deposit需要登录后才能访问。如果未登录，跳转/login
/login 要求只能为登录情况下访问，如果已登录跳转/personal 
非以上地址访问全部跳转首页

请尽可能只通过react-router实现上述要求

