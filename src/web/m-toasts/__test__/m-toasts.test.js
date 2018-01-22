import React from 'react';
import { mount } from 'enzyme';

import MToasts from '../index.js';

describe('MToasts.js', () => {
	test('default props', () => {
		const $ = mount(
			<MToasts />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('MToasts');
		// // default props
		// expect($.props().style).toEqual({});

	});
});