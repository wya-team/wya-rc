import React from 'react';
import { mount } from 'enzyme';

import ToImg from '../index.js';

describe('ToImg.js', () => {
	test('default props', () => {
		const $ = mount(
			<ToImg />
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