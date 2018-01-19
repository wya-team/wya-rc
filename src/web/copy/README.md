## 功能
复制内容

## API

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 复制的文本内容 | `any` | -
onCopyBefore | 复制前的操作, 要求返回`Promise` | `(e) => Promise` | -
onCopyAfter | 复制后的操作 | `() => void` | -
isReplace | onCopyBefore 之后是否重新赋值给value | `bool` | false

## 基础用法

```jsx
import React, { Component } from 'react';
import { Copy } from 'wya-rc';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Copy value="test">
				<button>点我复制</button>
			</Copy>
		);
	}
}
export default Basic;
```

