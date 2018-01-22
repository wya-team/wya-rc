import React, { Component } from 'react';
import PropTypes from 'prop-types';
class MTouch extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`MTouch`} style={style}>
				MTouch
			</div>
		);
	}
}
MTouch.propTypes = {
	style: PropTypes.object
};
MTouch.defaultProps = {
	style: {}
};
export default MTouch;