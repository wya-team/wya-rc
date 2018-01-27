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

var UpLoad = function (_Component) {
	(0, _inherits3.default)(UpLoad, _Component);

	function UpLoad(props, context) {
		(0, _classCallCheck3.default)(this, UpLoad);
		return (0, _possibleConstructorReturn3.default)(this, (UpLoad.__proto__ || Object.getPrototypeOf(UpLoad)).call(this, props, context));
	}

	(0, _createClass3.default)(UpLoad, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_button2.default,
				{ type: 'primary', style: { float: 'right' } },
				'\u4E0A\u4F20'
			);
		}
	}]);
	return UpLoad;
}(_react.Component);

UpLoad.propTypes = {};

exports.default = UpLoad;