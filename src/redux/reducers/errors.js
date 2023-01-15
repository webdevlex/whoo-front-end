/* eslint-disable */
import {
	USERNAME_TAKEN_ERROR,
	PROFILE_SAVED,
	TEST_PROFILE_ERROR,
} from '../actions/types';

const initialState = {
	usernameTaken: false,
	testProfile: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USERNAME_TAKEN_ERROR:
			return {
				...state,
				usernameTaken: true,
			};
		case PROFILE_SAVED:
			return {
				...state,
				usernameTaken: false,
			};
		case TEST_PROFILE_ERROR:
			return {
				...state,
				testProfile: true,
			};
		default:
			return state;
	}
}
