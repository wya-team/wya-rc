import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="__item">
				<img src="http://www.w3school.com.cn/ui2017/compatible_opera.png" alt=""/>
				<div>
					<input type="checkbox"/>
					<span className="__line">ssssss</span>
				</div>
				<div className="__edits">
					<div>重命名</div>
					<div>修改分组</div>
					<div>删除</div>
				</div>
			</div>
		);
	}
}

Item.propTypes = {
};

export default Item;