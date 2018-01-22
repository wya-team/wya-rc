import React, { Component } from 'react';
import PropTypes from 'prop-types';
class MSelector extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`MSelector`} style={style}>
				MSelector
			</div>
		);
	}
}
MSelector.propTypes = {
	style: PropTypes.object
};
MSelector.defaultProps = {
	style: {}
};
export default MSelector;