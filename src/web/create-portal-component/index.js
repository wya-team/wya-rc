import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getUid } from '../utils/utils';
// decorator
export default (options = {}) => WrappedComponent => {
	const { el, root: _root } = options;

	class Viewer extends Component {
		constructor(props) {
			super(props);
			this.el = document.createElement(el || 'div');
			this.root = document.querySelector(_root || 'body');

			this.el.setAttribute('rc-root-uuid', getUid());
		}

		componentDidMount() {
			this.root.appendChild(this.el);
		}
		componentWillReceiveProps() {
			// ??
		}
		componentWillUnmount() {
			this.root.removeChild(this.el);
		}

		render() {
			return ReactDOM.createPortal(
				<WrappedComponent {...this.props} />,
				this.el,
			);
		}
	}
	return Viewer;
};

