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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Btn = function (_Component) {
	(0, _inherits3.default)(Btn, _Component);

	function Btn(props, context) {
		(0, _classCallCheck3.default)(this, Btn);
		return (0, _possibleConstructorReturn3.default)(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this, props, context));
	}

	(0, _createClass3.default)(Btn, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: '__btns' },
				_react2.default.createElement(
					_button2.default,
					{ onClick: function onClick(e) {
							return _this2.props.onClose();
						} },
					'\u53D6\u6D88'
				),
				_react2.default.createElement(
					_button2.default,
					{
						onClick: function onClick(e) {
							return _this2.props.onSure();
						},
						type: 'primary',
						style: { margin: '0 8px' }
					},
					'\u786E\u5B9A'
				)
			);
		}
	}]);
	return Btn;
}(_react.Component);

Btn.propTypes = {};

exports.default = Btn;