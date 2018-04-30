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
		if (nextProps.auth != this.props.auth) {
			this.setValue(nextProps);
		}
	}
	setValue = async ($props) => {
		try {
			const { auth = [] } = $props;
			const { show } = this.state;
			let status = true;
			let funcs = [];

			for (let i = 0; i < auth.length; i++) {
				if (typeof auth[i] === 'function') {
					funcs = [...funcs, auth[i]];
					continue;
				}
				if (!auth[i]) {
					status = false;
					break;
				}
			}
			if (status) {
				for (let i = 0; i < funcs.length; i++) {
					status = await funcs[i]();
					if (!status) {
						status = false;
						break;
					}
				}
			}
			console.log(status);
			if ( show !== status) {
				this.setState({
					show: status
				});
			}

		} catch (e) {
			console.log(e);
		}
		
	}
	render() {
		const { show } = this.state;
		if (!show) return null;

		const { auth, tag: Tag, ...rest } = this.props;
		return createElement(Tag, { ...rest, show: typeof Tag === 'string' ? 'true' : true });
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
	auth: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func
	]))
};
Authorized.defaultProps = {
	tag: 'div'
};
export default Authorized;