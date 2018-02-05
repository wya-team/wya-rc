import React, { Component, Fragment } from 'react';
import List from './List';
import Item from './Item';
import { Button, message } from 'antd';
import Paging from '../paging/index';
import { initPage, initItem } from '../utils/utils';
import RcInstance from '../rc-instance/index';
const initialState = {
	...initPage,
	selectItem: {}
};

class Goods extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			...initialState
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page) {
		page = page || 1;
		const { request, id } = this.props;
		if (this.state.itemArr[page]) {
			this.setState({
				curPage: page
			});
			return;
		}
		const { config: { PSelectGoods } } = RcInstance;
		const { URL_PSELECTGOODS_LIST_GET: _url } = PSelectGoods || {};
		const { URL_PSELECTGOODS_LIST_GET: url } = this.props.url || {};
		this.setState({ 
			isEnd: 1 
		}, () => {
			this.request = request({
				url: url || _url,
				type: "get",
				param: {
					page
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], id);
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
	render() {

		const { selectArr, selectObj, onClick, activeText, staticText, component } = this.props;

		const {
			isEnd,
			curPage,
			totalPage,
			itemArr,
			itemObj,
			resetPage
		} = this.state;
		return (
			<div className="__imgs" style={{ padding: "20px" }}>
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
						onClick={onClick}
						selectArr={selectArr}
						selectObj={selectObj}
						activeText={activeText}
						staticText={staticText}
						component={component || Item}
					/>
				</Paging>
			</div>
		);
	}
}

Goods.propTypes = {
};

export default Goods;