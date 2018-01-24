'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var Copy = function (_Component) {
	(0, _inherits3.default)(Copy, _Component);

	function Copy(props, context) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, Copy);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Copy.__proto__ || Object.getPrototypeOf(Copy)).call(this, props, context));

		_this.handleClick = function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
				var _this$props, onCopyBefore, onCopyAfter, value, isReplace, _value, input;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_this$props = _this.props, onCopyBefore = _this$props.onCopyBefore, onCopyAfter = _this$props.onCopyAfter, value = _this$props.value, isReplace = _this$props.isReplace;

								if (!onCopyBefore) {
									_context.next = 7;
									break;
								}

								_context.next = 5;
								return onCopyBefore(e);

							case 5:
								_value = _context.sent;

								isReplace && (value = _value);

							case 7:

								// create
								input = document.createElement('input');

								input.value = value;
								document.body.appendChild(input);

								// copy
								input.select();
								document.execCommand("Copy");

								// remove
								document.body.removeChild(input);

								// end
								onCopyAfter && onCopyAfter(value);
								_context.next = 19;
								break;

							case 16:
								_context.prev = 16;
								_context.t0 = _context['catch'](0);

								console.error('copy fail: ' + _context.t0);

							case 19:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[0, 16]]);
			}));

			return function (_x) {
				return _ref.apply(this, arguments);
			};
		}();

		return _this;
	}

	(0, _createClass3.default)(Copy, [{
		key: 'render',
		value: function render() {
			return (0, _react.cloneElement)(_react.Children.only(this.props.children), {
				onClick: this.handleClick,
				ref: 'copy'
			});
		}
	}]);
	return Copy;
}(_react.Component);

Copy.propTypes = {
	onCopyBefore: _propTypes2.default.func,
	onCopyAfter: _propTypes2.default.func,
	isReplace: _propTypes2.default.bool,
	value: _propTypes2.default.any
};
Copy.defaultProps = {
	isReplace: false
};
exports.default = Copy;