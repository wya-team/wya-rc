import React, { Component } from 'react';
import { Modal, Button, message, Input, Checkbox } from 'antd';
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
			title: '你确定要删除这些内容么?(第一页刷新)',
			content: '',
			iconType: "",
			onOk: () => {
				this.props.onDel && this.props.onDel();
			},
			onCancel: () => {
				// console.log('Cancel');
			},
		});
	}
	handleEdit(){
		Modal.confirm({
			title: '你确定要编辑这些内容么?(当前页刷新)',
			content: '',
			iconType: "",
			onOk: () => {
				this.props.onUpdate && this.props.onUpdate();
			},
			onCancel: () => {
				// console.log('Cancel');
			},
		});
	}
	handlePut(){
		Modal.confirm({
			title: '你确定要更新这些内容么?(当前页刷新)',
			content: '',
			iconType: "",
			onOk: () => {
				this.props.onUpdate && this.props.onUpdate();
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
		const { itemData = {}, actions, keyword, selectArr = [], rowSelection } = this.props;
		const { id } = itemData;
		return (
			<tr>
				{rowSelection &&
					<td>
						<Checkbox
							disabled={rowSelection.disabled}
							checked={rowSelection.checked}
							onChange={rowSelection.onChange}
						/>
					</td>
				}
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
				<td>6</td>
				<td>
					<Button
						style={{ margin: 10 }}
						onClick={this.handleEdit}
					>编辑(当前页刷新测试)</Button>
					<Button
						style={{ margin: 10 }}
						onClick={this.handlePut}
					>更新(当前页刷新测试)</Button>
					<Button
						style={{ margin: 10 }}
						onClick={this.handleDel}
					>删除(第一页刷新测试)</Button>
				</td>
			</tr>
		);
	}
}

export default Item;
