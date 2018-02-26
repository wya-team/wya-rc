'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _message11 = require('antd/lib/message');

var _message12 = _interopRequireDefault(_message11);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd/lib/message/style');

require('antd/lib/modal/style');

require('antd/lib/input/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../rc-instance/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PathsEdit = function (_Component) {
	(0, _inherits3.default)(PathsEdit, _Component);

	function PathsEdit(props, context) {
		var _this2 = this;

		(0, _classCallCheck3.default)(this, PathsEdit);

		var _this = (0, _possibleConstructorReturn3.default)(this, (PathsEdit.__proto__ || Object.getPrototypeOf(PathsEdit)).call(this, props, context));

		_this.handleRename = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var res, _this$props, pathSelect, paths, _pathSelect, cat_name, cat_id, PGallery, _ref2, _url, _ref3, url, request, param;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							res = void 0;
							_context.prev = 1;
							_this$props = _this.props, pathSelect = _this$props.pathSelect, paths = _this$props.paths;
							_pathSelect = pathSelect, cat_name = _pathSelect.cat_name, cat_id = _pathSelect.cat_id;
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
											'\u4FEE\u6539\u5185\u5BB9'
										),
										_react2.default.createElement(_icon2.default, { type: 'close' })
									),
									content: _react2.default.createElement(_input2.default, {
										type: 'text',
										placeholder: '\u65B0\u5EFA\u5206\u7C7B',
										defaultValue: '' + cat_name,
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
											document.querySelector("#vc-input").value = cat_name;
											$reject();
										});
									}
								});
							});

						case 6:
							res = _context.sent;

							_message12.default.destroy();
							_message12.default.loading('加载中...', 0);
							PGallery = _index2.default.config.PGallery;
							_ref2 = PGallery || {}, _url = _ref2.URL_PGALLERY_PATHS_ITEM_RENAME_POST;
							_ref3 = _this.props.url || {}, url = _ref3.URL_PGALLERY_PATHS_ITEM_RENAME_POST;
							request = _this.props.request;
							param = {
								cat_id: cat_id,
								cat_name: res
							};

							request({
								url: url || _url,
								type: "POST",
								param: param
							}).then(function (res) {
								_message12.default.destroy();
								pathSelect = (0, _extends3.default)({}, pathSelect, param);
								paths = paths.map(function (item, index) {
									if (item.cat_id === pathSelect.cat_id) {
										return pathSelect;
									}
									return item;
								});
								_this.props.onSet({
									pathSelect: pathSelect,
									paths: paths
								});
							}).catch(function (res) {
								_message12.default.destroy();
								_message12.default.error(res.msg);
								console.log(res);
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

		_this.handleDel = function () {
			_modal2.default.confirm({
				title: '你确定要删除这些内容么?',
				content: '',
				iconType: "",
				onOk: function onOk() {
					_message12.default.destroy();
					_message12.default.loading('加载中...', 0);
					var PGallery = _index2.default.config.PGallery;

					var _ref4 = PGallery || {},
					    _url = _ref4.URL_PGALLERY_PATHS_ITEM_DEL_POST;

					var _ref5 = _this.props.url || {},
					    url = _ref5.URL_PGALLERY_PATHS_ITEM_DEL_POST;

					var _this$props2 = _this.props,
					    request = _this$props2.request,
					    cat_id = _this$props2.pathSelect.cat_id;

					request({
						url: url || _url,
						type: "POST",
						param: {
							cat_id: cat_id
						}
					}).then(function (res) {
						_message12.default.destroy();
						var _this$props3 = _this.props,
						    paths = _this$props3.paths,
						    pathSelect = _this$props3.pathSelect;

						paths = paths.filter(function (item, index) {
							return item.cat_id !== pathSelect.cat_id;
						});
						_this.props.onSet({
							pathSelect: (0, _extends3.default)({}, paths[0]),
							paths: paths
						});
					}).catch(function (res) {
						_message12.default.destroy();
						res.msg && _message12.default.error(res.msg, 1.5);
					});
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
			var cat_id = this.props.pathSelect.cat_id;

			if (cat_id == 0) return null;
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