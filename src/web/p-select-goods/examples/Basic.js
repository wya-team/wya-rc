import React, { Component } from 'react';
import { PSelectGoods } from '../../../main.js';
import { RcInstance } from '../../../main.js';
// 只需要注册一次
RcInstance.init({
	PSelectGoods: {
		URL_PSELECTGOODS_LIST_GET: 'https://managexcx.ruishan666.com/product/product/list.json'
	}
});

class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		PSelectGoods.popup({
			max: 1,
			disableSelect: ['217', '218', '220'],
			disableText: '不让点',
		}).then((info) => {
			console.log(info, 'info');
		}).catch((e) => {
			console.log(e);
		});
	}
	render() {
		return null;
	}
}
export default Basic;
