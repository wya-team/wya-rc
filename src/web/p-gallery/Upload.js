import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import Upload from '../upload/index';
import RcInstance from '../rc-instance/index';

class UpLoad extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			disabled: false
		};
		this.success = 0;
		this._success = 0;
		this._request = 0;
	}
	handleBegin = (files) => {
		message.destroy();
		message.loading('上传中', 0);
		this.setState({
			disabled: true
		});
	}
	handleComplete = (info = {}) => {
		message.destroy();
		this.setState({
			disabled: false
		});
	}
	handleSuccess = (res, file, info) => {
		this.success++;
		const { pathSelect } = this.props;
		const { cat_id } = pathSelect;
		let { imgs } = info;
		imgs = imgs.map((item, index) => item['data']['url']);
		
		const { config: { PGallery } } = RcInstance;
		const { URL_PGALLERY_IMGS_ITEM_ADD_POST: _url } = PGallery || {};
		const { URL_PGALLERY_IMGS_ITEM_ADD_POST: url } = this.props.url || {};
		const { request } = this.props;
		let param = {
			cat_id,
			file_url: res.data.url,
			file_name: file.name
		};
		request({
			url: url || _url,
			type: "POST",
			param
		}).then((res = {}) => {
			this._success++;
			this._request++;
			this.handleCount(res, file, info);
		}).catch((res = {}) => {
			this._request++;
			this.handleCount(res, file, info);
			res.msg && message.error(res.msg);
		});
	} 
	handleCount = (res, file, info) => {
		const { pathSelect, paths } = this.props;
		const { cat_id } = pathSelect;
		if (this.success === this._request){
			this.props.onInit && this.props.onInit();
			this.props.onSet({
				paths: paths.map((item) => {
					if (item.cat_id == cat_id) {
						return {
							...item,
							count: Number(item.count) + this._success
						};
					}
					return item;
				})
			});
			message.destroy();

			// clear
			this.success = 0;
			this._success = 0;
			this._request = 0;
		}
	}
	render() {
		const { config: { PGallery } } = RcInstance;
		const { URL_PGALLERY_IMGS_UPLOAD_POST: _url } = PGallery || {};
		const { URL_PGALLERY_IMGS_UPLOAD_POST: url } = this.props.url || {};
		const { request, pathSelect: { cat_id } } = this.props;
		const { disabled } = this.state;
		if (cat_id == 0) return null;
		return (
			<Upload
				tag="span"
				type="images"
				accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
				multiple
				disabled={disabled}
				url={url || _url}
				request={request}
				// onFileProgress={this.handleProgress}
				// onFileBefore
				// onFileStart
				onFileSuccess={this.handleSuccess}
				onFileError={this.handleError}
				onBegin={this.handleBegin}
				onComplete={this.handleComplete}
				// showTips
			>
				<Button type={disabled ? "disabled" : "primary"} disabled={disabled}>
					上传
				</Button>
			</Upload>
		);
	}
}
export default UpLoad;