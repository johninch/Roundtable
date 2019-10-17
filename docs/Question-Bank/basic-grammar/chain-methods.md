---
{
  "title": "链式调用实现",
}
---

### 链式调用实现

> 实现类似Jquery的链式调用
> 例如：$('div').addClass('add-class')

----

#### 推荐答案:

```js
  let jq = function (selector) {
    return new jq.prototype.init(selector);
  };

  jq.prototype.init = function (selector) {
    this.el = document.querySelector(selector);

    return this;
  };

  jq.prototype.on = function (name, fn) {
    this.el.addEventListener(name, fn);

    return this;
  };
  jq.prototype.attr = function (name, value) {
    if (!value) {
      return this.el.getAttribute(name);
    } else {
      this.el.setAttribute(name, value);
      return this;
    }
  };
  jq.prototype.init.prototype = jq.prototype;

  // jq('#test').on('click', function () {}).attr('title', '1111')
```

----
<details>
<summary>johninch:</summary>

- 原理：其实链式调用就是让一个类的每个方法都返回this值，从而达到链式调用；
- 步骤：首先创建一个构造函数，把那些元素作为数组保存在一个实例属性中，并把所有定义在构造器函数上的prototype属性指向对象中的方法都返回用以调用方法的那个实例的引用，那么它就具有了进行链式调用的能力。

```js
function JQuery(selector) {
    this.elements = document.querySelectorAll(selector);
}

JQuery.prototype = {
    eq: function(index) {
        this.elements = [this.elements[index]]
        return this;
    },
    css: function(prop, value) {
        this.elements.forEach(function(el) {
            // 动态设置属性
            el.style[prop] = value;
        })
        return this;
    },
    show: function() {
        this.css('display', 'block')
        return this;
    },
}

window.$ = function(selector) {
  return new JQuery(selector);
}

$('div').eq(0).css('width', '200px').show();
```
这段代码很明显在prototype上的三个函数都返回了this，在函数中实现对应的功能也是直接使用this来获取值，然后修改this中的值再返回this，这样在下次调用的时候还是JQuery对象，从而实现了链式调用。既然函数都是在原型链上，那么肯定需要创建一个对象才能去调用函数吧，而我们并没看到new JQuery，而且也没有看见$符号，那怎么才能使用呢。

说到链式调用，还能想到curry：
```js
function add(num){
    var sum = 0
    sum = sum + num
    var tempFun = function(numB) {
        if(arguments.length === 0) {
            return sum
        } else {
            sum = sum + numB
            return tempFun
        }

    }

    tempFun.valueOf = function() {
        return sum
    }
    tempFun.toString = function() {
        return sum + ''
    }

    return tempFun
}
```
[相关链接](https://segmentfault.com/q/1010000004342477)

</details>

<details>
<summary>febcat:</summary>

```javascript
class Chain {
    constructor() {
      this.dom = null
      this.fontColor = '#000'
      this._init()
    }

    _init() {
      window.$ = this._$.bind(this)
    }

    _$(tagName) {
      if (!tagName) {
        console.error('Chain: tagName not found')
        return
      }

      const newDom = document.createElement(tagName)

      newDom.style.color = this.fontColor
      newDom.style.width = 100 + 'px'
      newDom.style.height = 100 + 'px'
      this.dom = newDom

      return this
    }

    _setColor(c) {
      this.dom.style.color = this.fontColor =  c

      return this
    }

    _getColor() {
      return this.fontColor
    }

    color(c) {
      return c ? this._setColor(c) : this._getColor()
    }

    show() {
      document.querySelector('body').appendChild(this.dom)

      return this
    }
  }

  new Chain()
  console.log('------ chain ------')
  console.log('chain=> show ', $('div').color('green').background('#000').show())
  console.log('chain=> color ', $('div').color())

```
</details>

<details>
<summary>Caleb:</summary>

``` javascript
var $ = function(id) {
	var dom = document.getElementById(id);
	return new $2(dom);
}

var $2 = function(dom) {
	this.dom = dom
};

$2.prototype = {
	addClass : function(className){
		if(this.dom){
			this.dom.setAttribute('class', className)
		}
		return this
	}
}

$('div').addClass('ppp')

```
</details>

<details>
sdfsdfsdf
<summary>Xmtd:</summary>

```js
  let jq = function (selector) {
    return new jq.prototype.init(selector);
  };

  jq.prototype.init = function (selector) {
    this.el = document.querySelector(selector);

    return this;
  };

  jq.prototype.on = function (name, fn) {
    this.el.addEventListener(name, fn);

    return this;
  };
  jq.prototype.attr = function (name, value) {
    if (!value) {
      return this.el.getAttribute(name);
    } else {
      this.el.setAttribute(name, value);
      return this;
    }
  };
  jq.prototype.init.prototype = jq.prototype;

  // jq('#test').on('click', function () {}).attr('title', '1111')
```
</details>

<details>
<summary>niannings:</summary>

```js
/**
 * 将一个对象转化为可链式调用的对象
 * @param {object} obj 对象
*/
const chainify = obj =>
  new Proxy(Object(obj), {
    get(o, p, r) {
      if (typeof o[p] === 'function') {
        return (...args) => {
          o[p](...args);

          return r
        }
      }

      return Reflect.get(o, p, r);
    }
  });

// 测试
const a = {
  p: 100,
  foo() {
    console.log(1)
  },
  bar(x) {
    console.log(x + this.p)
  }
}

chainify(a).foo().bar(100)
```
</details>
