import React, { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import 'braft-editor/dist/braft.css';
import AsyncComponent from '../async-component/index';
import PGallery from '../p-gallery/index';
let BraftEditor = AsyncComponent(() => import("braft-editor"));
class Editor extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			htmlContent: ''
		};
	}
	setEditor = (editor) => {
		this.editor = editor;
	}
	setOpts() {
		const editorProps = {
			placeholder: '请输入需要编辑的信息',
			controls: [
				'undo', 'redo', 'split', 'font-size', 'font-family', 'text-color',
				'bold', 'italic', 'underline', 'strike-through', 'superscript',
				'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
				'blockquote', 'code', 'split', 'link', 'split', 'media'
			],
			media: {
				image: false, // 开启图片插入功能
				video: false, // 开启视频插入功能
				audio: false, // 开启音频插入功能
				validateFn: null, // 指定本地校验函数，说明见下文
				uploadFn: null // 指定上传函数，说明见下文
			},
			extendControls: [
				{
					type: 'button',
					text: <Icon type="upload"/>,
					onClick: () => {
						PGallery.popup({

						}).then((res) => {
							this.insertMedias([
								{
									type: 'IMAGE',
									name: 'New Photo',
									url: res.file_url.replace(/!4-4/g, '')
								}
							]);
						}).catch((res) => {
							console.log(res);
						});
					}
				}
			],
			...this.props
		};
		return editorProps;
	}
	insertMedias(params){
		// [
		// 	{
		// 		type: 'IMAGE',
		// 		name: 'New Photo',
		// 		url: 'http://path/to/image.png'
		// 	}, {
		// 		type: 'VIDEO',
		// 		name: 'New Video',
		// 		url: 'http://path/to/image-2.mp4'
		// 	}, {
		// 		type: 'AUDIO',
		// 		name: 'New Audio',
		// 		url: 'http://path/to/image-2.mp3'
		// 	}
		// ]
		this.editor.refs['wrap'].insertMedias([...params]);
	}
	render() {
		const opts = this.setOpts();
		const { className, style = {} } = this.props; 
		return (
			<div className={className} style={{ background: 'white', ...style }}> 
				<BraftEditor {...opts} ref={this.setEditor}/>
			</div>
		);

	}
}
Editor.propTypes = {
};
Editor.defaultProps = {
};
export default Editor;