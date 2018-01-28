import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../index.js';
const initRaw = {
	"blocks": [{
		"key": "180fu",
		"text": "helle world",
		"type": "unstyled",
		"depth": 0,
		"inlineStyleRanges": [],
		"entityRanges": [],
		"data": {}
	}],
	"entityMap": {}
};
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleRawChange = (html) => {
		console.log(`HTML: ${html}`);
	}
	handleHTMLChange = (html) => {
		console.log(`HTML: ${html}`);
	}
	handleChange = (raw) => {
		console.log(`Raw: ${raw}`);
	}
	render() {
		return (
			<Editor 
				initialContent={initRaw}
				onRAWChange={this.handleRawChange}
				onHTMLChange={this.handleHTMLChange}
				onChange={this.handleChange}
			/>
		);

	}
}
Basic.propTypes = {};
Basic.defaultProps = {};
export default Basic;