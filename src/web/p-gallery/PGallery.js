/**
 * 功能大致实现，后续再考虑重构
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ajax } from 'wya-fetch';
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
				request: opts.request || ajax,
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
				},
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
			paths: [],
			pathSelect: {}
		};
	}
	componentDidMount() {
		this.gallery.classList.add('__active');

		// loadData
		this.loadDataForPaths();
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	setGallery = (node) => {
		this.gallery = node;
	}
	close() {
		this && this.props.onClose && this.props.onClose();
	}
	handleClose = (e) => {
		// 
		e && e.preventDefault();
		e && e.stopPropagation();

		this.gallery.classList.remove('__active');
		this.timer = setTimeout(() => {
			// 主线程
			this.close();
		}, 201);
	}
	handleSet = (newState) => {
		this.setState({
			...newState
		});
	}
	handleSure = (id) => {
		
		this.gallery.classList.remove('__active');
		this.timer = setTimeout(() => {
			this.props.onSure && this.props.onSure(id);
		}, 201);
	}
	loadDataForPaths = () => {
		const { config: { PGallery } } = RcInstance;
		const { URL_PGALLERY_PATHS_LIST_GET: _url } = PGallery || {};
		const { URL_PGALLERY_PATHS_LIST_GET: url } = this.props.url || {};
		const { request } = this.props;
		request({
			url: url || _url,
			type: "get"
		}).then((res) => {
			const { paths } = res.data;
			this.setState({
				paths,
				pathSelect: paths[0] || {}
			});
		}).catch((res) => {
			console.log(res);
		});
	}
	render() {
		const { paths, pathSelect } = this.state;
		const { request, url } = this.props;
		return (
			<div className="wp-gallery" ref={this.setGallery}>
				<div className="__mask" onClick={this.handleClose}/>
				<div className="__container">
					<Header onClose={this.handleClose}/>
					<div className="__contents">
						<Paths 
							paths={paths}
							pathSelect={pathSelect}
							onSet={this.handleSet}
							request={request}
							url={url}
						/>
						<Imgs
							paths={paths}
							pathSelect={pathSelect}
							onSet={this.handleSet}
							onSure={this.handleSure}
							request={request}
							url={url}
						/>
					</div>
				</div>
			</div>
		);
	}
}

PGallery.propTypes = {
	url: PropTypes.object,
	request: PropTypes.func
};

export default PGallery;