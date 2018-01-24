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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MTouch = function (_Component) {
	(0, _inherits3.default)(MTouch, _Component);

	function MTouch(props, context) {
		(0, _classCallCheck3.default)(this, MTouch);
		return (0, _possibleConstructorReturn3.default)(this, (MTouch.__proto__ || Object.getPrototypeOf(MTouch)).call(this, props, context));
	}

	(0, _createClass3.default)(MTouch, [{
		key: 'render',
		value: function render() {
			var style = this.props.style;

			return _react2.default.createElement(
				'div',
				{ className: 'MTouch', style: style },
				'MTouch'
			);
		}
	}]);
	return MTouch;
}(_react.Component);

MTouch.propTypes = {
	style: _propTypes2.default.object
};
MTouch.defaultProps = {
	style: {}
};
exports.default = MTouch;