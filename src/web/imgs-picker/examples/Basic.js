import React, { Component } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import ImgsPicker from '../ImgsPicker';
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
					label="员工姓名："
				>
					{
						getFieldDecorator('staff_name', {
							initialValue: '',
							rules: [
								{
									required: true,
									message: '请填写员工姓名!',
								}
							],
						})(
							<Input disabled={true} />
						)
					}
				</Form.Item>
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
							<ImgsPicker
								upload={{
									url: "https://managexcx.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx"
								}}
							/>
						)
					}
				</Form.Item>
				<div onClick={this.handleClick}>保存</div>
			</Form>
		);
	}
}
export default Basic;
