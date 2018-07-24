import React, { Component, Fragment } from 'react';
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

export default Basic;
