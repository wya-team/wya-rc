import React from 'react';
import { mount } from 'enzyme';

import createPortalComponent from '../index.js';

describe('createPortalComponent.js', () => {
	test('default props', () => {
		const $ = createPortalComponent();
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
