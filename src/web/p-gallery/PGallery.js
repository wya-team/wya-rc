import React, { Component } from 'react';
import PropTypes from 'prop-types';
class PGallery extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`PGallery`} style={style}>
				PGallery
			</div>
		);
	}
}
PGallery.propTypes = {
	style: PropTypes.object
};
PGallery.defaultProps = {
	style: {}
};
export default PGallery;