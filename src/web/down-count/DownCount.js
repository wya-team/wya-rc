import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import classnames from 'classnames';

class DownCount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			downCount: ""
		};
		this.runStart = ::this.runStart;
		this.runEnd = ::this.runEnd;
		this.getCurDate = ::this.getCurDate;
		/**
		 * 控制onEnd只执行一次
		 */
		this.isEnd = 0;
	}
	componentWillMount() {
		const { targetTime, serverTime } = this.props;
		if (!targetTime) {
			this.props.onTip('请设定时间'); // 可替换
			this.setState({
				show: false
			});
			return false;
		}
		// 抛异常
		if (!Date.parse(targetTime.replace(/-/g, "/"))) {
			this.props.onTip('注意日期格式为 1992-09-21 12:00:00.'); // 可替换
			this.setState({
				show: false
			});
			return false;
		}
		/**
		 * 先运行一次
		 */
		this.serverOffset = serverTime ? (Date.parse(serverTime.replace(/-/g, "/")) - (new Date).getTime()) : 0;
		this.runStart();
	}
	componentDidMount() {
		const { T } = this.props;
		if (!this.isEnd){
			this.interval = setInterval(this.runStart, T);
		}
	}
	componentWillReceiveProps(nextProps) {
		// 不做任何操作，避免影响
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.targetTime != prevProps.targetTime) {
			this.interval && clearInterval(this.interval);
			this.interval = setInterval(this.runStart, this.props.T);
		}
	}
	componentWillUnmount(){
		/**
		 * 只清除定时器
		 */
		this.runEnd(1);
	}
	runEnd(unMount){
		this.interval && clearInterval(this.interval);
		/**
		 * 定时消除
		 */
		if (this.isEnd && !unMount) {
			this.props.onEnd && this.props.onEnd();
		}
	}
	getCurDate(){
		const dateN = new Date;
		const newDate = new Date(dateN.getTime() + Number(this.serverOffset || 0));
		return newDate;
	};
	runStart() {
		const { targetTime, T, beforeText, afterText, format, onChange } = this.props;

		const setDate = targetTime.replace(/-/g, "/");
		const currentDate = this.getCurDate();
		const targetDate = new Date(setDate);
		const difference = targetDate - currentDate;

		const _second = 1000;
		const _minute = _second * 60;
		const _hour = _minute * 60;
		const _day = _hour * 24;

		const days = Math.floor(difference / _day);
		const hours = Math.floor((difference % _day) / _hour);
		const minutes = Math.floor((difference % _hour) / _minute);
		const seconds = Math.floor((difference % _minute) / _second);
		const mseconds = Math.floor((difference / 10 % 100));

		const daysC = (String(days).length >= 2) ? days : `0${days}`;
		const hoursC = (String(hours).length >= 2) ? hours : `0${hours}`;
		const minutesC = (String(minutes).length >= 2) ? minutes : `0${minutes}`;
		const secondsC = (String(seconds).length >= 2) ? seconds : `0${seconds}`;
		const msecondsC = (String(mseconds).length >= 2) ? mseconds : `0${mseconds}`;

		let downCount;
		switch (format) {
			case "DD":
				downCount = `${beforeText}${daysC}天${afterText}`;
				break;
			case "DD:HH":
				downCount = `${beforeText}${daysC}天${hoursC}小时${afterText}`;
				break;
			case "DD:HH:MM":
				downCount = `${beforeText}${daysC}天${hoursC}小时${minutesC}分${afterText}`;
				break;
			default:
				downCount = `${beforeText}${daysC}天${hoursC}小时${minutesC}分${secondsC}秒${T == 10 ? msecondsC : ''}${afterText}`;
				break;
		}
		this.setState({
			// downCount: difference < 0 ? '已结束！' : downCount
			// 临时处理 1分以下不显示
			downCount: difference <= 60000 ?  `${beforeText}00天00小时01分${afterText}` : downCount
		}, () => {
			onChange && onChange({
				daysC: daysC < 0 ? '00' : daysC,
				hoursC: hoursC < 0 ? '00' : hoursC,
				minutesC: minutesC < 0 ? '00' : minutesC,
				secondsC: secondsC < 0 ? '00' : secondsC,
				msecondsC: msecondsC < 0 ? '00' : msecondsC
			});
			this.isEnd = 1;
			difference < 0 && this.runEnd();
		});
	}
	render() {
		const { show, downCount } = this.state;
		const { className, tag: Tag, style } = this.props;
		if (!show) return null;
		return (
			<Tag className={className} style={style}>{downCount}</Tag>
		);
	}
}
DownCount.propTypes = {
	/**
	 * id,唯一标识//此项目可不传。最好传；
	 */
	id: PropTypes.number,
	/**
	 * 外层标签
	 */
	tag: PropTypes.string,
	/**
	 * 文本
	 */
	beforeText: PropTypes.string,
	afterText: PropTypes.string,
	/**
	 * 毫秒/秒
	 * 10/1000
	 */
	T: PropTypes.number,
	/**
	 * 结束时间或者开始时间(目标时间)
	 */
	targetTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * 服务器时间
	 */
	serverTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * 结束时候的回调
	 */
	onEnd: PropTypes.func,
	/**
	 * 改变时回调
	 */
	onChange: PropTypes.func,
	onTip: PropTypes.func,
	/**
	 * 时间格式
	 */
	format: PropTypes.string
};
DownCount.defaultProps = {
	id: null,
	tag: 'span',
	beforeText: "",
	afterText: "",
	T: 1000,
	// targetTime: '',
	// serverTime: '',
	className: '',
	style: {},
	onChange: () => {},
	onEnd: () => {},
	onTip: () => {},
	format: '',
};
export default DownCount;
