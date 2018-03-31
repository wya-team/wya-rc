import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { getCroppedImg, parseDOM, retrieveImageURL, isTouchDevice, isFileAPISupported } from '../utils/utils';


const draggableEvents = {
	touch: {
		// react代理事件
		react: {
			down: 'onTouchStart', 	// 按下
			mouseDown: 'onMouseDown', 
			drag: 'onTouchMove', 	// 拖拽
			drop: 'onTouchEnd', 	// 抬起
			move: 'onTouchMove',
			mouseMove: 'onMouseMove',
			up: 'onTouchEnd',
			mouseUp: 'onMouseUp'
		},
		// 原生事件
		native: {
			down: 'touchstart', 	// 按下
			mouseDown: 'mousedown',
			drag: 'touchmove',		// 拖拽
			drop: 'touchend',		// 抬起
			move: 'touchmove',	
			mouseMove: 'mousemove',
			up: 'touchend',
			mouseUp: 'mouseup'
		}
	},
	desktop: {
		// react代理事件
		react: {
			down: 'onMouseDown',	 // 按下
			drag: 'onDragOver',		 // 拖拽
			drop: 'onDrop', 		 // 抬起
			move: 'onMouseMove',
			up: 'onMouseUp'
		},
		// 原生事件
		native: {
			down: 'mousedown', 		// 按下
			drag: 'dragStart',		// 拖拽
			drop: 'drop',			// 抬起
			move: 'mousemove',
			up: 'mouseup'
		}
	}
};
const deviceEvents = isTouchDevice
	? draggableEvents.touch
	: draggableEvents.desktop;

const pixelRatio =
	typeof window !== 'undefined' && window.devicePixelRatio
		? window.devicePixelRatio
		: 1;

// 绘制一个圆角矩形.
const drawRoundedRect = (context, x, y, width, height, borderRadius) => {
	if (borderRadius === 0) {
		context.rect(x, y, width, height);
	} else {
		const widthMinusRad = width - borderRadius;
		const heightMinusRad = height - borderRadius;
		context.translate(x, y);
		context.arc(
			borderRadius,
			borderRadius,
			borderRadius,
			Math.PI,
			Math.PI * 1.5
		);
		context.lineTo(widthMinusRad, 0);
		context.arc(
			widthMinusRad,
			borderRadius,
			borderRadius,
			Math.PI * 1.5,
			Math.PI * 2
		);
		context.lineTo(width, heightMinusRad);
		context.arc(
			widthMinusRad,
			heightMinusRad,
			borderRadius,
			Math.PI * 2,
			Math.PI * 0.5
		);
		context.lineTo(borderRadius, height);
		context.arc(
			borderRadius,
			heightMinusRad,
			borderRadius,
			Math.PI * 0.5,
			Math.PI
		);
		context.translate(-x, -y);
	}
};

