import React, { Component } from 'react';
import ToImg from '../ToImg';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		this.toImg.download()
			.then((e) => {

			}).catch((e) => {
				console.log(e);
			});
	}
	render() {
		return (
			<div>
				<ToImg ref={e => this.toImg = e}>
					<div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
					</div>
				</ToImg>
				<div onClick={this.handleClick}>点击</div>
			</div>
			
		);
	}
}
export default Basic;
