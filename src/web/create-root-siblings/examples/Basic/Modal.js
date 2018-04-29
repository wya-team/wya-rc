import React, { Component } from 'react';
import CreateRootSiblings from '../../index';
import { Modal, message } from 'antd';
@CreateRootSiblings({
	cName: 'root-modal-test',
	onBefore: () => {
		message.destroy();
		message.info('此处可以执行ajax, 需要用Promise, 3秒后弹出');
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({});
				message.destroy();
			}, 3000);
		});
	}
})
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleOk = () => {
		this.props.onSure && this.props.onSure();
	}
	handleCancel = () => {
		this.props.onClose && this.props.onClose();
	}
	render() {
		// Modal 默认就是Portal组件
		return (
			<Modal
				visible={true}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
			>
				<div>假设我是一个弹窗</div>
			</Modal>
		);
	}
}
export default Basic;
