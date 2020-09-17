# 1、React组件化


## 目标
- 组件的跨层级通信：Context
- 高阶组件：HOC
- 表单组件实现


## Context
Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

React中使用Context实现祖代组件向后代组件跨层级传值。Vue中的provide & inject来源于Context。

Context API：
- 创建：React.createContext
    - 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中 离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
- 提供：Context.Provider
    - Provider 接收一个 value 属性，传递给消费组件，允许消费组件订阅 context 的变化。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
    - 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退 出更新的情况下也能更新。
- 消费：
    - class.contextType
        - 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问 到它，包括 render 函数中。你只通过该 API 订阅单一 context。
    - Context.Consumer
        - 这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
        - 这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离 这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider， value 参数等同于传递 给 createContext() 的 defaultValue 。
    - useContext
        - 接收一个 context 对象( React.createContext 的返回值)并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value prop 决定。只能用 在function组件中。

**注意事项**：因为 context 会使用参考标识(reference identity)来决定何时进行渲染，这里可能会有一些**陷阱**。当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值 为新的对象:
```js
class App extends React.Component {
    render() {
        return (
            <Provider value={{something: 'something'}}>
                <Toolbar />
            </Provider>
        );
    }
}
```
为了防止这种情况，将 value 状态提升到父节点的 state 里:
```js
constructor(props) {
    super(props);
    this.state = {
        value: {something: 'something'},
    };
}
render() {
    return (
        <Provider value={this.state.value}>
            <Toolbar />
        </Provider>
    );
}
```

在React的官方文档中，Context 被归类为高级部分(Advanced)，属于React的高级API，建议不要滥用。
后面我们要学习到的react-redux的 `<Provider />` ，就是通过 Context 提供一个全局态的 store，路由组件react-router通过 Context 管理路由状态等等。在React组件开发中，如果用好 Context，可以让你的组件变得强大，而且灵活。

## HOC
为了提高组件复用率，可测试性，就要保证组件功能单一性;但是若要满足复杂需求就要扩展功能单一的组件，在React里就有了HOC(Higher-Order Components)的概念。

高阶组件HOC，是一个函数，参数是一个组件，返回一个新组件。

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。HOC 在 React 的第三方库中很常见，例如 React-Redux 的 connect。

高阶组件(HOC)是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

```js
import React, {Component} from "react";
// hoc: 是一个函数，接收一个组件，返回另外一个组件
//这里大写开头的Cmp是指function或者class组件
const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props} />
        </div>
    );
};

function Child(props) {
  return <div> Child {props.name}</div>;
}

const Foo = foo(Child); // 返回的Foo就是

export default class HocPage extends Component {
    render() {
        return (
            <div>
                <h3>HocPage</h3>
                <Foo name="msg" />
            </div>
        );
    }
}
```

### 高阶组件的链式调用
建议不要包太多层，不清晰：
```js
const Foo = foo(Child);
const Foo2 = foo(foo(Child));
```

### 装饰器写法

高阶组件本身是对装饰器模式的应用，自然可以利用ES7中出现的装饰器语法来更优雅的书写代码。

在cra中使用，需要做如下配置：
```bash
yarn add customize-cra react-app-rewired @babel/plugin-proposal-decorators -S
```
更新config-overrides.js
```js
//配置完成后记得重启下
const { addDecoratorsLegacy } = require("customize-cra");
module.exports = override(
  ...,
addDecoratorsLegacy()//配置装饰器 );
```
如果vscode对装饰器有warning，vscode设置里加上：javascript.implicitProjectConfig.experimentalDecorators: true

另外，可能还要将pkg下的scripts改写为：
```bash
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
},
```

### HOC注意事项
**注意**：
- `装饰器只能用在class上`
- `装饰器的链式调用，执行顺序从下往上`
```js
@foo2
@foo
@foo
class Child extends Component {
    render() {
        return <div> Child {this.props.name}</div>;
    }
}
```

