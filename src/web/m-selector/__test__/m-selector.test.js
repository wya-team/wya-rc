import React from 'react';
import { mount } from 'enzyme';

import MSelector from '../index.js';

describe('MSelector.js', () => {
	test('default props', () => {
		const $ = mount(
			<MSelector />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('MSelector');
		// // default props
		// expect($.props().style).toEqual({});

	});
});