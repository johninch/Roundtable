# 一维数组中连续相同的数字转换成二维

例如：[1,1,2,3,3,3,3,4,5,5,5,6,6] 将被转换为 [[1,1],2,[3,3,3],4,[5,5,5],[6,6]]

```js
function arrayTo2D(arr) {
    let array2D = [];
    let curNum = arr[0],
      tempArr = [];
    arr.forEach(item => {
      if (item === curNum) {
        tempArr = tempArr.concat(item);
      } else {
        tempArr.length > 1 ? array2D.push(tempArr) : array2D.push(tempArr[0]);
        tempArr = [item];
        curNum = item;
      }
    });
    (tempArr.length && tempArr.length > 1) ? array2D.push(tempArr) : array2D.push(tempArr[0]);
  
    return array2D;
}
  
console.log(arrayTo2D([1, 1, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6]));
```
