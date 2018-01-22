import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Echarts extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { style } = this.props;
		return (
			<div className={`Echarts`} style={style}>
				Echarts
			</div>
		);
	}
}
Echarts.propTypes = {
	style: PropTypes.object
};
Echarts.defaultProps = {
	style: {}
};
export default Echarts;