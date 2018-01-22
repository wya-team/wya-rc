import React from 'react';
import { mount } from 'enzyme';

import PullScroll from '../index.js';

describe('PullScroll.js', () => {
	test('default props', () => {
		const $ = mount(
			<PullScroll />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('PullScroll');
		// // default props
		// expect($.props().style).toEqual({});

	});
});