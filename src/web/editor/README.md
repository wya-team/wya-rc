## 功能
富文本编辑器(内部集成上传ajax等，之后更新)

## API

属性 | 说明 | 类型 | 默认值
---|---|---|---
initialContent | 用于指定initialContent和onChange的内容格式，raw表示使用编辑器原始数据作为输入和输出类型, html表示使用HTML字符串作为输入和输出类型 <b style="color: red"><br />为了保证内容的可编辑性，强烈建议使用raw格式，并通过onHTMLChange获取HTML格式的内容</b>  | `str` | raw
initialContent | 编辑器的初始内容，根据contentFormat类型传入html字符串或者raw字符串 | `str` | -
onChange | 指定编辑器内容发生变化时候的回调 | `(html | raw) => void` | -
onRAWChange | onRawChange | `(raw) => void` | -
onHTMLChange | onHTMLChange | `(html) => void` | -
controls | 指定控制栏组件 | `arr` | -
- controls

```js
[
  'undo', 'redo', 'split', 'font-size', 'font-family', 'text-color',
  'bold', 'italic', 'underline', 'strike-through', 'superscript',
  'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
  'blockquote', 'code', 'split', 'link', 'split', 'media'
]
```

## 基础用法

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'wya-rc';
const initRaw = {
	"blocks": [{
		"key": "180fu",
		"text": "helle world",
		"type": "unstyled",
		"depth": 0,
		"inlineStyleRanges": [],
		"entityRanges": [],
		"data": {}
	}],
	"entityMap": {}
};
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRawChange = (html) => {
		console.log(`HTML: ${html}`);
	}
	handleHTMLChange = (html) => {
		console.log(`HTML: ${html}`);
	}
	handleChange = (raw) => {
		console.log(`Raw: ${raw}`);
	}
	render() {
		return (
			<Editor 
				// contentFormat="raw"
				initialContent={initRaw}
				onRAWChange={this.handleRawChange}
				onHTMLChange={this.handleHTMLChange}
				onChange={this.handleChange}
			/>
		);

	}
}
Basic.propTypes = {};
Basic.defaultProps = {};
export default Basic;

```