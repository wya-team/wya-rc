import React, { Component } from 'react';
import PropTypes from 'prop-types';
class MToasts extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`MToasts`} style={style}>
				MToasts
			</div>
		);
	}
}
MToasts.propTypes = {
	style: PropTypes.object
};
MToasts.defaultProps = {
	style: {}
};
export default MToasts;