import React, { Component } from 'react';
import Core from './Core';

class BetterScroll extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		this.betterScroller = new Core(this.refs.betterWrapper, this.props.opts);
	}
	componentDidUpdate() {
		this.betterScroller.refresh();
	}
	componentWillUnmount() {
		this.betterScroller.destroy();
	}
	render() {
		// 去除opts的参数，其它绑定到DOM中
		const { opts, className, style = {}, ...rest } = this.props;
		return (
			<div {...rest} style={{ ...style, overflow: 'hidden' }} className={`${className} rc-bs-wrapper`} ref="betterWrapper">
				<div className="__scroller">
					{this.props.children}
				</div>
			</div>
		);
	}
}
BetterScroll.propTypes = {
	// className
	// style
	// opts
};
export default BetterScroll;