# 9、ts项目架构

## ts的六大特点

1. 类Classes
2. 接口 Interfaces
3. 模块 Modules
4. 类型注解 Type annotations 装饰器
    - 装饰器
    - 装饰器工厂
    - 注解型装饰器`@decorate`
5. 编译时类型检查 Compile time type check
6. 箭头函数 Arrow —— Lambda表达式

## 装饰器、装饰器工厂、注解型装饰器

> 装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。
> 这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。


### 装饰器

先实现一个装饰器模式：
```js
class Log {
    print(msy) {
        console.log(msg)
    }
}

const log = new Log()
log.print('johninch')
```
通过dec方法，来修饰类实例方法：
- 先取出原来的方法
- 再重写该方法，为参数添加自己的操作
- 使用备份的原方法执行新的参数
```js{7-17}
class Log {
    print(msy) {
        console.log(msg)
    }
}

const dec = (target, property) => {
    const oldProp = target.prototype[property]

    target.prototype[property] = msg => {
        console.log('执行了 ' + property)
        msg = `[${msg}]`
        oldProp(msg)
    }
}

dec(Log, 'print')

const log = new Log()
log.print('你好！')
```

### 装饰器工厂

在上面的基础上，假如不但需要装饰，还需要传入额外的参数，赋予更多的能力，但装饰器本身不能传参，因此就需要通过`升阶`的手段，来柯里化装饰器。即将「**一个装饰器函数**」转变为「**一个制造装饰器函数的函数**」，这就是`装饰器工厂`。

```js{7,12,17}
class Log {
    print(msy) {
        console.log(msg)
    }
}

const dec = name => (target, property) => {
    const oldProp = target.prototype[property]

    target.prototype[property] = msg => {
        console.log('执行了 ' + property)
        msg = `${name} [${msg}]`
        oldProp(msg)
    }
}

dec('Amy')(Log, 'print')

const log = new Log()
log.print('你好！')
```

### 注解类型的装饰器（ES6、TS）

语言设计者在语言层面，提供了装饰器的功能，实际上是注解类型的装饰器

```js{1-10,13}
function decorate(target, property, descriptor) {
    const oldProp = descriptor.value
    // 因为是方法装饰器，value就是原来的print方法
    descriptor.value = msg => {
        msg = `[${msg}]`
        return oldProp.apply(null, [msg])
    }

    return descriptor // 返回装饰过的属性描述符
}

class Log {
    @decorate
    print(msy) {
        console.log(msg)
    }
}

const log = new Log()
log.print('你好！')
```

#### @decorate 的实际原理

```js{13,19-28}
function decorate(target, property, descriptor) {
    const oldProp = descriptor.value
    // 因为是方法装饰器，value就是原来的print方法
    descriptor.value = msg => {
        msg = `[${msg}]`
        return oldProp.apply(null, [msg])
    }

    return descriptor // 返回装饰过的属性描述符
}

class Log {
    // @decorate 注解型装饰器实际的原理，就是下面的anotation实现
    print(msy) {
        console.log(msg)
    }
}

const anotation = (target, property, decorate) => {
    const descriptor = decorate(
        taget.prototype,
        property,
        Object.getOwnPropertyDescriptor(target.prototype, property)
    )
    Object.defineProperty(target.prototype, property, descriptor)
}

anotation(Log, 'print', decorate)

const log = new Log()
log.print('你好！')
```


## ts项目 - 利用装饰器实现功能

### 基础代码
```bash
npm i koa koa-static koa-body koa-xtime -S
```
```js
// index.ts
import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

const app = new Koa();

app.use(timing());
app.use(serve(`${__dirname}/public`));
app.use(bodify({
        multipart: true,
        // 使用非严格模式，解析 delete 请求的请求体
        strict: false,
    }),
);

// 这里还是需要手动编写路由
// const router = new Router();
// router.get('/abc', ctx => {
//     ctx.body = 'abc
// })
// app.use(router.routes())

app.use((ctx: Koa.Context) => {
    ctx.body = 'hello'
})
app.listen(3000, () => {
    console.log('服务器启动成功');
});
```
这里还是需要手动编写路由，那么可否考虑使用装饰器，来自动注册路由呢？


### 装饰器增加自动路由发现与路由注册

- 装饰器实现路由发现、路由注册功能

```js
// /src/routes/user.ts
import * as Koa from 'koa'

const users = [{ name: 'tom', age: 20 }] // 假数据

export default class User {
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }
}
```
上述User类，中两个方法其实就是两个中间件，正常写路由就要通过router.get来手写，这里我们考虑使用@get、@post来自动完成路由注册功能：

