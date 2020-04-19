# 快速排序

快速排序使用分治和递归来实现的：
-（1）在数据集之中，选择一个元素作为"基准"（pivot）。
-（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
-（3）对"基准"左边和右边的两个子集，不断递归重复第一步和第二步，直到所有子集只剩下一个元素为止。
复杂度平均情况：O(nlogn)


## Johninch

#### 三路快排（快排优化）
- 如果需要排序的数组有大量重复元素，可以用基于三向切分的快速排序大幅度提高效率。
- 基础的快排，每一次递归，将数组拆分为两个，递归出口是数组长度为 <=1。如果递归过程中某个数组出现大量重复元素，基于原始快排还需要继续递归下去，但实际上已经不需要。因此可以用三向切分，将数组切分为三部分，大于基准元素，等于基准元素，小于基准元素。
- 可以设置一个 mid 数组用来保存等于基准元素的元素集合，基准元素其实可是是任意一个元素，这里选了最后一个，比较方便。
```js
// 三路快排
quick3waySort = function (arr) {
  var len = arr.length;
  if (len <= 1) return arr;

  var pivot = arr.pop(),
      left = [],
      right = [],
      mid = pivot;

  arr.forEach(item => {
    if (item < pivot) {
      left.push(item);
    } else if (item > pivot) {
      right.push(item);
    } else {
      mid.push(item);
    }
  });

  var _left = quick3waySort(left),
      _right = quick3waySort(right);

  return _left.concat(mid, _right);
};
```

#### 一行代码实现快排
```js
function quickSort(a) {
  return a.length <= 1 ? a : quickSort(a.slice(1).filter(item => item <= a[0])).concat(a[0], quickSort(a.slice(1).filter(item => item > a[0])));
}
```
