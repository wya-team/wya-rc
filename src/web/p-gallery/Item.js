import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RcInstance from '../rc-instance/index';
import { Button, Modal, Input, Icon, message, Radio } from 'antd';
import { initSelect } from '../utils/utils';
const RadioGroup = Radio.Group;
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRename = async () => {
		let inputText;
		try {
			let { itemData: { file_id, file_name } } = this.props;
			inputText = await new Promise((resolve, reject) => {
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
							defaultValue={`${file_name}`} 
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
							document.querySelector("#vc-input").value = file_name;
							$reject();
						});
					}
				});
			});
			message.destroy();
			message.loading('加载中...', 0);
			const { config: { PGallery } } = RcInstance;
			const { URL_PGALLERY_IMGS_ITEM_RENAME_POST: _url } = PGallery || {};
			const { URL_PGALLERY_IMGS_ITEM_RENAME_POST: url } = this.props.url || {};
			const { request } = this.props;
			let param = {
				file_id: file_id,
				file_name: inputText
			};
			request({
				url: url || _url,
				type: "POST",
				param
			}).then((res) => {
				message.destroy();
				this.props.onSetItem(file_id, { file_name: param.file_name });
			}).catch((res = {}) => {
				message.destroy();
				res.msg && message.error(res.msg);
			});
		} catch (e) {
			console.log(e);
		}
		
	}
	handleDel = (e) => {
		const { itemData, paths, pathSelect: { cat_id } } = this.props;
		const { file_id, file, file_name } = itemData || {};
		message.destroy();
		message.loading('加载中...', 0);
		const { config: { PGallery } } = RcInstance;
		const { URL_PGALLERY_IMGS_ITEM_DEL_POST: _url } = PGallery || {};
		const { URL_PGALLERY_IMGS_ITEM_DEL_POST: url } = this.props.url || {};
		const { request } = this.props;
		let param = {
			file_id
		};
		request({
			url: url || _url,
			type: "POST",
			param
		}).then((res) => {
			message.destroy();
			this.props.onInit();
			this.props.onSet({
				paths: paths.map((item) => {
					if (item.cat_id == cat_id) {
						return {
							...item,
							count: Number(item.count) - 1
						};
					}
					return item;
				})
			});
		}).catch((res = {}) => {
			message.destroy();
			res.msg && message.error(res.msg);
		});
	}
	handleMove = async (e) => {
		let inputCatId;
		try {
			let { itemData: { file_id, file_name }, paths, pathSelect: { cat_id } } = this.props;
			inputCatId = await new Promise((resolve, reject) => {
				const memberRef = Modal.confirm({
					title: (
						<div 
							style={{ display: `flex`, alignItems: 'center', justifyContent: 'space-between' }}
							onClick={
								e => { memberRef.destroy(); reject(); }
							}
						>
							<div>选择</div>
							<Icon type="close" />
						</div>
					),
					content: (
						<div className="wp-gallery-radio">
							<RadioGroup 
								options={initSelect(paths, 'cat_id', 'cat_name')} 
								onChange={(e) => inputCatId = e.target.value} 
								defaultValue={cat_id} 
							/>
						</div>
					),
					iconType: "exclamation-circle-o",
					closable: true,
					okText: "确认",
					onOk: () => {
						if (inputCatId && inputCatId != cat_id) {
							resolve(inputCatId);
						}
					},
					cancelText: "取消",
					onCancel: () => {
						// return new Promise(($resolve, $reject) => {
						// 	$reject();
						// });
					}
				});
			});

			const { itemData } = this.props;
			message.destroy();
			message.loading('加载中...', 0);
			const { config: { PGallery } } = RcInstance;
			const { URL_PGALLERY_IMGS_ITEM_MOVE_POST: _url } = PGallery || {};
			const { URL_PGALLERY_IMGS_ITEM_MOVE_POST: url } = this.props.url || {};
			const { request } = this.props;
			let param = {
				file_id: file_id,
				cat_id: inputCatId,
			};
			request({
				url: url || _url,
				type: "POST",
				param
			}).then((res) => {
				paths.map((item, index) => {
					if (item.cat_id == cat_id) {
						return {
							...item,
							count: item.count--
						};
					} else if (item.cat_id == inputCatId) {
						return {
							...item,
							count: item.count++
						};
					}
					return item;
				});
				message.destroy();
				this.props.onInit();
				this.props.onSet({
					paths 
				});
			}).catch((res = {}) => {
				message.destroy();
				res.msg && message.error(res.msg);
			});
		} catch (e) {
			console.log(e);
		}
		
	}
	render() {
		const { itemData, selectArr, pathSelect: { cat_id } } = this.props;
		const { file_id, file_url, file_name } = itemData || {};
		const { config: { PGallery } } = RcInstance;
		const { EXT_PGALLERY_IMG_SRC_SUF } = PGallery || {};
		return (
			<div className="__item">
				<div 
					className="__img" 
					style={{ backgroundImage: `url('${file_url}${EXT_PGALLERY_IMG_SRC_SUF || ''}')` }}
					onClick={e => this.props.onSelect(itemData)}
				></div>
				{selectArr.includes(file_id) && <Icon className="__select" type="check-circle" onClick={e => this.props.onSelect(itemData)} />}
				<div className="__line">
					{/** <input type="checkbox"/>*/}
					<span>{file_name}</span>
				</div>
				<small className="__edits">
					<div
						onClick={this.handleRename}
					>重命名</div>
					{ 
						cat_id != 0 && 
							<div
								onClick={this.handleMove}
							>修改分组</div>
					}
					<div
						onClick={this.handleDel}
					>删除</div>
				</small>
			</div>
		);
	}
}

Item.propTypes = {
};

export default Item;