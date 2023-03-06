import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Paper, Grid, Button, Box } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import { H1 } from '../../../../common/Title';
import { RootState } from '../../../../types';
import {
	Course,
	deleteCourseThunk,
} from '../../../../redux/slices/courseSlice';
import { Author, getAuthorsThunk } from '../../../../redux/slices/authorsSlice';
import { formatTime, formatDate } from '../../../../helpers/functions';
import {
	useAppSelector,
	useAppDispatch,
} from '../../../../redux/store/storeHook';

type CourseCardProps = {
	course: Course;
};

function CourseCard({ course }: CourseCardProps) {
	const user = useAppSelector((state: RootState) => state.user);
	const authors = useAppSelector((state: RootState) => state.authors.authors);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleDeleteCourseClick = (id: string) => {
		dispatch(deleteCourseThunk(id));
	};

	useEffect(() => {
		dispatch(getAuthorsThunk());
	}, []);

	return (
		<Paper elevation={2} className='my-1 p-1'>
			<Grid container spacing={2} className='p-5'>
				<Grid item md={7}>
					<H1 text={course.title} />
					<div className='w-11/12 indent-2'>{course.description}</div>
				</Grid>
				<Grid item md={5} className='flex-col justify-center'>
					<div id='author' className='w-80 truncate'>
						<b>Authors:&nbsp;&nbsp;</b>
						{course.authors.map(
							(id) =>
								authors.filter((author: Author) => author.id === id)[0]?.name
						) + ' '}
					</div>
					<div id='durations'>
						<b>Duration:&nbsp;&nbsp;</b>
						{`${formatTime(course.duration)} hours`}
					</div>
					<div id='created'>
						<b>Created:&nbsp;&nbsp;</b>
						{formatDate(course.creationDate)}
					</div>
					<div id='showCourseBtn'>
						<Box>
							<Grid
								container
								className='mt-5 justify-items-center items-center'
							>
								<Grid item>
									<Link to={`${course.id}`}>
										<Button variant='outlined' color='secondary'>
											Show Courses
										</Button>
									</Link>
								</Grid>
								{user.role === 'admin' ? (
									<Grid item>
										<Button
											color='secondary'
											onClick={() => navigate(`/courses/update/${course.id}`)}
										>
											<EditRoundedIcon />
										</Button>
									</Grid>
								) : (
									<></>
								)}
								{user.role === 'admin' ? (
									<Grid item>
										<Button
											color='secondary'
											onClick={() => handleDeleteCourseClick(course.id)}
										>
											<DeleteIcon />
										</Button>
									</Grid>
								) : (
									<></>
								)}
							</Grid>
						</Box>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default CourseCard;
