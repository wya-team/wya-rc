## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/create-portal-func/Basic.html)
## 功能 - 传送门组件一

根节点兄弟组件 - `() => Promise` - 传送门组件

#### 传送门组件一：

- `15.x` 中 `Portal`组件概念 
- 不使用`render()`场景，而是如下（Sku弹窗为例）

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
#### 传送门组件二 [移步](https://github.com/wya-team/wya-rc/tree/master/src/web/create-portal-component/)：

- `16.x` 中 `Portal` 扩展
- 使用`render()`场景

```jsx

<Modal>
	{/* ... */}
</Modal>

```
## API (`CreatePortalFunc`)
属性 | 说明 | 类型 | 默认值
---|---|---|---
el | 创建的外层元素 | `string` | div
root | 根节点 | `string` | body
cName | 组件名称：用于标识卸载 | `string` | -
onBefore | 初始化组件前操作，可以是ajax | `(opts = {}) => Promise` | -


## API (`[Viewer].popup`)
属性 | 说明 | 类型 | 默认值
---|---|---|---
parent | 用于传递context, 接入redux | `obj` | -
getInstance | 获取当前组件实例回调 | `(instance, onSure, onClose) => void` | -
onBefore | 自定义ajax, 替代先前onBefore | `(opts = {}) => Promise` | -
cName | 自定义cName, 替代先前cName | `string` | -

## 基础用法

- 例子
```jsx
import React, { Component } from 'react';
import { CreatePortalFunc } from 'wya-rc';
import { Modal, message } from 'antd';
@CreatePortalFunc({
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

// 调用
Modal.popup({
	type: 'test'
}).then(() => {
	console.log('你点击了确定');
}).catch(() => {
	console.log('你点击了取消');
});
```
