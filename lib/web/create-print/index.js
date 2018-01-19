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

var _CreatePrint = require('./CreatePrint');

var _CreatePrint2 = _interopRequireDefault(_CreatePrint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisplayName = function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
// decorator

exports.default = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return function (WrappedComponent) {
		return function (_Component) {
			(0, _inherits3.default)(CreateEchartsDecorated, _Component);

			function CreateEchartsDecorated() {
				(0, _classCallCheck3.default)(this, CreateEchartsDecorated);

				var _this = (0, _possibleConstructorReturn3.default)(this, (CreateEchartsDecorated.__proto__ || Object.getPrototypeOf(CreateEchartsDecorated)).call(this));

				_this.displayName = 'CreateEcharts' + getDisplayName(WrappedComponent);
				return _this;
			}

			(0, _createClass3.default)(CreateEchartsDecorated, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement(
						_CreatePrint2.default,
						options,
						_react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, { ref: 'WrappedComponent' }))
					);
				}
			}]);
			return CreateEchartsDecorated;
		}(_react.Component);
	};
};