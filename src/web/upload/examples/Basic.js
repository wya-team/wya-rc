import React, { Component } from 'react';
import { Upload } from '../../../main';
import { RcInstance } from '../../../main';
// 只需要注册一次
RcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		URL_UPLOAD_FILE_POST: 'https://wyaoa.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx'
	}
});
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
		console.log(files);
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
				multiple // multiple: 单图 or 多图
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
				showTips={true}
				size={2.1}
			>
				<div>上传</div>
			</Upload>
		);
	}
}
export default Basic;
