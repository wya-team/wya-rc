## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/pipe/Basic.html)
## 功能
- 类似管道概念

```
aaaaaaaaa -> aaa...

2018-01-01 -> 2018/01/01
```

- 文字长度截取后 `...`
- 文字达到当前自适应改变大小（待开发）
- 自带几种过滤的方式

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 标签 | `str / func` | span
mode | 模式 `ellipsis / auto / none` | `str` | ellipsis
start | 开始位置 | `num` | 0
length | 截取的长度 | `num` | 5
extra | 截取后跟随的文本 | `str` | ...
onConvert | 自定义转化 | `func` | -

## 基础用法

```jsx
import React, { Component } from 'react';
import { Pipe } from 'wya-rc';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Pipe>tpltpltpltpltpltpltpl</Pipe>
		);
	}
}
export default Basic;

```