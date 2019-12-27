---
title: 异步请求中打开新窗口拦截问题
---

## 打开一个新标签页的方式

- 通过a标签 ```<a href='' target="_blank">```
- window.open() 方式

在一个异步请求中，使用这两种方式打开新页面会触发浏览器的拦截机制，要打开的页面会被拦截掉；然而在非异步的方式打开新页面不会受到影响；
举个大概例子：
``` js
redirectNewPage = async() {
	await http.get();
	window.open('http://www.baidu.com')
 }
}
```
这种异步方式，如果浏览器打开了拦截，页面会被拦截掉

## 解决方式
这里针对window.open方式打开新页面的解决方式，但是方法不是很完美
``` js
redirectNewPage = async() {
	const newPage = window.open(); 在发起请求前先打开一个新窗口
	await http.get();
	<!-- window.open('http://www.baidu.com') -->
	newPage.location.href = 'http://www.baidu.com'
 }
}

```

[这里有针对各个浏览器的总结](https://juejin.im/post/5bdee507e51d4567953e6cdd)



