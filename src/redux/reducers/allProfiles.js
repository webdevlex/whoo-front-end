/* eslint-disable */
import { GET_ALL_PROFILES, GET_ALL_PROFILES_FAIL } from '../actions/types';

const initialState = {
  allProfilesLoading: true,
  profiles: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
}
