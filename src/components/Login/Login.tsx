import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store/storeHook';

import { loginThunk } from '../../redux/slices/userSlice';

import { RootState } from '../../types';
import { H2, H4 } from '../../common/Title';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const curUser = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleLoginClick = () => {
		const loginer = {
			email: email,
			password: password,
		};
		dispatch(loginThunk(loginer));
	};

	useEffect(() => {
		if (curUser.isAuth === true) {
			navigate('/courses');
		}
	}, [curUser.isAuth]);

	return (
		<Box className='flex flex-col w-96 m-auto gap-4'>
			<H2 text='Login'></H2>
			<H4 text='Email'></H4>
			<TextField
				variant='outlined'
				label='Enter email'
				size='small'
				value={email}
				onChange={handleEmailChange}
			/>
			<h4 className='text-lg font-semibold'>Password</h4>
			<TextField
				variant='outlined'
				label='Enter Password'
				size='small'
				type='password'
				value={password}
				onChange={handlePasswordChange}
			/>
			<p>
				<Button variant='outlined' color='secondary' onClick={handleLoginClick}>
					Login
				</Button>
			</p>
			<p>
				If you not have an account you can{' '}
				<Link to='/registration' className='text-purple-600'>
					Registration
				</Link>
			</p>
		</Box>
	);
}

export default Login;
