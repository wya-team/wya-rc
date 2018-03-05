import React from 'react';
import { mount } from 'enzyme';

import DebounceButton from '../index.js';

describe('DebounceButton.js', () => {
	test('default props', () => {
		const $ = mount(
			<DebounceButton />
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
