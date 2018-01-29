'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _message6 = require('antd/lib/message');

var _message7 = _interopRequireDefault(_message6);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('antd/lib/button/style');

require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../upload/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../rc-instance/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpLoad = function (_Component) {
	(0, _inherits3.default)(UpLoad, _Component);

	function UpLoad(props, context) {
		(0, _classCallCheck3.default)(this, UpLoad);

		var _this = (0, _possibleConstructorReturn3.default)(this, (UpLoad.__proto__ || Object.getPrototypeOf(UpLoad)).call(this, props, context));

		_this.handleBegin = function (files) {
			_message7.default.destroy();
			_message7.default.loading('上传中', 0);
			_this.setState({
				disabled: true
			});
		};

		_this.handleComplete = function () {
			var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_message7.default.destroy();
			_this.props.onInit && _this.props.onInit();
			_this.setState({
				disabled: false
			});
		};

		_this.handleSuccess = function (res, file, info) {
			_this.success++;
			var pathSelect = _this.props.pathSelect;
			var cat_id = pathSelect.cat_id;
			var imgs = info.imgs;

			imgs = imgs.map(function (item, index) {
				return item['data']['url'];
			});

			var PGallery = _index4.default.config.PGallery;

			var _ref = PGallery || {},
			    _url = _ref.URL_PGALLERY_IMGS_ITEM_ADD_POST;

			var _ref2 = _this.props.url || {},
			    url = _ref2.URL_PGALLERY_IMGS_ITEM_ADD_POST;

			var request = _this.props.request;

			var param = {
				cat_id: cat_id,
				file_url: res.data.url,
				file_name: file.name
			};
			request({
				url: url || _url,
				type: "POST",
				param: param
			}).then(function () {
				var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_this._success++;
				_this._request++;
				_this.handleCount(res, file, info);
			}).catch(function () {
				var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_this._request++;
				_this.handleCount(res, file, info);
				res.msg && _message7.default.error(res.msg);
			});
		};

		_this.handleCount = function (res, file, info) {
			var _this$props = _this.props,
			    pathSelect = _this$props.pathSelect,
			    paths = _this$props.paths;
			var cat_id = pathSelect.cat_id;

			if (_this.success === _this._request) {
				_this.props.onSet({
					paths: paths.map(function (item) {
						if (item.cat_id == cat_id) {
							return (0, _extends3.default)({}, item, {
								count: Number(item.count) + _this._success
							});
						}
						return item;
					})
				});
				_message7.default.destroy();
			}
		};

		_this.state = {
			disabled: false
		};
		_this.success = 0;
		_this._success = 0;
		_this._request = 0;
		return _this;
	}

	(0, _createClass3.default)(UpLoad, [{
		key: 'render',
		value: function render() {
			var PGallery = _index4.default.config.PGallery;

			var _ref3 = PGallery || {},
			    _url = _ref3.URL_PGALLERY_IMGS_UPLOAD_POST;

			var _ref4 = this.props.url || {},
			    url = _ref4.URL_PGALLERY_IMGS_UPLOAD_POST;

			var request = this.props.request;
			var disabled = this.state.disabled;

			return _react2.default.createElement(
				_index2.default,
				{
					tag: 'span',
					type: 'images',
					accept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp',
					multiple: true,
					disabled: disabled,
					url: url || _url,
					request: request
					// onProgress={this.handleProgress}
					// onUploadBefore
					// onUploadStart
					, onSuccess: this.handleSuccess,
					onError: this.handleError,
					onBegin: this.handleBegin,
					onComplete: this.handleComplete
				},
				_react2.default.createElement(
					_button2.default,
					{ type: disabled ? "disabled" : "primary", disabled: disabled },
					'\u4E0A\u4F20'
				)
			);
		}
	}]);
	return UpLoad;
}(_react.Component);

exports.default = UpLoad;