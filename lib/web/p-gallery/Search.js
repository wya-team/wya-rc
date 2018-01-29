'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function (_Component) {
	(0, _inherits3.default)(Search, _Component);

	function Search(props, context) {
		(0, _classCallCheck3.default)(this, Search);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props, context));

		_this.handleSearch = function (value) {
			_this.props.onSearch(value);
		};

		return _this;
	}

	(0, _createClass3.default)(Search, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_input2.default.Search, {
				style: { float: 'right', width: 300 },
				placeholder: '\u641C\u7D22\u56FE\u7247',
				onSearch: this.handleSearch,
				enterButton: true
			});
		}
	}]);
	return Search;
}(_react.Component);

Search.propTypes = {};

exports.default = Search;