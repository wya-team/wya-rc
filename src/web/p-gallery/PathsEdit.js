import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Icon, message } from 'antd';
import RcInstance from '../rc-instance/index';
class PathsEdit extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRename = async () => {
		let res;
		try {
			let { pathSelect, paths } = this.props;
			const { cat_name, cat_id } = pathSelect;
			res = await new Promise((resolve, reject) => {
				const memberRef = Modal.confirm({
					title: (
						<div 
							style={{ display: `flex`, alignItems: 'center', justifyContent: 'space-between' }}
							onClick={
								e => { memberRef.destroy(); reject(); }
							}
						>
							<div>修改内容</div>
							<Icon type="close" />
						</div>
					),
					content: (
						<Input 
							type="text" 
							placeholder="新建分类" 
							defaultValue={`${cat_name}`} 
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
							document.querySelector("#vc-input").value = cat_name;
							$reject();
						});
					}
				});
			});
			message.destroy();
			message.loading('加载中...', 0);
			const { config: { PGallery } } = RcInstance;
			const { URL_PGALLERY_PATHS_ITEM_RENAME_POST: _url } = PGallery || {};
			const { URL_PGALLERY_PATHS_ITEM_RENAME_POST: url } = this.props.url || {};
			const { request } = this.props;
			let param = {
				cat_id,
				cat_name: res
			};
			request({
				url: url || _url,
				type: "POST",
				param
			}).then((res) => {
				message.destroy();
				pathSelect = {
					...pathSelect,
					...param
				};
				paths = paths.map((item, index) => {
					if (item.cat_id === pathSelect.cat_id) {
						return pathSelect;
					}
					return item;
				});
				this.props.onSet({
					pathSelect,
					paths
				});
			}).catch((res) => {
				message.destroy();
				message.error(res.msg);
				console.log(res);
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
				message.destroy();
				message.loading('加载中...', 0);
				const { config: { PGallery } } = RcInstance;
				const { URL_PGALLERY_PATHS_ITEM_DEL_POST: _url } = PGallery || {};
				const { URL_PGALLERY_PATHS_ITEM_DEL_POST: url } = this.props.url || {};
				const { request, pathSelect: { cat_id } } = this.props;
				request({
					url: url || _url,
					type: "POST",
					param: {
						cat_id
					}
				}).then((res) => {
					message.destroy();
					let { paths, pathSelect } = this.props;
					paths = paths.filter((item, index) => item.cat_id !== pathSelect.cat_id);
					this.props.onSet({
						pathSelect: {
							...paths[0],
							// 删除分类，第一个数量增加
							// count: paths[0].count + pathSelect.count
						},
						paths
					});
				}).catch((res) => {
					message.destroy();
					res.msg && message.error(res.msg, 1.5);
				});
				
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