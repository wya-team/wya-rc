import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

class Search extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Input.Search
		    	placeholder="input search text"
		    	onSearch={value => console.log(value)}
		    	enterButton
			/>
		);
	}
}

Search.propTypes = {
};

export default Search;