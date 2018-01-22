import React from 'react';
import { mount } from 'enzyme';

import MPopup from '../index.js';

describe('MPopup.js', () => {
	test('default props', () => {
		const $ = mount(
			<MPopup />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('tpl');
		// // default props
		// expect($.props().style).toEqual({});

	});
});