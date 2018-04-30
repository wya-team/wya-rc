import React from 'react';
import { mount } from 'enzyme';

import Portal from '../index.js';

describe('Portal.js', () => {
	test('default props', () => {
		const $ = mount(
			<Portal />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('Portal');
		// // default props
		// expect($.props().style).toEqual({});

	});
});