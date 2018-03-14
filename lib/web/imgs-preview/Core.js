'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _photoswipe = require('photoswipe');

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

require('photoswipe/dist/photoswipe.css');

require('photoswipe/dist/default-skin/default-skin.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import "photoswipe/src/css/main.scss";
// import "photoswipe/src/css/default-skin/default-skin.scss";
// 
var Core = function (_React$Component) {
	(0, _inherits3.default)(Core, _React$Component);

	function Core() {
		var _ref;

		(0, _classCallCheck3.default)(this, Core);

		for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
			params[_key] = arguments[_key];
		}

		var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Core.__proto__ || Object.getPrototypeOf(Core)).call.apply(_ref, [this].concat(params)));

		_this.openPhotoSwipe = function (props) {
			var dataSource = props.dataSource,
			    opts = props.opts,
			    setInstance = props.setInstance;

			var pswpElement = _this.pswpElement;
			_this.photoSwipe = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, dataSource, opts);
			setInstance && setInstance(_this.photoSwipe);
			_events2.default.forEach(function (event) {
				var callback = props[event];
				if (callback || event === 'destroy') {
					var self = _this;
					_this.photoSwipe.listen(event, function () {
						if (callback) {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							args.unshift(this);
							callback.apply(undefined, args);
						}
						if (event === 'destroy') {
							self.handleClose();
						}
					});
				}
			});
			_this.setState({
				show: true
			}, function () {
				_this.photoSwipe.init();
			});
		};

		_this.updateItems = function () {
			var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			_this.photoSwipe.items.length = 0;
			items.forEach(function (item) {
				_this.photoSwipe.items.push(item);
			});
			_this.photoSwipe.invalidateCurrItems();
			_this.photoSwipe.updateSize(true);
		};

		_this.closePhotoSwipe = function () {
			if (!_this.photoSwipe) {
				return;
			}
			_this.photoSwipe.close();
		};

		_this.handleClose = function () {
			var onClose = _this.props.onClose;

			_this.setState({
				show: false
			}, function () {
				if (onClose) {
					onClose();
				}
			});
		};

		_this.state = {
			show: _this.props.show
		};
		return _this;
	}

	(0, _createClass3.default)(Core, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var show = this.state.show;

			if (show) {
				this.openPhotoSwipe(this.props);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var show = this.state.show;

			if (nextProps.show) {
				if (!show) {
					this.openPhotoSwipe(nextProps);
				} else {
					this.updateItems(nextProps.dataSource);
				}
			} else if (show) {
				this.closePhotoSwipe();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.closePhotoSwipe();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var id = this.props.id;
			var className = this.props.className;

			className = (0, _classnames2.default)(['pswp', className]).trim();
			return _react2.default.createElement(
				'div',
				{
					id: id,
					className: className,
					tabIndex: '-1',
					role: 'dialog',
					'aria-hidden': 'true',
					ref: function ref(node) {
						_this2.pswpElement = node;
					}
				},
				_react2.default.createElement('div', { className: 'pswp__bg' }),
				_react2.default.createElement(
					'div',
					{ className: 'pswp__scroll-wrap' },
					_react2.default.createElement(
						'div',
						{ className: 'pswp__container' },
						_react2.default.createElement('div', { className: 'pswp__item' }),
						_react2.default.createElement('div', { className: 'pswp__item' }),
						_react2.default.createElement('div', { className: 'pswp__item' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'pswp__ui pswp__ui--hidden' },
						_react2.default.createElement(
							'div',
							{ className: 'pswp__top-bar' },
							_react2.default.createElement('div', { className: 'pswp__counter' }),
							_react2.default.createElement('button', {
								className: 'pswp__button pswp__button--close',
								title: 'Close (Esc)'
							}),
							_react2.default.createElement('button', {
								className: 'pswp__button pswp__button--fs',
								title: 'Toggle fullscreen'
							}),
							_react2.default.createElement('button', { className: 'pswp__button pswp__button--zoom', title: 'Zoom in/out' }),
							_react2.default.createElement(
								'div',
								{ className: 'pswp__preloader' },
								_react2.default.createElement(
									'div',
									{ className: 'pswp__preloader__icn' },
									_react2.default.createElement(
										'div',
										{ className: 'pswp__preloader__cut' },
										_react2.default.createElement('div', { className: 'pswp__preloader__donut' })
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'pswp__share-modal pswp__share-modal--hidden pswp__single-tap' },
							_react2.default.createElement('div', { className: 'pswp__share-tooltip' })
						),
						_react2.default.createElement('button', {
							className: 'pswp__button pswp__button--arrow--left',
							title: 'Previous (arrow left)'
						}),
						_react2.default.createElement('button', {
							className: 'pswp__button pswp__button--arrow--right',
							title: 'Next (arrow right)'
						}),
						_react2.default.createElement(
							'div',
							{ className: 'pswp__caption' },
							_react2.default.createElement('div', { className: 'pswp__caption__center' })
						)
					)
				)
			);
		}
	}]);
	return Core;
}(_react2.default.Component);

Core.propTypes = {
	show: _propTypes2.default.bool.isRequired,
	dataSource: _propTypes2.default.array.isRequired,
	opts: _propTypes2.default.object,
	onClose: _propTypes2.default.func,
	id: _propTypes2.default.string,
	className: _propTypes2.default.string
};

Core.defaultProps = {
	opts: {},
	onClose: function onClose() {},
	id: '',
	className: ''
};

exports.default = Core;