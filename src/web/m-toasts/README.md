## 功能
轻提示(点击遮罩可以关闭)

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -

## 基础用法

```jsx
import React, { Component } from 'react';
import { MToasts } from 'wya-rc';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		MToasts.info('test');
	}
	render() {
		return (
			<div onClick={this.handleClick}>点击我</div>
		);
	}
}
export default Basic;

```