import React from 'react';
import { mount } from 'enzyme';

import PTabs from '../index.js';

describe('PTabs.js', () => {
	test('default props', () => {
		const $ = mount(
			<PTabs />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('PTabs');
		// // default props
		// expect($.props().style).toEqual({});

	});
});