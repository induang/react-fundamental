import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Registration from '../components/Registration/Registration';
import Login from '../components/Login/Login';
import Courses from '../components/Courses/Courses';
import CourseForm from '../components/CourseForm/CourseForm';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import RequireAuth from '../components/PrivateRoute/PrivateRoute';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const requireCourseForm = (children: ReactJSXElement) => (
	<RequireAuth>{children}</RequireAuth>
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Login /> },
			{
				path: 'registration',
				element: <Registration />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'courses',
				element: <Courses />,
			},
			{
				path: 'courses/:courseId',
				element: <CourseInfo />,
			},
			{
				path: 'courses/add',
				// element: <CourseForm />,
				element: requireCourseForm(<CourseForm />),
			},
			{
				path: 'courses/update/:courseId',
				element: requireCourseForm(<CourseForm />),
			},
		],
	},
]);

export default router;
