/* eslint-disable */
import {
	MY_PROFILE_RETRIEVED,
	MY_PROFILE_RETRIEVAL_FAILED,
	CLEAR_PROFILE,
	PROFILE_SAVED,
	PROFILE_SAVED_FAIL,
	PROFILE_DELETED,
	PROFILE_DELETED_FAIL,
	CLEAR_PROFILE_ALERTS,
	GET_ALL_PROFILES,
	GET_ALL_PROFILES_FAIL,
	LOADING_USER_PROFILE,
	DONE_LOADING_USER_PROFILE,
	FAILED_LOADING_USER_PROFILE,
	USERNAME_RETRIEVED,
	USERNAME_RETRIVAL_FAILED,
	LOADING_MY_PROFILE,
	HAS_PROFILE,
	DONE_LOADING_PROFILE,
	PROFILE_ERROR,
	SAVE_PROFILE_LOADING,
	USERNAME_TAKEN_ERROR,
	TEST_PROFILE_ERROR,
} from './types';
import axios from 'axios';
import setDefaults from './defaults';

if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://whoo-back-end.onrender.com';
}

let clearAlertsTimeout = null;

export const updateProfileImage = () => async (dispatch) => {
	try {
		let res = await axios.get('/api/profile', {
			params: { username: 'webdevlex' },
		});

		let body = {
			url: res.data.pictureUrl,
		};
		const header = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		res = await axios.post('/api/profile/updateMessageProfiles', body, header);
	} catch (err) {
		console.log(err);
	}
};

export const profileDoneLoading = () => (dispatch) => {
	dispatch({
		type: DONE_LOADING_USER_PROFILE,
		payload: null,
	});
};

export const clearAlerts = () => async (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE_ALERTS,
	});
};

export const getMyUsername = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: USERNAME_RETRIEVED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: USERNAME_RETRIVAL_FAILED,
			payload: { msg: err.response.statusText },
		});
	}
};

export const getMyProfile = () => async (dispatch) => {
	dispatch({
		type: LOADING_MY_PROFILE,
	});
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: MY_PROFILE_RETRIEVED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MY_PROFILE_RETRIEVAL_FAILED,
		});
	}
};

export const clearProfile = () => (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
};

export const getProfile = (username) => async (dispatch) => {
	dispatch({
		type: LOADING_USER_PROFILE,
	});

	try {
		const res = await axios.get('/api/profile', {
			params: { username: username },
		});

		dispatch({
			type: DONE_LOADING_USER_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: FAILED_LOADING_USER_PROFILE,
		});
	}

	try {
		await axios.get('/api/profile/me');
		dispatch({
			type: HAS_PROFILE,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText },
		});
	}
};

export const getAllProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/all');
		dispatch({
			type: GET_ALL_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: GET_ALL_PROFILES_FAIL,
		});
	}
};

export const deleteProfile = () => async (dispatch) => {
	try {
		await axios.delete('/api/profile');
		dispatch({
			type: PROFILE_DELETED,
		});
	} catch (err) {
		if (err.response.data.testProfile) {
			dispatch({
				type: TEST_PROFILE_ERROR,
			});
		}

		dispatch({
			type: PROFILE_DELETED_FAIL,
		});
	}

	if (!clearAlertsTimeout) {
		clearAlertsTimeout = setTimeout(() => {
			clearAlertsTimeout = null;
			dispatch({ type: CLEAR_PROFILE_ALERTS });
		}, 2000);
	}
};

export const saveProfilePicture = (picture) => async (dispatch) => {
	dispatch({ type: SAVE_PROFILE_LOADING });
	try {
		let body = {};
		let header = {
			headers: {
				'Content-Type': '',
			},
		};
		let res;

		if (picture) {
			// get secure url from our express server
			res = await axios.get('/api/s3');
			let url = res.data;

			// post the image to s3
			header.headers['Content-Type'] = 'multipart/form-data';
			body = picture;
			await axios.put(url, body, header);
			let imageUrl = url.split('?')[0];

			// post url to user profile
			body = JSON.stringify({ pictureUrl: imageUrl });
		} else {
			body = JSON.stringify({ pictureUrl: '' });
		}
		header.headers['Content-Type'] = 'application/json';

		res = await axios.post('/api/profile/picture', body, header);
		dispatch({
			type: PROFILE_SAVED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_SAVED_FAIL,
		});
	}
	if (!clearAlertsTimeout) {
		clearAlertsTimeout = setTimeout(() => {
			clearAlertsTimeout = null;
			dispatch({ type: CLEAR_PROFILE_ALERTS });
		}, 2000);
	}
};

export const saveProfile = (formData, formName) => async (dispatch) => {
	dispatch({ type: SAVE_PROFILE_LOADING });
	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify(formData);
	let endPoint = '';

	switch (formName) {
		case 'create':
			endPoint = '/api/profile/create';
			break;
		case 'contact':
			endPoint = '/api/profile/contact';
			break;
		case 'projects':
			endPoint = '/api/profile/projects';
			break;
		case 'work':
			endPoint = '/api/profile/work';
			break;
		case 'education':
			endPoint = '/api/profile/education';
			break;
		case 'socials':
			endPoint = '/api/profile/socials';
			break;
		case 'interests':
			endPoint = '/api/profile/interests';
			break;
		case 'awards':
			endPoint = '/api/profile/awards';
			break;
		case 'publications':
			endPoint = '/api/profile/publications';
			break;
		case 'volunteer':
			endPoint = '/api/profile/volunteer';
			break;
		case 'references':
			endPoint = '/api/profile/references';
			break;
		case 'languages':
			endPoint = '/api/profile/languages';
			break;
	}

	try {
		const res = await axios.post(endPoint, body, header);
		dispatch({
			type: PROFILE_SAVED,
			payload: res.data,
		});
		if (formName === 'create') {
			dispatch(getMyProfile());
			dispatch(setDefaults());
		}
	} catch (err) {
		// const errors = err.response.data.errors;
		// if (errors) {
		// 	errors.forEach((error) => {
		// 		console.log('error', error);
		// 	});
		// }

		// Test profile not allowed to make changes
		if (err.response.data.testProfile) {
			dispatch({
				type: TEST_PROFILE_ERROR,
			});
		}

		// Username already taken error
		if (err.response.data.usernameTaken) {
			dispatch({
				type: USERNAME_TAKEN_ERROR,
			});
		}

		dispatch({
			type: PROFILE_SAVED_FAIL,
		});
	}

	if (!clearAlertsTimeout) {
		clearAlertsTimeout = setTimeout(() => {
			clearAlertsTimeout = null;
			dispatch({ type: CLEAR_PROFILE_ALERTS });
		}, 2000);
	}
};
