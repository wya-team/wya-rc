import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	ListView,
	TouchableHighlight,
	View,
	Text,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';

const defaultStyles = {
	// 分割线，高度为 0 
	separator: {
		height: 0,
		backgroundColor: '#ccc'
	},
	actionsLabel: {
		fontSize: 20,
	},
	ScrollStatusView: {
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	emptyView: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	emptyViewTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 15,
	},
};
class Core extends Component {

	constructor(...params) {
		super(...params);
	}
	componentDidMount() {
		this.mounted = true;

		this.prvScrollTop = 0;// 这里可考虑设置全局的量来控制

		this.loadFirst(this.props);
	}
	// state change refresh
	componentWillReceiveProps(nextProps) {
		this.loadFirst(nextProps);
	}

	componentWillUnmount() {		
		this.mounted = false;
	}
	loadFirst($props){
		if (!$props.show || $props.isEnd > 0) { // 禁用，加载完成或者加载中无视
			return false;
		}
		if ($props.curPage == 0) {
			$props.loadDataForScroll && $props.loadDataForScroll();
			/**
			 * 重新清理下高度参数
			 */
			this.prvScrollTop = 0;
		}
	}
	scrollEmptyView = (refreshCallback) => {
		return (
			<View style={[defaultStyles.emptyView]}>
				<Text style={[defaultStyles.emptyViewTitle]}>
					没有内容，点击我刷新
				</Text>

				<TouchableHighlight
					underlayColor="#c8c7cc"
					onPress={refreshCallback}
				>
					<Text>
						↻
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
	handleScroll = () => {
		if (!this.props.show || this.props.isEnd == 2) {
			return;
		}
		this.props.srcoll && this.props.loadDataForScroll && this.props.loadDataForScroll();
	}
	// isEnd 0, 1, 2, 3 状态数据
	renderScrollStatusView = () => {
		const { isEnd, scroll, curPage } = this.props;
		if ((isEnd === 0 && scroll === true) || (curPage == 0)) {
			// return this.renderScrollFetchingView();
		} else if (isEnd === 1 && scroll === true) {
			return this.renderScrollWaitingView();
		} else if (isEnd === 2 && scroll === true) {
			return this.renderScrollAllLoadedView();
		} else if (isEnd === 3 && scroll === true) {
			return this.renderScrollEmptyView();
		} else {
			return null;
		}
	}
	// 加载更多
	renderScrollFetchingView = () => {
		const { show, loadDataForScroll } = this.props;
		return (
			<TouchableHighlight
				underlayColor="#c8c7cc"
				onPress={() => show && loadDataForScroll()}
				style={[defaultStyles.ScrollStatusView]}
			>
				<Text style={[defaultStyles.actionsLabel]}>
					加载更多
				</Text>
			</TouchableHighlight>
		);
	}
	// 全部加载
	renderScrollAllLoadedView = () => {
		return (
			<View style={[defaultStyles.ScrollStatusView]}>
				<Text style={[defaultStyles.actionsLabel]}>
					~
				</Text>
			</View>
		);
	}
	// 加载中
	renderScrollWaitingView = () => {
		return (
			<View style={[defaultStyles.ScrollStatusView]}>
				<ActivityIndicator
					animating={true}
					size="small"
					color="gray"
				/>
			</View>
		);
	}
	// 下拉刷新样式
	renderPull = () => {
		const { show, onPullStatusChange, loadDataForPull } = this.props;
		return (
			<RefreshControl
				onRefresh={
					() => show && (onPullStatusChange(), loadDataForPull())}
				refreshing={!!this.props.pullStatus}
			/>
		);
	}
	// 分割线显示
	renderSeparator = () => {
		if (this.props.renderSeparator) {
			return this.props.renderSeparator();
		}

		return (
			<View style={[defaultStyles.separator]} />
		);
	}
	render() {
		const {
			dataSource,
			renderRow,
			renderSectionHeader,
			renderHeader,
			scrollEnabled,
			pull,
			style
		} = this.props;
		// 可以使用 https://github.com/sghiassy/react-native-sglistview 强化内存管理
		return (
			<ListView
				ref="listview"
				dataSource={dataSource}
				renderRow={renderRow}
				renderSectionHeader={renderSectionHeader || null}
				renderHeader={renderHeader || null}
				renderFooter={this.renderScrollStatusView}
				renderSeparator={this.renderSeparator}

				automaticallyAdjustContentInsets={false}
				scrollEnabled={scrollEnabled}
				canCancelContentTouches={true}
				enableEmptySections={true}
				refreshControl={!!pull ? this.renderPull() : null}
				style={style || {}}

				onEndReached={this.handleScroll}
				onEndReachedThreshold={100}
				{...this.props}

			/>
		);
	}	
};

Core.propTypes = {
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
	 * 2. 分组头部
	 * 3. Item
	 */
	renderHeader: PropTypes.func,
	renderSectionHeader: PropTypes.func,
	renderRow: PropTypes.func,
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
	curPage: PropTypes.number,
	dataSource: PropTypes.object,
	/**
	 * 是否运行组件，默认true，关联到触发加载数据的问题
	 */
	show: PropTypes.bool,
};
Core.defaultProps = {
	scroll: true,
	pull: true,
	renderHeader: null,
	renderSectionHeader: null,
	renderRow: null,
	scrollEnabled: true,
	loadDataForPull: () => {},
	loadDataForScroll: () => {},
	dataSource: [],
	show: true
};
export default Core;