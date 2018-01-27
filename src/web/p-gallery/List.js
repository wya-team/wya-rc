import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
class List extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="__list">
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
			</div>
		);
	}
}

List.propTypes = {
};

export default List;