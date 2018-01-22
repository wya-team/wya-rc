import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
class Copy extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = async (e) => {
		try {
			let { onCopyBefore, onCopyAfter, value, isReplace } = this.props;
			if (onCopyBefore) {
				let _value = await onCopyBefore(e);
				isReplace && (value = _value);
			}

			// create
			let input = document.createElement('input');
			input.value = value;
			document.body.appendChild(input);

			// copy
			input.select();
			document.execCommand("Copy");

			// remove
			document.body.removeChild(input);

			// end
			onCopyAfter && onCopyAfter(value);
		} catch (error) {
			console.error(`copy fail: ${error}`);
		}
		
	}
	render() {
		return (
			cloneElement(
				Children.only(this.props.children), {
					onClick: this.handleClick,
					ref: 'copy'
				}
			)
		);
	}
}
Copy.propTypes = {
	onCopyBefore: PropTypes.func,
	onCopyAfter: PropTypes.func,
	isReplace: PropTypes.bool,
	value: PropTypes.any
};
Copy.defaultProps = {
	isReplace: false 
};
export default Copy;