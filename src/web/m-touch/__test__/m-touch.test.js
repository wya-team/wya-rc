import React from 'react';
import { mount } from 'enzyme';

import MTouch from '../index.js';

describe('MTouch.js', () => {
	test('default props', () => {
		const $ = mount(
			<MTouch />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('MTouch');
		// // default props
		// expect($.props().style).toEqual({});

	});
});