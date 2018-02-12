"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(props) {
	var itemArr = props.itemArr,
	    itemObj = props.itemObj,
	    onClick = props.onClick,
	    selectObj = props.selectObj,
	    activeText = props.activeText,
	    staticText = props.staticText,
	    component = props.component,
	    disableText = props.disableText,
	    disableSelect = props.disableSelect;

	return _react2.default.createElement(
		"div",
		{ className: "__content" },
		itemArr.map(function (item, index) {
			return (0, _react.createElement)(component, {
				key: item + "_" + index,
				itemData: itemObj[item],
				onClick: onClick,
				show: selectObj[item],
				activeText: activeText,
				staticText: staticText,
				disableText: disableText,
				disableSelect: disableSelect
			});
		})
	);
};
exports.default = List;