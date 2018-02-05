"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function (_Component) {
	(0, _inherits3.default)(Item, _Component);

	function Item(props, text) {
		(0, _classCallCheck3.default)(this, Item);
		return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props, text));
	}

	(0, _createClass3.default)(Item, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    _props$itemData = _props.itemData,
			    itemData = _props$itemData === undefined ? {} : _props$itemData,
			    _onClick = _props.onClick,
			    show = _props.show,
			    activeText = _props.activeText,
			    staticText = _props.staticText;
			var product_name = itemData.product_name,
			    cover_img = itemData.cover_img,
			    product_id = itemData.product_id;


			return _react2.default.createElement(
				"div",
				{ className: "__item" },
				_react2.default.createElement(
					"div",
					{ className: "__img" },
					_react2.default.createElement("img", {
						src: "" + cover_img,
						style: { width: '60px', height: '60px' }
					}),
					_react2.default.createElement(
						"div",
						{ style: { paddingLeft: '20px' } },
						product_name
					)
				),
				_react2.default.createElement(
					"div",
					{ style: { textAlign: 'right' } },
					_react2.default.createElement(
						"div",
						{
							onClick: function onClick() {
								return _onClick(!show, product_id, itemData);
							},
							className: "__btn " + (show ? '__active' : '')
						},
						show ? activeText : staticText
					)
				)
			);
		}
	}]);
	return Item;
}(_react.Component);

exports.default = Item;