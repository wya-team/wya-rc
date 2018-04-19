import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { getCroppedImg } from '../utils/utils';

class ToImg extends Component {
	constructor(props, context) {
		super(props, context);	
	}
	getImg = async (fileName = 'image', getFile = true) => {
		try {
			const html2canvas = await import('html2canvas');
			const canvas = await html2canvas(this.refs.img);
			const { file, base64Image } = await getCroppedImg(canvas, fileName, getFile);

			return {
				file, 
				base64Image
			};
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	download = async (fileName = 'image', getFile = true) => {
		try {
			const { file, base64Image } = await this.getImg(fileName, getFile);

			let $this = document.createElement('a');
			// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
			let evt = document.createEvent("HTMLEvents");
			evt.initEvent("click", true, true);
			// load
			$this.download = fileName;
			$this.href = URL.createObjectURL(file);
			$this.click();
			return { 
				file, 
				base64Image 
			};
		} catch (e) {
			console.log(e);
			return false;
		}
		
	}
	render() {
		return (
			cloneElement(
				Children.only(this.props.children), {
					ref: 'img'
				}
			)
		);
	}
}
ToImg.propTypes = {
};
ToImg.defaultProps = {
};
export default ToImg;