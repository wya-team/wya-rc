import React, { Component } from 'react';
import DebounceClick from '../../DebounceClick';
import { Button } from 'antd';

class Content extends Component {
	handleClick = (e) => {
		console.log('onClick', e);
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
