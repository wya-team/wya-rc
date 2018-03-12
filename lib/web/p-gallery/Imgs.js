'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _message4 = require('antd/lib/message');

var _message5 = _interopRequireDefault(_message4);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _UpLoad = require('./UpLoad');

var _UpLoad2 = _interopRequireDefault(_UpLoad);

var _PathsEdit = require('./PathsEdit');

var _PathsEdit2 = _interopRequireDefault(_PathsEdit);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _ImgsEdit = require('./ImgsEdit');

var _ImgsEdit2 = _interopRequireDefault(_ImgsEdit);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _index = require('../paging/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../rc-instance/index');

var _index4 = _interopRequireDefault(_index3);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _extends6.default)({}, _utils.initPage, {
	selectArr: [],
	selectObj: {},
	keyword: ''
});

var Imgs = function (_Component) {
	(0, _inherits3.default)(Imgs, _Component);

	function Imgs(props, context) {
		(0, _classCallCheck3.default)(this, Imgs);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Imgs.__proto__ || Object.getPrototypeOf(Imgs)).call(this, props, context));

		_this.handleSelect = function (info) {
			var max = _this.props.max;
			var _this$state = _this.state,
			    selectArr = _this$state.selectArr,
			    _this$state$selectObj = _this$state.selectObj,
			    selectObj = _this$state$selectObj === undefined ? {} : _this$state$selectObj;

			var _ref = info || {},
			    file_id = _ref.file_id;
			// 验证


			if (max != 0 && selectArr.length >= max && !selectArr.includes(file_id)) {
				_message5.default.destroy();
				_message5.default.warn('最多选择' + max + '个，请先取消在进行选择。');
				return;
			}
			// 输出
			var _selectArr = void 0,
			    _selectObj = void 0;
			if (selectArr.includes(file_id)) {
				_selectArr = selectArr.filter(function (item) {
					return item != file_id;
				});
				delete selectObj[file_id];
			} else {
				_selectArr = [].concat((0, _toConsumableArray3.default)(selectArr), [file_id]);
				_selectObj = (0, _extends6.default)({}, selectObj, (0, _defineProperty3.default)({}, file_id, (0, _extends6.default)({}, info)));
			}
			_this.setState({
				selectArr: _selectArr,
				selectObj: _selectObj
			});
		};

		_this.handleSetItem = function (id, itemData) {
			var itemObj = _this.state.itemObj;

			_this.setState({
				itemObj: (0, _extends6.default)({}, itemObj, (0, _defineProperty3.default)({}, id, (0, _extends6.default)({}, itemObj[id], itemData)))
			});
		};

		_this.handleInit = function (keyword) {
			_this.setState((0, _extends6.default)({}, initialState, {
				keyword: keyword
			}));
		};

		_this.state = (0, _extends6.default)({}, initialState);
		_this.loadDataForPaging = _this.loadDataForPaging.bind(_this); // 加载数据
		return _this;
	}

	(0, _createClass3.default)(Imgs, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.pathSelect.cat_id !== nextProps.pathSelect.cat_id) {
				this.request && this.request.catch();
				this.setState((0, _extends6.default)({}, initialState));

				(0, _reactDom.findDOMNode)(this.refs.search).getElementsByTagName('input')[0].value = '';
			}
		}
	}, {
		key: 'loadDataForPaging',
		value: function loadDataForPaging(page) {
			var _this2 = this;

			page = page || 1;
			var PGallery = _index4.default.config.PGallery;

			var _ref2 = PGallery || {},
			    _url = _ref2.URL_PGALLERY_IMGS_LIST_GET;

			var _ref3 = this.props.url || {},
			    url = _ref3.URL_PGALLERY_IMGS_LIST_GET;

			var _props = this.props,
			    request = _props.request,
			    cat_id = _props.pathSelect.cat_id;

			if (!cat_id) return;
			if (this.state.itemArr[page]) {
				this.setState({
					curPage: page
				});
				return;
			}
			this.setState({
				isEnd: 1
			}, function () {
				_this2.request = request({
					url: url || _url,
					type: "get",
					param: {
						page: page,
						cat_id: String(cat_id),
						file_name: _this2.state.keyword
					}
				}).then(function (res) {
					var items = (0, _utils.initItem)(res.data.list || [], 'file_id');
					var totalPage = res.data.totalPage;
					var totalCount = res.data.totalCount;
					_this2.setState({
						isEnd: 0,
						curPage: page,
						totalCount: totalCount,
						totalPage: totalPage,
						itemArr: (0, _extends6.default)({}, _this2.state.itemArr, (0, _defineProperty3.default)({}, page, items.itemArr)),
						itemObj: (0, _extends6.default)({}, _this2.state.itemObj, items.itemObj)
					});
				}).catch(function () {
					var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

					res.msg && _message5.default.error(res.msg);
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    _props2$pathSelect = _props2.pathSelect,
			    pathSelect = _props2$pathSelect === undefined ? {} : _props2$pathSelect,
			    paths = _props2.paths,
			    onSet = _props2.onSet,
			    request = _props2.request,
			    url = _props2.url,
			    onSure = _props2.onSure,
			    max = _props2.max;
			var _state = this.state,
			    isEnd = _state.isEnd,
			    curPage = _state.curPage,
			    totalPage = _state.totalPage,
			    totalCount = _state.totalCount,
			    itemArr = _state.itemArr,
			    itemObj = _state.itemObj,
			    selectArr = _state.selectArr,
			    selectObj = _state.selectObj,
			    resetPage = _state.resetPage;

			return _react2.default.createElement(
				'div',
				{ className: '__imgs' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_PathsEdit2.default, {
						paths: paths,
						pathSelect: pathSelect,
						onSet: onSet,
						onInit: this.handleInit,
						request: request,
						url: url
					}),
					_react2.default.createElement(_UpLoad2.default, {
						onInit: this.handleInit,
						onSet: onSet,
						paths: paths,
						pathSelect: pathSelect,
						request: request,
						url: url
					}),
					_react2.default.createElement(_Search2.default, { onSearch: this.handleInit, ref: 'search' })
				),
				_react2.default.createElement(
					_index2.default,
					{
						className: '__no-pd',
						listClassName: '__list',
						style: { height: '100%' },
						title: [],
						tHide: true,

						isEnd: isEnd,
						curPage: curPage,
						totalPage: totalPage,
						dataSource: {
							itemArr: itemArr,
							itemObj: itemObj
						},
						renderRow: _Item2.default,
						rowProps: {
							selectArr: selectArr,
							request: request,
							url: url,
							paths: paths,
							pathSelect: pathSelect,
							onSet: onSet,
							onSelect: this.handleSelect,
							onSetItem: this.handleSetItem,
							onInit: this.handleInit
						},

						showTotal: function showTotal() {
							return totalCount ? '\u5171 ' + totalCount + ' \u6761' : null;
						},
						loadDataForPaging: this.loadDataForPaging,
						resetPrvScrollTop: curPage,
						resetPage: String(pathSelect.cat_id)
					},
					_react2.default.createElement(_ImgsEdit2.default, {
						onSure: onSure,
						selectArr: selectArr,
						selectObj: selectObj,
						max: max
					})
				)
			);
		}
	}]);
	return Imgs;
}(_react.Component);

Imgs.propTypes = {};

exports.default = Imgs;