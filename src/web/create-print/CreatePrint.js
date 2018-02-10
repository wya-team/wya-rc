import React, { Component, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
class CreatePrint extends Component {
	constructor(props, context) {
		super(props, context);
	}
	setPrint = () => {
		const { refName } = this.props;
		// filter
		const $ = [...document.body.children].filter(
			item => item.nodeName === 'DIV' && item.style.display !== 'none'
		);
		// hide it
		$.forEach(item => item.style.display = 'none');

		// regiser print
		let div = document.createElement('div');
		div.appendChild(findDOMNode(this.refs.print.refs[refName]).cloneNode(true));
		// div.innerHTML = findDOMNode(this.refs.print.refs[refName]).innerHTML;
		document.body.appendChild(div);
		window.print();

		// remove print
		$.forEach(item => item.style.removeProperty('display'));
		document.body.removeChild(div);
	}
	render() {
		return (
			cloneElement(
				Children.only(this.props.children), {
					__decirator: 'success',
					printProps: {
						setPrint: this.setPrint
					},
					ref: 'print'
				}
			)
		);
	}
}
CreatePrint.propTypes = {
	refName: PropTypes.string.isRequired
};
CreatePrint.defaultProps = {

};
export default CreatePrint;
