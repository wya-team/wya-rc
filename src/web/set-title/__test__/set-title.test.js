import React from 'react';
import { mount } from 'enzyme';

import SetTitle from '../index.js';

describe('SetTitle.js', () => {
	test('default props', () => {
		const $ = mount(
			<SetTitle />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('SetTitle');
		// // default props
		// expect($.props().style).toEqual({});

	});
});