import React from 'react';
import { mount } from 'enzyme';

import Mtabs from '../index.js';

describe('Mtabs.js', () => {
	test('default props', () => {
		const $ = mount(
			<Mtabs />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('Mtabs');
		// // default props
		// expect($.props().style).toEqual({});

	});
});