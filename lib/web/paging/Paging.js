'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pagination = require('antd/lib/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

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

require('antd/lib/pagination/style');

require('antd/lib/spin/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Paging.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paging = function (_Component) {
	(0, _inherits3.default)(Paging, _Component);

	function Paging(props, context) {
		(0, _classCallCheck3.default)(this, Paging);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props, context));

		_this.state = {};
		_this.wrapper = props.wrapper;
		_this.bindScroll = _this.bindScroll.bind(_this);
		_this.handleChange = _this.handleChange.bind(_this);
		_this.firstReq = _this.firstReq.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Paging, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isEnd === 0) {
				// 禁用，加载完成或者加载中无视
				this.firstReq(this.props);
			}
			this.bindScroll();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.resetPrvScrollTop && nextProps.resetPrvScrollTop != this.props.resetPrvScrollTop) {
				this.prvScrollTop = 0;
				this.scrollContainer.scrollTop = 0; // 置顶
			}
			if (nextProps.isEnd === 0) {
				// 禁用，加载完成或者加载中无视
				this.firstReq(nextProps);
			}
		}
	}, {
		key: 'componentDidCatch',
		value: function componentDidCatch(error, info) {
			console.log(error, info);
		}
	}, {
		key: 'handleChange',
		value: function handleChange(pages) {
			this.props.loadDataForPaging && this.props.loadDataForPaging(pages);
		}
	}, {
		key: 'bindScroll',
		value: function bindScroll() {
			this.scrollContainer = this.wrapper ? document.querySelector(this.wrapper) : document.body;
		}
	}, {
		key: 'firstReq',
		value: function firstReq() {
			var curProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			// 第一次请求
			var isEnd = curProps.isEnd,
			    curPage = curProps.curPage,
			    loadDataForPaging = curProps.loadDataForPaging;

			if (curPage == 0) {
				// 这里使用this.props.curPage
				var nextPage = this.props.resetPage == curProps.resetPage ? this.props.curPage : 1;
				loadDataForPaging && loadDataForPaging(nextPage);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    isEnd = _props.isEnd,
			    title = _props.title,
			    _props$style = _props.style,
			    style = _props$style === undefined ? {} : _props$style,
			    className = _props.className,
			    curPage = _props.curPage,
			    totalPage = _props.totalPage,
			    children = _props.children,
			    tHide = _props.tHide,
			    pagination = (0, _objectWithoutProperties3.default)(_props, ['isEnd', 'title', 'style', 'className', 'curPage', 'totalPage', 'children', 'tHide']);

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)("c-paging", className), style: (0, _extends3.default)({}, style) },
				_react2.default.createElement(
					'div',
					{ className: '__conent' },
					tHide ? children[0] || children : _react2.default.createElement(
						'table',
						{ className: '__table' },
						_react2.default.createElement(
							'thead',
							null,
							_react2.default.createElement(
								'tr',
								null,
								title.map(function (item, index) {
									return _react2.default.createElement(
										'th',
										{ key: index },
										item
									);
								})
							)
						),
						children[0] || children
					)
				),
				isEnd === 1 && _react2.default.createElement(_spin2.default, null),
				isEnd === 3 && _react2.default.createElement(
					'div',
					{ className: '__error' },
					'\u52A0\u8F7D\u5931\u8D25...'
				),
				_react2.default.createElement(
					'div',
					{ className: '__footer' },
					_react2.default.createElement(
						'div',
						{ className: '__left' },
						children[1] || ''
					),
					_react2.default.createElement(_pagination2.default, (0, _extends3.default)({}, pagination, {
						showQuickJumper: true,
						defaultPageSize: 1,
						current: curPage,
						total: totalPage,
						onChange: this.handleChange
					}))
				)
			);
		}
	}]);
	return Paging;
}(_react.Component);

Paging.propTypes = {
	title: _propTypes2.default.array,
	className: _propTypes2.default.string,
	isEnd: _propTypes2.default.number.isRequired,
	curPage: _propTypes2.default.number.isRequired,
	totalPage: _propTypes2.default.number.isRequired,
	loadDataForPaging: _propTypes2.default.func.isRequired,
	resetPrvScrollTop: _propTypes2.default.number,
	resetPage: _propTypes2.default.string,
	tHide: _propTypes2.default.bool
};
Paging.defaultProps = {
	title: [],
	tHide: false,
	className: '__defalut'
};
exports.default = Paging;