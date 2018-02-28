import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../index.js';
import { RcInstance } from '../../../main.js';
RcInstance.init({
	PGallery: {
		URL_PGALLERY_PATHS_LIST_GET: 'https://managexcx.ruishan666.com/uploadfile/getfolder.json',
		URL_PGALLERY_PATHS_ITEM_RENAME_POST: 'https://managexcx.ruishan666.com/uploadfile/rename-cat.json', // post, cat_id, cat_name
		URL_PGALLERY_PATHS_ITEM_DEL_POST: 'https://managexcx.ruishan666.com/uploadfile/del-cat.json', // post, cat_id
		URL_PGALLERY_PATHS_ITEM_ADD_POST: 'https://managexcx.ruishan666.com/uploadfile/add-cat.json', // post, cat_name
		URL_PGALLERY_IMGS_LIST_GET: 'https://managexcx.ruishan666.com/uploadfile/imglist.json', // get, cat_id, file_name
		URL_PGALLERY_IMGS_ITEM_DEL_POST: 'https://managexcx.ruishan666.com/uploadfile/del-img.json', // get, file_id
		URL_PGALLERY_IMGS_UPLOAD_POST: 'https://managexcx.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		URL_PGALLERY_IMGS_ITEM_ADD_POST: 'https://managexcx.ruishan666.com/uploadfile/upload-img.json', // post, cat_id, file_id
		URL_PGALLERY_IMGS_ITEM_RENAME_POST: 'https://managexcx.ruishan666.com/uploadfile/rename-img.json', // get, file_id, file_name
		URL_PGALLERY_IMGS_ITEM_MOVE_POST: 'https://managexcx.ruishan666.com/uploadfile/move-img.json', // get, file_id, cate_id
	}
});
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
		this.state = {
			raw: {
				...initRaw
			}
		};
	}
	handleRawChange = (raw) => {
		this.setState({
			raw
		});
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
				initialContent={this.state.raw}
				onRawChange={this.handleRawChange}
				onHTMLChange={this.handleHTMLChange}
				onChange={this.handleChange}
			/>
		);

	}
}
Basic.propTypes = {};
Basic.defaultProps = {};
export default Basic;