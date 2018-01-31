import React, { Component } from 'react';

export default (fn, refName = "wrap", Loading, opts = {}) => {
	class AsyncComponent extends Component {
		constructor (props) {
			super(props);

			this.state = {
				WrapComponent: null,
			};
		}

		async componentDidMount () {
			const { onBefore, onAfter } = opts;
			const { onLoaded } = this.props;
			try {
				// before
				onBefore && onBefore();

				// loading
				const { default: WrapComponent } = await fn();

				// after
				onAfter && onAfter();

				// loaded
				onLoaded && onLoaded();

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
				? <WrapComponent {...this.props} ref={refName}/>
				: Loading 
					? <Loading />
					: null;
		}
	}

	return AsyncComponent;
};