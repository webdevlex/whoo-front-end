/* eslint-disable */
import {
	MY_PROFILE_RETRIEVED,
	CLEAR_PROFILE,
	MY_PROFILE_RETRIEVAL_FAILED,
	PROFILE_SAVED,
	PROFILE_SAVED_FAIL,
	PROFILE_DELETED,
	PROFILE_DELETED_FAIL,
	CLEAR_PROFILE_ALERTS,
	LOADING_MY_PROFILE,
	USERNAME_RETRIEVED,
	USERNAME_RETRIVAL_FAILED,
	CONTACT_ADDED,
	CONTACT_ADDED_FAILED,
	CONTACT_REMOVED,
	CONTACT_REMOVED_FAILED,
	HAS_PROFILE,
	SAVE_PROFILE_LOADING,
	ADD_CONTACT_LOADING,
	CLEAR_ADD_CONTACT_ALERT,
	USERNAME_TAKEN_ERROR,
} from '../actions/types';

const initialState = {
	myProfile: {},
	hasProfile: false,
	myUsername: '',
	listProfiles: [],
	profileLoading: true,
	alerts: '',
	error: '',
	saveProfileLoading: false,
	addContactLoading: false,
	addContactAlert: '',
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case MY_PROFILE_RETRIEVED:
		case CONTACT_REMOVED:
			return {
				...state,
				myProfile: payload,
				myUsername: payload.basics.username,
				hasProfile: true,
				profileLoading: false,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				myProfile: null,
				profileLoading: false,
				alerts: '',
			};
		case PROFILE_SAVED:
			return {
				...state,
				myProfile: payload,
				myUsername: payload.basics.username,
				profileLoading: false,
				saveProfileLoading: false,
				alerts: 'Profile Saved!',
			};
		case ADD_CONTACT_LOADING:
			return {
				...state,
				addContactLoading: true,
			};
		case CONTACT_ADDED:
			return {
				...state,
				myProfile: payload,
				addContactLoading: false,
				addContactAlert: action.username,
			};
		case CLEAR_ADD_CONTACT_ALERT:
			return {
				...state,
				addContactAlert: '',
			};
		case PROFILE_SAVED_FAIL:
		case CONTACT_ADDED_FAILED:
			return {
				...state,
				profileLoading: false,
				saveProfileLoading: false,
				error: 'Profile Saved Failed',
			};

		case MY_PROFILE_RETRIEVAL_FAILED:
			return {
				...state,
				myProfile: null,
				hasProfile: false,
				myUsername: null,
				listProfiles: [],
				profileLoading: false,
				alerts: '',
			};
		case CLEAR_PROFILE_ALERTS:
			return {
				...state,
				alerts: '',
				error: '',
			};
		case PROFILE_DELETED:
			return {
				...state,
				myProfile: null,
				hasProfile: false,
				myUsername: null,
				profileLoading: false,
			};
		case PROFILE_DELETED_FAIL:
			return {
				...state,
				profileLoading: false,
				error: 'Profile Saved Failed',
			};
		case LOADING_MY_PROFILE:
			return {
				...state,
				profileLoading: true,
			};
		case HAS_PROFILE:
			return {
				...state,
				hasProfile: true,
			};
		case USERNAME_RETRIEVED:
			return {
				...state,
				myUsername: payload.basics.username,
			};
		case USERNAME_RETRIVAL_FAILED:
			return {
				...state,
				myUsername: null,
			};
		case SAVE_PROFILE_LOADING:
			return {
				...state,
				saveProfileLoading: true,
			};
		case CONTACT_REMOVED_FAILED:
		default:
			return state;
	}
}
