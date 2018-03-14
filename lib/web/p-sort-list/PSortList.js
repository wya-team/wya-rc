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

var _utils = require('../utils/utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./PSortList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PSortList = function (_Component) {
	(0, _inherits3.default)(PSortList, _Component);

	function PSortList(props) {
		(0, _classCallCheck3.default)(this, PSortList);

		// init
		var _this = (0, _possibleConstructorReturn3.default)(this, (PSortList.__proto__ || Object.getPrototypeOf(PSortList)).call(this, props));

		_this.setItems = function (list) {
			return list.map(function (item) {
				return {
					id: (0, _utils.getUid)(),
					itemData: item,
					visibility: false
				};
			});
		};

		_this.handleClick = function (current) {
			_this.setState({
				list: _this.getSortList(current)
			});
		};

		_this.getSortList = function (current) {
			var id = current.id,
			    index = current.index,
			    type = current.type; // id:移动对象，i：目标位置，type：类型

			var list = _this.state.list;

			var arr = list.filter(function (item) {
				return item.id != id;
			});
			switch (type) {
				case 'left':
					arr.splice(index - 1, 0, list[index]);
					break;
				case 'right':
					arr.splice(index + 1, 0, list[index]);
					break;
				case 'drag':
					var id_i = list.findIndex(function (item) {
						return item.id === id;
					}); // 这个id元素对应的下标
					arr.splice(index, 0, list[id_i]);
					break;
				default:
					// 删除
					break;
			}
			_this.props.onChange && _this.props.onChange(arr.map(function (item) {
				return item.itemData;
			}));
			return arr;
		};

		_this.handleDragStart = function (e) {
			var list = _this.state.list;

			// 火狐bug，需要设置setData，之后drag才能正常工作

			e.dataTransfer.setData('text', e.target.innerHTML);
			e.dataTransfer.effectAllowed = "move";

			var id = e.target.id;

			_this.eleDrag = e.target;
			setTimeout(function () {
				_this.setState({
					list: list.map(function (item) {
						if (item.id === id) {
							return (0, _extends3.default)({}, item, {
								visibility: true
							});
						}
						return item;
					})
				});
			}, 0);
			return true;
		};

		_this.handleDragEnter = function (e, index) {
			var id = _this.eleDrag.id;

			_this.setState({
				list: _this.getSortList({ id: id, index: index, type: 'drag' })
			});
			return true;
		};

		_this.handleDragEnd = function (e) {
			e.dataTransfer.clearData("text");
			_this.eleDrag = null;
			_this.setState({
				list: _this.state.list.map(function (item) {
					return (0, _extends3.default)({}, item, {
						visibility: false
					});
				})
			});
			return false;
		};

		_this.getDataSource = function () {
			return _this.state.list;
		};

		var dataSource = _this.props.dataSource;

		_this.state = {
			list: _this.setItems(dataSource)
		};

		// target
		_this.eleDrag = null;
		return _this;
	}

	(0, _createClass3.default)(PSortList, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var dataSource = nextProps.dataSource;
			var _dataSource = this.props.dataSource;

			if (JSON.stringify(dataSource) != JSON.stringify(_dataSource)) {
				this.setState({
					list: this.setItems(dataSource)
				});
			}
		}
		/**
   * 点击遮罩上的按钮
   */


		/**
   * 获取左移、右移、拖拽、删除后的列表
   */


		/**
   * 拖拽开始
   */


		/**
   * 拖拽元素进入目标元素头上的时候
   */


		/**
   * 拖拽结束
   */

	}, {
		key: 'renderMask',
		value: function renderMask(id, index) {
			var _this2 = this;

			var list = this.state.list;

			return _react2.default.createElement(
				'div',
				{ className: '__mask' },
				index !== 0 ? _react2.default.createElement(
					'span',
					{ onClick: function onClick() {
							return _this2.handleClick({ id: id, index: index, type: 'left' });
						} },
					'\u276E'
				) : _react2.default.createElement('span', null),
				_react2.default.createElement(
					'span',
					{ onClick: function onClick() {
							return _this2.handleClick({ id: id, index: index, type: 'delete' });
						} },
					'\u2716'
				),
				index !== this.state.list.length - 1 ? _react2.default.createElement(
					'span',
					{ onClick: function onClick() {
							return _this2.handleClick({ id: id, index: index, type: 'right' });
						} },
					'\u276F'
				) : _react2.default.createElement('span', null)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state$list = this.state.list,
			    list = _state$list === undefined ? [] : _state$list;
			var _props = this.props,
			    renderRow = _props.renderRow,
			    Tag = _props.tag,
			    style = _props.style,
			    className = _props.className;

			return _react2.default.createElement(
				'div',
				{ className: 'rcp-sort-list' + (className ? ' ' + className : ""), style: (0, _extends3.default)({}, style) },
				list.length > 0 && list.map(function (item, index) {
					var id = item.id,
					    visibility = item.visibility,
					    itemData = item.itemData;
					var background = itemData.background,
					    text = itemData.text;

					return _react2.default.createElement(
						Tag,
						{
							key: id,
							id: id,
							draggable: !0,
							onDragStart: _this3.handleDragStart,
							onDragEnd: _this3.handleDragEnd,
							onDragEnter: function onDragEnter(e) {
								return _this3.handleDragEnter(e, index);
							},
							style: { visibility: visibility ? 'hidden' : 'unset' }
						},
						(0, _react.createElement)(renderRow, (0, _extends3.default)({}, item)),
						_this3.renderMask(id, index)
					);
				})
			);
		}
	}]);
	return PSortList;
}(_react.Component);

PSortList.propTypes = {
	dataSource: _propTypes2.default.array,
	onChange: _propTypes2.default.func,
	tag: _propTypes2.default.string
};
PSortList.defaultProps = {
	tag: 'div'
};
exports.default = PSortList;