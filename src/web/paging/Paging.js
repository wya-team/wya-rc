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
		this.bindScroll = ::this.bindScroll;
		this.handleChange = ::this.handleChange;
		this.loadDataFirst = ::this.loadDataFirst;
		this.changeableRows = [];
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
	loadDataFirst(curProps = {}) { // 第一次请求
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
	handleCheckAll = () => {
		const { rowSelection, curPage, dataSource } = this.props;
		const { itemObj = {} } = dataSource;
		const { onChange } = rowSelection;
		let selectedRowKeys = [], selectedRows = [];
		let curPageCheck = this.state.checkArr[curPage] || {};
		for (let i = 0; i < this.changeableRows.length; i++) {
			if (!curPageCheck[this.changeableRows[i]]) { // 未选中
				let checkedRows = this.handleSetSelect('check');
				for (let key in checkedRows) {
					if (checkedRows[key]) {
						selectedRowKeys.push(key);
						selectedRows.push(itemObj[key]);
					}
				}
				onChange && onChange(selectedRowKeys, selectedRows);
				return;
			}
		}
		this.handleSetSelect('uncheck');
		onChange && onChange([], []);
		return;
	};
	handleSetSelect = (type) => {
		const { curPage } = this.props;
		let checkArr = {};
		for (let i = 0; i < this.changeableRows.length; i++) {
			checkArr[this.changeableRows[i]] = type === 'check';
		}

		this.setState({
			checkArr: {
				...this.state.checkArr,
				[curPage]: { ...checkArr }
			}
		});
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
	renderTBody = () => {
		const { rowSelection, curPage, dataSource, renderRow } = this.props;
		const { itemArr = {}, itemObj = {} } = dataSource;
		let curRowData = itemArr[curPage] || [];
		this.changeableRows = [curRowData];
		if (rowSelection) {
			this.changeableRows = curRowData.filter((item, i) => !rowSelection.getCheckboxProps(itemObj[item]).disabled);
		}

		return (
			<tbody>
				{curRowData.map((item, index) => {
					if (rowSelection) {
						let checked;
						if (this.state.checkArr[curPage] && !rowSelection.getCheckboxProps(itemObj[item]).disabled) {
							checked = this.state.checkArr[curPage][item];
						} else {
							checked = rowSelection.getCheckboxProps(itemObj[item]).checked;
						}

						return React.createElement(renderRow, {
							rowSelection: {
								disabled: rowSelection.getCheckboxProps(itemObj[item]).disabled,
								checked: checked,
								onChange: (e) => { this.handleSelectChange(e, item); },
							},
							itemData: itemObj[item],
							key: index
						});
					}
					return React.createElement(renderRow, {
						itemData: itemObj[item],
						key: index
					});
				})}
			</tbody>
		);
	};
	renderTable = () => {
		const { rowSelection, title, tHide, curPage, children, dataSource } = this.props;
		const { itemArr = {}, itemObj = {} } = dataSource;
		let curRowData = itemArr[curPage] || [];
		if (rowSelection) {
			this.changeableRows = curRowData.filter((item, i) => !rowSelection.getCheckboxProps(itemObj[item]).disabled);
			let columns = [...title];
			columns.unshift(
				<SelectionCheckboxAll
					data={this.state.checkArr[curPage]}
					onChange={this.handleCheckAll}
					changeableRows={this.changeableRows}
				/>
			);
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
		} else {
			if (tHide) {
				return  children[0] || children;
			} else {
				return (
					<table className="__table" >
						<thead>
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
				);
			}
		}

	};
	renderOpt = () => {
		const { rowSelection, children } = this.props;
		if (rowSelection) {
			return (children[0] || children) || '';
		} else {
			return children[1] || '';
		}
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
						{this.renderOpt()}
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
};
Paging.defaultProps = {
	title: [],
	tHide: false,
	className: '__defalut',
	rowSelection: null,
	dataSource: {},
};
export default Paging;
