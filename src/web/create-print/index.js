
import React, { Component } from 'react';
import CreatePrint from './CreatePrint';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (options = {}) => WrappedComponent => {
	return class extends Component {
		constructor() {
			super();
			this.displayName = `CreateEcharts${getDisplayName(WrappedComponent)}`;
		}

		render() {
			return (
				<CreatePrint {...options}>
					<WrappedComponent {...this.props} ref="WrappedComponent" />
				</CreatePrint>
			);
		}
	};
};