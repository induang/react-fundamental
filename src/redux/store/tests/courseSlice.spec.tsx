import { describe, expect, it } from '@jest/globals';
import reducer from '../../slices/courseSlice';

describe('test courses slice', () => {
	it('return the initial state', () => {
		const initialState = undefined;
		const action = { type: '' };
		const result = reducer(initialState, action);
		expect(result).toEqual({ courses: [] });
	});

	it('handle saveCourse and returns new state', () => {
		const initialState = undefined;
		const action = { type: 'saveCourse' };
		const result = reducer(initialState, action);
		expect(result).toEqual({ courses: [] });
	});
});
