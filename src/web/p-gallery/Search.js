import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

class Search extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleSearch = (value) => {
		this.props.onSearch(value);
	}
	render() {
		return (
			<Input.Search
				style={{ float: 'right', width: 300 }}
		    	placeholder="搜索图片"
		    	onSearch={this.handleSearch}
		    	enterButton
			/>
		);
	}
}

Search.propTypes = {
};

export default Search;