const now = +(new Date());
let index = 0;

export const getUid = () => {
	return `rc-${now}-${++index}`;
};

const endsWith = (str, suffix) => {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export const attrAccept = (file, acceptedFiles) => {
	if (file && acceptedFiles) {
		const acceptedFilesArray = Array.isArray(acceptedFiles)
			? acceptedFiles
			: acceptedFiles.split(',');
		const fileName = file.name || '';
		const mimeType = file.type || '';
		const baseMimeType = mimeType.replace(/\/.*$/, '');

		return acceptedFilesArray.some(type => {
			const validType = type.trim();
			if (validType.charAt(0) === '.') {
				return endsWith(fileName.toLowerCase(), validType.toLowerCase());
			} else if (/\/\*$/.test(validType)) {
				// This is something like a image/* mime type
				return baseMimeType === validType.replace(/\/.*$/, '');
			}
			return mimeType === validType;
		});
	}
	return true;
};

// -- 业务相关 --

export const initSelect = (res, value, label, children, level = 1) => {
	let __arr = [];
	let __child = [];
	if (res instanceof Array && level > 0) {
		for (let j = 0; j < res.length; j++){
			__arr = [...__arr, {
				value: res[j][value] || j,
				label: res[j][label] || res[j],
				children: initSelect(res[j][children], value, label, children, level - 1)
			}];
		}
		return __arr;
	}
	return level == 0 ? undefined : [];
};
/**
 * 初始化数据
 * @param  {String} res 传入的数据
 * @param  {String} id  数组是已str区分 ，默认'id'
 * @param  {String} _count
 * @param  {Object} initObj 判断是否有init
 * @param  {Array} initArr 判断是否有init
 * @return {String}
 * 参考reducers中的使用
 */
export const initItem = (res, str, count, initObj, initArr) => {
	let itemArr = [];
	let itemObj = {};
	let data;
	let id = str || 'id';
	if (typeof res == "object" && res.data && res.data instanceof Array) { // 传入的不是数组。res.data是数组
		data = res.data;
	} else if (res instanceof Array) { // 传入的是数组
		data = res;
	} else {
		return console.error('初始化参数错误');
	}
	for (let i = 0; i < data.length; i++) {
		itemArr = [...itemArr, data[i][id]];
		itemObj = {
			...itemObj,
			[data[i][id]]: initObj || data[i]
		};
	}
	/* 判断是否有_count*/
	if (count) {
		let { _count } = res;
		return { itemArr, itemObj, _count };
	} else {
		return { itemArr, itemObj };
	}
};
/**
 * 作为分页初始数据
 * for mobile
 */
export const initObj = {
	currentPage: 0, // 当前页数
	totalPage: 1, // 总页数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: [],
	itemObj: {},

};
/**
 * 作为分页初始数据
 * for pc
 */
export const initPage = {
	curPage: 0, // 当前页数
	totalPage: 1, // 总页数
	pageSize: 10, // 条数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: {},
	itemObj: {},
};
