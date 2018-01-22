import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ImgsCrop extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`ImgsCrop`} style={style}>
				ImgsCrop
			</div>
		);
	}
}
ImgsCrop.propTypes = {
	style: PropTypes.object
};
ImgsCrop.defaultProps = {
	style: {}
};
export default ImgsCrop;