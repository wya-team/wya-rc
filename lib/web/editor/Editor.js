'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('braft-editor/dist/braft.css');

var _index = require('../async-component/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../p-gallery/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BraftEditor = (0, _index2.default)(function () {
	return Promise.resolve().then(function () {
		return require("braft-editor");
	});
});

var Editor = function (_Component) {
	(0, _inherits3.default)(Editor, _Component);

	function Editor(props, context) {
		(0, _classCallCheck3.default)(this, Editor);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props, context));

		_this.setEditor = function (editor) {
			_this.editor = editor;
		};

		_this.state = {
			htmlContent: ''
		};
		return _this;
	}

	(0, _createClass3.default)(Editor, [{
		key: 'setOpts',
		value: function setOpts() {
			var _this2 = this;

			var editorProps = (0, _extends3.default)({
				placeholder: '请输入需要编辑的信息',
				controls: ['undo', 'redo', 'split', 'font-size', 'font-family', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'superscript', 'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'media'],
				media: {
					image: false, // 开启图片插入功能
					video: false, // 开启视频插入功能
					audio: false, // 开启音频插入功能
					validateFn: null, // 指定本地校验函数，说明见下文
					uploadFn: null // 指定上传函数，说明见下文
				},
				extendControls: [{
					type: 'button',
					text: _react2.default.createElement(_icon2.default, { type: 'upload' }),
					onClick: function onClick() {
						_index4.default.popup({}).then(function (res) {
							_this2.insertMedias([{
								type: 'IMAGE',
								name: 'New Photo',
								url: res.file_url.replace(/!4-4/g, '')
							}]);
						}).catch(function (res) {
							console.log(res);
						});
					}
				}]
			}, this.props);
			return editorProps;
		}
	}, {
		key: 'insertMedias',
		value: function insertMedias(params) {
			// [
			// 	{
			// 		type: 'IMAGE',
			// 		name: 'New Photo',
			// 		url: 'http://path/to/image.png'
			// 	}, {
			// 		type: 'VIDEO',
			// 		name: 'New Video',
			// 		url: 'http://path/to/image-2.mp4'
			// 	}, {
			// 		type: 'AUDIO',
			// 		name: 'New Audio',
			// 		url: 'http://path/to/image-2.mp3'
			// 	}
			// ]
			this.editor.refs['wrap'].insertMedias([].concat((0, _toConsumableArray3.default)(params)));
		}
	}, {
		key: 'render',
		value: function render() {
			var opts = this.setOpts();
			var _props = this.props,
			    className = _props.className,
			    _props$style = _props.style,
			    style = _props$style === undefined ? {} : _props$style;

			return _react2.default.createElement(
				'div',
				{ className: className, style: (0, _extends3.default)({ background: 'white' }, style) },
				_react2.default.createElement(BraftEditor, (0, _extends3.default)({}, opts, { ref: this.setEditor }))
			);
		}
	}]);
	return Editor;
}(_react.Component);

Editor.propTypes = {};
Editor.defaultProps = {};
exports.default = Editor;