```js
// /src/routes/user.ts
import * as Koa from 'koa'
import { get, post } from '../utils/decor'

const users = [{ name: 'tom', age: 20 }] // 假数据

export default class User {
    @get('/users')
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    @post('/users')
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }
}
```

```js
// /src/utils/decors.ts
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter()

export const get = (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options && options.prefix ? options.prefix + path : path
        router['get'](url, target[property])
    }
}
export const post = (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options && options.prefix ? options.prefix + path : path
        router['post'](url, target[property])
    }
}
```

解决get post put delete方法公用逻辑：
```js
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter()

const method = method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options && options.prefix ? options.prefix + path : path
        router[method](url, target[property])
    }
}

export const get = method('get')
export const post = method('post')
export const put = method('put')
export const delete = method('delete')
```

router变量，不符合函数式编程引用透明的特点，对后面移植不利（即method内部的router，必须要依赖外部上下文中有router实例，不利于代码复用），所以要再次进行柯里化（再次升阶）：
```js
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter()

const decorate = router => method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options && options.prefix ? options.prefix + path : path
        router[method](url, target[property])
    }
}

const method = decorate(router)

export const get = method('get')
export const post = method('post')
export const put = method('put')
export const delete = method('delete')
```

装饰器需要再程序加载的时候才能执行，所以需要提供一个load方法用来加载（load方法的功能是，加载指定文件夹中的所有代码）：
```js
import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter()

const decorate = router => method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options && options.prefix ? options.prefix + path : path
        router[method](url, target[property])
    }
}

const method = decorate(router)

export const get = method('get')
export const post = method('post')
export const put = method('put')
export const delete = method('delete')

export const load = (folder: string): KoaRouter => {
    const extname = '.{js,tx}'
    const path = require('path')
    // 拿到匹配的所有文件
    glob.sync(path.join(folder, `./**/*${extname}`))
        .forEach(item => require(item))

    return router
}
```
加载完所有class之后，它们都会对应去完成所有的装饰器语法，之后就返回设置完所有规则后的router。


```js
// index.ts
import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

const app = new Koa();

app.use(timing());
app.use(serve(`${__dirname}/public`));
app.use(bodify({
        multipart: true,
        // 使用非严格模式，解析 delete 请求的请求体
        strict: false,
    }),
);

// 加载路由
import { load } from './utils/decor'
import path from 'path'
const router = load(path.resolve(__dirname, './routes'))
app.use(router.routes())

app.use((ctx: Koa.Context) => {
    ctx.body = 'hello'
})
app.listen(3000, () => {
    console.log('服务器启动成功');
});
```

### 装饰器增加有效性检查

- 装饰器传入中间件数组，增加有效性检查：
```js
// /src/routes/user.ts
import * as Koa from 'koa'
import { get, post } from '../utils/decor'

const users = [{ name: 'tom', age: 20 }] // 假数据

export default class User {
    @get('/users')
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    @post('/users', {
        middlewares: [
            async function validation(ctx, next) {
                const {name} = ctx.request.body
                if (!name) {
                    throw '请输入用户名'
                }
                await next()
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }
}
```

```js
// /src/utils/decors.ts
import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter()

const decorate = router => method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const middlewares = []

        if (options && options.middlewares) {
            middlewares.push(...options.middlewares)
        }
        middlewares.push(target[property]) // 最后把业务中间件加进去

        const url = options && options.prefix ? options.prefix + path : path
        router[method](url, ...middlewares)
    }
}

const method = decorate(router)

export const get = method('get')
// ...

export const load = (folder: string): KoaRouter => {
    // ...
}
```

### 类装饰器

::: tip 方法装饰器 与 类装饰器
因为作用对象不同，装饰器函数的参数也不同：
```js
// 类装饰器
function anotationClass(id){
    console.log('anotationClass evaluated', id);
    return (target) => console.log('anotationClass executed', id);
}
// 方法装饰器
function anotationMethods(id){
    console.log('anotationMethods evaluated', id);
    return (target, property, descriptor) => console.log('anotationMethods executed', id);
}

@anotationClass(1)
@anotationClass(2)
class Example {
    @anotationMethods(1)
    @anotationMethods(2)
    method(){}
}
```
:::

