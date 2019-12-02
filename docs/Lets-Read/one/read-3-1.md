---
{
    "title": "前端高性能渲染十万条数据",
}
---
> 本文探讨：当遇到大量数据时，如何才能在不卡主页面的情况下渲染数据，以及其背后的原理。以下比较了4种不同的方式：
1. 暴力渲染
2. setTimeout
3. requestAnimationFrame
4. DocumentFragment 

### 暴力渲染
```
// 记录任务开始时间
let now = Date.now();
// 插入十万条数据
const total = 100000;
// 获取容器
let ul = document.getElementById('container');
// 将数据插入容器中
for (let i = 0; i < total; i++) {
    let li = document.createElement('li');
    li.innerText = ~~(Math.random() * total)  // ~~
    ul.appendChild(li);
}

console.log('JS运行时间：',Date.now() - now);
setTimeout(()=>{
  console.log('总运行时间：',Date.now() - now);
},0)
// print: JS运行时间： 187ms
// print: 总运行时间： 2844ms
```

> 简单说明一下，为何两次console.log的结果时间差异巨大，并且是如何简单来统计JS运行时间和总渲染时间：

> 在 JS 的Event Loop中，当JS引擎所管理的执行栈中的事件以及所有微任务事件全部执行完后，才会触发渲染线程对页面进行渲染
 - 第一个console.log的触发时间是在页面进行渲染之前，此时得到的间隔时间为JS运行所需要的时间
 - 第二个console.log是放到 setTimeout 中的，它的触发时间是在渲染完成，在下一次Event Loop中执行的

**结果：页面卡顿，是由于同时渲染大量DOM所引起的，所以下面考虑将渲染过程分批进行：**

### setTimeout
```
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total/once
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    setTimeout(()=>{
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount,curIndex + pageCount)
    },0)
}
loop(total,index);
```
**导致结果：渲染加快但是有白屏或闪屏现象**

##### 闪屏原因
> - **FPS**：表示的是每秒钟画面更新次数，是描述帧变化速度的物理量。
- **FPS为60frame/s**：大多显示器会以每秒60次的频率，不断的更新屏幕上的图像。
- **16.7ms**：根据视觉暂留现象，最平滑动画的最佳循环间隔是1000ms/60，约等于16.7ms。

##### setTimeout与闪屏的关系 -> 刷新步调可能会 不一致
> - setTimeout的执行时间并不是确定的。实际执行时间可能会比其设定的时间晚一些。
- 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的刷新频率可能会不同，而setTimeout只能设置一个固定时间间隔，这个时间不一定和屏幕的刷新时间相同。

以上两种情况都会导致setTimeout的执行步调和屏幕的**刷新步调不一致**。
在setTimeout中对dom进行操作，必须要等到屏幕下次绘制时才能更新到屏幕上，如果两者步调不一致，就**可能导致中间某一帧的操作被跨越过去**，而直接更新下一帧的元素，从而**导致丢帧现象**。


### requestAnimationFrame（不会产生丢帧现象）
requestAnimationFrame是系统来决定回调函数的执行时机。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象。

```
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total/once
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    window.requestAnimationFrame(function(){
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount,curIndex + pageCount)
    })
}
loop(total,index);

```
**结果：很流畅，没有出现闪烁丢帧的现象，但还能再优化**


### 使用 DocumentFragment
> - DocumentFragment，文档片段接口，它被作为一个轻量版的 Document 使用。DocumentFragments是DOM节点，但并不是	DOM树的一部分，可以认为是存在内存中的，所以将子元素插入到文档片段时不会引起页面回流。可以用于避免回流操作。
- 可以使用document.createDocumentFragment 方法或者构造函数来创建一个空的 DocumentFragment.

```
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total/once
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    window.requestAnimationFrame(function(){
        let fragment = document.createDocumentFragment();
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        loop(curTotal - pageCount,curIndex + pageCount)
    })
}
loop(total,index);
```

### 使用 display
可以先将元素脱离文档流、对其修改、在带回文档流，比如 display:none，添加修改完最后 在display: block

参考链接：[高性能渲染十万条数据](https://juejin.im/post/5d76f469f265da039a28aff7)
