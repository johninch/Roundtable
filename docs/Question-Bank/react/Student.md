# 根据要求定义react组件`<Student/>`

编写Student组件，可以接收学生姓名、性别(F/M)、年龄、所在班级信息、考试成绩（其中姓名、性别、成绩为必传项，其它为选填，未传递需要指定一个默认值），并显示出来。同时有一个查看成绩的按钮，点击后alert出该学生的成绩。

请根据以上描述实现该组件：
```js
<Student name="小明" sex="F" score={99} age={18} class="1班" />
```

### 方法一：使用js实现
```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Student extends Component {
  checkScore = () => {
    window.alert(this.props.score);
  };

  render() {
    return (
      <div>
        <button onClick={this.checkScore}>查看成绩</button>
      </div>
    );
  }
}

Student.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.oneOf(["F", "M"]).isRequired,
  score: PropTypes.number.isRequired,
  age: PropTypes.number,
  class: PropTypes.string
};

Student.defaultProps = {
  age: 18,
  class: "1班"
};

function App() {
  return (
    <div className="App">
      <Student name="小张" sex="F" score={60} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### 方法二：使用ts实现
```tsx
import React, { Component } from "react";
import ReactDOM from "react-dom";

interface IProp {
  name: string;
  sex: "F" | "M";
  score: number;
  age?: number;
  class?: string;
}

class Student extends Component<IProp> {
  // static关键词会使属性挂在prototype上成为静态属性，不加的话就是实例属性，挂在this上
  static defaultProps: Partial<IProp> = {
    age: 18,
    class: "1班"
  };
  checkScore = () => {
    window.alert(this.props.score);
  };

  render() {
    return (
      <div>
        <button onClick={this.checkScore}>查看成绩</button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Student name="小张" sex="F" score={60} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```


