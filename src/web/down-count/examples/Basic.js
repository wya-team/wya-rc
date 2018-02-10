import React, { Component } from 'react';
import { DownCount } from '../../../main.js';
import { message } from 'antd';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			targetTime: "2018-02-22"
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				targetTime: "2019-01-01"
			});
		}, 5000);
	}
	render() {
		return (
			<DownCount
				targetTime={this.state.targetTime}
				onTip={message.info}
			/>
		);
	}
}
export default Basic;
