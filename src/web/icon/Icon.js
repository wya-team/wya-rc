import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/index.scss';

class Icon extends Component {
	render() {
		const { className, style, type, ...rest } = this.props;

		return (
			<i 
				className={`wyaicon wyaicon-${type} ${className}`} 
				style={style}
				{...rest} 
			/>
		);
	}
}

Icon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	type: PropTypes.string
};

Icon.defaultProps = {
	style: {},
	className: "",
	type: ""
};

export default Icon;
