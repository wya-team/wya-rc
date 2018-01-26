import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
class UpLoad extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Button type="primary" style={{ float: 'right' }}>
				上传
			</Button>
		);
	}
}

UpLoad.propTypes = {
};

export default UpLoad;