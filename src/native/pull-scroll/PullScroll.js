import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import Core from './Core';
import {
	ListView
} from 'react-native';
class PullScroll extends Component {
	constructor(props, context) {
		super(props, context);
		let { itemArr, withSections, rowHasChanged } = this.props;
		let ds = null;
		let state = {};
		if (withSections === true) {
			ds = new ListView.DataSource({
				rowHasChanged: rowHasChanged || ((row1, row2) => row1 !== row2),
				sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
			});
			state = {
				dataSource: ds.cloneWithRowsAndSections(itemArr),
				pullStatus: 0,
			};
		} else {
			ds = new ListView.DataSource({
				rowHasChanged: rowHasChanged || ((row1, row2) => row1 !== row2)
			});
			state = {
				dataSource: ds.cloneWithRows(itemArr),
				pullStatus: 0,
			};
		}
		this.state = {
			...state
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.itemArr != this.props.itemArr) {
			this.updateRows(nextProps);
		}
	}
	setDefault = () => {
		this.setState({
			pullStatus: 0
		});
	}
	updateRows = (nextProps) => {
		const { itemArr } = nextProps; // 可能存在性能问题，官方建议使用concat 而非push
		if (itemArr !== null) {
			if (nextProps.withSections === true) {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRowsAndSections(itemArr),
					pullStatus: 0,
				});
			} else {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(itemArr),
				});
			}
		} else {
			this.setState({
				pullStatus: 0,
			});
		}
	}
	handlePullStatusChange = () => {
		this.setState({
			pullStatus: 1
		});
	}
	renderRow = (id) => {
		const { renderRow, actions, opts, itemObj } = this.props;
		return createElement(renderRow, {
			id,
			itemData: itemObj[id],
			actions,
			opts
		});
	}
	render() {
		const { pullStatus, dataSource } = this.state;
		return (
			<Core
				{...this.props}
				pullStatus={pullStatus}
				onPullStatusChange={this.handlePullStatusChange}
				dataSource={dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}
PullScroll.propTypes = {
	/**
	 * 1. 启用上滑加载
	 * 2. 是否可滚动
	 */
	scroll: PropTypes.bool,
	scrollEnabled: PropTypes.bool,
	/**
	 * 1. 启用下拉刷新
	 * 2. 下拉状态
	 */
	pull: PropTypes.bool,
	pullStatus: PropTypes.number,
	/**
	 * 渲染
	 * 1. 头部
	 * 2. Sections头部
	 * 3. 是否启动Sections
	 */
	renderHeader: PropTypes.func,
	renderSectionHeader: PropTypes.func,
	/**
	 * 数据相关
	 * 1. 下拉刷新
	 * 2. 上滑加载
	 * 3. 状态
	 * 4. 是否是第一次加载
	 * 5. 列表数据
	 */
	loadDataForPull: PropTypes.func,
	loadDataForScroll: PropTypes.func,
	isEnd: PropTypes.number,
	/**
	 * 是否运行组件，默认true，关联到触发加载数据的问题
	 */
	show: PropTypes.bool,
};
PullScroll.defaultProps = {
	scroll: true,
	pull: true,
	renderHeader: null,
	renderSectionHeader: null,
	scrollEnabled: true,
	loadDataForPull: () => {},
	loadDataForScroll: () => {},
	show: true
};
export default PullScroll;

