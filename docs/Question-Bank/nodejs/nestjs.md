# nestjs 学习笔记


如果是新建无关痛痒的子模块，即使不新建 Module 文件，也能通过路由访问。

Nest 支持使用 Interface（接口） 来定义 DTO，具体语法可以浏览 TypeScript 官方文档，不过 Nest 建议使用 Class 来做 DTO（就踩坑经验而言， Class 确实比 Interface 方便多了）

这里补充一下MongoDB和关系型数据库一些概念的对应关系：
MongoDB | 关系型数据库
|:---- |:-------|
Database | Database
Collection | Table
Document | Row
Field | Field


Guard和Interceptor区别，资源控制使用guard，Interceptor主要是添加一些统一的额外操作

```shell
brew tap mongodb/brew
brew install mongodb-community

brew services start mongodb-community

brew services stop mongodb-community
```

```shell
nest g module user server
nest g controller user server
nest g service user server
nest g middleware logger middleware
nest g interceptor transform interceptor
nest g filter http-exception filter

nest g resource server/xxx # 在server下新建xxx的模块
```

## nestjs 采用 IoC 机制

控制反转（Inversion of Control，缩写为 IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做【依赖注入】（Dependency Injection，简称 DI），还有一种方式叫【依赖查找】（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体，将其所依赖的对象的引用传递(注入)给它。

IoC 容器（IoC Container），指的是一种设计框架（Framework），例如 NestJS：用@Injectable 装饰器修饰一个 Service，然后在控制器类中声明其先前的 Service 实例需要在类构造时注入其中，最后用 Nest IoC 容器注册这个服务。

::: tip 理解「依赖注入DI」

此时 Car 类不再亲自创建 Engine ，只是接收并且消费一个 Engine 的实例。而 Engine 的实例是在实例化 Car 类时通过构造函数注入进去的。于是 Car 类和 Engine 类就解除了耦合。假如我们要升级 Engine 类，也只需要在 Car 的实例化语句中做出修改即可。

实际情况下，NestJS 中的类实例化过程是委派给 IoC 容器（即 NestJS 运行时系统）的。并不需要我们每次手动注入。


为什么 Egg.js 需要规定目录结构，是因为在 egg-core 的 loader 代码中，对于 Controller，Service，Config 等的加载是由不同的 load 函数查找指定目录来完成的。因此如果在指定的地方没有找到，那么 Egg.js 就无法获取并将它们挂载到 ctx 下。而 NestJS 则不同，依赖是我们自行在容器中注册的，也就是说，NestJS 并不需要自行去按指定位置寻找依赖。我们只需要将所需执行的 Controller，Service 等注入到模块中，模块即可获取它们并且使用。


:::

1. 依赖注入（声明需要注入的类，这里是 service）

```ts
// cat.service.ts
import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
	private readonly cats: Cat[] = [];

	findAll(): Cat[] {
		return this.cats;
	}
}
```

2. 先前声明的类 service 被注入 controller

```ts
// cats.controller.ts
import { Controller, Get } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

@Controller("cats")
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Get()
	async findAll(): Promise<Cat[]> {
		return this.catsService.findAll();
	}
}
```

3. IoC 容器注册

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";
import { CatsService } from "./cats/cats.service";

@Module({
	controllers: [CatsController],
	providers: [CatsService]
})
export class AppModule {}
```

使用 Nestjs 完成一个基本服务需要有 Module、Controller、Provider 三大部分：

- `Module`：字面意思是模块，在 nestjs 中由`@Module()`修饰的 class 就是一个 Module，在具体项目中我们会将其作为当前子模块的入口，比如一个完整的项目可能会有用户模块，商品管理模块，人员管理模块等等。
- `Controller`：字面意思是控制器，负责处理客户端传入的请求和服务端返回的响应，官方定义是一个由`@Controller()`修饰的类，上述代码就是一个 Controller，当我们发起地址为'/api/user'的 get 请求的时候，Controller 就会定位到 findAll 的方法，这个方法的返回值就是前端接收到的数据。
- `Provider`：字面意思是提供者，其实就是为 Controller 提供服务的，官方的定义是由`@Injectable()`修饰的 class，简单解释一下：上述代码直接在 Controller 层做业务逻辑处理，后续随着业务迭代，需求越来越复杂，这样的代码会难以维护，所以需要一层来**处理业务逻辑，Provider 正是这一层**，**它需要@Injectable()修饰，以此来声明可以被注入的依赖（类）**。

## 应用实现

请求处理和响应的流程：

> 客户端请求 -> Middleware 中间件 -> Guard 守卫 -> 请求拦截器 -> Pipe 管道 -> Controller 层的路由处理函数 -> 响应拦截器 -> 客户端响应

其中 Controller 层的路由处理函数会调用 Provider，Provider 负责获取底层数据并处理业务逻辑；异常过滤器会在这个程序抛错后执行。

## nest、egg、koa、express 间的区别

- [Nest.js 和 koa 有什么不一样？ - 余腾靖的回答 - 知乎](https://www.zhihu.com/question/323525252/answer/937101214)

## 参考链接


- [关于依赖注入（typescript）](https://juejin.cn/post/6844903740953067534)
- [JavaScript 的 IoC、IoC Containers、DI、DIP 和 Reflect](https://juejin.cn/post/6911897883801305101)
- [从 Egg.js 到 NestJS，爱码客后端选型之路](https://juejin.cn/post/6886765193112911885)
- [BFF 与 Nestjs 实战](https://juejin.cn/post/6925028503314235399)
- [Nest.js 和 koa 有什么不一样？ - 余腾靖的回答 - 知乎](https://www.zhihu.com/question/323525252/answer/937101214)
