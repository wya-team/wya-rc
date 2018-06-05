import React, { Component } from 'react';
import MToasts from '../MToasts';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		MToasts.loading('test');
	}
	render() {
		return (
			<div onClick={this.handleClick}>点击我</div>
		);
	}
}
export default Basic;
