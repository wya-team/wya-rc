'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreatePrint = function (_Component) {
	(0, _inherits3.default)(CreatePrint, _Component);

	function CreatePrint(props, context) {
		(0, _classCallCheck3.default)(this, CreatePrint);

		var _this = (0, _possibleConstructorReturn3.default)(this, (CreatePrint.__proto__ || Object.getPrototypeOf(CreatePrint)).call(this, props, context));

		_this.setPrint = function () {
			var refName = _this.props.refName;
			// filter  

			var $ = [].concat((0, _toConsumableArray3.default)(document.body.children)).filter(function (item) {
				return item.nodeName === 'DIV' && item.style.display !== 'none';
			});
			// hide it
			$.forEach(function (item) {
				return item.style.display = 'none';
			});

			// regiser print
			var div = document.createElement('div');
			div.innerHTML = (0, _reactDom.findDOMNode)(_this.refs.print.refs[refName]).innerHTML;
			document.body.appendChild(div);
			window.print();

			// remove print
			$.forEach(function (item) {
				return item.style.removeProperty('display');
			});
			document.body.removeChild(div);
		};

		return _this;
	}

	(0, _createClass3.default)(CreatePrint, [{
		key: 'render',
		value: function render() {
			return (0, _react.cloneElement)(_react.Children.only(this.props.children), {
				__decirator: 'success',
				printProps: {
					setPrint: this.setPrint
				},
				ref: 'print'
			});
		}
	}]);
	return CreatePrint;
}(_react.Component);

CreatePrint.propTypes = {
	refName: _propTypes2.default.string.isRequired
};
CreatePrint.defaultProps = {};
exports.default = CreatePrint;