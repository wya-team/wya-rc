## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/upload/Basic.html)
## 功能
上传功能

- 多图上传为遍历单图提交，同时上传；

## 待开发

- 多图模式，队列上传；

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
request | 请求函数 | `() -> Promise` | -
url | ajax:url -> 默认通过`RcInstance.init`注册 | `str` | -
filename | 上传给后端获取的key | `str` | `Filedata`(业务历史原因...)
data | ajax需要传递的参数 | `obj` | {}
headers | ajax: headers | `obj` | {}
onFileBefore | 单个文件上传前回调 | `func` | -
onFileStart | 单个文件上传开始回调 | `func` | -
onFileProgress | 单个文件上传过程回调(e.percent, file.current, file.total等可用参数) | `(e, file) => void` | -
onFileSuccess | 单个文件上传过程成功回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
onFileError | 单个文件上传过程失败回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
onBegin | 一个周期上传前的回调(info: {}) | `(files) => void` | -
onComplete | 一个周期上传后的回调(info: {}) | `(info) => void` | -

## 基础用法
- 默认可配置入口文件，统一处理`url`参数
```js
// 只需要注册一次(项目中已注册无视)
RcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		URL_UPLOAD_FILE_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx'
	}
});
```
- 使用
```jsx
import React, { Component } from 'react';
import { Upload } from 'wya-rc';
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
	handleBegin = (files) => {
		
	}
	handleComplete = (info = {}) => {
		console.log(`Error: ${info.error}, Success: ${info.success}, 总数：${info.total}`);
		console.log(info.imgs);
	}
	render() {
		return (
			<Upload
				tag="span"
				// type="images" // 文件类型 images | files
				// accept="" // input: 文件类型限制
				// multiple // multiple: 单图 or 多图
				// url={} // ajax: 如果已经注册就不用传递
				// filename // ajax: formDate.append(filename, ....)
				// headers // ajax: headers 
				// data // ajax: data 
				// lrz={{}} // 图片压缩
				onFileProgress={this.handleProgress}
				// onFileBefore
				// onFileStart
				onFileSuccess={this.handleSuccess}
				onFileError={this.handleError}
				onBegin={this.handleBegin}
				onComplete={this.handleComplete}
			>
				<div>上传</div>
			</Upload>
		);
	}
}
export default Basic;
```