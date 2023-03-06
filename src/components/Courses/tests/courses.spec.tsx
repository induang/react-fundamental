import { BrowserRouter as Router } from 'react-router-dom';

import { renderWithProviders } from '../../mock/mockUtils';
import {
	mockedAuthor_1,
	mockedAuthor_2,
	mockedCourse,
} from '../../mock/mockData';
import Courses from '../Courses';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

window.alert = jest.fn(() => ({}));
jest.mock('../../../services', () => {
	return {
		async fetchAuthorsData() {
			return {
				result: [mockedAuthor_1, mockedAuthor_2],
			};
		},
		async fetchCoursesData() {
			return {
				result: [mockedCourse],
			};
		},
		async fetchAuthorization() {
			return {
				result: {
					isAuth: true,
					name: 'testName',
					email: 'testName@email.com',
					role: 'admin',
				},
			};
		},
	};
});

describe('render courses', () => {
	it('render correctly', () => {
		const { container } = renderWithProviders(
			<Router>
				<Courses />
			</Router>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('display amount of CourseCard equal length of courses array', () => {
		const { store, queryAllByRole } = renderWithProviders(
			<Router>
				<Courses />
			</Router>
		);
		expect(queryAllByRole('heading', { level: 1 })).toHaveLength(
			store.getState().courses.courses.length
		);
	});
	it('shown after a click on the "Add new Course" button', async () => {
		expect.assertions(6);
		const { getByRole, findByRole } = renderWithProviders(
			<Router>
				<Courses />
			</Router>
		);
		const button = getByRole('button', {
			name: /add new course/i,
		});
		userEvent.click(button);

		await waitFor(() => {
			expect(findByRole('heading', { name: /title/i })).toBeTruthy();
			expect(findByRole('heading', { name: /description/i })).toBeTruthy();
			expect(findByRole('heading', { name: /add author/i })).toBeTruthy();
			expect(findByRole('heading', { name: /duration/i })).toBeTruthy();
			expect(findByRole('heading', { name: /authors/i })).toBeTruthy();
			expect(findByRole('heading', { name: /course authors/i })).toBeTruthy();
		});
	});
});
