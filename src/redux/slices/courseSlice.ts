import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchAddCourse,
	fetchCoursesData,
	fetchDeleteCourse,
	fetchUpdateCourse,
} from '../../services';
import { AppDispatch } from '../../types';

export interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface INewCourseInfo {
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface CoursesState {
	courses: Course[];
}

const initialState: CoursesState = {
	courses: [],
};

export const coursesSliceName = 'courses';
export const coursesSlice = createSlice({
	name: coursesSliceName,
	initialState,
	reducers: {
		getCourses: (state, { payload }) => {
			const { result } = payload;
			return {
				...state,
				courses: [...result],
			};
		},
		saveCourse: (state) => {
			return { ...state };
		},
		deleteCourse: (state, { payload }) => {
			const { courseID } = payload;
			return {
				...state,
				courses: [
					...state.courses.filter((course: Course) => courseID !== course.id),
				],
			};
		},
		updateCourse: (state) => {},
	},
});

export const { getCourses, saveCourse, deleteCourse, updateCourse } =
	coursesSlice.actions;

export default coursesSlice.reducer;

export const saveCourseAsyncThunk = createAsyncThunk(
	'',
	async (course: INewCourseInfo, thunkAPI) => {
		const { result } = await fetchAddCourse(course);
		return { result: result };
	}
);

export const updateCourseAsyncThunk = createAsyncThunk(
	'',
	async (course: Course, thunkAPI) => {
		console.log('Async thunk: ', course);
		await fetchUpdateCourse(course);
	}
);

export const getCoursesThunk = () => async (dispatch: AppDispatch) => {
	const { result } = await fetchCoursesData();
	dispatch(getCourses({ result }));
};

export const saveCourseThunk =
	(course: INewCourseInfo) => async (dispatch: AppDispatch) => {
		await dispatch(saveCourseAsyncThunk(course)).unwrap();
		dispatch(saveCourse());
	};

export const deleteCourseThunk =
	(courseID: string) => async (dispatch: AppDispatch) => {
		await fetchDeleteCourse(courseID);
		dispatch(deleteCourse({ courseID }));
	};

export const updateCourseThunk =
	(course: Course) => async (dispatch: AppDispatch) => {
		console.log('thunk: ', course);
		await dispatch(updateCourseAsyncThunk(course)).unwrap();
		dispatch(updateCourse());
	};
