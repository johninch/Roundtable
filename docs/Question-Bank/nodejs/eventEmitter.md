
# EventEmitter实现

> 如何实现Event(Bus),这个东西太重要了,几乎所有的模块通信都是基于类似的模式,包括安卓开发中的Event Bus, Node.js中的Event模块(Node中几乎所有的模块都依赖于Event,包括不限于http、stream、buffer、fs等)。

> 我们仿照Node中Event API实现一个简单的Event库,他是发布订阅模式的典型应用.

## 简单版

主要方法有on, emit, once, off。
- emit(eventName,...arg)方法传入的参数，第一个为事件名，其他参数事件对应的执行函数中的实参，emit方法的功能就是从事件对象中，寻找对应key为eventName的属性，执行该属性所对应的数组里面每一个执行函数。
- on是node中addListener的别名；
- off是node中removeListener的别名；
- on的方法对于某一指定事件添加的监听器可以持续不断的监听相应的事件，而once方法添加的监听器，监听一次后，就会被消除；
- removeListener指的是移除一个指定事件的某一个监听器，而removeAllListeners指的是移除某一个指定事件的全部监听器；
- cb也可以叫做监听者函数listener。

```js
class EventEmitter {
    constructor() {
        this._eventBus = {} // 或 Object.create(null)
    }
    on(type, cb) {
        if (!this._eventBus[type]) {
            this._eventBus[type] = []
        }
        this._eventBus[type].push(cb)
        // 缺点：这里为了绑定多个监听者，直接使用了数组，没有分情况
    }
    emit(type, ...args) {
        if (this._eventBus[type]) {
            this._eventBus[type].forEach(cb => cb(...args))
            // 缺点：这里监听函数cb的触发执行，this指向没有变更
        }
    }
    off(type, cb) {
        if (this._eventBus[type]) {
            let position
            position = this._eventBus[type].findIndex(_cb => _cb === cb)

            if (position > -1) {
                this._eventBus[type].splice(position, 1)
            }
        }
    }
    once(type, cb) {
        this.on(type, (...args) => {
            cb(...args)
            this.off(type)
        })
    }
}
```

```js
let event = new EventEmitter()

event.on('say', function(str) {
   console.log(str)
})

event.emit('say','hello Jony yu')
//输出hello Jony yu
```

## 优化版

- 改进1：在仅有1个监听者时，handler（this._eventBus[type]）应该只是一个函数，多个监听者才以数组存储。

- 改进2：触发监听函数我们可以用 apply 与 call 两种方法, 在少数参数时call的性能更好,多个参数时apply性能更好, 当年Node的Event模块就在三个参数以下用call否则用apply。而我们这里为了简便，对于多个监听者使用apply，只有一个监听者时使用call即可。

```js
class EventEmitter {
    constructor() {
        this._eventBus = {} // 或 Object.create(null)
    }
    on(type, cb) {
        let handler = this._eventBus[type]
        if (!handler) {
            this._eventBus[type] = cb
        } else if (handler && typeof handler === 'function') {
            // 如果handler是函数说明只有一个监听者
            this._eventBus[type] = [handler, cb]
        } else {
            // 已经有多个监听者,那么直接往数组里push函数即可
            this._eventBus[type].push(cb)
        }
    }
    emit(type, ...args) {
        let handler = this._eventBus[type]
        if (handler && Array.isArray(handler)) {
            // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
             this._eventBus[type].forEach(cb => {
                 args.length > 0 ? cb.apply(this, args) : cb.call(this)
             })
        } else {
            // 单个函数直接触发
            args.length > 0 ? handler.apply(this, args) : handler.call(this)
        }

        return true
    }
    off(type, cb) {
        let handler = this._eventBus[type]
        if (handler && typeof handler === 'function') {
            // 如果是函数,说明只有一个监听者
            delete this._eventBus[type]
        } else {
            // 如果handler是数组,说明被监听多次要找到对应的函数
            let position
            position = handler.findIndex(_cb => _cb === cb)

            if (position > -1) {
                handler.splice(position, 1)
                // 如果清除后只有一个函数,那么取消数组,以函数形式保存
                if (handler.length === 1) {
                    this._events[type] = handler[0];
                }
            }
        }
    }
    once(type, cb) {
        this.on(type, (...args) => {
            args.length > 0 ? cb.apply(this, args) : cb.call(this)
            this.off(type)
        })
    }
}
```

## 进阶版

- 改进1：选择 ***Map*** 作为储存事件的结构, 作为键值对的储存方式Map比一般对象更加适合, 操作起来也更加简洁。
- 改进2：Node全面拥抱 ES6+ 之后,相应的 call/apply 操作用 ***Reflect*** 新关键字重写了。

```js
class EventEmitter {
    constructor() {
        this._eventBus = this._eventBus || new Map(); // 储存事件/回调键值对
    }
    on(type, cb) {
        let handler = this._eventBus.get(type)
        if (!handler) {
            this._eventBus.set(type, cb)
        } else if (handler && typeof handler === 'function') {
            // 如果handler是函数说明只有一个监听者
            this._eventBus.set(type, [handler, cb])
        } else {
            // 已经有多个监听者,那么直接往数组里push函数即可
            handler.push(cb)
        }
    }
    emit(type, ...args) {
        let handler = this._eventBus.get(type)
        if (handler && Array.isArray(handler)) {
            // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
            for(var i=0; i < handler.length; i++) {
                Reflect.apply(handler[i], this, args)
            }
        } else {
            // 单个函数直接触发
            Reflect.apply(handler, this, args)
        }

        return true
    }
    off(type, cb) {
        let handler = this._eventBus.get(type)
        if (handler && typeof handler === 'function') {
            // 如果是函数,说明只有一个监听者
            this._eventBus.delete(type)
        } else {
            // 如果handler是数组,说明被监听多次要找到对应的函数
            let position
            position = handler.findIndex(_cb => _cb === cb)

            if (position > -1) {
                handler.splice(position, 1)
                // 如果清除后只有一个函数,那么取消数组,以函数形式保存
                if (handler.length === 1) {
                    this._events.set(type, handler[0]);
                }
            }
        }
    }
    once(type, cb) {
        let handler = this._eventBus.get(type)
        this.on(type, (...args) => {
            Reflect.apply(handler, this, args)
            this.off(type)
        })
    }
}
```

## 扩展

> node的EventEmitter还包含了很多常用的API

方法名 | 方法描述
-|-
addListener(event, listener) | 为指定事件添加一个监听器到监听器数组的尾部。
prependListener(event,listener) | 与addListener相对，为指定事件添加一个监听器到监听器数组的头部。
on(event, listener) | 其实就是addListener的别名
once(event, listener) | 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
removeListener(event, listener) | 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器
off(event, listener) | removeListener的别名
removeAllListeners([event]) | 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
setMaxListeners(n) | 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
listeners(event) | 返回指定事件的监听器数组。
emit(event, [arg1], [arg2], [...]) | 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

除此之外，还有2个特殊的，不需要手动添加，node的EventEmitter模块自带的特殊事件：

事件名 | 事件描述
-|-
newListener | 该事件在添加新事件监听器的时候触发
removeListener | 从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引


## 相关链接
[循序渐进教你实现一个完整的node的EventEmitter模块](https://github.com/forthealllight/blog/issues/21)

[如何实现一个Event](https://www.cxymsg.com/guide/event.html#%E5%89%8D%E8%A8%80)

[EventEmitter的实现](https://segmentfault.com/a/1190000014206309)
