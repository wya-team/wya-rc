import React from "react";
import CreateMultiContext from '../../index';

export const ThemeContext = React.createContext("高亮");
export const LangContext = React.createContext("中文");
export const createThemeAndLang = (opts = {}) => {
	return CreateMultiContext({
		theme: ThemeContext,
		lang: LangContext
	});
};
