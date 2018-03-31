import {
	addEvent,
	removeEvent,
	hasTouch,
	hasPerspective,
	hasTransition,
	hasTransform,
	getRect,
	offset,
	style,
	preventDefaultException,
	eventType,
	TOUCH_EVENT,
	ease,
	createScrollbar,
	tap,
	click,
	momentum,
	requestAnimationFrame, 
	cancelAnimationFrame,
	getNow
} from './utils.js';
import Indicator from './Indicator.js';
const DEFAULT_OPTIONS = {
	// 默认位置
	startX: 0,
	startY: 0,
	scrollX: false,
	scrollY: true,
	/**
	 * 主要在上下左右滚动都生效时使用，可以向任意方向滚动。
	 */
	freeScroll: false,
	directionLockThreshold: 5,
	/**
	 * 如：使用横轴滚动时，如想使用系统立轴滚动并在横轴上生效，请开启
	 */
	eventPassthrough: '', // horizontal | vertical | ''
	/**
	 * 是否启用click事件。建议关闭此选项并启用自定义的tap事件（options.tap）
	 */
	click: false,
	tap: false,
	/**
	 * 是否启用弹力动画效果，关掉可以加速
	 */
	bounce: true,
	/**
	 * 弹力动画持续的毫秒数	
	 */
	bounceTime: 700,
	/**
	 * 是否开启动量动画，关闭可以提升效率。
	 */
	momentum: true,
	/**
	 * 两次差值时间小于该值
	 */
	momentumLimitTime: 300,
	/**
	 * 移动超过规定像素启用滚动
	 */
	momentumLimitDistance: 15,
	swipeTime: 2500,
	swipeBounceTime: 500,
	/**
	 * 滚动动量减速越大越快，建议不大于0.01
	 */
	deceleration: 0.001,
	flickLimitTime: 200,
	flickLimitDistance: 100,
	resizePolling: 60,
	/**
	 * probeType：0  ？
	 * probeType：1  滚动不繁忙的时候触发
	 * probeType：2  滚动时每隔一定时间触发
	 * probeType：3  每滚动一像素触发一次
	 */
	probeType: 0,
	/**
	 * 是否屏蔽默认事件
	 */
	preventDefault: true,
	preventDefaultException: {
		tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
	},
	/**
	 * 是否启用硬件加速	
	 */
	HWCompositing: true,
	/**
	 * 是否使用CSS3的Transition属性，否则使用requestAnimationFram代替
	 */
	useTransition: true,
	/**
	 * 是否使用CSS3的Transform属性
	 */
	useTransform: true,
	/**
	 * 光标、触摸超出容器时，是否停止滚动
	 */
	bindToWrapper: false,
	/**
	 * 是否关闭鼠标事件探测。如知道运行在哪个平台，可以开启它来加速
	 */
	disableMouse: hasTouch,
	/**
	 * 是否关闭触摸事件探测。如知道运行在哪个平台，可以开启它来加速
	 */
	disableTouch: !hasTouch,
	/**
	 * for picker
	 * wheel: {
	 *   selectedIndex: 0,
	 *   rotate: 25,
	 *   adjustTime: 400
	 * }
	 */
	wheel: false,
	/**
	 * for slide
	 * snap: {
	 *   loop: false,
	 *   el: domEl,
	 *   threshold: 0.1,
	 *   stepX: 100,
	 *   stepY: 100,
	 *   listenFlick: true
	 * }
	 */
	snap: false,
	/**
	 * for scrollbar
	 * scrollbar: {
	 *   fade: true
	 * }
	 */
	scrollbar: false,
	/**
	 * for pull down and refresh
	 * pullDownRefresh: {
	 *   threshold: 50,
	 *   stop: 20
	 * }
	 */
	pullDownRefresh: false,
	/**
	 * for pull up and load
	 * pullUpLoad: {
	 *   threshold: 50
	 * }
	 */
	pullUpLoad: false
};
class Core {
	constructor(el, opts = {}) {
		// 容器
		this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
		// 操作区域节点
		this.scroller = this.wrapper.children[0];
		// 操作区域默认样式 CSSStyleDeclaration
		this.scrollerStyle = this.scroller.style;
		// 设置默认属性
		this.setOptions(opts);
		
		// 自定义事件
		this.events = {};
		// 当前位置
		this.x = 0;
		this.y = 0;
		// 上一次的滚动方向(-1 下/右, 0 保持原状, 1 上/左)
		this.directionX = 0;
		this.directionY = 0;
		// 添加事件
		this.addDOMEvents();

		// 扩展
		this.initExtFeatures();
		
		// 刷新scroll
		this.refresh();
		
		if (!this.options.snap) {
			this.scrollTo(this.options.startX, this.options.startY);
		}
		// 启用
		this.enable();
	}
	// - start init prototype 
	enable () {
		this.enabled = true;
	}
	disable () {
		this.enabled = false;
	}
	/**
	 * @private
	 * 设置属性值
	 */
	setOptions(opts) {
		this.options = Object.assign({}, DEFAULT_OPTIONS, opts);
		// 是否启用硬件加速
		this.translateZ = this.options.HWCompositing && hasPerspective ? ' translateZ(0)' : '';
		// 是否使用CSS3的Transition属性，否则使用requestAnimationFram代替
		this.options.useTransition = this.options.useTransition && hasTransition;
		// 是否使用CSS3的Transform属性
		this.options.useTransform = this.options.useTransform && hasTransform;

		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

		// 使用横轴滚动时，如想使用系统立轴滚动并在横轴上生效，请开启。
		this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;
		this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;

		// 主要在上下左右滚动都生效时使用，可以向任意方向滚动。
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

		if (this.options.tap === true) {
			this.options.tap = 'tap';
		}
	}
	/**
	 * @private
	 * 添加事件
	 */
	addDOMEvents() {
		this.operateDOMEvents(addEvent);
	}
	/**
	 * @private
	 * 移除事件
	 */
	removeDOMEvents() {
		this.operateDOMEvents(removeEvent);
	}
	/**
	 * @private
	 * 事件操作
	 */
	operateDOMEvents(eventOperation) {
		let target = this.options.bindToWrapper ? this.wrapper : window;
		eventOperation(window, 'orientationchange', this);
		eventOperation(window, 'resize', this);

		if (this.options.click) {
			eventOperation(this.wrapper, 'click', this, true);
		}

		if (!this.options.disableMouse) {
			eventOperation(this.wrapper, 'mousedown', this);
			eventOperation(target, 'mousemove', this);
			eventOperation(target, 'mousecancel', this);
			eventOperation(target, 'mouseup', this);
		}

		if (hasTouch && !this.options.disableTouch) {
			eventOperation(this.wrapper, 'touchstart', this);
			eventOperation(target, 'touchmove', this);
			eventOperation(target, 'touchcancel', this);
			eventOperation(target, 'touchend', this);
		}

		eventOperation(this.scroller, style.transitionEnd, this);
	}
	handleEvent(e) {
		switch (e.type) {
			case 'touchstart':
			case 'mousedown':
				this.start(e);
				break;
			case 'touchmove':
			case 'mousemove':
				this.move(e);
				break;
			case 'touchend':
			case 'mouseup':
			case 'touchcancel':
			case 'mousecancel':
				this.end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this.resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this.transitionEnd(e);
				break;
			case 'click':
				if (this.enabled && !e._constructed) {
					if (!preventDefaultException(e.target, this.options.preventDefaultException)) {
						e.preventDefault();
					}
					e.stopPropagation();
				}
				break;
		}
	}
	/**
	 * @private
	 */
	initExtFeatures() {
		if (this.options.snap) {
			this.initSnap();
		}
		if (this.options.scrollbar) {
			this.initScrollbar();
		}
		if (this.options.pullUpLoad) {
			this.initPullUp();
		}
		if (this.options.pullDownRefresh) {
			this.initPullDown();
		}  
	}
	/**
	 * @public
	 * 刷新scroll
	 */
	refresh() {
		// 容器宽高
		let wrapperRect = getRect(this.wrapper);
		this.wrapperWidth = wrapperRect.width;
		this.wrapperHeight = wrapperRect.height;
		// 容器内 内容宽高
		let scrollerRect = getRect(this.scroller);
		this.scrollerWidth = scrollerRect.width;
		this.scrollerHeight = scrollerRect.height;
		 
		const wheel = this.options.wheel;
		if (wheel) {
			this.items = this.scroller.children;
			this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0;
			if (this.selectedIndex === undefined) {
				this.selectedIndex = wheel.selectedIndex;
			}
			this.options.startY = -this.selectedIndex * this.itemHeight;
			this.maxScrollX = 0;
			this.maxScrollY = -this.itemHeight * (this.items.length - 1);
		} else {
			// 极限距离，相当于scrollLeft/scrollTop最大值 负值
			this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
		}
		// 是否有横向滚动条
		this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
		// 是否有立向滚动条
		this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

		if (!this.hasHorizontalScroll) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if (!this.hasVerticalScroll) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;
		// 计算容器所在位置偏移值{left: Number?, top: Number?}负值
		this.wrapperOffset = offset(this.wrapper);

		this.trigger('refresh');

		this.resetPosition();
	}
	// - end init prototype 

