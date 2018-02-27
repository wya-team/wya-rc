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
	    selectArr = props.selectArr,
	    activeText = props.activeText,
	    staticText = props.staticText,
	    component = props.component,
	    disableText = props.disableText,
	    disableArr = props.disableArr;

	return _react2.default.createElement(
		"div",
		{ className: "__content" },
		itemArr.map(function (item, index) {
			return (0, _react.createElement)(component, {
				key: item + "_" + index,
				itemData: itemObj[item],
				onClick: onClick,
				activeText: activeText,
				staticText: staticText,
				disableText: disableText,
				disableArr: disableArr,
				selectArr: selectArr
			});
		})
	);
};
exports.default = List;