import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import UpLoad from './UpLoad';
import PathsEdit from './PathsEdit';
import List from './List';
import ImgsEdit from './ImgsEdit';
import { Button } from 'antd';
import Paging from '../paging/index';
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
class Imgs extends Component {
	constructor(props, context) {
		super(props, context);
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
	}
	render() {

		const { pathSelect, paths, onSet } = this.props;

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
			<div className="__imgs">
				<div>
					<PathsEdit
						paths={paths}
						pathSelect={pathSelect}
						onSet={onSet}
					/>
					<UpLoad />
				</div>
				<Paging 
					className="__no-pd"
					style={{ height: '100%' }}
					title={[]}
					tHide={true}
					isEnd={isEnd}
					curPage={currentPage}
					totalPage={totalPage}

					loadDataForPaging={this.loadDataForPaging}
					resetPrvScrollTop={currentPage}
					resetPage={resetPage}
				>
					<List 
						itemArr={itemArr[currentPage] || []}
						itemObj={itemObj}
						selectArr={selectArr}
						actions={this.actions}
					/>
					<ImgsEdit
						selectArr={selectArr}
						actions={this.actions}
					/>
				</Paging>
			</div>
		);
	}
}

Imgs.propTypes = {
};

export default Imgs;