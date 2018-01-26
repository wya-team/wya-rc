import React, { Component, Fragment } from 'react';
class Header extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="__header">
				<div>我的素材</div>		
				<div>X</div>		
			</div>
		);
	}
}

Header.propTypes = {
};

export default Header;