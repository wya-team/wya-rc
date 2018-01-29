'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _message6 = require('antd/lib/message');

var _message7 = _interopRequireDefault(_message6);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

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

require('antd/lib/message/style');

require('antd/lib/input/style');

require('antd/lib/icon/style');

require('antd/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../rc-instance/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paths = function (_Component) {
	(0, _inherits3.default)(Paths, _Component);

	function Paths(props, context) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, Paths);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Paths.__proto__ || Object.getPrototypeOf(Paths)).call(this, props, context));

		_this.handleAddPath = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var inputText, _this$props, pathSelect, paths, cat_name, cat_id, PGallery, _ref2, _url, _ref3, url, request, param;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							inputText = void 0;
							_context.prev = 1;
							_this$props = _this.props, pathSelect = _this$props.pathSelect, paths = _this$props.paths;
							cat_name = pathSelect.cat_name, cat_id = pathSelect.cat_id;
							_context.next = 6;
							return new Promise(function (resolve, reject) {
								var memberRef = _modal2.default.confirm({
									title: _react2.default.createElement(
										'div',
										{
											style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
											onClick: function onClick(e) {
												memberRef.destroy();reject();
											}
										},
										_react2.default.createElement(
											'div',
											null,
											'\u6DFB\u52A0\u5206\u7C7B'
										),
										_react2.default.createElement(_icon2.default, { type: 'close' })
									),
									content: _react2.default.createElement(_input2.default, {
										type: 'text',
										placeholder: '\u65B0\u5EFA\u5206\u7C7B',
										defaultValue: '\u65B0\u5EFA\u5206\u7C7B',
										id: 'vc-input'
									}),
									iconType: "",
									closable: true,
									okText: "提交",
									onOk: function onOk() {
										resolve(document.querySelector("#vc-input").value);
									},
									cancelText: "恢复默认",
									onCancel: function onCancel() {
										// 还原文字
										return new Promise(function ($resolve, $reject) {
											document.querySelector("#vc-input").value = cat_name;
											$reject();
										});
									}
								});
							});

						case 6:
							inputText = _context.sent;

							_message7.default.destroy();
							_message7.default.loading('加载中...', 0);
							PGallery = _index2.default.config.PGallery;
							_ref2 = PGallery || {}, _url = _ref2.URL_PGALLERY_PATHS_ITEM_ADD_POST;
							_ref3 = _this.props.url || {}, url = _ref3.URL_PGALLERY_PATHS_ITEM_ADD_POST;
							request = _this.props.request;
							param = {
								cat_name: inputText
							};

							request({
								url: url || _url,
								type: "POST",
								param: param
							}).then(function (res) {
								_message7.default.destroy();
								paths = [].concat((0, _toConsumableArray3.default)(paths), [res.data]);
								_this.props.onSet({
									pathSelect: pathSelect,
									paths: paths
								});
							}).catch(function () {
								var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

								_message7.default.destroy();
								_message7.default.error(res.msg);
							});
							_context.next = 20;
							break;

						case 17:
							_context.prev = 17;
							_context.t0 = _context['catch'](1);

							console.log(_context.t0);

						case 20:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[1, 17]]);
		}));

		_this.handleSelectPath = function (pathSelect) {
			_this.props.onSet({
				pathSelect: pathSelect
			});
		};

		return _this;
	}

	(0, _createClass3.default)(Paths, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    paths = _props.paths,
			    pathSelect = _props.pathSelect;

			return _react2.default.createElement(
				'div',
				{ className: '__paths' },
				_react2.default.createElement(
					'div',
					{
						onClick: this.handleAddPath
					},
					'+ \u6DFB\u52A0\u5206\u7EC4'
				),
				paths.map(function (item, index) {
					var cat_id = item.cat_id,
					    cat_name = item.cat_name,
					    _item$count = item.count,
					    count = _item$count === undefined ? 0 : _item$count;

					return _react2.default.createElement(
						'div',
						{
							key: cat_id,
							className: (0, _classnames2.default)('__line', { '__select': pathSelect.cat_id == cat_id }),
							onClick: function onClick(e) {
								return _this3.handleSelectPath(item);
							}
						},
						cat_name,
						'\uFF08',
						count,
						'\uFF09'
					);
				})
			);
		}
	}]);
	return Paths;
}(_react.Component);

Paths.propTypes = {};

exports.default = Paths;