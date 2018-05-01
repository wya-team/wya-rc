import React, { Component } from 'react';
import Modal from './Basic/Modal';
import DebounceClick from '../../debounce-click/index';
import { message } from 'antd';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = (e) => {
		// e.persist();
		Modal.popup({
			// parent: this,
			// getInstance: (instance, onSure, onClose) => console.log(instance),
			type: 'test'
		}).then(() => {
			console.log('你点击了确定');
		}).catch(() => {
			console.log('你点击了取消');
		});
	}
	render() {
		return (
			<DebounceClick onClick={this.handleClick}>点我</DebounceClick>
		);
	}
}
export default Basic;