class ImgsCrop extends React.Component {
 	constructor(props) {
		super(props);
		this.state = {
			drag: false,
			my: null,
			mx: null,
			image: {
				x: 0.5,
				y: 0.5
			}
		};
	}
	componentDidMount () {
		const { src } = this.props;
		const context = ReactDOM.findDOMNode(this.canvas).getContext('2d');
		if (src) {
			this.loadImage(src);
		}
		this.paint(context);
		if (document) {
			const nativeEvents = deviceEvents.native;
			// 使用原生绑定
			document.addEventListener(nativeEvents.move, this.handleMouseMove, false);
			document.addEventListener(nativeEvents.up, this.handleMouseUp, false);
			if (isTouchDevice) {
				document.addEventListener(
					nativeEvents.mouseMove,
					this.handleMouseMove,
					false
				);
				document.addEventListener(
					nativeEvents.mouseUp,
					this.handleMouseUp,
					false
				);
			}
		}
	}
	componentWillReceiveProps (newProps) {
		if (
			(newProps.src && this.props.src !== newProps.src) ||
			this.props.width !== newProps.width ||
			this.props.height !== newProps.height
		) {
			this.loadImage(newProps.src);
		}
	}
	componentDidUpdate (prevProps, prevState) {
		const canvas = ReactDOM.findDOMNode(this.canvas);
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.paint(context);
		this.paintImage(context, this.state.image, this.props.border);

		if (
			prevProps.src !== this.props.src ||
			prevProps.width !== this.props.width ||
			prevProps.height !== this.props.height ||
			prevProps.position !== this.props.position ||
			prevProps.scale !== this.props.scale ||
			prevProps.rotate !== this.props.rotate ||
			prevState.my !== this.state.my ||
			prevState.mx !== this.state.mx ||
			prevState.image.x !== this.state.image.x ||
			prevState.image.y !== this.state.image.y
		) {
			this.props.onImageChange();
		}
	}
	/**
	 * 去除事件
	 */
	componentWillUnmount () {
		if (document) {
			const nativeEvents = deviceEvents.native;
			document.removeEventListener(
				nativeEvents.move,
				this.handleMouseMove,
				false
			);
			document.removeEventListener(nativeEvents.up, this.handleMouseUp, false);
			if (isTouchDevice) {
				document.removeEventListener(
					nativeEvents.mouseMove,
					this.handleMouseMove,
					false
				);
				document.removeEventListener(
					nativeEvents.mouseUp,
					this.handleMouseUp,
					false
				);
			}
		}
	}
	/**
	 * 获取canvas节点
	 */
	setCanvas = canvas => this.canvas = canvas
	/**
	 * 绘制当前的canvas
	 */
	paint (context) {
		let { borderRadius, color } = this.props;

		context.save();
		// 画布的参数，不影响容器
		context.scale(pixelRatio, pixelRatio);
		context.translate(0, 0);
		// 填充色
		context.fillStyle = 'rgba(' + color.slice(0, 4).join(',') + ')';

		const dimensions = this.getDimensions();
		const [borderSizeX, borderSizeY] = this.getBorders(dimensions.border);
		const height = dimensions.canvas.height;
		const width = dimensions.canvas.width;

		// 将边框半径在零，宽度一半，高度一半之间
		borderRadius = Math.max(borderRadius, 0);
		borderRadius = Math.min(
			borderRadius,
			width / 2 - borderSizeX,
			height / 2 - borderSizeY
		);
		// 开始绘制
		context.beginPath();
		// 内，可能圆形
		drawRoundedRect(
			context,
			borderSizeX,
			borderSizeY,
			width - borderSizeX * 2,
			height - borderSizeY * 2,
			borderRadius
		);
		// 外，逆时针绘制
		context.rect(width, 0, -width, height);
		context.fill('evenodd');
		context.restore();
	}
	/**
	 * 绘制图片
	 */
	paintImage (context, image, border, scaleFactor = pixelRatio) {
		if (image.resource) {
			const { rotate } = this.props;
			const position = this.calculatePosition(image, border);

			context.save();

			context.translate(context.canvas.width / 2, context.canvas.height / 2);
			context.rotate(rotate * Math.PI / 180);
			context.translate( 
				-(context.canvas.width / 2), 
				-(context.canvas.height / 2)
			);

			if (this.isVertical()) {
				context.translate(
					(context.canvas.width - context.canvas.height) / 2,
					(context.canvas.height - context.canvas.width) / 2
				);
			}

			context.scale(scaleFactor, scaleFactor);
			// 在源图像上方显示目标图像
			context.globalCompositeOperation = 'destination-over';
			context.drawImage(
				image.resource,
				position.x,
				position.y,
				position.width,
				position.height
			);

			context.restore();
		}
	}
	/**
	 * 是否选择超过180
	 */
	isVertical () {
		return this.props.rotate % 180 !== 0;
	}
	/**
	 * 边框
	 */
	getBorders (border = this.props.border) {
		return Array.isArray(border) ? border : [border, border];
	}
	/**
	 * canvas外形尺寸
	 */
	getDimensions () {
		const { width, height, rotate, border } = this.props;

		const canvas = {};

		const [borderX, borderY] = this.getBorders(border);

		const canvasWidth = width;
		const canvasHeight = height;

		if (this.isVertical()) {
			canvas.width = canvasHeight;
			canvas.height = canvasWidth;
		} else {
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
		}

		canvas.width += borderX * 2;
		canvas.height += borderY * 2;

		return {
			canvas,
			rotate,
			width,
			height,
			border
		};
	}
	/**
	 * 外部调用
	 * 基于原图绘制
	 * 返回一个HTMLCanvasElement，在另一个画布上绘制，或添加到DOM。
	 */
	getImageToCanvas () {
		// 获取相对坐标
		const cropRect = this.getCroppingRect();
		const { image } = this.state;
		const { rotate } = this.props;

		// 获取实际像素坐标
		cropRect.x *= image.resource.width;
		cropRect.y *= image.resource.height;
		cropRect.width *= image.resource.width;
		cropRect.height *= image.resource.height;

		// 创建具有正确尺寸的画布
		const canvas = document.createElement('canvas');

		if (this.isVertical()) {
			canvas.width = cropRect.height;
			canvas.height = cropRect.width;
		} else {
			canvas.width = cropRect.width;
			canvas.height = cropRect.height;
		}

		// 在正确的位置绘制全尺寸图像,
		// 图像被截断到画布的大小.
		const context = canvas.getContext('2d');

		context.translate(canvas.width / 2, canvas.height / 2);
		context.rotate(rotate * Math.PI / 180);
		context.translate(-(canvas.width / 2), -(canvas.height / 2));

		if (this.isVertical()) {
			context.translate(
				(canvas.width - canvas.height) / 2,
				(canvas.height - canvas.width) / 2
			);
		}

		context.drawImage(image.resource, -cropRect.x, -cropRect.y);

		return canvas;
	}

