import ReactDOM from 'react-dom';
class RcInstance {
	constructor() {
		this.hasInit = false;
		this.APIS = {};
		this.config = {
			PGallery: {

			},	
			UpLoad: {
				IMG_UPLOAD_URL: null,
				FILE_UPLOAD_URL: null
			}
		};
	}
	/**
	 * 初始化配置全局
	 */
	init(opts = {}) {
		if (!this.hasInit) {
			this.config = {
				...this.config,
				...opts
			};
			this.hasInit = true;
		} else {
			console.error('只能初始化一次');
		}
		
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
