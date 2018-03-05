/**
 * 防抖Button
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

class DebounceClick extends PureComponent {

	handleClick = (onClick) => {
		const { wait } = this.props;
		if (onClick) {
			return debounce(onClick, wait);
		}
	};

	render() {
		const {
			tag: Tag,
			children,
			onClick,
			...rest
		} = this.props;

		return (
			<Tag
				{...rest}
				onClick={this.handleClick(onClick)}
			>
				{children}
			</Tag>
		);
	}
}

DebounceClick.propTypes = {
	wait: PropTypes.number,
	tag: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	])
};
DebounceClick.defaultProps = {
	wait: 250,
	tag: 'div'
};

export default DebounceClick;
