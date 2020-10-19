# topK问题

> 本文参考[三种方式求解 Top k 问题](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/solution/javascriptsan-chong-fang-shi-qiu-jie-top-k-wen-ti-/)、[4种解法秒杀TopK（快排/堆/二叉搜索树/计数排序）](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/solution/3chong-jie-fa-miao-sha-topkkuai-pai-dui-er-cha-sou/)


所谓**topK问题**，简单来说就是在一组数据里面找到 *频率出现最高的前k个数，或前k大（当然也可以是前k小）* 的数。

比如在一组数据中，取前k小。

这里提供3种解法，推荐使用堆来解决。

## 一、快排，取前 k 个数

快排，可以直接调用 Array.prototype.sort()
```js
let getLeastNumbers = function(arr, k) {
    return arr.sort((a, b) => a - b).slice(0, k);
}
```
**时间复杂度**：`O(nlogn)`

**注意：！！！**
- 在 V8 引擎 7.0 版本之前，数组长度小于10时， Array.prototype.sort() 使用的是**插入排序**，否则用**快速排序**。
- 在 V8 引擎 7.0 版本之后就**舍弃了快速排序**，因为它不是稳定的排序算法，在最坏情况下，时间复杂度会降级到 O(n<sup>2</sup>)。而是采用了一种混合排序的算法：TimSort，属于一种混合排序算法：
    - 在数据量小的子数组中使用插入排序，然后再使用归并排序将有序的子数组进行合并排序，时间复杂度为 `O(nlogn)` 。


## 二、构建堆（推荐）

因为本题是求前k小，所以应该构建`大顶堆`（*大顶堆上的任意节点值都必须大于等于其左右子节点值，即堆顶是最大值*）。

我们可以从数组中取出 k 个元素构造一个大顶堆，然后将其余元素，依次与大顶堆对比，如果小于堆顶则替换堆顶，然后堆化，所有元素遍历完成后，堆中的元素即为前 k 个最小值。

**具体步骤如下**：
1. 从数组中取前 k 个数（ 0 到 k-1 位），构造一个大顶堆
2. 从 k 位开始遍历数组，每一个数据都和大顶堆的堆顶元素进行比较，如果大于堆顶元素，则不做任何处理，继续遍历下一元素；如果小于堆顶元素，则将这个元素替换掉堆顶元素，然后再堆化成一个大顶堆。
3. 遍历完成后，堆中的数据就是前 K 小的数据

**时间复杂度**：`遍历数组需要 O(n)` 的时间复杂度，`一次堆化`需要 `O(logk)` 时间复杂度，所以利用堆求 Top k 问题的时间复杂度为 `O(nlogk)`

::: tip 为什么利用堆求topK问题有优势？
这种求 Top k 问题是可以使用排序来处理，但当我们需要在一个动态数组中求 Top k 元素怎么办喃？(处理`动态数组`是优势所在)

动态数组可能会插入或删除元素，难道我们每次求 Top k 问题的时候都需要对数组进行重新排序吗？那每次的时间复杂度都为 O(nlogn)

这里就可以使用堆，我们可以维护一个 K 大小的小顶堆，当有数据被添加到数组中时，就将它与堆顶元素比较，如果比堆顶元素大，则将这个元素替换掉堆顶元素，然后再堆化成一个小顶堆；如果比堆顶元素小，则不做处理。

这样，每次堆化时间复杂度仅为 O(logk)，遍历一遍，假设每次都是最坏的情况，即遍历的每个元素都掉入堆中需要重新堆化，那么总体求topK问题的时间复杂度就是`O(nlogk)`。
:::


```js
let getLeastNumbers = function(arr, k) {
    // 从 arr 中取出前 k 个数，构建一个大顶堆
    let heap = [,], i = 0
    while(i < k) {
       heap.push(arr[i++])
    }
    buildHeap(heap, k)

    // 从 k 位开始遍历数组
    for(let i = k; i < arr.length; i++) {
        if(heap[1] > arr[i]) {
            // 替换并堆化
            heap[1] = arr[i]
            heapify(heap, k, 1)
        }
    }

    // 删除heap中第一个元素
    heap.shift()
    return heap
};

// 原地建堆，从后往前，自上而下式建大顶堆
let buildHeap = (arr, k) => {
    if(k === 1) return
    // 从最后一个非叶子节点开始，自上而下式堆化
    for(let i = Math.floor(k/2); i>=1 ; i--) {
        heapify(arr, k, i)
    }
}

// 堆化
let heapify = (arr, k, i) => {
    // 自上而下式堆化
    while(true) {
        let maxIndex = i
        if(2*i <= k && arr[2*i] > arr[i]) {
            maxIndex = 2*i
        }
        if(2*i+1 <= k && arr[2*i+1] > arr[maxIndex]) {
            maxIndex = 2*i+1
        }
        if(maxIndex !== i) {
            swap(arr, i, maxIndex)
            i = maxIndex
        } else {
            break
        }
    }
}

// 交换
let swap = (arr, i , j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
```


## 三、计数排序

`计数排序`不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。

作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数（即**数据范围有限**）。它是一种典型的拿空间换时间的排序算法。

```js
let getLeastNumbers = function(arr, k) {
    return countingSort(arr, 10000, k)
}

let countingSort = (arr, maxValue, k) => {
    // 开辟的新的数组，用于将输入的数据值转化为键存储
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = maxValue + 1

    // 存储
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0
        }
        bucket[arr[i]]++
    }

    // 将数据从bucket按顺序写入res中，控制仅仅输出前k个
    let res = []
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j]-- > 0 && sortedIndex < k) {
            res[sortedIndex++] = j
        }
        if(sortedIndex === k) {
            break
        }
    }
    return res
}
```

**时间复杂度**：O(n + m)，其中 m 表示数据范围

## 四、分治法（只提供思路）

**如何在100亿数据中找到最大的1000个数**？最容易想到的就是将数据全排序，但是效率太低了，对于海量数据处理并不合适。

`分治法`，即大数据里最常用的`MapReduce`。
1. 将100亿个数据分为1000个大分区，每个区1000万个数据
2. 每个大分区再细分成100个小分区。总共就有1000*100=10万个分区
3. `计算每个小分区上最大的1000个数`
    - 为什么要找出每个分区上最大的1000个数？
    - 举个例子说明，全校高一有100个班，我想找出全校前10名的同学，很傻的办法就是，把高一100个班的同学成绩都取出来，作比较，这个比较数据量太大了。应该很容易想到，**班里的第11名，不可能是全校的前10名**。也就是说，不是班里的前10名，就不可能是全校的前10名。
    - 因此，只需要把每个班里的前10取出来，作比较就行了，这样比较的数据量就大大地减少了。
    - 我们要找的是100亿中的最大1000个数，所以每个分区中的第1001个数一定不可能是所有数据中的前1000个。
4. 合并每个大分区细分出来的小分区。每个大分区有100个小分区，我们已经找出了每个小分区的前1000个数。将这100个分区的1000*100个数合并，找出每个大分区的前1000个数。
5. 合并大分区。我们有1000个大分区，上一步已找出每个大分区的前1000个数。我们将这1000*1000个数合并，找出前1000.这1000个数就是所有数据中最大的1000个数

（1、2、3为map阶段，4、5为reduce阶段）


## 其他参考链接
- [算法面试必问：Top K问题浅析](https://zhuanlan.zhihu.com/p/158770417)
- [Top K问题进阶](https://zhuanlan.zhihu.com/p/158794156)
- [Top K 问题](https://www.cnblogs.com/xiaokang01/p/12562127.html#_label0_0)

