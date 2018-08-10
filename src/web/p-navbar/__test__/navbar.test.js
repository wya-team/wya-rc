import React from 'react';
import { mount } from 'enzyme';

import NavBar from '../index.js';

describe('NavBar.js', () => {
	test('default props', () => {
		const $ = mount(
			<NavBar />
		);

	});
});