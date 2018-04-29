## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/paging/Basic.html)

## 功能
取代`antd`中`Table`（键值对形式，不适合开发）

- 确保`antd`模块，部分（loading，分页器还是使用`antd`）
```
npm install antd --save
```
## 待完善

- 集成checkbox实现略繁琐；


## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
title | 列名 | `array` | -
history | 页面url随之改变 | `bool` | false
show | 是否出发请求 | `bool` | true
className | 样式 | `string` | -
listClassName | 列表样式 | `string` | -
isEnd | 加载完毕0(需要判断是否有数据), 1为加载中, 3数据异常 （PullScroll有2状态）| `number` | 0
curPage | 当前页 | `number` | -
totalPage | 总页数 | `number` | -
loadDataForPaging | `数据请求` | `func` | -
resetPrvScrollTop | `窗体置顶，如果页码不一样或其他值判断` | `number` | -
resetPage | `如果前后值不一样，重置分页到第一页` | `string` | -
tHide | `隐藏title` | `bool` | false
dataSource | `table`数据(传入itemArr和itemObj) | `obj` | -
rowSelection | `Checkbox`配置项 | `obj` | -
renderRow | 列表Item | `func` | -
actions | 传入Item的Action | `obj` | -
rowProps | 传入Item的其他Props | `obj` | -

## rowSelection API
属性 | 说明 | 类型 | 默认值
---|---|---|---
getCheckboxProps | 传递给checkbox的属性 | `func` | -
onChange | checkbox改变之后的回调 | `func` | -
onSelectAll | 全部选中后的回调 | `func` | -
onCancelAll | 勾选状态全部取消后的回调 | `func` | -

## 基础用法

```jsx
const rowSelection = {
	getCheckboxProps: (record) => ({
		disabled: record.id === 1,
		checked: record.id === 1,
	}),
	onChange: (selectedRowKeys, selectedRows) => { console.log(selectedRowKeys, selectedRows); }
};
<Paging 
	show
	history
	ref={paging => this.paging = paging}
	title={title}
	isEnd={isEnd}
	dataSource={{ itemArr, itemObj }}
	curPage={currentPage}
	totalPage={totalPage}
	loadDataForPaging={this.loadDataForPaging}
	resetPrvScrollTop={currentPage}
	resetPage = {resetPage}
	rowSelection={rowSelection}
	renderRow={Item}
>
	
	{/*全选之类按钮*/}
	<Btn
		selectArr={selectArr}
		actions={this.actions}
	/>
</Paging>
```

## 用法注意事项（redux下的使用为主）

- `show: bool`, 在做tabs切换的时候可以控制是否允许出发`ajax`请求

- `history: true`, 控制页面切换是否记录当前`url`状态信息, 包括`page`，其他参数可以是筛选条件，搜索条件，既这些状态由`url`管理, 数据由`redux`管理

- `resetPage` 使用方式(推荐使用第二种方式)

	1. `resetPage` 由`url`管理, 即`query`值做为管理，不经过redux,`编辑Item`和`删除Item`只能完成当前页刷新，`搜索`可以充值到第一页刷新
	2. `resetPage` 由`redux`管理, 设置成为当前页. 处理场景: `编辑Item` - 当前页刷新, `删除Item` - 重置到第一页刷新, `搜索`筛选 - 重置到第一页刷新

> 第二种方式`reducer`片段，集成tab，删除，编辑等操作, `resetPage`要在`redux`控制的原因主要考虑刷新当前页的操作

```js
import * as types from '@constants/actions/sales';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';

const initialState = {
	"0": {
		...initPage,
		resetPage: 0
	},
	"1": {
		...initPage,
		resetPage: 0
	}
};

export const salesGroup = (state = initialState, action) => {
	let curPage, totalPage, items, id, type, selectArr, totalCount;
	switch (action.type) {
		case types.SALES_GROUP_LIST_GET + '_ON':
			type = action.param.type;
			state = {
				...state,
				[type]: {
					...state[type],
					isEnd: 1
				}
			};
			return state;
		case types.SALES_GROUP_LIST_GET + '_SUCCESS':
			type = action.param.type;
			curPage = action.param.page; // 当前页
			totalPage = action.data.totalPage; // 后端给的字段
			totalCount =  action.data.totalCount || 0;
			items = initItem(action.data.list, 'id');
			state = {
				...state,
				[type]: {
					...state[type],
					curPage,
					totalPage,
					totalCount,
					itemArr: { ...state[type].itemArr, [curPage]: [...items.itemArr] },
					itemObj: { ...state[type].itemObj, ...items.itemObj },
					isEnd: 0,
					resetPage: curPage // 这里设置当前页
				}
			};
			return state;
		case types.SALES_GROUP_LIST_GET + '_SETPAGE':
			curPage = action.param.page; // 当前页
			type = action.param.type;
			state = {
				...state,
				[type]: {
					...state[type],
					curPage,
					resetPage: curPage // 这里设置当前页
				}
			};
			return state;
		case types.SALES_GROUP_LIST_GET + '_ERROR':
			type = action.param.type;
			state = {
				...state,
				[type]: {
					...state[type],
					isEnd: 3
				}
			};
			return state;
		/**
		 * 编辑 此时后端不返回数据，要在当前页刷新
		 */
		case types.SALES_GROUP_EDIT_POST + '_SUCCESS':
			type = action.param.type;
			state = {
				...initialState,
				[type] : {
					...initialState[type],
					resetPage: state[type].resetPage // 会触发当前页刷新，而非回到第一页
				}
			};
			return state;
		/**
		 * 删除，搜索，路由切换都初始化，加载请求会回到第一页
		 * 小技巧：可以使用 `this.props.actions.emit('ROUTER_CHANGE');` 直接初始化
		 */
		case types.SALES_GROUP_DEL_GET + '_SUCCESS':
		case types.SALES_GROUP_SEARCH_INIT:
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};
```
## 其他

- `dom diff` ->  `父 -> 子`
- `will, unmount` ->  `父 -> 子`
- `did` -> `子 -> 父` 

## 其他说明(redux)：

- 场景一： `/order?page=3` -> `/order/detail/2` -> `goBack()` -> `/order?page=3`
	1. 要在 `/order?page=3` 的 `componentUnmount` 里触发 `ROUTER_CHANGE` 的操作(init)

- 场景二： `/order?page=3` -> `/order/detail/2` -> `goBack()` -> `/order?page=1`（）
	1. 不在 `/order?page=3` 的 `componentUnmount` 里做操作
	2. 在 `/order/detail/2` 的 `componentUnmount` 里 触发 `ROUTER_CHANGE` 的操作(init)

#### 场景二分析原因：声明周期执行顺序
	- `goBack()` -> `/order?page=3 componentWillMount` -> `/order/detail/2 componentUnmount` - `init`操作改变了`props`, 即`nextProps` -> `/order?page=3 componentDidMount` 此时内部调用仍然还是this.props, CurPage = 3` -> `/order?page=3 componentWillReceview` -> `/order?page=1`

总结：在当前的 `componentUnmount` 做触发 `ROUTER_CHANGE` 的操作(init)，即场景一
