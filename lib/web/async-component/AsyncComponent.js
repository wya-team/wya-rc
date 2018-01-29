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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn, Loading) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var AsyncComponent = function (_Component) {
		(0, _inherits3.default)(AsyncComponent, _Component);

		function AsyncComponent(props) {
			(0, _classCallCheck3.default)(this, AsyncComponent);

			var _this = (0, _possibleConstructorReturn3.default)(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call(this, props));

			_this.state = {
				WrapComponent: null
			};
			return _this;
		}

		(0, _createClass3.default)(AsyncComponent, [{
			key: 'componentDidMount',
			value: function () {
				var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
					var onBefore, onAfter, _ref2, WrapComponent;

					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									onBefore = opts.onBefore, onAfter = opts.onAfter;
									_context.prev = 1;

									// before
									onBefore && onBefore();

									// loading
									_context.next = 5;
									return fn();

								case 5:
									_ref2 = _context.sent;
									WrapComponent = _ref2.default;


									// after
									onAfter && onAfter();

									this.setState({
										WrapComponent: WrapComponent
									});
									_context.next = 14;
									break;

								case 11:
									_context.prev = 11;
									_context.t0 = _context['catch'](1);

									console.log(_context.t0);

								case 14:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[1, 11]]);
				}));

				function componentDidMount() {
					return _ref.apply(this, arguments);
				}

				return componentDidMount;
			}()
		}, {
			key: 'render',
			value: function render() {
				var WrapComponent = this.state.WrapComponent;

				return WrapComponent ? _react2.default.createElement(WrapComponent, this.props) : Loading ? _react2.default.createElement(Loading, null) : null;
			}
		}]);
		return AsyncComponent;
	}(_react.Component);

	return AsyncComponent;
};