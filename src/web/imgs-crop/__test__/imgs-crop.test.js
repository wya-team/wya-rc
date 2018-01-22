import React from 'react';
import { mount } from 'enzyme';

import ImgsCrop from '../index.js';

describe('ImgsCrop.js', () => {
	test('default props', () => {
		const $ = mount(
			<ImgsCrop />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('ImgsCrop');
		// // default props
		// expect($.props().style).toEqual({});

	});
});