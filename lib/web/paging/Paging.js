'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pagination = require('antd/lib/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('antd/lib/pagination/style');

require('antd/lib/spin/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Paging.scss');

var _SelectionCheckboxAll = require('./SelectionCheckboxAll');

var _SelectionCheckboxAll2 = _interopRequireDefault(_SelectionCheckboxAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paging = function (_Component) {
	(0, _inherits3.default)(Paging, _Component);

	function Paging(props, context) {
		(0, _classCallCheck3.default)(this, Paging);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props, context));

		_this.handleCheckAll = function () {
			var _this$props = _this.props,
			    rowSelection = _this$props.rowSelection,
			    curPage = _this$props.curPage,
			    dataSource = _this$props.dataSource;

			if (!rowSelection) {
				console.error('当前不属于可选择状态');
				return;
			}
			var _dataSource$itemObj = dataSource.itemObj,
			    itemObj = _dataSource$itemObj === undefined ? {} : _dataSource$itemObj;
			var onChange = rowSelection.onChange;

			var selectedRowKeys = [],
			    selectedRows = [];
			var curPageCheck = _this.state.checkArr[curPage] || {};
			for (var i = 0; i < _this.changeableRows.length; i++) {
				if (!curPageCheck[_this.changeableRows[i]]) {
					// 未选中
					var checkedRows = _this.handleSetSelect('check');
					for (var key in checkedRows) {
						if (checkedRows[key]) {
							selectedRowKeys.push(key);
							selectedRows.push(itemObj[key]);
						}
					}
					onChange && onChange(selectedRowKeys, selectedRows);
					return;
				}
			}
			_this.handleSetSelect('uncheck');
			onChange && onChange([], []);
			return;
		};

		_this.handleSetSelect = function (type) {
			var curPage = _this.props.curPage;

			var checkArr = {};
			for (var i = 0; i < _this.changeableRows.length; i++) {
				checkArr[_this.changeableRows[i]] = type === 'check';
			}

			_this.setState({
				checkArr: (0, _extends6.default)({}, _this.state.checkArr, (0, _defineProperty3.default)({}, curPage, (0, _extends6.default)({}, checkArr)))
			});
			return checkArr;
		};

		_this.handleSelectChange = function (event, item) {
			var _this$props2 = _this.props,
			    rowSelection = _this$props2.rowSelection,
			    curPage = _this$props2.curPage,
			    dataSource = _this$props2.dataSource;
			var _dataSource$itemObj2 = dataSource.itemObj,
			    itemObj = _dataSource$itemObj2 === undefined ? {} : _dataSource$itemObj2;
			var onChange = rowSelection.onChange;

			var selectedRowKeys = [],
			    selectedRows = [];
			_this.setState({
				checkArr: (0, _extends6.default)({}, _this.state.checkArr, (0, _defineProperty3.default)({}, curPage, (0, _extends6.default)({}, _this.state.checkArr[curPage], (0, _defineProperty3.default)({}, item, event.target.checked))))
			}, function () {
				for (var key in _this.state.checkArr[curPage]) {
					if (_this.state.checkArr[curPage][key]) {
						selectedRowKeys.push(key);
						selectedRows.push(itemObj[key]);
					}
				}
				onChange && onChange(selectedRowKeys, selectedRows);
			});
		};

		_this.renderTBody = function () {
			var _this$props3 = _this.props,
			    rowSelection = _this$props3.rowSelection,
			    curPage = _this$props3.curPage,
			    dataSource = _this$props3.dataSource,
			    renderRow = _this$props3.renderRow,
			    actions = _this$props3.actions,
			    rowProps = _this$props3.rowProps,
			    tHide = _this$props3.tHide,
			    listClassName = _this$props3.listClassName;
			var _dataSource$itemArr = dataSource.itemArr,
			    itemArr = _dataSource$itemArr === undefined ? {} : _dataSource$itemArr,
			    _dataSource$itemObj3 = dataSource.itemObj,
			    itemObj = _dataSource$itemObj3 === undefined ? {} : _dataSource$itemObj3;

			var curRowData = itemArr[curPage] || [];
			_this.changeableRows = [curRowData];
			if (rowSelection) {
				_this.changeableRows = curRowData.filter(function (item, i) {
					return !rowSelection.getCheckboxProps(itemObj[item]).disabled;
				});
			}
			var Tag = 'tbody';
			if (tHide) {
				Tag = 'div';
			}
			return _react2.default.createElement(
				Tag,
				{ className: listClassName || "" },
				curRowData.map(function (item, index) {
					if (rowSelection) {
						var checked = void 0;
						if (_this.state.checkArr[curPage] && !rowSelection.getCheckboxProps(itemObj[item]).disabled) {
							checked = _this.state.checkArr[curPage][item];
						} else {
							checked = rowSelection.getCheckboxProps(itemObj[item]).checked;
						}

						return _react2.default.createElement(renderRow, (0, _extends6.default)({
							key: index,
							rowSelection: {
								disabled: rowSelection.getCheckboxProps(itemObj[item]).disabled,
								checked: checked,
								onChange: function onChange(e) {
									_this.handleSelectChange(e, item);
								}
							},
							itemData: itemObj[item],
							actions: actions
						}, rowProps));
					}
					return _react2.default.createElement(renderRow, (0, _extends6.default)({
						itemData: itemObj[item],
						key: index,
						actions: actions
					}, rowProps));
				})
			);
		};

		_this.renderTable = function () {
			var _this$props4 = _this.props,
			    rowSelection = _this$props4.rowSelection,
			    title = _this$props4.title,
			    tHide = _this$props4.tHide,
			    curPage = _this$props4.curPage,
			    children = _this$props4.children,
			    dataSource = _this$props4.dataSource;
			var _dataSource$itemArr2 = dataSource.itemArr,
			    itemArr = _dataSource$itemArr2 === undefined ? {} : _dataSource$itemArr2,
			    _dataSource$itemObj4 = dataSource.itemObj,
			    itemObj = _dataSource$itemObj4 === undefined ? {} : _dataSource$itemObj4;

			var curRowData = itemArr[curPage] || [];
			var columns = [].concat((0, _toConsumableArray3.default)(title));
			if (rowSelection) {
				_this.changeableRows = curRowData.filter(function (item, i) {
					return !rowSelection.getCheckboxProps(itemObj[item]).disabled;
				});
				columns.unshift(_react2.default.createElement(_SelectionCheckboxAll2.default, {
					data: _this.state.checkArr[curPage],
					onChange: _this.handleCheckAll,
					changeableRows: _this.changeableRows
				}));
			}
			if (tHide) return _this.renderTBody();
			return _react2.default.createElement(
				'table',
				{ className: '__table' },
				_react2.default.createElement(
					'thead',
					null,
					_react2.default.createElement(
						'tr',
						null,
						columns.map(function (item, index) {
							return _react2.default.createElement(
								'th',
								{ key: index },
								item
							);
						})
					)
				),
				_this.renderTBody()
			);
		};

		_this.state = {
			checkArr: {}
		};
		_this.wrapper = props.wrapper;
		_this.bindScroll = _this.bindScroll.bind(_this);
		_this.handleChange = _this.handleChange.bind(_this);
		_this.loadDataFirst = _this.loadDataFirst.bind(_this);
		_this.changeableRows = [];
		return _this;
	}

	(0, _createClass3.default)(Paging, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isEnd === 0) {
				// 禁用，加载完成或者加载中无视
				this.loadDataFirst(this.props);
			}
			this.bindScroll();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.resetPrvScrollTop && nextProps.resetPrvScrollTop != this.props.resetPrvScrollTop) {
				this.prvScrollTop = 0;
				this.scrollContainer.scrollTop = 0; // 置顶
			}
			if (nextProps.isEnd === 0) {
				// 禁用，加载完成或者加载中无视
				this.loadDataFirst(nextProps);
			}
		}
	}, {
		key: 'componentDidCatch',
		value: function componentDidCatch(error, info) {
			console.log(error, info);
		}
	}, {
		key: 'handleChange',
		value: function handleChange(pages) {
			this.props.loadDataForPaging && this.props.loadDataForPaging(pages);
		}
	}, {
		key: 'bindScroll',
		value: function bindScroll() {
			this.scrollContainer = this.wrapper ? document.querySelector(this.wrapper) : document.body;
		}
	}, {
		key: 'loadDataFirst',
		value: function loadDataFirst() {
			var curProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			// 第一次请求
			var isEnd = curProps.isEnd,
			    curPage = curProps.curPage,
			    loadDataForPaging = curProps.loadDataForPaging;

			if (curPage == 0) {
				// 这里使用this.props.curPage
				var nextPage = this.props.resetPage == curProps.resetPage ? this.props.curPage : 1;
				loadDataForPaging && loadDataForPaging(nextPage);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    isEnd = _props.isEnd,
			    title = _props.title,
			    _props$style = _props.style,
			    style = _props$style === undefined ? {} : _props$style,
			    className = _props.className,
			    curPage = _props.curPage,
			    totalPage = _props.totalPage,
			    children = _props.children,
			    tHide = _props.tHide,
			    pagination = (0, _objectWithoutProperties3.default)(_props, ['isEnd', 'title', 'style', 'className', 'curPage', 'totalPage', 'children', 'tHide']);

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)("c-paging", className), style: (0, _extends6.default)({}, style) },
				_react2.default.createElement(
					'div',
					{ className: '__conent' },
					this.renderTable()
				),
				isEnd === 1 && _react2.default.createElement(_spin2.default, null),
				isEnd === 3 && _react2.default.createElement(
					'div',
					{ className: '__error' },
					'\u52A0\u8F7D\u5931\u8D25...'
				),
				_react2.default.createElement(
					'div',
					{ className: '__footer' },
					_react2.default.createElement(
						'div',
						{ className: '__left' },
						children
					),
					_react2.default.createElement(_pagination2.default, (0, _extends6.default)({}, pagination, {
						showQuickJumper: true,
						defaultPageSize: 1,
						current: curPage,
						total: totalPage,
						onChange: this.handleChange
					}))
				)
			);
		}
	}]);
	return Paging;
}(_react.Component);

Paging.propTypes = {
	title: _propTypes2.default.array,
	className: _propTypes2.default.string,
	isEnd: _propTypes2.default.number.isRequired,
	curPage: _propTypes2.default.number.isRequired,
	totalPage: _propTypes2.default.number.isRequired,
	loadDataForPaging: _propTypes2.default.func.isRequired,
	resetPrvScrollTop: _propTypes2.default.number,
	resetPage: _propTypes2.default.string,
	tHide: _propTypes2.default.bool,
	rowSelection: _propTypes2.default.object,
	dataSource: _propTypes2.default.object,
	renderRow: _propTypes2.default.func.isRequired,
	rowProps: _propTypes2.default.object,
	actions: _propTypes2.default.object
};
Paging.defaultProps = {
	title: [],
	tHide: false,
	className: '__defalut',
	rowSelection: null,
	dataSource: {}
};
exports.default = Paging;