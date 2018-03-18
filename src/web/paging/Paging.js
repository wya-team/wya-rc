import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Paging.scss';
import { Button, Pagination, Spin, Checkbox } from 'antd';
import SelectionCheckboxAll from './SelectionCheckboxAll';

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
							[nextProps.curPage]: { ...checkArr }
						}
					});
				}
			}
		} else if (this.props.curPage === nextProps.curPage) {
			const { rowSelection, curPage, dataSource } = nextProps;
			const { itemArr = {}, itemObj = {} } = dataSource;
			let curRowData = itemArr[curPage] || [];
			if (rowSelection) {
				this.changeableRows = curRowData.filter((item, i) => !this.getCheckboxProps(itemObj[item]).disabled);
				let unChangeableRows = curRowData.filter((item, i) => this.getCheckboxProps(itemObj[item]).disabled);
				let unCheckArr = {};
				// 将disabled的Row的check状态改为false设置到state中
				if (this.state.checkArr[nextProps.curPage]) {
					for (let i = 0; i < unChangeableRows.length; i++) {
						unCheckArr[unChangeableRows[i]] = false;
					}
					this.setState({
						checkArr: {
							...this.state.checkArr,
							[nextProps.curPage]: {
								...this.state.checkArr[nextProps.curPage],
								...unCheckArr
							}
						}
					});
				}
			}
		}
	}
	componentDidCatch(error, info){
		console.log(error, info);
	}
	handleChange = (pages) =>  {
		this.props.loadDataForPaging && this.props.loadDataForPaging(pages);
	};
	bindScroll = () => {
		if (this.wrapper) {
			this.scrollContainer = document.querySelector(`${this.wrapper}`);
		}
	};
	loadDataFirst = (curProps = {}) => { // 第一次请求
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
			this.setState({
				checkArr: {
					...this.state.checkArr,
					[curPage]: Object.create(null)
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
							key: index,
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
						itemData: itemObj[item],
						key: index,
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
	tHide: PropTypes.bool,
	rowSelection: PropTypes.object,
	dataSource: PropTypes.object,
	renderRow: PropTypes.func.isRequired,
	rowProps: PropTypes.object,
	actions: PropTypes.object
};
Paging.defaultProps = {
	title: [],
	tHide: false,
	className: '__defalut',
	rowSelection: null,
	dataSource: {},
};
export default Paging;
