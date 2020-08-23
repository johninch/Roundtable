# 5、持久化之MongoDB

## 目标

- 掌握mongodb基本使用
- 理解文档型数据库设计理念
- 掌握原生模块node-mongodb-native应用
- 掌握ODM模块mongoose应用
- 了解快速开发工具KeyStoneJS

## 优势

::: tip 文档型数据库好用在哪里
对象或者说json可以直接放在数据库中，这其实是关系型数据库的梦想，mysql需要通过数据库中间件比如sequlize转译，才能像操作对象一样操作数据库。
:::

对于一致性很强是系统，还是适合选用mysql这种传统的关系型数据库；其他情况可以使用mongo。


## mongoDB基础使用

```js
// models/conf.js
module.exports = {
    url: "mongodb://localhost:27017",
    dbName: 'test',
}
```

```js
// models/db.js
const conf = require("./conf");
const EventEmitter = require("events").EventEmitter;

// 客户端
const MongoClient = require("mongodb").MongoClient;

class Mongodb {
    constructor(conf) {
        // 保存conf
        this.conf=conf;

        this.emitter = new EventEmitter();
        // 连接
        this.client = new MongoClient(conf.url, { useNewUrlParser: true });
        this.client.connect(err => {
            if (err) throw err;
            console.log("连接成功");
            this.emitter.emit("connect");
        });
    }
    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName);
    }
    once(event, cb) {
        this.emitter.once(event, cb);
    }
}

// 2.导出db
module.exports = new Mongodb(conf);
```

```js
// index.js 接口编写
// 分页、类别搜索，模糊查询
const express = require("express")
const app = express()
const path = require("path")
const mongo = require("./models/db")
// const testdata = require("./initData")

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./index.html"))
})

app.get("/api/list", async (req, res) => {
    const { page, category, keyword } = req.query
    try {

        const conditions = {}

        if (category) {
            condition.category = category
        }
        if (keyword) {
            condition.name = {$regex: new RegExp(keyword)}
        }

        // 分页查询
        const col = mongo.col("fruits")
        const total = await col.find(conditions).count()
        const fruits = await col
            .find(conditions)
            .skip((page - 1) * 5)
            .limit(5)
            .toArray()
        res.json({ ok: 1, data: { fruits, pagination: { total, page } } })
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/category", async (req, res) => {
    const col = mongo.col("fruits")
    const data = await col.distinct('category')
    res.json({ ok: 1, data })
})

app.listen(3000)
```

```js
// initData.js 添加测试数据
const mongodb = require('./models/db')

mongodb.once('connect', async () => {
    const col = mongodb.col('fruits')
    // 删除已存在
    await col.deleteMany()
    const data = new Array(100).fill().map((v, i) => {
        return {
            name: "XXX" + i,
            price: i,
            category: Math.random() > 0.5 ? '蔬菜' : '水果'
        }
    })

    // 插入
    await col.insertMany(data)
    console.log("插入测试数据成功")
})
```

## ODM - Mongoose

优雅的NodeJS对象文档模型object document model。也是数据库中间件。

::: tip mongoDb已经是对象映射了，还需要ODM吗？

Mongoose无需提供对象映射了，唯一的好处在于，`提供了「模型Schema」`。在mysql关系型数据库中，系统设计需要先由模型，再跟进模型建表，而在mongoDb中，没有可以定义模型的地方。所以就需要Mongoose的存在。

Mongoose有两个特点:
- 通过关系型数据库的思想来设计非关系型数据库
- 基于mongodb驱动，简化操作
:::

### 基本操作

相比于上节，操作上实际上都是差不多简单的，唯一的好就是明确定义了模型Schema。

```bash
npm install mongoose -S
```

```js
// mongoose.js
const mongoose = require("mongoose");

// 1.连接
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));
conn.once("open", async () => {
    // 2.定义一个Schema - Table
    const Schema = mongoose.Schema({
        category: String,
        name: String
    });
    // 3.编译一个Model, 它对应数据库中复数、小写的Collection const Model = mongoose.model("fruit", Schema);
    try {
        // 4.创建，create返回Promise
        let r = await Model.create({
            category: "温带水果", name: "苹果",
            price: 5
        });
        console.log("插入数据:", r);
        // 5.查询，find返回Query，它实现了then和catch，可以当Promise使用
        // 如果需要返回Promise，调用其exec()
        r = await Model.find({ name: "苹果" }); console.log("查询结果:", r);
        // 6.更新，updateOne返回Query
        r = await Model.updateOne({ console.log("更新结果:", r);
        // 7.删除，deleteOne返回Query
        r = await Model.deleteOne({ console.log("删除结果:", r);
    } catch (error) {
        console.log(error);
    }
});
```

## mongoose-Restful自动生成CRUD接口

定义模型，自动生成CRUD接口：
- 反向工程，代码生成器
- 动态编程
    - 根据文件夹，自动加载model模块
    - 自动产生路由：注册通配路由router

代码略...

