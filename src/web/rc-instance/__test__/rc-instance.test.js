import React from 'react';
import { mount } from 'enzyme';

import clean from '../index.js';

describe('clean.js', () => {
	test('default', () => {

		expect(typeof clean).toBe('object');
	});
});