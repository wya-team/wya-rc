## 功能
模态框

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -

## 基础用法

```jsx
import React, { Component } from 'react';
import MModals from '../MModals';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		MModals.alert("提示", "aaaa", [
			{
				text: "取消",
				onPress: () => {
					
				}
			},
			{
				text: "确定",
				onPress: () => {
				}
			}
		]);
	}
	render() {
		return (
			<div onClick={this.handleClick}>点击我</div>
		);
	}
}
export default Basic;

```