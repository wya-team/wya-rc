import {
	hasTouch,
} from './utils.js';
export const DEFAULT_OPTIONS = {
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
	scrollbar: true,
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
