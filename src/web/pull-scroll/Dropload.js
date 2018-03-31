import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import pureRender from 'pure-render-decorator';
// @pureRender
class Dropload extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { status, scrollText, pullText, type, pulledY, show, isEnd, currentPage, itemArr } = this.props;
		if (!show) return null;
		return (
			<div className={`_dropload _${type}`} style={{ transform: `translateY(${pulledY}px)` }}>
				<div className="_status">
					{
						(type === "scroll" && status == 1 || type === "pull" && status == 3) && <span className="_loading" />
					}
					
					{
						( currentPage === 1 && itemArr.length === 0) ? 
							<span className = "g-fs-26" >{scrollText[4]}</span>
							:
							<div>
								{
									type === "scroll"  &&
									<span>{scrollText[status]}</span>
								}
							</div>
							
					}
				</div>
			</div>
		);
	}
}
Dropload.defaultProps = {
	/**
	 * 上“滑”加载
	 * 由redux管理，通过status的在redux存储来控制
	 */
	scrollText: ['上拉加载', '加载中', '已全部加载', '网络不稳定，请稍后重试', '没有内容可供显示'],
	/**
	 * 下“拉”加载
	 */
	pullText: ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...'],
	/**
	 * 默认上滑
	 * scroll / down
	 */
	type: "scroll",
	// 下拉刷新的位置
	pulledY: 0
};
// 大部分同PullView的props
Dropload.propTypes = {
	/**
	 * 状态
	 */
	status: PropTypes.number
};
export default Dropload;