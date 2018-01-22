import React, { Component } from 'react';
import PropTypes from 'prop-types';
class CreateAccordion extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`TPL`} style={style}>
				CreateAccordion
			</div>
		);
	}
}
CreateAccordion.propTypes = {
	style: PropTypes.object
};
CreateAccordion.defaultProps = {
	style: {}
};
export default CreateAccordion;