import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'antd';
class Btn extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="__btns">
				<Button onClick={e => this.props.onClose()}>取消</Button>
				<Button 
					onClick={e => this.props.onSure()} 
					type="primary"
					style={{ margin: '0 8px' }}
				>确定</Button>
			</div>
		);
	}
}

Btn.propTypes = {
};

export default Btn;