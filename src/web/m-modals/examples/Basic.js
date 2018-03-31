import React, { Component } from 'react';
import MModals from '../MModals';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		MModals.alert("提示", "aaaa", [
			{
				text: "取消",
				onPress: () => {
					
				}
			},
			{
				text: "确定",
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
