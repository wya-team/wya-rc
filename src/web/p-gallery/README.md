## 功能
我的素材库（图片管理）

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
url | 请求地址 | `object` | -
request | 网络请求 | `() -> Promise` | -

- url

属性 | 说明 | 类型 | 默认值
---|---|---|---
URL_PGALLERY_PATHS_LIST_GET | 分类列表 | `string` | -
URL_PGALLERY_PATHS_ITEM_RENAME_POST | 分类重命名 | `string` | -
URL_PGALLERY_PATHS_ITEM_DEL_POST | 分类删除 | `string` | -
URL_PGALLERY_PATHS_ITEM_ADD_POST | 分类增加 | `string` | -
URL_PGALLERY_IMGS_LIST_GET | 图片列表 | `string` | -
URL_PGALLERY_IMGS_ITEM_DEL_POST | 图片删除 | `string` | -
URL_PGALLERY_IMGS_UPLOAD_POST | 图片上传地址（oss） | `string` | -
URL_PGALLERY_IMGS_ITEM_ADD_POST | 图片上传（oss回调后增加） | `string` | -
URL_PGALLERY_IMGS_ITEM_RENAME_POST | 图片上传（oss重命名） | `string` | -
URL_PGALLERY_IMGS_ITEM_MOVE_POST | 图片移动 | `string` | -

- 分类格式
```
{
	cat_id: number
	cat_name: string,
	count: number
}
```
- 图片格式
```
{
	file_id: number
	file_name: string,
	file_url: string
}
```
## 基础用法
```js
import { RcInstance } from 'wya-rc';
// 只需要注册一次
RcInstance.init({
	PGallery: {
		// 分类列表
		URL_PGALLERY_PATHS_LIST_GET: 'https://managexcx.ruishan666.com/uploadfile/getfolder.json',
		// 分类重命名 // post, cat_id, cat_name
		URL_PGALLERY_PATHS_ITEM_RENAME_POST: 'https://managexcx.ruishan666.com/uploadfile/rename-cat.json', 
		// 分类删除 // post, cat_id
		URL_PGALLERY_PATHS_ITEM_DEL_POST: 'https://managexcx.ruishan666.com/uploadfile/del-cat.json', 
		// 分类增加 // post, cat_name
		URL_PGALLERY_PATHS_ITEM_ADD_POST: 'https://managexcx.ruishan666.com/uploadfile/add-cat.json',
		// 图片列表 // get, cat_id, file_name
		URL_PGALLERY_IMGS_LIST_GET: 'https://managexcx.ruishan666.com/uploadfile/imglist.json',
		// 图片删除 // get, file_id
		URL_PGALLERY_IMGS_ITEM_DEL_POST: 'https://managexcx.ruishan666.com/uploadfile/del-img.json',
		// 图片上传地址（oss）
		URL_PGALLERY_IMGS_UPLOAD_POST: 'https://managexcx.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
		// 图片上传（oss回调图） // post, cat_id, file_id
		URL_PGALLERY_IMGS_ITEM_ADD_POST: 'https://managexcx.ruishan666.com/uploadfile/upload-img.json',
		// 图片上传（oss重命名） // get, file_id, file_name
		URL_PGALLERY_IMGS_ITEM_RENAME_POST: 'https://managexcx.ruishan666.com/uploadfile/rename-img.json',
		// 图片移动 // get, file_id, cate_id
		URL_PGALLERY_IMGS_ITEM_MOVE_POST: 'https://managexcx.ruishan666.com/uploadfile/move-img.json',
	}
});
```
```jsx
import React, { Component } from 'react';
import { PGallery } from 'wya-rc';

class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		PGallery.popup({

		}).then((id, info) => {
			console.log(id, info);
		}).catch(() => {

		});
	}
	render() {
		return null;
	}
}
export default Basic;


```