# wya-rc
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

## [Demo](https://wya-team.github.io/wya-rc/dist/index.html)

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
### 实例
- [`RcInstance: 上下文传递`](https://github.com/wya-team/wya-rc/tree/master/src/web/rc-instance/)
### 通用（移动优先）
- [`AsyncComponent: 异步加载组件`](https://github.com/wya-team/wya-rc/tree/master/src/web/async-component/)
- [`BetterScroll: 取代原生滚动`](https://github.com/wya-team/wya-rc/tree/master/src/web/better-scroll/)
- [`Calendar: 日历组件`](https://github.com/wya-team/wya-rc/tree/master/src/web/calendar/)
- [`Copy: 复制`](https://github.com/wya-team/wya-rc/tree/master/src/web/copy/)
- [`CreateAccordion: 手风琴`](https://github.com/wya-team/wya-rc/tree/master/src/web/create-accordion/)
- [`CreateLanguage: 语言包`](https://github.com/wya-team/wya-rc/tree/master/src/web/create-language/)
- [`CreatePrint: 打印`](https://github.com/wya-team/wya-rc/tree/master/src/web/create-print/)
- [`DebounceClick: click防抖`](https://github.com/wya-team/wya-rc/tree/master/src/web/debounce-click/)
- [`DownCount: 倒计时`](https://github.com/wya-team/wya-rc/tree/master/src/web/down-count/)
- [`Echarts: 按需加载echartjs，组件`](https://github.com/wya-team/wya-rc/tree/master/src/web/echarts/)
- [`Editor: 富文本`](https://github.com/wya-team/wya-rc/tree/master/src/web/editor/)
- [`ImgsCrop: 图片裁剪`](https://github.com/wya-team/wya-rc/tree/master/src/web/imgs-crop/)
- [`ImgsPicker: 图片上传`](https://github.com/wya-team/wya-rc/tree/master/src/web/imgs-picker/)
- [`ImgsPreview: 图片预览`](https://github.com/wya-team/wya-rc/tree/master/src/web/imgs-preview/)
- [`Paging: 分页`](https://github.com/wya-team/wya-rc/tree/master/src/web/paging/)
- [`PullScroll: 下拉刷新-上滑加载`](https://github.com/wya-team/wya-rc/tree/master/src/web/pull-scroll/)
- [`SetTitle: 设置头部，记忆滚动`](https://github.com/wya-team/wya-rc/tree/master/src/web/set-title/)
- [`Swiper: 走马灯`](https://github.com/wya-team/wya-rc/tree/master/src/web/swiper/)
- [`Upload: 上传`](https://github.com/wya-team/wya-rc/tree/master/src/web/upload/)

### Mobile - 移动端
- [`MPopup: 弹出层`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-popup/)
- [`MSelector: 联动选择器`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-selector/)
- [`MSharePopup: 分享收藏弹窗`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-share-popup/)
- [`MTabs: 移动端Tabs`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-tabs/)
- [`MToasts: 轻提示`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-toasts/)
- [`MTouch: 手势组件`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-touch/)
- [`MModals: 移动端模态框`](https://github.com/wya-team/wya-rc/tree/master/src/web/m-modals/)

### PC - PC端
- [`PTabs: PC端tabs`](https://github.com/wya-team/wya-rc/tree/master/src/web/p-tabs/)
- [`PPopup: 弹出层`](https://github.com/wya-team/wya-rc/tree/master/src/web/p-popup/)
- [`PGallery: 图片库`](https://github.com/wya-team/wya-rc/tree/master/src/web/p-gallery/)
- [`PSortList: 拖拽`](https://github.com/wya-team/wya-rc/tree/master/src/web/p-sort-list/)


<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-rc.svg
[npm-url]: https://www.npmjs.com/package/wya-rc
