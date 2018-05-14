import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Paging.scss';
import { Button, Pagination, Spin, Checkbox } from 'antd';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import { getConstructUrl, getParseUrl } from '../utils/utils';

class Paging extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			checkArr: {}
		};
		this.wrapper = props.wrapper;
		this.scrollContainer = null;
		this.changeableRows = [];
		this.initCheckedData = Object.create(null);
	}
	componentDidMount() {
		if (this.props.isEnd === 0) { // 禁用，加载完成或者加载中无视
			this.loadDataFirst(this.props);
		}
		this.bindScroll();
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.resetPrvScrollTop && nextProps.resetPrvScrollTop != this.props.resetPrvScrollTop) {
			this.prvScrollTop = 0;
			this.scrollContainer.scrollTop = 0; // 置顶
		}
		if (nextProps.isEnd === 0) { // 禁用，加载完成或者加载中无视
			this.loadDataFirst(nextProps);
		}
		if (this.props.curPage !== nextProps.curPage) {
			const { rowSelection, curPage, dataSource } = nextProps;
			const { itemArr = {}, itemObj = {} } = dataSource;
			let curRowData = itemArr[curPage] || [];
			if (rowSelection) {
				// 获取下一页面可勾选的行
				this.changeableRows = curRowData.filter((item, i) => !this.getCheckboxProps(itemObj[item]).disabled);
				let checkArr = {};
				// 将下一页的初始数据设置到state中
				if (!this.state.checkArr[nextProps.curPage]) {
					for (let i = 0; i < this.changeableRows.length; i++) {
						checkArr[this.changeableRows[i]] = this.getCheckboxProps(itemObj[this.changeableRows[i]]).checked;
					}
					this.setState({
						checkArr: {
							...this.state.checkArr,
							[curPage]: { ...checkArr }
						}
					});
				}
			}
		}
	}
	componentDidCatch(error, info){
		console.log(error, info);
	}
	handleChange = (page, $props = this.props) =>  {
		const { history: _history, loadDataForPaging, show } = $props;
		if (!show) return;
		if (_history) {
			let { path, query } = getParseUrl();

			page = page || query.page || 1; // 不要动，就是这样

			_history && window.history.replaceState(null, null, getConstructUrl({
				path,
				query: {
					...query,
					page
				}
			}));
		}
		loadDataForPaging && loadDataForPaging(page || 1);
	};
	bindScroll = () => {
		if (this.wrapper) {
			this.scrollContainer = document.querySelector(`${this.wrapper}`);
		}
	};
	loadDataFirst = ($props = {}) => { // 第一次请求
		const {
			isEnd,
			curPage,
		} = $props;
		if (curPage == 0){
			// 这里使用this.props.curPage
			const nextPage = this.props.resetPage == $props.resetPage
				? this.props.curPage
				: 1;
			this.handleChange(nextPage, $props);
		}
	};
	handleCheckAll = () => {
		const { rowSelection, curPage, dataSource } = this.props;
		if (!rowSelection) {
			console.error('当前不属于可选择状态');
			return;
		}
		const { itemObj = {} } = dataSource;
		const { onChange, onSelectAll, onCancelAll } = rowSelection;
		let selectedRowKeys = [], selectedRows = [];
		let curPageCheck = this.state.checkArr[curPage] || this.initCheckedData || {};
		for (let i = 0; i < this.changeableRows.length; i++) {
			if (!curPageCheck[this.changeableRows[i]]) { // 未选中
				let checkedRows = this.handleSetSelect('check');
				for (let key in checkedRows) {
					if (checkedRows[key]) {
						selectedRowKeys.push(key);
						selectedRows.push(itemObj[key]);
					}
				}
				onSelectAll && onSelectAll(selectedRowKeys, selectedRows);
				onChange && onChange(selectedRowKeys, selectedRows);
				return;
			}
		}
		this.handleSetSelect('uncheck');
		onCancelAll && onCancelAll([], []);
		onChange && onChange([], []);
		return;
	};
	handleSetSelect = (type) => {
		const { curPage } = this.props;
		let checkArr = {};

		if (this.changeableRows.length === 0) { // 如果当前页全部不可选，则title中的勾选框不勾选
			let checkArr = {}, curPageData = this.state.checkArr[curPage];
			for (let key in curPageData) {
				checkArr[key] = false;
			}
			this.setState({
				checkArr: {
					...this.state.checkArr,
					[curPage]: {
						...checkArr
					}
				}
			});
		} else {
			for (let i = 0; i < this.changeableRows.length; i++) {
				checkArr[this.changeableRows[i]] = type === 'check';
			}
			this.setState({
				checkArr: {
					...this.state.checkArr,
					[curPage]: { ...checkArr }
				}
			});
		}

		return checkArr;
	};
	handleSelectChange = (event, item) => {
		const { rowSelection, curPage, dataSource } = this.props;
		const { itemObj = {} } = dataSource;
		const { onChange } = rowSelection;
		let selectedRowKeys = [], selectedRows = [];
		this.setState({
			checkArr: {
				...this.state.checkArr,
				[curPage]: {
					...this.state.checkArr[curPage],
					[item]: event.target.checked
				}
			}
		}, () => {
			for (let key in this.state.checkArr[curPage]) {
				if (this.state.checkArr[curPage][key]) {
					selectedRowKeys.push(key);
					selectedRows.push(itemObj[key]);
				}
			}
			onChange && onChange(selectedRowKeys, selectedRows);
		});
	};
	resetCheckState = (curPage) => {
		this.setState({
			checkArr: {
				...this.state.checkArr,
				[curPage]: null
			}
		});
	};
	getCheckboxProps = (itemData) => {
		const { rowSelection } = this.props;
		return rowSelection.getCheckboxProps && rowSelection.getCheckboxProps(itemData) || {};
	};
	renderTBody = () => {
		const { rowSelection, curPage, dataSource, renderRow, actions, rowProps, tHide, listClassName } = this.props;
		const { itemArr = {}, itemObj = {} } = dataSource;
		let curRowData = itemArr[curPage] || [];
		this.changeableRows = [...curRowData];
		if (rowSelection) {
			this.changeableRows = curRowData.filter((item, i) => !this.getCheckboxProps(itemObj[item]).disabled);
		}
		let Tag = 'tbody';
		if (tHide) {
			Tag = 'div';
		}
		return (
			<Tag className={listClassName || ""} ref={node => this.scrollContainer = node}>
				{curRowData.map((item, index) => {
					if (rowSelection) {
						let checked;
						if (this.state.checkArr[curPage]) {
							// console.log(this.state.checkArr[curPage][item], this.getCheckboxProps(itemObj[item]).disabled);
							if (!this.getCheckboxProps(itemObj[item]).disabled || (
								this.state.checkArr[curPage][item] !== undefined &&
								this.getCheckboxProps(itemObj[item]).disabled
							)) {
								checked = this.state.checkArr[curPage][item];
							} else {
								checked = this.getCheckboxProps(itemObj[item]).checked;
							}
						} else {
							checked = this.getCheckboxProps(itemObj[item]).checked;
						}

						return React.createElement(renderRow, {
							key: item, // index -> item
							rowSelection: {
								disabled: this.getCheckboxProps(itemObj[item]).disabled,
								checked: checked,
								onChange: (e) => { this.handleSelectChange(e, item); },
							},
							itemData: itemObj[item],
							actions,
							...rowProps
						});
					}
					return React.createElement(renderRow, {
						key: item, // index -> item
						itemData: itemObj[item],
						actions,
						...rowProps
					});
				})}
			</Tag>
		);
	};
	renderTable = () => {
		const { rowSelection, title, tHide, curPage } = this.props;
		let columns = [...title];
		if (rowSelection) {

			columns.unshift(
				<SelectionCheckboxAll
					data={this.state.checkArr[curPage]}
					onChange={this.handleCheckAll}
					changeableRows={this.changeableRows}
				/>
			);
		}
		if (tHide) return this.renderTBody();
		return (
			<table className="__table" >
				<thead>
					<tr>
						{
							columns.map((item, index) => {
								return (
									<th key={index}>{item}</th>
								);
							})
						}
					</tr>
				</thead>
				{this.renderTBody()}
			</table>
		);
	};

	render() {
		const {
			isEnd,
			title,
			style = {},
			className,
			curPage,
			totalPage,
			children,
			tHide,
			...pagination
		} = this.props;
		return (
			<div className={classnames("c-paging", className)} style={{ ...style }}>
				<div className="__conent">
					{this.renderTable()}
				</div>
				{isEnd === 1 && <Spin />}
				{isEnd === 3 && <div className="__error">加载失败...</div>}
				<div className="__footer">
					<div className="__left">
						{children}
					</div>
					<Pagination
						{...pagination}
						showQuickJumper
						defaultPageSize={1}
						current={curPage}
						total={totalPage}
						onChange={(page) => this.handleChange(page, this.props)}
					/>
				</div>
			</div>
		);
	}
}
Paging.propTypes = {
	title: PropTypes.array,
	show: PropTypes.bool,
	className: PropTypes.string,
	isEnd: PropTypes.number.isRequired,
	curPage: PropTypes.number.isRequired,
	totalPage: PropTypes.number.isRequired,
	loadDataForPaging: PropTypes.func.isRequired,
	resetPrvScrollTop: PropTypes.number,
	resetPage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	tHide: PropTypes.bool,
	rowSelection: PropTypes.object,
	dataSource: PropTypes.object,
	renderRow: PropTypes.func.isRequired,
	rowProps: PropTypes.object,
	actions: PropTypes.object,
	history: PropTypes.bool
};
Paging.defaultProps = {
	title: [],
	tHide: false,
	className: '__defalut',
	rowSelection: null,
	dataSource: {},
	history: false,
	show: true
};
export default Paging;
