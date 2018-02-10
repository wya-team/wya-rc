'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _localeProvider = require('antd/lib/locale-provider');

var _localeProvider2 = _interopRequireDefault(_localeProvider);

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

require('antd/lib/locale-provider/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _zh_CN = require('antd/lib/locale-provider/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisplayName = function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
// decorator

exports.default = function () {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return function (WrappedComponent) {
		return function (_Component) {
			(0, _inherits3.default)(CreateLanguageDecorated, _Component);

			function CreateLanguageDecorated() {
				(0, _classCallCheck3.default)(this, CreateLanguageDecorated);

				var _this = (0, _possibleConstructorReturn3.default)(this, (CreateLanguageDecorated.__proto__ || Object.getPrototypeOf(CreateLanguageDecorated)).call(this));

				_this.displayName = 'CreateLanguage' + getDisplayName(WrappedComponent);
				return _this;
			}

			(0, _createClass3.default)(CreateLanguageDecorated, [{
				key: 'render',
				value: function render() {
					opts = (0, _extends3.default)({ locale: _zh_CN2.default }, opts);
					return _react2.default.createElement(
						_localeProvider2.default,
						opts,
						_react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, { ref: 'WrappedComponent' }))
					);
				}
			}]);
			return CreateLanguageDecorated;
		}(_react.Component);
	};
};