import React, { Component } from 'react';

export default (fn, Loading, opts = {}) => {
	class AsyncComponent extends Component {
		constructor (props) {
			super(props);

			this.state = {
				WrapComponent: null,
			};
		}

		async componentDidMount () {
			const { onBefore, onAfter } = opts;
			try {
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
			return WrapComponent
				? <WrapComponent {...this.props} />
				: Loading 
					? <Loading />
					: null;
		}
	}

	return AsyncComponent;
};