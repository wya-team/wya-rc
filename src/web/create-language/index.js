
import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (opts = {}) => WrappedComponent => {
	return class CreateLanguageDecorated extends Component {
		constructor() {
			super();
			this.displayName = `CreateLanguage${getDisplayName(WrappedComponent)}`;
		}

		render() {
			opts = { locale: zh_CN, ...opts };
			return (
				<LocaleProvider {...opts}>
					<WrappedComponent {...this.props} ref="WrappedComponent" />
				</LocaleProvider>
			);
		}
	};
};