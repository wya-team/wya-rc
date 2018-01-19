'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _main = require('../../../main.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var refName = "printBox";
var Basic = (_dec = (0, _main.CreatePrint)({ refName: refName }), _dec(_class = function (_Component) {
	_inherits(Basic, _Component);

	function Basic(props, context) {
		_classCallCheck(this, Basic);

		var _this = _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this, props, context));

		_this.handleClick = function () {
			var setPrint = _this.props.printProps.setPrint;

			setPrint();
		};

		return _this;
	}

	_createClass(Basic, [{
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