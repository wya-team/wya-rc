import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
class Header extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="__header">
				<div>我的素材</div>		
				<Icon type="close" onClick={e => this.props.onClose()}/>
			</div>
		);
	}
}

Header.propTypes = {
};

export default Header;