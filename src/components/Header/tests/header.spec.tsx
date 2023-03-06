import { describe, it } from '@jest/globals';
import Header from '../Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../../mock/mockUtils';
import '@testing-library/jest-dom';

window.alert = jest.fn(() => ({}));

jest.mock('../../../services', () => {
	return {
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

describe('render header', () => {
	it('render correctly', async () => {
		const { container } = renderWithProviders(
			<Router>
				<Header />
			</Router>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('show Logo img', () => {
		const { queryByAltText } = renderWithProviders(
			<Router>
				<Header />
			</Router>
		);
		expect(queryByAltText('logo')).toBeTruthy();
	});

	it('show user name', () => {
		const { queryAllByRole } = renderWithProviders(
			<Router>
				<Header />
			</Router>
		);
		expect(queryAllByRole('generic')[0]).toHaveTextContent('TestName');
	});
});
