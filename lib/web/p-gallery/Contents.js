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

var _Paths = require('./Paths');

var _Paths2 = _interopRequireDefault(_Paths);

var _Imgs = require('./Imgs');

var _Imgs2 = _interopRequireDefault(_Imgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contents = function (_Component) {
	(0, _inherits3.default)(Contents, _Component);

	function Contents(props, context) {
		(0, _classCallCheck3.default)(this, Contents);
		return (0, _possibleConstructorReturn3.default)(this, (Contents.__proto__ || Object.getPrototypeOf(Contents)).call(this, props, context));
	}

	(0, _createClass3.default)(Contents, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    paths = _props.paths,
			    pathSelect = _props.pathSelect,
			    onSet = _props.onSet,
			    onSure = _props.onSure,
			    request = _props.request,
			    url = _props.url,
			    max = _props.max;

			return _react2.default.createElement(
				'div',
				{ className: '__contents' },
				_react2.default.createElement(_Paths2.default, {
					paths: paths,
					pathSelect: pathSelect,
					onSet: onSet,
					request: request,
					url: url
				}),
				_react2.default.createElement(_Imgs2.default, {
					paths: paths,
					pathSelect: pathSelect,
					onSet: onSet,
					onSure: onSure,
					request: request,
					url: url,
					max: max
				})
			);
		}
	}]);
	return Contents;
}(_react.Component);

Contents.propTypes = {};

exports.default = Contents;