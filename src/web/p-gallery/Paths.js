import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
class Paths extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleAddPath = () => {
		this.props.onSet({
			paths: [
				...this.props.paths,
				{
					id: Date.now(),
					name: '新建分类',
					count: 0
				}
			]
		});
	}
	handleSelectPath = (pathSelect) => {
		this.props.onSet({
			pathSelect
		});
	}
	render() {
		const { paths, pathSelect } = this.props;
		return (
			<div className="__paths">
				<div
					onClick={this.handleAddPath}
				>+ 添加分组</div>
				{
					paths.map((item, index) => {
						const { id, name, count = 0 } = item;
						return (
							<div
								key={id}
								className={classNames({ '__select': pathSelect.id == id })}
								onClick={e => this.handleSelectPath(item)}
							>{name}（{count}）</div>
						);
					})
				}
			</div>
		);
	}
}

Paths.propTypes = {
};

export default Paths;