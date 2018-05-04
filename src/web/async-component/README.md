## 功能
异步加载组件（针对组件进行代码分割）

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
fn | 需要异步的模块执行函数 | `() -> Promise` | -
refName | 实例名 | `string` | {}
opts | 扩展参数 | `obj` | {}

## 其他
属性 | 说明 | 类型 | 默认值
---|---|---|---
onBefore | - | `() -> void` | -
onAfter | - | `() -> void` | -

## 基础用法

```jsx
import { AsyncComponent } from 'wya-rc';
let WrapComponent = AsyncComponent(() => import("./WrapComponent"));
```
