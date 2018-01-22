import React, { Component } from 'react';
import PropTypes from 'prop-types';
class MModals extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`MModals`} style={style}>
				MModals
			</div>
		);
	}
}
MModals.propTypes = {
	style: PropTypes.object
};
MModals.defaultProps = {
	style: {}
};
export default MModals;