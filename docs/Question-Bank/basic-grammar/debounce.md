### 实现防抖函数 debounce

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

### 实现节流函数 throttle

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

## 防抖与节流实现scroll
```js
// 防抖
// 例如，绑定页面滚动scroll事件，可能会在页面滚动期间频繁触发，假如希望最多300ms内只触发一次，编写代码实现

var timer = false
document.getElementById('debounce').onscroll = function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
        console.log('函数防抖')
    }, 300);
}

// 节流
// 例如，绑定页面滚动scroll事件，可能会在页面滚动期间频繁触发，假如希望最多300ms内只触发一次，编写代码实现

var canScroll = true
document.getElementById('throttle').onscroll = function() {
    if (!canScroll) return
    canScroll = false
    setTimeout(() => {
        console.log('函数节流')
        canScroll = true
    }, 300);
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