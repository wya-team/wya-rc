## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/paging/Basic.html)

## 功能
取代`antd`中`Table`（键值对形式，不适合开发）

- 确保`antd`模块，部分（loading，分页器还是使用`antd`）
```
npm install antd --save
```
## 待开发

- 集成checkbox；


## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
title | 列名 | `array` | -
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
