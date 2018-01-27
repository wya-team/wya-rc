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

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Paths = require('./Paths');

var _Paths2 = _interopRequireDefault(_Paths);

var _Imgs = require('./Imgs');

var _Imgs2 = _interopRequireDefault(_Imgs);

require('./PGallery.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dom = document.body;
var Statics = {};
var cName = cName;
Statics = {
	init: function init() {
		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		return new Promise(function (resolve, reject) {
			var div = document.createElement('div');
			// div.classList.add("wp-gallery");
			Dom.appendChild(div);
			opts = (0, _extends3.default)({}, opts, {
				show: true,
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
			return _reactDom2.default.render(_react2.default.createElement(PGallery, opts), div);
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
var PGallery = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(PGallery, _Component);

	function PGallery(props, context) {
		(0, _classCallCheck3.default)(this, PGallery);

		var _this = (0, _possibleConstructorReturn3.default)(this, (PGallery.__proto__ || Object.getPrototypeOf(PGallery)).call(this, props, context));

		_this.handleSet = function (newState) {
			console.log(newState);
			_this.setState((0, _extends3.default)({}, newState));
		};

		_this.state = {
			paths: [{
				id: 1,
				name: '未分类',
				count: 200
			}, {
				id: 2,
				name: '广告分组',
				count: 20
			}],
			pathSelect: {
				id: 1,
				name: '未分类',
				count: 200
			}
		};
		return _this;
	}

	(0, _createClass3.default)(PGallery, [{
		key: 'render',
		value: function render() {
			var _state = this.state,
			    paths = _state.paths,
			    pathSelect = _state.pathSelect;

			return _react2.default.createElement(
				'div',
				{ className: 'wp-gallery' },
				_react2.default.createElement(
					'div',
					{ className: '__container' },
					_react2.default.createElement(_Header2.default, null),
					_react2.default.createElement(
						'div',
						{ className: '__contents' },
						_react2.default.createElement(_Paths2.default, {
							paths: paths,
							pathSelect: pathSelect,
							onSet: this.handleSet
						}),
						_react2.default.createElement(_Imgs2.default, {
							paths: paths,
							pathSelect: pathSelect,
							onSet: this.handleSet
						})
					)
				)
			);
		}
	}]);
	return PGallery;
}(_react.Component), _class.popup = Statics.popup, _class.close = function () {
	if (!!_index2.default.APIS[cName]) {
		_reactDom2.default.unmountComponentAtNode(_index2.default.APIS[cName]);
		delete _index2.default.APIS[cName];
	}
}, _temp);


PGallery.propTypes = {};

exports.default = PGallery;