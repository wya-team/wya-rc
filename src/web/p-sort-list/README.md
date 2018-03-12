## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/p-sort-list/Basic.html)
## 功能
1. 使元素可拖拽
2. 点击按钮可左右移动
3. 点击删除可移除元素

## API

| 属性         | 说明        | 类型        | 默认值  |
| ---------- | --------- | --------- | ---- |
| dataSource | 必填，数据源    | `array`   |      |
| renderRow  | 必填，渲染的子组件 | `标签名或者组件` |      |
| onChange   | 改变后的回调    | `func`    |      |
| style      | 容器样式      | `object`  |      |

## 示例

Item.js

```js
export default class Item extends Component {
	render() {
		const { itemData = {} } = this.props;
		const { text, background, imgUrl } = itemData || {};
		return (
			<div
				style={{ width: 200, lineHeight: 5, color: 'white', background }}
			>
				<img src={imgUrl} alt="" style={{ width: 200, height: 240 }} />
				<span>{text}</span>
			</div>
		);
	}
}
```

Content.js

```js
import { PSortList } from 'wya-rc';

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
			>
			</PSortList>
		);
	}
}

export default Content;
```

