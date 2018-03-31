/**
 * 是否是移动端
 */
export const hasTouch = 'ontouchstart' in window;
/**
 * 绑定事件
 */
export const addEvent = (el, type, fn, capture) => {
	el.addEventListener(type, fn, { passive: false, capture: !!capture });
};
/**
 * 移除事件
 */
export const removeEvent = (el, type, fn, capture) => {
	el.removeEventListener(type, fn, { passive: false, capture: !!capture });
};
// - start 处理样式前缀 
let elementStyle = document.createElement('div').style;
let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	};

	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key;
		}
	}

	return false;
})();
const prefixStyle = (style) => {
	if (vendor === false) {
		return false;
	}

	if (vendor === 'standard') {
		return style;
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};
// 是否启用硬件加速
export const hasPerspective = prefixStyle('perspective') in elementStyle;
// 是否使用CSS3的Transform属性
export const hasTransform = prefixStyle('transform') in elementStyle;
// 是否使用CSS3的Transition属性，否则使用requestAnimationFram代替
export const hasTransition = prefixStyle('transition') in elementStyle; 

export const style = {
	transform: prefixStyle('transform'),
	transitionTimingFunction: prefixStyle('transitionTimingFunction'),
	transitionDuration: prefixStyle('transitionDuration'),
	transitionDelay: prefixStyle('transitionDelay'),
	transformOrigin: prefixStyle('transformOrigin'),
	transitionEnd: prefixStyle('transitionEnd')
};
// - end 处理样式前缀 

/**
 * 获取元素在容器内的位置
 */
export const getRect = (el) => {
	if (el instanceof window.SVGElement) {
		let rect = el.getBoundingClientRect();
		return {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height
		};
	} else {
		return {
			top: el.offsetTop,
			left: el.offsetLeft,
			width: el.offsetWidth,
			height: el.offsetHeight
		};
	}
};
/**
 * 计算元素所在位置偏移值 负值
 */
export const offset = (el) => {
	let left = 0;
	let top = 0;

	while (el) {
		left -= el.offsetLeft;
		top -= el.offsetTop;
		el = el.offsetParent;
	}

	return {
		left,
		top
	};
};

/**
 * 去除默认事件判断，在exceptions内不去除
 */
export const preventDefaultException = (el, exceptions) => {
	for (let i in exceptions) {
		if (exceptions[i].test(el[i])) {
			return true;
		}
	}
	return false;
};

export const ease = {
	// easeOutQuint
	swipe: {
		style: 'cubic-bezier(0.23, 1, 0.32, 1)',
		fn: function (t) {
			return 1 + (--t * t * t * t * t);
		}
	},
	// easeOutQuard
	swipeBounce: {
		style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		fn: function (t) {
			return t * (2 - t);
		}
	},
	// easeOutQuart
	bounce: {
		style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
		fn: function (t) {
			return 1 - (--t * t * t * t);
		}
	}
};

/**
 * 常量判断事件类型 
 */
export const TOUCH_EVENT = 1;
export const MOUSE_EVENT = 2;
export const eventType = {
	touchstart: TOUCH_EVENT,
	touchmove: TOUCH_EVENT,
	touchend: TOUCH_EVENT,

	mousedown: MOUSE_EVENT,
	mousemove: MOUSE_EVENT,
	mouseup: MOUSE_EVENT
};

export const getNow = () => {
	// navigationStart 可以理解为第一次打开网址的时间
	// performance.now()可以理解为打开网页后到现在的时间，以微秒（百万分之一秒）为单位的时间
	return window.performance && window.performance.now 
		? (window.performance.now() + window.performance.timing.navigationStart) 
		: +new Date();
};

export const tap = (e, eventName) => {
	let ev = document.createEvent('Event');
	ev.initEvent(eventName, true, true);
	ev.pageX = e.pageX;
	ev.pageY = e.pageY;
	e.target.dispatchEvent(ev);
};

export const click = (e) => {
	let target = e.target;

	if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
		let ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
		// cancelable 设置为 false 是为了解决和 fastclick 冲突问题
		ev.initEvent('click', true, false);
		ev._constructed = true;
		target.dispatchEvent(ev);
	}
};


export const momentum = (current, start, time, lowerMargin, wrapperSize, options) => {
	let distance = current - start;
	let speed = Math.abs(distance) / time;

	let { deceleration, itemHeight, swipeBounceTime, wheel, swipeTime } = options;
	let duration = swipeTime;
	let rate = wheel ? 4 : 15;

	let destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

	if (wheel && itemHeight) {
		destination = Math.round(destination / itemHeight) * itemHeight;
	}

	if (destination < lowerMargin) {
		destination = wrapperSize ? lowerMargin - (wrapperSize / rate * speed) : lowerMargin;
		duration = swipeBounceTime;
	} else if (destination > 0) {
		destination = wrapperSize ? wrapperSize / rate * speed : 0;
		duration = swipeBounceTime;
	}

	return {
		destination: Math.round(destination),
		duration
	};
};


const DEFAULT_INTERVAL = 100 / 60;

export const requestAnimationFrame = (() => {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		// if all else fails, use setTimeout
		function (callback) {
			return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2);// make interval as precise as possible.
		};
})();

export const cancelAnimationFrame = (() => {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function (id) {
			window.clearTimeout(id);
		};
})();


export const createScrollbar = (direction) => {
	let scrollbar = document.createElement('div');
	let indicator = document.createElement('div');

	scrollbar.style.cssText = 'position:absolute;z-index:9999;pointerEvents:none';
	indicator.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';

	indicator.className = 'bscroll-indicator';

	if (direction === 'horizontal') {
		scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
		indicator.style.height = '100%';
		scrollbar.className = 'bscroll-horizontal-scrollbar';
	} else {
		scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
		indicator.style.width = '100%';
		scrollbar.className = 'bscroll-vertical-scrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';
	scrollbar.appendChild(indicator);

	return scrollbar;
};
