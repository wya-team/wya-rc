import React, { Component } from 'react';
import PropTypes from 'prop-types';
import elementResizeEvent from 'element-resize-event';

class Echarts extends Component {
	constructor(props) {
		super(props);
		this.echartsInstance = this.props.echarts;
		this.echartsElement = null;
	}
	componentDidMount = async () => {
		try {
			this.echartsInstance = await import ("echarts");
			const echartObj = this.renderEchartDom();
			const onEvents = this.props.onEvents || {};
			this.bindEvents(echartObj, onEvents);
			if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);

			elementResizeEvent(this.echartsElement, () => {
				echartObj.resize();
			});

		} catch (e) {
			console.error(e);
		}
		
	}
	componentDidUpdate = async () => {
		try {
			this.echartsInstance = await import("echarts");
			this.renderEchartDom();
			this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
		} catch (e) {
			console.error(e);
		}
		
	}
	componentWillUnmount() {
		if (this.echartsElement) {
			if (typeof elementResizeEvent.unbind === 'function') {
				elementResizeEvent.unbind(this.echartsElement);
		 	}
			this.echartsInstance.dispose(this.echartsElement);
		}
	}
	getEchartsInstance(){
		return this.echartsInstance.getInstanceByDom(this.echartsElement) || this.echartsInstance.init(this.echartsElement, this.props.theme);
	}

	bindEvents(instance, events){
		const _loopEvent = (eventName) => {
			if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
				instance.off(eventName);
				instance.on(eventName, (param) => {
					events[eventName](param, instance);
				});
			}
		};

		for (const eventName in events) {
			if (Object.prototype.hasOwnProperty.call(events, eventName)) {
				_loopEvent(eventName);
			}
		}
	};
	renderEchartDom() {
		let echartObj;
		echartObj = this.getEchartsInstance();
		echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
		if (this.props.showLoading) {
			echartObj.showLoading(this.props.loadingOption || null);
		} else {
			echartObj.hideLoading();
		}
		return echartObj;
	};

	render() {
		const style = this.props.style || { height: '300px' };
		return (
			<div
				ref={(e) => { this.echartsElement = e; }}
				style={style}
				className={this.props.className}
			/>
		);
	}
}

Echarts.propTypes = {
	option: PropTypes.object.isRequired,
	echarts: PropTypes.object.isRequired,
	notMerge: PropTypes.bool,
	lazyUpdate: PropTypes.bool,
	style: PropTypes.object,
	className: PropTypes.string,
	theme: PropTypes.string,
	onChartReady: PropTypes.func,
	showLoading: PropTypes.bool,
	loadingOption: PropTypes.object,
	onEvents: PropTypes.object
};

Echarts.defaultProps = {
	echarts: {},
	notMerge: false,
	lazyUpdate: false,
	style: { height: '300px' },
	className: '',
	theme: null,
	onChartReady: () => {},
	showLoading: false,
	loadingOption: null,
	onEvents: {},
};
export default Echarts;