	/**
	 * 外部调用
	 * 基于当前画布大小绘制.
	 * 返回一个HTMLCanvasElement ，base64 -> canvas.toDataURL()
	 */
	getImageScaledToCanvas () {
		const { width, height } = this.getDimensions();

		const canvas = document.createElement('canvas');

		if (this.isVertical()) {
			canvas.width = height;
			canvas.height = width;
		} else {
			canvas.width = width;
			canvas.height = height;
		}

		// 不要在这里绘制边框，因为它是生成的图像
		this.paintImage(canvas.getContext('2d'), this.state.image, 0, 1);

		return canvas;
	}
	getImage(isNormal = true, fileName = '____fileName', getFile = false) {
		return getCroppedImg(isNormal ? this.getImageToCanvas() : this.getImageScaledToCanvas(), fileName, getFile);
	}
	/**
	 * x轴默认缩放
	 */
	getXScale () {
		const { image } = this.state;
		const { width, height } = this.props;

		const canvasAspect = width / height;
		const imageAspect = image.width / image.height;

		return Math.min(1, canvasAspect / imageAspect);
	}
	/**
	 * y轴默认缩放
	 */
	getYScale () {
		const { image } = this.state;
		const { width, height } = this.props;

		const canvasAspect = height / width;
		const imageAspect = image.height / image.width;

		return Math.min(1, canvasAspect / imageAspect);
	}
	/**
	 * 可外调用
	 * 获取裁剪的startX, startY, width, height [0, 1]
	 */
	getCroppingRect () {
		const { image } = this.state;
		const { scale } = this.props;

		const position = this.props.position || {
			x: image.x,
			y: image.y
		};
		const width = 1 / scale * this.getXScale();
		const height = 1 / scale * this.getYScale();

		const croppingRect = {
			x: position.x - width / 2,
			y: position.y - height / 2,
			width,
			height
		};

		let xMin = 0;
		let xMax = 1 - croppingRect.width;
		let yMin = 0;
		let yMax = 1 - croppingRect.height;
		/**
		 * 如果裁剪图像大于原图像，则需要更改
		 * 我们的最大和最小的x＆y允许图像出现在任何地方
		 * 到修剪矩形的边缘.
		 */
		const isLargerThanImage = width > 1 || height > 1;

		if (isLargerThanImage) {
			xMin = -croppingRect.width;
			xMax = 1;
			yMin = -croppingRect.height;
			yMax = 1;
		}

		return {
			...croppingRect,
			x: Math.max(xMin, Math.min(croppingRect.x, xMax)),
			y: Math.max(yMin, Math.min(croppingRect.y, yMax))
		};
	}
	/**
	 * 通过相对位置计算 实际的位置
	 */
	calculatePosition (image, border) {
		image = image || this.state.image;

		const { scale } = this.props;

		const [borderX, borderY] = this.getBorders(border);

		const croppingRect = this.getCroppingRect();

		const width = image.width * scale;
		const height = image.height * scale;

		let x = -croppingRect.x * width;
		let y = -croppingRect.y * height;

		if (this.isVertical()) {
			x += borderY;
			y += borderX;
		} else {
			x += borderX;
			y += borderY;
		}

		return {
			x,
			y,
			height,
			width
		};
	}
	/**
	 * 按下，只作用于canvas区域
	 */
	handleMouseDown = (e) => { 
		e = e || window.event;
		// 多指触控
		if (e.touches && e.touches.length > 1) return;
		// 如果e是touch事件，则preventDefault保持相应的鼠标事件也被稍后触发。去除
		e.preventDefault();
		this.setState({
			drag: true,
			mx: null,
			my: null
		});
	}
	/**
	 * 抬起
	 * 由 this.state.drag 判断
	 */
	handleMouseUp = () => {
		if (this.state.drag) {
			this.setState({ drag: false });
			this.props.onMouseUp();
		}
	}
	/**
	 * 移动 作用于整个document
	 */
	handleMouseMove = (e) => {

		e = e || window.event;

		if (this.state.drag === false) {
			return;
		}
		// 多指触控
		if (e.touches && e.touches.length > 1) return;

		const mousePositionX = e.targetTouches
			? e.targetTouches[0].pageX
			: e.clientX;
		const mousePositionY = e.targetTouches
			? e.targetTouches[0].pageY
			: e.clientY;

		const newState = {
			mx: mousePositionX,
			my: mousePositionY
		};

		let { rotate, scale } = this.props;
		let { image, mx, my } = this.state;

		rotate %= 360;
		rotate = rotate < 0 ? rotate + 360 : rotate;

		if (mx && my) {
			mx = mx - mousePositionX;
			my = my - mousePositionY;

			const width = image.width * scale;
			const height = image.height * scale;

			let { x: lastX, y: lastY } = this.getCroppingRect();

			lastX *= width;
			lastY *= height;

			// 计算向量
			const toRadians = degree => degree * (Math.PI / 180);
			const cos = Math.cos(toRadians(rotate));
			const sin = Math.sin(toRadians(rotate));

			const x = lastX + mx * cos + my * sin;
			const y = lastY + -mx * sin + my * cos;

			const relativeWidth = 1 / this.props.scale * this.getXScale();
			const relativeHeight = 1 / this.props.scale * this.getYScale();

			const position = {
				x: x / width + relativeWidth / 2,
				y: y / height + relativeHeight / 2
			};

			this.props.onPositionChange(position);

			newState.image = {
				...this.state.image,
				...position
			};
		}

		this.setState(newState);
		/**
		 * 移动回掉
		 */
		this.props.onMouseMove(e);
	}
	/**
	 * 去除作用于canvas本身事件
	 * touch：onTouchMove -> touchmove
	 * desktop：onDragOver -> dragStart
	 */
	handleDragOver = (e) => {
		// 对于touch端它属于touchmove事件
		e = e || window.event;
		// 多指触控
		if (e.touches && e.touches.length > 1) return;
		e.preventDefault();
	}
	/**
	 * 去除作用于canvas本身事件
	 * touch：onTouchEnd -> touchend
	 * desktop：onDrop -> drop
	 */
	handleDrop = (e = window.event) => {
		// 临时注释
		// e.stopPropagation();
		// e.preventDefault();
		// 支持desktop下直接拖入图片
		if (e.dataTransfer) {
			e.stopPropagation();
			e.preventDefault();
			const { files, items } = e.dataTransfer;

			if (files && files.length) { // 本地拖入
				this.props.onDropFile(e);
				this.loadImageFile(files[0]);
			} else if (items && items.length) { // 网页链接拖入
				retrieveImageURL(items, src => this.loadImage(src));
			}
		}
	}
	/**
	 * 判断是否是url链接
	 * 基于base64正则
	 */
	isDataURL (str) {
		if (str === null) {
			return false;
		}
		const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
		return !!str.match(regex);
	}
	/**
	 * 选择加载图片的方式
	 */
	loadImage (image) {
		if (isFileAPISupported && image instanceof File) {
			this.loadImageFile(image);
		} else if (typeof image === 'string') {
			this.loadImageURL(image);
		}
	}
	/**
	 * 生成图片
	 */
	loadImageURL (imageURL) {
		const imageObj = new Image();
		imageObj.onload = this.handleImageReady.bind(this, imageObj);
		imageObj.onerror = this.props.onLoadFailure;
		/**
		 * 在HTML5中，一些 HTML 元素提供了对 CORS 的支持，
		 * 例如 <img> 和 <video> 均有一个跨域属性 (crossOrigin property)，
		 * 它允许你配置元素获取数据的 CORS 请求。 这些属性是枚举的，并具有以下可能的值：
		 */
		if (!this.isDataURL(imageURL) && this.props.crossOrigin) { 
			imageObj.crossOrigin = this.props.crossOrigin; 
		}
		imageObj.src = imageURL;
	}
	/**
	 * 图片文件，如event.target.files[index]
	 */
	loadImageFile (imageFile) {
		const reader = new FileReader();
		reader.onload = e => this.loadImageURL(e.target.result);// 返回base64
		reader.readAsDataURL(imageFile);
	}

