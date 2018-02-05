import React, { Component, Fragment } from 'react';
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
	selectItem: {}
};

class Imgs extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			...initialState,
			selectArr: [],
			keyword: ''
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.pathSelect.cat_id !== nextProps.pathSelect.cat_id) {
			this.request && this.request.catch();
			this.setState({
				...initialState
			});
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
					cat_id,
					file_name: this.state.keyword
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'file_id');
				let totalPage = res.data.totalPage;
				this.setState({
					isEnd: 0,
					curPage: page,
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
		this.setState({
			selectItem: this.state.selectItem.file_id == info.file_id ? {} : info
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

		const { pathSelect, paths, onSet, request, url, onSure } = this.props;

		const {
			isEnd,
			curPage,
			totalPage,
			itemArr,
			itemObj,
			selectItem,
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
					<Search onSearch={this.handleInit}/>
				</div>
				<Paging 
					className="__no-pd"
					style={{ height: '100%' }}
					title={[]}
					tHide={true}
					isEnd={isEnd}
					curPage={curPage}
					totalPage={totalPage}

					loadDataForPaging={this.loadDataForPaging}
					resetPrvScrollTop={curPage}
					resetPage={resetPage}
				>
					<List 
						itemArr={itemArr[curPage] || []}
						itemObj={itemObj}
						selectItem={selectItem}
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
						selectItem={selectItem}
					/>
				</Paging>
			</div>
		);
	}
}

Imgs.propTypes = {
};

export default Imgs;