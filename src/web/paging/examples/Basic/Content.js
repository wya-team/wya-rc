// 这里使用state管理，结合redux，middleWare更方便
import React, { Component } from 'react';
import { Button, Pagination } from 'antd';
import { Paging } from '../../../../main.js';
import List from './List';
import Item from './Item';
import Btn from './Btn';

const title = [
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
let id = 0;
let _id = 0;
class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...initState,
			selectArr: []
		};
		this.actions = {
			onDel: this.handleDel,
			onSelectItem: this.handleSelectItem
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page) {
		page = page || 1;
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
			const itemObj = {};
			for (let i = 0; i < 10; i++){
				itemObj[_id] = {
					id: _id++
				};
			}
			this.setState({
				isEnd: 0,
				currentPage: page,
				totalPage: 10,
				itemArr: { ...this.state.itemArr, [page]: Array.from({ length: 10 }, () => id++) },
				itemObj: { ...this.state.itemObj, ...itemObj }
			});
		}, 1000);
	}
	handleDel = () => {
		this.setState({
			...initState
		});
	}
	handleSelectItem = (id) => {
		let { selectArr } = this.state;
		if (selectArr.includes(id)){
			selectArr = selectArr.filter(item => item !== id);
		} else {
			selectArr = [...selectArr, id];
		}
		this.setState({
			selectArr: selectArr
		});
	};
	handleSelectAll = () => {
		this.paging && this.paging.handleCheckAll();
	};
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
		const rowSelection = {
			getCheckboxProps: (record) => ({
				disabled: record.id === 1,
				checked: record.id === 1,
			}),
			onChange: (selectedRowKeys, selectedRows) => { console.log(selectedRowKeys, selectedRows); }
		};
		return (
			<Paging
				ref={paging => this.paging = paging}
				title={title}
				isEnd={isEnd}
				dataSource={{ itemArr, itemObj }}
				curPage={currentPage}
				totalPage={totalPage}
				loadDataForPaging={this.loadDataForPaging}
				resetPrvScrollTop={currentPage}
				resetPage = {resetPage}
				rowSelection={rowSelection}
				renderRow={Item}
			>
				{/* <List*/}
				{/* itemArr={itemArr[currentPage] || []}*/}
				{/* itemObj={itemObj}*/}
				{/* selectArr={selectArr}*/}
				{/* actions={this.actions}*/}
				{/* rowSelection={rowSelection}*/}
				{/* />*/}
				<Btn
					selectArr={selectArr}
					actions={this.actions}
					onSelectAll={this.handleSelectAll}
				/>
			</Paging>
		);
	}
}

export default Content;
