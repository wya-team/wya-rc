
import React, { Component, createElement } from 'react';

const List = (props) => {
	const {
		itemArr,
		itemObj,
		onClick,
		selectObj,
		activeText,
		staticText,
		component,
		disableText,
		disableSelect,
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
							show: selectObj[item],
							activeText: activeText,
							staticText: staticText,
							disableText: disableText,
							disableSelect: disableSelect,
						})
					);
				})
			}
		</div>
	);
};
export default List;
