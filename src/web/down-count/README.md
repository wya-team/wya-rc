## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/down-count/Basic.html)
## 功能
倒计时

## API

属性 | 说明 | 类型 | 默认值
---|---|---|---
id| - | `any` | -
tag| 外层标签 | `str` | span
beforeText| 前缀 | `str` | -
afterText| 后缀 | `str` | -
T| 定时器周期 | `num` | -
targetTime| 目标时间 | `str \| num` | -
serverTime| 服务器时间 | `str \| num` | -
className| 样式 | `str` | -
style| 样式 | `obj` | {}
onChange| 改变回调 | `(timer) => void` | -
onEnd| 结束回调 | `() => void` | -
onTip| 提示弹窗 | `(msg) => void` | -
format| 时间格式 `DD \| DD:HH \| DD:HH:MM \| DD:HH:MM:SS` | `str` | DD:HH:MM:SS

## 基础用法

```jsx
import React, { Component } from 'react';
import { DownCount } from 'wya-rc';
import { message } from 'antd';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			targetTime: "2018-02-22"
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				targetTime: "2019-01-01"
			});
		}, 5000);
	}
	render() {
		return (
			<DownCount
				targetTime={this.state.targetTime}
				onTip={message.info}
			/>
		);
	}
}
export default Basic;

```
