## [Demo Basic](https://wya-team.github.io/wya-rc/dist/web/create-multi-context/Basic.html)
## 功能
便捷`createContext`的使用方式

## 基础用法

```jsx
// 声明
import React from "react";
import { CreateMultiContext } from 'wya-rc';

export const ThemeContext = React.createContext("高亮");
export const LangContext = React.createContext("中文");
export const createThemeAndLang = (opts = {}) => {
	return CreateMultiContext({
		theme: ThemeContext,
		lang: LangContext
	});
};

// 调用
import { ThemeContext, LangContext, createThemeAndLang } from './Basic/context';

@createThemeAndLang({})
class ShowStatus extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { theme, lang, title } = this.props;
		return (
			<div>
				{title} ->
				lang: {lang}
				theme: {theme}
				<br />
			</div>
		);
	}
}

// 不只是使用默认值，使用 Provider

class Basic extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { theme, lang } = this.props;
		return (
			<Fragment>
				<ShowStatus title="默认值" />
				<ThemeContext.Provider value="夜间">
					<LangContext.Provider value="繁体中文">
						<ShowStatus  title="Provider" />
					</LangContext.Provider>
				</ThemeContext.Provider>
			</Fragment>
		);
	}
}

```
