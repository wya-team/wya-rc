import React, { PureComponent, createElement } from 'react';


let getNextWrapperComp = (TargetContext, key, WrapperComponent) => {

	const WrapperComponentName = WrapperComponent.displayName || WrapperComponent.name || "Component";
	const consumerName = TargetContext.Consumer.displayName || TargetContext.Consumer.name || "TargetContext.Consumer";

	return class Connected extends PureComponent {
		static WrapperComponent = WrapperComponent;
		static displayName = `${WrapperComponentName}(${consumerName}.${key})`;
		constructor(props) {
			super(props);
		}

		render() {
			const props = this.props;
			// return createElement(TargetContext.Consumer, null, context => {
			// 	return createElement(WrapperComponent, { [key]: context, ...props });
			// });
			return (
				<TargetContext.Consumer>
					{
						// TargetContext.Consumer会使用this.props.children()
						(context) => {
							const props = {
								[key]: context,
								...this.props
							};
							return (
								<WrapperComponent {...props} />
							);
						}
					}
				</TargetContext.Consumer>
			);

		}
	};
};

function CreateMultiContext(opts = {}) {
	return (WrapperComponent) => Object.keys(opts)
		.reduce((preComp, key) => getNextWrapperComp(opts[key], key, preComp), WrapperComponent);
}

export default CreateMultiContext;
