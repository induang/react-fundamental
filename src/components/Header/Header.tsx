import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Grid, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/store/storeHook';

import { RootState } from '../../types';
import {
	authorizeThunk,
	logoutThunk,
	UserState,
	prepareForLogout,
} from '../../redux/slices/userSlice';

import LOGO from './components/Logo/Logo';
import { useEffect } from 'react';

function Header() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const user = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const handleLOGOUTClick = () => {
		dispatch(prepareForLogout());
		dispatch(logoutThunk());
		navigate('/login');
	};

	useEffect(() => {
		if (user.isAuth) dispatch(authorizeThunk());
	}, [user.isAuth]);

	return (
		<Box m={1}>
			<Grid
				container
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Grid item>
					<LOGO />
				</Grid>
				<Grid item>
					<span style={{ fontSize: '20px' }} data-testid='test'>
						{user.isAuth && pathname !== '/registration' ? user.name : ' '}
					</span>
					<LogoutButton
						handleLOGOUTClick={handleLOGOUTClick}
						user={user}
						pathname={pathname}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
interface LogoutButtonProps {
	handleLOGOUTClick: () => void;
	user: UserState;
	pathname: string;
}

const LogoutButton = ({
	handleLOGOUTClick,
	user,
	pathname,
}: LogoutButtonProps) => {
	if (!user.isAuth || pathname === '/registration') {
		return <></>;
	} else {
		return (
			<Button
				variant='outlined'
				color='secondary'
				sx={{ ml: '20px' }}
				onClick={handleLOGOUTClick}
			>
				LOGOUT
			</Button>
		);
	}
};

export default Header;
