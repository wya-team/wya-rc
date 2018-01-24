'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RcInstance = function () {
	function RcInstance() {
		(0, _classCallCheck3.default)(this, RcInstance);

		this.APIS = {};
		this.config = {
			// 获取图片
			P_IMGS_SELECT_LIST_GET: undefined
		};
	}
	/**
  * 初始化配置全局
  */


	(0, _createClass3.default)(RcInstance, [{
		key: 'init',
		value: function init() {
			var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.config = (0, _extends3.default)({}, this.config, opts);
		}
		/**
   * 清理Portals类型组件
   */

	}, {
		key: 'clean',
		value: function clean() {
			try {
				for (var i in this.APIS) {
					if (this.APIS[i] && this.APIS.hasOwnProperty(i)) {
						_reactDom2.default.unmountComponentAtNode(this.APIS[i]);
						document.body.removeChild(this.APIS[i]);
						delete this.APIS[i];
					}
				}
			} catch (e) {
				console.error(e);
			}
		}
	}]);
	return RcInstance;
}();
// 单例


exports.default = new RcInstance();