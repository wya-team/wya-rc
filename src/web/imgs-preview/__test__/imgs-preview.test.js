import React from 'react';
import { mount } from 'enzyme';

import ImgsPreview from '../index.js';

describe('ImgsPreview.js', () => {
	test('default props', () => {
		const $ = mount(
			<ImgsPreview />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('ImgsPreview');
		// // default props
		// expect($.props().style).toEqual({});

	});
});