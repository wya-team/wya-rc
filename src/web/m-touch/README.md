## 功能
tpl

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -

## 基础用法

```jsx
import React, { Component } from 'react';
import { MTouch } from 'wya-rc';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			eventType: "单机，双击，长按，滑动，上滑，下滑，左滑，右滑，旋转，"
		};
	}
	/**
	 * 单击执行
	 */
	handleTap = (e) => {
		this.setState({
			eventType: "单机"
		});
	}
	/**
	 * 双击执行
	 */
	handleDoubleTap = (e) => {
		this.setState({
			eventType: "双击"
		});
	}
	/**
	 * 长按执行
	 */
	handleLongTap = (e) => {
		this.setState({
			eventType: "长按"
		});
	}
	/**
	 * 只要滑动都会执行
	 */
	handleSwipe = (e) => {
		this.setState({
			eventType: "只要滑动都会执行"
		});
	}
	/**
	 * 上滑
	 */
	handleSwipeUp = (e) => {
		this.setState({
			eventType: "上滑"
		});
	}
	/**
	 * 右滑
	 */
	handleSwipeRight = (e) => {
		this.setState({
			eventType: "右滑"
		});
	}
	/**
	 * 下滑
	 */
	handleSwipeDown = (e) => {
		this.setState({
			eventType: "下滑"
		});
	}
	/**
	 * 左滑
	 */
	handleSwipeLeft = (e) => {
		this.setState({
			eventType: "左滑"
		});
	}
	/**
	 * 滑动执行的函数
	 */
	handleMove = (e) => {

	}
	/**
	 * 缩放
	 */
	handlePinch = (e) => {
		this.setState({
			eventType: "缩放"
		});
	}
	/**
	 * 旋转
	 */
	handleRotate = (e) => {
		this.setState({
			eventType: "旋转"
		});
	}	
	render() {
		return (
			<MTouch
				onTap={this.handleTap}
				onDoubleTap={this.handleDoubleTap}
				onLongTap={this.handleLongTap}
				onSwipe={this.handleSwipe}
				onSwipeUp={this.handleSwipeUp}
				onSwipeRight={this.handleSwipeRight}
				onSwipeDown={this.handleSwipeDown}
				onSwipeLeft={this.handleSwipeLeft}
				onMove={this.handleMove}
				onPinch={this.handlePinch}
				onRotate={this.handleRotate}
			>
				<div style={{ background: 'red', width: "100%", height: window.innerHeight, textAlign: "center" }}>
					{this.state.eventType}
				</div>
			</MTouch>
		);
	}
}
export default Basic;

```