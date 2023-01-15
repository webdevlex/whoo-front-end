import {
	GETTING_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS,
	FAILED_GETTING_SEARCH_RESULTS,
	SETTING_SEARCH_VALUE,
	LOADING_SEARCH_RESULTS,
	DONE_LOADING_SEARCH_RESULTS,
} from '../actions/types';

const initialState = {
	searchedUsersLoading: false,
	searchValue: '',
	searchResults: [],
};

// eslint-disable-next-line default-param-last
function SearchReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GETTING_SEARCH_RESULTS:
			return {
				...state,
				searchResults: payload,
				searchedUsersLoading: false,
			};
		case SETTING_SEARCH_VALUE:
			return {
				...state,
				searchValue: payload,
			};
		case FAILED_GETTING_SEARCH_RESULTS:
		case CLEAR_SEARCH_RESULTS:
			return {
				...state,
				searchValue: '',
				searchResults: [],
			};
		case LOADING_SEARCH_RESULTS:
			return {
				...state,
				searchedUsersLoading: true,
			};

		case DONE_LOADING_SEARCH_RESULTS:
			return {
				...state,
				searchedUsersLoading: false,
			};
		default:
			return state;
	}
}

export default SearchReducer;
