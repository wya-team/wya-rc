import React, { Component } from 'react';
import DebounceClick from '../../DebounceClick';
import { Button } from 'antd';

class Content extends Component {
	handleClick = () => {
		console.log('onClick');
	};

	render() {

		return (
			<DebounceClick wait={250} tag={Button} onClick={this.handleClick}>
				Button
			</DebounceClick>
		);
	}
}

export default Content;
