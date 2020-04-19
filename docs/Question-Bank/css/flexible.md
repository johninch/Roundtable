## 移动端响应式适配方案

## 手淘团队 lib-flexible方案
在Flexible中，只对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1。

Flexible本质上就是通过JS来动态改写meta标签来实现响应式适配的。把视觉稿中的px转换成rem（rem是相对于根元素html的font-size来计算盒模型大小的）。

一些基本概念：
- meta标签：`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">`
- CSS单位rem：`rem`就是相对于`根元素<html>`的font-size来做计算。而flexible方案中使用rem单位，是能轻易的根据`<html>`的font-size计算出元素的盒模型大小。
- 物理像素(physical pixel)：又被称为设备像素，是显示设备中一个最微小的物理部件。
- 设备独立像素(density-independent pixel)：也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)。
- 设备像素比(device pixel ratio)：简称为`dpr`，其定义了物理像素和设备独立像素的对应关系。公式：`设备像素比 ＝ 物理像素 / 设备独立像素`
- 在js中，可以通过`window.devicePixelRatio`获取到当前设备的dpr。
- 在CSS中，可以通过`-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和 `-webkit-max-device-pixel-ratio`进行**媒体查询**，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

注意：*与rem相对的，`em`是相对于`父级元素font-size`来计算大小的，em会继承父级元素的字体大小，浏览器默认字体高为16px，默认1em=16px*。
