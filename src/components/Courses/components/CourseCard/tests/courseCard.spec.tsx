import { describe, it } from '@jest/globals';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../../../../mock/mockUtils';
import {
	mockedCourse,
	mockedAuthor_1,
	mockedAuthor_2,
} from '../../../../mock/mockData';
import CourseCard from '../CourseCard';
import '@testing-library/jest-dom';
import { formatDate, formatTime } from '../../../../../helpers/functions';

jest.mock('../../../../../services', () => {
	return {
		async fetchAddAuthor() {
			return {
				result: {
					mockedAuthor_1,
				},
			};
		},
		async fetchAuthorsData() {
			return {
				result: [mockedAuthor_1, mockedAuthor_2],
			};
		},
	};
});

window.alert = jest.fn(() => ({}));

describe('render courseCard', () => {
	it('render correctly', () => {
		const { container, debug } = renderWithProviders(
			<Router>
				<CourseCard {...{ course: mockedCourse }} />
			</Router>
		);
		debug();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('display course title', () => {
		const { getByRole } = renderWithProviders(
			<Router>
				<CourseCard {...{ course: mockedCourse }} />
			</Router>
		);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent(
			mockedCourse.title
		);
	});

	it('display course description', () => {
		const { getByText } = renderWithProviders(
			<Router>
				<CourseCard {...{ course: mockedCourse }} />
			</Router>
		);
		expect(getByText(mockedCourse.description)).toBeTruthy();
	});

	it('display duration in the correct format', () => {
		const { queryByText } = renderWithProviders(
			<Router>
				<CourseCard {...{ course: mockedCourse }} />
			</Router>
		);
		expect(queryByText(/duration/i)?.parentElement).toHaveTextContent(
			formatTime(mockedCourse.duration)
		);
	});
	it('display authors list', () => {
		expect.assertions(2);
		const { queryByText } = renderWithProviders(
			<Router>
				<CourseCard {...{ course: mockedCourse }} />
			</Router>
		);
		let author = mockedAuthor_1.name;
		expect(queryByText(/Authors:/)?.parentElement).toHaveTextContent(
			new RegExp(author, 'i')
		);
		author = mockedAuthor_2.name;
		expect(queryByText(/Authors:/)?.parentElement).toHaveTextContent(
			new RegExp(author, 'i')
		);
	});

	it('display created date in the correct format', () => {
		const { queryByText } = renderWithProviders(
			<Router>
				<CourseCard {...{ course: mockedCourse }} />
			</Router>
		);
		expect(queryByText(/Created:/)?.parentElement).toHaveTextContent(
			formatDate(mockedCourse.creationDate)
		);
	});
});
