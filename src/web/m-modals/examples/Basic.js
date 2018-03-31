import React, { Component } from 'react';
import MModals from '../MModals';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		MModals.alert("提示", "注意！您还没有缴纳保证金", [
			{
				text: "再看看",
				onPress: () => {
					
				}
			},
			{
				text: "去缴纳",
				onPress: () => {
				}
			}
		]);
	}
	render() {
		return (
			<div onClick={this.handleClick}>点击我</div>
		);
	}
}
export default Basic;
