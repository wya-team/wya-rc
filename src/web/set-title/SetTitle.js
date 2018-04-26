import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
class SetTitle extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.setTitle();
	}
	componentDidUpdate() {
		this.setTitle();
	}
	componentWillUnmount() {
	}
	setTitle() {
		let { title } = this.props;
		let _title = document.title;
		title != _title && (document.title = title || '系统');
	}
	hackForSetTitle() {
	}
	render() {
		const { className, style, isShow } = this.props;
		const styleShow = isShow ? {} : { display: "none" };
		return (
			<div className={className} style={{ ...style, overflowX: 'auto', ...styleShow }}>
				{this.props.children}
			</div>
		);
	}
}
SetTitle.propTypes = {
	/**
	 * document.title
	 */
	title: PropTypes.string,
	/**
	 * 初始化class与style
	 */
	className: PropTypes.string,
	style: PropTypes.object,
	/**
	 * 首次加载隐藏不显示
	 */
	isShow: PropTypes.number,
	/**
	 * 监听的节点
	 */
	wrapper: PropTypes.string
};
/**
 *实现三个功能，标题（需要额外传入参数，使componentDidUpdate不触发），分享，滚动监听
 */
SetTitle.defaultProps = {
	wrapper: "window",
	isShow: 1
};
export default SetTitle;

