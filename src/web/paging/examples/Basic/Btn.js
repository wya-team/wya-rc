import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
class Btn extends Component {
	constructor(props) {
		super(props);
		this.handleSelectAll = ::this.handleSelectAll;
		this.handleSelectCancel = ::this.handleSelectCancel;
		this.handleDel = ::this.handleDel;
	}
	componentWillMount() {}
	handleSelectAll(){
		message.error('后续内部集成', 1.5);
	}
	handleSelectCancel(){
		message.error('后续内部集成', 1.5);
	}
	handleDel(){
		const { selectArr } = this.props;
		if (selectArr.length == 0 ){
			message.error('请先选择', 1.5);
			return;
		} 
		Modal.confirm({
			title: '你确定要删除这些内容么?',
			content: '提示',
			onOk: () => {
				this.props.actions.onDel && this.props.actions.onDel();
			},
			onCancel: () => {
				console.log('Cancel');
			},
		});
	}
	render() {
		return (
			<div>
				<Button 
					type="primary"
					onClick={this.handleSelectAll}
				>全选</Button>&nbsp;
				<Button
					onClick={this.handleSelectCancel}
				>取消</Button>&nbsp;
				<Button 
					type="danger"
					onClick={this.handleDel}
				>批量删除</Button>
			</div>
		);	
	}
}

export default Btn;