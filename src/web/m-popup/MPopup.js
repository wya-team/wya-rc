import React, { Component } from 'react';
import PropTypes from 'prop-types';
class MPopup extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`MPopup`} style={style}>
				MPopup
			</div>
		);
	}
}
MPopup.propTypes = {
	style: PropTypes.object
};
MPopup.defaultProps = {
	style: {}
};
export default MPopup;