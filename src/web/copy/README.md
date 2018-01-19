## 功能
复制内容

## API
属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 复制的文本内容 | `any` | -
onCopyBefore | 复制前的操作, 要求返回`Promise` | `(e) => Promise` | -
onCopyAfter | 复制后的操作 | `() => void` | -
isReplace | onCopyBefore 之后是否重新赋值给value | `bool` | false

