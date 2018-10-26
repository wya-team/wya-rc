import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import Icon from '../icon/Icon';
import Item from './Item';
import './Styles.scss';


class NavBar extends Component {
	static Item = Item;

	constructor(props) {
		super(props);
		this.state = {
			translateX: 0,                // 水平移动的距离
			showOpt: false,               // 是否显示左右操作箭头
		};
		this.minDis = 0;                  // 最小可移动距离
		this.maxDis = 0;                  // 最大可移动距离
		this.moveDis = 0;                 // 点击<、>的移动距离, 即滚动容器的宽度
		this.scrollWidth = 0;             // nav的总长度
		this.navs = [];                   // navItem的长度数组
		this.scroll = React.createRef();  // 滚动容器
		this.activeIndex = 0;             // 选中的nav的数组索引（index）

		// throttle resize节流
		this.handleResizeWindow = throttle(this.handleResizeWindow, 300);
	}

	componentDidMount() {
		this.scrollWidth = this.navs.reduce((prev, cur) => prev + cur);
		setTimeout(() => {
			// 因为左右两侧箭头显示隐藏的关系，因为走的是state所以会导致 moveDis 的值有偏差
			// 所以在setTimeout中执行setState，这样state更新就是同步的了
			this.moveDis = this.scroll.current.clientWidth;
			this.handleToggleOPt();
			this.setMaxDistance(this.scrollWidth, this.moveDis);

			this.handleIntoView();
		}, 0);
		// 监听window.resize
		window.addEventListener('resize', this.handleResizeWindow);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.activeKey != this.props.activeKey) {
			this.handleIntoView();
		}
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.handleResizeWindow);
	}

	// window resize会导致maxDistance改变
	setMaxDistance = (scrollWidth, moveDis) => {
		this.maxDis = scrollWidth < moveDis ? 0 : scrollWidth - moveDis;
	}

	handleResizeWindow = () => {
		this.moveDis = this.scroll.current.clientWidth;
		this.handleToggleOPt();
		this.setMaxDistance(this.scrollWidth, this.moveDis);
		
		if (this.state.translateX > this.maxDis) {
			this.setState({
				translateX: this.maxDis
			});
		} else {
			this.handleIntoView();
		}
	}

	// 显示隐藏 左右箭头
	handleToggleOPt = () => {
		this.setState({
			showOpt: this.moveDis < this.scrollWidth // 所有的Item是否都能在容器中显示
		}, () => {
			this.moveDis = this.scroll.current.clientWidth;
		});
	}

	/**
	 * 将nav item移动到视图当中
	 */
	handleIntoView = () => {
		const { itemOffset } = this.props;
		let newArr = [...this.navs ];
		newArr.length = this.activeIndex + 1;
		// 当前选中的item的宽度 与 之前所有Item的宽度总和
		let leftDis = newArr.reduce((prev, cur) => prev + cur); 
		// 当前选中的item之前所有Item的宽度总和
		let prevLeft = leftDis - newArr[this.activeIndex];  
		// item之间的margin值
		let offset = this.navs.length - 1 == this.activeIndex ? 0 : itemOffset; 
		
		if (leftDis > this.moveDis) { // 判断当前选中的item是不是在容器内（未经过左右箭头移动的）
			if (leftDis - this.state.translateX > this.moveDis) {
				// 将选中的Item定位到靠右侧
				this.setState({
					translateX: leftDis - this.moveDis - offset
				});
			} else if (prevLeft < this.state.translateX) {
				// 将选中的Item定位到最左侧
				this.setState({
					translateX: prevLeft
				});
			}
			// 都不满足的话，说明选中的Item在视图内，这样就不去移动
		} else {
			this.setState({
				translateX: 0
			});
		}
	}

	handlePushNav = (nav) => {
		this.navs.push(nav);
	}

	handlePrev = () => {
		const { translateX } = this.state;
		this.setState({
			translateX: translateX - this.moveDis < this.minDis ? 0 : translateX - this.moveDis
		});
	}

	handleNext = () => {
		const { translateX } = this.state;
		this.setState({
			translateX: Math.min(translateX + this.moveDis, this.maxDis)
		});
	}

	render() {
		const { children, activeKey, itemOffset, onChange } = this.props;
		const { translateX, showOpt } = this.state;
		const prev = translateX == 0 ? 'hide' : 'show';
		const next = translateX == this.maxDis ? 'hide' : 'show';
		const opacity = showOpt ? '_opacity-show' : '_opacity-hide';
		const disabled = { pointerEvents: "auto", cursor: "not-allowed" };

		return (
			<div className="rc-nav-bar-container" style={{ padding: `${showOpt ? '0 32px' : '0 0'}` }}>
				<div ref={this.scroll} className="_scroll-container">
					<div
						className="_scroll-wrap"
						style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
					>
						<div>
							{React.Children.map(children, (child, index) => {
								if (!child) return null;
								if (activeKey == child.key) { this.activeIndex = index; }
								
								return React.cloneElement(child, {
									...child.props,
									active: activeKey == child.key,  // 以该组件判断的为主, 覆盖外部传入的值
									isEnd: children.length - 1 == index,
									offset: itemOffset,
									onPushNav: this.handlePushNav,
									onClick: () => onChange && onChange(child.key)
								});
							})}
						</div>
					</div>
				</div>
				<span
					unselectable="unselectable"
					className={`_flex-cc _nav-prev _nav-prev-${prev} ${opacity}`}
					style={{ ...(prev === 'hide' ? disabled : {}), width: showOpt ? 32 : 0 }} 
					onClick={this.handlePrev}
				>
					<Icon type="left" />
				</span>
				<span
					unselectable="unselectable"
					className={`_flex-cc _nav-next _nav-next-${next} ${opacity}`}
					style={{ ...(next === 'hide' ? disabled : {}), width: showOpt ? 32 : 0 }}
					onClick={this.handleNext}
				>
					<Icon type="right" />
				</span>
			</div>
		);
	}
}

NavBar.propTypes = {
	itemOffset: PropTypes.number
};

NavBar.defaultProps = {
	itemOffset: 32
};

export default NavBar;