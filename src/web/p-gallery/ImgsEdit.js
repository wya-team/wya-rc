import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { selectItem, onSure } = this.props;
		const onClick = selectItem ? () => onSure && onSure(selectItem) : null;
		return (
			<div>
				{/** <Button>全选</Button>*/}
				<Button
					type={selectItem.file_id ? 'primary' : ''}
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