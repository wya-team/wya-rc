'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _message16 = require('antd/lib/message');

var _message17 = _interopRequireDefault(_message16);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

require('antd/lib/icon/style');

require('antd/lib/message/style');

require('antd/lib/modal/style');

require('antd/lib/input/style');

require('antd/lib/radio/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../rc-instance/index');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _radio2.default.Group;

var Item = function (_Component) {
	(0, _inherits3.default)(Item, _Component);

	function Item(props, context) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, Item);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props, context));

		_this.handleRename = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var inputText, _this$props$itemData, file_id, file_name, PGallery, _ref2, _url, _ref3, url, request, param;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							inputText = void 0;
							_context.prev = 1;
							_this$props$itemData = _this.props.itemData, file_id = _this$props$itemData.file_id, file_name = _this$props$itemData.file_name;
							_context.next = 5;
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
											'\u4FEE\u6539\u5185\u5BB9'
										),
										_react2.default.createElement(_icon2.default, { type: 'close' })
									),
									content: _react2.default.createElement(_input2.default, {
										type: 'text',
										placeholder: '\u65B0\u5EFA\u5206\u7C7B',
										defaultValue: '' + file_name,
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
											document.querySelector("#vc-input").value = file_name;
											$reject();
										});
									}
								});
							});

						case 5:
							inputText = _context.sent;

							_message17.default.destroy();
							_message17.default.loading('加载中...', 0);
							PGallery = _index2.default.config.PGallery;
							_ref2 = PGallery || {}, _url = _ref2.URL_PGALLERY_IMGS_ITEM_RENAME_POST;
							_ref3 = _this.props.url || {}, url = _ref3.URL_PGALLERY_IMGS_ITEM_RENAME_POST;
							request = _this.props.request;
							param = {
								file_id: file_id,
								file_name: inputText
							};

							request({
								url: url || _url,
								type: "POST",
								param: param
							}).then(function (res) {
								_message17.default.destroy();
								_this.props.onSetItem(file_id, { file_name: param.file_name });
							}).catch(function () {
								var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

								_message17.default.destroy();
								res.msg && _message17.default.error(res.msg);
							});
							_context.next = 19;
							break;

						case 16:
							_context.prev = 16;
							_context.t0 = _context['catch'](1);

							console.log(_context.t0);

						case 19:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[1, 16]]);
		}));

		_this.handleDel = function (e) {
			var itemData = _this.props.itemData;

			var _ref4 = itemData || {},
			    file_id = _ref4.file_id,
			    file = _ref4.file,
			    file_name = _ref4.file_name;

			_message17.default.destroy();
			_message17.default.loading('加载中...', 0);
			var PGallery = _index2.default.config.PGallery;

			var _ref5 = PGallery || {},
			    _url = _ref5.URL_PGALLERY_IMGS_ITEM_DEL_POST;

			var _ref6 = _this.props.url || {},
			    url = _ref6.URL_PGALLERY_IMGS_ITEM_DEL_POST;

			var request = _this.props.request;

			var param = {
				file_id: file_id
			};
			request({
				url: url || _url,
				type: "POST",
				param: param
			}).then(function (res) {
				_message17.default.destroy();
				_this.props.onInit();
			}).catch(function () {
				var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_message17.default.destroy();
				res.msg && _message17.default.error(res.msg);
			});
		};

		_this.handleMove = function () {
			var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(e) {
				var inputCatId, _this$props, _this$props$itemData2, file_id, file_name, paths, cat_id, itemData, PGallery, _ref8, _url, _ref9, url, request, param;

				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								inputCatId = void 0;
								_context2.prev = 1;
								_this$props = _this.props, _this$props$itemData2 = _this$props.itemData, file_id = _this$props$itemData2.file_id, file_name = _this$props$itemData2.file_name, paths = _this$props.paths, cat_id = _this$props.pathSelect.cat_id;
								_context2.next = 5;
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
												'\u9009\u62E9'
											),
											_react2.default.createElement(_icon2.default, { type: 'close' })
										),
										content: _react2.default.createElement(
											'div',
											{ className: 'wp-gallery-radio' },
											_react2.default.createElement(RadioGroup, {
												options: (0, _utils.initSelect)(paths, 'cat_id', 'cat_name'),
												onChange: function onChange(e) {
													return inputCatId = e.target.value;
												},
												defaultValue: cat_id
											})
										),
										iconType: "exclamation-circle-o",
										closable: true,
										okText: "确认",
										onOk: function onOk() {
											if (inputCatId && inputCatId != cat_id) {
												resolve(inputCatId);
											}
										},
										cancelText: "取消",
										onCancel: function onCancel() {
											// return new Promise(($resolve, $reject) => {
											// 	$reject();
											// });
										}
									});
								});

							case 5:
								inputCatId = _context2.sent;
								itemData = _this.props.itemData;

								_message17.default.destroy();
								_message17.default.loading('加载中...', 0);
								PGallery = _index2.default.config.PGallery;
								_ref8 = PGallery || {}, _url = _ref8.URL_PGALLERY_IMGS_ITEM_MOVE_POST;
								_ref9 = _this.props.url || {}, url = _ref9.URL_PGALLERY_IMGS_ITEM_MOVE_POST;
								request = _this.props.request;
								param = {
									file_id: file_id,
									cat_id: inputCatId
								};

								request({
									url: url || _url,
									type: "POST",
									param: param
								}).then(function (res) {
									paths.map(function (item, index) {
										if (item.cat_id == cat_id) {
											return (0, _extends3.default)({}, item, {
												count: item.count--
											});
										} else if (item.cat_id == inputCatId) {
											return (0, _extends3.default)({}, item, {
												count: item.count++
											});
										}
										return item;
									});
									_message17.default.destroy();
									_this.props.onInit();
									_this.props.onSet({
										paths: paths
									});
								}).catch(function () {
									var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

									_message17.default.destroy();
									res.msg && _message17.default.error(res.msg);
								});
								_context2.next = 20;
								break;

							case 17:
								_context2.prev = 17;
								_context2.t0 = _context2['catch'](1);

								console.log(_context2.t0);

							case 20:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this2, [[1, 17]]);
			}));

			return function (_x3) {
				return _ref7.apply(this, arguments);
			};
		}();

		return _this;
	}

	(0, _createClass3.default)(Item, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    itemData = _props.itemData,
			    selectItem = _props.selectItem;

			var _ref10 = itemData || {},
			    file_id = _ref10.file_id,
			    file_url = _ref10.file_url,
			    file_name = _ref10.file_name;

			return _react2.default.createElement(
				'div',
				{ className: '__item' },
				_react2.default.createElement('img', { src: file_url, alt: '', onClick: function onClick(e) {
						return _this3.props.onSelect(itemData);
					} }),
				selectItem.file_id == file_id && _react2.default.createElement(_icon2.default, { className: '__select', type: 'check-circle', onClick: function onClick(e) {
						return _this3.props.onSelect(itemData);
					} }),
				_react2.default.createElement(
					'div',
					{ className: '__line' },
					_react2.default.createElement(
						'span',
						null,
						file_name
					)
				),
				_react2.default.createElement(
					'small',
					{ className: '__edits' },
					_react2.default.createElement(
						'div',
						{
							onClick: this.handleRename
						},
						'\u91CD\u547D\u540D'
					),
					_react2.default.createElement(
						'div',
						{
							onClick: this.handleMove
						},
						'\u4FEE\u6539\u5206\u7EC4'
					),
					_react2.default.createElement(
						'div',
						{
							onClick: this.handleDel
						},
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