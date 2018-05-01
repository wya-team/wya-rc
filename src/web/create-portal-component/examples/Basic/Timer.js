import React, { Component } from 'react';
import CreatePortalComponent from '../../index';
@CreatePortalComponent({})
class Timer extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
	}
	render() {
		return (
			<div>{this.props.timer}</div>
		);
	}
}
export default Timer;
