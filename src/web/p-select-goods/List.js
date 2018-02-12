
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
		disabledId,
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
							disabledId: disabledId,
						})
					);
				})
			}
		</div>
	);
};
export default List;
