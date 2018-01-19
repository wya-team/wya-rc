import React from 'react';
import { mount } from 'enzyme';

import createPrint from '../index.js';

describe('Print.js', () => {
	test('default props', () => {
		const $ = createPrint();
		expect(typeof $ === 'function').toBe(true);
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