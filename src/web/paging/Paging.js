import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Paging.scss';
import { Button, Pagination, Spin } from 'antd';
class Paging extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
		this.wrapper = props.wrapper;
		this.bindScroll = ::this.bindScroll;
		this.handleChange = ::this.handleChange;
		this.firstReq = ::this.firstReq;
	}
	componentDidMount() {
		if (this.props.isEnd === 0) { // 禁用，加载完成或者加载中无视
			this.firstReq(this.props);
		}
		this.bindScroll();
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.resetPrvScrollTop && nextProps.resetPrvScrollTop != this.props.resetPrvScrollTop) {
			this.prvScrollTop = 0;
			this.scrollContainer.scrollTop = 0; // 置顶
		}
		if (nextProps.isEnd === 0) { // 禁用，加载完成或者加载中无视
			this.firstReq(nextProps);
		}
	}
	componentDidCatch(error, info){
		console.log(error, info);
	}
	handleChange(pages) {
		this.props.loadDataForPaging && this.props.loadDataForPaging(pages);
	}
	bindScroll() {
		this.scrollContainer = (this.wrapper) ? document.querySelector(this.wrapper) : document.body;
	}
	firstReq(curProps = {}) { // 第一次请求
		const {
			isEnd,
			curPage,
			loadDataForPaging
		} = curProps;
		if (curPage == 0){
			// 这里使用this.props.curPage
			const nextPage = this.props.resetPage == curProps.resetPage
				? this.props.curPage
				: 1;
			loadDataForPaging && loadDataForPaging(nextPage);
		}
	}
	render() {
		const {
			isEnd,
			title,
			className,
			curPage,
			totalPage,
			children,
			tHide
		} = this.props;
		return (
			<div className={classnames("c-paging", className)}>
				<div className="__conent">
					<table className="__table" >
						<thead  style={tHide ? { display: 'none' } : {}}>
							<tr>
								{
									title.map((item, index) => {
										return (
											<th key={index}>{item}</th>
										);
									})
								}
							</tr>
						</thead>
						{children[0] || children}
					</table>
				</div>
				{isEnd === 1 && <Spin />}
				{isEnd === 3 && <div className="__error">加载失败...</div>}
				<div className="__footer">
					<div className="__left">
						{children[1] || ''}
					</div>
					<Pagination 
						showQuickJumper 
						defaultPageSize={1} 
						current={curPage} 
						total={totalPage}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}
Paging.propTypes = {
	title: PropTypes.array,
	className: PropTypes.string,
	isEnd: PropTypes.number.isRequired,
	curPage: PropTypes.number.isRequired,
	totalPage: PropTypes.number.isRequired,
	loadDataForPaging: PropTypes.func.isRequired,
	resetPrvScrollTop: PropTypes.number,
	resetPage: PropTypes.string,
	tHide: PropTypes.bool
};
Paging.defaultProps = {
	title: [],
	tHide: false,
	className: '__defalut'
};
export default Paging;