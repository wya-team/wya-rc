## 功能
上传功能

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 外层标签`span / div / **` | `str` | span
style | 外层标签style | `obj` | {}
prefixCls | 外层标签prefixCls | `str` | c-upload
className | 外层标签className | `str` | -
multiple | 多图上传 | `bool` | false
disabled | 禁用，增加样式`${prefixCls}-disabled` | `str` | false
accept | 文件格式 | `str` | -
type | 文件归类（images / file）,提前定位文件类型（内置图片压缩） | `str` | images
url | ajax:url -> 默认通过`RcInstance.init`注册 | `str` | -
filename | 上传给后端获取的key | `str` | `Filedata`(业务历史原因...)
data | ajax需要传递的参数 | `obj` | {}
headers | ajax: headers | `obj` | {}
onUploadBefore | 上传前回调 | `func` | -
onUploadStart | 上传开始回调 | `func` | -
onProgress | 上传过程回调(e.percent, file.current, file.total等可用参数) | `(e, file) => void` | -
onSuccess | 上传过程成功回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
onError | 上传过程失败回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -

## 基础用法
- 默认可配置入口文件，统一处理`url`参数
```js
// 只需要注册一次(项目中已注册无视)
RcInstance.init({
	UpLoad: {
		IMG_UPLOAD_URL: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		FILE_UPLOAD_URL: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx'
	}
});
```
- 使用
```jsx
import React, { Component } from 'react';
import { UpLoad } from 'wya-rc';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleSuccess = (res, file) => {
		console.log(`Success：${file.current}, 总数：${file.total}`);
		console.log(res);
	}
	handleProgress = (e, file) => {
		console.log(`Progress: 当前：${file.current}, 总数：${file.total}`);
		console.log(e.percent);
	}
	handleError = (res, file) => {
		console.log(`Error: 当前：${file.current}, 总数：${file.total}`);
		console.log(res);
	}
	render() {
		return (
			<UpLoad
				tag="span"
				// type="images" // 文件类型 images | files
				// accept="" // input: 文件类型限制
				// multiple // multiple: 单图 or 多图
				// url={} // ajax: 如果已经注册就不用传递
				// filename // ajax: formDate.append(filename, ....)
				// headers // ajax: headers 
				// data // ajax: data 
				// lrz={{}} // 图片压缩
				onProgress={this.handleProgress}
				// onUploadBefore
				// onUploadStart
				onSuccess={this.handleSuccess}
				onError={this.handleError}
			>
				<div>加载</div>
			</UpLoad>
		);
	}
}
export default Basic;
```