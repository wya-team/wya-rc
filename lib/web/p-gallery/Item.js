'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function (_Component) {
	(0, _inherits3.default)(Item, _Component);

	function Item(props, context) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, Item);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props, context));

		_this.handleRename = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var res, name;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							res = void 0;
							_context.prev = 1;
							name = _this.props.pathSelect.name;
							_context.next = 5;
							return new Promise(function (resolve, reject) {
								var memberRef = Modal.confirm({
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
									content: _react2.default.createElement(Input, {
										type: 'text',
										placeholder: '\u4FEE\u6539\u540D\u5B57',
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
							_context.next = 11;
							break;

						case 8:
							_context.prev = 8;
							_context.t0 = _context['catch'](1);

							console.log(_context.t0);

						case 11:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[1, 8]]);
		}));
		return _this;
	}

	(0, _createClass3.default)(Item, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: '__item' },
				_react2.default.createElement('img', { src: 'http://www.w3school.com.cn/ui2017/compatible_opera.png', alt: '' }),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'span',
						{ className: '__line' },
						'ssssss'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: '__edits' },
					_react2.default.createElement(
						'div',
						{
							onCLick: this.handleRename
						},
						'\u91CD\u547D\u540D'
					),
					_react2.default.createElement(
						'div',
						{
							onCLick: this.handleRename
						},
						'\u4FEE\u6539\u5206\u7EC4'
					),
					_react2.default.createElement(
						'div',
						null,
						'\u5220\u9664'
					)
				)
			);
		}
	}]);
	return Item;
}(_react.Component);

Item.propTypes = {};

exports.default = Item;