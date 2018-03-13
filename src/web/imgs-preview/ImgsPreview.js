import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { pick } from 'lodash';
import Core from './Core.js';
import events from './events';

class ImgsPreview extends React.Component {
	static PhotoSwipe = Core;
	constructor(...params) {
		super(...params);
		this.state = {
			show: this.props.show,
			opts: this.props.opts
		};

		this.imgs = [];
	}

	componentWillReceiveProps(nextProps) {
		const { show } = this.state;
		if (nextProps.show) {
			if (!show) {
				this.setState({ show: true });
			}
		} else if (show) {
			this.setState({ show: false });
		}
	}
	setRef = (node, index) => {
		this.thumbnails = this.thumbnails || [];
		this.thumbnails[index] = node;
	}
	handleShow = (e, index) => {
		e.preventDefault();
		const getThumbBoundsFn = ((index) => {
			const thumbnail = this.thumbnails[index];
			const img = thumbnail.getElementsByTagName('img')[0];
			const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
			const rect = img.getBoundingClientRect();
			return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
		});
		const { opts } = this.state;
		opts.index = index;
		opts.getThumbBoundsFn = opts.getThumbBoundsFn || getThumbBoundsFn;
		this.setState({
			show: true,
			opts
		});
	}

	handleClose = () => {
		this.setState({
			show: false
		});
		this.props.onClose();
	}

	setSize = () => {
		// 懒加载未开发，自动适配尺寸
		let { items } = this.instance;
		items.forEach((item) => {
			if (item.src && !this.imgs.includes(item.src)) {
				let img = new Image();
				img.src = item.src;
				img.onload = () => {
					this.imgs.push(img);
					item.w = img.naturalWidth;
					item.h = img.naturalHeight;
					this.instance.updateSize(true);
				};
			}
		});
		
	}
	render() {
		const { dataSource, renderRow, style, className, ...other } = this.props;
		const { show, opts } = this.state;
		return (
			<Fragment>
				<div 
					className={classnames(['rc-imgs-preview', className]).trim()} 
					style={{ display: `flex`, flexWrap: `wrap`, ...style }}
				>
					{dataSource.map((item, index) => (
						<div
							key={index}
							ref={(node) => this.setRef(node, index)}
							onClick={(e) => this.handleShow(e, index)}
						>
							{renderRow(item)}
						</div>
					))}
				</div>
				<Core
					ref="core"
					imageLoadComplete={this.setSize}
					{...pick(other, events)}
					setInstance={(instance => this.instance = instance)}
					show={show}
					dataSource={dataSource}
					opts={opts}
					onClose={this.handleClose}
				/>
			</Fragment>
		);
	}
}

ImgsPreview.propTypes = {
	dataSource: PropTypes.array.isRequired,
	opts: PropTypes.object,
	renderRow: PropTypes.func,
	className: PropTypes.string,
	show: PropTypes.bool,
	onClose: PropTypes.func
};

ImgsPreview.defaultProps = {
	opts: {},
	renderRow: item => (
		<img src={item.thumbnail || item.msrc || item.src} width="100" height="100" alt=""/>
	),
	className: '',
	show: false,
	onClose: () => {
	}
};

export default ImgsPreview;
