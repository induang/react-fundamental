export const fetchCoursesData = async () => {
	try {
		const response = await fetch('http://localhost:4000/courses/all');
		if (!response.ok) throw new Error('Get courses failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchLoginData = async (loginer) => {
	try {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(loginer),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) throw new Error('Login failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchRegistrationData = async (newUser) => {
	try {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) throw new Error('Registration failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchAuthorsData = async () => {
	try {
		const response = await fetch('http://localhost:4000/authors/all');
		if (!response.ok) throw new Error('Get Authors failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchAddCourse = async (newCourse) => {
	try {
		const response = await fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			body: JSON.stringify(newCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Add course failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchAuthorization = async () => {
	try {
		const response = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Authorization failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchLogout = async () => {
	try {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response) throw new Error('Logout failed.');
	} catch (e) {
		alert(e);
	}
};

export const fetchDeleteCourse = async (courseID) => {
	try {
		const response = await fetch(`http://localhost:4000/courses/${courseID}`, {
			method: 'DELETE',
			headers: {
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Delete course failed.');
	} catch (e) {
		alert(e);
	}
};

export const fetchAddAuthor = async (authorName) => {
	try {
		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			body: JSON.stringify({ name: authorName }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Add author failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchUpdateCourse = async (course) => {
	try {
		const response = await fetch(`http://localhost:4000/courses/${course.id}`, {
			method: 'PUT',
			body: JSON.stringify(course),
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Update course failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};
