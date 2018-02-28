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
isEnd | 加载完毕0(需要判断是否有数据), 1为加载中, 3数据异常 （PullScroll有2状态）| `number` | 0
curPage | 当前页 | `number` | -
totalPage | 总页数 | `number` | -
loadDataForPaging | `数据请求` | `func` | -
resetPrvScrollTop | `窗体置顶，如果页码不一样或其他值判断` | `number` | -
resetPage | `如果前后值不一样，重置分页到第一页` | `string` | -
tHide | `隐藏title` | `bool` | false
## 基础用法

```jsx
<Paging 
	title={title}
	isEnd={isEnd}
	curPage={currentPage}
	totalPage={totalPage}
	loadDataForPaging={this.loadDataForPaging}

	resetPrvScrollTop={currentPage}
	resetPage = {resetPage}
>
	<List 
		itemArr={itemArr[currentPage] || []}
		itemObj={itemObj}
		selectArr={selectArr}
		actions={this.actions}
	/>
	{/*全选之类按钮*/}
	<Btn
		selectArr={selectArr}
		actions={this.actions}
	/>
</Paging>
```