	// - start event prototype 
	on(type, fn, context = this) {
		if (!this.events[type]) {
			this.events[type] = [];
		}

		this.events[type].push([fn, context]);
	}
	once(type, fn, context = this) {
		let fired = false;

		const magic = () => {
			this.off(type, magic);

			if (!fired) {
				fired = true;
				fn.apply(context, arguments);
			}
		};
		// 将参数中的回调函数挂载在magic对象的fn属性上,为了执行off方法的时候，暴露对应的函数方法
		magic.fn = fn;

		this.on(type, magic);
	}
	off(type, fn) {
		let events = this.events[type];
		if (!events) {
			return;
		}

		let count = events.length;
		while (count--) {
			// 移除通过on或者once绑定的回调函数
			if (events[count][0] === fn || (events[count][0] && events[count][0].fn === fn)) {
				events[count][0] = undefined;
			}
		}
	}
	trigger(type) {
		let events = this.events[type];
		if (!events) {
			return;
		}

		let len = events.length;
		let eventsCopy = [...events];
		for (let i = 0; i < len; i++) {
			let event = eventsCopy[i];
			let [fn, context] = event;
			if (fn) {
				fn.apply(context, [].slice.call(arguments, 1));
			}
		}
	}
	// - end event prototype 
	// - start core prototype
	/**
	 * @private
	 */
	start(e) {
		let __eventType = eventType[e.type];
		// 是否是触摸事件
		if (__eventType !== TOUCH_EVENT) { // PC事件
			if (e.button !== 0) { // 0 左键，1 滚轮按下，2 右键
				return;
			}
		}
		if (!this.enabled || this.destroyed || (this.initiated && this.initiated !== __eventType)) {
			// 未启用，已销毁，事件类型改变
			return;
		}
		this.initiated = __eventType;

		if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
			// 去除默认事件
			e.preventDefault();
		}
		// init
		this.moved = false;
		this.distX = 0;
		this.distY = 0;
		this.directionX = 0;
		this.directionY = 0;
		this.movingDirectionX = 0;
		this.movingDirectionY = 0;
		this.directionLocked = 0;
		// 过渡时间： 0
		this.transitionTime();
		// 开始时间
		this.startTime = getNow();

