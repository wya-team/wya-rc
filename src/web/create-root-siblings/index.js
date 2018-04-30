import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import RcInstance from '../rc-instance/index';

// decorator
export default (options = {}) => WrappedComponent => {
	let uuid = 0;
	let isNeedWaiting = false;
	let { cName, onBefore } = options;

	if (!cName) {
		console.log('cName 必传');
		return;
	}

	let Statics = {

		init(opts = {}){
			return new Promise((resolve, reject) => {
				// create container
				let container = document.createElement('div');
				container.setAttribute('rc-root-uuid', uuid++);

				// init opts
				const { parent, getInstance, onBefore: _onBefore, cName: _cName, ...rest } = opts;
				onBefore = _onBefore || onBefore;
				cName = _cName || cName;

				// constructor opts
				opts = {
					...rest,
					show: true,
					onCloseSoon: () => {
						ReactDOM.unmountComponentAtNode(container);
						document.body.removeChild(container);
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
				let render = (res = {}) => {
					document.body.appendChild(container);

					// destory
					RcInstance.APIS[cName] && Viewer.destroy();
					RcInstance.APIS[cName] = container;

					let element = (
						<Viewer 
							{...opts} 
							data={res.data} 
							ref={instance => this.comp = instance} 
						/>
					);
					let callback = () => { 
						isNeedWaiting = false; 
						getInstance && getInstance(this.comp, opts.onSure, opts.onClose); 
					};

					if (parent) {
						// 可以接入redux
						ReactDOM.unstable_renderSubtreeIntoContainer(parent, element, container, callback);
					} else {
						ReactDOM.render(element, container, callback);
					}
					
				};
				if (onBefore) {
					if (isNeedWaiting) {
						container = null;
						opts = null;
						render = null;
					} else {
						isNeedWaiting = true;
						onBefore({ ...opts })
							.then((res = {}) => {
								render(res);
							}).catch((res = {}) => {
								isNeedWaiting = true;
								reject(res);
							});
					}
					return;
				}
				isNeedWaiting = false;
				render();
			});
		},

		/**
		 * 弹出项目，验证数据结构是否合法
		 * opts {
		 * 	parent
		 * 	getInstance,
		 * 	param: {
		 * 	}
		 * }
		 */
		popup(opts = {}){
			if (typeof opts !== 'object') {
				opts = {};
			}
			return Statics.init(opts);
		}
		
	};


	class Viewer extends Component {
		static popup = Statics.popup;
		static destroy = (_cName) => {
			cName = _cName || cName;
			if (!!RcInstance.APIS[cName]) {
				ReactDOM.unmountComponentAtNode(RcInstance.APIS[cName]);
				delete RcInstance.APIS[cName];
			}
		};
		constructor(...params) {
			super(...params);
		}

		render() {
			return (
				<WrappedComponent {...this.props} ref="WrappedComponent" />
			);
		}
	};

	// Viewer 编译后 变量提升 
	return Viewer;
};

