import React, { Component } from 'react';

export default (fn, refName = "wrap", Loading, opts = {}) => {
	class AsyncComponent extends Component {
		constructor (...params) {
			super(...params);

			this.state = {
				WrapComponent: null,
			};
		}

		async componentDidMount () {
			try {
				let { onBefore, onAfter } = opts;
				onBefore = onBefore || this.props.onBefore;
				onAfter = onAfter || this.props.onAfter;

				// before
				onBefore && onBefore();

				// loading
				const { default: WrapComponent } = await fn();

				// after
				onAfter && onAfter();

				this.setState({
					WrapComponent
				});
			} catch (e) {
				console.log(e);
			}

		}

		render () {
			const { WrapComponent }  = this.state;
			const { onBefore, onAfter, onLoaded, ...rest }  = this.props;
			return WrapComponent
				? <WrapComponent { ...rest } ref={onLoaded ? instance => onLoaded(instance) : refName}/>
				: Loading
					? <Loading />
					: null;
		}
	}

	return AsyncComponent;
};
