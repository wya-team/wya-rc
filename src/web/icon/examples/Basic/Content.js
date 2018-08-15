import React, { Component } from 'react';
import Icon from '../../Icon';

class Content extends Component {
	render() {
		return (
			<div>
				<Icon type="right" style={{ color: "red" }} />
				<Icon type="delete" style={{ color: "red" }} />
			</div>
		);
	}
}

export default Content;