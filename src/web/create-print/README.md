## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/create-print/Basic.html)
## 功能
负责打印内容（window.print）

## API

- `CreatePrint(options) => (WrappedComponent) => Component`

属性 | 说明 | 类型 | 默认值
---|---|---|---
refName | 需要答应的节点所绑定的ref | `str` | 必填

## 基础用法

```jsx
import React, { Component } from 'react';
import { CreatePrint } from 'wya-rc';
const refName = "printBox";
@CreatePrint({ refName })
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => { 
		const { printProps: { setPrint } } = this.props;
		setPrint();
	}
	render() {
		return (
			<div>
				<div ref={refName}>
					打印内容
					打印内容
					打印内容
					打印内容
					打印内容
				</div>
				<button onClick={this.handleClick}>点我打印</button>
			</div>
		);
	}
}
export default Basic;
```