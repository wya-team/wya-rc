## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/root-silbings/Basic.html)
## 功能(未开始)
根节点兄弟组件

- `16.x` 中 `Portal`组件概念
- 不使用声明式场景（render），而是如下（Sku弹窗为例）

```js

handleSku = (e) => {
	Sku.popup({})
		.then(() => {})
		.catch(() => {})
}

```

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -

## 基础用法

- 注册
```jsx
let sibling = new RootSiblings(<View style={{ color: 'red'}} />);
```
- 更新 
```
sibling.update(<View style={{ color: 'red'}} />)
```
- 销毁
```
sibling.destroy();
sibling.close();
```

- 例子
```
import React, { Component, } from 'react';
import { RootSiblings } from 'wya-rc';
import Viewer from './Viewer';
let Tpl = {};
Tpl = {
	viewer: null, // 只会存在一个viewer，除非需要数组;
	show(opts = {}) {
		return new Promise((resolve, reject) => {
			this.close();
			opts = {
				...opts,
				show: true,
				onCloseSoon: () => {
					this.close();
				},
				onSure: (res) => {
					opts.onCloseSoon();
					resolve(res);
				},
				onClose: (res) => {
					opts.onCloseSoon();
					reject(res);
				},
			};
			this.viewer = new RootSiblings( <Viewer {...opts} /> );
		});
	},
	close() {
		if (this.viewer instanceof RootSiblings) {
			this.viewer.destroy();
			this.viewer = null;
		}
	},
	popup(opts) {
		if (typeof opts !== 'object') {
			return console.error('opts is not object');
		}
		return Tpl.show(opts);
	}
};
export default Tpl;
```