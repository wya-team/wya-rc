import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { Pagination } from 'antd';
import UpLoad from './UpLoad';
import PathsEdit from './PathsEdit';
import List from './List';
import ImgsEdit from './ImgsEdit';
import Search from './Search';
import { Button, message } from 'antd';
import Paging from '../paging/index';
import RcInstance from '../rc-instance/index';
import { initPage, initItem } from '../utils/utils';
const initialState = {
	...initPage,
	selectArr: [],
	selectObj: {},
	keyword: ''
};

class Imgs extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			...initialState
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.pathSelect.cat_id !== nextProps.pathSelect.cat_id) {
			this.request && this.request.catch();
			this.setState({
				...initialState
			});
			findDOMNode(this.refs.search).getElementsByTagName('input')[0].value = '';
		}
	}
	loadDataForPaging(page) {
		page = page || 1;
		const { config: { PGallery } } = RcInstance;
		const { URL_PGALLERY_IMGS_LIST_GET: _url } = PGallery || {};
		const { URL_PGALLERY_IMGS_LIST_GET: url } = this.props.url || {};
		const { request, pathSelect: { cat_id } } = this.props;

		if (!cat_id) return;
		if (this.state.itemArr[page]) {
			this.setState({
				curPage: page
			});
			return;
		}
		this.setState({ 
			isEnd: 1 
		}, () => {
			this.request = request({
				url: url || _url,
				type: "get",
				param: {
					page,
					cat_id: String(cat_id),
					file_name: this.state.keyword
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'file_id');
				let totalPage = res.data.totalPage;
				let totalCount = res.data.totalCount;
				this.setState({
					isEnd: 0,
					curPage: page,
					totalCount,
					totalPage,
					itemArr: { 
						...this.state.itemArr, 
						[page]: items.itemArr
					},
					itemObj: { ...this.state.itemObj, ...items.itemObj }
				});
			}).catch((res = {}) => {
				res.msg && message.error(res.msg);
			});
		});
	}
	handleSelect = (info) => {
		const { max } = this.props;
		const { selectArr, selectObj = {} } = this.state;
		const { file_id } = info || {};
		// 验证
		if (max != 0 && selectArr.length >= max && !selectArr.includes(file_id)){
			message.destroy();
			message.warn('最多选择' + max + '个，请先取消在进行选择。');
			return;
		}
		// 输出
		let _selectArr, _selectObj;
		if (selectArr.includes(file_id)) {
			_selectArr = selectArr.filter(item => item != file_id);
			delete selectObj[file_id];
		} else {
			_selectArr = [...selectArr, file_id];
			_selectObj = {
				...selectObj,
				[file_id]: {
					...info
				}
			};
		}
		this.setState({
			selectArr: _selectArr,
			selectObj: _selectObj
		});
	}
	handleSetItem = (id, itemData) => {
		const { itemObj } = this.state;
		this.setState({
			itemObj: {
				...itemObj,
				[id]: {
					...itemObj[id],
					...itemData
				}
			}
		});
	}
	handleInit = (keyword) => {
		this.setState({
			...initialState,
			keyword
		});
	}
	render() {

		const { pathSelect, paths, onSet, request, url, onSure, max } = this.props;

		const {
			isEnd,
			curPage,
			totalPage,
			totalCount,
			itemArr,
			itemObj,
			selectArr,
			selectObj,
			resetPage
		} = this.state;
		return (
			<div className="__imgs">
				<div>
					<PathsEdit
						paths={paths}
						pathSelect={pathSelect}
						onSet={onSet}
						onInit={this.handleInit}
						request={request}
						url={url}
					/>
					<UpLoad 
						onInit={this.handleInit}
						onSet={onSet}
						paths={paths}
						pathSelect={pathSelect}
						request={request}
						url={url}
					/>
					<Search onSearch={this.handleInit} ref="search"/>
				</div>
				<Paging 
					className="__no-pd"
					style={{ height: '100%' }}
					title={[]}
					tHide={true}
					isEnd={isEnd}
					curPage={curPage}
					totalPage={totalPage}
					showTotal={() => totalCount ? `共 ${totalCount} 条` : null}

					loadDataForPaging={this.loadDataForPaging}
					resetPrvScrollTop={curPage}
					resetPage={resetPage}
				>
					<List 
						itemArr={itemArr[curPage] || []}
						itemObj={itemObj}
						selectArr={selectArr}
						onSelect={this.handleSelect}
						onSetItem={this.handleSetItem}
						onSet={onSet}
						onInit={this.handleInit}
						request={request}
						url={url}
						paths={paths}
						pathSelect={pathSelect}
					/>
					<ImgsEdit
						onSure={onSure}
						selectArr={selectArr}
						selectObj={selectObj}
						max={max}
					/>
				</Paging>
			</div>
		);
	}
}

Imgs.propTypes = {
};

export default Imgs;