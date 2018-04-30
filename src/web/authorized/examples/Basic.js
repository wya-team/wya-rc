import React, { Component } from 'react';
import Authorized from '../Authorized';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			auth: [
				true, 
				() => {
					return new Promise((e) => {
						setTimeout(() => e(true), 3000);
					});
				},
				true
			]
		};
	}
	render() {
		const { auth } = this.state;
		return (
			<Authorized
				auth={auth}
			>tpl</Authorized>
		);
	}
}
export default Basic;
