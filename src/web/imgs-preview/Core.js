import React from 'react';
import PropTypes from 'prop-types';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import classnames from 'classnames';
import events from './events';

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
// import "photoswipe/src/css/main.scss";
// import "photoswipe/src/css/default-skin/default-skin.scss";
import CreatePortalComponent from '../create-portal-component/index';
import CreatePortalFunc from '../create-portal-func/index';
let realViewportWidth,
	useLargeImages = false,
	firstResize = true,
	imageSrcWillChange;
class Core extends React.Component {

	constructor(...params) {
		super(...params);
		this.state = {
			show: this.props.show
		};

		this.imgs = [];

		this.defaultEvent = {
			gettingData: this.gettingData
		};
	}


	componentDidMount() {
		const { show } = this.state;
		if (show) {
			this.initPhotoSwipe(this.props);
		}
	};

	componentWillReceiveProps(nextProps) {
		const { show } = this.state;
		if (nextProps.show) {
			if (!show) {
				this.initPhotoSwipe(nextProps);
			} else {
				let { dataSource } = nextProps;
				dataSource = this.setDataSource(dataSource);
				this.updatePhotoSwipe(dataSource);
			}
		} else if (show) {
			this.destroyPhotoSwipe();
		}
	};

	componentWillUnmount() {
		this.destroyPhotoSwipe();
	}
	setDataSource (images) {
		return images.map((item, index) => {
			if (typeof item === 'object') {
				return item;
			} else {
				return {
					src: item,
					thumbnail: item,
					title: `IMG_${index + 1}`,
					w: 1200,
					h: 900
				};
			}
		});
	}
	/**
	 * 实例
	 */
	initPhotoSwipe = (props) => {
		let { dataSource, opts, setInstance } = props;
		// 初始化参数
		dataSource = this.setDataSource(dataSource);

		// 插入的节点
		let pswpElement = this.pswpElement;

		// 实例
		this.photoSwipe = new Photoswipe(pswpElement, PhotoswipeUIDefault, dataSource, opts);
		setInstance && setInstance(this.photoSwipe);

		// 绑定事件
		events.forEach((event) => {
			const callback = props[event] || this.defaultEvent[event];
			if (callback || event === 'destroy') {
				this.photoSwipe.listen(event, (...args) => {
					if (callback) {
						args.unshift(this);
						callback(...args);
					}
					if (event === 'destroy') {
						this.handleClose();
					}
				});
			}
		});
		this.setState({
			show: true
		}, () => {
			this.photoSwipe.init();
		});
	};
	/**
	 * 更新元素
	 */
	updatePhotoSwipe = (items = []) => {
		this.photoSwipe.items.length = 0;
		items.forEach((item) => {
			this.photoSwipe.items.push(item);
		});
		this.photoSwipe.invalidateCurrItems();
		this.photoSwipe.updateSize(true);
	};
	/**
	 * 销毁实例
	 */
	destroyPhotoSwipe = () => {
		if (!this.photoSwipe) {
			return;
		}
		this.photoSwipe.close();
	}
	/**
	 * 不显示
	 */
	handleClose = () => {
		const { onClose } = this.props;
		this.setState({
			show: false
		}, () => {
			if (onClose) {
				onClose();
			}
		});
	};
	// MARK: 事件处理
	// 自动适配 - http://photoswipe.com/documentation/responsive-images.html
	gettingData = (instance, index) => {
		let { items } = this.photoSwipe;
		let item = items[index];
		if (item.src && !this.imgs.includes(item.src)) {
			let img = new Image();
			img.src = item.src;
			img.onload = () => {
				this.imgs.push(img);
				item.w = img.naturalWidth;
				item.h = img.naturalHeight;
				this.photoSwipe.updateSize(true);
			};
		}

	}
	render() {
		const { id } = this.props;
		let { className } = this.props;
		className = classnames(['pswp', className]).trim();
		return (
			<div
				id={id}
				className={className}
				tabIndex="-1"
				role="dialog"
				aria-hidden="true"
				ref={(node) => {
					this.pswpElement = this.pswpElement || node;
				}}
			>
				<div className="pswp__bg"/>
				<div className="pswp__scroll-wrap">
					<div className="pswp__container">
						<div className="pswp__item"/>
						<div className="pswp__item"/>
						<div className="pswp__item"/>
					</div>
					<div className="pswp__ui pswp__ui--hidden">
						<div className="pswp__top-bar">
							<div className="pswp__counter"/>
							<button
								className="pswp__button pswp__button--close"
								title="Close (Esc)"
							/>
							{
								// <button
								// 	className="pswp__button pswp__button--share"
								// 	title="Share"
								// />
							}
							<button
								className="pswp__button pswp__button--fs"
								title="Toggle fullscreen"
							/>
							<button className="pswp__button pswp__button--zoom" title="Zoom in/out"/>
							<div className="pswp__preloader">
								<div className="pswp__preloader__icn">
									<div className="pswp__preloader__cut">
										<div className="pswp__preloader__donut"/>
									</div>
								</div>
							</div>
						</div>
						<div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
							<div className="pswp__share-tooltip"/>
						</div>
						<button
							className="pswp__button pswp__button--arrow--left"
							title="Previous (arrow left)"
						/>
						<button
							className="pswp__button pswp__button--arrow--right"
							title="Next (arrow right)"
						/>
						<div className="pswp__caption">
							<div className="pswp__caption__center" style={{ textAlign: "center" }}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Core.propTypes = {
	show: PropTypes.bool.isRequired,
	dataSource: PropTypes.array.isRequired,
	opts: PropTypes.object,
	onClose: PropTypes.func,
	id: PropTypes.string,
	className: PropTypes.string
};

Core.defaultProps = {
	opts: {},
	onClose: () => {},
	id: '',
	className: ''
};

Core.Component = CreatePortalComponent({})(Core);
Core.Func = CreatePortalFunc({
	cName: 'rc-imgs-preview'
})(Core);
export default Core;
