import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Tpl extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`tpl`} style={style}>
				tpl
			</div>
		);
	}
}
Tpl.propTypes = {
	style: PropTypes.object
};
Tpl.defaultProps = {
	style: {}
};
export default Tpl;