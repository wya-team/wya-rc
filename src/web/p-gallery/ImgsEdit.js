import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleSure = () => {
		let arr = [];
		const { selectObj, selectArr, max } = this.props;
		selectArr.map((item, index) => {
			if (max == 0 || index < max){
				arr = [...arr, selectObj[item]];
			}
		});
		this.props.onSure && this.props.onSure(arr);
	}
	render() {
		const { selectArr, selectObj } = this.props;
		const onClick = selectArr.length > 0 ? this.handleSure : null;
		return (
			<div>
				{/** <Button>全选</Button>*/}
				<Button
					type={selectArr.length > 0 ? 'primary' : ''}
					onClick={onClick}
				>使用选中图片</Button>
				{/** <Button style={{ margin: '0 8px' }}>删除分组</Button>*/}
			</div>
		);
	}
}

Item.propTypes = {
};

export default Item;