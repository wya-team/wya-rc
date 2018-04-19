- [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/to-img/Basic.html)

## 功能
html转图片

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -

## 基础用法
- `getImg(fileName = 'image', getFile = true)`
- `download(fileName = 'image', getFile = true)`

```jsx
import React, { Component } from 'react';
import { ToImg } from 'wya-rc';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		this.toImg.download()
			.then((e) => {

			}).catch((e) => {
				console.log(e);
			});
	}
	render() {
		return (
			<div>
				<ToImg ref={e => this.toImg = e}>
					<div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
					</div>
				</ToImg>
				<div onClick={this.handleClick}>点击</div>
			</div>
			
		);
	}
}
export default Basic;

```