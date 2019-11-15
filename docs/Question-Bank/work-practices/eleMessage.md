---
title: ElementUI Message 二次封装
---

# ElementUI Message 二次封装

> ElementUI 的 Message 消息提示是点击一次弹出一次，这在频繁重复点击按钮时可能会造成不美观的多个相同消息重复提示；另一种场景是，对于每一个得到的请求响应都会弹出对应提示，当token过期需要重新登录，此时页面中多个请求的响应均报“登录过期”，也是重复提示不美观。

> ElementUI 官方api并没有提供给我们可以处理此情况的配置，因此需要对 Message组件 做二次封装来达到要求。

> 网上查阅后发现了两种解决思路：
- 1、判断页面中 message 的个数；
- 2、自定义 message 功能；

## 判断页面中message的个数

参考链接：[重复点击按钮或多个请求同时报错时弹出多个message弹框解决方法](https://blog.csdn.net/dongguan_123/article/details/101290164)

```js
/**重置message，防止重复点击重复弹出message弹框 */
import { Message } from 'element-ui'

const showMessage = Symbol('showMessage') // 为了实现Class的私有属性

/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
class DoneMessage {
    [showMessage](type, options, single) {
        if (single) {
            if (document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            Message[type](options)
        }
    }
    info(options, single = true) {
        this[showMessage]('info', options, single)
    }
    warning(options, single = true) {
        this[showMessage]('warning', options, single)
    }
    error(options, single = true) {
        this[showMessage]('error', options, single)
    }
    success(options, single = true) {
        this[showMessage]('success', options, single)
    }
}
```

## 自定义message功能

参考链接：[ElementUI之Message功能拓展](https://juejin.im/post/5da74fd26fb9a04dde147504)


```js
import { Message } from 'element-ui'

const messageTypes = ['success', 'warning', 'error', 'info']

// 新建构造函数
function ESOPMessage(options) {
  if (!(this instanceof ESOPMessage)) {
    return new ESOPMessage(options)
  }
  this.init(options)
}

ESOPMessage.queue = [] // 未展示数据的消息队列

ESOPMessage.instances = [] // 消息体实例列表

// 配置项
ESOPMessage.config = {
  max: 0, // 最大显示数
  isQueue: false, // 是否以队列形式存储为展示消息
  showNewest: true // 是否后添加的消息覆盖前面的消息
}

// 配置参数
ESOPMessage.setConfig = function(config = {}) {
  ESOPMessage.config = { ...ESOPMessage.config, ...config }
}

ESOPMessage.close = Message.close

ESOPMessage.closeAll = Message.closeAll

// 各消息类型静态方法
messageTypes.forEach(type => {
  ESOPMessage[type] = options => {
    let opts = options
    if (typeof options === 'string') {
      opts = {
        message: options
      }
    }
    return new ESOPMessage({ ...opts, type })
  }
})

// 初始化
ESOPMessage.prototype.init = function(options) {
  const { max, isQueue, showNewest } = ESOPMessage.config
  // 判断如果超出最大消息数时，删除消息
  if (max > 0 && ESOPMessage.instances.length >= max && showNewest && !isQueue) {
    this.removeMessages()
  }

  if (ESOPMessage.instances.length >= max && isQueue) {
    // 添加队列元素
    ESOPMessage.queue.push(this.saveToQueue(options))
  } else if (ESOPMessage.instances.length < max || !max) {
    this.setMessage(options)
  }
}

// 移除消息
ESOPMessage.prototype.removeMessages = function() {
  const { instances, config: { max } } = ESOPMessage

  ESOPMessage.instances = instances.filter((instance, index) => {
    if (index < instances.length - max + 1) {
      instance && instance.close()
      return false
    }
    return true
  })
}

// 获取消息实例和添加事件监听
ESOPMessage.prototype.setMessage = function(options) {
  const instance = Message(options)
  // 监听消息消失事件，从实例列表移除当前消息实例
  instance.$watch('visible', val => {
    ESOPMessage.instances = ESOPMessage.instances.filter(item => item !== instance)
    if (ESOPMessage.config.isQueue && ESOPMessage.queue.length) {
      ESOPMessage.queue.shift()()
    }
  })
  ESOPMessage.instances.push(instance)
}

// 生成队列元素，延迟执行
ESOPMessage.prototype.saveToQueue = function(options) {
  return () => {
    this.setMessage(options)
  }
}

export default ESOPMessage

```