以上都是`方法装饰器`，下面通过`类装饰器`实现鉴权中间件函数，要求User类中的实例方法（接口），都必须通过鉴权后才能访问：
```js
// /src/routes/user.ts
import * as Koa from 'koa'
import { get, post, middleware } from '../utils/decor'

const users = [{ name: 'tom', age: 20 }] // 假数据

@middlewares([
    async function guard(ctx, next) {
        if (ctx.header.token) {
            await next()
        } else {
            throw '未登录'
        }
    }
])
export default class User {
    @get('/users')
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    @post('/users', {
        middlewares: [
            async function validation(ctx, next) {
                const {name} = ctx.request.body
                if (!name) {
                    throw '请输入用户名'
                }
                await next()
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }
}
```

```js
// /src/utils/decors.ts
import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

const router = new KoaRouter()

const decorate = router => method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const middlewares = []

        // 再在 方法中间件中 获取类中的中间件
        if (target.middlewares) {
            middlewares.push(...target.middlewares)
        }

        if (options && options.middlewares) {
            middlewares.push(...options.middlewares)
        }
        middlewares.push(target[property]) // 最后把业务中间件加进去

        const url = options && options.prefix ? options.prefix + path : path
        router[method](url, ...middlewares)
    }
}

const method = decorate(router)

export const get = method('get')
// ...

// 期望是 类装饰器先执行，就可以将传入的middlewares加入到target.prototype里
export const middlewares = function middlewares(middlewares) {
    return function(target) {
        target.prototype.middlewares = middlewares
    }
}

export const load = (folder: string): KoaRouter => {
    // ...
}
```
我们的预期是想要：
- 1、类装饰器先执行，就可以将传入的middlewares加入到target.prototype里；
- 2、方法装饰器再执行，就可以获取类装饰器中传入的中间件；

但实际情况是：`方法装饰器 会优先于 类装饰器执行`。

在此，为了颠倒执行循序，可以考虑将要后执行的代码放到异步中去做（比如使用process.nextTick）：
```js
// /src/utils/decors.ts
//...
const decorate = router => method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        // 异步执行
        process.nextTick(() => {
            const middlewares = []

            if (target.middlewares) {
                middlewares.push(...target.middlewares)
            }

            if (options && options.middlewares) {
                middlewares.push(...options.middlewares)
            }
            middlewares.push(target[property]) // 最后把业务中间件加进去

            const url = options && options.prefix ? options.prefix + path : path
            router[method](url, ...middlewares)
        })
    }
}

const method = decorate(router)

export const get = method('get')
// ...

export const middlewares = function middlewares(middlewares) {
    return function(target) {
        target.prototype.middlewares = middlewares
    }
}

export const load = (folder: string): KoaRouter => {
    // ...
}
```

### 整合数据库
```bash
npm i -S sequelize sequelize-typescript reflect-metadata mysql2
```

代码实现，略。


### 作业：有效性检查装饰器实现

上述简单的有效性检查是通过传入中间件实现的，本节使用装饰器实现有效性检查。
::: tip 切面AOP
思路：因为**注解装饰器**是可以实现`切面AOP`的，比如
```js{5}
function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    }
    return descriptor;
}

// 日志应用
class Maths {
    @log
    add(a, b) {
        return a + b;
    }
}
const math = new Maths();
// passed parameters should get logged now
math.add(2, 4);
```
第5行就是一个切面，在这里可以*实现一些执行方法前的前置逻辑*。
:::


```js
// /src/utils/decors.ts

// ...
import * as  Parameter from 'parameter'
//...
const decorate = router => method => (path: string, options?: RouteOptions) => {
    // ...
}

const method = decorate(router)

export const get = method('get')
// ...

export const middlewares = function middlewares(middlewares) {
// ...
}

export const load = (folder: string): KoaRouter => {
// ...
}

const validateRule = paramPart => rule => {
    return function(target, name, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = function() {
            const ctx = arguments[0]
            const p = new Parameter()
            const data = ctx[paramPart]
            const errors = p.validate(rule, data)
            console.log('error',errors)
            if (errors) throw new Error(JSON.stringify(errors))
            return oldValue.apply(null, arguments);
        }
        return descriptor;
    }
}

export const querystring = validateRule('query')
export const body = validateRule('body')
```

```js
// /src/routes/user.ts
import * as Koa from 'koa'
import { get, post, middleware, querystring } from '../utils/decor'

// ...
export default class User {
    @get('/users')
    @querystring({
        age: { type: 'int', required: false, max: 200, convertType: 'int' },
    })
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    // ...
}
```


