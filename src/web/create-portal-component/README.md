## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/create-portal-func/Basic.html)
## 功能 - 传送门组件二

根节点兄弟组件 - `Component` - 传送门组件

#### 传送门组件一 [移步](https://github.com/wya-team/wya-rc/tree/master/src/web/create-portal-func/)：

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
#### 传送门组件二：

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

## 基础用法

```jsx
import React, { Component } from 'react';
import { CreatePortalComponent } from 'wya-rc';
@CreatePortalComponent({})
class Timer extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
	}
	render() {
		return (
			<div>{this.props.timer}</div>
		);
	}
}
export default Timer;


// 调用
<Timer />
```
