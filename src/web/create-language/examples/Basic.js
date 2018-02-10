import React, { Component } from 'react';
import { CreateLanguage } from '../../../main.js';
import { Modal } from 'antd';
@CreateLanguage()
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => { 
		Modal.confirm({});
	}
	render() {
		return (
			<div onClick={this.handleClick}>
				test
			</div>
		);
	}
}
export default Basic;
