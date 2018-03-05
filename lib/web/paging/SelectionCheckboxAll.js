'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('antd/lib/checkbox/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectionCheckboxAll = function (_Component) {
	(0, _inherits3.default)(SelectionCheckboxAll, _Component);

	function SelectionCheckboxAll() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, SelectionCheckboxAll);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectionCheckboxAll.__proto__ || Object.getPrototypeOf(SelectionCheckboxAll)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectAllChange = function () {
			var onChange = _this.props.onChange;

			onChange && onChange();
		}, _this.getCheckedState = function () {
			var _this$props = _this.props,
			    data = _this$props.data,
			    changeableRows = _this$props.changeableRows;

			if (data) {
				for (var i = 0; i < changeableRows.length; i++) {
					if (!data[changeableRows[i]]) {
						return false;
					}
				}
				return true;
			}
			return false;
		}, _this.getIndeterminateState = function () {
			var _this$props2 = _this.props,
			    data = _this$props2.data,
			    changeableRows = _this$props2.changeableRows;

			if (data) {
				var arr = [];
				for (var i = 0; i < changeableRows.length; i++) {
					if (data[changeableRows[i]]) {
						arr.push(i);
					}
				}
				return arr.length < changeableRows.length && arr.length > 0;
			}
			return false;
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(SelectionCheckboxAll, [{
		key: 'render',
		value: function render() {

			return _react2.default.createElement(_checkbox2.default, {
				checked: this.getCheckedState(),
				indeterminate: this.getIndeterminateState(),
				onChange: this.handleSelectAllChange
			});
		}
	}]);
	return SelectionCheckboxAll;
}(_react.Component); /**
                      * 全选按钮
                      */


exports.default = SelectionCheckboxAll;