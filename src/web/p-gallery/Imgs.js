import React, { Component, Fragment } from 'react';
import { Pagination } from 'antd';
import UpLoad from './UpLoad';
import PathsEdit from './PathsEdit';
import List from './List';
import ImgsEdit from './ImgsEdit';
import { Button } from 'antd';
class Imgs extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { pathSelect, paths, onSet } = this.props;
		return (
			<div className="__imgs">
				<div>
					<PathsEdit 
						pathSelect={pathSelect}
						onSet={onSet}
					/>
					<UpLoad />
				</div>
				<List />
				<div>
					<ImgsEdit paths={paths}/>
					<Pagination 
						showQuickJumper 
						defaultCurrent={2} 
						total={500} 
						// onChange={onChange} 
					/>
				</div>
			</div>
		);
	}
}

Imgs.propTypes = {
};

export default Imgs;