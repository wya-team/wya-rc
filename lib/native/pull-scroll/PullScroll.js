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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Core = require('./Core');

var _Core2 = _interopRequireDefault(_Core);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PullScroll = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(PullScroll, _Component);

	function PullScroll(props, context) {
		(0, _classCallCheck3.default)(this, PullScroll);

		var _this = (0, _possibleConstructorReturn3.default)(this, (PullScroll.__proto__ || Object.getPrototypeOf(PullScroll)).call(this, props, context));

		_initialiseProps.call(_this);

		var _this$props = _this.props,
		    itemArr = _this$props.itemArr,
		    withSections = _this$props.withSections,
		    rowHasChanged = _this$props.rowHasChanged;

		var ds = null;
		var state = {};
		if (withSections === true) {
			ds = new _reactNative.ListView.DataSource({
				rowHasChanged: rowHasChanged || function (row1, row2) {
					return row1 !== row2;
				},
				sectionHeaderHasChanged: function sectionHeaderHasChanged(section1, section2) {
					return section1 !== section2;
				}
			});
			state = {
				dataSource: ds.cloneWithRowsAndSections(itemArr),
				pullStatus: 0
			};
		} else {
			ds = new _reactNative.ListView.DataSource({
				rowHasChanged: rowHasChanged || function (row1, row2) {
					return row1 !== row2;
				}
			});
			state = {
				dataSource: ds.cloneWithRows(itemArr),
				pullStatus: 0
			};
		}
		_this.state = (0, _extends3.default)({}, state);
		return _this;
	}

	(0, _createClass3.default)(PullScroll, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.itemArr != this.props.itemArr) {
				this.updateRows(nextProps);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    pullStatus = _state.pullStatus,
			    dataSource = _state.dataSource;

			return _react2.default.createElement(_Core2.default, (0, _extends3.default)({}, this.props, {
				pullStatus: pullStatus,
				onPullStatusChange: this.handlePullStatusChange,
				dataSource: dataSource,
				renderRow: this.renderRow
			}));
		}
	}]);
	return PullScroll;
}(_react.Component), _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.setDefault = function () {
		_this2.setState({
			pullStatus: 0
		});
	};

	this.updateRows = function (nextProps) {
		var itemArr = nextProps.itemArr; // 可能存在性能问题，官方建议使用concat 而非push

		if (itemArr !== null) {
			if (nextProps.withSections === true) {
				_this2.setState({
					dataSource: _this2.state.dataSource.cloneWithRowsAndSections(itemArr),
					pullStatus: 0
				});
			} else {
				_this2.setState({
					dataSource: _this2.state.dataSource.cloneWithRows(itemArr)
				});
			}
		} else {
			_this2.setState({
				pullStatus: 0
			});
		}
	};

	this.handlePullStatusChange = function () {
		_this2.setState({
			pullStatus: 1
		});
	};

	this.renderRow = function (id) {
		var _props = _this2.props,
		    renderRow = _props.renderRow,
		    actions = _props.actions,
		    opts = _props.opts,
		    itemObj = _props.itemObj;

		return (0, _react.createElement)(renderRow, {
			id: id,
			itemData: itemObj[id],
			actions: actions,
			opts: opts
		});
	};
}, _temp);

PullScroll.propTypes = {
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
  * 2. Sections头部
  * 3. 是否启动Sections
  */
	renderHeader: _propTypes2.default.func,
	renderSectionHeader: _propTypes2.default.func,
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
	/**
  * 是否运行组件，默认true，关联到触发加载数据的问题
  */
	show: _propTypes2.default.bool
};
PullScroll.defaultProps = {
	scroll: true,
	pull: true,
	renderHeader: null,
	renderSectionHeader: null,
	scrollEnabled: true,
	loadDataForPull: function loadDataForPull() {},
	loadDataForScroll: function loadDataForScroll() {},
	show: true
};
exports.default = PullScroll;