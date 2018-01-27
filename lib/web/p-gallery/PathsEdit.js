'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('antd/lib/button/style');

require('antd/lib/modal/style');

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PathsEdit = function (_Component) {
	(0, _inherits3.default)(PathsEdit, _Component);

	function PathsEdit(props, context) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, PathsEdit);

		var _this = (0, _possibleConstructorReturn3.default)(this, (PathsEdit.__proto__ || Object.getPrototypeOf(PathsEdit)).call(this, props, context));

		_this.handleRename = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var res, name, _this$props, pathSelect, paths;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							res = void 0;
							_context.prev = 1;
							name = _this.props.pathSelect.name;
							_context.next = 5;
							return new Promise(function (resolve, reject) {
								var memberRef = _modal2.default.confirm({
									title: _react2.default.createElement(
										'div',
										{
											onClick: function onClick(e) {
												memberRef.destroy();reject();
											}
										},
										_react2.default.createElement(
											'div',
											null,
											'\u4FEE\u6539\u5185\u5BB9'
										)
									),
									content: _react2.default.createElement(_input2.default, {
										type: 'text',
										placeholder: '\u65B0\u5EFA\u5206\u7C7B',
										defaultValue: '' + name,
										id: 'vc-input'
									}),
									iconType: "",
									closable: true,
									okText: "提交修改",
									onOk: function onOk() {
										resolve(document.querySelector("#vc-input").value);
									},
									cancelText: "恢复默认",
									onCancel: function onCancel() {
										// 还原文字
										return new Promise(function ($resolve, $reject) {
											document.querySelector("#vc-input").value = name;
											$reject();
										});
									}
								});
							});

						case 5:
							res = _context.sent;
							_this$props = _this.props, pathSelect = _this$props.pathSelect, paths = _this$props.paths;

							pathSelect = (0, _extends3.default)({}, pathSelect, {
								name: res || '新建分类'
							});
							paths = paths.map(function (item, index) {
								if (item.id === pathSelect.id) {
									return pathSelect;
								}
								return item;
							});
							_this.props.onSet({
								pathSelect: (0, _extends3.default)({}, _this.props.pathSelect, {
									name: res || '新建分类'
								}),
								paths: paths
							});
							_context.next = 15;
							break;

						case 12:
							_context.prev = 12;
							_context.t0 = _context['catch'](1);

							console.log(_context.t0);

						case 15:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[1, 12]]);
		}));

		_this.handleDel = function () {
			_modal2.default.confirm({
				title: '你确定要删除这些内容么?',
				content: '',
				iconType: "",
				onOk: function onOk() {
					// message.destroy();
					// message.loading('加载中...', 0);

				},
				onCancel: function onCancel() {
					// console.log('Cancel');
				}
			});
		};

		return _this;
	}

	(0, _createClass3.default)(PathsEdit, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_react.Fragment,
				null,
				_react2.default.createElement(
					_button2.default,
					{
						onClick: this.handleRename
					},
					'\u91CD\u547D\u540D'
				),
				_react2.default.createElement(
					_button2.default,
					{
						onClick: this.handleDel,
						style: { margin: '0 10px' }
					},
					'\u5220\u9664\u5206\u7EC4'
				)
			);
		}
	}]);
	return PathsEdit;
}(_react.Component);

PathsEdit.propTypes = {};

exports.default = PathsEdit;