**注意事项**：`不要在 render 方法中使用 HOC`
- React 的 diff 算法(称为协调)使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。如果从 render 返回的组件与前一个渲染中的组件相同( === )，则 React 通过将子树与新子树进行区分来递归更新子树。如果它们不相等，则完全卸载前一个子树。
- 这不仅仅是性能问题，重新挂载组件会导致该组件及其所有子组件的状态丢失。
```js
render() {
    // 每次调用 render 函数都会创建一个新的 EnhancedComponent
    // EnhancedComponent1 !== EnhancedComponent2
    const EnhancedComponent = enhance(MyComponent);
    // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作!
    return <EnhancedComponent />;
}
```




## 表单组件设计与实现

form都是要收集数据，做校验，最后提交
- antd3 form 基于 rc-form（基于HOC），存在form层的state，缺点就是更新一个值（如input），执行setState，整个form表单重新渲染，性能不佳
- antd4 form 基于 rc-field-form（context, hook），数据存在store当中

### 仿antd3，基于rc-form实现表单

#### antd3表单组件设计思路，antd3表单实现（使用rc-form）
表单组件要求实现**数据收集**、**校验**、**提交**等特性，可通过高阶组件扩展：
- 高阶组件给表单组件传递一个input组件包装函数接管其输入事件并统一管理表单数据
- 高阶组件给表单组件传递一个校验函数使其具备数据校验功能

antd3中表单实现是基于`rc-form`，`使用高阶组件的方式`，存到form顶层的state当中，但是antd3的设计有个`缺点`，就是一个局部表单项变化更新，会引起整个表单都更新，性能上不佳。antd4改进了这问题。
```js
import React, { Component } from "react";
import createForm from "../components/my-rc-form/";
import Input from "../components/Input";

// 可以用户自己定义state并绑定value和onChange，但这样使用很繁琐，如果有很多状态需要用户定义非常多状态
// class MyRCForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             password: ""
//         };
//     }
//     submit = () => {
//         console.log("submit", this.state)
//     };
//     render() {
//         console.log("props", this.props)
//         const { username, password } = this.state;

//         return (
//             <div>
//                 <h3>MyRCForm</h3>
//                 <Input placeholder="Username" value={username} onChange={e => this.setState({ username: e.target.value })} />
//                 <Input placeholder="Password" value={password} onChange={e => this.setState({ password: e.target.value })} />
//                 <button onClick={this.submit}>submit</button>
//             </div>
//         );
//     }
// }

// 使用高阶组件来帮助用户管理状态
const nameRules = { required: true, message: "请输入姓名!" };
const passworRules = { required: true, message: "请输入密码!" };

@createForm()
class MyRCForm extends Component {
    componentDidMount() {
        this.props.form.setFieldsValue({ username: "default" });
    }
    submit = () => {
        const { validateFields } = this.props.form;

        validateFields((err, val) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("校验成功", val);
            }
        });
    };
    render() {
        console.log("props", this.props)
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <h3>MyRCForm</h3>
                {getFieldDecorator("username", { rules: [nameRules] })(
                    <Input placeholder="Username" />
                )}
                {getFieldDecorator("password", { rules: [passworRules] })(
                    <Input placeholder="Password" />
                )}
                <button onClick={this.submit}>submit</button>
            </div>
        );
    }
}

export default MyRCForm;
```

*hooks api 导出数组而不是对象解构，是为了方便改名*


#### 实现my-rc-form
即实现一个装饰器函数`Form.createForm`：
```js
import React, { Component } from 'react';

export default function createForm(Cmp) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {}
            this.options = {}
        }
        handleChange = e => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        // getFieldDecorator("username", { rules: [nameRules] })(<Input placeholder="Username" />)
        getFieldDecorator = (field, option) => InputCmp => {
            this.options[field] = option
            return React.cloneElement(InputCmp, {
                name: field,
                value: this.state[field] || "",
                onChange: this.handleChange
            })
        }
        setFieldValue = newStore => {
            this.setState(newStore)
        }
        getFieldValue = () => {
            return this.state
        }
        validateFields = callback => {
            // 定义一个简单校验
            // 校验规则this.options
            // 校验值是this.state
            let err = []
            for (let field in this.options) {
                // 判断state[field]是否是undefined
                // 如果是undefined，err.push({[field]: 'err'})
                this.state[field] === undefined && err.push({ [field]: 'err' })
            }
            if (err.length === 0) {
                // 校验成功
                callback(null, this.state)
            } else {
                callback(err, this.state)
            }
        }
        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    setFieldsValue: this.setFieldsValue,
                    getFieldValue: this.getFieldValue,
                }
            }
        }

        render() {
            return <Cmp {...this.props} {...this.getForm()} />
        }
    }
};
```



