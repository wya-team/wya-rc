import React, { Component, cloneElement, Children, createRef } from 'react';
import PropTypes from 'prop-types';
import './CreateAccordion.scss';
class CreateAccordion extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			show: !1
		};
		this.handleSlide = ::this.handleSlide;
		this.setDefault = ::this.setDefault;

		this.slideRef = createRef();
	}
	handleSlide(event){
		event.preventDefault();
		event.stopPropagation();
		this.setState({
			show: !this.state.show
		}, () => {
			try {
				const $this = this.slideRef.current;
				let height = 0;
				for (let i = 0; i < $this.childNodes.length; i++) {
					height += $this.childNodes[i].offsetHeight;
				}
				$this.style.height = this.state.show ? `${height}px` : `0px`;
			} catch (e) {
				console.log(e);
			}

		});
	}
	setDefault() {
		this.setState({
			show: !1
		}, () => {
			const $this = this.slideRef.current;
			$this.style.height = `0px`;
		});
	}
	render() {
		const { show } = this.state;
		return (
			cloneElement(
				Children.only(this.props.children), {
					__decorator: 'success',
					accordion: {
						show,
						eventHandler: this.handleSlide,
						icon: `iconfont ${show ? "icon-up" : "icon-down"}`,
						content: `rc-accordion ${show ? "__active" : ""}`,
						setDefault: this.setDefault,
						ref: this.slideRef
					},
				}
			)
		);


	}
}
CreateAccordion.propTypes = {
	// refName: PropTypes.string.isRequired
};
export default CreateAccordion;
