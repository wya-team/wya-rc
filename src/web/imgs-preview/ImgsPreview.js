import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ImgsPreview extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`ImgsPreview`} style={style}>
				ImgsPreview
			</div>
		);
	}
}
ImgsPreview.propTypes = {
	style: PropTypes.object
};
ImgsPreview.defaultProps = {
	style: {}
};
export default ImgsPreview;