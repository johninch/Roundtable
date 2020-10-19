# 2、Koa2源码

## 课程目标

1. 手写koa
2. 手写static中间件

### 概述

概述：Koa 是一个新的 web 框架，致力于成为 web 应用和 API 开发领域中的一个更小、更富有 表现力、更健壮的基石。
koa是Express的下一代基于Node.js的web框架 koa2完全使用Promise并配合 async 来实现异步。
- Express下一代web框架
- v1：ES6 generator
- v2：ES7 async/await

### 特点
- 🚀优雅的API设计（ctx.body直接赋值返回，可自动识别json等数据格式，增加到响应头中）
- 🚀中间件机制（洋葱圈模型）
- 增强的错误处理
- 轻量，无捆绑

::: warning 原生http的不足是什么？
1. 令人困惑的request和response，即api不够优雅
    - res.end，res.writeHead等api设计很晦涩，res.end要求对流的概念有好的认识，而writeHead也不够直接。
2. 无法描述复杂业务逻辑
    - 特别是对于切面编程表述AOP来说，不够顺畅
    - 比如`生命周期函数，路由守卫，都是为了满足AOP的编程需要`

**因此，Koa2提供的「优雅的API设计」，「中间件机制」就分别解决了上述两个问题。**
:::

::: tips Ioc 与 AOP 概念
来源于Spring的概念，Spring的核心是`控制反转（IoC`, Inversion of Control ）和`面向切面编程（AOP`, Aspect Oriented Programming）。
:::

### 中间件机制（洋葱圈模型）

Koa中间件机制：Koa中间件机制就是函数式 组合概念 Compose的概念，将一组需要顺序执行的 函数复合为一个函数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机制，是源码中的精髓和难点。


use就是策略模式，而next是责任链模式

## 比较

在koa中，一切的流程都是中间件，数据流向遵循洋葱模型，先入后出，是按照类似堆栈的方式组织和执行的，koa-compose是理解koa中间件的关键，在koa中间件中会深入分析。

koa2与koa1的最大区别是koa2实现异步是通过async/await，koa1实现异步是通过generator/yield，而express实现异步是通过回调函数的方式。

koa2与express 提供的API大致相同，express是大而全，内置了大多数的中间件，更让人省心，koa2不绑定任何的框架，干净简洁，小而精，更容易实现定制化，扩展性好。

express是没有提供ctx来提供上下流服务，需要更多的手动处理，express本身是不支持洋葱模型的数据流入流出能力的，需要引入其他的插件。

koa的数据流入流出，next()后，会进入下一个中间件并执行，然后从最后一个中间件反向执行。


