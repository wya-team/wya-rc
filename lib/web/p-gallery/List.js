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

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Component) {
	(0, _inherits3.default)(List, _Component);

	function List(props, context) {
		(0, _classCallCheck3.default)(this, List);
		return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props, context));
	}

	(0, _createClass3.default)(List, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: '__list' },
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null),
				_react2.default.createElement(_Item2.default, null)
			);
		}
	}]);
	return List;
}(_react.Component);

List.propTypes = {};

exports.default = List;