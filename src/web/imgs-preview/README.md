## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/imgs-preview/Basic.html)

## 功能
预览图片

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
dataSource | 源数据 | `array` | `[{ src, msrc, w, h ....}] | ["", ""]`
renderRow | item展示 | `func` | -
show | 开关，默认关闭 | `bool` | false
portal | 启用传送门组件 | `bool` | false
opts

## 基础用法

```jsx
import React from 'react';
import { ImgsPreview } from 'wya-rc';

class GalleryPage extends React.Component {
	constructor(...params) {
		super(...params);
		this.state = {
			show: false,
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png!4-4',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				}
				
			],
			opts: {
				closeOnScroll: false
			}
		};
	}
	renderRow = item => (
		<img src={item.thumbnail} width={100} height={100} alt=""/>
	);
	render() {
		const { dataSource, opts, show } = this.state;
		return (
			<ImgsPreview
				ref="imgs"
				dataSource={dataSource}
				renderRow={this.renderRow}
				opts={opts}
				// show={show}
				// onClose={this.handleClose}
			/>
		);
	}
}

export default GalleryPage;

```
## 扩展调用
```jsx
e.persist();
let pos = {};

try {
	const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计算，target已变化
	const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
	const rect = target.getBoundingClientRect();

	pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
} catch (e) {
	console.log(e);
}

ImgsPreview.popup({
	show: true,
	dataSource: this.state.dataSource,
	opts: {
		index: 2,
		getThumbBoundsFn: (index) => pos
	}
}).then(() => {

}).catch(() => {

});
```
