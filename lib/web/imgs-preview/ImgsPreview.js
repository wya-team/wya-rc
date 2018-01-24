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

var ImgsPreview = function (_Component) {
	(0, _inherits3.default)(ImgsPreview, _Component);

	function ImgsPreview(props, context) {
		(0, _classCallCheck3.default)(this, ImgsPreview);
		return (0, _possibleConstructorReturn3.default)(this, (ImgsPreview.__proto__ || Object.getPrototypeOf(ImgsPreview)).call(this, props, context));
	}

	(0, _createClass3.default)(ImgsPreview, [{
		key: 'render',
		value: function render() {
			var style = this.props.style;

			return _react2.default.createElement(
				'div',
				{ className: 'ImgsPreview', style: style },
				'ImgsPreview'
			);
		}
	}]);
	return ImgsPreview;
}(_react.Component);

ImgsPreview.propTypes = {
	style: _propTypes2.default.object
};
ImgsPreview.defaultProps = {
	style: {}
};
exports.default = ImgsPreview;