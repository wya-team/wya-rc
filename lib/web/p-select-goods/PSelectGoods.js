'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _class, _temp; /**
                    * 功能大致实现，后续再考虑重构
                    */


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
			opts = (0, _extends4.default)({}, opts, {
				url: null,
				request: opts.request || _wyaFetch.ajax,
				select: opts.select || [],
				activeText: opts.activeText || '已选',
				staticText: opts.staticText || '选取',
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
  * 	statusText
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
			var id = _this.props.id;
			var selectObj = _this.state.selectObj;

			for (var i in selectObj) {
				if (!!selectObj[i][id]) {
					arr = [].concat((0, _toConsumableArray3.default)(arr), [selectObj[i]]);
				}
			}
			_this.props.onSure && _this.props.onSure(arr);
		};

		_this.handleSelect = function (flag, id, data) {
			var newArr = [].concat((0, _toConsumableArray3.default)(_this.state.selectArr));
			var newObj = (0, _extends4.default)({}, _this.state.selectObj);
			if (flag) {
				newObj = (0, _extends4.default)({}, newObj, (0, _defineProperty3.default)({}, id, (0, _extends4.default)({}, data)));
			} else {
				delete newObj[id];
			}
			_this.setState({
				selectObj: newObj
			});
		};

		var _initItem = (0, _utils.initItem)(props.select, props.id),
		    itemArr = _initItem.itemArr,
		    itemObj = _initItem.itemObj;

		_this.state = {
			selectArr: itemArr,
			selectObj: itemObj
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
			var _props = this.props,
			    request = _props.request,
			    url = _props.url,
			    activeText = _props.activeText,
			    staticText = _props.staticText,
			    id = _props.id,
			    component = _props.component;
			var _state = this.state,
			    selectArr = _state.selectArr,
			    selectObj = _state.selectObj;

			return _react2.default.createElement(
				_pPopup2.default,
				{ title: '\u5546\u54C1\u9009\u62E9', onClose: this.handleClose, onSure: this.handleSure, className: 'wp-select-goods' },
				_react2.default.createElement(_Goods2.default, {
					request: request,
					url: url,
					selectArr: selectArr,
					selectObj: selectObj,
					onClick: this.handleSelect,
					activeText: activeText,
					staticText: staticText,
					component: component,
					id: id
				}),
				_react2.default.createElement(_Btn2.default, {
					activeText: activeText,
					staticText: staticText
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
	id: _propTypes2.default.any
	// component
};

exports.default = PSelectGoods;