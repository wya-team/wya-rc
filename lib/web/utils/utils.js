'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initPage = exports.initObj = exports.initItem = exports.initSelect = exports.attrAccept = exports.getUid = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = +new Date();
var index = 0;

var getUid = exports.getUid = function getUid() {
	return 'rc-' + now + '-' + ++index;
};

var endsWith = function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var attrAccept = exports.attrAccept = function attrAccept(file, acceptedFiles) {
	if (file && acceptedFiles) {
		var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
		var fileName = file.name || '';
		var mimeType = file.type || '';
		var baseMimeType = mimeType.replace(/\/.*$/, '');

		return acceptedFilesArray.some(function (type) {
			var validType = type.trim();
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

var initSelect = exports.initSelect = function initSelect(res, value, label, children) {
	var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

	var __arr = [];
	var __child = [];
	if (res instanceof Array && level > 0) {
		for (var j = 0; j < res.length; j++) {
			__arr = [].concat((0, _toConsumableArray3.default)(__arr), [{
				value: res[j][value] || j,
				label: res[j][label] || res[j],
				children: initSelect(res[j][children], value, label, children, level - 1)
			}]);
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
var initItem = exports.initItem = function initItem(res, str, count, initObj, initArr) {
	var itemArr = [];
	var itemObj = {};
	var data = void 0;
	var id = str || 'id';
	if ((typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) == "object" && res.data && res.data instanceof Array) {
		// 传入的不是数组。res.data是数组
		data = res.data;
	} else if (res instanceof Array) {
		// 传入的是数组
		data = res;
	} else {
		return console.error('初始化参数错误');
	}
	for (var i = 0; i < data.length; i++) {
		itemArr = [].concat((0, _toConsumableArray3.default)(itemArr), [data[i][id]]);
		itemObj = (0, _extends4.default)({}, itemObj, (0, _defineProperty3.default)({}, data[i][id], initObj || data[i]));
	}
	/* 判断是否有_count*/
	if (count) {
		var _count = res._count;

		return { itemArr: itemArr, itemObj: itemObj, _count: _count };
	} else {
		return { itemArr: itemArr, itemObj: itemObj };
	}
};
/**
 * 作为分页初始数据
 * for mobile
 */
var initObj = exports.initObj = {
	currentPage: 0, // 当前页数
	totalPage: 1, // 总页数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: [],
	itemObj: {}

};
/**
 * 作为分页初始数据
 * for pc
 */
var initPage = exports.initPage = {
	curPage: 0, // 当前页数
	totalPage: 1, // 总页数
	pageSize: 10, // 条数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: {},
	itemObj: {}
};