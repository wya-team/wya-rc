import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
class Authorized extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			show: false,
		};
	}
	componentWillMount() {
		this.setValue(this.props);
	}
	componentWillReceiveProps(nextProps) {
		let isChange = nextProps.auth.every((item, index) => {
			if (item === this.props.auth[index]) {
				return false;
			} else {
				return true;
			}
		});
		if (isChange) {
			this.setValue(nextProps);
		}
	}
	setValue = ($props) => {
		const { auth = [] } = $props;
		const { show } = this.state;
		let status = true;
		let funcs = [];

		for (let i = 0; i < auth.length; i++) {
			// if (typeof auth[i] === 'function') {
			// 	funcs = [...funcs, auth[i]];
			// 	continue;
			// }
			if (!auth[i]) {
				status = false;
				break;
			}
		}
		// if (status) {
		// 	for (let i = 0; i < funcs.length; i++) {
		// 		status = funcs[i]();
		// 		if (!status) {
		// 			status = false;
		// 			break;
		// 		}
		// 	}
		// }
		if ( show !== status) {
			this.setState({
				show: status
			});
		}
	}
	render() {
		const { show } = this.state;
		if (!show) return null;

		let { auth, tag: Tag, show: _show, ...rest } = this.props;
		_show = typeof _show === 'boolean' ? _show : true;
		return createElement(Tag, { ...rest, show: typeof Tag === 'string' ? 'true' : _show });
	}
}
Authorized.propTypes = {
	/**
	 * 默认标签 div
	 */
	tag: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]),
	// auth: PropTypes.arrayOf(PropTypes.oneOfType([
	// 	PropTypes.bool,
	// 	PropTypes.func
	// ]))
	auth: PropTypes.arrayOf(PropTypes.bool)
};
Authorized.defaultProps = {
	tag: 'div'
};
export default Authorized;
