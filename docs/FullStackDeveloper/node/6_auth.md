# 6、前端鉴权

## 目录

- cookie-session模式
    - session源码实现
    - koa cookie-session模式
    - redis全局session
- token jwt模式
    - jwt原理
    - koa-jwt
    - 优势
- 扩展知识
    - Oauth2模式：github
    - SSO单点登录

## cookie-session方式

### cookie原理解析
```js
const http = require('http');
http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.end('')
        return
    }
    // 观察cookie
    console.log('cookie', req.headers.cookie)

    // 设置cookie
    res.setHeader('Set-Cookie', 'cookie1=abc')
    res.end('hello cookie')
})
.listen(3000)
// Header Set-Cookie负责设置cookie
// 请求传递Cookie
```

用来传递和存储状态，有一些问题：
- 有大小限制；
- 传输和保存是明文，传输过程中容易被截获；

因此，简单的思路就是保存一个编号，拿到后端去对应：

### session原理解析
```js
const http = require('http');
const session = []

http.createServer((req, res) => {
    const sessionKey = 'sid'
    const cookie = req.headers.cookie

    if (cookie && cookie.indexOf(sessionKey) > -1) {
        // 登录状态存在
        res.end('Come Back')
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session', session, session[sid])
    } else {
        // 首次访问
        const sid = (Math.random() * 999999999).toFixed() // 应该用uuid，这里简单实用随机数
        // 设置cookie
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
        session[sid] = {name: 'laowang'}
        res.end('hello')
    }
})
.listen(3000)
```
::: tip 实现原理
1. 服务器在接受客户端首次访问时，在服务器端创建session，然后保存session (将session保存在内存中，但是有很多问题，可以保存在存储数据库中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的标识字符串，然后在响应头中种下这个唯一标识字符串。
2. 签名。这一步通过秘钥对sid进行签名处理，避免客户端修改sid。(非必需步骤)
3. 浏览器中收到响应的时候会解析响应头中的Set-Cookie，然后将sid保存在本地cookie中，浏览器在下次http请求的请求头中会带上该域名下的cookie信息。
4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断该请求是否合法。
:::

上述就是简单的cookie-session模式实现。那么这么实现有什么问题？

- 首先，session是保存在变量中，也就是直接保存在内存中（即没有做持久化）
    - 流量大时会把内存打崩
    - 重启就失效了
    - nodejs不是只开一个实例，会在不同的机器里开多个实例，状态无法共享


```js
// 这块儿没大听懂
哈希算法：一种摘要算法，简单说就是把一个不定长字符串，转化成一个定长字符串
摘要 yanglaoshi -》 x
雪崩效应
```

### koa中session使用

```bash
# koa安装
npm install koa-generator -g

npm i koa-session -S
```

```js
const koa = require('koa');
const app = new koa();
const session = require('koa-session');

// 签名key keys作用 用来对cookie进行签名
app.keys = ['secret']

// 配置项
const SESS_CONFIG = {
    key: 'kkb:sess', // cookie键名
    maxAge: 86400000, // 有效期，默认一天
    httpOnly: true, // 仅服务器修改
    signed: false // 是否签名cookie
}

// 注册
app.use(session(SESS_CONFIG, app)) // 中间件执行完后会在上下文添加配置

// 测试
app.use(ctx => {
    // favicon不要计入访问次数
    if (ctx.url === '/favicon.ico') return

    // 获取
    let n = ctx.session.count || 0

    // 设置
    ctx.session.count = ++n
    ctx.body = `第${n}次访问`
})

app.listen(3000)
```


### 使用redis存储session（推荐常用）

redis，是一个高性能的key-value数据库。

#### Redis 与其他 key - value 缓存产品有以下三个特点:
- Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
- Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
- Redis支持数据的备份，即master-slave模式的数据备份。

#### Redis 优势
- 性能极高：Redis能读的速度是110000次/s，写的速度是81000次/s 。
- 丰富的数据类型：Redis支持二进制的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
- 原子：Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
- 丰富的特性：Redis还支持 publish/subscribe, 通知, key 过期等等特性。

```bash

# 注意启动redis服务
redis-server
```
```js
const redis = require('redis')
const client = redis.createClient(6379, 'localhost') // 端口默认6379

client.set('hello', 'This is KKB') // 设置键值对

client.get('hello', (err, data) => {
    if (err) {
        throw err
    }
    console.log('redis get ', data)
})
```

```bash
npm i koa-redis -S
```

```js
const koa = require('koa');
const app = new koa();
const session = require('koa-session');

// 签名key keys作用 用来对cookie进行签名
app.keys = ['secret']

// koa-redis
const redisStore = require('koa-redis');
const redis = require('redis')
const redisClient = redis.createClient(6379, "localhost");

const wrapper = require('co-redis'); // co- 开头的包都是promise的封装
const client = wrapper(redisClient);

// 注册
app.use(session({
    key: 'kkb:sess',
    store: redisStore({ client }) // 此处可以不必指定client
}, app));

// 测试
app.use(async (ctx, next) => {
    const keys = await client.keys('*')
    keys.forEach(async key =>
        console.log(await client.get(key))
    )
    await next()
})

app.listen(3000)
```

### cookie-session鉴权
```js
const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa();

// 配置session的中间件
app.use(cors({
    credentials: true
}))

app.keys = ['some secret'];

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next();
    } else {
        // 鉴权
        if (!ctx.session.useinfo) {
            ctx.body = {
                message: '未登录'
            }
        } else {
            next()
        }
    }
})

router.post('/users/login', async ctx => {
    const { body } = ctx.request
    // 验证登录信息
    // 赋权
    ctx.session.userinfo = ctxbody.username

    ctx.body = {
        message: '登录成功'
    }
})

router.post('/users/logout', async ctx => {
    delete ctx.session.userinfo
    ctx.body = {
        message: '登出成功'
    }
})

router.get('/users/getUser', async ctx => {
    ctx.body = {
        message: '获取数据成功',
        userinfo: ctx.session.userinfo
    }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
```

## Token验证方式

首先来向下cookie-session模式的不足：
- 1. cookie机制依赖于浏览器，不够灵活
    - 如果是APP，没有cookie机制怎么办？
        - 有的做法是，让APP里的通信模块模拟session请求，但这个方法终归不是很好
    - 另外，跨域了怎么办？
- 2. cookie-session模式，需要将登陆信息存储在服务端，终究是服务器有状态的。
    - 那能不能提供一种无状态的方式，存储在客户端呢？


### 案例：JWT令牌验证

**JWT过程**：
1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个令牌(Token)，再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

- 前端
```js
axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("token");
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            // Bearer是JWT的认证头部信息
            config.headers.common["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

```
- 后端
```js
const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt"); // 鉴权中间件

const secret = "it's a secret"; // 需要保存在服务器端的密钥
app.use(bodyParser())
app.use(static(__dirname + '/'));

router.post('/users/login-token', async ctx => {
    // 核对登陆信息
    const { body } = ctx.request
    const userinfo = body.userinfo
    // 这里实际略过了账户密码匹配的过程，当验证登录成功后，要生成一个uuid
    ctx.body = {
        message: '登录成功',
        user: userinfo,
        // 生成token
        token: jwt.sign(
            {
                // 如果userinfo是用户输入的账号和密码，是不能直接放入payload的
                // 这里实际应该将uuid放入payload
                data: userinfo,
                // 一小时有效期
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            secret
        )
    }
})

router.get('/users/getUser-token',
    jwtAuth({
        secret
    }),
    async ctx => {
        // jwtAuth({secret}) 中间件鉴权成功后，会给ctx添加一个state属性
        ctx.body = {
            message: '获取数据成功',
            userinfo: ctx.state.user.data
        }
    }
)

app.use(router.routes())
app.listen(3000)
```


### JWT（JSON WEB TOKEN）原理解析

1. Bearer Token包含三个组成部分（Bearer实际上代表了这种定义规则）：
- 令牌头：base64编码，
- payload：base64编码
- 哈希

base64编码是可逆的，找[在线网站](https://base64.supfree.net/)就可以转回去看下是什么：
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdCIsImV4cCI6MTU2NzY5NjEzNCwiaWF0IjoxNTY3NjkyNTM0fQ.OzDruSCbXFokv1zFpkv22Z_9AJGCHG5fT_WnEaf72EA
```
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 => {"alg":"HS256","typ":"JWT"}
eyJkYXRhIjoidGVzdCIsImV4cCI6MTU2NzY5NjEzNCwiaWF0IjoxNTY3NjkyNTM0fQ => {"data":"test","exp":1567696134,"iat":1567692534}
OzDruSCbXFokv1zFpkv22Z_9AJGCHG5fT_WnEaf72EA => 乱码，不是base64编码格式
```

```js
// jsonwebtoken.js
const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678' // 可以随机数产生
const opt = {
  secret: 'jwt_secret',
  key: 'user'
}
const user = {
  username: 'abc',
  password: '111111'
}

const token = jsonwebtoken.sign({
  data: user,
  // 设置 token 过期时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secret)

console.log('生成token:' + token)
// 生成token:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTQ2OTQyMzk1LCJpYXQiOjE1NDY5Mzg3OTV9.VPBCQgLB7XPBq3RdHK9WQMkPp3dw65JzEKm_LZZjP9Y
console.log('解码:', jsonwebtoken.verify(token, secret, opt))
// 解码:
// { data: { username: 'abc', password: '111111' },
//  exp: 1546942395,
//  iat: 1546938795 }
```

1. **签名sign**：默认使用`base64`对payload编码，使用`hs256算法`对令牌头、payload和密钥进行签名**生成哈希**；
2. **验证verify**：默认使用`hs256算法`对令牌中**再做一次数据签名过程**，得到结果后，**与最初加密签名的令牌中哈希做比对**，看是否被篡改；
    - 如果比对一致，说明token有效，则从payload部分将有效信息解码出来；
    - 如果比对不一致，则说明token无效，报`invalid signature`；
3. 因此，secret密钥就非常重要，因为加解密的关键就是secret对外是绝密的，是不能泄露的。

**另外注意一点！**
```js
const user = {
  username: 'abc',
  password: '111111'
}

const token = jsonwebtoken.sign({
  data: user,
  // 设置 token 过期时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secret)
```
- data信息中不能像上面这样直接将用户名和密码这些敏感信息，放在payload中，因为通过base64解码直接就是明文，非常不安全。
- 所以，`敏感信息不能放在payload中`。


::: tip 补充信息
- HMAC SHA256
    - HMAC(Hash Message Authentication Code，散列消息鉴别码，基于密钥的Hash算法的认证协 议。消息鉴别码实现鉴别的原理是，用公开函数和密钥产生一个固定长度的值作为认证标识，用这个标识鉴别消息的完整性。使用一个密钥生成一个固定大小的小数据块，即MAC，并将其加入到消息中，然后传输。接收方利用与发送方共享的密钥进行鉴别认证等。

- BASE64
    - 按照RFC2045的定义，Base64被定义为:Base64内容传送编码被设计用来把任意序列的8位字节描述为一种不易被人直接识别的形式。常见于邮件、http加密，截取http信息，你就会发现登录操作的用户名、密码字段通过BASE64编码的。

- Beare
    - Beare作为一种认证类型(基于OAuth 2.0)，使用"Bearer"关键词进行定义

[阮大：JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

[koa-jwt](https://www.npmjs.com/package/koa-jwt)
:::

### cookie-session与Token简单对比
- session要求服务端存储信息，并且根据id能够检索，而token不需要(因为信息就在token中，这样实现了服务端无状态化)。
- 在大规模系统中，对每个请求都检索会话信息，可能是一个复杂和耗时的过程。但另外一方面服务端要通过token来解析用户身份也需要定义好相应的协议(比如JWT)。
- session一般通过cookie来交互，而token方式更加灵活，可以是cookie，也可以是 header，也可以放在请求的内容中。不使用cookie可以带来跨域上的便利性。
- token的生成方式更加多样化，可以由第三方模块来提供。token若被盗用，服务端无法感知，cookie信息存储在用户自己电脑中，被盗用风险略小。


*其实，在某些公司当中，虽然使用token但是依然是有状态token，相当于一个随机生成的字符串，每次都redis集群中去匹配来验证是否有效*


