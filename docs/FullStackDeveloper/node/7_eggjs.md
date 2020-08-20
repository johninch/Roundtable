# eggjs - 基于Koa定制自己的企业级三层框架

## 课程目标



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

> 约定优于配置(convention over configuration)，也称作 「按约定编程」是一种软件设计范式，旨在减少软件开发人员需做决定的数量，获得简单的好处，而又不失灵活性。



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









