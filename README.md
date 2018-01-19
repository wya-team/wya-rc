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
import { CreatePrint, Copy } from 'wya-rc';
```
## 组件（暂时不归类）

- [`CreatePrint: 打印`](https://github.com/wya-team/wya-rc/tree/master/src/web/create-print/)
- [`Copy: 复制`](https://github.com/wya-team/wya-rc/tree/master/src/web/copy/)


<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-rc.svg
[npm-url]: https://www.npmjs.com/package/wya-rc
