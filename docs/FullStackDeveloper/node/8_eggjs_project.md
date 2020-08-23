# 8、eggjs最佳实践

- 基于插件的Swagger-doc接口定义
- 统一异常处理
- 基于扩展的helper响应统一处理
- Validate接口格式检查
- 三层结构
- jwt统一鉴权
- 文件上传

## 实战

搭建egg平台

### 创建项目
```bash
# 创建项目
npm i egg-init -g
egg-init egg-server --type=simple
cd egg-server
npm i

# 启动项目
npm run dev
open localhost:7001
```


### 添加SwaggerDoc功能

> Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful ⻛格的 Web 服务。
```bash
npm install egg-swagger-doc-feat -s
```

添加swagger配置：
```js
// config/plugin
swaggerdoc : {
    enable: true,
    package: 'egg-swagger-doc-feat',
}

// config.default.js
config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
        title: '开课吧接口',
        description: '开课吧接口 swagger-ui for egg', version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true, // 根据JSdoc中的@router自动注册路由
    enable: true,
}
```
其中注意一点：`routerMap: true, // 根据JSdoc中的@router自动注册路由`


### 增加异常处理中间件

增加异常处理中间件
- 异常统一处理
- 开发环境返回详细异常信息
- 生产环境不返回详细信息

```js
// /middleware/error_handler.js
module.exports = (option, app) => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            app.emit('error', err, this)

            // 统一的错误应答
            const status = err.status || 500
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'production' ?
                'Internal Server Error' :
                err.message

            ctx.body = {
                code: status,
                error
            }
            if (status === 422) {
                ctx.body.detail = err.errors
            }
            ctx.status = 200
        }
    }
}
```

```js
// config.default.js
config.middleware = ['errorHandler'];
```

### 统一正常响应格式helper方法

Helper 函数用来提供一些实用的函数。它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处。另外还有一个好处是 Helper 这样一个简单的函数，可以让我们更容易编写测试用例。框架内置了一些常用的 Helper 函数。我们也可以编写自定义的 Helper 函数。

```js
// extend/helper.js
const moment = require('moment') // 格式化时间

exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
    ctx.body = {
        code: 0,
        data: res,
        msg
    }
    ctx.status = 200
}
```

```js
// controller/user.js
const res = {
    abc: 123
}

// 设置响应内容
ctx.helper.success({ ctx, res })
```

### 接口有效性检查

```bash
npm i egg-validate -s
```
```js
// config/plugin.js
validate: {
    enable: true,
    package: 'egg-validate',
},
```
```js
// controller/user.js
async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
}
```


### 添加model层

```bash
# 安装 mongodb
brew update
brew install mongodb
# 启动
brew services start mongodb
# 在浏览器输入 http://localhost:27017/，页面显示 It looks like you are trying to access MongoDB over HTTP on the native driver port. 表示启动成功！
mongo
# 回车后即可进入 mongodb 管理
use DATABASE_NAME
# 可用于切换数据库，如果不存在，则创建一个数据库并切换到新创建的数据库。
```

```bash
npm install egg-mongoose -s
```

### 添加Service层

加密信息
```bash
npm install egg-bcrypt -s
```

```js
bcrypt: {
    enable: true,
    package: 'egg-bcrypt'
}
```

```js
// service/user.js
const Service = require('egg').Service
class UserService extends Service {
    /**
    * 创建用户
    * @param {*} payload */
    async create(payload) {
        const { ctx } = this
        payload.password = await this.ctx.genHash(payload.password)
        return ctx.model.User.create(payload)
    }
}

module.exports = UserService
```

### Controller调用
```js
/**
* @summary 创建用户
* @description 创建用户，记录用户账户/密码/类型 * @router post /api/user
* @request body createUserRequest *body
* @response 200 baseResponse 创建成功
*/
async create() {
    const { ctx, service } = this
    // 校验参数 ctx.validate(ctx.rule.createUserRequest) // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload) // 设置响应内容和响应状态码 ctx.helper.success({ctx, res})
}
```

### 开发环境初始化数据

通过生命周期初始化数据，略


### 用户鉴权模块

注册jwt模块
```js
npm i egg-jwt -s
```

代码略


### 文件上传
```bash
npm i await-stream-ready stream-wormhole image-downloader -s
```

上传需要注意两个问题：
- 1、使用await等待pipe执行，会在pipe未上传完成时返回，这是不合理的
    - 因此，需要使用`awaitWriteStream`来使得pipe完成后再await完成。
- 2、如果pipe stream的过程中出错，未消费掉的stream会造成浏览器响应卡死
    - 因此，需要使用`sendToWormhole`，将stream引入`虫洞`，假装消费掉文件流。
```js
// app/controller/upload.js
const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')

/**
 * @Controller 上传
 */
class UploadController extends Controller {
    constructor(ctx) {
        super(ctx)
    }

    // 上传单个文件
    /**
     * @summary 上传单个文件
     * @description 上传单个文件
     * @router post /api/upload/single
     */
    async create() {
        const { ctx } = this
        // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
        // 只支持上传一个文件。
        // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
        const stream = await ctx.getFileStream()
        // 所有表单字段都能通过 `stream.fields` 获取到
        const filename = path.basename(stream.filename) // 文件名称
        const extname = path.extname(stream.filename).toLowerCase() // 文件扩展名称
        const uuid = (Math.random() * 999999).toFixed()

        // 组装参数 stream
        const target = path.join(this.config.baseDir, 'app/public/uploads', `${uuid}${extname}`)
        const writeStream = fs.createWriteStream(target)
        // 文件处理，上传到云存储等等
        try {
            await awaitWriteStream(stream.pipe(writeStream))
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream)
            throw err
        }
        // 调用 Service 进行业务处理
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}


module.exports = UploadController
```

