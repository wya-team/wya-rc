## 功能
点击事件防抖处理

## 待开发

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
wait | 延迟的时间 | number | 250
tag | 标签名 | `string` 或 `func` | `div`

## 基础用法

```jsx
<DebounceClick wait={250} onClick={this.handleClick}>
	Button
</DebounceClick>
```
