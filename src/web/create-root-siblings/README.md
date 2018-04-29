## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/create-root-silbings/Basic.html)
## 功能(未开始)
根节点兄弟组件

- `16.x` 中 `Portal`组件概念 （Portal扩展 -> (待开发)）
- 不使用声明式场景（render），而是如下（Sku弹窗为例）

```js

handleModal = (e) => {
	Modal.popup({
		// parent: this,
		type: 'test'
	}).then(() => {
		console.log('你点击了确定');
	}).catch(() => {
		console.log('你点击了取消');
	});
}

```

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
cName | 组件名称：用于标识卸载 | `string` | -
onBefore | 初始化组件前操作，可以是ajax | `(opts = {}) => Promise` | -

## 基础用法

- 例子
```
import React, { Component } from 'react';
import { CreateRootSiblings } from 'wya-rc';
import { Modal, message } from 'antd';
@CreateRootSiblings({
	cName: 'root-modal-test',
	onBefore: () => {
		message.destroy();
		message.info('此处可以执行ajax, 需要用Promise, 3秒后弹出');
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({});
				message.destroy();
			}, 3000);
		});
	}
})
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleOk = () => {
		this.props.onSure && this.props.onSure();
	}
	handleCancel = () => {
		this.props.onClose && this.props.onClose();
	}
	render() {
		// Modal 默认就是Portal组件
		return (
			<Modal
				visible={true}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
			>
				<div>假设我是一个弹窗</div>
			</Modal>
		);
	}
}
export default Basic;

```