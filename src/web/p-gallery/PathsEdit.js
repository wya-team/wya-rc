import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Icon } from 'antd';

class PathsEdit extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRename = async () => {
		let res;
		try {
			const { pathSelect: { name } } = this.props;
			res = await new Promise((resolve, reject) => {
				const memberRef = Modal.confirm({
					title: (
						<div 
							onClick={
								e => { memberRef.destroy(); reject(); }
							}
						>
							<div>修改内容</div>
						</div>
					),
					content: (
						<Input 
							type="text" 
							placeholder="新建分类" 
							defaultValue={`${name}`} 
							id="vc-input"
						/>
					),
					iconType: "",
					closable: true,
					okText: "提交修改",
					onOk: () => {
						resolve(document.querySelector("#vc-input").value);
					},
					cancelText: "恢复默认",
					onCancel: () => {
						// 还原文字
						return new Promise(($resolve, $reject) => {
							document.querySelector("#vc-input").value = name;
							$reject();
						});
					}
				});
			});
			let { pathSelect, paths } = this.props;
			pathSelect = {
				...pathSelect,
				name: res || '新建分类'
			};
			paths = paths.map((item, index) => {
				if (item.id === pathSelect.id) {
					return pathSelect;
				}
				return item;
			});
			this.props.onSet({
				pathSelect: {
					...this.props.pathSelect,
					name: res || '新建分类'
				},
				paths
			});
		} catch (e) {
			console.log(e);
		}
		
	}
	handleDel = () => {
		Modal.confirm({
			title: '你确定要删除这些内容么?',
			content: '',
			iconType: "",
			onOk: () => {
				// message.destroy();
				// message.loading('加载中...', 0);
				
			},
			onCancel: () => {
				// console.log('Cancel');
			},
		});
	}
	render() {
		return (
			<Fragment>
				<Button
					onClick={this.handleRename} 
				>重命名</Button>
				<Button
					onClick={this.handleDel} 
					style={{ margin: `0 10px` }}
				>删除分组</Button>
			</Fragment>
		);
	}
}

PathsEdit.propTypes = {
};

export default PathsEdit;