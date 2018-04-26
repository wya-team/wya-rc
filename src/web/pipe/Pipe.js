import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Pipe extends Component {
	constructor(props, context) {
		super(props, context);
	}
	renderResult() {
		const { mode, children: value, onConvert } = this.props;
		const { extra, start, length } = this.props;
		if (onConvert) return onConvert(value);
		switch (mode) {
			case 'ellipsis':
				let isEnough = value.length > length;
				return isEnough ? `${value.substring(start, start + length)}${extra}` : value;
			case 'auto': // 自适应 待开发
			// 1. 2 4 6 8 .. 一次改变
			// 2. 根据高度自适应
			default :
				return value;
		}
	}
	render() {
		const { tag: Tag, ...rest } = this.props;
		return (
			<Tag {...rest}>
				{this.renderResult()}
			</Tag>
		);
	}
}
Pipe.propTypes = {
	/**
	 * 默认标签 span
	 */
	tag: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]),
	/**
	 * 子元素必须是string
	 */
	children: PropTypes.string,
	/**
	 * 自定义转换器
	 */
	onConvert: PropTypes.func,
	/**
	 * 模式
	 * ellipsis | auto | none
	 */
	mode: PropTypes.string,

	/**
	 * ellipsis 模式
	 */
	start: PropTypes.number,
	length: PropTypes.number,
	extra: PropTypes.string
};
Pipe.defaultProps = {
	tag: 'span',
	mode: 'ellipsis',
	start: 0,
	length: 5,
	extra: '...',
};
export default Pipe;