### 仿antd4，基于rc-field-form实现表单

antd4中表单实现是基于`rc-field-form`，相比于3的改进，antd4不将状态存在form顶层，而是存在一个formStore当中。

#### antd4表单实现（使用rc-field-form）
```js
import React, { useEffect } from "react";
import Form, { Field, useForm } from "rc-field-form";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

// 函数式组件方式：
export default function MyRCFieldForm(props) {
    const [form] = useForm();

    const onFinish = (val) => {
        console.log("onFinish", val); //sy-log
    };

    // 表单校验失败执行
    const onFinishFailed = (val) => {
        console.log("onFinishFailed", val); //sy-log
    };

    useEffect(() => {
        form.setFieldsValue({ username: "default" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h3>MyRCFieldForm</h3>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Field name="username" rules={[nameRules]}>
                    <Input placeholder="input UR Username" />
                </Field>
                <Field name="password" rules={[passworRules]}>
                    <Input placeholder="input UR Password" />
                </Field>

                <button>Submit</button>
            </Form>
        </div>
    );
}

// 类组件方式：
// class AntdFormPage extends Component {
//   formRef = React.createRef();

//   componentDidMount() {
//     this.formRef.current.setFieldsValue({username: "defalut"});
//   }
//   onFinish = val => {
//     console.log("onFinish", val);
//   };
//   onFinishFailed = val => {
//     console.log("onFinishFailed", val);
//   };
//   render() {
//     return (
//       <div>
//         <h3>AntdFormPage</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}>
//           <FormItem name="username" label="姓名" rules={[nameRules]}>
//             <Input placeholder="username placeholder" />
//           </FormItem>
//           <FormItem name="password" label="密码" rules={[passworRules]}>
//             <Input placeholder="password placeholder" />
//           </FormItem>
//           <FormItem>
//             <Button type="primary" size="large" htmlType="submit">
//               Submit
//             </Button>
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }

// export default AntdFormPage;
```

#### 实现my-rc-field-form
- index.js
- Form.js
- Field.js
- FieldContext.js
- useForm.js


