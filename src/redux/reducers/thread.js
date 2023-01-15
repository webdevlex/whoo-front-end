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
} from '../actions/types';

const initialState = {
	threads: [],
	threadsLoading: true,
	selectedThread: null,
	newThreadProfiles: [],
	dropdown: null,
	sendingMessageLoading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SENDING_MESSAGE_LOADING:
			return {
				...state,
				sendingMessageLoading: true,
			};
		case GETTING_MESSAGES:
			return {
				...state,
				// threadsLoading: true,
			};
		case MESSAGES_RETRIEVED:
			return {
				...state,
				threadsLoading: false,
				threads: payload,
				sendingMessageLoading: false,
			};
		case MESSAGES_RETRIEVAL_FAILED:
			return {
				...state,
				threadsLoading: false,
				threads: null,
				sendingMessageLoading: false,
			};
		case MESSAGE_SENT_SUCCESSFULLY:
			if (state.threads.find((thread) => thread._id === payload._id)) {
				return {
					...state,
					threads: [...state.threads],
				};
			} else {
				return {
					...state,
					threads: [...state.threads, payload],
				};
			}
		case MESSAGE_SENT_FAILED:
			return {
				...state,
				sendingMessageLoading: false,
			};
		case SET_SELECTED_THREAD:
			return {
				...state,
				selectedThread: payload,
			};
		case ADD_PROFILE_TO_NEW_THREAD:
			return {
				...state,
				newThreadProfiles: [...state.newThreadProfiles, payload],
			};
		case SET_DROPDOWN:
			return {
				...state,
				dropdown: payload,
			};
		case CLEAR_NEW_THREAD:
			return {
				...state,
				newThreadProfiles: [],
			};
		default:
			return state;
	}
}
