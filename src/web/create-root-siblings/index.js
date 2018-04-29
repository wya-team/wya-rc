import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import RcInstance from '../rc-instance/index';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (options = {}) => WrappedComponent => {

	let { cName, onBefore } = options;

	if (!cName) {
		console.log('cName 必传');
		return;
	}

	let Statics = {

		init(opts = {}){
			return new Promise((resolve, reject) => {
				const container = document.createElement('div');
				RcInstance.APIS[cName] && Viewer.hide();
				document.body.appendChild(container);
				opts = {
					...opts,
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
				const render = (res) => {
					RcInstance.APIS[cName] = container;

					let element = res 
						? <Viewer {...opts} data={res.data} /> 
						: <Viewer {...opts} ref={instance => this.comp = instance} />;
					let callback = res 
						? undefined 
						: () => resolve(this.comp); 

					if (opts.parent) {
						// 可以接入redux
						ReactDOM.unstable_renderSubtreeIntoContainer(opts.parent, element, container, callback);
					} else {
						ReactDOM.render(element, container, callback);
					}
					
				};
				if (onBefore) {
					onBefore({ ...opts })
						.then((res = {}) => {
							render(res);
						}).catch((res = {}) => {
							console.log(res);
							reject(res);
						});
					return;
				}
				render();
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


	class Viewer extends Component {
		static popup = Statics.popup;
		static close = () => {
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

