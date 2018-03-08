import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import './PPopup.scss';

import createLanguage from '../create-language/index.js';
@createLanguage()
class PPopup extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		this.el.classList.add('__active');
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	setEl = (node) => {
		this.el = this.el || node;
	}
	handleClose = (e) => {
		// 
		e && e.preventDefault();
		e && e.stopPropagation();

		this.el.classList.remove('__active');
		this.timer = setTimeout(() => {
			// 主线程
			this && this.props.onClose && this.props.onClose();
		}, 201);
	}
	handleSure = (res) => {
		this.el.classList.remove('__active');
		this.timer = setTimeout(() => {
			this.props.onSure && this.props.onSure(res);
		}, 201);
	}
	render() {
		const { children, title, className, style = {} } = this.props;
		let content = children[0] || children;
		let footer = children[1] || '';
		return (
			<div className={`wp-popup${className ? ` ${className}` : ''}`} style={{ ...style }} ref={this.setEl}>
				<div className="__mask" onClick={this.handleClose}/>
				<div className="__container">
					<div className="__header">
						<div>{title}</div>		
						<Icon type="close" onClick={this.handleClose}/>
					</div>
					{
						cloneElement(content, {
							onClose: this.handleClose,
							onSure: this.handleSure
						})
					}
					{
						!!footer && cloneElement(footer, {
							onClose: this.handleClose,
							onSure: this.handleSure
						})
					}
				</div>
			</div>
		);
	}
}

export default PPopup;