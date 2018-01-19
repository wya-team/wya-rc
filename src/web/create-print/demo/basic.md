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