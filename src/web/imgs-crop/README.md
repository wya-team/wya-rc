- [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/imgs-crop/Basic.html)

## 功能
图片裁剪

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
src | 图片地址 | `any` | -
scale | 缩放值 | `number` | 1
rotate | 旋转角度 | `number` | 0
...
## 基础用法

```jsx
import React, { Component, Fragment } from 'react';
import { ImgsCrop } from 'wya-rc';
import { Slider, Button } from 'antd';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			_src: '',
			scale: 1,
			rotate: 0
		};
	}
	handleScale = (scale) => {
		this.setState({
			scale
		});
	}
	handleRotate = (rotate) => {
		this.setState({
			rotate
		});
	}
	handleClick = async (e) => {
		try {
			let fileInfo;
			fileInfo = await this.imgCrop.getImage();
			const { file, base64Image } = fileInfo;
			this.setState({
				_src: base64Image
			});

		} catch (e) {
			console.log(e, "跨域问题：需要添加 cors协议头");
		}
	}
	render() {
		const { scale, rotate } = this.state;
		const { src, ...rest } = this.props;
		return (
			<Fragment>
				<ImgsCrop
					ref={instance => this.imgCrop = instance}
					src={src}
					scale={scale}
					rotate={rotate}
					crossOrigin="anonymous"
					{...rest}
				/>
				<Slider defaultValue={1} onChange={this.handleScale} min={0.3} max={3} step={0.01} />
				<Slider defaultValue={0} onChange={this.handleRotate} min={0} max={360} step={1} />
				<Button onClick={this.handleClick}>保存</Button>
				<img 
					src={this.state._src || src}
					width="200"
				/>
			</Fragment>
			
		);
	}
}
Basic.defaultProps = {
	src: 'http://wx.qlogo.cn/mmopen/1MLz0YkS76H38jmh2IyPHHcgPccbkGrej7iaQ2YbDr1faauBg49H2hBRJPHGdAGkFX5V21xliaMZactkyWVqNl2g/'
};

export default Basic;

```