# 一维数组中连续相同的数字转换成二维

例如：[1,1,2,3,3,3,3,4,5,5,5,6,6] 将被转换为 [[1,1],2,[3,3,3],4,[5,5,5],[6,6]]

## johninch
```js
function arrayTo2D(arr) {
  let tempArr = [],
    cur = arr[0],
    newArr = [];

  arr.forEach((item, i) => {
    if (item === cur) {
      tempArr = tempArr.concat(item);
    } else {
      tempArr.length > 1 ? newArr.push(tempArr) : newArr.push(tempArr[0]);
      cur = item;
      tempArr = [item];
    }
  });

  tempArr.length > 1 ? newArr.push(tempArr) : newArr.push(tempArr[0]);

  return newArr;
}

let a = [1, 1, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6];

console.log(arrayTo2D(a));
```
## Caleb
``` js
function to2D(arr) {
    if(!arr) return []
    if(arr.length<2) return arr
    let result = [];
    let temporateArr = [];
    for ( let i=0;i<arr.length;i++ ) {
        if (temporateArr.length === 0 ) {
            temporateArr.push(arr[i])
        } else if (temporateArr.includes(arr[i])){
            temporateArr.push(arr[i])
        } else {
            result.push(temporateArr.length>1? [...temporateArr] : temporateArr[0]);
            temporateArr = [arr[i]];
        }
    }
    if (temporateArr.length>0) {
      result.push(temporateArr.length>1? [...temporateArr] : temporateArr[0]);
    }
  return result
}
```