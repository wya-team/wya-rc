import React, { Component } from 'react';
import ToImg from '../ToImg';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			src: ''
		};
	}
	handleClick = () => {
		this.toImg.download()
			.then((e) => {
				console.log(e);
				this.setState({
					src: e.base64Image
				});
			}).catch((e) => {
				console.log(e);
			});
	}
	render() {
		return (
			<div>
				<img src={this.state.src} alt=""/>
				<ToImg ref={e => this.toImg = e}>
					<div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<div>tpl</div>
						<img src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/ylb/180614/944989863711/TB2KEqNw3mTBuNjy1XbXXaMrVXa_%21%213903942080.jpg" alt=""/>
						<img src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/testzy/170925/305802184735/662221249449.png" alt=""/>
						<img src="http://wfxupload.oss-cn-hangzhou.aliyuncs.com/image/0/180116/099706838375.png" alt=""/>

					</div>
				</ToImg>
				<div onClick={this.handleClick}>点击</div>
			</div>

		);
	}
}
export default Basic;
