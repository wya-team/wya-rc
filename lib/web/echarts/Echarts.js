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

var _elementResizeEvent = require('element-resize-event');

var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Echarts = function (_Component) {
	(0, _inherits3.default)(Echarts, _Component);

	function Echarts(props) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, Echarts);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Echarts.__proto__ || Object.getPrototypeOf(Echarts)).call(this, props));

		_this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var echartObj, onEvents;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return Promise.resolve().then(function () {
								return require("echarts");
							});

						case 3:
							_this.echartsInstance = _context.sent;
							echartObj = _this.renderEchartDom();
							onEvents = _this.props.onEvents || {};

							_this.bindEvents(echartObj, onEvents);
							if (typeof _this.props.onChartReady === 'function') _this.props.onChartReady(echartObj);

							(0, _elementResizeEvent2.default)(_this.echartsElement, function () {
								echartObj.resize();
							});

							_context.next = 14;
							break;

						case 11:
							_context.prev = 11;
							_context.t0 = _context['catch'](0);

							console.error(_context.t0);

						case 14:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[0, 11]]);
		}));
		_this.componentDidUpdate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							_context2.next = 3;
							return Promise.resolve().then(function () {
								return require("echarts");
							});

						case 3:
							_this.echartsInstance = _context2.sent;

							_this.renderEchartDom();
							_this.bindEvents(_this.getEchartsInstance(), _this.props.onEvents || []);
							_context2.next = 11;
							break;

						case 8:
							_context2.prev = 8;
							_context2.t0 = _context2['catch'](0);

							console.error(_context2.t0);

						case 11:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[0, 8]]);
		}));

		_this.echartsInstance = _this.props.echarts;
		_this.echartsElement = null;
		return _this;
	}

	(0, _createClass3.default)(Echarts, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.echartsElement) {
				if (typeof _elementResizeEvent2.default.unbind === 'function') {
					_elementResizeEvent2.default.unbind(this.echartsElement);
				}
				this.echartsInstance.dispose(this.echartsElement);
			}
		}
	}, {
		key: 'getEchartsInstance',
		value: function getEchartsInstance() {
			return this.echartsInstance.getInstanceByDom(this.echartsElement) || this.echartsInstance.init(this.echartsElement, this.props.theme);
		}
	}, {
		key: 'bindEvents',
		value: function bindEvents(instance, events) {
			var _loopEvent = function _loopEvent(eventName) {
				if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
					instance.off(eventName);
					instance.on(eventName, function (param) {
						events[eventName](param, instance);
					});
				}
			};

			for (var eventName in events) {
				if (Object.prototype.hasOwnProperty.call(events, eventName)) {
					_loopEvent(eventName);
				}
			}
		}
	}, {
		key: 'renderEchartDom',
		value: function renderEchartDom() {
			var echartObj = void 0;
			echartObj = this.getEchartsInstance();
			echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
			if (this.props.showLoading) {
				echartObj.showLoading(this.props.loadingOption || null);
			} else {
				echartObj.hideLoading();
			}
			return echartObj;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var style = this.props.style || { height: '300px' };
			return _react2.default.createElement('div', {
				ref: function ref(e) {
					_this3.echartsElement = e;
				},
				style: style,
				className: this.props.className
			});
		}
	}]);
	return Echarts;
}(_react.Component);

Echarts.propTypes = {
	option: _propTypes2.default.object.isRequired,
	echarts: _propTypes2.default.object.isRequired,
	notMerge: _propTypes2.default.bool,
	lazyUpdate: _propTypes2.default.bool,
	style: _propTypes2.default.object,
	className: _propTypes2.default.string,
	theme: _propTypes2.default.string,
	onChartReady: _propTypes2.default.func,
	showLoading: _propTypes2.default.bool,
	loadingOption: _propTypes2.default.object,
	onEvents: _propTypes2.default.object
};

Echarts.defaultProps = {
	echarts: {},
	notMerge: false,
	lazyUpdate: false,
	style: { height: '300px' },
	className: '',
	theme: null,
	onChartReady: function onChartReady() {},
	showLoading: false,
	loadingOption: null,
	onEvents: {}
};
exports.default = Echarts;