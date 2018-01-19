# wya-rc
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

## 安装

```vim
npm install wya-rc --save
```

## 使用方式 => 按需加载，需要安装 `babel-plugin-import`
```vim
npm install babel-plugin-import --save-dev
```
- 配置`.babelrc`
```vim
{
	"plugins": [
		[
			"import",
			[
				{
					"libraryName": "wya-rc",
					"libraryDirectory": "lib/web" // native使用 `lib/native`
				}
			]
		]
	]
}
```

```js
// 调用, 如下：
import { CreatePrint } from 'wya-rc';
```
## 组件（暂时不归类）

- [`CreatePrint`](https://github.com/wya-team/wya-rc/tree/master/src/web/create-print/)
	- 负责打印内容（window.print）
	- CreatePrint(options) => (WrappedComponent) => Component

属性 | 说明 | 类型 | 默认值
---|---|---|---
refName | 需要答应的节点所绑定的ref | `str` | 必填

```jsx
const refName = 'printBox'
@CreatePrint({ refName })
class A extends Components {
	render() {
		<div>
			<div ref={refName}>
				打印内容
			</div>
			<div
				onClick={e => this.props.printProps.setPrint()}
			>点我打印</div>
		</div>
	}
}
```

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-rc.svg
[npm-url]: https://www.npmjs.com/package/wya-rc
