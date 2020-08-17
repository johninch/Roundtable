# 1扩展、实现一个简单CLI工具

[github: demo-cli-auto-router](https://github.com/johninch/demo-cli-auto-router)

## 脚手架基本实现

### 创建工程
```js
mkdir demo-cli-auto-router
cd demo-cli-auto-router

npm init -y
npm i commander download-git-repo ora handlebars figlet clear chalk open -s
```

bin/inch.js:
```js
#!/usr/bin/env node
// 指定脚本解释器为node

console.log('cli.....')
```

package.json:
```json
"bin": {
  "inch": "./bin/inch.js"
},
```

```bash
# 将npm 模块链接到对应的运行项目中去
npm link

# 删除的情况
ls /usr/local/bin/
rm /usr/local/bin/inch
```


### 定制命令行界面
bin/inch.js
```js
#!/usr/bin/env node
// 第一行是指定脚本解释器为node，对于shell来说需要约定解释类型

const program = require('commander')
const pkg = require('../../package.json')

program.version(pkg.version)

program
    .command('init <name>')
    .description('init project   ')
    .action(require('../lib/init'))

program
    .command('refresh')
    .description('refresh routers and menu')
    .action(require('../lib/refresh'))

program.parse(process.argv) // 解析主进程参数
```

### 克隆脚手架
/lib/download.js
```js
const { promisify } = require('util');

module.exports.clone = async (repo, desc) => {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    const process = ora(`下载中：${repo}`)

    process.start()
    await download(repo, desc)
    process.succeed()
}
```



### 打印欢迎界面及安装依赖

> child_process.spawn(command[, args][, options]) 方法使用给定的 command 衍生新的进程，并传入 args 中的命令行参数。 如果省略 args，则其默认为空数组。

```js
const { promisify } = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))

const { clone } = require('./download')

const spawn = async (...args) => {
    const { spawn } = require('child_process') // 子进程
    return new Promise(resolve => {
        const proc = spawn(...args)

        proc.stdout.pipe(process.stdout) // 正常流插入主进程流
        proc.stderr.pipe(process.stderr) // 错误流插入主进程流

        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    try {
        // 打印欢迎界面
        clear()
        const data = await figlet('INCH WELCOME')
        log(data)

        // clone
        // 其实vue初始化工程，也就是直接从git上下载一个模板
        log(`🚀创建项目： ${name}`)
        await clone('github:johninch/vue-template', name)

        // 自动安装依赖
        log('🔨安装依赖')
        await spawn('npm', ['install'], {cwd: `./${name}`}) // cwd指定运行位置
        log(`
👌安装完成~
To Get Start：
================================================
    cd ${name}
    npm run serve
================================================
        `)
    } catch(err) {
        log(err)
    }
}
```

## 添加约定路由功能

### 脚手架功能实现

> 其实就是读取views下新增的页面组件，根据hbs模板，动态生成路由定义，动态生成菜单

> 代码模板渲染 hbs(handlebars) Mustache 风格模板

/lib/refresh.js
```js
const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

const refresh = async () => {
    // 获取列表
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }))

    // 生成路由定义
    compile({list}, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    /**
     * 模板编译
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件
     * @param {*} templatePath 模板文件
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString()
            const result = handlebars.compile(content)(meta) // 柯里化式调用
            fs.writeFileSync(filePath, result)
            console.log(`🚀${filePath} 创建成功`)
        }
    }
}

module.exports = refresh
```

/bin/inch.js
```js
program
    .command('refresh')
    .description('refresh routers and menu')
    .action(require('../lib/refresh'))
```

### hbs模板长啥样

根据router.js.hbs，生成路由
```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {{#each list}}
    {
      path: '/{{name}}',
      name: '{{name}}',
      component: () => import('./views/{{file}}')
    },
    {{/each}}
  ]
})
```

根据App.vue.hbs，生成菜单
```js
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      {{#each list}}
      | <router-link to="/{{name}}">{{name}}</router-link>
      {{/each}}
    </div>
    <router-view/>
  </div>
</template>
```



## 发布npm

publish.sh
```bash
#!/usr/bin/env bash

npm config get registry # 检查仓库镜像库
npm config set registry=https://registry.npm.org

echo '请进行登录相关操作：'
npm login # 登录

echo "--------publishing--------"
npm publish # 发布

npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
echo "发布完成"

exit
```

命令行运行脚本：
```bash
# 赋予脚本权限
chmod +x ./publish.sh

# 执行
./publish.sh

https://registry.npm.taobao.org/
请进行登录相关操作：
Username: johninch
Password:
Email: (this IS public) xxx
```





