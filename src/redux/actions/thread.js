/* eslint-disable */
import {
	GETTING_MESSAGES,
	MESSAGES_RETRIEVED,
	MESSAGES_RETRIEVAL_FAILED,
	MESSAGE_SENT_SUCCESSFULLY,
	MESSAGE_SENT_FAILED,
	SET_SELECTED_THREAD,
	ADD_PROFILE_TO_NEW_THREAD,
	SET_DROPDOWN,
	CLEAR_NEW_THREAD,
	SENDING_MESSAGE_LOADING,
} from './types';
import axios from 'axios';

if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://whoo-back-end.onrender.com';
}

export const clearNewThread = () => (dispatch) => {
	dispatch({
		type: CLEAR_NEW_THREAD,
	});
};

export const addProfileToNewThread = (selected) => (dispatch) => {
	dispatch({
		type: ADD_PROFILE_TO_NEW_THREAD,
		payload: selected,
	});
};

export const setSelectedThread = (selected) => (dispatch) => {
	dispatch({
		type: SET_SELECTED_THREAD,
		payload: selected,
	});
};

export const openDropdown = (selected) => (dispatch) => {
	dispatch({
		type: SET_DROPDOWN,
		payload: selected,
	});
};

export const sendMessage =
	(formData, recipients, threadId, fullName, username) => async (dispatch) => {
		dispatch({ type: SENDING_MESSAGE_LOADING });
		const header = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const newMessage = {
			_id: threadId,
			members: recipients,
			memberProfiles: [],
			message: formData.message,
			fullName: fullName,
			username: username,
		};

		try {
			for (let i in recipients) {
				const res = await axios.get('/api/profile/id', {
					params: { id: recipients[i] },
				});
				newMessage.memberProfiles.push({
					user: res.data.user,
					username: res.data.basics.username,
					fullName: res.data.basics.fullName,
					pictureUrl: res.data.pictureUrl,
					jobTitle: res.data.basics.jobTitle,
				});
			}
			const body = JSON.stringify(newMessage);
			const res = await axios.post('/api/thread', body, header);
			dispatch(getMyMessages());
			dispatch(setSelectedThread(res.data._id));
			dispatch(clearNewThread());
			dispatch({
				type: MESSAGE_SENT_SUCCESSFULLY,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: MESSAGE_SENT_FAILED,
			});
		}
	};

export const sendDefaultMessage =
	(formData, recipients, threadId) => async (dispatch) => {
		dispatch({ type: SENDING_MESSAGE_LOADING });
		const header = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const newMessage = {
			_id: threadId,
			members: recipients,
			memberProfiles: [],
			message: formData.message,
		};

		try {
			for (let i in recipients) {
				const res = await axios.get('/api/profile/id', {
					params: { id: recipients[i] },
				});
				newMessage.memberProfiles.push({
					user: res.data.user,
					username: res.data.basics.username,
					fullName: res.data.basics.fullName,
					pictureUrl: res.data.pictureUrl,
					jobTitle: res.data.basics.jobTitle,
				});
			}
			const body = JSON.stringify(newMessage);
			const res = await axios.post('/api/thread/default', body, header);
			dispatch(getMyMessages());
			dispatch(setSelectedThread(res.data._id));
			dispatch(clearNewThread());
			dispatch({
				type: MESSAGE_SENT_SUCCESSFULLY,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: MESSAGE_SENT_FAILED,
			});
		}
	};

export const getMyMessages = () => async (dispatch) => {
	dispatch({
		type: GETTING_MESSAGES,
	});

	try {
		let res = await axios.get('/api/thread');
		dispatch({
			type: MESSAGES_RETRIEVED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MESSAGES_RETRIEVAL_FAILED,
		});
	}
};
