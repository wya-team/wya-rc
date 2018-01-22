import React, { Component } from 'react';
import PropTypes from 'prop-types';
class PTabs extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`PTabs`} style={style}>
				PTabs
			</div>
		);
	}
}
PTabs.propTypes = {
	style: PropTypes.object
};
PTabs.defaultProps = {
	style: {}
};
export default PTabs;