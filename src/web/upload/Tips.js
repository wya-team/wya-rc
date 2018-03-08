import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import RcInstance from '../rc-instance/index';
import { getUid } from '../utils/utils';
import './Tips.scss';
let Dom = document.body;
let Statics = {};
let cName = 'UploadTips';
Statics = {
	init(opts = {}){
		cName = `${cName}_${getUid()}`;
		return new Promise((resolve, reject) => {
			const div = document.createElement('div');
			Dom.appendChild(div);
			opts = {
				...opts,
				onCloseSoon: () => {
					ReactDOM.unmountComponentAtNode(div);
					Dom.removeChild(div);
					delete RcInstance.APIS[cName];
				},
				onClose: (res) => {
					opts.onCloseSoon();
				}
			};
			RcInstance.APIS[cName] = div;
			ReactDOM.render(<Tips {...opts} ref={instance => this.comp = instance}/>, div, () => resolve(this.comp));
		});
		
	},
	/**
	 * 弹出项目，验证数据结构是否合法
	 * opts {
	 * }
	 */
	popup(opts = {}){
		if (typeof opts !== 'object') {
			opts = {};
		}
		return Statics.init(opts);
	}
};
class Tips extends Component {
	static popup = Statics.popup;
	constructor(props, context) {
		super(props, context);
		this.state = {
			show: false,
			itemArr: [],
			itemObj: [],
			success: 0,
			error: 0,
			showTips: false
		};
	}
	componentDidMount() {
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	setEl = (node) => {
		this.el = this.el || node;
		this.el.classList.add('__active');
	}
	// 关闭， 移除dom
	close = () => {
		this.el.classList.remove('__active');
		this.timer = setTimeout(() => {
			// 主线程
			this && this.props.onClose && this.props.onClose();
		}, 201);
	}
	// 隐藏
	hide = () => {
		this.el.classList.remove('__active');
		this.timer = setTimeout(() => {
			// 主线程
			this.setState({
				show: false
			});
		}, 201);
	}
	// 显示
	show = ({ itemArr, itemObj }) => {
		const { itemArr: arr, itemObj: obj } = this.state;
		// 主线程
		this.setState({
			show: true,
			itemArr: [...arr, ...itemArr],
			itemObj: { ...obj, ...itemObj }
		}, () => {
			this.el.classList.add('__active');
		});
	}
	setTipsStatus = (show) => {
		this.setState({
			showTips: typeof show === 'boolean' ? show : !this.state.showTips
		});
	}
	setValue = (uid, key, value) => {
		let { itemObj, error, success } = this.state;
		
		switch (key) {
			case 'percent':
				// File对象实例
				itemObj[uid].percent = value;
				break;
			case 'success':
				success++;
				break;
			case 'error':
				error++;
				itemObj[uid].msg = value;
			default :
				break;
				
		}
		this.setState({
			itemObj,
			success,
			error
		});
	}
	render() {
		const { show, showTips, itemArr, itemObj, success, error } = this.state;
		return (
			<div className="rc-upload-tips" ref={this.setEl} hidden={!show}>
				<div className="__header">
					<span>当前选择上传进度</span>
					<span onClick={this.hide}>&#10005;</span>
				</div>
				<div className="__result" onClick={this.setTipsStatus} hidden={!showTips}>
					<span>上传结束，成功: {success}，失败: {error}，总数: {itemArr.length}</span>
					<span className="__icon">&#10005;</span>
				</div>
				<div className="__content">
					<div>文件名</div>
					<div>文件大小</div>
					<div>状态</div>
				</div>
				<ul>
					{
						itemArr.map((item, index) => {
							const { name, size, percent, msg } = itemObj[item] || {};
							return (
								<li key={item}>
									<div className="__bar" style={{ width: `${msg ? 100 : percent}%` }}></div>
									<div className="__content">
										<div>{name}</div>
										<div>{(size / 1024 / 1024).toFixed(2)}MB</div>
										<div className={msg ? `__error` : `__success`}>
											{msg ? msg : (Number(percent) === 100 ? <span>&#10004;</span> : `上传中`)}
										</div>
									</div>
								</li>
							);
						})
					}
				</ul>
			</div>
		);
	}
}

Tips.propTypes = {
	// component
};

Tips.defaultProps = {
};


export default Tips;
