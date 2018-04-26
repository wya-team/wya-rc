import React from 'react';
import { mount } from 'enzyme';

import RootSibling from '../index.js';

describe('RootSibling.js', () => {
	test('default props', () => {
		const $ = mount(
			<RootSibling />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('RootSibling');
		// // default props
		// expect($.props().style).toEqual({});

	});
});