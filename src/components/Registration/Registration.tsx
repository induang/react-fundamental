import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

import { fetchRegistrationData } from '../../services';

import { H2, H4 } from '../../common/Title';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	let navigate = useNavigate();

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleRegistrationClick = async () => {
		const newUser = {
			name: name,
			password: password,
			email: email,
		};
		let { successful } = await fetchRegistrationData(newUser);
		if (successful) navigate('/login');
	};

	return (
		<Box className='flex flex-col w-96 m-auto gap-4'>
			<H2 text='Registration' />
			<H4 text='Name' />
			<TextField
				variant='outlined'
				label='Enter name'
				size='small'
				value={name}
				onChange={handleNameChange}
			/>
			<H4 text='Email' />
			<TextField
				error={
					email.length > 0 &&
					// eslint-disable-next-line no-useless-escape
					!email.match(/^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/)
				}
				variant='outlined'
				label='Enter email'
				size='small'
				value={email}
				onChange={handleEmailChange}
			/>
			<H4 text='Password' />
			<TextField
				variant='outlined'
				label='Enter password'
				size='small'
				type='password'
				value={password}
				onChange={handlePasswordChange}
			/>

			<p>
				<Button
					variant='outlined'
					color='secondary'
					onClick={handleRegistrationClick}
				>
					Registration
				</Button>
			</p>
			<p>
				If you have an account you can{' '}
				<Link to='/login' className='text-purple-600'>
					Login
				</Link>
			</p>
		</Box>
	);
}

export default Registration;
