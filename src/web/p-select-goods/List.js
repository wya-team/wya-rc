
import React, { Component, createElement } from 'react';

const List = (props) => {
	const {
		itemArr,
		itemObj,
		onClick,
		selectArr,
		activeText,
		staticText,
		component,
		disableText,
		disableArr,
	} = props;
	return (
		<div className="__content">
			{
				itemArr.map((item, index) => {
					return (
						createElement(component, {
							key: `${item}_${index}`,
							itemData: itemObj[item],
							onClick: onClick,
							activeText: activeText,
							staticText: staticText,
							disableText: disableText,
							disableArr: disableArr,
							selectArr: selectArr
						})
					);
				})
			}
		</div>
	);
};
export default List;
