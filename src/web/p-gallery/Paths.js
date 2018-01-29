import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Modal, Input, Icon, message } from 'antd';

import RcInstance from '../rc-instance/index';
class Paths extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleAddPath = async () => {
		let inputText;
		try {
			let { pathSelect, paths } = this.props;
			const { cat_name, cat_id } = pathSelect;
			inputText = await new Promise((resolve, reject) => {
				const memberRef = Modal.confirm({
					title: (
						<div 
							style={{ display: `flex`, alignItems: 'center', justifyContent: 'space-between' }}
							onClick={
								e => { memberRef.destroy(); reject(); }
							}
						>
							<div>添加分类</div>
							<Icon type="close" />
						</div>
					),
					content: (
						<Input 
							type="text" 
							placeholder="新建分类" 
							defaultValue={`新建分类`} 
							id="vc-input"
						/>
					),
					iconType: "",
					closable: true,
					okText: "提交",
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
			const { URL_PGALLERY_PATHS_ITEM_ADD_POST: _url } = PGallery || {};
			const { URL_PGALLERY_PATHS_ITEM_ADD_POST: url } = this.props.url || {};
			const { request } = this.props;
			let param = {
				cat_name: inputText 
			};
			request({
				url: url || _url,
				type: "POST",
				param
			}).then((res) => {
				message.destroy();
				paths = [...paths, res.data];
				this.props.onSet({
					pathSelect,
					paths
				});
			}).catch((res = {}) => {
				message.destroy();
				message.error(res.msg);
			});
		} catch (e) {
			console.log(e);
		}
		
	}
	handleSelectPath = (pathSelect) => {
		this.props.onSet({
			pathSelect,
		});
	}
	render() {
		const { paths, pathSelect } = this.props;
		return (
			<div className="__paths">
				<div
					onClick={this.handleAddPath}
				>+ 添加分组</div>
				{
					paths.map((item, index) => {
						const { cat_id, cat_name, count = 0 } = item;
						return (
							<div
								key={cat_id}
								className={classNames('__line', { '__select': pathSelect.cat_id == cat_id })}
								onClick={e => this.handleSelectPath(item)}
							>{cat_name}（{count}）</div>
						);
					})
				}
			</div>
		);
	}
}

Paths.propTypes = {
};

export default Paths;