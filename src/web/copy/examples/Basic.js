import React, { Component } from 'react';
import { Copy } from '../../../main.js';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Copy value="test">
				<button>点我复制</button>
			</Copy>
		);
	}
}
export default Basic;
