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

require('./Calendar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowNumber = 6; /**
                    * 日历
                    */

var colNumber = 7;

var Calendar = function (_Component) {
	(0, _inherits3.default)(Calendar, _Component);

	function Calendar(props) {
		(0, _classCallCheck3.default)(this, Calendar);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

		_this.getCalendarArray = function ($props) {
			var selectedDate = $props.selectedDate;

			var date = void 0,
			    year = void 0,
			    lastYear = void 0,
			    nextYear = void 0,
			    month = void 0,
			    lastMonth = void 0,
			    nextMonth = void 0,
			    lastMonthArray = void 0,
			    currentMonthArray = void 0,
			    nextMonthArray = void 0;

			if (!selectedDate) {
				date = new Date();
				year = date.getFullYear();
				month = parseInt(date.getMonth() + 1); // 0-11, 0为1月份
			} else {
				date = selectedDate.split('-');
				year = parseInt(date[0]);
				month = parseInt(date[1]);
			}

			lastYear = year;
			nextYear = year;
			lastMonth = month - 1;
			nextMonth = month + 1;

			if (month === 1) {
				lastYear = year - 1;
				lastMonth = 12;
			} else if (month === 12) {
				nextYear = year + 1;
				nextMonth = 1;
			}

			lastMonthArray = _this.createDaysArray(lastYear, lastMonth, _this.getMonthDays(lastYear, lastMonth), _this.getMonthType(lastYear, lastMonth, selectedDate));
			currentMonthArray = _this.createDaysArray(year, month, _this.getMonthDays(year, month), _this.getMonthType(year, month, selectedDate));
			nextMonthArray = _this.createDaysArray(nextYear, nextMonth, _this.getMonthDays(nextYear, nextMonth), _this.getMonthType(nextYear, nextMonth, selectedDate));

			// 生成日历数组
			var firstWeek = _this.getWeek(year + '-' + _this.formatNum(month) + '-1'); // 本月第一天是星期几
			var dateArray = [].concat((0, _toConsumableArray3.default)(lastMonthArray.slice(lastMonthArray.length - (firstWeek === 0 ? 7 : firstWeek), lastMonthArray.length)), (0, _toConsumableArray3.default)(currentMonthArray), (0, _toConsumableArray3.default)(nextMonthArray.slice(0, 42 - firstWeek - currentMonthArray.length)));

			_this.setState({
				calendarData: dateArray
			});
		};

		_this.createDaysArray = function (year, month, days, type) {
			var array = [];
			for (var i = 0; i < days; i++) {
				var item = {};
				item.dateName = year + '-' + _this.formatNum(month) + '-' + _this.formatNum(i + 1);
				item.day = i + 1;
				item.type = type;
				array.push(item);
			}
			return array;
		};

		_this.getMonthDays = function (year, month) {
			var day = new Date(year, month, 0);
			return day.getDate();
		};

		_this.getMonthType = function (year, month, selectedDate) {
			var curDate = void 0,
			    date = void 0,
			    curYear = void 0,
			    curMonth = void 0,
			    selectedYear = void 0,
			    selectedMonth = void 0,
			    dateType = void 0,
			    selectedType = void 0;
			if (!selectedDate) {
				curDate = new Date();
				curYear = curDate.getFullYear();
				selectedYear = curYear;
				curMonth = parseInt(curDate.getMonth() + 1); // 0-11, 0为1月份
				selectedMonth = curMonth;
			} else {
				date = selectedDate.split('-');
				curDate = new Date();
				curYear = curDate.getFullYear();
				selectedYear = parseInt(date[0]);
				curMonth = parseInt(curDate.getMonth() + 1); // 0-11, 0为1月份
				selectedMonth = parseInt(date[1]);
			}
			if (month < curMonth && year <= curYear) {
				dateType = 'last';
			} else if (year == curYear && month == curMonth) {
				dateType = 'current';
			} else if (year == curYear && month > curMonth || year > curYear) {
				dateType = 'next';
			}
			if (month < selectedMonth && year <= selectedYear) {
				selectedType = 'last';
			} else if (year == selectedYear && month == selectedMonth) {
				selectedType = 'current';
			} else if (year == selectedYear && month > selectedMonth || year > selectedYear) {
				selectedType = 'next';
			}
			return { dateType: dateType, selectedType: selectedType };
		};

		_this.formatNum = function (num) {
			if (num < 10) {
				return '0' + num;
			}
			return num;
		};

		_this.getWeek = function (dateString) {
			var date = void 0;
			if (!dateString) {
				date = new Date();
			} else {
				var dateArray = dateString.split('-');
				date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
			}

			// return "星期" + "日一二三四五六".charAt(date.getDay());
			return date.getDay();
		};

		_this.renderRow = function (rowNum) {
			var _this$props = _this.props,
			    tipInfo = _this$props.tipInfo,
			    renderDayItem = _this$props.renderDayItem;
			var calendarData = _this.state.calendarData;


			var rowData = calendarData.slice((rowNum - 1) * 7, rowNum * 7);

			return _react2.default.createElement(
				'div',
				{ className: '_flex-ac _bg-white', style: { width: '100%' } },
				rowData.map(function (item, index) {
					return _react2.default.createElement(renderDayItem, {
						key: rowNum + '-' + index,
						itemData: item
					});
				})
			);
		};

		_this.renderCalendar = function () {
			var table = [];
			for (var i = 0; i < rowNumber; i++) {
				table[i] = _this.renderRow(i + 1);
			}

			return _react2.default.createElement(
				'div',
				{ className: '_flex-ac _bg-white _fd-c' },
				table
			);
		};

		_this.state = {
			calendarData: []
		};
		return _this;
	}

	(0, _createClass3.default)(Calendar, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.getCalendarArray(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.selectedDate != nextProps.selectedDate) {
				this.getCalendarArray(nextProps);
			}
		}

		// 创建每个月天数的数组


		// 获取某月的天数


		// 是当前月份还是上一月


		// 小于10的数字前面加0


		// 根据日期判断是星期几

	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    weekClassName = _props.weekClassName;

			var classes = "c-calendar " + className;
			var weekClasses = "_flex-col _tc " + weekClassName;
			return _react2.default.createElement(
				'div',
				{ className: classes },
				_react2.default.createElement(
					'div',
					{ className: '_header _flex-ac' },
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u65E5'
					),
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u4E00'
					),
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u4E8C'
					),
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u4E09'
					),
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u56DB'
					),
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u4E94'
					),
					_react2.default.createElement(
						'span',
						{ className: weekClasses },
						'\u516D'
					)
				),
				this.renderCalendar()
			);
		}
	}]);
	return Calendar;
}(_react.Component);

Calendar.propTypes = {
	renderDayItem: _propTypes2.default.func.isRequired,
	selectedDate: _propTypes2.default.string,
	className: _propTypes2.default.string,
	weekClassName: _propTypes2.default.string
};
Calendar.defaultProps = {};

exports.default = Calendar;