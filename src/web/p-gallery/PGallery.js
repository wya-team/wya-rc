import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import RcInstance from '../rc-instance/index';
import Header from './Header';
import Paths from './Paths';
import Imgs from './Imgs';
import './PGallery.scss';
let Dom = document.body;
let Statics = {};
let cName = cName;
Statics = {
	init(opts = {}){
		return new Promise((resolve, reject) => {
			const div = document.createElement('div');
			// div.classList.add("wp-gallery");
			Dom.appendChild(div);
			opts = {
				...opts,
				show: true,
				onCloseSoon: () => {
					ReactDOM.unmountComponentAtNode(div);
					Dom.removeChild(div);
					delete RcInstance.APIS[cName];
				},
				onSure: (res) => {
					opts.onCloseSoon();
					resolve(res);
				},
				onClose: (res) => {
					opts.onCloseSoon();
					reject(res);
				}
			};
			return ReactDOM.render(<PGallery {...opts} />, div);
		});
	},
	/**
	 * 弹出项目，验证数据结构是否合法
	 * opts {
	 * }
	 */
	popup(opts = {}){
		if (typeof opts !== 'object') {
			opts = {};
		}
		return Statics.init(opts);
	}
};
class PGallery extends Component {
	static popup = Statics.popup;
	static close = () => {
		if (!!RcInstance.APIS[cName]) {
			ReactDOM.unmountComponentAtNode(RcInstance.APIS[cName]);
			delete RcInstance.APIS[cName];
		}
	};
	constructor(props, context) {
		super(props, context);
		this.state = {
			paths: [
				{
					id: 1,
					name: '未分类',
					count: 200
				},
				{
					id: 2,
					name: '广告分组',
					count: 20
				}
			],
			pathSelect: {
				id: 1,
				name: '未分类',
				count: 200
			} 
		};
	}
	handleSet = (newState) => {
		console.log(newState);
		this.setState({
			...newState
		});
	}
	render() {
		const { paths, pathSelect } = this.state;
		return (
			<div className="wp-gallery">
				<div className="__container">
					<Header />
					<div className="__contents">
						<Paths 
							paths={paths}
							pathSelect={pathSelect}
							onSet={this.handleSet}
						/>
						<Imgs
							paths={paths}
							pathSelect={pathSelect}
							onSet={this.handleSet}
						/>
					</div>
				</div>
			</div>
		);
	}
}

PGallery.propTypes = {
};

export default PGallery;