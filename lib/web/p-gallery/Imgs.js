'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UpLoad = require('./UpLoad');

var _UpLoad2 = _interopRequireDefault(_UpLoad);

var _PathsEdit = require('./PathsEdit');

var _PathsEdit2 = _interopRequireDefault(_PathsEdit);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

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

var initialState = (0, _extends5.default)({}, _utils.initPage, {
	selectItem: {}
});

var Imgs = function (_Component) {
	(0, _inherits3.default)(Imgs, _Component);

	function Imgs(props, context) {
		(0, _classCallCheck3.default)(this, Imgs);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Imgs.__proto__ || Object.getPrototypeOf(Imgs)).call(this, props, context));

		_this.handleSelect = function (info) {
			_this.setState({
				selectItem: _this.state.selectItem.file_id == info.file_id ? {} : info
			});
		};

		_this.handleSetItem = function (id, itemData) {
			var itemObj = _this.state.itemObj;

			_this.setState({
				itemObj: (0, _extends5.default)({}, itemObj, (0, _defineProperty3.default)({}, id, (0, _extends5.default)({}, itemObj[id], itemData)))
			});
		};

		_this.handleInit = function (keyword) {
			_this.setState((0, _extends5.default)({}, initialState, {
				keyword: keyword
			}));
		};

		_this.state = (0, _extends5.default)({}, initialState, {
			selectArr: [],
			keyword: ''
		});
		_this.loadDataForPaging = _this.loadDataForPaging.bind(_this); // 加载数据
		return _this;
	}

	(0, _createClass3.default)(Imgs, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.pathSelect.cat_id !== nextProps.pathSelect.cat_id) {
				this.request && this.request.catch();
				this.setState((0, _extends5.default)({}, initialState));
			}
		}
	}, {
		key: 'loadDataForPaging',
		value: function loadDataForPaging(page) {
			var _this2 = this;

			page = page || 1;
			var PGallery = _index4.default.config.PGallery;

			var _ref = PGallery || {},
			    _url = _ref.URL_PGALLERY_IMGS_LIST_GET;

			var _ref2 = this.props.url || {},
			    url = _ref2.URL_PGALLERY_IMGS_LIST_GET;

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
						cat_id: cat_id,
						file_name: _this2.state.keyword
					}
				}).then(function (res) {
					var items = (0, _utils.initItem)(res.data.list || [], 'file_id');
					var totalPage = res.data.totalPage;
					_this2.setState({
						isEnd: 0,
						curPage: page,
						totalPage: totalPage,
						itemArr: (0, _extends5.default)({}, _this2.state.itemArr, (0, _defineProperty3.default)({}, page, items.itemArr)),
						itemObj: (0, _extends5.default)({}, _this2.state.itemObj, items.itemObj)
					});
				}).catch(function () {
					var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

					res.msg && _message3.default.error(res.msg);
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    pathSelect = _props2.pathSelect,
			    paths = _props2.paths,
			    onSet = _props2.onSet,
			    request = _props2.request,
			    url = _props2.url,
			    onSure = _props2.onSure;
			var _state = this.state,
			    isEnd = _state.isEnd,
			    curPage = _state.curPage,
			    totalPage = _state.totalPage,
			    itemArr = _state.itemArr,
			    itemObj = _state.itemObj,
			    selectItem = _state.selectItem,
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
					_react2.default.createElement(_Search2.default, { onSearch: this.handleInit })
				),
				_react2.default.createElement(
					_index2.default,
					{
						className: '__no-pd',
						style: { height: '100%' },
						title: [],
						tHide: true,
						isEnd: isEnd,
						curPage: curPage,
						totalPage: totalPage,

						loadDataForPaging: this.loadDataForPaging,
						resetPrvScrollTop: curPage,
						resetPage: resetPage
					},
					_react2.default.createElement(_List2.default, {
						itemArr: itemArr[curPage] || [],
						itemObj: itemObj,
						selectItem: selectItem,
						onSelect: this.handleSelect,
						onSetItem: this.handleSetItem,
						onSet: onSet,
						onInit: this.handleInit,
						request: request,
						url: url,
						paths: paths,
						pathSelect: pathSelect
					}),
					_react2.default.createElement(_ImgsEdit2.default, {
						onSure: onSure,
						selectItem: selectItem
					})
				)
			);
		}
	}]);
	return Imgs;
}(_react.Component);

Imgs.propTypes = {};

exports.default = Imgs;