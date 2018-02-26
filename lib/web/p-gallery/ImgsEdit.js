'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

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

require('antd/lib/button/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function (_Component) {
	(0, _inherits3.default)(Item, _Component);

	function Item(props, context) {
		(0, _classCallCheck3.default)(this, Item);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props, context));

		_this.handleSure = function () {
			var arr = [];
			var _this$props = _this.props,
			    selectObj = _this$props.selectObj,
			    selectArr = _this$props.selectArr,
			    max = _this$props.max;

			selectArr.map(function (item, index) {
				if (max == 0 || index < max) {
					arr = [].concat((0, _toConsumableArray3.default)(arr), [selectObj[item]]);
				}
			});
			_this.props.onSure && _this.props.onSure(arr);
		};

		return _this;
	}

	(0, _createClass3.default)(Item, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectArr = _props.selectArr,
			    selectObj = _props.selectObj;

			var onClick = selectArr.length > 0 ? this.handleSure : null;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_button2.default,
					{
						type: selectArr.length > 0 ? 'primary' : '',
						onClick: onClick
					},
					'\u4F7F\u7528\u9009\u4E2D\u56FE\u7247'
				)
			);
		}
	}]);
	return Item;
}(_react.Component);

Item.propTypes = {};

exports.default = Item;