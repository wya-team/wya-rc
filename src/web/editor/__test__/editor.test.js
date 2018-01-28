import React from 'react';
import { mount } from 'enzyme';

import Editor from '../index.js';

describe('Editor.js', () => {
	test('default props', () => {
		const $ = mount(
			<Editor />
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