'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _message3 = require('antd/lib/message');

var _message4 = _interopRequireDefault(_message3);

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

var _class, _temp; /**
                    * 功能大致实现，后续再考虑重构
                    */


require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _wyaFetch = require('wya-fetch');

var _index = require('../rc-instance/index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils/utils');

var _Goods = require('./Goods');

var _Goods2 = _interopRequireDefault(_Goods);

var _Btn = require('./Btn');

var _Btn2 = _interopRequireDefault(_Btn);

var _pPopup = require('../p-popup');

var _pPopup2 = _interopRequireDefault(_pPopup);

require('./PSelectGoods.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dom = document.body;
var Statics = {};
var cName = 'PSelectGoods';
Statics = {
	init: function init() {
		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		return new Promise(function (resolve, reject) {
			var div = document.createElement('div');
			// div.classList.add("wp-gallery");
			Dom.appendChild(div);
			opts = (0, _extends3.default)({}, opts, {
				url: null,
				request: opts.request || _wyaFetch.ajax,
				selectArr: opts.selectArr || [],
				selectObj: opts.selectObj || {},
				activeText: opts.activeText || '已选',
				staticText: opts.staticText || '选取',
				disableText: opts.disableText || '已参加其他活动',
				disableArr: opts.disableArr || [],
				max: opts.max || 0,
				id: opts.id || "product_id",
				onCloseSoon: function onCloseSoon() {
					_reactDom2.default.unmountComponentAtNode(div);
					Dom.removeChild(div);
					delete _index2.default.APIS[cName];
				},
				onSure: function onSure(res) {
					opts.onCloseSoon();
					resolve(res);
				},
				onClose: function onClose(res) {
					opts.onCloseSoon();
					reject(res);
				}
			});
			_index2.default.APIS[cName] = div;
			return _reactDom2.default.render(_react2.default.createElement(PSelectGoods, opts), div);
		});
	},

	/**
  * 弹出项目，验证数据结构是否合法
  * opts {
  * 	url,
  * 	request,
  * 	select,
  * 	id,
  * 	activeText,
  * 	statusText,
  * 	limit
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
var PSelectGoods = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(PSelectGoods, _Component);

	function PSelectGoods(props, context) {
		(0, _classCallCheck3.default)(this, PSelectGoods);

		var _this = (0, _possibleConstructorReturn3.default)(this, (PSelectGoods.__proto__ || Object.getPrototypeOf(PSelectGoods)).call(this, props, context));

		_this.handleClose = function (e) {
			_this && _this.props.onClose && _this.props.onClose();
		};

		_this.handleSure = function () {
			var arr = [];
			var _this$props = _this.props,
			    max = _this$props.max,
			    selectObj = _this$props.selectObj;
			var selectArr = _this.state.selectArr;

			selectArr.map(function (item, index) {
				if (max == 0 || index < max) {
					arr.push(_this.goods.state.itemObj[item] || selectObj[item]);
				}
			});
			_this.props.onSure && _this.props.onSure(arr);
		};

		_this.handleSelect = function (flag, id, data) {
			var max = _this.props.max;

			var newArr = [].concat((0, _toConsumableArray3.default)(_this.state.selectArr));
			if (flag) {
				if (max != 0 && newArr.length >= max) {
					_message4.default.destroy();
					_message4.default.warn('最多选择' + max + '个，请先取消在进行选择。');
				} else {
					newArr.unshift(id);
				}
			} else {
				newArr = _this.state.selectArr.filter(function (item, index) {
					return item != id;
				});
			}
			_this.setState({
				selectArr: newArr
			});
		};

		_this.state = {
			selectArr: props.selectArr
		};
		return _this;
	}
	// 关闭， 移除dom


	(0, _createClass3.default)(PSelectGoods, [{
		key: 'close',
		value: function close() {
			this && this.props.onClose && this.props.onClose();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    request = _props.request,
			    url = _props.url,
			    activeText = _props.activeText,
			    staticText = _props.staticText,
			    disableText = _props.disableText,
			    disableArr = _props.disableArr,
			    id = _props.id,
			    component = _props.component,
			    multiple = _props.multiple;
			var _state = this.state,
			    selectArr = _state.selectArr,
			    selectObj = _state.selectObj;

			return _react2.default.createElement(
				_pPopup2.default,
				{ title: '\u5546\u54C1\u9009\u62E9', onClose: this.handleClose, onSure: this.handleSure, className: 'wp-select-goods' },
				_react2.default.createElement(_Goods2.default, {
					ref: function ref(goods) {
						return _this2.goods = goods;
					},
					request: request,
					url: url,
					selectArr: selectArr,
					onClick: this.handleSelect,
					activeText: activeText,
					staticText: staticText,
					disableText: disableText,
					disableArr: disableArr,
					component: component,
					id: id
				}),
				_react2.default.createElement(_Btn2.default, {
					activeText: activeText,
					staticText: staticText,
					disableText: disableText
				})
			);
		}
	}]);
	return PSelectGoods;
}(_react.Component), _class.popup = Statics.popup, _class.close = function () {
	if (!!_index2.default.APIS[cName]) {
		_reactDom2.default.unmountComponentAtNode(_index2.default.APIS[cName]);
		delete _index2.default.APIS[cName];
	}
}, _temp);


PSelectGoods.propTypes = {
	url: _propTypes2.default.object,
	request: _propTypes2.default.func,
	select: _propTypes2.default.array,
	activeText: _propTypes2.default.string,
	staticText: _propTypes2.default.string,
	disableText: _propTypes2.default.string,
	disableArr: _propTypes2.default.array,
	id: _propTypes2.default.any
	// component
};

PSelectGoods.defaultProps = {
	disableArr: []
};

exports.default = PSelectGoods;