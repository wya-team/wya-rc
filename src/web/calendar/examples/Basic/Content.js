/**
 * Created by jiang.dong on 2018/2/28.
 */
import React, { Component } from 'react';
import Calendar from '../../Calendar';
import Item from './Item';

class Content extends Component {
	constructor(props) {
		super(props);
		let date = new Date();
		let year = date.getFullYear();
		let month = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
		this.state = {
			year,
			month
		};
	}

	handlePrev = () => {
		const { year, month } = this.state;
		let prevMonth, prevYear;
		if (month - 1 <= 0) {
			prevMonth = 12;
			prevYear = year - 1;
		} else {
			prevMonth = month - 1;
			prevYear = year;
		}
		this.setState({
			year: prevYear,
			month: prevMonth
		});
	};

	handleNext = () => {
		const { year, month } = this.state;
		let nextMonth, nextYear;
		if (month + 1 > 12) {
			nextMonth = 1;
			nextYear = year + 1;
		} else {
			nextMonth = month + 1;
			nextYear = year;
		}
		this.setState({
			year: nextYear,
			month: nextMonth
		});
	};

	render() {
		const { year, month } = this.state;
		return (
			<div>
				<div className="rc-tc">{year}-{month}</div>
				<div className="rc-flex-ac" style={{ width: '100%' }}>
					<span onClick={this.handlePrev}>PREV</span>
					<Calendar
						className="rc-col"
						renderDayItem={Item}
						selectedDate={`${year}-${month}`}
					/>
					<span onClick={this.handleNext}>NEXT</span>
				</div>
			</div>
		);
	}
}

export default Content;
