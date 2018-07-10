import React, { Component } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import ImgsPicker from '../ImgsPicker';
import { RcInstance } from '../../../main';
// 只需要注册一次
RcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		URL_UPLOAD_FILE_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx'
	}
});

const formItemLayout = {
	labelCol: {
		xs: { span: 7 },
		sm: { span: 7 },
	},
	wrapperCol: {
		xs: { span: 15 },
		sm: { span: 15 },
	}
};
@Form.create()
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: []
		};
	}
	handleClick = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			console.log(err, values);
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { value } = this.state;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item
					{...formItemLayout}
					label="图片上传"
				>
					{
						getFieldDecorator('images', {
							initialValue: [],
							rules: [
								{
									required: true,
									message: '请图片上传!',
								}
							],
						})(
							<ImgsPicker max={0} />
						)
					}
				</Form.Item>
				<div onClick={this.handleClick}>保存</div>
			</Form>
		);
	}
}
export default Basic;