		if (this.options.wheel) {
			this.target = e.target;
		}

		this.stop();
		// 单个手指
		let point = e.touches ? e.touches[0] : e;
		// 开始的位置， this.x 当前位置
		this.startX = this.x;
		this.startY = this.y; 
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX = point.pageX;
		this.pointY = point.pageY;
		// 用户点击屏幕，但是还未初始化滚动前
		this.trigger('beforeScrollStart');
	}
	/**
	 * @private
	 */
	move(e) {
		if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
			// 未启用，已销毁，事件类型改变
			return;
		}

		if (this.options.preventDefault) {
			// 去除默认事件， 可阻止滚动
			e.preventDefault();
		}
		// 单个手指
		let point = e.touches ? e.touches[0] : e;
		// 距离上一次move相对移动位置
		let deltaX = point.pageX - this.pointX;
		let deltaY = point.pageY - this.pointY;
		this.pointX = point.pageX;
		this.pointY = point.pageY;
		// 从start开始move后的位置
		this.distX += deltaX;
		this.distY += deltaY;

		let absDistX = Math.abs(this.distX);
		let absDistY = Math.abs(this.distY);

		let timestamp = getNow();

	
		if (timestamp - this.endTime > this.options.momentumLimitTime && 
			(absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance)) {
			// 时间差大于规定值（move过程this.endTime = 0），移动超过规定像素启用滚动
			return;
		}

		// 如果不是自由滚动，将滚动锁定在一个方向上
		if (!this.directionLocked && !this.options.freeScroll) {
			if (absDistX > absDistY + this.options.directionLockThreshold) {
				this.directionLocked = 'h';    // lock horizontally
			} else if (absDistY >= absDistX + this.options.directionLockThreshold) {
				this.directionLocked = 'v';    // lock vertically
			} else {
				this.directionLocked = 'n';   // no lock
			}
		}

		if (this.directionLocked === 'h') { // 横轴滚动
			if (this.options.eventPassthrough === 'vertical') {
				e.preventDefault();
			} else if (this.options.eventPassthrough === 'horizontal') {
				this.initiated = false;
				return;
			}
			deltaY = 0;
		} else if (this.directionLocked === 'v') { // 立轴滚动
			if (this.options.eventPassthrough === 'horizontal') {
				e.preventDefault();
			} else if (this.options.eventPassthrough === 'vertical') {
				this.initiated = false;
				return;
			}
			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;
		this.movingDirectionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.movingDirectionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
		// 新的坐标位置
		let newX = this.x + deltaX;
		let newY = this.y + deltaY;

		// 超出横轴临界值
		if (newX > 0 || newX < this.maxScrollX) {
			if (this.options.bounce) {
				newX = this.x + deltaX / 3;
			} else {
				newX = newX > 0 ? 0 : this.maxScrollX;
			}
		}
		// 超出立轴临界值
		if (newY > 0 || newY < this.maxScrollY) {
			if (this.options.bounce) {
				newY = this.y + deltaY / 3;
			} else {
				newY = newY > 0 ? 0 : this.maxScrollY;
			}
		}

		if (!this.moved) {
			this.moved = true;
			// 开始滚动
			this.trigger('scrollStart');
		}

		this.translate(newX, newY);

		if (timestamp - this.startTime > this.options.momentumLimitTime) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;

			if (this.options.probeType === 1) {
				this.trigger('scroll', {
					x: this.x,
					y: this.y
				});
			}
		}

		if (this.options.probeType > 1) {
			this.trigger('scroll', {
				x: this.x,
				y: this.y
			});
		}

		let scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
		let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

		let pX = this.pointX - scrollLeft;
		let pY = this.pointY - scrollTop;

		if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance ||
			 pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {
			this.end(e);
		}
	}
	/**
	 * @private
	 */
	end(e) {
		if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
			// 未启用，已销毁，事件类型改变
			return;
		}
		this.initiated = false;

		if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
			e.preventDefault();
		}

		this.trigger('touchEnd', {
			x: this.x,
			y: this.y
		});

		// 下拉刷新
		if (this.options.pullDownRefresh && this.checkPullDown()) {
			return;
		}

		// reset位置，如果出去边界位置
		if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
			return;
		}
		this.isInTransition = false;
		// 四舍五入
		let newX = Math.round(this.x);
		let newY = Math.round(this.y);

		// 滚动超过 15 px
		if (!this.moved) {
			if (this.options.wheel) {
				if (this.target && this.target.className === 'wheel-scroll') {
					let index = Math.abs(Math.round(newY / this.itemHeight));
					let _offset = Math.round((this.pointY + offset(this.target).top - this.itemHeight / 2) / this.itemHeight);
					this.target = this.items[index + _offset];
				}
				this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, true, true, ease.swipe);
			} else {
				if (this.options.tap) {
					tap(e, this.options.tap);
				}

				if (this.options.click) {
					click(e);
				}
			}
			// 初始化滚动后又取消
			this.trigger('scrollCancel');
			return;
		}

		this.scrollTo(newX, newY);

		let deltaX = newX - this.absStartX;
		let deltaY = newY - this.absStartY;
		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		this.endTime = getNow();

		let duration = this.endTime - this.startTime;
		let absDistX = Math.abs(newX - this.startX);
		let absDistY = Math.abs(newY - this.startY);

		// 轻击屏幕
		if (this.events.flick && 
			duration < this.options.flickLimitTime && 
			absDistX < this.options.flickLimitDistance && 
			absDistY < this.options.flickLimitDistance) {
			this.trigger('flick');
			return;
		}

		let time = 0;
		// 是否开启动量动画，关闭可以提升效率。
		if (this.options.momentum && 
			duration < this.options.momentumLimitTime && 
			(absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)
		) {
			let momentumX = this.hasHorizontalScroll 
				? momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options)
				: { destination: newX, duration: 0 };
			let momentumY = this.hasVerticalScroll 
				? momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options)
				: { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		} else {
			if (this.options.wheel) {
				newY = Math.round(newY / this.itemHeight) * this.itemHeight;
				time = this.options.wheel.adjustTime || 400;
			}
		}

		let easing = ease.swipe;
		if (this.options.snap) {
			let snap = this.nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
				Math.max(
					Math.min(Math.abs(newX - snap.x), 1000),
					Math.min(Math.abs(newY - snap.y), 1000)
				), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = ease.bounce;
		}

		if (newX !== this.x || newY !== this.y) {
			// change easing function when scroller goes out of the boundaries
			if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
				easing = ease.swipeBounce;
			}
			this.scrollTo(newX, newY, time, easing);
			return;
		}

		if (this.options.wheel) {
			this.selectedIndex = Math.abs(this.y / this.itemHeight) | 0;
		}
		// 滚动结束
		this.trigger('scrollEnd', {
			x: this.x,
			y: this.y
		});
	}
	/**
	 * @private
	 */
	resize() {
		if (!this.enabled) {
			return;
		}

		clearTimeout(this.resizeTimeout);
		this.resizeTimeout = setTimeout(() => {
			this.refresh();
		}, this.options.resizePolling);
	}
	/**
	 * @private
	 */
	startProbe() {
		cancelAnimationFrame(this.probeTimer);
		this.probeTimer = requestAnimationFrame(probe);
		const probe = () => {
			if (!this.isInTransition) {
				return;
			}
			let pos = this.getComputedPosition();
			this.trigger('scroll', pos);
			this.probeTimer = requestAnimationFrame(probe);
		};
	}
	/**
	 * @private
	 */
	transitionTime(time = 0) {
		this.scrollerStyle[style.transitionDuration] = time + 'ms';

		if (this.options.wheel) {
			for (let i = 0; i < this.items.length; i++) {
				this.items[i].style[style.transitionDuration] = time + 'ms';
			}
		}

		if (this.indicators) {
			for (let i = 0; i < this.indicators.length; i++) {
				this.indicators[i].transitionTime(time);
			}
		}
	}
	/**
	 * @private
	 */
	transitionTimingFunction(easing) {
		this.scrollerStyle[style.transitionTimingFunction] = easing;

		if (this.options.wheel) {
			for (let i = 0; i < this.items.length; i++) {
				this.items[i].style[style.transitionTimingFunction] = easing;
			}
		}

		if (this.indicators) {
			for (let i = 0; i < this.indicators.length; i++) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}
	}
	/**
	 * @private
	 */
	transitionEnd(e) {
		if (e.target !== this.scroller || !this.isInTransition) {
			return;
		}

		this.transitionTime();
		if (!this.pulling && !this.resetPosition(this.options.bounceTime, ease.bounce)) {
			this.isInTransition = false;
			this.trigger('scrollEnd', {
				x: this.x,
				y: this.y
			});
		}
	}
	/**
	 * @private
	 */
	translate(x, y) {
		if (this.options.useTransform) {
			this.scrollerStyle[style.transform] = `translate(${x}px,${y}px)${this.translateZ}`;
		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = `${x}px`;
			this.scrollerStyle.top = `${y}px`;
		}

		if (this.options.wheel) {
			const { rotate = 25 } = this.options.wheel;
			for (let i = 0; i < this.items.length; i++) {
				let deg = rotate * (y / this.itemHeight + i);
				this.items[i].style[style.transform] = `rotateX(${deg}deg)`;
			}
		}

		this.x = x;
		this.y = y;

		if (this.indicators) {
			for (let i = 0; i < this.indicators.length; i++) {
				this.indicators[i].updatePosition();
			}
		}
	}
	/**
	 * @private
	 */
	animate(destX, destY, duration, easingFn) {
		let me = this;
		let startX = this.x;
		let startY = this.y;
		let startTime = getNow();
		let destTime = startTime + duration;

		const step = () => {
			let now = getNow();

			if (now >= destTime) {
				this.isAnimating = false;
				this.translate(destX, destY);

				if (!this.pulling && !this.resetPosition(this.options.bounceTime)) {
					this.trigger('scrollEnd', {
						x: this.x,
						y: this.y
					});
				}
				return;
			}
			now = (now - startTime) / duration;
			let easing = easingFn(now);
			let newX = (destX - startX) * easing + startX;
			let newY = (destY - startY) * easing + startY;

			this.translate(newX, newY);

			if (this.isAnimating) {
				this.animateTimer = requestAnimationFrame(step);
			}

			if (this.options.probeType === 3) {
				this.trigger('scroll', {
					x: this.x,
					y: this.y
				});
			}
		};

		this.isAnimating = true;
		cancelAnimationFrame(this.animateTimer);
		step();
	}
	/**
	 * @public
	 * 滚动到相对于当前位置的某处其余同上
	 */
	scrollBy(x, y, time = 0, easing = ease.bounce) {
		x = this.x + x;
		y = this.y + y;

		this.scrollTo(x, y, time, easing);
	}
	/**
	 * @public
	 * 滚动到：x，y
	 */
	scrollTo(x, y, time = 0, easing = ease.bounce) {
		this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y);

		if (!time || this.options.useTransition) {
			this.transitionTimingFunction(easing.style);
			this.transitionTime(time);
			this.translate(x, y);

			if (time && this.options.probeType === 3) {
				this.startProbe();
			}

			if (this.options.wheel) {
				if (y > 0) {
					this.selectedIndex = 0;
				} else if (y < this.maxScrollY) {
					this.selectedIndex = this.items.length - 1;
				} else {
					this.selectedIndex = Math.abs(y / this.itemHeight) | 0;
				}
			}
		} else {
			this.animate(x, y, time, easing.fn);
		}
	}
	/**
	 * @public
	 * 滚动到某个元素。el为必须的参数offsetX/offsetY：相对于el元素的位移。设为true即为屏幕中心
	 */
	scrollToElement(el, time, offsetX, offsetY, easing) {
		if (!el) {
			return;
		}
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if (this.options.wheel && el.className !== 'wheel-item') {
			return;
		}

		let pos = offset(el);
		pos.left -= this.wrapperOffset.left;
		pos.top -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if (offsetX === true) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if (offsetY === true) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top -= offsetY || 0;
		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

		if (this.options.wheel) {
			pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;
		}

		this.scrollTo(pos.left, pos.top, time, easing);
	}
	/**
	 * @public
	 * 重定位
	 */
	resetPosition(time = 0, easeing = ease.bounce) {
		let x = this.x;
		// 左右临界值判断
		if (!this.hasHorizontalScroll || x > 0) { // 无横向滚动条，或者左方超出，需回弹
			x = 0;
		} else if (x < this.maxScrollX) { // 右方超出，需回弹
			x = this.maxScrollX;
		}
		// 上下临界值判断
		let y = this.y;
		if (!this.hasVerticalScroll || y > 0) { // 无立向滚动条，或者上方超出，需回弹
			y = 0;
		} else if (y < this.maxScrollY) { // 下方超出，需回弹
			y = this.maxScrollY;
		}
		// 是否处于滚动区域
		if (x === this.x && y === this.y) { // 处于滚动区域，不做处理
			return false;
		}
		// 滚动到指定地方
		this.scrollTo(x, y, time, easeing);

		return true;
	}
	/**
	 * @public
	 */
	getComputedPosition() {
		let matrix = window.getComputedStyle(this.scroller, null);
		let x;
		let y;

		if (this.options.useTransform) {
			matrix = matrix[style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return {
			x,
			y
		};
	}
	/**
	 * @public
	 */
	stop() {
		if (this.options.useTransition && this.isInTransition) {
			this.isInTransition = false;
			let pos = this.getComputedPosition();
			this.translate(pos.x, pos.y);
			if (this.options.wheel) {
				this.target = this.items[Math.round(-pos.y / this.itemHeight)];
			} else {
				this.trigger('scrollEnd', {
					x: this.x,
					y: this.y
				});
			}
		} else if (!this.options.useTransition && this.isAnimating) {
			this.isAnimating = false;
			this.trigger('scrollEnd', {
				x: this.x,
				y: this.y
			});
		}
	}
	/**
	 * @public
	 * 销毁资源
	 */
	destroy() {
		this.removeDOMEvents();
		// remove custom events
		this.events = {};

		if (this.options.scrollbar) {
			this.removeScrollBars();
		}

		this.destroyed = true;
		this.trigger('destroy');
	}
	// - end core prototype
	// - start snap prototype
	/**
	 * @private
	 */
	initSnap(){
		this.currentPage = {};
		const snap = this.options.snap;

		if (snap.loop) {
			let children = this.scroller.children;
			if (children.length > 0) {
				prepend(children[children.length - 1].cloneNode(true), this.scroller);
				this.scroller.appendChild(children[1].cloneNode(true));
			}
		}

		let el = snap.el;
		if (typeof el === 'string') {
			el = this.scroller.querySelectorAll(el);
		}

		this.on('refresh', () => {
			this.pages = [];

			if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
				return;
			}

			let stepX = snap.stepX || this.wrapperWidth;
			let stepY = snap.stepY || this.wrapperHeight;

			let x = 0;
			let y;
			let cx;
			let cy;
			let i = 0;
			let l;
			let m = 0;
			let n;
			let rect;
			if (!el) {
				cx = Math.round(stepX / 2);
				cy = Math.round(stepY / 2);

				while (x > -this.scrollerWidth) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while (y > -this.scrollerHeight) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				l = el.length;
				n = -1;

				for (; i < l; i++) {
					rect = getRect(el[i]);
					if (i === 0 || rect.left <= getRect(el[i - 1]).left) {
						m = 0;
						n++;
					}

					if (!this.pages[m]) {
						this.pages[m] = [];
					}

					x = Math.max(-rect.left, this.maxScrollX);
					y = Math.max(-rect.top, this.maxScrollY);
					cx = x - Math.round(rect.width / 2);
					cy = y - Math.round(rect.height / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: rect.width,
						height: rect.height,
						cx: cx,
						cy: cy
					};

					if (x > this.maxScrollX) {
						m++;
					}
				}
			}

			let initPage = snap.loop ? 1 : 0;
			this.goToPage(this.currentPage.pageX || initPage, this.currentPage.pageY || 0, 0);

			const snapThreshold = snap.threshold;
			if (snapThreshold % 1 === 0) {
				this.snapThresholdX = snapThreshold;
				this.snapThresholdY = snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * snapThreshold);
			}
		});

		this.on('scrollEnd', () => {
			if (snap.loop) {
				if (this.currentPage.pageX === 0) {
					this.goToPage(this.pages.length - 2, this.currentPage.pageY, 0);
				}
				if (this.currentPage.pageX === this.pages.length - 1) {
					this.goToPage(1, this.currentPage.pageY, 0);
				}
			}
		});

		if (snap.listenFlick !== false) {
			this.on('flick', () => {
				let time = snap.speed || Math.max(
					Math.max(
						Math.min(Math.abs(this.x - this.startX), 1000),
						Math.min(Math.abs(this.y - this.startY), 1000)
					), 300);

				this.goToPage(
					this.currentPage.pageX + this.directionX,
					this.currentPage.pageY + this.directionY,
					time
				);
			});
		}
	}
	/**
	 * @private
	 */
	nearestSnap(x, y) {
		if (!this.pages.length) {
			return { x: 0, y: 0, pageX: 0, pageY: 0 };
		}

		let i = 0;
		
		if (Math.abs(x - this.absStartX) <= this.snapThresholdX &&
			Math.abs(y - this.absStartY) <= this.snapThresholdY) {
			return this.currentPage;
		}

		if (x > 0) {
			x = 0;
		} else if (x < this.maxScrollX) {
			x = this.maxScrollX;
		}

		if (y > 0) {
			y = 0;
		} else if (y < this.maxScrollY) {
			y = this.maxScrollY;
		}

		let l = this.pages.length;
		for (; i < l; i++) {
			if (x >= this.pages[i][0].cx) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		let m = 0;
		for (; m < l; m++) {
			if (y >= this.pages[0][m].cy) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if (i === this.currentPage.pageX) {
			i += this.directionX;

			if (i < 0) {
				i = 0;
			} else if (i >= this.pages.length) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if (m === this.currentPage.pageY) {
			m += this.directionY;

			if (m < 0) {
				m = 0;
			} else if (m >= this.pages[0].length) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x,
			y,
			pageX: i,
			pageY: m
		};
	}
	/**
	 * @public
	 */
	goToPage(x, y, time, easing = ease.bounce) {
		const snap = this.options.snap;
		if (x >= this.pages.length) {
			x = this.pages.length - 1;
		} else if (x < 0) {
			x = 0;
		}

		if (y >= this.pages[x].length) {
			y = this.pages[x].length - 1;
		} else if (y < 0) {
			y = 0;
		}

		let posX = this.pages[x][y].x;
		let posY = this.pages[x][y].y;

		time = time === undefined ? snap.speed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};
		this.scrollTo(posX, posY, time, easing);
	}
	/**
	 * @public
	 */
	next(time, easing) {
		let x = this.currentPage.pageX;
		let y = this.currentPage.pageY;

		x++;
		if (x >= this.pages.length && this.hasVerticalScroll) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	}
	/**
	 * @public
	 */
	prev(time, easing) {
		let x = this.currentPage.pageX;
		let y = this.currentPage.pageY;

		x--;
		if (x < 0 && this.hasVerticalScroll) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	}
	/**
	 * @public
	 */
	getCurrentPage() {
		return this.options.snap && this.currentPage;
	}
	// - end snap prototype
	// - start scrollBar prototype
	/**
	 * @private
	 */
	initScrollbar(){
		const { fade = true } = this.options.scrollbar;
		this.indicators = [];
		let indicator;

		if (this.options.scrollX) {
			indicator = {
				el: createScrollbar('horizontal'),
				direction: 'horizontal',
				fade
			};
			this.insertScrollBar(indicator.el);

			this.indicators.push(new Indicator(this, indicator));
		}

		if (this.options.scrollY) {
			indicator = {
				el: createScrollbar('vertical'),
				direction: 'vertical',
				fade
			};
			this.insertScrollBar(indicator.el);
			this.indicators.push(new Indicator(this, indicator));
		}

		this.on('refresh', () => {
			for (let i = 0; i < this.indicators.length; i++) {
				this.indicators[i].refresh();
			}
		});

		if (fade) {
			this.on('scrollEnd', () => {
				for (let i = 0; i < this.indicators.length; i++) {
					this.indicators[i].fade();
				}
			});

			this.on('scrollCancel', () => {
				for (let i = 0; i < this.indicators.length; i++) {
					this.indicators[i].fade();
				}
			});

			this.on('scrollStart', () => {
				for (let i = 0; i < this.indicators.length; i++) {
					this.indicators[i].fade(true);
				}
			});

			this.on('beforeScrollStart', () => {
				for (let i = 0; i < this.indicators.length; i++) {
					this.indicators[i].fade(true, true);
				}
			});
		}
	}
	/**
	 * @private
	 */
	insertScrollBar(scrollbar) {
		this.wrapper.appendChild(scrollbar);
	}
	/**
	 * @private
	 */
	removeScrollBars() {
		for (let i = 0; i < this.indicators.length; i++) {
			let indicator = this.indicators[i];
			indicator.remove();
		}
	}
	// - end scrollBar prototype
	// - start pullUp prototype
	/**
	 * @private
	 */
	initPullUp(){
		this.options.probeType = 3;
		
		this.pullupWatching = false;
		this.watchPullUp();
	}
	/**
	 * @private
	 */
	watchPullUp() {
		if (this.pullupWatching) {
			return;
		}
		this.pullupWatching = true;
		const { threshold = 0 } = this.options.pullUpLoad;
		const checkToEnd = (pos) => {
			if (this.movingDirectionY === 1 && pos.y <= (this.maxScrollY + threshold)) {
				this.trigger('pullingUp');
				this.pullupWatching = false;
				this.off('scroll', checkToEnd);
			}
		};

		this.on('scroll', checkToEnd);
	}
	/**
	 * @public
	 */
	finishPullUp() {
		if (this.isInTransition) {
			this.once('scrollEnd', () => {
				this.watchPullUp();
			});
		} else {
			this.watchPullUp();
		}
	}
	// - end pullUp prototype
	// - start pullDown prototype
	/**
	 * @private
	 */
	initPullDown(){
		this.options.probeType = 3;
	}
	/**
	 * @private
	 */
	checkPullDown() {
		const { threshold = 90, stop = 40 } = this.options.pullDownRefresh;
		if (this.y > threshold && !this.pulling) {
			this.pulling = true;
			this.trigger('pullingDown');
			this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);
		}

		return this.pulling;
	}
	/**
	 * @public
	 */
	finishPullDown() {
		this.pulling = false;
		this.resetPosition(this.options.bounceTime, ease.bounce);
	}
	// - end pullDown prototype
	// - start wheel prototype
	/**
	 * @public
	 */
	wheelTo(index) {
		if (this.options.wheel) {
			this.y = -index * this.itemHeight;
			this.scrollTo(0, this.y);
		}
	}
	/**
	 * @public
	 */
	getSelectedIndex() {
		return this.options.wheel && this.selectedIndex;
	}
	// - end wheel prototype
}

export default Core;