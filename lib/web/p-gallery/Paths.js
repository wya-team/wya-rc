'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paths = function (_Component) {
	(0, _inherits3.default)(Paths, _Component);

	function Paths(props, context) {
		(0, _classCallCheck3.default)(this, Paths);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Paths.__proto__ || Object.getPrototypeOf(Paths)).call(this, props, context));

		_this.handleAddPath = function () {
			_this.props.onSet({
				paths: [].concat((0, _toConsumableArray3.default)(_this.props.paths), [{
					id: Date.now(),
					name: '新建分类',
					count: 0
				}])
			});
		};

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
			var _this2 = this;

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
					var id = item.id,
					    name = item.name,
					    _item$count = item.count,
					    count = _item$count === undefined ? 0 : _item$count;

					return _react2.default.createElement(
						'div',
						{
							key: id,
							className: (0, _classnames2.default)({ '__select': pathSelect.id == id }),
							onClick: function onClick(e) {
								return _this2.handleSelectPath(item);
							}
						},
						name,
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