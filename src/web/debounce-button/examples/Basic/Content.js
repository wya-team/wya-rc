import React, { Component } from 'react';
import DebounceButton from '../../DebounceButton';

class Content extends Component {
	handleClick = () => {
		console.log('onClick');
	};

	render() {

		return (
			<DebounceButton wait={250}>
				<div onClick={this.handleClick}>
					Button
				</div>
			</DebounceButton>
		);
	}
}

export default Content;
