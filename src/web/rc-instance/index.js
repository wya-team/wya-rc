import ReactDOM from 'react-dom';
class RcInstance {
	constructor() {
		this.APIS = {};
		this.config = {
			// 获取图片
			P_IMGS_SELECT_LIST_GET: undefined
		};
	}
	/**
	 * 初始化配置全局
	 */
	init(opts = {}) {
		this.config = {
			...this.config,
			...opts
		};
	}
	/**
	 * 清理Portals类型组件
	 */
	clean() {
		try {
			for (let i in this.APIS) {
				if (this.APIS[i] && this.APIS.hasOwnProperty(i)) {
					ReactDOM.unmountComponentAtNode(this.APIS[i]);
					document.body.removeChild(this.APIS[i]);
					delete this.APIS[i];
				}
			}
		} catch (e) {
			console.error(e);
		}
		
	}
}
// 单例
export default new RcInstance;
