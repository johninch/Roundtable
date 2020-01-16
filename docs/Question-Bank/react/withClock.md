# 编写react高阶组件实现时间显示组件随时间不断更新<withClock>

假设已知渲染指定时间的组件Timer：
```js
// 只渲染一次
<Timer date={new Date()} /> 
// 时间不断刷新
const ClockTimer = withClock(Timer);
<ClockTimer />
```
要求编写高阶组件withClock，使其可以根据当前时间变动不断刷新

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import withClock from "./withClock";

const Timer = ({ date }) => <span>{date}</span>;
const ClockTimer = withClock(Timer);

function App() {
  return (
    <div className="App">
      <ClockTimer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// withClock.js
import React, { Component } from "react";

export default function withClock(WrappedComponent) {
  return class extends Component {
    state = {
      time: new Date()
    };

    timeoutId = null;

    componentDidMount() {
      this.clockWalk();
    }

    clockWalk = () => {
      this.timeoutId = setTimeout(() => {
        this.setState({
          time: new Date()
        });
        this.clockWalk();
      }, 1000);
    };

    render() {
      return <WrappedComponent date={`${this.state.time.toLocaleDateString()} ${this.state.time.toLocaleTimeString()}`} {...this.props} />;
    }
  };
}
```

