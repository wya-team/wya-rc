"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_Component) {
	(0, _inherits3.default)(Header, _Component);

	function Header(props, context) {
		(0, _classCallCheck3.default)(this, Header);
		return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props, context));
	}

	(0, _createClass3.default)(Header, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "__header" },
				_react2.default.createElement(
					"div",
					null,
					"\u6211\u7684\u7D20\u6750"
				),
				_react2.default.createElement(
					"div",
					null,
					"X"
				)
			);
		}
	}]);
	return Header;
}(_react.Component);

Header.propTypes = {};

exports.default = Header;