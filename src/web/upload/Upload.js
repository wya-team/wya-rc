import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ajax } from 'wya-fetch';
import { getUid, attrAccept } from '../utils/utils';
import RcInstance from '../rc-instance/index';
class Upload extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = { 
			uid: getUid() 
		};

		this.reqs = {};
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.cancel();
	}

	setDefault() {
		this.setState({
			uid: getUid(),
		});
	}
	handleClick = () => {
		const el = this.fileInput;
		if (!el) {
			return;
		}
		el.click();
	}
	handleChange = e => {
		const files = e.target.files;
		this.uploadFiles(files);
		this.setDefault();
	}

	handleKeyDown = e => {
		if (e.key === 'Enter') {
			this.onClick();
		}
	}

	handleFileDrop = e => {
		if (e.type === 'dragover') {
			e.preventDefault();
			return;
		}
		const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
			file => attrAccept(file, this.props.accept)
		);
		this.uploadFiles(files);

		e.preventDefault();
	}

	uploadFiles(files) {
		const postFiles = Array.prototype.slice.call(files);
		postFiles.forEach((file, index) => {
			file.uid = getUid();
			file.current =  index + 1;
			file.total =  postFiles.length;
			this.upload(file, postFiles);
		});
	}

	upload(file, fileList, index) {
		const { onUploadBefore } = this.props;

		if (!onUploadBefore) {
			// 总是异步的，以防使用react状态保存文件列表。
			setTimeout(() => this.post(file), 0);
			return;
		}

		const before = onUploadBefore(file, fileList);
		if (before && before.then) {
			before.then((processedFile) => {
				const processedFileType = Object.prototype.toString.call(processedFile);
				if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
					this.post(processedFile);
				} else {
					this.post(file);
				}
			}).catch(e => {
				console && console.error(e);
			});
		} else if (before !== false) {
			setTimeout(() => this.post(file), 0);
		}
	}

	post(file) {
		if (!this._isMounted) {
			return;
		}
		const { url, type, filename, headers, data, onUploadStart, onProgress, onSuccess, onError } = this.props;
		const { FILE_UPLOAD_URL, IMG_UPLOAD_URL } = RcInstance.config.Upload || {};
		const _url = type === 'images' ? IMG_UPLOAD_URL : FILE_UPLOAD_URL;
		const { uid } = file;
		this.reqs[uid] = ajax({
			url: url || _url,
			type: "FORM",
			param: {
				filename,
				file,
				data,
			},
			headers,
			onProgress: onProgress ? e => { onProgress(e, file); } : null,
		}).then((res) => {
			delete this.reqs[uid];
			onSuccess && onSuccess(res, file);
		}).catch((res) => {
			delete this.reqs[uid];
			onError && onError(res, file);
		});
		onUploadStart && onUploadStart(file);
	}
	cancel(file) {
		const { reqs } = this;
		if (file) {
			let uid = file;
			if (file && file.uid) {
				uid = file.uid;
			}
			if (this.reqs[uid]) {
				this.reqs[uid].cancel();
				delete this.reqs[uid];
			}
		} else {
			Object.keys(reqs).forEach((uid) => {
				if (this.reqs[uid]) {
					this.reqs[uid].cancel();
				}
				delete reqs[uid];
			});
		}
	}

	setFileInput = (node) => {
		this.fileInput = node;
	}

	render() {
		const {
			tag: Tag,
			prefixCls,
			className,
			disabled,
			style,
			multiple,
			accept,
			children,
		} = this.props;
		const cls = classNames({
			[prefixCls]: true,
			[`${prefixCls}-disabled`]: disabled,
			[className]: className,
		});
		const events = disabled ? {} : {
			onClick: this.handleClick,
			onKeyDown: this.handleKeyDown,
			onDrop: this.handleFileDrop,
			onDragOver: this.handleFileDrop
		};
		return (
			<Tag
				{...events}
				className={cls}
				style={style}
				role="button"
				tabIndex="0"
			>
				<input
					type="file"
					ref={this.setFileInput}
					key={this.state.uid}
					style={{ display: 'none' }}
					accept={accept}
					multiple={multiple}
					onChange={this.handleChange}
				/>
				{children}
			</Tag>
		);
	}
}
Upload.propTypes = {
	// 组件
	tag: PropTypes.string,
	style: PropTypes.object,
	prefixCls: PropTypes.string,
	className: PropTypes.string,
	// input
	multiple: PropTypes.bool,
	disabled: PropTypes.bool,
	accept: PropTypes.string,
	// ajax
	data: PropTypes.object,
	headers: PropTypes.object,
	onUploadBefore: PropTypes.func,
	onUploadStart: PropTypes.func,
	onProgress: PropTypes.func,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	// 上传类型 images | file 影响调用接口
	type: PropTypes.string,
	// 元素
	children: PropTypes.any

};
Upload.defaultProps = {
	tag: 'span',
	prefixCls: 'c-upload',
	data: {},
	headers: {},
	filename: 'Filedata',
	onUploadStart: null,
	onProgress: null,
	onSuccess: null,
	onError: null,
	multiple: false,
	onUploadBefore: null,
	type: 'images'
};
export default Upload;
