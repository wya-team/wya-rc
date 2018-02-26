import React, { Component } from 'react';
import { PGallery } from '../../../main.js';
import { RcInstance } from '../../../main.js';
// 只需要注册一次
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
		EXT_PGALLERY_IMG_SRC_SUF: '!4-4',
	}
});
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		PGallery.popup({
			max: 1
		}).then((info) => {
			console.log(info);
		}).catch(() => {

		});
	}
	render() {
		return null;
	}
}
export default Basic;
