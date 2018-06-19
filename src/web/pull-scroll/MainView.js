import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import pureRender from 'pure-render-decorator';
// @pureRender
class MainView extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			pulledY: 0 // 下拉的距离
		};
		// pull
		/**
		 * 是否处于touch状态
		 * 其实是用于兼容PC端
		 * 在mousedown之后才允许mousemove的逻辑
		 */
		this.touching = false;
		this.startY = undefined; // 记录pull起始位置
		this.endY = undefined; // 记录pull当前位置
		/**
		 * 0.未touchstart 
		 * 1.pulling但未达到pulledPauseY 
		 * 2.pulling达到pulledPauseY 
		 * 3.进入pause状态 （loading）
		 */
		this.pullStatus = 0;
		this.shouldLoadForPull = true;
		// scroll
		this.prvScrollTop = 0;// 当前列表上次滚动到的位置
		this.wrapper = props.wrapper;
		this.timer = null;
		// bind
		this.handleStart = ::this.handleStart;
		this.handleMove = ::this.handleMove;
		this.handleEnd = ::this.handleEnd;
		this.handleScroll = ::this.handleScroll;
		this.privatePulling = ::this.privatePulling;
		this.privatePullEnd = ::this.privatePullEnd;
		this.privateChangeStatus = ::this.privateChangeStatus;
	}
	componentWillMount() {
		this.prvScrollTop = 0;// 这里可考虑设置全局的量来控制
		this.loadFirst(this.props);
	}
	componentDidMount() {
		this.pullContainer = (this.wrapper) 
			? document.querySelector(this.wrapper) 
			: document.body;
		this.scrollContainer = (this.wrapper) 
			? document.querySelector(this.wrapper) 
			: window;
		// pull
		this.pullContainer.addEventListener('touchstart', this.handleStart);
		this.pullContainer.addEventListener('touchmove', this.handleMove, { passive: false });
		this.pullContainer.addEventListener('touchend', this.handleEnd);
		this.pullContainer.addEventListener('mousedown', this.handleStart);
		this.pullContainer.addEventListener('mousemove', this.handleMove, { passive: false });
		this.pullContainer.addEventListener('mouseup', this.handleEnd);
		// scroll
		this.scrollContainer.addEventListener('scroll', this.handleScroll);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.resetPrvScrollTop 
				&& nextProps.resetPrvScrollTop != this.props.resetPrvScrollTop) {
			this.prvScrollTop = 0;
			this.scrollContainer.scrollTop = 0;// 置顶
		}
		this.loadFirst(nextProps);
	}
	componentWillUnmount() {

		// 解绑事件
		this.pullContainer.removeEventListener('touchstart', this.handleStart);
		this.pullContainer.removeEventListener('touchmove', this.handleMove);
		this.pullContainer.removeEventListener('touchend', this.handleEnd);
		this.pullContainer.removeEventListener('mousedown', this.handleStart);
		this.pullContainer.removeEventListener('mousemove', this.handleMove);
		this.pullContainer.removeEventListener('mouseup', this.handleEnd);
		this.pullContainer.removeEventListener('scroll', this.handleScroll);
	}
	loadFirst($props){
		if (!$props.show || $props.isEnd > 0) { // 禁用，加载完成或者加载中无视
			return false;
		}
		if ($props.currentPage == 0) {
			this.props.loadDataForScroll && this.props.loadDataForScroll();
			/**
			 * 重新清理下高度参数
			 */
			this.prvScrollTop = 0;
		}
	}
	handleStart(event) {
		this.touching = true;
		// 使微信不露底
		this.startYForWeiXin = event.touches 
			? event.touches[0].screenY 
			: event.screenY; 
	}

	handleMove(event) {
		const eTouchScreenY = event.touches 
			? event.touches[0].screenY 
			: event.screenY; // 也可使用clientY
		/**
		 * 处理微信露底问题
		 * 
		 * (内容)上滑到底部，不能继续上滑，但是可以下拉 （允许向上滚动）
		 * (内容)向下拉到顶部，不能继续下拉，但是可以上滑 （允许向下滚动）
		 * (内容)既不能往下拉也不能上滑
		 *
		 * 高位表示下拉'10'（向上滚动）, 低位表示上滑'01'（向下滚动）: 1允许 0阻止
		 */
		 /**
		  * 分析表
		  * 可允许的方向(height) 拉的方向(touch)    能否继续拉
		  * 00                    10（下拉）            0 // 阻止
		  * 00                    01（上滑）            0 // 阻止
		  * 01（顶）        	  10（下拉）            0 // 阻止
		  * 01（顶）              01（上滑）            1
		  * 10（底）              10（下拉）            1
		  * 10（底）              01（上滑）            0 // 阻止
		  */
		let scrollStatus = '11';
		// 当前滚动条距离容器顶部
		let scrollTop = this.scrollContainer.scrollTop;
		// 容器的高度
		let containerHeight = this.scrollContainer.offsetHeight;
		// 内容的总高度
		let scrollHeight = this.scrollContainer.scrollHeight;

		if (scrollTop === 0) {
			// 如果内容小于容器则同时禁止上下滚动
			// '00'容器足够包含内容，本身就不应该支持滚动，'01'在顶部，支持上滑，向下滚动，支持滚动
			scrollStatus = containerHeight >= scrollHeight ? '00' : '01';
		} else if (scrollTop + containerHeight >= scrollHeight) {
			// 已经滚到底部了只支持下拉滚动，即向上滚动
			scrollStatus = '10';
		} // 其他情况属于 '11'

		if (scrollStatus != '11') {
			// 判断当前的滚动方向
			let direction = eTouchScreenY - this.startYForWeiXin > 0 ? '10' : '01';
			// 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
			if (!(parseInt(scrollStatus, 2) & parseInt(direction, 2))) { // 连着均是'10'或'01' 不阻止滚动
				event.preventDefault();
			}
		}
		/** ************正常部分***************/
		const { pull } = this.props;
		if (!pull || !this.touching) return;
		const { onPulling, scaleY } = this.props;
		if (this.pullStatus) { // 状态非0时
			const pulledY = (eTouchScreenY - this.startY) * scaleY; // 用scaleY对pull的距离进行缩放
			if (pulledY >= 0) { // 进行下拉
				this.endY = eTouchScreenY;
				this.setState({
					pulledY: pulledY
				});
				if (this.pullStatus !== 3) { // 在状态不为3时，即状态为1或2时
					this.privatePulling && this.privatePulling(pulledY);
				}
				this.props.onPulling && this.props.onPulling(pulledY); // 始终触发外部的onPulling事件
			} else { // 上滑，其实只有状态为3时才会进入该逻辑，pulledY<0时，回到状态0
				// event.preventDefault(); 这个使用要注意，会屏蔽滚动
				this.privateChangeStatus(0);
				this.setState({
					pulledY: 0
				});
			}
		} else { // 状态为0时
			if (this.pullContainer.scrollTop === 0) { // 当scrollTop为0时进入状态1
				this.startY = eTouchScreenY;
				this.privateChangeStatus(1);
			}
		}
	}
	/**
	 * 在未处于状态3时触发，进行状态切换1、2间的切换
	 * @param pulledY
	 * @private
	 */
	privatePulling(pulledY) {

		const { pulledPauseY } = this.props;
		
		if (pulledY > pulledPauseY) { // 拉动的值超过设定的，即提示释放刷新
			if (this.pullStatus !== 2) {
				this.privateChangeStatus(2);
			}
		} else { // 拉动的值不超过设定的，即提示下拉刷新
			if (this.pullStatus !== 1) {
				this.privateChangeStatus(1);
			}
		}
	}
	/**
	 * 进行状态切换
	 */
	privateChangeStatus(pullStatus) {
		this.pullStatus = pullStatus;
		// 0 和 3 的状态 会触发状态的位移
		this.props.onPullStatusChange && this.props.onPullStatusChange(this.pullStatus);
	}
	handleEnd() {
		const { pull } = this.props;
		if (!pull) return;
		const { pulledY } = this.state;
		const { pulledPauseY } = this.props;
		if (this.pullStatus) {
			const isPause = this.privatePullEnd(pulledY);
			this.setState({
				pulledY: isPause ? pulledPauseY : 0
			});
		}

		this.touching = false;
	}
	/**
	 * 根据pulledY的位置与pulledPauseY比较
	 * 判断是否进入状态3还是回到状态0
	 * @param pulledY
	 * @returns {boolean}
	 */
	privatePullEnd(pulledY) {
		const { pulledPauseY } = this.props;

		if (pulledY > pulledPauseY) {
			this.privateChangeStatus(3);
			// 准备去请求数据啦
			(this.shouldLoadForPull && this.props.loadDataForPull) && this.props.loadDataForPull();
			this.shouldLoadForPull = false; // 不允许下拉刷新获取数据
			return true;
		} else {
			this.privateChangeStatus(0);
			return false;
		}
	}
	setDefault(){
		this.setState({
			pulledY: 0
		});
		this.pullStatus = 0;
		this.prvScrollTop = 0;
		// 允许下拉刷新获取数据
		this.shouldLoadForPull = true;
	}
	handleScroll(event) {
		const { scroll, direction } = this.props;
		if (!scroll) return;
		let isWindow = (this.scrollContainer === window);
		// 延迟计算
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (!this.props.show || this.props.isEnd == 2) {
				return;
			}

			let scrollEle = (isWindow) ? 
				this.scrollContainer.document : 
				this.scrollContainer;
			let scrollTop = (isWindow) 
				? scrollEle.body.scrollTop
				: scrollEle.scrollTop;

			// 防止向上滚动也拉数据
			if (direction == 'UP' && this.prvScrollTop > scrollTop) {
				return;
			}
			this.prvScrollTop = scrollTop;

			let containerHeight = (isWindow) 
				? scrollEle.documentElement.clientHeight 
				: scrollEle.offsetHeight;// 容器高，视口的高
			let scrollHeight = (isWindow) 
				? scrollEle.body.clientHeight 
				: scrollEle.scrollHeight;// 内容的总高度
			if (direction == 'UP') {
				if (scrollTop >= scrollHeight - containerHeight - 100) {
					this.props.loadDataForScroll && this.props.loadDataForScroll();
				}
			} else if (direction == 'DOWN') {
				if (scrollTop == 0) {
					this.props.loadDataForScroll && this.props.loadDataForScroll();
				}
			}
		}, 50); 
	}
	render() {
		const { props: { children }, state: { pulledY } } = this;
		const { isEnd, currentPage, itemArr } = this.props;
		return (
			<div
				style={{
					transform: `translateY(${pulledY}px)`
				}}
			>
				{ children }
			</div>
		);
	}
}
MainView.propTypes = {
	/**
	 * 是否运行组件，默认true，关联到触发加载数据的问题
	 */
	show: PropTypes.bool,
	/**
	 * 是否支持下拉，默认true
	 */
	pull: PropTypes.bool,
	/**
	 * 是否支持上滑，默认true
	 */ 
	scroll: PropTypes.bool,
	// for pull 
	/**
	 * 下拉结束即从状态2切换到状态3时的事件，准备去加载数据了
	 */
	loadDataForPull: PropTypes.func,
	/**
	 * 处于pause状态即status为3时的Y方向应所在的位置
	 */
	pulledPauseY: PropTypes.number,
	/**
	 * 下拉距离缩放比例，将会影响能够下拉的距离,可以理解为阻力
	 */
	scaleY: PropTypes.number,
	/**
	 * 可用于上滑加载更多
	 */
	onPulling: PropTypes.func,
	// for scroll
	// resetPrvScrollTop
	// show
	// currentPage
	// loadDataForScroll
	// isEnd
};
export default MainView;
