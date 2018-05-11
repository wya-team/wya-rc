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

class Core extends React.Component {

	constructor(...params) {
		super(...params);
		this.state = {
			show: this.props.show
		};
	}


	componentDidMount() {
		const { show } = this.state;
		if (show) {
			this.openPhotoSwipe(this.props);
		}
	};

	componentWillReceiveProps(nextProps) {
		const { show } = this.state;
		if (nextProps.show) {
			if (!show) {
				this.openPhotoSwipe(nextProps);
			} else {
				this.updateItems(nextProps.dataSource);
			}
		} else if (show) {
			this.closePhotoSwipe();
		}
	};

	componentWillUnmount() {
		this.closePhotoSwipe();
	};

	openPhotoSwipe = (props) => {
		const { dataSource, opts, setInstance } = props;
		const pswpElement = this.pswpElement;
		this.photoSwipe = new Photoswipe(pswpElement, PhotoswipeUIDefault, dataSource, opts);
		setInstance && setInstance(this.photoSwipe);
		events.forEach((event) => {
			const callback = props[event];
			if (callback || event === 'destroy') {
				const self = this;
				this.photoSwipe.listen(event, function (...args) {
					if (callback) {
						args.unshift(this);
						callback(...args);
					}
					if (event === 'destroy') {
						self.handleClose();
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

	updateItems = (items = []) => {
		this.photoSwipe.items.length = 0;
		items.forEach((item) => {
			this.photoSwipe.items.push(item);
		});
		this.photoSwipe.invalidateCurrItems();
		this.photoSwipe.updateSize(true);
	};

	closePhotoSwipe = () => {
		if (!this.photoSwipe) {
			return;
		}
		this.photoSwipe.close();
	};

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
					this.pswpElement = node;
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
							<div className="pswp__caption__center"/>
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
