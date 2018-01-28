import React, { Component } from 'react';

export default (fn, opts = {}) => {
	class AsyncComponent extends Component {
		constructor (props) {
			super(props);

			this.state = {
				WrapComponent: null,
			};
		}

		async componentDidMount () {
			try {
				const { default: WrapComponent } = await fn();

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
				: null; // loading
		}
	}

	return AsyncComponent;
};