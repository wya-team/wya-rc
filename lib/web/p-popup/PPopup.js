'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./PPopup.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PSelect = function (_Component) {
	(0, _inherits3.default)(PSelect, _Component);

	function PSelect(props, context) {
		(0, _classCallCheck3.default)(this, PSelect);

		var _this = (0, _possibleConstructorReturn3.default)(this, (PSelect.__proto__ || Object.getPrototypeOf(PSelect)).call(this, props, context));

		_this.setEl = function (node) {
			_this.el = _this.el || node;
		};

		_this.handleClose = function (e) {
			// 
			e && e.preventDefault();
			e && e.stopPropagation();

			_this.el.classList.remove('__active');
			_this.timer = setTimeout(function () {
				// 主线程
				_this && _this.props.onClose && _this.props.onClose();
			}, 201);
		};

		_this.handleSure = function (res) {
			_this.el.classList.remove('__active');
			_this.timer = setTimeout(function () {
				_this.props.onSure && _this.props.onSure(res);
			}, 201);
		};

		return _this;
	}

	(0, _createClass3.default)(PSelect, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.el.classList.add('__active');
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.timer && clearTimeout(this.timer);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    title = _props.title,
			    className = _props.className;

			var content = children[0] || children;
			var footer = children[1] || '';
			return _react2.default.createElement(
				'div',
				{ className: 'wp-popup' + (className ? ' ' + className : ''), ref: this.setEl },
				_react2.default.createElement('div', { className: '__mask', onClick: this.handleClose }),
				_react2.default.createElement(
					'div',
					{ className: '__container' },
					_react2.default.createElement(
						'div',
						{ className: '__header' },
						_react2.default.createElement(
							'div',
							null,
							title
						),
						_react2.default.createElement(_icon2.default, { type: 'close', onClick: this.handleClose })
					),
					(0, _react.cloneElement)(content, {
						onClose: this.handleClose,
						onSure: this.handleSure
					}),
					!!footer && (0, _react.cloneElement)(footer, {
						onClose: this.handleClose,
						onSure: this.handleSure
					})
				)
			);
		}
	}]);
	return PSelect;
}(_react.Component);

exports.default = PSelect;