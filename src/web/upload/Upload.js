import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ajax } from 'wya-fetch';
import { getUid, attrAccept, initItem } from '../utils/utils';
import RcInstance from '../rc-instance/index';
import Tips from './Tips';
class Upload extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			uid: getUid()
		};

		this.reqs = {};

		this.setDefaultCycle();
	}

	componentDidMount(){
		this._isMounted = true;
		if (!this.props.showTips) return;
		Tips.popup({})
			.then((comp) => {
				this.tips = comp;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.tips && this.tips.close();
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
		const length = postFiles.length;
		// reset
		this.setDefaultCycle();
		const { onBegin } = this.props;
		onBegin && onBegin(postFiles);

		postFiles.forEach((file, index) => {
			file.uid = getUid();
			file.current =  index + 1;
			file.total = length;
			file.percent = 0;
			this.upload(file, postFiles);
		});

		// tips
		this.tips && this.tips.show(initItem(postFiles, 'uid'));
	}

	upload(file, fileList, index) {
		const { onFileBefore } = this.props;

		if (!onFileBefore) {
			// 总是异步的，以防使用react状态保存文件列表。
			setTimeout(() => this.post(file), 0);
			return;
		}

		const before = onFileBefore(file, fileList);
		if (before && before.then) {
			before.then((processedFile) => {
				const processedFileType = Object.prototype.toString.call(processedFile);
				if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
					try {
						const { uid, current, total, percent } = file;
						processedFile.uid = uid;
						processedFile.current =  current;
						processedFile.total = total;
						processedFile.percent = percent;
						this.post(processedFile);
					} catch (e) {
						this.post(processedFile);
					}
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
		const { url, type, name, headers, data, onFileStart, onFileProgress, onFileSuccess, onFileError, onComplete } = this.props;
		const { URL_UPLOAD_FILE_POST, URL_UPLOAD_IMG_POST } = RcInstance.config.Upload || {};
		const _url = type === 'images' ? URL_UPLOAD_IMG_POST : URL_UPLOAD_FILE_POST;
		const { uid } = file;
		const { request = ajax, size } = this.props;
		let localData;
		if (size && file.size > size * 1024 * 1024) {
			localData = {
				status: 0,
				msg: `上传失败，大小限制为${size}MB`
			};
		}
		this.reqs[uid] = request({
			url: url || _url,
			type: "FORM",
			param: {
				name,
				file
			},
			headers,
			localData,
			onProgress: onFileProgress
				? e => {
					onFileProgress(e, file);
					this.tips && this.tips.setValue(uid, 'percent', e.percent );
				}
				: e => this.tips && this.tips.setValue(uid, 'percent', e.percent ),
		}).then((res) => {
			delete this.reqs[uid];
			this.cycle.success++;
			this.cycle.total++;
			this.cycle.imgs = [...this.cycle.imgs, res];

			onFileSuccess && onFileSuccess(res, file, { ...this.cycle });

			// tips
			this.tips && this.tips.setValue(uid, 'success');

			// console.log(`success: ${this.cycle.success}, total: ${this.cycle.total}`);
			if (this.cycle.total === file.total) {
				onComplete && onComplete({ ...this.cycle } || {});
				this.setDefaultCycle();

				// tips
				this.tips && this.tips.setTipsStatus(true);
			}
		}).catch((res) => {
			delete this.reqs[uid];
			this.cycle.error++;
			this.cycle.total++;

			onFileError && onFileError(res, file, { ...this.cycle });

			// tips
			this.tips && this.tips.setValue(uid, 'error', res.msg);

			// console.log(`error: ${this.cycle.error}, total: ${this.cycle.total}`);
			if (this.cycle.total === file.total) {
				onComplete && onComplete({ ...this.cycle } || {});
				this.setDefaultCycle();

				// tips
				this.tips && this.tips.setTipsStatus(true);
			}
		});
		onFileStart && onFileStart(file);
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
	setDefaultCycle = () => {
		this.cycle = {
			error: 0,
			success: 0,
			total: 0,
			imgs: []
		};
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
			// onKeyDown: this.handleKeyDown,
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
	size: PropTypes.number,
	// ajax
	request: PropTypes.func,
	data: PropTypes.object,
	headers: PropTypes.object,
	onFileBefore: PropTypes.func,
	onFileStart: PropTypes.func,
	onFileProgress: PropTypes.func,
	onFileSuccess: PropTypes.func,
	onFileError: PropTypes.func,
	onBegin: PropTypes.func,
	onComplete: PropTypes.func,
	// 上传类型 images | file 影响调用接口
	type: PropTypes.string,
	// 元素
	children: PropTypes.any,
	// 提示框
	showTips: PropTypes.bool,
};
Upload.defaultProps = {
	tag: 'span',
	prefixCls: 'c-upload',
	showTips: false,
	data: {},
	headers: {},
	name: 'Filedata',
	size: 0,
	onFileStart: null,
	onFileProgress: null,
	onFileSuccess: null,
	onFileError: null,
	multiple: false,
	onFileBefore: null,
	type: 'images'
};
export default Upload;
