import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

import { formatDate, formatTime } from '../../helpers/functions';
import { RootState } from '../../types';
import { Course } from '../../redux/slices/courseSlice';
import { Author } from '../../redux/slices/authorsSlice';
import { H1 } from '../../common/Title';

function CourseInfo() {
	let { courseId } = useParams();
	const courses = useSelector((state: RootState) => state.courses.courses);
	const authors = useSelector((state: RootState) => state.authors.authors);
	const course = courses.filter((course: Course) => course.id === courseId)[0];

	return (
		<Box p={3}>
			<Link to='/courses'>{'<'} Back to courses</Link>
			<Paper className='my-2 p-2'>
				{/* <h1 style={{ display: 'table', margin: '10px auto 20px' }}>
					{course.title}
				</h1> */}
				<H1 text={course?.title}></H1>
				<Grid container spacing={2}>
					<Grid item md={7}>
						<div className='p-2'>
							<p>long description...</p>
						</div>
					</Grid>
					<Grid item md={5}>
						<div id='courseId'>
							<b>ID:&nbsp;&nbsp;</b>
							<span>{course?.id}</span>
						</div>
						<div id='duration'>
							<b>Duration:&nbsp;&nbsp;</b>
							<span>{formatTime(course?.duration) + ' hours'}</span>
						</div>
						<div id='created'>
							<b>Created:&nbsp;&nbsp;</b>
							<span>{formatDate(course?.creationDate)}</span>
						</div>
						<div id='authors'>
							<b>Authors:&nbsp;&nbsp;</b>
							<div className='ml-2'>
								{course?.authors.map((id: string) => (
									<div key={id}>
										{
											authors.filter((author: Author) => author.id === id)[0]
												.name
										}
									</div>
								))}
							</div>
						</div>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}

export default CourseInfo;
