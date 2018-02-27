/**
 * 功能大致实现，后续再考虑重构
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ajax } from 'wya-fetch';
import RcInstance from '../rc-instance/index';
import PPopup from '../p-popup';
import Contents from './Contents';
import './PGallery.scss';
let Dom = document.body;
let Statics = {};
let cName = 'PGallery';
Statics = {
	init(opts = {}){
		return new Promise((resolve, reject) => {
			const div = document.createElement('div');
			// div.classList.add("wp-gallery");
			Dom.appendChild(div);
			opts = {
				...opts,
				request: opts.request || ajax,
				max: opts.max || 0,
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
			RcInstance.APIS[cName] = div;
			return ReactDOM.render(<PGallery {...opts} />, div);
		});
	},
	/**
	 * 弹出项目，验证数据结构是否合法
	 * opts {
	 * 	request,
	 * 	max
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
		// loadData
		this.loadDataForPaths();
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	close = () => {
		this && this.props.onClose && this.props.onClose();
	}
	handleClose = () =>  {
		this && this.props.onClose && this.props.onClose();
	}
	handleSure = (res) => {
		this && this.props.onSure && this.props.onSure(res);
	}
	handleSet = (newState) => {
		this.setState({
			...newState
		});
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
		const { request, url, max } = this.props;
		return (
			<PPopup title="我的素材" onClose={this.handleClose} onSure={this.handleSure} className="wp-gallery">
				<Contents
					paths={paths}
					pathSelect={pathSelect}
					request={request}
					url={url}
					max={max}
					onSet={this.handleSet}
				/>
			</PPopup>
		);
	}
}

PGallery.propTypes = {
	url: PropTypes.object,
	request: PropTypes.func
};

export default PGallery;