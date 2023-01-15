/* eslint-disable */
import {
	CONTACT_ADDED,
	CONTACT_ADDED_FAILED,
	CONTACT_REMOVED,
	CONTACT_REMOVED_FAILED,
	ADD_CONTACT_LOADING,
	CLEAR_ADD_CONTACT_ALERT,
} from './types';
import axios from 'axios';

if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://whoo-back-end.onrender.com';
}

let addContactTimeout = null;
export const addUserAsContact = (username) => async (dispatch) => {
	dispatch({
		type: ADD_CONTACT_LOADING,
	});

	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ username: username });
	try {
		const res = await axios.post('/api/profile/add-contact', body, header);
		dispatch({
			type: CONTACT_ADDED,
			payload: res.data,
			username: username,
		});
	} catch (err) {
		dispatch({
			type: CONTACT_ADDED_FAILED,
		});
	}

	if (!addContactTimeout) {
		addContactTimeout = setTimeout(() => {
			addContactTimeout = null;
			dispatch({ type: CLEAR_ADD_CONTACT_ALERT });
		}, 2000);
	}
};

export const removeContact = (username) => async (dispatch) => {
	const header = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ username: username });
	try {
		const res = await axios.post('/api/profile/remove-contact', body, header);
		dispatch({
			type: CONTACT_REMOVED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CONTACT_REMOVED_FAILED,
		});
	}

	// if (!clearAlertsTimeout) {
	// 	clearAlertsTimeout = setTimeout(() => {
	// 		console.log('clearing');
	// 		clearAlertsTimeout = null;
	// 		dispatch({ type: CLEAR_PROFILE_ALERTS });
	// 	}, 2000);
	// }
};
