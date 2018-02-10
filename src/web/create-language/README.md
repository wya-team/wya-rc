## 功能
antd - （语言）默认中文

## API

- `CreateLanguage(options) => (WrappedComponent) => Component`

属性 | 说明 | 类型 | 默认值
---|---|---|---
locale | 语言包 | - | zh-CN

## 基础用法

```jsx
import React, { Component } from 'react';
import { CreateLanguage } from '../../../main.js';
import { Modal } from 'antd';
@CreateLanguage()
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => { 
		Modal.confirm({});
	}
	render() {
		return (
			<div onClick={this.handleClick}>
				test
			</div>
		);
	}
}
export default Basic;

```