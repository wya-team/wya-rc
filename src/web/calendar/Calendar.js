/**
 * 日历
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Calendar.scss';
import Item from './Item';

const rowNumber = 6;
const colNumber = 7;

class Calendar extends Component {
	constructor(props) {
		super(props);
		let { date } = props;
		const { year, month, data } =  this.getCurrentInfo(date.getFullYear(), parseInt(date.getMonth()) + 1);
		this.state = {
			curYear: year,
			curMonth: month,
			curData: data
		};
	}

	componentWillMount() {

	}
	// -- start 外部调用
	next = () => {
		const { curYear, curMonth } = this.state;
		return this.setDate(curYear, curMonth + 1);
	}
	prev = () => {
		const { curYear, curMonth } = this.state;
		return this.setDate(curYear, curMonth - 1);
	}
	setDate = (year, month) => {
		const { year: _year, month: _month, data } =  this.getCurrentInfo(year, month);
		this.setState({
			curYear: _year,
			curMonth: _month,
			curData: data
		});

		return {
			year: _year,
			month: _month
		};
	}
	// -- end
	getCurrentInfo = (year, month) => {
		let	prevYear, nextYear, prevMonth, nextMonth, prevData, curData, nextData;

		// 处理下当前值
		if (month === 0) {
			year = year - 1;
			month = 12;
		} else if (month === 13) {
			year = year + 1;
			month = 1;
		}

		prevYear = year;
		nextYear = year;
		prevMonth = month - 1;
		nextMonth = month + 1;

		// 处理前后值
		if (month === 1) {
			prevYear = year - 1;
			prevMonth = 12;
		} else if (month === 12) {
			nextYear = year + 1;
			nextMonth = 1;
		}

		prevData = this.createDaysArray(prevYear, prevMonth, this.getMonthDays(prevYear, prevMonth), 'prev');
		curData = this.createDaysArray(year, month, this.getMonthDays(year, month), 'current');
		nextData = this.createDaysArray(nextYear, nextMonth, this.getMonthDays(nextYear, nextMonth), 'next');

		// 生成日历数组
		let firstWeek = this.getWeek(`${year}-${this.formatNum(month)}-1`); // 本月第一天是星期几
		let data = [
			...prevData.slice(prevData.length - (firstWeek === 0 ? 7 : firstWeek), prevData.length),
			...curData,
			...nextData.slice(0, 42 - firstWeek - curData.length)
		];

		return {
			year,
			month,
			data
		};
	}

	// 创建每个月天数的数组
	createDaysArray = (year, month, days, type) => {
		let array = [];
		for (let i = 0; i < days; i++) {
			let item = {};
			item.date = `${year}-${this.formatNum(month)}-${this.formatNum(i + 1)}`;
			item.day = i + 1;
			item.type = type;
			array.push(item);
		}
		return array;
	}

	// 获取某月的天数
	getMonthDays = (year, month) => {
		let day = new Date(year, month, 0);
		return day.getDate();
	}

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
	}

	// 小于10的数字前面加0
	formatNum = (num) => {
		if (num < 10) {
			return '0' + num;
		}
		return num;
	}

	renderCalendar = () => {
		let table = [];
		for (let i = 0; i < rowNumber; i++) {
			table[i] = this.renderRow(i + 1);
		}

		return (
			<div className="__flex-ac __bg-white __fd-c">
				{table}
			</div>
		);
	}

	renderRow = (rowNum) => {
		const { tipInfo, renderRow, onSelect, selected } = this.props;
		const { curData } = this.state;
		let rowData = curData.slice((rowNum - 1) * 7, rowNum * 7);
		return (
			<div className="__flex-ac __bg-white" style={{ width: '100%' }} key={rowData[0].date}>
				{
					rowData.map((item, index) => {
						return React.createElement(renderRow, {
							key: `${rowNum}-${index}`,
							itemData: item,
							onSelect: (param) => onSelect && onSelect(param || item),
							select: selected.includes(item.date)
						});
					})
				}
			</div>
		);
	}
	render () {
		const { className, weekClassName } = this.props;
		const classes = "c-calendar " + className;
		const  weekClasses = "__flex-col __tc " + weekClassName;
		return (
			<div className={classes}>
				<div className="__header __flex-ac">
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
	renderRow: PropTypes.func,
	selected: PropTypes.array,
	className: PropTypes.string,
	weekClassName: PropTypes.string,
};
Calendar.defaultProps = {
	renderRow: Item,
	date: new Date,
	selected: []
};

export default Calendar;
