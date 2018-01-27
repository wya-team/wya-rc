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

		this.hasInit = false;
		this.APIS = {};
		this.config = {
			PGallery: {},
			UpLoad: {
				IMG_UPLOAD_URL: null,
				FILE_UPLOAD_URL: null
			}
		};
	}
	/**
  * 初始化配置全局
  */


	(0, _createClass3.default)(RcInstance, [{
		key: 'init',
		value: function init() {
			var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			if (!this.hasInit) {
				this.config = (0, _extends3.default)({}, this.config, opts);
				this.hasInit = true;
			} else {
				console.error('只能初始化一次');
			}
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