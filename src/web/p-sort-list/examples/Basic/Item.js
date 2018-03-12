import React, { Component } from 'react';
export default class Item extends Component {
	render() {
		const { itemData = {} } = this.props;
		const { text, background, imgUrl } = itemData || {};
		return (
			<div
				style={{ width: 200, lineHeight: 5, color: 'white', background }}
			>
				{/* <img src={imgUrl} alt="" style={{ width: 200, height: 240 }} /> */}
				<span>{text}</span>
			</div>
		);
	}
}