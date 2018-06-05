import React, { Component, createElement, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RcInstance from '../rc-instance/index';
import { Toast } from 'antd-mobile';
import './MToasts.scss';
let Dom = document.body;
let ToastsStatics = {};
const leaveTime = 201;
const cName = "MToasts";
ToastsStatics = {
	/**
	 * 根据antd-mobile的设计改写
	 * 多增加已个options选项
	 * opts：{className, style}
	 */
	info(message, duration = 3, onCallback, showClose = true, opts = {}) {
		return new Promise((resolve, reject) => {
			const div = document.createElement('div');
			RcInstance.APIS[cName] && Toasts.hide();
			Dom.appendChild(div);
			opts = {
				...opts,
				message,
				duration: duration == 0 ? 1 * 60 * 60 * 24	 : duration,
				onCallback,
				showClose,
				onCloseSoon: () => {
					ReactDOM.unmountComponentAtNode(div);
					console.log(div);
					Dom.removeChild(div);
					delete RcInstance.APIS[cName];
				},
				onClose: () => {
					opts.onCloseSoon();
				},
			};
			RcInstance.APIS[cName] = div;
			ReactDOM.render(<Toasts {...opts} ref={instance => this.comp = instance}/>, div, () => resolve(this.comp));
		});

	},
	fail(message, duration, onCallback, showClose, opts = { type: "fail" }) {
		Toast.fail(message, duration, onCallback);
		// console.error('还未开发');
		// return ToastsStatics.info(message, duration, onCallback, showClose, opts);
	},
	success(message, duration, onCallback, showClose, opts = { type: "success" }) {
		Toast.success(message, duration, onCallback);
		// console.error('还未开发');
		// return ToastsStatics.info(message, duration, onCallback, showClose, opts);
	},
	loading(message, duration, onCallback, showClose, opts = { type: "loading" }) {
		Toast.loading(message, duration, onCallback);
		// console.error('还未开发');
		// return ToastsStatics.info(message, duration, onCallback, showClose, opts);
	},
	offline(message, duration, onCallback, showClose, opts = { type: "offline" }) {
		Toast.offline(message, duration, onCallback);
		// console.error('还未开发');
		// return ToastsStatics.info(message, duration, onCallback, showClose, opts);
	},
};
class Toasts extends Component {
	static info = ToastsStatics.info;
	static fail = ToastsStatics.fail;
	static success = ToastsStatics.success;
	static loading = ToastsStatics.loading;
	static offline = ToastsStatics.offline;
	/**
	 * 手动清理全部弹窗
	 */
	static hide = () => {
		if (RcInstance.APIS[cName]) {
			ReactDOM.unmountComponentAtNode(RcInstance.APIS[cName]);
			delete RcInstance.APIS[cName];
		}
		Toast.hide();
	};
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.duration = setTimeout(() => {
			// 主线程
			this.handleClose();
		}, Number(this.props.duration) * 1000 - leaveTime);
	}
	componentDidMount() {
	}
	componentWillUnmount(){
		this.timer && clearTimeout(this.timer);
		this.duration && clearTimeout(this.duration);
	}
	/**
	 * 给外包暴露方法，只删除自己
	 */
	close() {
		// 主动触发，如果有回调就执行回调
		this && this.props.onCallback && this.props.onCallback();
		// 移除弹窗
		this && this.props.onClose && this.props.onClose();
	}
	handleClose = (e) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		this.refs.fixed.classList.add("__leave");
		this.duration && clearTimeout(this.duration);
		this.timer = setTimeout(() => {
			this.close();
		}, leaveTime);
	}
	handlePress = (event, atIndex) =>  {
		// 关闭
		this.handleClose();
	}
	render() {
		const {
			className = "",
			style = {},
			message,
			showClose
		} = this.props;
		return (
			<div className={`rcm-toast ${className}`} style={{ ...style }}>
				{showClose && <div className="__bg" ref={`bg`} onClick={this.handleClose}/>}
				<div className="__fixed" ref={`fixed`}>
					{message}
				</div>
			</div>
		);

	}
}
Toasts.propTypes = {
	// className,
	// style,
	// message,
	// showClose
	// type
};
Toasts.defaultProps = {
};
export default Toasts;

