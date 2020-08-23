# 7、eggjs - 基于Koa定制自己的企业级三层框架

## 课程目标

- 如何实现一个「约定优于配置」的框架
- 在函数式编程中完成传值操作，就是进行「柯里化变换」

router.js：
eggjs的三层结构：controller.js => service.js => model.js

## Egg.js体验
```bash
# 创建项目
npm i egg-init -g
egg-init egg --type=simple
cd egg-example
npm i

# 启动项目
npm run dev
open localhost:7001
```

> 约定优于配置(convention over configuration)，也称作 「按约定编程」是一种软件设计范式，旨在减少软件开发人员需做决定的数量，简单又不失灵活。



#### 数据层

创建模型层：以mysql + sequelize为例演示数据持久化
```bash
npm install --save egg-sequelize mysql2
```
在 config/plugin.js 中引入 egg-sequelize 插件（`在eggjs中，所有功能都是以插件的形式存在的`）：
```json
sequelize: {
    enable: true,
    package: 'egg-sequelize',
}
```
在 config/config.default.js 中编写 sequelize 配置：
```json
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'kaikeba',
    },
  };
```


## 实现一个MVC框架


进行很多柯里化变换，只为把值传进去。

为了传入参数app，而升阶，把对象改成函数。


中间件的加载，不宜使用「约定优于配置」这种思路，因为中间件是有顺序的，还是需要自己配置来控制











