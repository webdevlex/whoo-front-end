import axios from 'axios';

import {
	GETTING_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS,
	FAILED_GETTING_SEARCH_RESULTS,
	SETTING_SEARCH_VALUE,
	LOADING_SEARCH_RESULTS,
	DONE_LOADING_SEARCH_RESULTS,
} from './types';

export const clearSearch = () => (dispatch) => {
	dispatch({
		type: CLEAR_SEARCH_RESULTS,
	});
};

export const setSearchValue = (formData) => (dispatch) => {
	dispatch({
		type: SETTING_SEARCH_VALUE,
		payload: formData.search,
	});
};

export const typeRequest = (formData) => async (dispatch) => {
	dispatch({ type: LOADING_SEARCH_RESULTS });
	try {
		if (formData) {
			const res = await axios.get('/api/profile/search', {
				params: { search: formData },
			});
			dispatch({
				type: GETTING_SEARCH_RESULTS,
				payload: res.data,
			});
		} else {
			dispatch(clearSearch());
		}
		dispatch({ type: DONE_LOADING_SEARCH_RESULTS });
	} catch (err) {
		dispatch({
			type: FAILED_GETTING_SEARCH_RESULTS,
		});
	}
};
