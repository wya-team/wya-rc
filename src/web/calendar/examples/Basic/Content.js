/**
 * Created by jiang.dong on 2018/2/28.
 */
import React, { Component } from 'react';
import Calendar from '../../Calendar';
import '../../Calendar.scss';

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
		this.setState({
			...this.refs.calendar.prev()
		});
	};

	handleNext = () => {
		this.setState({
			...this.refs.calendar.next()
		});
	};

	render() {
		const { year, month } = this.state;
		return (
			<div className="c-calendar">
				<div className="__tc">{year}-{month}</div>
				<div className="__flex-ac" style={{ width: '100%' }}>
					<span onClick={this.handlePrev}>PREV</span>
					<Calendar
						ref="calendar"
						className="__flex-col"
						selected={["2018-06-18", "2018-07-18"]}
						onSelect={(val) => console.log(val)}
					/>
					<span onClick={this.handleNext}>NEXT</span>
				</div>
			</div>
		);
	}
}

export default Content;
