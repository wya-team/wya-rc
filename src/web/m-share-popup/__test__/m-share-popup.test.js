import React from 'react';
import { mount } from 'enzyme';

import MSharePopup from '../index.js';

describe('MSharePopup.js', () => {
	test('default props', () => {
		const $ = mount(
			<MSharePopup />
		);

		// expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('MSharePopup');
		// // default props
		// expect($.props().style).toEqual({});

	});
});