'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DebounceClick = function (_PureComponent) {
	(0, _inherits3.default)(DebounceClick, _PureComponent);

	function DebounceClick() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, DebounceClick);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DebounceClick.__proto__ || Object.getPrototypeOf(DebounceClick)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (onClick) {
			var wait = _this.props.wait;

			if (onClick) {
				return (0, _lodash.debounce)(onClick, wait);
			}
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(DebounceClick, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    Tag = _props.tag,
			    children = _props.children,
			    onClick = _props.onClick,
			    rest = (0, _objectWithoutProperties3.default)(_props, ['tag', 'children', 'onClick']);


			return _react2.default.createElement(
				Tag,
				(0, _extends3.default)({}, rest, {
					onClick: this.handleClick(onClick)
				}),
				children
			);
		}
	}]);
	return DebounceClick;
}(_react.PureComponent); /**
                          * 防抖Button
                          */


DebounceClick.propTypes = {
	wait: _propTypes2.default.number,
	tag: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};
DebounceClick.defaultProps = {
	wait: 250,
	tag: 'div'
};

exports.default = DebounceClick;