```js
// index.js
import _Form from "./Form";
import useForm from "./useForm";
import Field from "./Field";

const Form = _Form;

Form.useForm = useForm;
Form.Field = Field;

export {Field, useForm};
export default Form;
```
```js
// Form.js
import React from "react";
import FieldContext from "./FieldContext";

export default function Form({ children, form, onFinish, onFinishFailed }) {
    form.setCallback({
        onFinish,
        onFinishFailed,
    });
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                form.submit();
            }}>
            <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
        </form>
    );
}
```
```js
// Field.js
import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
    static contextType = FieldContext;
    componentDidMount() {
        const { registerField } = this.context;
        this.unregisterField = registerField(this);
    }

    componentWillUnmount() {
        if (this.unregisterField) {
            this.unregisterField();
        }
    }

    // store变化，执行这个刷新方法
    onStoreChange = () => {
        this.forceUpdate();
    };

    // 给children也就是input，手动绑上value和onChange属性
    getControlled = () => {
        const { name } = this.props;
        const { getFieldValue, setFieldsValue } = this.context;

        return {
            value: getFieldValue(name), // 比如说有个仓库可以存储这个value，那这里直接get
            onChange: (event) => {
                const newValue = event.target.value;
                // 想要重新设置input value，那执行仓库的set函数就可以了吧
                // 设置对象，[name]动态属性
                setFieldsValue({ [name]: newValue });
            },
        };
    };
    render() {
        const { children } = this.props;
        const returnChildNode = React.cloneElement(children, this.getControlled());

        return returnChildNode;
    }
}
```
```js
// useForm.js
import React from "react";

// 定义一个仓库
class FormStore {
    constructor(props) {
        this.store = {};

        // 存储下Field 实例
        this.fieldEntities = [];

        // 存储校验回调
        this.callbacks = {};
    }

    // 有注册（订阅），一定要有取消注册（订阅）
    registerField = (entity) => {
        this.fieldEntities.push(entity);

        return () => {
            // 取消
            this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
            delete this.store[entity.props.name];
        };
    };

    // 设置store的值
    setCallback = (callback) => {
        this.callbacks = {
            ...this.callbacks,
            ...callback,
        };
    };

    // 获取store的值
    getFieldValue = (name) => {
        // 简单粗暴，不考虑安全了暂时
        return this.store[name];
    };

    // 设置this.store
    setFieldsValue = (newStore) => {
        // 把newStore更新到store中
        this.store = {
            ...this.store,
            ...newStore,
        };
        // store已经更新，下一步更新组件
        this.fieldEntities.forEach((entity) => {
            const { name } = entity.props;
            Object.keys(newStore).forEach((key) => {
                if (name === key) {
                    entity.onStoreChange();
                }
            });
        });
    };

    // 这是个简单的校验
    validate = () => {
        // 存储错误信息了，
        let err = [];
        // todo
        this.fieldEntities.forEach((entity) => {
            const { name, rules } = entity.props;
            let value = this.getFieldValue(name);
            let rule = rules && rules[0];
            if (rule && rule.required && (value === undefined || value === "")) {
                //  出错
                err.push({
                    [name]: rules.message,
                    value,
                });
            }
        });
        return err;
    };

    submit = () => {
        // 1.校验
        // 2.根据校验结果，如果校验成功，那么调用onFinish，否则失败调用onFinishFailed
        let err = this.validate();
        const { onFinish, onFinishFailed } = this.callbacks;
        if (err.length === 0) {
            onFinish(this.store);
        } else if (err.length > 0) {
            onFinishFailed(err);
        }
    };

    getForm = () => {
        return {
            submit: this.submit,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            registerField: this.registerField,
            setCallback: this.setCallback,
        };
    };
}

export default function useForm() {
    // 如果用一个常量保存当前store，那自定义hook每次执行都新创建一个store
    // 因此，要将当前store存到ref中，每次更新都是同一个store
    const formRef = React.useRef();
    if (!formRef.current) {
        const formStore = new FormStore();
        formRef.current = formStore.getForm();
    }

    return [formRef.current];
}
```
useRef使用的是hook api，返回的可变ref对象会被存起来，如果直接使用一个变量，每次useForm都会重新创建一个新的，没法复用，而ref对象在整个组件生命周期是保持不变的。
```js
// FieldContext.js
import React from "react";

const FieldContext = React.createContext();

export default FieldContext;
```


#### 解决各种坑

上述 my-rc-field-form 实现，对于类组件方式使用时，会有`坑!!!!!`

`ref不能直接通过props传递，会被过滤掉，forwardRef转发!!!`

