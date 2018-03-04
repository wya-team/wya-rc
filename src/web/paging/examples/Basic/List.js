import React, { Component } from 'react';
import classnames from 'classnames';
import Item from './Item';
const List = (props) => {
	const {
		actions,
		itemArr,
		itemObj,
		selectArr,
		keyword,
		rowSelection
	} = props;
	return (
		<tbody>
			{
				itemArr.map((item, index) => {
					return (
						<Item
							key={`${item}_${index}`}
							itemData={itemObj[item]}
							selectArr={selectArr}
							actions={actions}
							keyword={keyword}
							rowSelection={rowSelection}
						/>
					);
				})
			}
		</tbody>
	);
};
export default List;
