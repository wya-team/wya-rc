/**
 * 日历Item
 */
import React, { Component } from 'react';
import classnames from 'classnames';

class Item extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		this.props.onSelect && this.props.onSelect();
		console.log('onSelect');
	};

	getCurrentDay = () => {
		let date = new Date();
		let year = date.getFullYear();
		let month = parseInt(date.getMonth() + 1);// 0-11, 0为1月份
		let day = date.getDate();
		return `${year}-${parseInt(month) < 10 ? '0' + month : month}-${parseInt(day) < 10 ? '0' + day : day}`;
	};

	renderItem = () => {
		const { itemData, select } = this.props;
		const { date, type } = itemData;
		let isCurrentDay = this.getCurrentDay();
		const classes = classnames('__flex-cc __fd-c', {
			'__dark': type === 'current',
			'__pointer': date === isCurrentDay,
			'__circle': date === isCurrentDay,
		});

		return (
			<div className={classes}>
				<div>{itemData.day}</div>
				{select && <span className="__dot" />}
			</div>
		);
	};

	render() {

		return (
			<div
				className="__flex-col __tc __gray __flex-cc __item"
				onClick={this.handleClick}
			>
				{this.renderItem()}
			</div>
		);
	}
}

export default Item;
