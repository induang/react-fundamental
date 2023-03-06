import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import { RootState } from '../../redux/store/store';
import userSlice from '../../redux/slices/userSlice';
import courseSlice from '../../redux/slices/courseSlice';
import authorsSlice from '../../redux/slices/authorsSlice';

import {
	mockedUser,
	mockedCourse,
	mockedAuthor_1,
	mockedAuthor_2,
} from './mockData';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: ToolkitStore;
}
export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {
			user: mockedUser,
			courses: {
				courses: [mockedCourse],
			},
			authors: {
				authors: [mockedAuthor_1, mockedAuthor_2],
			},
		},
		store = configureStore({
			reducer: { user: userSlice, courses: courseSlice, authors: authorsSlice },
			preloadedState,
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
