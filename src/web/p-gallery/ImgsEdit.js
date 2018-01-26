import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<Button
				>全选</Button>
				<Button
					style={{ margin: 8 }}
				>修改分组</Button>
				<Button>删除分组</Button>
			</div>
		);
	}
}

Item.propTypes = {
};

export default Item;