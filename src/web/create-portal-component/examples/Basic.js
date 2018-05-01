import React, { Component } from 'react';
import Timer from './Basic/Timer';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			timer: (new Date).toString()
		};
	}
	componentDidMount() {
		setInterval(() => {
			this.setState({
				timer: (new Date).toString()
			});
		}, 1000);
	}
	render() {
		return (
			<Timer timer={this.state.timer} />
		);
	}
}
export default Basic;
