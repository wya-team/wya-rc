import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import Paths from './Paths';
import Imgs from './Imgs';
class Contents extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { paths, pathSelect, onSet, onSure, request, url, max } = this.props;
		return (
			<div className="__contents">
				<Paths 
					paths={paths}
					pathSelect={pathSelect}
					onSet={onSet}
					request={request}
					url={url}
				/>
				<Imgs
					paths={paths}
					pathSelect={pathSelect}
					onSet={onSet}
					onSure={onSure}
					request={request}
					url={url}
					max={max}
				/>
			</div>
		);
	}
}

Contents.propTypes = {
};

export default Contents;