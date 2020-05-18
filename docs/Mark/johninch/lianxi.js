function thisNew(M) {
    let o = Object.create(M.prototype);
    let res = M.call(o)

    if (typeof res === 'object') {
        return res
    } else {
        return o
    }
}

Object.create = Object.create || function(obj) {
    function Fn() {}
    Fn.prototype = obj

    return new Fn()
}

function quickSort(arr) {
    return arr.length <= 1 ? arr : quickSort(arr.slice(1).filter(item => item < arr[0])).concat(arr[0], quickSort(arr.slice(1).filter(item => item >= arr[0])))
}

function JSONP({url, params = {}, callbackKey = 'cb', callback}) {
    JSONP.callbackId = JSONP.callbackId || 1
    JSONP.callbacks = JSONP.callbacks || []

    let callbackId = JSONP.callbackId
    JSONP.callbacks[callbackId] = callback

    params[callbackKey] = `JSONP.callbacks[${callbackId}]`

    const paramString = Object.keys(params).map(k => {
        return `${k}=${encodeURIComponent(params[k])}`
    }).join('&')

    const script = document.createElement('script')
    script.setAttribute('src', `${url}?${paramString}`)
    document.body.appendChild(script)

    JSONP.callbackId++
}

function Parent() {
    this.type = 'laoba'
    this.habit = [1, 2, 3]
}

Parent.prototype.say = function() {
    console.log('wo shi ni die')
}

function Child() {
    Parent.call(this)
    this.type = 'xiaozi'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

let s1 = new Child()
let s2 = new Child





