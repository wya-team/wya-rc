'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

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
		return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props, context));
	}

	(0, _createClass3.default)(Item, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectItem = _props.selectItem,
			    onSure = _props.onSure;

			var onClick = selectItem ? function () {
				return onSure && onSure(selectItem);
			} : null;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_button2.default,
					{
						type: selectItem.file_id ? 'primary' : '',
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