---
title: vue css中/deep/深度选择
---
# vue css中/deep/用法

`/deep/`的意思为深度选择。**Scoped CSS**规范是Web组件产生不污染其他组件，也不被其他组件污染的CSS规范。这样在打包的时候会生成一个`独一无二hash值`，父组件的样式就不会影响到子组件了；在使用第三方组件时，要是想修改其组件的样式，一般都是提取公共文件，但是存在问题是有时候你修改一处就可能影响到别的地方，这个时候就需要一种方式，既不影响别的地方，又能修改子组件的样式。

## 使用scoped属性

![avatar](./images/WechatIMG8282.png)
![avatar](./images/WechatIMG86.png)
上图展示了编译后的dom结构，可以看出，scoped属性会将 template 中的每个元素加入 [data-v-xxxx]的hash值，但如果引用了第三方组件，`默认只会对组件的最外层（div）加入这个 [data-v-xxxx] 属性，但第二层开始就没有效果了`，如上图所示，第一层el-tabs加上了[data-v-xxxx]，下面的el-tabs__header就没有了。


## 将编译后的dom与样式代码比较

![avatar](./images/WechatIMG85.png)
![avatar](./images/noDeep.png)
上图是编译后的css代码，其分别在最内层选择器上添加了hash，而对比之前的编译后dom结构，两者是不匹配的，因此样式不生效。

## 加上/deep/

![avatar](./images/WechatIMG87.png)
![avatar](./images/deep.png)
从添加`/deep/`标记后的样式层级开始，内部都不会再带有hash，只有/deep/外层wrapper选择器上带有scoped赋予的hash。

因此，编译后的dom与css选择器可以相匹配，样式就可以生效了。这类似于css module中的global属性，加上global修改第三方组件才能生效。
