import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

class PathsEdit extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRename = () => {

	}
	handleDel = () => {

	}
	render() {
		return (
			<Fragment>
				<Button
					onClick={this.handleRename} 
				>重命名</Button>
				<Button
					onClick={this.handleDel} 
					style={{ margin: `0 10px` }}
				>删除分组</Button>
			</Fragment>
		);
	}
}

PathsEdit.propTypes = {
};

export default PathsEdit;