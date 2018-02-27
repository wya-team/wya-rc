import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';
import PullScroll from '../PullScroll';
let count = 0;
class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.loadDataForPull = this.loadDataForPull.bind(this);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		this.state = {
			currentPage: 0,
			totalPage: 10,
			itemArr: [],
			itemObj: {},
			isEnd: 0
		};
	}
	loadDataForPull(){
		setTimeout(() => {
			count = 0;
			this.setState({
				isEnd: 0,
				currentPage: 1,
				totalPage: 10,
				itemArr: Array.from({ length: 10 }, () => count++)
			});
			this.refs.pullScroll.setDefault();
		}, 3000);
	}
	loadDataForScroll(){
		this.setState({
			isEnd: 1
		});
		setTimeout(() => {
			this.setState({
				isEnd: this.state.currentPage + 1 > this.state.totalPage ? 2 : 0,
				currentPage: this.state.currentPage + 1,
				totalPage: 10,
				itemArr: [...this.state.itemArr, ...Array.from({ length: 10 }, () => count++)]
			});
		}, 1000);
	}
	render() {
		const { loadDataForScroll, loadDataForPull, actions } = this;
		const {
			itemArr,
			itemObj,
			isEnd,
			currentPage
		} = this.state;
		return (
			<PullScroll
				ref="pullScroll"
				// 基本配置
				renderRow={(props) => <View><Text>{props.id}</Text></View>}
				loadDataForPull={loadDataForPull}
				loadDataForScroll={loadDataForScroll}
				show={true}
				pull={true}
				srcoll={true}
				// redux
				actions={actions}
				// 分页数据
				isEnd={isEnd}
				curPage={currentPage}
				itemArr={itemArr}
				itemObj={itemObj}
			/>
		);
	}
}

export default App;
