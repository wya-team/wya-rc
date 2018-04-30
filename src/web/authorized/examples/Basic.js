import React, { Component } from 'react';
import Authorized from '../Authorized';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			auth: [
				true, 
				true,
				true
			]
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				auth: [
					true, 
					false,
					true
				]
			});
		}, 4000);
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
