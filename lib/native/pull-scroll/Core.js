'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
	// 分割线，高度为 0 
	separator: {
		height: 0,
		backgroundColor: '#ccc'
	},
	actionsLabel: {
		fontSize: 20
	},
	ScrollStatusView: {
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF'
	},
	emptyView: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	emptyViewTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 15
	}
};

var Core = function (_Component) {
	(0, _inherits3.default)(Core, _Component);

	function Core() {
		var _ref;

		(0, _classCallCheck3.default)(this, Core);

		for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
			params[_key] = arguments[_key];
		}

		var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Core.__proto__ || Object.getPrototypeOf(Core)).call.apply(_ref, [this].concat(params)));

		_this.scrollEmptyView = function (refreshCallback) {
			return _react2.default.createElement(
				_reactNative.View,
				{ style: [defaultStyles.emptyView] },
				_react2.default.createElement(
					_reactNative.Text,
					{ style: [defaultStyles.emptyViewTitle] },
					'\u6CA1\u6709\u5185\u5BB9\uFF0C\u70B9\u51FB\u6211\u5237\u65B0'
				),
				_react2.default.createElement(
					_reactNative.TouchableHighlight,
					{
						underlayColor: '#c8c7cc',
						onPress: refreshCallback
					},
					_react2.default.createElement(
						_reactNative.Text,
						null,
						'\u21BB'
					)
				)
			);
		};

		_this.handleScroll = function () {
			if (!_this.props.show || _this.props.isEnd == 2) {
				return;
			}
			_this.props.srcoll && _this.props.loadDataForScroll && _this.props.loadDataForScroll();
		};

		_this.renderScrollStatusView = function () {
			var _this$props = _this.props,
			    isEnd = _this$props.isEnd,
			    scroll = _this$props.scroll,
			    curPage = _this$props.curPage;

			if (isEnd === 0 && scroll === true || curPage == 0) {
				// return this.renderScrollFetchingView();
			} else if (isEnd === 1 && scroll === true) {
				return _this.renderScrollWaitingView();
			} else if (isEnd === 2 && scroll === true) {
				return _this.renderScrollAllLoadedView();
			} else if (isEnd === 3 && scroll === true) {
				return _this.renderScrollEmptyView();
			} else {
				return null;
			}
		};

		_this.renderScrollFetchingView = function () {
			var _this$props2 = _this.props,
			    show = _this$props2.show,
			    loadDataForScroll = _this$props2.loadDataForScroll;

			return _react2.default.createElement(
				_reactNative.TouchableHighlight,
				{
					underlayColor: '#c8c7cc',
					onPress: function onPress() {
						return show && loadDataForScroll();
					},
					style: [defaultStyles.ScrollStatusView]
				},
				_react2.default.createElement(
					_reactNative.Text,
					{ style: [defaultStyles.actionsLabel] },
					'\u52A0\u8F7D\u66F4\u591A'
				)
			);
		};

		_this.renderScrollAllLoadedView = function () {
			return _react2.default.createElement(
				_reactNative.View,
				{ style: [defaultStyles.ScrollStatusView] },
				_react2.default.createElement(
					_reactNative.Text,
					{ style: [defaultStyles.actionsLabel] },
					'~'
				)
			);
		};

		_this.renderScrollWaitingView = function () {
			return _react2.default.createElement(
				_reactNative.View,
				{ style: [defaultStyles.ScrollStatusView] },
				_react2.default.createElement(_reactNative.ActivityIndicator, {
					animating: true,
					size: 'small',
					color: 'gray'
				})
			);
		};

		_this.renderPull = function () {
			var _this$props3 = _this.props,
			    show = _this$props3.show,
			    onPullStatusChange = _this$props3.onPullStatusChange,
			    loadDataForPull = _this$props3.loadDataForPull;

			return _react2.default.createElement(_reactNative.RefreshControl, {
				onRefresh: function onRefresh() {
					return show && (onPullStatusChange(), loadDataForPull());
				},
				refreshing: !!_this.props.pullStatus
			});
		};

		_this.renderSeparator = function () {
			if (_this.props.renderSeparator) {
				return _this.props.renderSeparator();
			}

			return _react2.default.createElement(_reactNative.View, { style: [defaultStyles.separator] });
		};

		return _this;
	}

	(0, _createClass3.default)(Core, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;

			this.prvScrollTop = 0; // 这里可考虑设置全局的量来控制

			this.loadFirst(this.props);
		}
		// state change refresh

	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.loadFirst(nextProps);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'loadFirst',
		value: function loadFirst($props) {
			if (!$props.show || $props.isEnd > 0) {
				// 禁用，加载完成或者加载中无视
				return false;
			}
			if ($props.curPage == 0) {
				$props.loadDataForScroll && $props.loadDataForScroll();
				/**
     * 重新清理下高度参数
     */
				this.prvScrollTop = 0;
			}
		}
		// isEnd 0, 1, 2, 3 状态数据

		// 加载更多

		// 全部加载

		// 加载中

		// 下拉刷新样式

		// 分割线显示

	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    dataSource = _props.dataSource,
			    renderRow = _props.renderRow,
			    renderSectionHeader = _props.renderSectionHeader,
			    renderHeader = _props.renderHeader,
			    scrollEnabled = _props.scrollEnabled,
			    pull = _props.pull,
			    style = _props.style;
			// 可以使用 https://github.com/sghiassy/react-native-sglistview 强化内存管理

			return _react2.default.createElement(_reactNative.ListView, (0, _extends3.default)({
				ref: 'listview',
				dataSource: dataSource,
				renderRow: renderRow,
				renderSectionHeader: renderSectionHeader || null,
				renderHeader: renderHeader || null,
				renderFooter: this.renderScrollStatusView,
				renderSeparator: this.renderSeparator,

				automaticallyAdjustContentInsets: false,
				scrollEnabled: scrollEnabled,
				canCancelContentTouches: true,
				enableEmptySections: true,
				refreshControl: !!pull ? this.renderPull() : null,
				style: style || {},

				onEndReached: this.handleScroll,
				onEndReachedThreshold: 100
			}, this.props));
		}
	}]);
	return Core;
}(_react.Component);

