import React from 'react';
import { mount } from 'enzyme';

import Pipe from '../index.js';

describe('Pipe.js', () => {
	test('default props', () => {
		const $ = mount(
			<Pipe />
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