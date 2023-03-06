import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import { authorizeThunk } from './redux/slices/userSlice';
import { RootState } from './types';
import { useAppSelector, useAppDispatch } from './redux/store/storeHook';

function App() {
	const user = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const token = localStorage.getItem('user_token');

	useEffect(() => {
		// 	if (token !== null) {
		// 		if (!user.isAuth) {
		// 			dispatch(authorizeThunk());
		// 		}
		// 	} else if (pathname !== '/registration') {
		// 		navigate('/login', { replace: true });
		// 	}
		// 	return function cleanupToken() {
		// 		window.localStorage.removeItem('user_token');
		// 	};
		// }, [dispatch, navigate, pathname, token, user.isAuth]);
	}, []);

	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
