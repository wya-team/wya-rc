// 这里使用state管理，结合redux，middleWare更方便
import React, { Component } from 'react';
import { Button, Pagination } from 'antd';
import Paging from '../..//Paging';
import List from './List';
import Btn from './Btn';

const title = [
	'选择',
	'编号',
	'标题',
	'封面图',
	'更新时间',
	'类目',
	'操作'
];
const initState = {
	currentPage: 0, // 当前页数
	totalPage: 10, // 总页数
	pageSize: 10, // 条数
	isEnd: 0, // 加载完毕0(需要判断是否有数据), 1为加载中, 3数据异常
	itemArr: {},
	itemObj: {},
	// 其他属性
	selectArr: []
};
let count = 0;
class Content extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			...initState
		};
		this.actions = {
			onDel: this.handleDel
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page) {
		page = page || 1;
		console.log(page);
		const { currentPage, itemArr } = this.state;
		// SETPAGE
		if (itemArr[page]) {
			this.setState({
				currentPage: page
			});
			return;
		}
		// ON
		this.setState({
			isEnd: 1
		});
		// SUCCESS
		setTimeout(() => {
			this.setState({
				isEnd: 0,
				currentPage: page,
				totalPage: 10,
				itemArr: { ...this.state.itemArr, [page]: Array.from({ length: 10 }, () => count++) }
			});
		}, 1000);
	}
	handleDel = () => {
		this.setState({
			...initState
		});
	}
	render() {
		const {
			isEnd,
			currentPage,
			totalPage,
			itemArr,
			itemObj,
			selectArr,
			resetPage
		} = this.state;
		return (
			<Paging 
				title={title}
				isEnd={isEnd}
				curPage={currentPage}
				totalPage={totalPage}
				loadDataForPaging={this.loadDataForPaging}

				resetPrvScrollTop={currentPage}
				resetPage = {resetPage}
			>
				<List 
					itemArr={itemArr[currentPage] || []}
					itemObj={itemObj}
					selectArr={selectArr}
					actions={this.actions}
				/>
				<Btn
					selectArr={selectArr}
					actions={this.actions}
				/>
			</Paging>
		);
	}
}

export default Content;