import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Mtabs extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`Mtabs`} style={style}>
				Mtabs
			</div>
		);
	}
}
Mtabs.propTypes = {
	style: PropTypes.object
};
Mtabs.defaultProps = {
	style: {}
};
export default Mtabs;