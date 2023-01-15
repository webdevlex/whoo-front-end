/* eslint-disable */
import {
	DONE_LOADING_PROFILE,
	LOADING_USER_PROFILE,
	DONE_LOADING_USER_PROFILE,
	FAILED_LOADING_USER_PROFILE,
} from '../actions/types';

const initialState = {
	profileBeingViewed: {},
	profileBeingViewedLoading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING_USER_PROFILE:
			return {
				...state,
				profileBeingViewedLoading: true,
			};
		case DONE_LOADING_PROFILE:
			return {
				...state,
				profileBeingViewedLoading: false,
			};
		case DONE_LOADING_USER_PROFILE:
			return {
				...state,
				profileBeingViewed: payload,
				profileBeingViewedLoading: false,
			};
		case FAILED_LOADING_USER_PROFILE:
			return {
				...state,
				profileBeingViewedLoading: false,
			};
		default:
			return state;
	}
}
