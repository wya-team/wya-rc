'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _Core = require('./Core.js');

var _Core2 = _interopRequireDefault(_Core);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImgsPreview = (_temp = _class = function (_React$Component) {
	(0, _inherits3.default)(ImgsPreview, _React$Component);

	function ImgsPreview() {
		var _ref;

		(0, _classCallCheck3.default)(this, ImgsPreview);

		for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
			params[_key] = arguments[_key];
		}

		var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = ImgsPreview.__proto__ || Object.getPrototypeOf(ImgsPreview)).call.apply(_ref, [this].concat(params)));

		_this.setRef = function (node, index) {
			_this.thumbnails = _this.thumbnails || [];
			_this.thumbnails[index] = node;
		};

		_this.handleShow = function (e, index) {
			e.preventDefault();
			var getThumbBoundsFn = function getThumbBoundsFn(index) {
				var thumbnail = _this.thumbnails[index];
				var img = thumbnail.getElementsByTagName('img')[0];
				var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				var rect = img.getBoundingClientRect();
				return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
			};
			var opts = _this.state.opts;

			opts.index = index;
			opts.getThumbBoundsFn = opts.getThumbBoundsFn || getThumbBoundsFn;
			_this.setState({
				show: true,
				opts: opts
			});
		};

		_this.handleClose = function () {
			_this.setState({
				show: false
			});
			_this.props.onClose();
		};

		_this.setSize = function () {
			// 懒加载未开发，自动适配尺寸
			var items = _this.instance.items;

			items.forEach(function (item) {
				if (item.src && !_this.imgs.includes(item.src)) {
					var img = new Image();
					img.src = item.src;
					img.onload = function () {
						_this.imgs.push(img);
						item.w = img.naturalWidth;
						item.h = img.naturalHeight;
						_this.instance.updateSize(true);
					};
				}
			});
		};

		_this.state = {
			show: _this.props.show,
			opts: _this.props.opts
		};

		_this.imgs = [];
		return _this;
	}

	(0, _createClass3.default)(ImgsPreview, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var show = this.state.show;

			if (nextProps.show) {
				if (!show) {
					this.setState({ show: true });
				}
			} else if (show) {
				this.setState({ show: false });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    dataSource = _props.dataSource,
			    renderRow = _props.renderRow,
			    style = _props.style,
			    className = _props.className,
			    other = (0, _objectWithoutProperties3.default)(_props, ['dataSource', 'renderRow', 'style', 'className']);
			var _state = this.state,
			    show = _state.show,
			    opts = _state.opts;

			return _react2.default.createElement(
				_react.Fragment,
				null,
				_react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)(['rc-imgs-preview', className]).trim(),
						style: (0, _extends3.default)({ display: 'flex', flexWrap: 'wrap' }, style)
					},
					dataSource.map(function (item, index) {
						return _react2.default.createElement(
							'div',
							{
								key: index,
								ref: function ref(node) {
									return _this2.setRef(node, index);
								},
								onClick: function onClick(e) {
									return _this2.handleShow(e, index);
								}
							},
							renderRow(item)
						);
					})
				),
				_react2.default.createElement(_Core2.default, (0, _extends3.default)({
					ref: 'core',
					imageLoadComplete: this.setSize
				}, (0, _lodash.pick)(other, _events2.default), {
					setInstance: function setInstance(instance) {
						return _this2.instance = instance;
					},
					show: show,
					dataSource: dataSource,
					opts: opts,
					onClose: this.handleClose
				}))
			);
		}
	}]);
	return ImgsPreview;
}(_react2.default.Component), _class.PhotoSwipe = _Core2.default, _temp);


ImgsPreview.propTypes = {
	dataSource: _propTypes2.default.array.isRequired,
	opts: _propTypes2.default.object,
	renderRow: _propTypes2.default.func,
	className: _propTypes2.default.string,
	show: _propTypes2.default.bool,
	onClose: _propTypes2.default.func
};

ImgsPreview.defaultProps = {
	opts: {},
	renderRow: function renderRow(item) {
		return _react2.default.createElement('img', { src: item.thumbnail || item.msrc || item.src, width: '100', height: '100', alt: '' });
	},
	className: '',
	show: false,
	onClose: function onClose() {}
};

exports.default = ImgsPreview;