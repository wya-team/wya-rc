'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _index = require('../paging/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
	currentPage: 0, // 当前页数
	totalPage: 10, // 总页数
	pageSize: 10, // 条数
	isEnd: 0, // 加载完毕0(需要判断是否有数据), 1为加载中, 3数据异常
	itemArr: {},
	itemObj: {},
	// 其他属性
	selectArr: []
};
var id = 0;
var _id = 0;

var Imgs = function (_Component) {
	(0, _inherits3.default)(Imgs, _Component);

	function Imgs(props, context) {
		(0, _classCallCheck3.default)(this, Imgs);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Imgs.__proto__ || Object.getPrototypeOf(Imgs)).call(this, props, context));

		_this.handleSelectItem = function (id) {
			var selectArr = _this.state.selectArr;

			if (selectArr.includes(id)) {
				selectArr = selectArr.filter(function (item) {
					return item !== id;
				});
			} else {
				selectArr = [].concat((0, _toConsumableArray3.default)(selectArr), [id]);
			}
			_this.setState({
				selectArr: selectArr
			});
		};

		_this.state = (0, _extends4.default)({}, initState, {
			selectArr: []
		});
		_this.actions = {
			onDel: _this.handleDel,
			onSelectItem: _this.handleSelectItem
		};
		_this.loadDataForPaging = _this.loadDataForPaging.bind(_this); // 加载数据
		return _this;
	}

	(0, _createClass3.default)(Imgs, [{
		key: 'loadDataForPaging',
		value: function loadDataForPaging(page) {
			var _this2 = this;

			page = page || 1;
			var _state = this.state,
			    currentPage = _state.currentPage,
			    itemArr = _state.itemArr;
			// SETPAGE

			if (itemArr[page]) {
				this.setState({
					currentPage: page
				});
				return;
			}
			// ON
			this.setState({
				isEnd: 1
			});

			// SUCCESS
			setTimeout(function () {
				var itemObj = {};
				for (var i = 0; i < 10; i++) {
					itemObj[_id] = {
						id: _id++
					};
				}
				_this2.setState({
					isEnd: 0,
					currentPage: page,
					totalPage: 10,
					itemArr: (0, _extends4.default)({}, _this2.state.itemArr, (0, _defineProperty3.default)({}, page, Array.from({ length: 10 }, function () {
						return id++;
					}))),
					itemObj: (0, _extends4.default)({}, _this2.state.itemObj, itemObj)
				});
			}, 1000);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    pathSelect = _props.pathSelect,
			    paths = _props.paths,
			    onSet = _props.onSet;
			var _state2 = this.state,
			    isEnd = _state2.isEnd,
			    currentPage = _state2.currentPage,
			    totalPage = _state2.totalPage,
			    itemArr = _state2.itemArr,
			    itemObj = _state2.itemObj,
			    selectArr = _state2.selectArr,
			    resetPage = _state2.resetPage;

			return _react2.default.createElement(
				'div',
				{ className: '__imgs' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_PathsEdit2.default, {
						paths: paths,
						pathSelect: pathSelect,
						onSet: onSet
					}),
					_react2.default.createElement(_UpLoad2.default, null)
				),
				_react2.default.createElement(
					_index2.default,
					{
						className: '__no-pd',
						style: { height: '100%' },
						title: [],
						tHide: true,
						isEnd: isEnd,
						curPage: currentPage,
						totalPage: totalPage,

						loadDataForPaging: this.loadDataForPaging,
						resetPrvScrollTop: currentPage,
						resetPage: resetPage
					},
					_react2.default.createElement(_List2.default, {
						itemArr: itemArr[currentPage] || [],
						itemObj: itemObj,
						selectArr: selectArr,
						actions: this.actions
					}),
					_react2.default.createElement(_ImgsEdit2.default, {
						selectArr: selectArr,
						actions: this.actions
					})
				)
			);
		}
	}]);
	return Imgs;
}(_react.Component);

Imgs.propTypes = {};

exports.default = Imgs;