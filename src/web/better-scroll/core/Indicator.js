import { style } from './utils.js';
const INDICATOR_MIN_LEN = 10; // 滚动条最小的长度
class Indicator {
	constructor(scroller, opts = {}) {
		this.wrapper = opts.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;
		this.direction = opts.direction;
		if (opts.fade) {
			this.visible = 0;
			this.wrapperStyle.opacity = '0';
		} else {
			this.visible = 1;
		}
	}
	/**
	 * @public
	 */
	refresh() {
		this.transitionTime();
		this.calculate();
		this.updatePosition();
	}
	/**
	 * @public
	 */
	fade(visible, hold) {
		if (hold && !this.visible) {
			return;
		}
	
		let time = visible ? 250 : 500;
	
		visible = visible ? '1' : '0';
	
		this.wrapperStyle[style.transitionDuration] = time + 'ms';
	
		clearTimeout(this.fadeTimeout);
		this.fadeTimeout = setTimeout(() => {
			this.wrapperStyle.opacity = visible;
			this.visible = +visible;
		}, 0);
	}
	/**
	 * @public
	 */
	updatePosition() {
		if (this.direction === 'vertical') {
			let y = Math.round(this.sizeRatioY * this.scroller.y);
	
			if (y < 0) {
				this.transitionTime(500);
				const height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN);
				this.indicatorStyle.height = `${height}px`;
				y = 0;
			} else if (y > this.maxPosY) {
				this.transitionTime(500);
				const height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, INDICATOR_MIN_LEN);
				this.indicatorStyle.height = `${height}px`;
				y = this.maxPosY + this.indicatorHeight - height;
			} else {
				this.indicatorStyle.height = `${this.indicatorHeight}px`;
			}
			this.y = y;
	
			if (this.scroller.options.useTransform) {
				this.indicatorStyle[style.transform] = `translateY(${y}px)${this.scroller.translateZ}`;
			} else {
				this.indicatorStyle.top = `${y}px`;
			}
		} else {
			let x = Math.round(this.sizeRatioX * this.scroller.x);
	
			if (x < 0) {
				this.transitionTime(500);
				const width = Math.max(this.indicatorWidth + x * 3, INDICATOR_MIN_LEN);
				this.indicatorStyle.width = `${width}px`;
				x = 0;
			} else if (x > this.maxPosX) {
				this.transitionTime(500);
				const width = Math.max(this.indicatorWidth - (x - this.maxPosX) * 3, INDICATOR_MIN_LEN);
				this.indicatorStyle.width = `${width}px`;
				x = this.maxPosX + this.indicatorWidth - width;
			} else {
				this.indicatorStyle.width = `${this.indicatorWidth}px`;
			}
	
			this.x = x;
	
			if (this.scroller.options.useTransform) {
				this.indicatorStyle[style.transform] = `translateX(${x}px)${this.scroller.translateZ}`;
			} else {
				this.indicatorStyle.left = `${x}px`;
			}
		}
	}
	/**
	 * @public
	 */
	transitionTime(time = 0) {
		this.indicatorStyle[style.transitionDuration] = time + 'ms';
	}
	/**
	 * 
	 * @public
	 */
	transitionTimingFunction(easing) {
		this.indicatorStyle[style.transitionTimingFunction] = easing;
	}
	/**
	 * @public
	 */
	remove() {
		this.wrapper.parentNode.removeChild(this.wrapper);
	}
	/**
	 * @private
	 */
	calculate() {
		if (this.direction === 'vertical') {
			let wrapperHeight = this.wrapper.clientHeight;
			this.indicatorHeight = Math.max(Math.round(wrapperHeight * wrapperHeight / (this.scroller.scrollerHeight || wrapperHeight || 1)), INDICATOR_MIN_LEN);
			this.indicatorStyle.height = `${this.indicatorHeight}px`;
	
			this.maxPosY = wrapperHeight - this.indicatorHeight;
	
			this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;
		} else {
			let wrapperWidth = this.wrapper.clientWidth;
			this.indicatorWidth = Math.max(Math.round(wrapperWidth * wrapperWidth / (this.scroller.scrollerWidth || wrapperWidth || 1)), INDICATOR_MIN_LEN);
			this.indicatorStyle.width = `${this.indicatorWidth}px`;
	
			this.maxPosX = wrapperWidth - this.indicatorWidth;
	
			this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;
		}
	}
	
}
export default Indicator;