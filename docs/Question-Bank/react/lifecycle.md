# 生命周期：请给出下面render代码执行后控制台的字符串输出内容

```js
// 已知组件
class Base extends Component{
    constructor(props) {
        super(props);
        console.log(props.prefixer + ' constructor')
    }
    componentWillMount() { console.log(this.props.prefixer + ' will mount') }
    componentDidMount() { console.log(this.props.prefixer + ' did mount') }
    componentDidUpdate() { console.log(this.props.prefixer + ' did update') }
    render() { 
        console.log(this.props.prefixer + ' render')
        return this.props.children || null;
     }
}
 
 
// 渲染调用
render(<Base prefixer="parent">
    <Base prefixer="child" />
</Base>, document.querySelector('#root'))
```

答案：
```
parent constructor
parent will mount
parent render
child constructor
child will mount
child render
child did mount
parent did mount
```



