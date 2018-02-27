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

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _index = require('../paging/index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils/utils');

var _index3 = require('../rc-instance/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _extends4.default)({}, _utils.initPage, {
	selectItem: {}
});

var Goods = function (_Component) {
	(0, _inherits3.default)(Goods, _Component);

	function Goods(props, context) {
		(0, _classCallCheck3.default)(this, Goods);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Goods.__proto__ || Object.getPrototypeOf(Goods)).call(this, props, context));

		_this.state = (0, _extends4.default)({}, initialState);
		_this.loadDataForPaging = _this.loadDataForPaging.bind(_this); // 加载数据
		return _this;
	}

	(0, _createClass3.default)(Goods, [{
		key: 'loadDataForPaging',
		value: function loadDataForPaging(page) {
			var _this2 = this;

			page = page || 1;
			var _props = this.props,
			    request = _props.request,
			    id = _props.id;

			if (this.state.itemArr[page]) {
				this.setState({
					curPage: page
				});
				return;
			}
			var PSelectGoods = _index4.default.config.PSelectGoods;

			var _ref = PSelectGoods || {},
			    _url = _ref.URL_PSELECTGOODS_LIST_GET;

			var _ref2 = this.props.url || {},
			    url = _ref2.URL_PSELECTGOODS_LIST_GET;

			this.setState({
				isEnd: 1
			}, function () {
				_this2.request = request({
					url: url || _url,
					type: "get",
					param: {
						page: page
					}
				}).then(function (res) {
					var items = (0, _utils.initItem)(res.data.list || [], id);
					var totalPage = res.data.totalPage;
					var totalCount = res.data.totalCount;
					_this2.setState({
						isEnd: 0,
						curPage: page,
						totalPage: totalPage,
						totalCount: totalCount,
						itemArr: (0, _extends4.default)({}, _this2.state.itemArr, (0, _defineProperty3.default)({}, page, items.itemArr)),
						itemObj: (0, _extends4.default)({}, _this2.state.itemObj, items.itemObj)
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
			    selectArr = _props2.selectArr,
			    onClick = _props2.onClick,
			    activeText = _props2.activeText,
			    staticText = _props2.staticText,
			    disableText = _props2.disableText,
			    disableArr = _props2.disableArr,
			    component = _props2.component;
			var _state = this.state,
			    isEnd = _state.isEnd,
			    curPage = _state.curPage,
			    totalPage = _state.totalPage,
			    totalCount = _state.totalCount,
			    itemArr = _state.itemArr,
			    itemObj = _state.itemObj,
			    resetPage = _state.resetPage;

			return _react2.default.createElement(
				'div',
				{ className: '__imgs', style: { padding: "20px" } },
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
						showTotal: function showTotal() {
							return totalCount ? '\u5171 ' + totalCount + ' \u6761' : null;
						},

						loadDataForPaging: this.loadDataForPaging,
						resetPrvScrollTop: curPage,
						resetPage: resetPage
					},
					_react2.default.createElement(_List2.default, {
						itemArr: itemArr[curPage] || [],
						itemObj: itemObj,
						onClick: onClick,
						selectArr: selectArr,
						activeText: activeText,
						staticText: staticText,
						disableText: disableText,
						disableArr: disableArr,
						component: component || _Item2.default
					})
				)
			);
		}
	}]);
	return Goods;
}(_react.Component);

Goods.propTypes = {};

exports.default = Goods;