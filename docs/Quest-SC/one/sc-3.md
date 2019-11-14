

### lodash之concat源码

```javascript 1.8
function copyArray(source, array) {
    var index = -1,
        length = source.length;

    // 这里判断 array 是否为 undefined，如果是就定义一个与 source 长度相等的数组。
    array || (array = Array(length));

    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}

// arrayPush方法是在传入的参数array基础上进行拼接的
function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
    /**
     * 举例分析：
     * arrayPush([1,2,3], [4, [5]]);
     * 刚进来 index = -1;  length = 2; offset = 3;
     * 进入循环
     * index = 0; offset + index = 3; array[3] = values[0] = 4;
     * index = 1; offset + index = 4; array[4] = values[1] = [5];
     * index = 2; 停止循环
     *
     * array = [1,2,3,4,[5]]
     *
     */
}


var isArray = Array.isArray;

// 这个方法是在判断 value 是否是可以被打平的 arguments 对象或者数组。如果是，返回 true，若不是，则返回 false
function isFlattenable(value) {
    return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 *
 * @param array
 * @param depth
 * @param predicate  每次迭代调用的函数
 * @param isStrict   限制
 * @param result
 * @returns {Array}
 */
// 减少嵌套数组
function baseFlatten(array, depth, predicate, isStrict, result) {   // 2, [3], [4], -1: [1]
    var index = -1,
        length = array.length;

    // 判断是否传入 predicate, 若没有，将方法 isFlattenable 赋值给 predicate
    predicate || (predicate = isFlattenable);

    result || (result = []);

    //[1,[3], [4, [5]]]

    while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                // Recursively flatten arrays (susceptible to call stack limits).
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                arrayPush(result, value);
            }
        } else if (!isStrict) {
            result[result.length] = value;
        }
    }
    return result;
}


// 源码
// _.concat(array, [values])  创建一个新数组，将array与任何数组 或 值连接在一起
/**
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
*/
function concat() {  // [1], 2, [3], [4]
    // 获取参数个数
    var length = arguments.length;

    if (!length) {
        return [];
    }

    var args = Array(length - 1),   // 去除0索引以外的参数
        array = arguments[0],      // 第一个元素
        index = length;

    // 从后往前添加
    while (index--) {
        args[index - 1] = arguments[index];
        /**
         * 4 index = 3;  args[2] = arguments[3] = [4];
         * 3 index = 2;  args[1] = arguments[2] = [3];
         * 2 index = 1;  args[0] = arguments[1] = 2;
         * 1 index = 0;  args[-1] = arguments[0] = [1];
         * args = [2, [3], [4], -1: [1]]
         */
    }
    return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}
```