## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/icon/Basic.html)
## 功能
导航栏

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
style | 外部自定义样式 | `object` | `{}`
className | 外部自定义类名 | `string` | -
type | icon类型 | `string` | -

## 基础用法
```jsx
import React, { Component } from 'react';
import { Icon } from 'wya-rc';

class Content extends Component {
	render() {
		return (
			<div>
				<Icon type="right" style={{ color: "red" }} />
				<Icon type="delete" style={{ color: "red" }} />
			</div>
		);
	}
}

export default Content;
```