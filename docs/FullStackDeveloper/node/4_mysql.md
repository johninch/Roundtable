# 4、持久化mysql

*mysql非常非常流行，其实是因为它是免费的，实际上它不好用，在很多场景下很难处理。*

*USE方法*

## 课堂目标

- 掌握node.js中实现持久化的多种方法
- 掌握mysql下载、安装和配置
- 掌握node.js中原生mysql驱动模块的应用
- 掌握node.js中的ORM模块Sequelize的应用
- 掌握Sequelize的应用案例

## nodejs中数据持久化的多种方法

- 实现文件系统数据库：fs
- 数据库
    - 关系型数据库：mysql
    - 文档型数据库：mongoDB
    - 键值对数据库：redis


## 文件系统数据库

```js
const fs = require("fs");

function get(key) {
  fs.readFile("./db.json", (err, data) => {
    const json = JSON.parse(data);
    console.log(json[key]);
  });
}
function set(key, value) {
  fs.readFile("./db.json", (err, data) => {
    // 可能是空文件，则设置为空对象
    const json = data ? JSON.parse(data) : {};
    json[key] = value; // 设置值
    // 重新写入文件
    fs.writeFile("./db.json", JSON.stringify(json), err => {
      if (err) {
        console.log(err);
      }
      console.log("写入成功！");
    });
  });
}

// 命令行接口部分
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", function (input) {
  const [op, key, value] = input.split(" ");

  if (op === 'get') {
    get(key)
  } else if (op === 'set') {
    set(key, value)
  } else if (op === 'quit') {
    rl.close();
  } else {
    console.log('没有该操作');
  }
});

rl.on("close", function () {
  console.log("程序结束");
  process.exit(0);
});

```

## mysql


### sequelize中间件

```js
(async () => {
	const Sequelize = require("sequelize");
	// 建立连接
	const sequelize = new Sequelize("kaikeba", "root", "example", {
		host: "localhost",
		dialect: "mysql",
		operatorsAliases: false // 仍可通过传入 operators map 至operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
	});
	// 定义模型
	const Fruit = sequelize.define("Fruit", {
		name: { type: Sequelize.STRING(20), allowNull: false },
		price: { type: Sequelize.FLOAT, allowNull: false },
		stock: { type: Sequelize.INTEGER, defaultValue: 0 }
	});
    // 同步数据库，force: true则会删除已存在表
    // let ret = await Fruit.sync()
    // console.log('sync',ret)
	ret = await Fruit.create({
		name: "香蕉",
		price: 3.5
	})
	console.log('create', ret)
	ret = await Fruit.findAll()
	await Fruit.update(
		{ price: 4 },
		{ where: { name: '香蕉' } })
	console.log('findAll', JSON.stringify(ret, '', '\t'))
	const Op = Sequelize.Op;
	ret = await Fruit.findAll({
		// where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
		where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
	})
	console.log('findAll', JSON.stringify(ret, '', '\t'))
})()



```



::: tips 简单说下：事务是什么？

A账户转10块钱到B账户，比如先检查A之后发现A有100块，接下来有两件事需要做：
- A减去10块钱
- B增加10块钱
这两件事需要同时成功或者同时失败，如果其中一个成功后发生意外，另一个没有成功，则会造成错误。

所谓事务，就是封装这两件事的执行，当都成功时才成功，如果其中一个没有正确执行，则会回退。

:::


