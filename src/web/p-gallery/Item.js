import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRename = async () => {
		let res;
		try {
			const { pathSelect: { name } } = this.props;
			res = await new Promise((resolve, reject) => {
				const memberRef = Modal.confirm({
					title: (
						<div 
							onClick={
								e => { memberRef.destroy(); reject(); }
							}
						>
							<div>修改内容</div>
						</div>
					),
					content: (
						<Input 
							type="text" 
							placeholder="修改名字" 
							defaultValue={`${name}`} 
							id="vc-input"
						/>
					),
					iconType: "",
					closable: true,
					okText: "提交修改",
					onOk: () => {
						resolve(document.querySelector("#vc-input").value);
					},
					cancelText: "恢复默认",
					onCancel: () => {
						// 还原文字
						return new Promise(($resolve, $reject) => {
							document.querySelector("#vc-input").value = name;
							$reject();
						});
					}
				});
			});
			
		} catch (e) {
			console.log(e);
		}
		
	}
	render() {
		return (
			<div className="__item">
				<img src="http://www.w3school.com.cn/ui2017/compatible_opera.png" alt=""/>
				<div>
					{/** <input type="checkbox"/>*/}
					<span className="__line">ssssss</span>
				</div>
				<div className="__edits">
					<div
						onCLick={this.handleRename}
					>重命名</div>
					<div
						onCLick={this.handleRename}
					>修改分组</div>
					<div>删除</div>
				</div>
			</div>
		);
	}
}

Item.propTypes = {
};

export default Item;