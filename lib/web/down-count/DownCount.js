'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownCount = function (_Component) {
	(0, _inherits3.default)(DownCount, _Component);

	function DownCount(props) {
		(0, _classCallCheck3.default)(this, DownCount);

		var _this = (0, _possibleConstructorReturn3.default)(this, (DownCount.__proto__ || Object.getPrototypeOf(DownCount)).call(this, props));

		_this.state = {
			show: true,
			downCount: ""
		};
		_this.runStart = _this.runStart.bind(_this);
		_this.runEnd = _this.runEnd.bind(_this);
		_this.getCurDate = _this.getCurDate.bind(_this);
		/**
   * 控制onEnd只执行一次
   */
		_this.isEnd = 0;
		return _this;
	}

	(0, _createClass3.default)(DownCount, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _props = this.props,
			    targetTime = _props.targetTime,
			    serverTime = _props.serverTime;

			if (!targetTime) {
				this.props.onTip('请设定时间'); // 可替换
				this.setState({
					show: false
				});
				return false;
			}
			// 抛异常
			if (!Date.parse(targetTime.replace(/-/g, "/"))) {
				this.props.onTip('注意日期格式为 1992-09-21 12:00:00.'); // 可替换
				this.setState({
					show: false
				});
				return false;
			}
			/**
    * 先运行一次
    */
			this.serverOffset = serverTime ? Date.parse(serverTime.replace(/-/g, "/")) - new Date().getTime() : 0;
			this.runStart();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var T = this.props.T;

			if (!this.isEnd) {
				this.interval = setInterval(this.runStart, T);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// 不做任何操作，避免影响
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (this.props.targetTime != prevProps.targetTime) {
				this.interval && clearInterval(this.interval);
				this.interval = setInterval(this.runStart, this.props.T);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			/**
    * 只清除定时器
    */
			this.runEnd(1);
		}
	}, {
		key: 'runEnd',
		value: function runEnd(unMount) {
			this.interval && clearInterval(this.interval);
			/**
    * 定时消除
    */
			if (this.isEnd && !unMount) {
				this.props.onEnd && this.props.onEnd();
			}
		}
	}, {
		key: 'getCurDate',
		value: function getCurDate() {
			var dateN = new Date();
			var newDate = new Date(dateN.getTime() + Number(this.serverOffset || 0));
			return newDate;
		}
	}, {
		key: 'runStart',
		value: function runStart() {
			var _this2 = this;

			var _props2 = this.props,
			    targetTime = _props2.targetTime,
			    T = _props2.T,
			    textBefore = _props2.textBefore,
			    textAfter = _props2.textAfter,
			    format = _props2.format,
			    onChange = _props2.onChange;


			var setDate = targetTime.replace(/-/g, "/");
			var currentDate = this.getCurDate();
			var targetDate = new Date(setDate);
			var difference = targetDate - currentDate;

			var _second = 1000;
			var _minute = _second * 60;
			var _hour = _minute * 60;
			var _day = _hour * 24;

			var days = Math.floor(difference / _day);
			var hours = Math.floor(difference % _day / _hour);
			var minutes = Math.floor(difference % _hour / _minute);
			var seconds = Math.floor(difference % _minute / _second);
			var mseconds = Math.floor(difference / 10 % 100);

			var daysC = String(days).length >= 2 ? days : '0' + days;
			var hoursC = String(hours).length >= 2 ? hours : '0' + hours;
			var minutesC = String(minutes).length >= 2 ? minutes : '0' + minutes;
			var secondsC = String(seconds).length >= 2 ? seconds : '0' + seconds;
			var msecondsC = String(mseconds).length >= 2 ? mseconds : '0' + mseconds;

			var downCount = void 0;
			switch (format) {
				case "DD":
					downCount = '' + textBefore + daysC + '\u5929' + textAfter;
					break;
				case "DD:HH":
					downCount = '' + textBefore + daysC + '\u5929' + hoursC + '\u5C0F\u65F6' + textAfter;
					break;
				case "DD:HH:MM":
					downCount = '' + textBefore + daysC + '\u5929' + hoursC + '\u5C0F\u65F6' + minutesC + '\u5206' + textAfter;
					break;
				default:
					downCount = '' + textBefore + daysC + '\u5929' + hoursC + '\u5C0F\u65F6' + minutesC + '\u5206' + secondsC + '\u79D2' + (T == 10 ? msecondsC : '') + textAfter;
					break;
			}
			this.setState({
				// downCount: difference < 0 ? '已结束！' : downCount
				// 临时处理 1分以下不显示
				downCount: difference <= 60000 ? textBefore + '00\u592900\u5C0F\u65F601\u5206' + textAfter : downCount
			}, function () {
				onChange && onChange({
					daysC: daysC < 0 ? '00' : daysC,
					hoursC: hoursC < 0 ? '00' : hoursC,
					minutesC: minutesC < 0 ? '00' : minutesC,
					secondsC: secondsC < 0 ? '00' : secondsC,
					msecondsC: msecondsC < 0 ? '00' : msecondsC
				});
				_this2.isEnd = 1;
				difference < 0 && _this2.runEnd();
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    show = _state.show,
			    downCount = _state.downCount;
			var _props3 = this.props,
			    className = _props3.className,
			    Tag = _props3.tag,
			    style = _props3.style;

			if (!show) return null;
			return _react2.default.createElement(
				Tag,
				{ className: className, style: style },
				downCount
			);
		}
	}]);
	return DownCount;
}(_react.Component);

DownCount.propTypes = {
	/**
  * id,唯一标识//此项目可不传。最好传；
  */
	id: _propTypes2.default.number,
	/**
  * 外层标签
  */
	tag: _propTypes2.default.string,
	/**
  * 文本
  */
	textBefore: _propTypes2.default.string,
	textAfter: _propTypes2.default.string,
	/**
  * 毫秒/秒
  * 10/1000
  */
	T: _propTypes2.default.number,
	/**
  * 结束时间或者开始时间(目标时间)
  */
	targetTime: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	/**
  * 服务器时间
  */
	serverTime: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	/**
  * 结束时候的回调
  */
	onEnd: _propTypes2.default.func,
	/**
  * 改变时回调
  */
	onChange: _propTypes2.default.func,
	onTip: _propTypes2.default.func,
	/**
  * 时间格式
  */
	format: _propTypes2.default.string
};
DownCount.defaultProps = {
	id: null,
	tag: 'span',
	textBefore: "",
	textAfter: "",
	T: 1000,
	// targetTime: '',
	// serverTime: '',
	className: '',
	style: {},
	onChange: function onChange() {},
	onEnd: function onEnd() {},
	onTip: function onTip() {},
	format: ''
};
exports.default = DownCount;