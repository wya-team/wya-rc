import React, { Component } from 'react';
import PropTypes from 'prop-types';
class SetTitle extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`SetTitle`} style={style}>
				SetTitle
			</div>
		);
	}
}
SetTitle.propTypes = {
	style: PropTypes.object
};
SetTitle.defaultProps = {
	style: {}
};
export default SetTitle;