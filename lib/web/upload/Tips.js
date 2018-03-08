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

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../rc-instance/index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils/utils');

require('./Tips.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dom = document.body;
var Statics = {};
var cName = 'UploadTips';
Statics = {
	init: function init() {
		var _this = this;

		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		cName = cName + '_' + (0, _utils.getUid)();
		return new Promise(function (resolve, reject) {
			var div = document.createElement('div');
			Dom.appendChild(div);
			opts = (0, _extends3.default)({}, opts, {
				onCloseSoon: function onCloseSoon() {
					_reactDom2.default.unmountComponentAtNode(div);
					Dom.removeChild(div);
					delete _index2.default.APIS[cName];
				},
				onClose: function onClose(res) {
					opts.onCloseSoon();
				}
			});
			_index2.default.APIS[cName] = div;
			_reactDom2.default.render(_react2.default.createElement(Tips, (0, _extends3.default)({}, opts, { ref: function ref(instance) {
					return _this.comp = instance;
				} })), div, function () {
				return resolve(_this.comp);
			});
		});
	},

	/**
  * 弹出项目，验证数据结构是否合法
  * opts {
  * }
  */
	popup: function popup() {
		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		if ((typeof opts === 'undefined' ? 'undefined' : (0, _typeof3.default)(opts)) !== 'object') {
			opts = {};
		}
		return Statics.init(opts);
	}
};
var Tips = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(Tips, _Component);

	function Tips(props, context) {
		(0, _classCallCheck3.default)(this, Tips);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Tips.__proto__ || Object.getPrototypeOf(Tips)).call(this, props, context));

		_this2.setEl = function (node) {
			_this2.el = _this2.el || node;
			_this2.el.classList.add('__active');
		};

		_this2.close = function () {
			_this2.el.classList.remove('__active');
			_this2.timer = setTimeout(function () {
				// 主线程
				_this2 && _this2.props.onClose && _this2.props.onClose();
			}, 201);
		};

		_this2.hide = function () {
			_this2.el.classList.remove('__active');
			_this2.timer = setTimeout(function () {
				// 主线程
				_this2.setState({
					show: false
				});
			}, 201);
		};

		_this2.show = function (_ref) {
			var itemArr = _ref.itemArr,
			    itemObj = _ref.itemObj;
			var _this2$state = _this2.state,
			    arr = _this2$state.itemArr,
			    obj = _this2$state.itemObj;
			// 主线程

			_this2.setState({
				show: true,
				itemArr: [].concat((0, _toConsumableArray3.default)(arr), (0, _toConsumableArray3.default)(itemArr)),
				itemObj: (0, _extends3.default)({}, obj, itemObj)
			}, function () {
				_this2.el.classList.add('__active');
			});
		};

		_this2.setTipsStatus = function (show) {
			_this2.setState({
				showTips: typeof show === 'boolean' ? show : !_this2.state.showTips
			});
		};

		_this2.setValue = function (uid, key, value) {
			var _this2$state2 = _this2.state,
			    itemObj = _this2$state2.itemObj,
			    error = _this2$state2.error,
			    success = _this2$state2.success;


			switch (key) {
				case 'percent':
					// File对象实例
					itemObj[uid].percent = value;
					break;
				case 'success':
					success++;
					break;
				case 'error':
					error++;
					itemObj[uid].msg = value;
				default:
					break;

			}
			_this2.setState({
				itemObj: itemObj,
				success: success,
				error: error
			});
		};

		_this2.state = {
			show: false,
			itemArr: [],
			itemObj: [],
			success: 0,
			error: 0,
			showTips: false
		};
		return _this2;
	}

	(0, _createClass3.default)(Tips, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.timer && clearTimeout(this.timer);
		}
		// 关闭， 移除dom

		// 隐藏

		// 显示

	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    show = _state.show,
			    showTips = _state.showTips,
			    itemArr = _state.itemArr,
			    itemObj = _state.itemObj,
			    success = _state.success,
			    error = _state.error;

			return _react2.default.createElement(
				'div',
				{ className: 'rc-upload-tips', ref: this.setEl, hidden: !show },
				_react2.default.createElement(
					'div',
					{ className: '__header' },
					_react2.default.createElement(
						'span',
						null,
						'\u5F53\u524D\u9009\u62E9\u4E0A\u4F20\u8FDB\u5EA6'
					),
					_react2.default.createElement(
						'span',
						{ onClick: this.hide },
						'\u2715'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: '__result', onClick: this.setTipsStatus, hidden: !showTips },
					_react2.default.createElement(
						'span',
						null,
						'\u4E0A\u4F20\u7ED3\u675F\uFF0C\u6210\u529F: ',
						success,
						'\uFF0C\u5931\u8D25: ',
						error,
						'\uFF0C\u603B\u6570: ',
						itemArr.length
					),
					_react2.default.createElement(
						'span',
						{ className: '__icon' },
						'\u2715'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: '__content' },
					_react2.default.createElement(
						'div',
						null,
						'\u6587\u4EF6\u540D'
					),
					_react2.default.createElement(
						'div',
						null,
						'\u6587\u4EF6\u5927\u5C0F'
					),
					_react2.default.createElement(
						'div',
						null,
						'\u72B6\u6001'
					)
				),
				_react2.default.createElement(
					'ul',
					null,
					itemArr.map(function (item, index) {
						var _ref2 = itemObj[item] || {},
						    name = _ref2.name,
						    size = _ref2.size,
						    percent = _ref2.percent,
						    msg = _ref2.msg;

						return _react2.default.createElement(
							'li',
							{ key: item },
							_react2.default.createElement('div', { className: '__bar', style: { width: (msg ? 100 : percent) + '%' } }),
							_react2.default.createElement(
								'div',
								{ className: '__content' },
								_react2.default.createElement(
									'div',
									null,
									name
								),
								_react2.default.createElement(
									'div',
									null,
									(size / 1024 / 1024).toFixed(2),
									'MB'
								),
								_react2.default.createElement(
									'div',
									{ className: msg ? '__error' : '__success' },
									msg ? msg : Number(percent) === 100 ? _react2.default.createElement(
										'span',
										null,
										'\u2714'
									) : '\u4E0A\u4F20\u4E2D'
								)
							)
						);
					})
				)
			);
		}
	}]);
	return Tips;
}(_react.Component), _class.popup = Statics.popup, _temp);


Tips.propTypes = {
	// component
};

Tips.defaultProps = {};

exports.default = Tips;