;

Core.propTypes = {
	/**
  * 1. 启用上滑加载
  * 2. 是否可滚动
  */
	scroll: _propTypes2.default.bool,
	scrollEnabled: _propTypes2.default.bool,
	/**
  * 1. 启用下拉刷新
  * 2. 下拉状态
  */
	pull: _propTypes2.default.bool,
	pullStatus: _propTypes2.default.number,
	/**
  * 渲染
  * 1. 头部
  * 2. 分组头部
  * 3. Item
  */
	renderHeader: _propTypes2.default.func,
	renderSectionHeader: _propTypes2.default.func,
	renderRow: _propTypes2.default.func,
	/**
  * 数据相关
  * 1. 下拉刷新
  * 2. 上滑加载
  * 3. 状态
  * 4. 是否是第一次加载
  * 5. 列表数据
  */
	loadDataForPull: _propTypes2.default.func,
	loadDataForScroll: _propTypes2.default.func,
	isEnd: _propTypes2.default.number,
	curPage: _propTypes2.default.number,
	dataSource: _propTypes2.default.object,
	/**
  * 是否运行组件，默认true，关联到触发加载数据的问题
  */
	show: _propTypes2.default.bool
};
Core.defaultProps = {
	scroll: true,
	pull: true,
	renderHeader: null,
	renderSectionHeader: null,
	renderRow: null,
	scrollEnabled: true,
	loadDataForPull: function loadDataForPull() {},
	loadDataForScroll: function loadDataForScroll() {},
	dataSource: [],
	show: true
};
exports.default = Core;