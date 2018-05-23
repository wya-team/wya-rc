import React, { Component, Fragment } from 'react';
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
	setRef = (node, index) => {
		this.thumbnails = this.thumbnails || [];
		this.thumbnails[index] = node;
	}
	handleShow = (e, index) => {
		e.persist();
		e.preventDefault();
		const getThumbBoundsFn = (index) => {
			const thumbnail = this.thumbnails[index] || e.currentTarget;
			const target = thumbnail.getElementsByTagName('img')[0] || e.currentTarget;
			const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
			const rect = target.getBoundingClientRect();
			return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
		};
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
	opts: {},
	renderRow: item => {
		let image = typeof item === 'object'
			? (item.thumbnail || item.msrc || item.src)
			: image;
		return (
			<img
				src={image}
				width="100"
				height="100"
				alt=""
			/>
		);
	},
	className: '',
	show: false,
	onClose: () => {
	}
};

export default ImgsPreview;
