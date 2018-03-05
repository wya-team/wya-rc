import React from 'react';
import { mount } from 'enzyme';

import DebounceClick from '../index.js';

describe('DebounceClick.js', () => {
	test('default props', () => {
		const $ = mount(
			<DebounceClick />
		);

		expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('tpl');
		// // default props
		// expect($.props().style).toEqual({});

	});
});
