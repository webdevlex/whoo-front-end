/* eslint-disable */
import { SET_ON_EDIT_PROFILE_PAGE } from './types';

export const setOnEditProfilePage = (value) => (dispatch) => {
	dispatch({
		type: SET_ON_EDIT_PROFILE_PAGE,
		value: value,
	});
};
