# 实现 防抖debounce & 节流throttle

## 原理及应用场景

防抖是将多次执行变为最后一次执行，节流是将多次执行变为在规定时间内只执行一次。

### 防抖

**原理**：通过定时器将回调函数进行延时。如果在规定时间内继续回调，发现存在之前的定时器，则将该定时器清除，并重新设置定时器。这里有个细节，就是后面所有的回调函数都要能访问到之前设置的定时器，这时就需要用到闭包。

- 用户其实只关心"最后一次"操作(也可以理解为停止连续操作后)所返回的结果。
  - **场景1**：`按钮频繁点击`（收藏，点赞，心标等）
  - **场景2**：`输入搜索联想`，用户在不断输入值时，用防抖来节约请求资源。

### 节流

**原理**：通过标志位判断当前定时器是否在执行，如果定时器开始执行，则标志位设置为不能触发，此时又进来的触发请求会被直接return，当目前的定时器执行结束后，将标志位恢复为可以触发。

- 用户在操作过程中需要持续的反馈，而不是只关心"最后一次"操作后的结果反馈
  - **场景1**：鼠标不断点击触发，点击事件在规定时间内只触发一次
  - **场景2**：监听滚动事件，`上拉刷新、下拉加载`等



## mtd
```js
 /**
  * 当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件
  */
 
  // 非立即执行
  const debounce = (func, wait, ...args) => {
    let timeout;
    return function(){
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args)
      },wait);
    }
  }
 
 
    // 立即执行
    const debounce = (func, wait, ...args) => {
      let timeout;
      return function(){
        const context = this;
        if (timeout) clearTimeout(timeout);
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        },wait)
    
        if(callNow) func.apply(context,args)
      }
    }
    
    // 结合版
    
  function debounce(func,wait,immediate) {
      var timeout;

      return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(function(){
            timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
        }
        else {
          timeout = setTimeout(function(){
            func.apply(context, args)
          }, wait);
        }
      }
    }
    
```

```js
    /*
    * throttle（节流），当持续触发事件时，保证间隔时间触发一次事件
    * 持续触发事件时，throttle 会合并一定时间内的事件，并在该时间结束时真正去触发一次事件
    */
    
    // 在持续触发事件的过程中，函数会立即执行，并且每 1s 执行一次。
    const throttle = (func, wait, ...args) => {
      let pre = 0;
      return function(){
        const context = this;
        let now = Date.now();
        if (now - pre >= wait){
          func.apply(context, args);
          pre = Date.now();
        }
      }
    }
    
    //  在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次
    const throttle = (func, wait, ...args) => {
      let timeout;
      return function() {
        const context = this;

        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait)
        }
      }
    };
    
    // 结合版
    /**
     * @desc 函数节流
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param type 1 时间戳版(立即执行) 2 定时器版(非立即执行)
     */
    function throttle(func, wait ,type) {
      if(type===1){
        var previous = 0;
      }else if(type===2){
        var timeout;
      }

      return function() {
        var context = this;
        var args = arguments;
        if(type===1){
          var now = Date.now();

          if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
          }
        }else if(type===2){
          if (!timeout) {
            timeout = setTimeout(function() {
              timeout = null;
              func.apply(context, args)
            }, wait)
          }
        }

      }
    } 
```

## johninch

### 防抖debounce

- 函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次
- 函数防抖的要点，需要一个setTimeout来辅助实现。延迟执行需要跑的代码。
- 如果方法多次触发，则把上次记录的延迟执行代码用clearTimeout清掉，重新开始。
- 如果计时完毕，没有方法进来访问触发，则执行代码。
```js
const debounce = (fn, time) => {
    let timer
    return function(...args) {
        let that = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn,apply(that, [...args])
        }, time)
    }
}

/**
 * @param {*} handler
 * @param {*} delay 
 * @param {boolean} immediate: 是否立即执行一次
 */
const debounce2 = (handler, delay = 300, immediate = false) => {
  let timer;
  let canDo = true
  return function() {
    const ctx = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      if (canDo) {
        canDo = false
        handler.apply(ctx, arguments)
      }
      timer = setTimeout(() => {
        canDo = true
      }, delay)
    } else {
      timer = setTimeout(() => {
        handler.apply(ctx, arguments)
      }, delay)
    }
  }
}
```
### 节流throttle

- 函数节流是指一定时间内js方法只跑一次。
- 函数节流的要点是，声明一个变量当标志位，记录当前代码是否在执行。
- 如果空闲，则可以正常触发方法执行；如果代码正在执行，则取消这次方法执行，直接return。
```js
const throttle = (fn, time) => {
    let canDo = true;
    return function(...args) {
        if (!canDo) {
            return
        }
        canDo = false
        let that = this
        setTimeout(() => {
            fn.apply(that, [...args])
            canDo = true
        }, time)
    }
}

/**
 * @param {*} handler
 * @param {*} delay 
 * @param {boolean} immediate: 是否立即执行一次
 */
const throttle2 = (handler, delay = 300, immediate = false) => {
  let canDo = true;
  return function() {
    if (!canDo) {
      return;
    }
    if (immediate) {
      handler.apply(this, arguments)
      canDo = false
      setTimeout(() => {
        canDo = true
      }, delay)
    } else {
      let ctx = this;
      setTimeout(() => {
        handler.apply(ctx, arguments)
      }, delay)
    }
  }
}
```

## superyk
### 防抖
```js
// 防抖，maxWait防止假死
function debounce(fun, wait, maxWait){
    let timer = null;
    let lastRunTime = Date.now();

    return function(...args){
        const context = this;
        const now = Date.now();

        if(timer) {
            clearTimeout(timer);
            if(now - lastRunTime > maxWait){
                lastRunTime = Date.now();
                fun.apply(context, args);
            }
        } else {
            lastRunTime = Date.now(); // 立即执行
            fun.apply(context, args); // 立即执行
        }

        timer = setTimeout(function(){
            timer = null;
            // lastRunTime = Date.now(); // 延迟执行
            // fun.apply(context, args); // 延迟执行
        }, wait);
    }
}
```
### 节流
```js
function throttle(fun, wait){
    let timer = null;

    return function(...args){
        const context = this;
        if(timer) return;

        timer = setTimeout(function(){
            timer = null;
            // fun.apply(context, args); // 延迟执行
        }, wait);

        fun.apply(context, args); // 立即执行
    }
}
```

## Wlxm

```js
function throttle(fn: Function, timeout: number = 200, immediate = false) {
    let timer: number = null;
    let isNotExecuted = true;

    return function(...args: any) {
        if (timer !== null) {
            if (isNotExecuted && immediate) {
                fn(...args);
                isNotExecuted = false;
            }

            return;
        }

        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, timeout);
    }
}
```