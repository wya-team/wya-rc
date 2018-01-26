import React, { Component } from 'react';
import { Modal, Button, message, Input } from 'antd';
// 置顶
// 类目名称
// 类目级数
// 素材数
// 图片数
// 更新时间
// 操作

const keywordStyle = { color: "red", fontWeight: 'normal' };

class Item extends Component {
	constructor(props) {
		super(props);
		this.handleDel = ::this.handleDel;
		this.handleEdit = ::this.handleEdit;
		this.handlePut = ::this.handlePut;
		this.handleSelect = ::this.handleSelect;
	}
	componentWillMount() {}
	
	handleDel(){
		Modal.confirm({
			title: '你确定要删除这些内容么?',
			content: '',
			iconType: "",
			onOk: () => {
				this.props.actions.onDel && this.props.actions.onDel();
			},
			onCancel: () => {
				// console.log('Cancel');
			},
		});
	}
	handleEdit(){
		Modal.confirm({
			title: '你确定要编辑这些内容么?',
			content: '',
			iconType: "",
			onOk: () => {
				this.props.actions.onDel && this.props.actions.onDel();
			},
			onCancel: () => {
				// console.log('Cancel');
			},
		});
	}
	handlePut(){
		Modal.confirm({
			title: '你确定要更新这些内容么?',
			content: '',
			iconType: "",
			onOk: () => {
				this.props.actions.onDel && this.props.actions.onDel();
			},
			onCancel: () => {
				// console.log('Cancel');
			},
		});
	}
	handleSelect() {
		const { itemData: { id } } = this.props;

		this.props.actions.onSelectItem(id);
		// message.error('后续内部集成', 1.5);
	}
	render() {
		const { itemData = {}, actions, keyword, selectArr = [] } = this.props;
		const { id } = itemData;
		return (
			<tr>
				<td>
					<input 
						type="checkbox" 
						checked = {selectArr.includes(id)}
						onChange = {this.handleSelect}
					/>
				</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>
					<Button
						style={{ margin: 10 }}
						onClick={this.handleEdit}
					>编辑</Button>
					<Button
						style={{ margin: 10 }}
						onClick={this.handlePut}
					>更新</Button>
					<Button
						style={{ margin: 10 }}
						onClick={this.handleDel}
					>删除</Button>
				</td>
			</tr>
		);
	}
}

export default Item;