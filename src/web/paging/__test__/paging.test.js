import React from 'react';
import { mount } from 'enzyme';

import Paging from '../index.js';

describe('Paging.js', () => {
	test('default props', () => {
		const $ = mount(
			<Paging />
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