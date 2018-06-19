## 功能
日历（手机端和PC端通用）

## 待开发

- 过渡动画；
- 农历月份；


## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
className | 日历样式 | string | -
weekClassName | 星期样式 | string | -
selected | 选中的日期(2018-01-01) | string | 
renderRow | 日期Item | func | -

## 基础用法

```jsx
<Calendar
	ref="calendar"
/>


this.refs.calendar.prev()
this.refs.calendar.next()
this.refs.calendar.setDate(2018, 11)
```
