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

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _main = require('../../../main.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refName = "printBox";
var Basic = (_dec = (0, _main.CreatePrint)({ refName: refName }), _dec(_class = function (_Component) {
	(0, _inherits3.default)(Basic, _Component);

	function Basic(props, context) {
		(0, _classCallCheck3.default)(this, Basic);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this, props, context));

		_this.handleClick = function () {
			var setPrint = _this.props.printProps.setPrint;

			setPrint();
		};

		return _this;
	}

	(0, _createClass3.default)(Basic, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ ref: refName },
					'\u6253\u5370\u5185\u5BB9 \u6253\u5370\u5185\u5BB9 \u6253\u5370\u5185\u5BB9 \u6253\u5370\u5185\u5BB9 \u6253\u5370\u5185\u5BB9'
				),
				_react2.default.createElement(
					'button',
					{ onClick: this.handleClick },
					'\u70B9\u6211\u6253\u5370'
				)
			);
		}
	}]);
	return Basic;
}(_react.Component)) || _class);
exports.default = Basic;