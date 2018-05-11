## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/imgs-picker/Basic.html)
## 功能
上传图片功能

## 待开发
- 进度条
- 预览

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | - | `any` | -
max | - | `any` | -
style | - | `any` | -
value | - | `any` | -
onChange | - | `any` | -
onError | - | `any` | -

## 基础用法

```jsx
import React, { Component } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import { ImgsPicker } from 'wya-rc';

// 只需要注册一次
import { RcInstance } from 'wya-rc';
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
							<ImgsPicker/>
						)
					}
				</Form.Item>
				<div onClick={this.handleClick}>保存</div>
			</Form>
		);
	}
}
export default Basic;
```
