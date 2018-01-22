import React from 'react';
import { mount } from 'enzyme';

import ImgsPicker from '../index.js';

describe('ImgsPicker.js', () => {
	test('default props', () => {
		const $ = mount(
			<ImgsPicker />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('ImgsPicker');
		// // default props
		// expect($.props().style).toEqual({});

	});
});