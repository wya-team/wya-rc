import React, { Component } from 'react';
import ImgsCrop from './ImgsCrop';
import { Slider } from 'antd';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			scale: 1,
			rotate: 0
		};
	}
	handleScale = (scale) => {
		this.setState({
			scale
		});
	}
	render() {
		const { scale, rotate } = this.state;
		const { src, ...rest } = this.props;
		return (
			<div>
				<ImgsCrop
					ref={instance => this.imgCrop = instance}
					src={src}
					scale={scale}
					rotate={rotate}
					{...rest}
				/>
				<Slider onChange={this.handleScale} min={0.3} max={3} step={0.01} />
			</div>
			
		);
	}
}
export default Basic;
