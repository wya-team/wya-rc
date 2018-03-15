import React, { Component, createElement } from 'react';
import PSortList from '../../PSortList.js';
import Item from './Item';

class Content extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			dataSource: [
				{ text: '四只牡蛎~', background: '#e9ec32', imgUrl: 'http://img.zcool.cn/community/016ca85a61c23aa80120121f298c6a.JPG@1280w_1l_2o_100sh.webp' },
				{ text: '两盅鱼子酱~', background: '#c7ec32', imgUrl: 'http://img.zcool.cn/community/01f9ac5a61c23aa8012113c73d60a4.JPG@1280w_1l_2o_100sh.webp' },
				{ text: '一条咸鱼~', background: '#adec32', imgUrl: 'http://img.zcool.cn/community/01ae085a61c238a8012113c75221dc.JPG@1280w_1l_2o_100sh.webp' },
				{ text: '一篮子鲜蔬~', background: '#32ec9f', imgUrl: 'http://img.zcool.cn/community/019cad5a61c239a8012113c7882fa2.JPG@1280w_1l_2o_100sh.jpg' },
			]
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				dataSource: [
					{ text: '___四只牡蛎~', background: '#e9ec32', imgUrl: 'http://img.zcool.cn/community/016ca85a61c23aa80120121f298c6a.JPG@1280w_1l_2o_100sh.webp' },
					{ text: '___两盅鱼子酱~', background: '#c7ec32', imgUrl: 'http://img.zcool.cn/community/01f9ac5a61c23aa8012113c73d60a4.JPG@1280w_1l_2o_100sh.webp' },
					{ text: '___一条咸鱼~', background: '#adec32', imgUrl: 'http://img.zcool.cn/community/01ae085a61c238a8012113c75221dc.JPG@1280w_1l_2o_100sh.webp' },
					{ text: '___一篮子鲜蔬~', background: '#32ec9f', imgUrl: 'http://img.zcool.cn/community/019cad5a61c239a8012113c7882fa2.JPG@1280w_1l_2o_100sh.jpg' },
				]
			});
		}, 2000);
	}
	handleChange = (sortList) => {
		console.table(sortList);
	};
	render() {
		return (
			<PSortList
				dataSource={this.state.dataSource}
				onChange={this.handleChange}
				renderRow={Item}
				style={{ width: 1000 }}
			 />
		);
	}
}

export default Content;