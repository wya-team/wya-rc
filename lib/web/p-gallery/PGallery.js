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

var PGallery = function (_Component) {
	(0, _inherits3.default)(PGallery, _Component);

	function PGallery(props, context) {
		(0, _classCallCheck3.default)(this, PGallery);
		return (0, _possibleConstructorReturn3.default)(this, (PGallery.__proto__ || Object.getPrototypeOf(PGallery)).call(this, props, context));
	}

	(0, _createClass3.default)(PGallery, [{
		key: 'render',
		value: function render() {
			var style = this.props.style;

			return _react2.default.createElement(
				'div',
				{ className: 'PGallery', style: style },
				'PGallery'
			);
		}
	}]);
	return PGallery;
}(_react.Component);

PGallery.propTypes = {
	style: _propTypes2.default.object
};
PGallery.defaultProps = {
	style: {}
};
exports.default = PGallery;