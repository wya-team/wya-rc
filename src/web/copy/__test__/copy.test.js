import React from 'react';
import { mount } from 'enzyme';

import Copy from '../index.js';

describe('Copy.js', () => {
	test('default props', () => {
		const $ = mount(
			<Copy value="test">
				<button>点我复制</button>
			</Copy>
		);

		expect($.exists()).toBe(true);

		// expect($.find('div').length).toBe(1);

		// // root tag
		// expect($.getDOMNode().nodeName.toLowerCase()).toEqual('div');
		// // // class name
		// expect($.getDOMNode().className).toBe('tpl');
		// // default props
		// expect($.props().style).toEqual({});

	});
});