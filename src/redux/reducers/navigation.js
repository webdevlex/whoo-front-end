/* eslint-disable */
import { SET_ON_EDIT_PROFILE_PAGE } from '../actions/types';

const initialState = {
	menuDisplay: 'closed',
	onEditProfilePage: false,
};

export default function (state = initialState, action) {
	const { type } = action;

	switch (type) {
		case SET_ON_EDIT_PROFILE_PAGE:
			return { ...state, onEditProfilePage: action.value };
		default:
			return state;
	}
}
