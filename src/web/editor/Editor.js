import React, { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import 'braft-editor/dist/braft.css';
import AsyncComponent from '../async-component/index';
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
			...this.props
		};
		return editorProps;
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