## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/authorized/Basic.html)

## 功能
权限管理(Authorized)

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 标签 | `str / func` | div
auth | 权限，只有当全是`true`才显示; 暂时不支持传递函数 | `array[ bool ]` | []

## 基础用法

```jsx
import React, { Component } from 'react';
import Authorized from '../Authorized';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			auth: [
				true, 
				true,
				true
			]
		};
	}
	render() {
		const { auth } = this.state;
		return (
			<Authorized
				auth={auth}
			>tpl</Authorized>
		);
	}
}
export default Basic;

```