```js
class AntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({username: "defalut"});
  }

// ...

  render() {
    return (
      <div>
        <h3>AntdFormPage</h3>
        <Form
          ref={this.formRef} // 这里传了ref进去，但我们的Form中没有识别ref
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
            // ...
        </Form>
      </div>
    );
  }
}

export default AntdFormPage;
```
不能通过props直接接收ref：
```js
// Form.js
export default function Form({ children, form, onFinish, onFinishFailed, ref }) { // 这里props解构追加ref也接收不到
    form.setCallback({
        onFinish,
        onFinishFailed,
    });
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                form.submit();
            }}>
            <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
        </form>
    );
}
```
**ref不能直接通过props传递**，会被过滤掉，`forwardRef转发`：
```js
// index.js
import React from "react";
import _Form from "./Form";
import useForm from "./useForm";
import Field from "./Field";

const Form = React.forwardRef(_Form); // forwardRef转发

Form.useForm = useForm;
Form.Field = Field;

export {Field, useForm};
export default Form;
```
在Form中接收时，就会多出一个ref参数接收：
```js
// Form.js
export default function Form({ children, /*form,*/ onFinish, onFinishFailed }, ref) { // 转发后多一个ref参数
    // 因为没有传form进来，所以这里也要改为直接从useForm中得到formInstance
    const [formInstance] = useForm()
    formInstance.setCallback({
        onFinish,
        onFinishFailed,
    });
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                formInstance.submit();
            }}>
            <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
        </form>
    );
}
```
然而，在父组件AntdFormPage中的预定义初始值时，提示setFieldsValue of null，即父组件拿不到表单ref实例：
```js
class AntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({username: "defalut"});
  }
```
需要进一步使用一个api来处理：`useImperativeHandle`可以让你在使用ref时，自定义暴露给父组件的实例值。`useImperativeHandle`应当与forwardRef一起使用。
```js
// Form.js
export default function Form({ children, /*form,*/ onFinish, onFinishFailed }, ref) { // 转发后多一个ref参数
    // 因为没有传form进来，所以这里也要改为直接从useForm中得到formInstance
    const [formInstance] = useForm()
    // 自定义暴露给父组件的实例值
    React.useImperativeHandle(ref, () => formInstance)
    formInstance.setCallback({
        onFinish,
        onFinishFailed,
    });
```
此时，就能正常工作了(*react的心智负担好重啊...*)

但。。还有。。一个坑。。。

对于函数式组件的使用方式，每次useForm都会new一个新的formInstance，相当于组件更新没有将上一次的状态存下来，所以需要**实现复用**：
```js
// Form.js
export default function Form({ children, form, onFinish, onFinishFailed }, ref) {
    const [formInstance] = useForm(form) // 如果父组件传进来了form，还是要传给useForm

    React.useImperativeHandle(ref, () => formInstance)
    formInstance.setCallback({
        onFinish,
        onFinishFailed,
    });
```
看当前是否有formInstance，有则复用，没有才new：
```js
export default function useForm(form) {
    const formRef = React.useRef();
    if (!formRef.current) {
        // 看当前是否有formInstance，有则复用，没有才new
        if (form) {
            formRef.current = form;
        } else {
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }

    return [formRef.current];
}
```


## 弹窗组件实现

dialog组件如果像普通组件一样，创建子父组件内部，那么其样式处理，即层级都会很怪。通常我们将弹窗组件渲染在body下的div中。

弹窗类组件的要求弹窗内容在A处声明，却在B处展示。react中相当于弹窗内容看起来被render到一个 组件里面去，实际改变的是网页上另一处的DOM结构，这个显然不符合正常逻辑。但是通过使用框架提供的特定API「`传送门Porta`l」创建组件实例并指定挂载目标仍可完成任务。

使用传送门`createPortal(MyCmp, 挂载点node)`，从react-dom中导入
- 注意：**挂载点this.node**需要在渲染时就用到，因此要放在**constructor中创建**。

- Dialog.js
```js
// Dialog.js
import React, { Component } from "react";
import { createPortal } from "react-dom";

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        const doc = window.document;
        this.node = doc.createElement("div");
        doc.body.appendChild(this.node);
    }
    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }
    render() {
        const { hideDialog } = this.props;
        return createPortal(
            <div className="dialog">
                {this.props.children}
                {typeof hideDialog === "function" && (
                    <button onClick={hideDialog}>关掉弹窗</button>)}
            </div>,
            this.node,
        );
    }
}
```

- DialogPage.js
```js
// 常见用法如下: Dialog在当前组件声明，但是却在body中另一个div中显示
import React, { Component } from "react";
import Dialog from "../conponents/Dialog";

export default class DialogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        };
    }
    render() {
        const { showDialog } = this.state;
        return (
            <div>
                <h3>DialogPage</h3>
                <button
                    onClick={() =>
                        this.setState({
                            showDialog: !showDialog
                        })
                    }>
                    toggle
                </button>
                {showDialog && <Dialog />}
            </div>
        );
    }
}
```


