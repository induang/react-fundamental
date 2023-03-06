import { Navigate } from 'react-router-dom';
import { RootState } from '../../types';
import { useAppSelector } from '../../redux/store/storeHook';

export default function Auth({ children }: { children: JSX.Element }) {
	const user = useAppSelector((state: RootState) => state.user);
	const accessRole = user.role;
	if (accessRole === 'admin') {
		return children;
	} else {
		alert('sorry, only admin access');
		return <Navigate to='/courses' replace />;
	}
}
