---
{
    "title": "数组扁平化",
}
---

啦啦啦啦

### 实现数组扁平化

> 数组扁平化： [1, [2, [3, 4]]] =>> [1, 2, 3, 4]

#### 推荐答案:

>> 方法一：常规递归：

```js
let newArr = []
function flatten(arr) {
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flatten(arr[i])
        } else {
            newArr.push(arr[i])
        }
    }
}

flatten([1, [2, [3, 4]]])
console.log(newArr)
```

以上递归使用了全局变量，递归函数应该是完整功能隔离的，下面是优化后的递归:

```js
function flatten(arr) {
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i]))
        } else {
            newArr.push(arr[i])
        }
    }

    return newArr
}
flatten([1, [2, [3, 4]]])
```
以下将 result 作为第二个参数 传入的方式也很巧妙
```js
function flatten(target, result = []) {
    target.forEach((item) => {
        if (Array.isArray(item)) {
            flatten(item, result);
        } else {
            result.push(item);
        }
    });

    return result;
}
```

使用reduce迭代器简化上述递归方法:
```js
function flatten(arr) {
    return arr.reduce((prev, item) => {
        return prev.concat(Array.isArray(item) ? flatten(item) : item)
    }, [])
}
```

>> 方法二：使用ES6扩展运算符（一次只能展开一层）

```js
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
        // 也可以利用apply方法 arr = [123].concat.apply([], arr)
        // 由于 apply 的第二个参数传入的是[a, b, c],所以每次也只能展开一层
        // 前面的[123]是随便写的，只要是数组即可，apply的第一个参数[]借用了[123]的concat方法，才是真正的方法调用者
    }
    return arr
}

flatten([1, [2, [3, 4]]])
```

>> 方法三：由于元素均为数字，因此可使用隐式类型转换

```js
[1, [2, [3, 4]]].toString().split(',').map(i => Number(i))
// toString也可以替换成join方法，也可以达到隐式类型转换的目的
```

----

<details>
<summary>组员答案</summary>

#### johninch

>> 方法一：常规递归：

```js
let newArr = []
function flatten(arr) {
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flatten(arr[i])
        } else {
            newArr.push(arr[i])
        }
    }
}

flatten([1, [2, [3, 4]]])
console.log(newArr)
```

以上递归使用了全局变量，递归函数应该是完整功能隔离的，下面是优化后的递归:

```js
function flatten(arr) {
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr = newArr.concat(flatten(arr[i]))
        } else {
            newArr.push(arr[i])
        }
    }

    return newArr
}
flatten([1, [2, [3, 4]]])
```

使用reduce迭代器简化上述递归方法:
```js
function flatten(arr) {
    return arr.reduce((prev, item) => {
        return prev.concat(Array.isArray(item) ? flatten(item) : item)
    }, [])
}
```

>> 方法二：使用ES6扩展运算符（一次只能展开一层）

```js
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

flatten([1, [2, [3, 4]]])
```

>> 方法三：由于元素均为数字，因此可使用隐式类型转换

```js
[1, [2, [3, 4]]].toString().split(',').map(i => Number(i))
// toString也可以替换成join方法，也可以达到隐式类型转换的目的
```
----
#### febcat:

```javascript
const flattenArray = array => {
  if (!/\[\S+\]/.test(JSON.stringify(array))) {
    return array
  }

  return [
    ...new Set(
      array.reduce((arr, item) => {
        return Array.isArray(item) ?  arr.concat(flattenArray(item)) : arr.concat(item)
      },[])
    )
  ]
}

```
----
#### Caleb:

* 1. 使用ES6 flat方法

``` javascript
[1, [2, [3, 4]]].flat(Infinity)

```
* 2. 使用Generate函数语法 实现flat的功能

``` javascript
const arr = [1, [2, [3, 4]]];
const flatCopy = function* (a) {
	if (!Array.isArray(a)){
		return false;
	}

	const len = a.length;
	for (let i=0; i < len; i++){
		const item = a[i];
		if (typeof item === 'number'){
			yield item
		} else {
			yield* flatCopy(item)
		}
	}
}

const arr2 = [];

for(let j of flatCopy(arr)){
	arr2.push(j)
}

```
----
#### Xmtd:

```js
  function flatten(target, result = []) {
    target.forEach((item) => {
      if (Array.isArray(item)) {
        flatten(item, result);
      } else {
        result.push(item);
      }
    });

    return result;
  }
  
  // 方法
  target.flat(Infinity);

  // 类型改变了
  target.toString().split(',');
```
</details>
