/**
 * 防抖Button
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

class DebounceButton extends PureComponent {

	handleClick = (onClick) => {
		const { wait } = this.props;
		if (onClick) {
			return debounce(onClick, wait);
		}
	};

	render() {
		const { children } = this.props;
		let childrenWithDebounce = React.cloneElement(React.Children.only(children),
			{
				onClick: this.handleClick(children.props.onClick),
			}
		);
		return childrenWithDebounce;
	}
}

DebounceButton.propTypes = {
	wait: PropTypes.number
};
DebounceButton.defaultProps = {
	wait: 250
};

export default DebounceButton;
