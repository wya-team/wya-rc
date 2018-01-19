'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _main = require('../../../main.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Basic = function (_Component) {
	(0, _inherits3.default)(Basic, _Component);

	function Basic(props, context) {
		(0, _classCallCheck3.default)(this, Basic);
		return (0, _possibleConstructorReturn3.default)(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this, props, context));
	}

	(0, _createClass3.default)(Basic, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_main.Copy,
				{ value: 'test' },
				_react2.default.createElement(
					'button',
					null,
					'\u70B9\u6211\u590D\u5236'
				)
			);
		}
	}]);
	return Basic;
}(_react.Component);

exports.default = Basic;