	/**
	 * 图片载入完成，设置state中image的信息
	 */
	handleImageReady (image) {
		const imageState = this.getInitialSize(image.width, image.height);
		imageState.resource = image;
		imageState.x = 0.5;
		imageState.y = 0.5;
		this.setState({ drag: false, image: imageState }, this.props.onImageReady);
		/**
		 * 回调，图片加载成功
		 */
		this.props.onLoadSuccess(imageState);
	}
	/**
	 * 初始的宽高
	 */
	getInitialSize (width, height) {
		let newHeight;
		let newWidth;

		const dimensions = this.getDimensions();
		const canvasRatio = dimensions.height / dimensions.width;
		const imageRatio = height / width;

		if (canvasRatio > imageRatio) {
			newHeight = dimensions.height; // 高度占满
			newWidth = width * (newHeight / height);
		} else {
			newWidth = dimensions.width; // 宽度占满
			newHeight = height * (newWidth / width);
		}

		return {
			height: newHeight,
			width: newWidth
		};
	}
	render () {
		const dimensions = this.getDimensions();
		const defaultStyle = {
			// 所在浏览器下的容器
			width: dimensions.canvas.width,
			height: dimensions.canvas.height,
			// 鼠标样式
			cursor: this.state.drag ? '-webkit-grabbing' : '-webkit-grab'
		};

		const attributes = {
			// canvas标签的width和height是画布实际宽度和高度
			width: dimensions.canvas.width * pixelRatio,
			height: dimensions.canvas.height * pixelRatio,
			style: {
				...defaultStyle,
				...this.props.style
			}
		};

		attributes[deviceEvents.react.down] = this.handleMouseDown;
		attributes[deviceEvents.react.drag] = this.handleDragOver;
		if (!this.props.disableDrop) { 
			attributes[deviceEvents.react.drop] = this.handleDrop; 
		}
		if (isTouchDevice) { // 可不写
			attributes[deviceEvents.react.mouseDown] = this.handleMouseDown; 
		}

		return <canvas ref={this.setCanvas} {...attributes} />;
	}
}
ImgsCrop.propTypes = {
	// 放大的倍数
	scale: PropTypes.number,
	// 旋转的角度倍数
	rotate: PropTypes.number,
	// 图片的地址
	src: PropTypes.oneOfType([
		PropTypes.string,
		...(isFileAPISupported ? [PropTypes.instanceOf(File)] : [])
	]),
	// 裁剪的边框 [x, y]
	border: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.arrayOf(PropTypes.number)
	]),
	// 裁剪的边框圆角
	borderRadius: PropTypes.number,
	// 裁剪区域宽
	width: PropTypes.number,
	// 裁剪区域高
	height: PropTypes.number,
	position: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),
	// 边框的背景色RGBA
	color: PropTypes.arrayOf(PropTypes.number),
	style: PropTypes.object,
	// CORS
	crossOrigin: PropTypes.oneOf(['', 'anonymous', 'use-credentials']),
	// 拖入图片回掉
	onDropFile: PropTypes.func,
	// 图片加载失败
	onLoadFailure: PropTypes.func,
	// 图片加载成功
	onLoadSuccess: PropTypes.func,
	// 图片加载成功，展示后执行
	onImageReady: PropTypes.func,
	// 图片信息变化
	onImageChange: PropTypes.func,
	// 抬起
	onMouseUp: PropTypes.func,
	// 移动
	onMouseMove: PropTypes.func,
	// 位置变化
	onPositionChange: PropTypes.func,
	// 是否支持拖拽图片进来编辑
	disableDrop: PropTypes.bool
};
ImgsCrop.defaultProps = {
	disableDrop: false,
	scale: 1,
	rotate: 0,
	border: 25,
	borderRadius: 0,
	width: isTouchDevice ? window.innerWidth : 200,
	height: isTouchDevice ? window.innerWidth : 200,
	color: [0, 0, 0, 0.5],
	style: {},
	onDropFile () {},
	onLoadFailure () {},
	onLoadSuccess () {},
	onImageReady () {},
	onImageChange () {},
	onMouseUp () {},
	onMouseMove () {},
	onPositionChange () {}
};
export default ImgsCrop;
