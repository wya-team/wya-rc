import React, { Component } from 'react';
import PropTypes from 'prop-types';
class DownCount extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`DownCount`} style={style}>
				DownCount
			</div>
		);
	}
}
DownCount.propTypes = {
	style: PropTypes.object
};
DownCount.defaultProps = {
	style: {}
};
export default DownCount;