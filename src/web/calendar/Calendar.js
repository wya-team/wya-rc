/**
 * 日历
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Calendar.scss';

const rowNumber = 6;
const colNumber = 7;

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calendarData: []
		};
	}

	componentWillMount() {
		this.getCalendarArray(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedDate != nextProps.selectedDate) {
			this.getCalendarArray(nextProps);
		}
	}

	getCalendarArray = ($props) => {
		const { selectedDate } = $props;
		let date,
			year, lastYear, nextYear,
			month, lastMonth, nextMonth,
			lastMonthArray, currentMonthArray, nextMonthArray;

		if (!selectedDate) {
			date = new Date();
			year = date.getFullYear();
			month = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
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

		lastMonthArray = this.createDaysArray(lastYear, lastMonth, this.getMonthDays(lastYear, lastMonth), this.getMonthType(lastYear, lastMonth, selectedDate));
		currentMonthArray = this.createDaysArray(year, month, this.getMonthDays(year, month), this.getMonthType(year, month, selectedDate));
		nextMonthArray = this.createDaysArray(nextYear, nextMonth, this.getMonthDays(nextYear, nextMonth), this.getMonthType(nextYear, nextMonth, selectedDate));

		// 生成日历数组
		let firstWeek = this.getWeek(`${year}-${this.formatNum(month)}-1`); // 本月第一天是星期几
		let dateArray = [
			...lastMonthArray.slice(lastMonthArray.length - (firstWeek === 0 ? 7 : firstWeek), lastMonthArray.length),
			...currentMonthArray,
			...nextMonthArray.slice(0, 42 - firstWeek - currentMonthArray.length)
		];

		this.setState({
			calendarData: dateArray
		});
	};

	// 创建每个月天数的数组
	createDaysArray = (year, month, days, type) => {
		let array = [];
		for (let i = 0; i < days; i++) {
			let item = {};
			item.dateName = `${year}-${this.formatNum(month)}-${this.formatNum(i + 1)}`;
			item.day = i + 1;
			item.type = type;
			array.push(item);
		}
		return array;
	};

	// 获取某月的天数
	getMonthDays = (year, month) => {
		let day = new Date(year, month, 0);
		return day.getDate();
	};

	// 是当前月份还是上一月
	getMonthType = (year, month, selectedDate) => {
		let curDate, date, curYear, curMonth, selectedYear, selectedMonth, dateType, selectedType;
		if (!selectedDate) {
			curDate = new Date();
			curYear = curDate.getFullYear();
			selectedYear = curYear;
			curMonth = parseInt(curDate.getMonth() + 1);// 0-11, 0为1月份
			selectedMonth = curMonth;
		} else {
			date = selectedDate.split('-');
			curDate = new Date();
			curYear = curDate.getFullYear();
			selectedYear = parseInt(date[0]);
			curMonth = parseInt(curDate.getMonth() + 1);// 0-11, 0为1月份
			selectedMonth = parseInt(date[1]);
		}
		if (month < curMonth && year <= curYear) {
			dateType = 'last';
		} else if (year == curYear && month == curMonth) {
			dateType = 'current';
		} else if ((year == curYear && month > curMonth) || year > curYear) {
			dateType = 'next';
		}
		if (month < selectedMonth && year <= selectedYear) {
			selectedType = 'last';
		} else if (year == selectedYear && month == selectedMonth) {
			selectedType = 'current';
		} else if ((year == selectedYear && month > selectedMonth) || year > selectedYear) {
			selectedType = 'next';
		}
		return { dateType, selectedType };
	};

	// 小于10的数字前面加0
	formatNum = (num) => {
		if (num < 10) {
			return '0' + num;
		}
		return num;
	};

	// 根据日期判断是星期几
	getWeek = (dateString) => {
		let date;
		if (!dateString) {
			date = new Date();
		} else {
			let dateArray = dateString.split('-');
			date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
		}

		// return "星期" + "日一二三四五六".charAt(date.getDay());
		return date.getDay();
	};

	renderRow = (rowNum) => {
		const { tipInfo, renderDayItem } = this.props;
		const { calendarData } = this.state;

		let rowData = calendarData.slice((rowNum - 1) * 7, rowNum * 7);

		return (
			<div className="rc-flex-ac rc-white" style={{ width: '100%' }}>
				{
					rowData.map((item, index) => {
						return React.createElement(renderDayItem, {
							key: `${rowNum}-${index}`,
							itemData: item
						});
					})
				}
			</div>
		);
	};

	renderCalendar = () => {
		let table = [];
		for (let i = 0; i < rowNumber; i++) {
			table[i] = this.renderRow(i + 1);
		}

		return (
			<div className="rc-flex-ac rc-bg-white rc-fd-c">
				{table}
			</div>
		);
	};

	render () {
		const { className, weekClassName } = this.props;
		const classes = "c-calendar " + className;
		const  weekClasses = "rc-col rc-tc " + weekClassName;
		return (
			<div className={classes}>
				<div className="_header rc-flex-ac">
					<span className={weekClasses}>日</span>
					<span className={weekClasses}>一</span>
					<span className={weekClasses}>二</span>
					<span className={weekClasses}>三</span>
					<span className={weekClasses}>四</span>
					<span className={weekClasses}>五</span>
					<span className={weekClasses}>六</span>
				</div>
				{ this.renderCalendar() }
			</div>
		);
	}
}

Calendar.propTypes = {
	renderDayItem: PropTypes.func.isRequired,
	selectedDate: PropTypes.string,
	className: PropTypes.string,
	weekClassName: PropTypes.string,
};
Calendar.defaultProps = {

};

export default Calendar;
