/**
 * 待开发，未完成
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Swiper.scss';
class Swiper extends Component {
	constructor(props) {
		super(props);
		let { children, width } = this.props;
		let len = children ? children.length : 1;
		let curIndex = 0;
		let lefts = children.map((ele, index) => {
			if (index - curIndex >= -1) {
				return index * width;
			} else {
				return (index + len) * width;
			}
		});
		let curTransLateX = -1 * curIndex * width;
		
		this.state = {
			width,
			lefts,
			// 位移
			curTransLateX,
			// 当前的正在展示的序列号
			curIndex,
			// 父容器
			contentStyle: {
				width: len * 100 + '%',
				height: '100%',
				transform: `translate3d(${curTransLateX}px, 0, 0)`,
				position: 'relative',
				top: 0,
				left: 0
			}
		};

		// 
		this.timer = null;
		this.clickSafe = {
			allowClicked: true,
			allowSlided: true
		};
		this.touchObject = {};

	}

	/**
	 * 只有上一次的点击事件执行完，才能点击下一个
	 * 下面生命周期的操作
	 */
	componentDidMount() {
		// 根据this.props.autoPlay 来决定是否自动播放
		let { autoPlay } = this.props;
		!!autoPlay && this.autoPlaySlide();

	}

	/**
	 * 上面是生命周期的操作
	 * 自动播放
	 */
	autoPlaySlide() {
		let { autoPlay } = this.props;
		this.timer = setInterval(() => this.nextSlide(), autoPlay);
	}

	/**
	 * 点击事件
	 * arg 变量就是 当前的curIndex 减去 下一个的将要被展示的 curIndex
	 * 这里为什么是1 ， 因为他要向左移动一个单位，当前的curIndex 
	 * 减去 下一个的将要被展示的 curIndex 所以是正1
	 */
	preSlide = () => {
		let { curIndex } = this.state;
		let { autoPlay, children } = this.props;
		let len = children.length;
		let arg = 1;

		// 判断 是否 设置 autoplay
		if (!this.hasInterval()) {
			return;
		}

		curIndex -= arg;

		// 当第一个的子元素的left为0 并且父容器的translateX ==0 时，
		// 我们
		if (curIndex === -1) {
			this.getTargetLeft(curIndex);
		}
		this.setState({
			curIndex
		}, () => {
			this.animateSlide(arg);
		});
	}
	nextSlide = () => {
		let { curIndex } = this.state;
		let { autoPlay, children } = this.props;
		let len = children.length;
		let arg = -1;

		if (!this.hasInterval()) {
			return;
		}
		curIndex -= arg;
		// 这里的curIndex 就是下一个将要被展示出的slide的序号了，
		// 不过加了 nextIndex ，这个curIndex 叫做 targerIndex 更合适

		this.setState({
			curIndex
		}, () => {
			this.animateSlide(arg);
		});
	}
	/**
	 * 父容器滚动
	 * arg 为 1，那么就向左走， 为 -1 就向右走。
	 * nextIndex 是下一个将要被展示的slide
	 * 这个 nextIndex 是个很有意思的东西，
	 * 当 arg = -1 和 arg = 1的的时候，nextIndex 都是等于 targetIndex 的，
	 * 如果 arg 不等于 1 或者 -1， 那么 就是下一个sldie的index了。 
	 */
	animateSlide(arg) {
		let { curIndex, curTransLateX, data } = this.state;
		let { children, width } = this.props;
		let len = children.length;

		// 这个 nextIndex 是处理 多个单位位移的 精髓所在
		let nextIndex = curIndex + arg - (arg / Math.abs(arg));

		/**
		 *  因为加入了 移动端 的touch事件， 所以， 这里的 targetTranslateX 要重新写
		 */
		let targetTranslateX =  nextIndex === -1 ? 0 : (-curIndex * width);
		const doet = () => {

			const { curTransLateX, contentStyle, lefts } = this.state;
			let nextTransLateX = 0;
			let step = (targetTranslateX - curTransLateX) / 8;

			step = arg > 0 ? Math.ceil(step) : Math.floor(step);
			nextTransLateX = curTransLateX + step;

			// 下面这个if还是要多加个判断，用来处理 dots 的点击情况。
			if (curTransLateX > targetTranslateX && arg < 0 || // 点击右边的按钮
				curTransLateX < targetTranslateX && arg > 0 // 点击左边的按钮
			) {
				/**
				 * Math.abs(arg) > 1 则表示，是 多单位位移
				 * Math.abs(curTransLateX) < lefts[nextIndex]
				 * && lefts[nextIndex] < Math.abs(nextTransLateX)  表示，向左多个单位的临界 
				 * Math.abs(curTransLateX) > lefts[nextIndex] 
				 * && lefts[nextIndex] > Math.abs(nextTransLateX)  表示， 向右多个单位的临界
				 */
				if (Math.abs(arg) > 1 &&
					Math.abs(curTransLateX) < lefts[nextIndex] &&
					lefts[nextIndex] < Math.abs(nextTransLateX) ||
					Math.abs(curTransLateX) > lefts[nextIndex] &&
					lefts[nextIndex] > Math.abs(nextTransLateX)
				) {
					// 临界进入这里
					this.getTargetLeft(nextIndex);
					nextIndex -= (arg / Math.abs(arg));
				} else {
					// 处理左右点击按钮，只位移一个单位的 情况。
					contentStyle.transform = `translate3d(${nextTransLateX}px, 0, 0)`;
					this.setState({
						curTransLateX: nextTransLateX,
						contentStyle
					});
				}

				window.requestAnimationFrame(doet);
			} else {
				/**
				 * 这里要对 curIndex 做判断，当 curIndex === length  时，
				 * 重新设置 curIndex , 并且执行 回调里的getTargetLeft()
				 */
				let { width } = this.state;
				this.clickSafe.allowClicked = true;

				if (curIndex === len && arg < 0) {
					curIndex = 0;
					this.criticalityTime(curIndex, len);
					return;
				} else if (curIndex === -1 && arg > 0) {
					curIndex = len - 1;
					this.criticalityTime(curIndex, len);
					return;
				}

				this.criticalityTime(curIndex, len);
			}
		};

		window.requestAnimationFrame(doet);
	}
	/**
	 * 返回移动端的 touch事件
	 */
	getTouchedEvent = () => {
		let { mode } = this.props;
		if (mode === 'pc') return null;
		return {
			// 触碰开始， 停止 定时器
			onTouchStart: (e) => {
				if (!this.hasInterval()) {
					return;
				}
				// console.log('开始咯');
				this.touchObject = {
					...this.touchObject,
					startX: e.touches[0].pageX,
					startY: e.touches[0].pageY,
				};
			},
			// 触碰移动, 
			onTouchMove: (e) => {
				let {
					curTransLateX: nextTransLateX,
					contentStyle,
					curIndex
				} = this.state;
				const preLength = this.touchObject.preLength || 0;
				const direction = this.swipeDirection(
					this.touchObject.startX,
					e.touches[0].pageX,
					this.touchObject.startY,
					e.touches[0].pageY
				);
				if (direction !== 0) {
					// e.preventDefault();
				}
				const length = Math.round(
					Math.sqrt(
						Math.pow(e.touches[0].pageX - this.touchObject.startX, 2)
					)
				);
				this.touchObject = {
					startX: this.touchObject.startX,
					startY: this.touchObject.startY,
					endX: e.touches[0].pageX,
					endY: e.touches[0].pageY,
					length,
					direction,
					preLength: length

				};
				/**
				 * length - preLength 
				 * 就是 这次的 位移 
				 * 而且 有个特殊的情况，就是当 curIndex === 0,并且我们向左转时，我们要重新设置一下定位。
				 * 
				 */
				if ( curIndex === 0 && direction === -1 && length - preLength < 20 ) {
					this.setState({
						curIndex: -1
					}, () => {
						this.getTargetLeft(-1);
					});
				}
				
				nextTransLateX -= direction * (length - preLength);

				contentStyle.transform = `translate3d(${nextTransLateX}px, 0, 0)`;
				this.setState({
					curTransLateX: nextTransLateX,
					contentStyle: { ...contentStyle }
				});

				// 在这里，对 length进行判断。
			},
			// 触碰结束， 将touchObject初始化为空对象 ，定时器存在的话， 就恢复定时器
			onTouchEnd: (e) => {
				let {
					length,
					direction
				} = this.touchObject;
				let { curIndex } = this.state;
				let { autoPlay } = this.props;
				let arg = -1 * direction;
				/**
				 * 根据 length 的大小， 来决定 是否运动。或者 复位
				 */
				// console.log('结束了');
				if (length >= 20 ) {
					
					if (curIndex === -1) {
						this.animateSlide(arg);
					} else {
						curIndex -= arg;
						this.setState({
							curIndex
						}, () => {
							this.animateSlide(arg);
						});
					}
				} else {
					/**
					 * length < 20,不进行轮播。图片复位,同时，恢复定时器。
					 */
					this.getTargetLeft();
					this.clickSafe.allowClicked = true;
					!!autoPlay && this.autoPlaySlide();
				}

				this.touchObject = {
					preLength: 0
				};
				
			},
			onTouchCancel: (e) => {}
		};
	}

	/**
	 * 判断 touch 的方向，
	 * 1 : right To left
	 * -1: left To right	
	 * 把这个 作为参数 传到 animateSlide,
	 */
	swipeDirection = (x1, x2, y1, y2) => {
		const xDist = x1 - x2;
		const yDist = y1 - y2;
		const r = Math.atan2(yDist, xDist);
		let swipeAngle = Math.round(r * 180 / Math.PI);

		if (swipeAngle < 0) {
			swipeAngle = 360 - Math.abs(swipeAngle);
		}
		if (swipeAngle <= 45 && swipeAngle >= 0) {
			return 1;
		}
		if (swipeAngle <= 360 && swipeAngle >= 315) {
			return 1;
		}
		if (swipeAngle >= 135 && swipeAngle <= 225) {
			return -1;
		}
		if (this.props.vertical === true) {
			if (swipeAngle >= 35 && swipeAngle <= 135) {
				return 1;
			} else {
				return -1;
			}
		}
		return 0;
	}

	/**
	 * 根据参数，或者当前的 curIndex 来重新设置
	 */
	getTargetLeft(nextIndex) {

		let {
			curTransLateX,
			contentStyle,
			data,
			curIndex
		} = this.state;
		let { children, width } = this.props;
		let len = children.length;

		curIndex = typeof nextIndex === 'undefined' ? curIndex : nextIndex;
		let lefts = children.map((ele, index) => {
			if (curIndex !== -1) {
				if (index - curIndex >= -1) {
					return index * parseInt(width);
				} else {
					return (index + len) * parseInt(width);
				}
			} else {
				if (index - curIndex >= 1 && index - curIndex < len) {
					return (index - curIndex) * parseInt(width);
				} else {
					return 0;
				}
			}

		});

		curTransLateX = curIndex !== -1 
			? (-1 * curIndex * width) 
			: curIndex * width;
		contentStyle.transform = `translate3d(${curTransLateX}px, 0, 0)`;

		this.setState({
			lefts,
			curTransLateX,
			contentStyle,
			curIndex
		});
	}

	/**
	 * 点击不同索引的li，进行相应的位移。
	 */
	handleDotsClick = (num) => {
		let { curIndex } = this.state;
		let { autoPlay } = this.props;
		let arg = curIndex - num;
		console.log(autoPlay);
		if (!this.hasInterval()) return;

		// 这里的curIndex 就是下一个将要被展示出的slide的序号了
		curIndex -= arg;

		this.setState({
			curIndex: num
		}, () => {
			this.animateSlide(arg);
		});
	}

	/**
	 * 点击按钮时，判断 是否存在定时器，以及 不允许 短时间内 多次点击
	 */
	hasInterval = () => {
		if (!!this.timer) {
			clearInterval(this.timer);
		}
		/**
		 * 主要目的还是 阻止多次点击
		 */

		if (!this.clickSafe.allowClicked) {
			return false;
		} else {
			this.clickSafe.allowClicked = false;
			return true;
		}
	}

	/**
	 * 临界点，执行它, 根据 参数， 进而确认 是否改变
	 * 他就是以前的 回调函数
	 */
	criticalityTime = (curIndex, len) => {
		const { autoPlay } = this.props;
		if (curIndex === len) {
			curIndex = 0;
		} else if (curIndex === -1) {
			curIndex = len - 1;
		}
		!!autoPlay && this.autoPlaySlide();
		this.getTargetLeft(curIndex);

	}
	getDotsActiveStyle(i) {
		let { curIndex } = this.state;

		if (i === curIndex) {
			return true;
		}
		return false;
	}

	renderDots = () => {
		const { dots, children } = this.props;
		return dots && (
			<ul className = "__dots">
				{ 
					children.map((Item, i) => {
						return (
							<li 
								key={i} 
								className={  this.getDotsActiveStyle(i) ? '__dots-active' : ''} 
								onClick={() => this.handleDotsClick(i)}
							></li>
						);
					})
				}
			</ul>
		);
	}

	renderContents() {
		const { width } = this.props;
		const { lefts } = this.state;
		return this.props.children.map((Item, index) => {
			return (
				<div 
					className="__content-child"  
					style={{ left: lefts[index] + 'px', width }} 
					key={index}
				>
					{Item}
				</div>
			);
		});
	}

	render() {
		const { contentStyle } = this.state;
		const { width, height } = this.props;
		return (
			<div className="rc-swiper" style={{ width, height }}>
				<div 
					className="__content" 
					style={{ ...contentStyle }}
					{...this.getTouchedEvent()} 
				>					
					{ this.renderContents() }					
				</div>
				{ this.renderDots() }
				<span className = "__arrow __arrow-left"  onClick={this.preSlide}>&#10094;</span>
				<span className = "__arrow __arrow-right"  onClick={this.nextSlide}>&#10095;</span>
			</div>
		);
	}
}
Swiper.propTypes = {
	/**
	 * mdoe 表明 使用 mobile端模式， 还是 pc端模式
	 * 
	 */
	mode: PropTypes.oneOf(['mobile', 'pc']),
	/**
	 * 轮播容器 的宽度
	 */
	width: PropTypes.number,
	height: PropTypes.number,
	/**
	 * 是否自动播放
	 */
	autoPlay: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.bool
	]),
	/**
	 * 是否显示小点点
	 */
	dots: PropTypes.bool
};
Swiper.defaultProps = {
	mode: 'pc',
	width: document.documentElement.clientWidth || document.body.clientWidth,
	height: 300,
	dots: true
};
export default Swiper;