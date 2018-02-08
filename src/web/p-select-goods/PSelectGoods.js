/**
 * 功能大致实现，后续再考虑重构
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ajax } from 'wya-fetch';
import RcInstance from '../rc-instance/index';
import { initPage, initItem } from '../utils/utils';
import Goods from './Goods';
import Btn from './Btn';
import PPopup from '../p-popup';
import './PSelectGoods.scss';
let Dom = document.body;
let Statics = {};
let cName = 'PSelectGoods';
Statics = {
	init(opts = {}){
		return new Promise((resolve, reject) => {
			const div = document.createElement('div');
			// div.classList.add("wp-gallery");
			Dom.appendChild(div);
			opts = {
				...opts,
				url: null,
				request: opts.request || ajax,
				select: opts.select || [],
				activeText: opts.activeText || '已选',
				staticText: opts.staticText || '选取',
				multiple: opts.multiple || true,
				id: opts.id || "product_id",
				onCloseSoon: () => {
					ReactDOM.unmountComponentAtNode(div);
					Dom.removeChild(div);
					delete RcInstance.APIS[cName];
				},
				onSure: (res) => {
					opts.onCloseSoon();
					resolve(res);
				},
				onClose: (res) => {
					opts.onCloseSoon();
					reject(res);
				},
			};
			return ReactDOM.render(<PSelectGoods {...opts} />, div);
		});
	},
	/**
	 * 弹出项目，验证数据结构是否合法
	 * opts {
	 * 	url,
	 * 	request,
	 * 	select,
	 * 	id,
	 * 	activeText,
	 * 	statusText,
	 * 	limit
	 * }
	 */
	popup(opts = {}){
		if (typeof opts !== 'object') {
			opts = {};
		}
		return Statics.init(opts);
	}
};
class PSelectGoods extends Component {
	static popup = Statics.popup;
	static close = () => {
		if (!!RcInstance.APIS[cName]) {
			ReactDOM.unmountComponentAtNode(RcInstance.APIS[cName]);
			delete RcInstance.APIS[cName];
		}
	};
	constructor(props, context) {
		super(props, context);
		const { itemArr, itemObj } = initItem(props.select, props.id);
		this.state = {
			selectArr: itemArr,
			selectObj: itemObj,
		};
	}
	// 关闭， 移除dom
	close() {
		this && this.props.onClose && this.props.onClose();
	}
	handleClose = (e) => {
		this && this.props.onClose && this.props.onClose();
	}
	handleSure = () => {
		let arr = [];
		const { multiple } = this.props;
		const { selectObj, selectArr } = this.state;
		if (multiple){
			selectArr.map((item, index) => {
				arr.push(selectObj[item]);
			});
		} else {
			selectArr[0] && arr.push(selectObj[selectArr[0]]);
		}
		this.props.onSure && this.props.onSure(arr); 
	}
	handleSelect = (flag, id, data) => {
		const { multiple } = this.props;
		if (!multiple){
			this.setState({
				selectObj: {
					[id]: {
						...data
					}
				},
				selectArr: [id]
			});
			return;
		}
		let newArr = [ ...this.state.selectArr ];
		let newObj = { ...this.state.selectObj };
		if (flag){
			newObj = {
				...newObj,
				[id]: {
					...data
				}
			};
			newArr.unshift(id);
		} else {
			delete newObj[id];
			newArr = this.state.selectArr.filter((item, index) => {
				return item != id;
			});
		}
		this.setState({
			selectObj: newObj,
			selectArr: newArr
		});
	}
	render() {
		const { request, url, activeText, staticText, id, component, multiple } = this.props;
		const { selectArr, selectObj } = this.state;
		return (
			<PPopup title="商品选择" onClose={this.handleClose} onSure={this.handleSure} className="wp-select-goods">
				<Goods 
					request={request}
					url={url}
					selectArr={multiple ? selectArr : selectArr[0] ? [selectArr[0]] : []}
					selectObj={multiple ? selectObj : selectArr[0] ? { [selectArr[0]]: { ...selectObj[selectArr[0]] } } : {}}
					onClick={this.handleSelect}
					activeText={activeText}
					staticText={staticText}
					component={component}
					id={id}
				/>
				<Btn 
					activeText={activeText}
					staticText={staticText}
				/>
			</PPopup>
		);
	}
}

PSelectGoods.propTypes = {
	url: PropTypes.object,
	request: PropTypes.func,
	select: PropTypes.array,
	activeText: PropTypes.string,
	staticText: PropTypes.string,
	id: PropTypes.any,
	// component
};

export default PSelectGoods;