import React, { Component, Fragment, createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { pick } from 'lodash';
import Core from './Core.js';
import events from './events';

class ImgsPreview extends React.Component {
	static PhotoSwipe = Core;
	static Component = Core.Component;
	static Func = Core.Func;
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
	setRef = (node, index) => { }
	handleShow = (e, index) => {
		let pos = {};

		try {
			const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
			const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
			const rect = target.getBoundingClientRect();

			pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
		} catch (e) {
			console.log(e);
		}


		const { opts } = this.state;
		opts.index = index;
		opts.getThumbBoundsFn = ((index) => pos);

		this.setState({
			show: true,
			opts
		});
	}

	handleClose = () => {
		this.setState({
			show: false
		});
		this.props.onClose && this.props.onClose();
	}


	render() {
		const { dataSource, renderRow, style, className, portal, id, ...other } = this.props;
		const { show, opts } = this.state;
		const Target = portal ? Core.Component : Core;
		return (
			<Fragment>
				<div
					className={classnames(['rc-imgs-preview', className]).trim()}
					style={{ display: `flex`, flexWrap: `wrap`, ...style }}
				>
					{dataSource.map((item, index) => {
						return (
							<div
								key={index}
								ref={this.inputRef}
								onClick={(e) => (this.handleShow(e, index))}

							>
								{renderRow(item, index)}
							</div>
						);
					})}
				</div>
				<Target
					ref="core"
					id={id}
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
	id: PropTypes.string,
	className: PropTypes.string,
	show: PropTypes.bool,
	onClose: PropTypes.func
};

ImgsPreview.defaultProps = {
	opts: {
		history: false // 关闭url
	},
	renderRow: (item, index) => {
		let image = typeof item === 'object'
			? (item.thumbnail || item.msrc || item.src)
			: item;
		return (
			<img
				src={image}
				width="100"
				height="100"
				data-index={index}
			/>
		);
	},
	className: '',
	show: false,
	onClose: () => {
	}
};

export default ImgsPreview;
