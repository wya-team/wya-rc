import React from 'react';
import { mount } from 'enzyme';

import PSortList from '../index.js';

describe('PSortList.js', () => {
	test('default props', () => {
		const $ = mount(
			<PSortList value="sort">
				<button>PSortList的__test__</button>
			</PSortList>
		);

		expect($.exists()).toBe(true);

	});
});