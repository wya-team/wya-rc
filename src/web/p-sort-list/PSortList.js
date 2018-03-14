import React, { Component, createElement } from 'react';
import { getUid } from '../utils/utils';
import PropTypes from 'prop-types';
import './PSortList.scss';
class PSortList extends Component {
	constructor(props) {
		super(props);

		// init
		const { dataSource } = this.props;
		this.state = {
			list: this.setItems(dataSource)
		};

		// target
		this.eleDrag = null;
	}

	componentWillReceiveProps(nextProps) {
		const { dataSource } = nextProps;
		const { dataSource: _dataSource } = this.props;
		if (JSON.stringify(dataSource) != JSON.stringify(_dataSource)) {
			this.setState({
				list: this.setItems(dataSource)
			});
		}
	}
	setItems = (list) => {
		return list.map(item => ({
			id: getUid(),
			itemData: item,
			visibility: false
		}));
	}
	/**
	 * 点击遮罩上的按钮
	 */
	handleClick = (current) => {
		const list = this.getSortList(current);
		this.setState({
			list,
		});
		this.props.onChange && this.props.onChange(list.map(item => item.itemData));
	}

	/**
	 * 获取左移、右移、拖拽、删除后的列表
	 */
	getSortList = (current) => {
		const { id, index, type } = current; // id:移动对象，i：目标位置，type：类型
		const { list } = this.state;
		const arr = list.filter(item => item.id != id);
		switch (type) {
			case 'left':
				arr.splice(index - 1, 0, list[index]);
				break;
			case 'right':
				arr.splice(index + 1, 0, list[index]);
				break;
			case 'drag':
				const id_i = list.findIndex(item => item.id === id); // 这个id元素对应的下标
				arr.splice(index, 0, list[id_i]);
				break;
			default: // 删除
				break;
		}
		// this.props.onChange && this.props.onChange(arr.map(item => item.itemData));
		return arr;
	}

	/**
	 * 拖拽开始
	 */
	handleDragStart = (e) => {
		const { list } = this.state;

		// 火狐bug，需要设置setData，之后drag才能正常工作
		e.dataTransfer.setData('text', e.target.innerHTML);
		e.dataTransfer.effectAllowed = "move";

		let { id } = e.target;
		this.eleDrag = e.target;
		setTimeout(() => {
			this.setState({
				list: list.map(item => {
					if (item.id === id) {
						return {
							...item,
							visibility: true
						};
					}
					return item;
				})
			});
		}, 0);
		return true;
	}

	/**
	 * 拖拽元素进入目标元素头上的时候
	 */
	handleDragEnter = (e, index) => {
		const { id } = this.eleDrag;
		this.setState({
			list: this.getSortList({ id, index, type: 'drag' })
		});
		return true;
	}

	/**
	 * 拖拽结束
	 */
	handleDragEnd = (e) => {
		e.dataTransfer.clearData("text");
		const { id } = this.eleDrag;
		const { list } = this.state;
		this.props.onChange && this.props.onChange(list.map(item => item.itemData));

		this.eleDrag = null;
		this.setState({
			list: this.state.list.map(item => {
				return {
					...item,
					visibility: false
				};
			})
		});
		return false;
	}

	getDataSource = () => this.state.list

	renderMask(id, index) {
		const { list } = this.state;
		return <div className="__mask">
			{
				index !== 0
					? <span onClick={() => this.handleClick({ id, index, type: 'left' })}>&#10094;</span>
					: <span />
			}
			<span onClick={() => this.handleClick({ id, index, type: 'delete' })}>&#10006;</span>
			{
				index !== this.state.list.length - 1
					? <span onClick={() => this.handleClick({ id, index, type: 'right' })}>&#10095;</span>
					: <span />
			}
		</div>;
	}

	render() {
		const { list = [] } = this.state;
		const { renderRow, tag: Tag, style, className } = this.props;
		return (
			<div className={`rcp-sort-list${className ? ` ${className}` : ""}`} style={{ ...style }}>
				{
					list.length > 0 && list.map((item, index) => {
						let { id, visibility, itemData } = item;
						const { background, text } = itemData;
						return (
							<Tag
								key={id}
								id={id}
								draggable={!0}
								onDragStart={this.handleDragStart}
								onDragEnd={this.handleDragEnd}
								onDragEnter={(e) => this.handleDragEnter(e, index)}
								style={{ visibility: visibility ? 'hidden' : 'unset' }}
							>
								{createElement(renderRow, { ...item })}
								{this.renderMask(id, index)}
							</Tag>
						);
					})
				}
			</div >
		);
	}
}
PSortList.propTypes = {
	dataSource: PropTypes.array,
	onChange: PropTypes.func,
	tag: PropTypes.string,
};
PSortList.defaultProps = {
	tag: 'div'
};
export default PSortList;
