## package.lock.json

## 要点

- 如果你使用的 npm 版本 为 ^5.x.x , package-lock.json 会默认自动生成
- 你应该使用 package-lock 来确保一致的安装和兼容的依赖关系
- 你应该将 package-lock 提交到源代码控制
- 从npm ^ 5.1.x开始，package.json能够胜过 package-lock.json，所以你遇到较少让人头痛的问题
- 不再删除 package-lock 只是需要运行npm install并重新生成它
- ```package.json```只能锁定大版本，比如：```typescript: ^3.0``` 向上标号```^```是定义了向后（新）兼容依赖，如果当前有超过```3.0```的版本(在大版本```3.x```内)，比如```3.1```就会安装```3.1```。
- ```package-lock.json```的作用就是用来保证我们的应用程序依赖之间的关系是一致的, 兼容的.
- 能保证```npm install```时忽略```^```，除非手动修改```package.json```里面的版本号，或者通过```npm i webpack```或```npm i webpack@xx.xx.xx```更新依赖。这样```package.json```和```package.lock.json```都会更新。
## 参考文章

深入了解的话，强烈建议阅读：

- [你想知道关于package-lock.json的一切，但是太害怕了问了？](https://segmentfault.com/a/1190000017239545)