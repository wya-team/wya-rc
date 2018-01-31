"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
	var refName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "wrap";
	var Loading = arguments[2];
	var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

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
			key: "componentDidMount",
			value: function () {
				var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
					var onBefore, onAfter, onLoaded, _ref2, WrapComponent;

					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									onBefore = opts.onBefore, onAfter = opts.onAfter;
									onLoaded = this.props.onLoaded;
									_context.prev = 2;

									// before
									onBefore && onBefore();

									// loading
									_context.next = 6;
									return fn();

								case 6:
									_ref2 = _context.sent;
									WrapComponent = _ref2.default;


									// after
									onAfter && onAfter();

									// loaded
									onLoaded && onLoaded();

									this.setState({
										WrapComponent: WrapComponent
									});
									_context.next = 16;
									break;

								case 13:
									_context.prev = 13;
									_context.t0 = _context["catch"](2);

									console.log(_context.t0);

								case 16:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this, [[2, 13]]);
				}));

				function componentDidMount() {
					return _ref.apply(this, arguments);
				}

				return componentDidMount;
			}()
		}, {
			key: "render",
			value: function render() {
				var WrapComponent = this.state.WrapComponent;

				return WrapComponent ? _react2.default.createElement(WrapComponent, (0, _extends3.default)({}, this.props, { ref: refName })) : Loading ? _react2.default.createElement(Loading, null) : null;
			}
		}]);
		return AsyncComponent;
	}(_react.Component);

	return AsyncComponent;
};