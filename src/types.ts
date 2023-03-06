import { ThunkAction, Action } from '@reduxjs/toolkit';
import { store } from './redux/store/store';

export interface ILoginer {
	email: string;
	password: string;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
