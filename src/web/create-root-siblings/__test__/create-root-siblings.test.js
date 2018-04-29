import React from 'react';
import { mount } from 'enzyme';

import createRootSilblings from '../index.js';

describe('createRootSilblings.js', () => {
	test('default props', () => {
		const $ = createRootSilblings();
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