import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
class List extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			itemArr,
			itemObj,
			onSelect,
			onSetItem,
			onInit,
			onSet,
			selectArr,
			url,
			request,
			paths,
			pathSelect
		} = this.props;
		return (
			<div className="__list">
				{
					itemArr.map((item, index) => {
						return (
							<Item 
								key={item} 
								itemData={itemObj[item]} 
								onSelect={onSelect} 
								onSetItem={onSetItem} 
								onInit={onInit}
								onSet={onSet}
								selectArr={selectArr}
								url={url}
								request={request}
								paths={paths}
								pathSelect={pathSelect}
							/>
						);
					})
				}
			</div>
		);
	}
}

List.propTypes = {
};

export default List;