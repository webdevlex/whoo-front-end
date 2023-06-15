/* eslint-disable */
import {
	GET_ALL_PROFILES,
	GET_ALL_PROFILES_FAIL,
	GET_ALL_PROFILES_FORMATTED,
	GET_ALL_PROFILES_FORMATTED_FAIL,
} from '../actions/types';

const initialState = {
	allProfilesFormattedLoading: true,
	allProfilesLoading: true,
	profiles: [],
	profilesFormatted: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_PROFILES_FORMATTED:
			return {
				allProfilesFormattedLoading: false,
				profilesFormatted: payload,
			};
		case GET_ALL_PROFILES:
			return {
				allProfilesLoading: false,
				profiles: payload,
			};
		case GET_ALL_PROFILES_FAIL:
			return {
				allProfilesLoading: false,
				profiles: [],
			};
		case GET_ALL_PROFILES_FORMATTED_FAIL:
			return {
				allProfilesFormattedLoading: false,
				profilesFormatted: [],
			};
		default:
			return state;
	}
}
