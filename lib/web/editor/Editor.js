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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('braft-editor/dist/braft.css');

var _index = require('../async-component/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BraftEditor = (0, _index2.default)(function () {
	return import("braft-editor");
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
			var editorProps = (0, _extends3.default)({
				placeholder: '请输入需要编辑的信息'
			}, this.props);
			return editorProps;
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