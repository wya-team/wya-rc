'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tree = require('antd/lib/tree');

var _tree2 = _interopRequireDefault(_tree);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

require('antd/lib/tree/style');

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNode = _tree2.default.TreeNode;

var Paths = function (_Component) {
	(0, _inherits3.default)(Paths, _Component);

	function Paths(props, context) {
		(0, _classCallCheck3.default)(this, Paths);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Paths.__proto__ || Object.getPrototypeOf(Paths)).call(this, props, context));

		_this.onLoadData = function (treeNode) {
			return new Promise(function (resolve) {
				if (treeNode.props.children) {
					resolve();
					return;
				}
				setTimeout(function () {
					treeNode.props.dataRef.children = [// 浅复制
					{
						title: 'Child Node',
						key: treeNode.props.eventKey + '-0'
					}, {
						title: 'Child Node',
						key: treeNode.props.eventKey + '-1'
					}];
					// treeNode = {
					// 	...treeNode.props, 
					// 	dataRef: {
					// 		...treeNode.props.dataRef,
					// 		children: [ // 浅复制
					// 			{ 
					// 				title: 'Child Node', 
					// 				key: `${treeNode.props.eventKey}-0` 
					// 			},
					// 			{ 
					// 				title: 'Child Node', 
					// 				key: `${treeNode.props.eventKey}-1` 
					// 			},
					// 		]
					// 	}
					// };
					_this.setState({
						treeData: [].concat((0, _toConsumableArray3.default)(_this.state.treeData))
					});
					resolve();
				}, 1000);
			});
		};

		_this.handleSelect = function (selectedKeys, e) {
			console.log(e);
		};

		_this.handleChange = function (e, key) {
			_this.refs[key].props.dataRef.title = e.target.value;
			_this.setState({
				treeData: [].concat((0, _toConsumableArray3.default)(_this.state.treeData))
			});
		};

		_this.renderTreeNodes = function (data) {
			return data.map(function (item) {
				if (item.children) {
					return _react2.default.createElement(
						TreeNode,
						(0, _defineProperty3.default)({
							title: item.title,
							ref: item.key,
							key: item.key,
							dataRef: item
						}, 'title', _react2.default.createElement(_input2.default, {
							type: 'text',
							value: item.title,
							onChange: function onChange(e) {
								return _this.handleChange(e, item.key);
							}
						})),
						_this.renderTreeNodes(item.children)
					);
				}
				return _react2.default.createElement(TreeNode, {
					ref: item.key,
					key: item.key,
					dataRef: item,
					title: _react2.default.createElement(_input2.default, {
						type: 'text',
						value: item.title,
						onChange: function onChange(e) {
							return _this.handleChange(e, item.key);
						}
					})
				});
			});
		};

		_this.state = {
			treeData: [{
				title: 'Expand to load',
				key: '0'
			}, {
				title: 'Expand to load',
				key: '1'
			}, {
				title: 'Tree Node',
				key: '2',
				isLeaf: true
			}]
		};
		return _this;
	}

	(0, _createClass3.default)(Paths, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_tree2.default,
				{
					showLine: true,
					loadData: this.onLoadData,
					onSelect: this.handleSelect,
					className: '__paths'
				},
				this.renderTreeNodes(this.state.treeData)
			);
		}
	}]);
	return Paths;
}(_react.Component);

Paths.propTypes = {};

exports.default = Paths;