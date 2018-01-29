'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _wyaFetch = require('wya-fetch');

var _utils = require('../utils/utils');

var _index = require('../rc-instance/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Upload = function (_Component) {
	(0, _inherits3.default)(Upload, _Component);

	function Upload(props, context) {
		(0, _classCallCheck3.default)(this, Upload);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props, context));

		_this.handleClick = function () {
			var el = _this.fileInput;
			if (!el) {
				return;
			}
			el.click();
		};

		_this.handleChange = function (e) {
			var files = e.target.files;
			_this.uploadFiles(files);
			_this.setDefault();
		};

		_this.handleKeyDown = function (e) {
			if (e.key === 'Enter') {
				_this.onClick();
			}
		};

		_this.handleFileDrop = function (e) {
			if (e.type === 'dragover') {
				e.preventDefault();
				return;
			}
			var files = Array.prototype.slice.call(e.dataTransfer.files).filter(function (file) {
				return (0, _utils.attrAccept)(file, _this.props.accept);
			});
			_this.uploadFiles(files);

			e.preventDefault();
		};

		_this.setFileInput = function (node) {
			_this.fileInput = node;
		};

		_this.setDefaultCycle = function () {
			_this.cycle = {
				error: 0,
				success: 0,
				total: 0,
				imgs: []
			};
		};

		_this.state = {
			uid: (0, _utils.getUid)()
		};

		_this.reqs = {};

		_this.setDefaultCycle();
		return _this;
	}

	(0, _createClass3.default)(Upload, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._isMounted = true;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._isMounted = false;
			this.cancel();
		}
	}, {
		key: 'setDefault',
		value: function setDefault() {
			this.setState({
				uid: (0, _utils.getUid)()
			});
		}
	}, {
		key: 'uploadFiles',
		value: function uploadFiles(files) {
			var _this2 = this;

			var postFiles = Array.prototype.slice.call(files);
			var length = postFiles.length;
			// reset
			this.setDefaultCycle();
			var onBegin = this.props.onBegin;

			onBegin && onBegin(postFiles);

			postFiles.forEach(function (file, index) {
				file.uid = (0, _utils.getUid)();
				file.current = index + 1;
				file.total = length;
				_this2.upload(file, postFiles);
			});
		}
	}, {
		key: 'upload',
		value: function upload(file, fileList, index) {
			var _this3 = this;

			var onUploadBefore = this.props.onUploadBefore;


			if (!onUploadBefore) {
				// 总是异步的，以防使用react状态保存文件列表。
				setTimeout(function () {
					return _this3.post(file);
				}, 0);
				return;
			}

			var before = onUploadBefore(file, fileList);
			if (before && before.then) {
				before.then(function (processedFile) {
					var processedFileType = Object.prototype.toString.call(processedFile);
					if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
						_this3.post(processedFile);
					} else {
						_this3.post(file);
					}
				}).catch(function (e) {
					console && console.error(e);
				});
			} else if (before !== false) {
				setTimeout(function () {
					return _this3.post(file);
				}, 0);
			}
		}
	}, {
		key: 'post',
		value: function post(file) {
			var _this4 = this;

			if (!this._isMounted) {
				return;
			}
			var _props = this.props,
			    url = _props.url,
			    type = _props.type,
			    filename = _props.filename,
			    headers = _props.headers,
			    data = _props.data,
			    onUploadStart = _props.onUploadStart,
			    onProgress = _props.onProgress,
			    onSuccess = _props.onSuccess,
			    onError = _props.onError,
			    onComplete = _props.onComplete;

			var _ref = _index2.default.config.Upload || {},
			    URL_UPLOAD_FILE_POST = _ref.URL_UPLOAD_FILE_POST,
			    URL_UPLOAD_IMG_POST = _ref.URL_UPLOAD_IMG_POST;

			var _url = type === 'images' ? URL_UPLOAD_IMG_POST : URL_UPLOAD_FILE_POST;
			var uid = file.uid;
			var _props$request = this.props.request,
			    request = _props$request === undefined ? _wyaFetch.ajax : _props$request;

			this.reqs[uid] = request({
				url: url || _url,
				type: "FORM",
				param: {
					filename: filename,
					file: file,
					data: data
				},
				headers: headers,
				onProgress: onProgress ? function (e) {
					onProgress(e, file);
				} : null
			}).then(function (res) {
				delete _this4.reqs[uid];
				_this4.cycle.success++;
				_this4.cycle.total++;
				_this4.cycle.imgs = [].concat((0, _toConsumableArray3.default)(_this4.cycle.imgs), [res]);

				onSuccess && onSuccess(res, file, (0, _extends3.default)({}, _this4.cycle));
				// console.log(`success: ${this.cycle.success}, total: ${this.cycle.total}`);
				if (_this4.cycle.total === file.total) {
					onComplete && onComplete((0, _extends3.default)({}, _this4.cycle) || {});
					_this4.setDefaultCycle();
				}
			}).catch(function (res) {
				delete _this4.reqs[uid];
				_this4.cycle.error++;
				_this4.cycle.total++;
				// console.log(`error: ${this.cycle.error}, total: ${this.cycle.total}`);
				onError && onError(res, file, (0, _extends3.default)({}, _this4.cycle));

				if (_this4.cycle.total === file.total) {
					onComplete && onComplete((0, _extends3.default)({}, _this4.cycle) || {});
					_this4.setDefaultCycle();
				}
			});
			onUploadStart && onUploadStart(file);
		}
	}, {
		key: 'cancel',
		value: function cancel(file) {
			var _this5 = this;

			var reqs = this.reqs;

			if (file) {
				var uid = file;
				if (file && file.uid) {
					uid = file.uid;
				}
				if (this.reqs[uid]) {
					this.reqs[uid].cancel();
					delete this.reqs[uid];
				}
			} else {
				Object.keys(reqs).forEach(function (uid) {
					if (_this5.reqs[uid]) {
						_this5.reqs[uid].cancel();
					}
					delete reqs[uid];
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames;

			var _props2 = this.props,
			    Tag = _props2.tag,
			    prefixCls = _props2.prefixCls,
			    className = _props2.className,
			    disabled = _props2.disabled,
			    style = _props2.style,
			    multiple = _props2.multiple,
			    accept = _props2.accept,
			    children = _props2.children;

			var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3.default)(_classNames, className, className), _classNames));
			var events = disabled ? {} : {
				onClick: this.handleClick,
				onKeyDown: this.handleKeyDown,
				onDrop: this.handleFileDrop,
				onDragOver: this.handleFileDrop
			};
			return _react2.default.createElement(
				Tag,
				(0, _extends3.default)({}, events, {
					className: cls,
					style: style,
					role: 'button',
					tabIndex: '0'
				}),
				_react2.default.createElement('input', {
					type: 'file',
					ref: this.setFileInput,
					key: this.state.uid,
					style: { display: 'none' },
					accept: accept,
					multiple: multiple,
					onChange: this.handleChange
				}),
				children
			);
		}
	}]);
	return Upload;
}(_react.Component);

Upload.propTypes = {
	// 组件
	tag: _propTypes2.default.string,
	style: _propTypes2.default.object,
	prefixCls: _propTypes2.default.string,
	className: _propTypes2.default.string,
	// input
	multiple: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	accept: _propTypes2.default.string,
	// ajax
	request: _propTypes2.default.func,
	data: _propTypes2.default.object,
	headers: _propTypes2.default.object,
	onUploadBefore: _propTypes2.default.func,
	onUploadStart: _propTypes2.default.func,
	onProgress: _propTypes2.default.func,
	onSuccess: _propTypes2.default.func,
	onError: _propTypes2.default.func,
	onComplete: _propTypes2.default.func,
	// 上传类型 images | file 影响调用接口
	type: _propTypes2.default.string,
	// 元素
	children: _propTypes2.default.any

};
Upload.defaultProps = {
	tag: 'span',
	prefixCls: 'c-upload',
	data: {},
	headers: {},
	filename: 'Filedata',
	onUploadStart: null,
	onProgress: null,
	onSuccess: null,
	onError: null,
	multiple: false,
	onUploadBefore: null,
	type: 'images'
};
exports.default = Upload;