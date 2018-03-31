import React, { Component } from 'react';
import CreateAccordion from './CreateAccordion';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (options = {}) => function createAccordion(WrappedComponent) {
	class CreateEchartsDecorated extends Component {
		constructor() {
			super();
			this.displayName = `CreateAccordion${getDisplayName(WrappedComponent)}`;
		}

		render() {
			return (
				<CreateAccordion {...options}>
					<WrappedComponent {...this.props} ref="WrappedComponent" />
				</CreateAccordion>
			);
		}
	};
	const { staticObj } = options;
	if (staticObj) {
		for (let key in staticObj) {
			CreateEchartsDecorated[key] = staticObj[key];
		}
	}
	return CreateEchartsDecorated;
};

