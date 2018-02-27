import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from '@agent/constants/actions/tpl';
import PullScroll from '../PullScroll/PullScroll';

@pureRender
class ScrollList extends Component {
	constructor(props, context) {
		super(props, context);
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}

	loadDataForScroll(pullToRefresh = false) {
		const { listInfo } = this.props;
		const { currentPage, keyword } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.TPL_LIST_GET;
		let param = {
			page: pullToRefresh ? 1 : currentPage + 1
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				pullToRefresh && this.refs.pullScroll && this.refs.pullScroll.setDefault();
			},
			onError: (res) => {
			}
		};
		this.props.actions.request(url, params, { pullToRefresh });
	}
	render() {
		const { listInfo, actions } = this.props;
		const { itemArr, itemObj, currentPage, isEnd, keyword } = listInfo;
		return (
			<PullScroll
				ref="pullScroll"
				loadDataForPull={this.loadDataForPull}
				loadDataForScroll={this.loadDataForScroll}
				
				show={true} // 总开关 // 默认true
				pull={true} // 允许下拉刷新 默认true
				scroll={true} // 允许上划加载 默认true
				// resetPrvScrollTop
				isEnd={isEnd}
				curPage={currentPage}
				actions={actions}
				itemArr={itemArr}
				itemObj={itemObj}
			/>

		);
	}
}
export default ScrollList;