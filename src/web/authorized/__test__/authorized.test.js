import React from 'react';
import { mount } from 'enzyme';

import Authorized from '../index.js';

describe('Authorized.js', () => {
	test('default props', () => {
		const $ = mount(
			<Authorized />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('Authorized');
		// // default props
		// expect($.props().style).toEqual({});

	});
});