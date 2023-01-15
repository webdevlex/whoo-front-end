/* eslint-disable */
import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	REMOVE_ALERT,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_USER,
	TOGGLE_MENU,
	LOADING_MY_PROFILE,
	DONE_LOADING_PROFILE,
} from './types';
import { setAlert } from '../actions/alert';
import setAuthToken from '../../utils/setAuthToken';
import { getMyProfile, clearAlerts } from './profile';

if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://whoo-back-end.onrender.com';
}

//
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register user action
export const registerUser =
	({ email, password, confirmPassword }) =>
	async (dispatch) => {
		const header = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const newUser = {
			email: email,
			password: password,
			confirmPassword: confirmPassword,
		};
		const body = JSON.stringify(newUser);

		try {
			// Make request and save response
			const res = await axios.post('/api/users', body, header);

			// Clear old alerts
			dispatch({
				type: REMOVE_ALERT,
			});
			// On success setAlert called with success
			dispatch(setAlert('Register successful!', 'success'));

			// If everything went well then dispatch a REGISTER_SUCESS message and pass along token to state
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			// Load user on success
			dispatch(loadUser());
			dispatch(getMyProfile());
			dispatch(clearAlerts());
		} catch (err) {
			// Clear old alerts
			dispatch({
				type: REMOVE_ALERT,
			});
			// users route responds with errors array on any failure, setAlerts action called with all errors
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// Login user action
export const loginUser =
	({ email, password }) =>
	async (dispatch) => {
		dispatch({
			type: LOADING_MY_PROFILE,
		});

		const header = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const userInput = {
			email: email,
			password: password,
		};
		const body = JSON.stringify(userInput);

		try {
			// Make request and save response
			const res = await axios.post('/api/auth', body, header);

			// Clear old alerts
			dispatch({
				type: REMOVE_ALERT,
			});
			// On success setAlert called with success
			dispatch(setAlert('Login successful!', 'success'));

			// If everything went well then dispatch a REGISTER_SUCESS message and pass along token to state
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			// Load user on success
			dispatch(loadUser());
			dispatch(getMyProfile());
			dispatch(clearAlerts());
		} catch (err) {
			// Clear old alerts
			dispatch({
				type: REMOVE_ALERT,
			});
			// users route responds with errors array on any failure, setAlerts action called with all errors
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
			}
			dispatch({
				type: LOGIN_FAIL,
			});
			dispatch({
				type: DONE_LOADING_PROFILE,
			});
		}
	};

// Logout user
export const logoutUser = () => (dispatch) => {
	dispatch({
		type: LOGOUT_USER,
	});
};
