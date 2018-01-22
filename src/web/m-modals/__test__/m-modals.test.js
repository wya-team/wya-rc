import React from 'react';
import { mount } from 'enzyme';

import MModals from '../index.js';

describe('MModals.js', () => {
	test('default props', () => {
		const $ = mount(
			<MModals />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('MModals');
		// // default props
		// expect($.props().style).toEqual({});

	});
});