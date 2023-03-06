import { configureStore } from '@reduxjs/toolkit';

import userSlice, { userSliceName } from '../slices/userSlice';
import coursesSlice, { coursesSliceName } from '../slices/courseSlice';
import authorsSlice, { authorsSliceName } from '../slices/authorsSlice';

export const store = configureStore({
	reducer: {
		[userSliceName]: userSlice,
		[coursesSliceName]: coursesSlice,
		[authorsSliceName]: authorsSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
