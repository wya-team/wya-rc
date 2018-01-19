'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreatePrint = function (_Component) {
	_inherits(CreatePrint, _Component);

	function CreatePrint(props, context) {
		_classCallCheck(this, CreatePrint);

		var _this = _possibleConstructorReturn(this, (CreatePrint.__proto__ || Object.getPrototypeOf(CreatePrint)).call(this, props, context));

		_this.setPrint = function () {
			var refName = _this.props.refName;
			// filter  

			var $ = [].concat(_toConsumableArray(document.body.children)).filter(function (item) {
				return item.nodeName === 'DIV' && item.style.displat != 'none';
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

	_createClass(CreatePrint, [{
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

CreatePrint.propTypes = {};
CreatePrint.defaultProps = {};
exports.default = CreatePrint;