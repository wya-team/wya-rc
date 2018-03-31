/**
 * 借助全局变量RcInstance.APIS增加对路由切换的管理
 */
import React, { Component, createElement, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import { hackForiOS11 } from '../utils/utils';
import RcInstance from '../rc-instance/index';
import './MModals.scss';
let Dom = document.body;
let ModalsStatics = {};
let count = 0;
let modalObj = {};
const vaildActions = (actions) => {
	if (!(actions instanceof Array)) {
		console.error("actions is not a Array");
		return false;
	}
	for (let i = 0; i < actions.length; i++) {
		if (typeof actions[i] !== "object") {
			console.error("actions's child is not a Object");
			return false;
		}
	}
	return true;
};
ModalsStatics = {
	/**
	 * 根据antd-mobile的设计改写
	 * 多增加已个options选项
	 * @param  {Object} options { showClose, className, style, type, onMaskCb }
	 */
	alert(title, message, actions = [], options = {}){
		const { showClose = false } = options;
		if (process.env.NODE_ENV === 'development' && !vaildActions(actions)) return;
		const div = document.createElement('div');
		const key = `modals${count}`;
		Dom.appendChild(div);
		options = {
			...options,
			count,
			title,
			message,
			actions,
			onCloseSoon: () => {
				ReactDOM.unmountComponentAtNode(div);
				Dom.removeChild(div);
				delete RcInstance.APIS[key];
				delete modalObj[key];
			},
			onClose: () => {
				options.onCloseSoon();
			}
		};
		modalObj = {
			...modalObj, 
			[key]: div
		};
		RcInstance.APIS[key] = div;
		count++;
		return ReactDOM.render(<Modals {...options} />, div);
	},
	operation(actions = []){
		if (process.env.NODE_ENV === 'development' && !vaildActions(actions)) return;
		ModalsStatics.alert("", "", actions, { type: "operation" });
	},
	/**
	 * 根据antd-mobile的规则定义
	 * @param  {String} type default, secure-text, login-password
	 */
	prompt(title, message, actions = [], inputType = [], defaultValue = [], placeholders = [], options = { inputStyle: [], maxLength: [] }){
		if (process.env.NODE_ENV === 'development' && !vaildActions(actions)) return;
		switch (inputType){
			case "secure-text":
				inputType = ["password"];
				break;
			case "login-password":
				inputType = ["text", "password"];
				break;
			case "default":
				inputType = ["text"];
				break;
			default:
				inputType = typeof inputType !== 'string' && inputType.length > 0 ? inputType : ["text"];
				break;
		}
		ModalsStatics.alert(title, message, actions, {
			...options,
			inputType: [...inputType],
			defaultValue: defaultValue instanceof Array ? [...defaultValue] : [defaultValue],
			placeholders: placeholders instanceof Array ? [...placeholders] : [placeholders],
		});
	},
	select(title, message, actions = [], options = {}){
		let { selectData = [], selectValue = 'value', selectLabel = 'label', selectCur = '', selectParams = {} } = options;
		let __arr = [], __obj = {};
		for (let i = 0; i < selectData.length; i++ ) {
			__obj = selectData[i] || {};
			__arr = [...__arr, { value: __obj[selectValue], label: __obj[selectLabel], params: __obj[selectParams] }];
		}
		ModalsStatics.alert(title, message, actions, {
			...options,
			selectData: __arr,
			selectValue,
			selectLabel,
			type: 'select'
		});
	}
};
class Modals extends Component {
	static alert = ModalsStatics.alert;
	static operation = ModalsStatics.operation;
	static prompt = ModalsStatics.prompt;
	static select = ModalsStatics.select;
	/**
	 * 手动清理全部弹窗
	 */
	static closeAll = () => {
		for (let i in modalObj) {
			if (modalObj[i] && modalObj.hasOwnProperty(i)) {
				ReactDOM.unmountComponentAtNode(modalObj[i]);
				Dom.removeChild(modalObj[i]);
				delete modalObj[i];
				delete RcInstance.APIS[i];
			}
		}
		// 初始化
		count = 0;
		modalObj = {};
	};
	constructor(props) {
		super(props);
		this.handleClose = ::this.handleClose;
		this.handlePress = ::this.handlePress;

		this.state = {
			selectCur: '',
			selectParams: {}
		};
	}
	componentWillMount() {
		const { selectCur = '', selectParams } = this.props;
		this.setState({
			selectCur,
			selectParams
		});

		// hack
		// hackForiOS11.set();
	}
	componentDidMount() {
	}
	componentWillUnmount(){
		this.timer && clearTimeout(this.timer);

		// hack
		// hackForiOS11.remove();
	}
	/**
	 * 给外包暴露方法，只删除自己
	 */
	close(isMaskClick) {
		isMaskClick && this && this.props.onMaskCb && this.props.onMaskCb();
		this && this.props.onClose && this.props.onClose();
	}
	handleClose(event, isMaskClick){
		event && event.preventDefault();
		event && event.stopPropagation();
		this.refs.fixed.classList.add("__leave");
		this.refs.bg.classList.add("__bg-leave");
		this.timer = setTimeout(() => {
			// 主线程
			this.close(isMaskClick);
		}, 201);
	}
	handlePress(event, atIndex) {
		const { actions, inputType = [], type } = this.props;
		let values = inputType.map((item, index) => {
			return this.refs[`input${index}`].value;
		});
		if ( type === 'select' ) {
			values = [this.state.selectCur, this.state.selectParams];
		}
		actions[atIndex].onPress && actions[atIndex].onPress.apply(null, values);
		// 关闭
		this.handleClose();
	}
	render() {
		const {
			type,
			title,
			message,
			showClose,
			actions,
			className = "",
			style = {},
			inputType = [],
			inputStyle = [],
			defaultValue = [],
			placeholders = [],
			selectData = [],
			maxLength = [],
		} = this.props;
		const { selectCur, selectParams } = this.state;
		return (
			<div className={`rcm-modal ${className}`} style={{ ...style, /* ...hackForiOS11.absolute */}}>
				<div className="__bg __bg_enter" onClick={e => this.handleClose(e, 1)} onTouchMove={e => e.preventDefault()} ref="bg"/>
				<div className="__fixed __enter" ref="fixed">
					<div className={`__close ${title && `__bb`}`}>
						{typeof title === "object" ? title : (title && <div className="__title">{title}</div>)}
						{showClose && <span onClick={this.handleClose}>&#10005;</span>}
					</div>
					{typeof message === "object" ? message : (message && <div className="__message">{message}</div>)}
					<div className={`__flex __jc-c __jd-c ${inputType.length > 0 && `__input`} ${!message && `__mt`}`}>
						{
							inputType.map((item, index) => {
								return (
									<input
										key={index}
										defaultValue={defaultValue[index] || ""}
										style={inputStyle[index] || {}}
										type={inputType[index]}
										placeholder={placeholders[index] || ""}
										ref={`input${index}`}
										maxLength={maxLength[index]}
									/>
								);
							})
						}
					</div>
					{type == "select" && selectData.length > 0 &&
						<div className="__select">
							{
								selectData.map((item = {}, index) => {
									const is_select = item.value == selectCur;
									return (
										<div 
											key={item.value}
											onClick={e => this.setState({ selectCur: item.value, selectParams: item.params })}
											className={`__flex __select_pd __jc-sb __bb ${is_select && `__select_active`}`} 
										>
											<div>{item.label}</div>
											{ is_select && <i className="iconfont icon-completed" style={{ fontSize: '36px' }}/>}
										</div>
									);
								})
							}
						</div>
					}
					{ // 1个按钮
						(actions.length > 0 && actions.length == 1 && type !== "operation") &&
							<div className="__flex __pd __jc-c">
								<div className="__1of2 __flex __jc-c">
									<div 
										className="__btn __orange" 
										onClick={(e) => { this.handlePress(e, 0); }}
										style={{ ...actions[0].style || {} }}
									>{actions[0].text || "确定"}</div>
								</div>
							</div>
					}
					{ // 2个按钮
						(actions.length > 0 && actions.length == 2 && type !== "operation") &&
							<div className="__flex __pd __jc-c">
								<div className="__col __flex __jc-c">
									<div 
										className="__btn" 
										onClick={(e) => { this.handlePress(e, 0); }}
										style={{ ...actions[0].style || {} }}
									>{actions[0].text || "取消"}</div>
								</div>
								<div className="__col __flex __jc-c">
									<div 
										className="__btn __orange" 
										onClick={(e) => { this.handlePress(e, 1); }}
										style={{ ...actions[1].style || {} }}
									>{actions[1].text || "确定"}</div>
								</div>
							</div>
					}
					{ // 3个按钮+
						((actions.length > 0 && actions.length > 2) || type === "operation") &&
							<div className="__flex __jd-c">
								{
									actions.map((iten, index) => {
										return (
											<div 
												className={`__btn1 ${ index != actions.length - 1 && `__bb`}`}
												key={index}
												style={{ ...actions[index].style || {} }}
												onClick={(e) => { this.handlePress(e, index); }}
											>{actions[index].text || "-"}</div>
										);
									})
								}
							</div>
					}
				</div>
			</div>
		);
		
	}
}
Modals.propTypes = {
	// type,
	// title,
	// message,
	// showClose,
	// actions,
	// className = "",
	// style = {},
	// inputType = [],
	// placeholders,
	// defaultValue
};
Modals.defaultProps = {
};
export default Modals;

