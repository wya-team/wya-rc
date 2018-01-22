import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ImgsPicker extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`ImgsPicker`} style={style}>
				ImgsPicker
			</div>
		);
	}
}
ImgsPicker.propTypes = {
	style: PropTypes.object
};
ImgsPicker.defaultProps = {
	style: {}
};
export default ImgsPicker;