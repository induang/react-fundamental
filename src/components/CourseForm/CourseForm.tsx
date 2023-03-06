import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { Grid, TextField, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/store/storeHook';

import { RootState } from '../../types';
import {
	Course,
	saveCourseThunk,
	updateCourseThunk,
} from '../../redux/slices/courseSlice';
import {
	Author,
	getAuthorsThunk,
	saveAuthorThunk,
} from '../../redux/slices/authorsSlice';
import { formatTime, createTodayDate } from '../../helpers/functions';

import AuthorSection from './components/AuthorSection/AuthorSection';

import { H4, CH2 } from '../../common/Title';

function CourseForm() {
	let { courseId } = useParams();
	const courses = useAppSelector((state: RootState) => state.courses.courses);
	const authors = useAppSelector((state: RootState) => state.authors.authors);
	const emptyAuthors: Author[] = [];
	const dispatch = useAppDispatch();
	const currentCourse = courses.filter(
		(course: Course) => course.id === courseId
	)[0];

	const [newAuthorName, setNewAuthorName] = useState('');
	const [currentAuthors, setCurrentAuthors] = useState(emptyAuthors);
	const [courseAuthors, setCourseAuthors] = useState(emptyAuthors);

	const [title, setTitle] = useState(currentCourse?.title || '');
	const [description, setDescription] = useState(
		currentCourse?.description || ''
	);
	const [duration, setDuration] = useState(
		currentCourse?.duration.toString() || ''
	);

	const navigate = useNavigate();

	const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewAuthorName(e.target.value);
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);
	const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.match(/^[0-9]*$/))
			alert('the duration time must be number');
		else setDuration(e.target.value);
	};

	const handleCreateAuthorClick = () => {
		if (newAuthorName === '') {
			alert('The author name can not be empty!');
		} else {
			dispatch(saveAuthorThunk(newAuthorName));
			// setCurrentAuthors([...currentAuthors, newAuthor]);
			setNewAuthorName('');
		}
	};
	const handleAddAuthorClick = (id: string) => {
		console.log('courseAuthors: ', typeof courseAuthors);
		setCourseAuthors([
			...courseAuthors,
			currentAuthors.filter(
				(currentAuthor: Author) => currentAuthor.id === id
			)[0],
		]);
		setCurrentAuthors(
			currentAuthors.filter((author: Author) => author.id !== id)
		);
	};
	const handleDeleteAuthorClick = (id: string) => {
		setCurrentAuthors([
			...currentAuthors,
			courseAuthors.filter((courseAuthor: Author) => courseAuthor.id === id)[0],
		]);
		setCourseAuthors(
			courseAuthors.filter((courseAuthor: Author) => courseAuthor.id !== id)
		);
	};
	const handleCreateCourseClick = async () => {
		if (
			title === '' ||
			description === '' ||
			!duration.match(/^[0-9]*$/) ||
			courseAuthors.length <= 0
		) {
			alert(
				`course title
and description
and duration 
and authors 
can not be empty.`
			);
		} else {
			let date = createTodayDate();
			let newCourse = {
				title: title,
				description: description,
				creationDate: date,
				duration: parseInt(duration),
				authors: courseAuthors.map((author: Author) => author.id),
			};
			console.log('NEWCOURSE: ', newCourse);
			if (currentCourse) {
				dispatch(updateCourseThunk({ ...newCourse, id: currentCourse.id }));
			} else {
				dispatch(saveCourseThunk(newCourse));
			}
			navigate('/courses');
		}
	};

	useEffect(() => {
		dispatch(getAuthorsThunk());
	}, []);

	useEffect(() => {
		setCourseAuthors(
			currentCourse?.authors.map(
				(id) => authors.filter((author) => author.id === id)[0]
			) ||
				courseAuthors ||
				[]
		);
		setCurrentAuthors(
			authors.filter(
				(author) =>
					courseAuthors?.findIndex(
						(courseAuthor) => courseAuthor.id === author.id
					) === -1
			)
		);
	}, [authors]);

	return (
		<Box p={3}>
			{/* Title 部分 */}
			<Box>
				<H4 text='Title :' />
				<Grid container className='flex justify-between mb-6'>
					<Grid item>
						<TextField
							label='Title'
							size='small'
							value={title}
							onChange={handleTitleChange}
						/>
					</Grid>
					<Grid item>
						<Button
							variant='outlined'
							color='secondary'
							onClick={handleCreateCourseClick}
						>
							create course
						</Button>
					</Grid>
				</Grid>
			</Box>
			{/* Description 部分 */}
			<Box>
				<H4 text='Description :' />
				<TextField
					fullWidth
					multiline
					rows={5}
					value={description}
					onChange={handleDescriptionChange}
				/>
			</Box>
			{/* Author 部分 */}
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						{/* 添加作者 */}
						<Box>
							<CH2 text='Add Author' />
							<H4 text='Author name :' />
							<TextField
								label='Author name'
								size='small'
								fullWidth
								value={newAuthorName}
								onChange={handleAuthorNameChange}
							/>
							<div className='table m-auto mt-8'>
								<Button
									variant='outlined'
									color='secondary'
									onClick={handleCreateAuthorClick}
								>
									Create author
								</Button>
							</div>
						</Box>
						{/* 设置持续时间 */}
						<Box>
							<CH2 text='Duration' />
							<H4 text='Duration :' />
							<TextField
								error={duration.length > 0 && !duration.match(/^[0-9]*$/)}
								helperText='Only Number'
								label='Duration'
								size='small'
								fullWidth
								value={duration}
								onChange={handleDurationChange}
							/>
							<div className='text-3xl mt-8'>
								Duration:&nbsp;
								<b>{duration === '' ? '0' : formatTime(parseInt(duration))}</b>
								&nbsp;Hours
							</div>
						</Box>
					</Grid>
					<Grid item xs={6} className='flex justify-center'>
						{/* 作者列表 */}
						<AuthorSection
							currentAuthors={currentAuthors}
							handleAddAuthorClick={handleAddAuthorClick}
							courseAuthors={courseAuthors}
							handleDeleteAuthorClick={handleDeleteAuthorClick}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default CourseForm;
