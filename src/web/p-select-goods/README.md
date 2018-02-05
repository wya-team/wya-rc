## 功能
我的素材库（图片管理）

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
url | 请求地址 | `object` | -
request | 网络请求 | `() -> Promise` | -
activeText | - | `-` | -
staticText | - | `-` | -
select | - | `-` | -
id | - | `-` | -
componentDidMount | - | `-` | -
- url

属性 | 说明 | 类型 | 默认值
---|---|---|---
URL_PSELECTGOODS_LIST_GET | 列表 | `object` | -



## 基础用法
```js
import { RcInstance } from 'wya-rc';
// 只需要注册一次
RcInstance.init({
	PSelectGoods: {
		URL_PSELECTGOODS_LIST_GET: 'https://managexcx.ruishan666.com/product/product/list.json'
	}
});
```
```jsx
import React, { Component } from 'react';
import { PSelectGoods } from 'wya-rc';

class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		PSelectGoods.popup({

		}).then((info) => {
			console.log(info, 'info');
		}).catch((e) => {
			console.log(e);
		});
	}
	render() {
		return null;
	}
}
export default Basic;



```